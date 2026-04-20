let localStream = null;
let currentCall = null;
let peer = null;
let isMicOn = true;
let isVideoOn = true;
let studentName = '';
let roomId = '';
let conn = null;

const TEACHER_PEER_ID = 'teacher-alex-sala-principal';

document.addEventListener('DOMContentLoaded', () => {
    // ===== ABAS =====
    document.querySelectorAll('.member-tab').forEach(tab => {
        tab.addEventListener('click', () => {
            document.querySelectorAll('.member-tab').forEach(t => t.classList.remove('active'));
            document.querySelectorAll('.tab-content').forEach(c => c.classList.remove('active'));
            tab.classList.add('active');
            document.getElementById('tab-' + tab.dataset.tab).classList.add('active');
        });
    });

    // ===== ACCORDION =====
    document.querySelectorAll('.lesson-header').forEach(btn => {
        btn.addEventListener('click', () => {
            btn.parentElement.classList.toggle('open');
        });
    });

    // ===== VERIFICAR EXERCÍCIOS =====
    document.querySelectorAll('.check-btn').forEach(btn => {
        btn.addEventListener('click', () => {
            const item = btn.closest('.exercise-item');
            const input = item.querySelector('input');
            const result = item.querySelector('.result');
            const answer = item.dataset.answer.toLowerCase().trim();
            const userAnswer = input.value.toLowerCase().trim();
            if (userAnswer === answer) {
                result.textContent = '✅ Correto!';
                result.style.color = '#22c55e';
            } else {
                result.textContent = '❌ Resposta: ' + item.dataset.answer;
                result.style.color = '#ef4444';
            }
        });
    });

    // ===== CÂMERA =====
    const btnStartCam = document.getElementById('btnStartCam');
    const btnMuteMic = document.getElementById('btnMuteMic');
    const btnMuteVideo = document.getElementById('btnMuteVideo');
    const btnJoinRoom = document.getElementById('btnJoinRoom');
    const btnLeaveRoom = document.getElementById('btnLeaveRoom');
    const localVideo = document.getElementById('localVideo');
    const remoteVideo = document.getElementById('remoteVideo');
    const statusDot = document.getElementById('liveStatusDot');
    const statusText = document.getElementById('liveStatusText');
    const roomIdDisplay = document.getElementById('roomIdDisplay');
    const chatMessages = document.getElementById('chatMessages');
    const chatInput = document.getElementById('chatInput');
    const btnSendChat = document.getElementById('btnSendChat');

    if (!btnStartCam) return;

    btnStartCam.addEventListener('click', async () => {
        try {
            localStream = await navigator.mediaDevices.getUserMedia({ video: true, audio: true });
            localVideo.srcObject = localStream;
            btnStartCam.disabled = true;
            btnMuteMic.disabled = false;
            btnMuteVideo.disabled = false;
            btnJoinRoom.disabled = false;
            setStatus('Câmera ativa. Clique em "Entrar na Sala".', 'waiting');
        } catch (err) {
            alert('Não foi possível acessar câmera/microfone: ' + err.message);
        }
    });

    btnMuteMic.addEventListener('click', () => {
        if (!localStream) return;
        isMicOn = !isMicOn;
        localStream.getAudioTracks().forEach(t => t.enabled = isMicOn);
        btnMuteMic.textContent = isMicOn ? '🎤 Microfone ON' : '🔇 Microfone OFF';
        btnMuteMic.style.background = isMicOn ? '' : '#ef4444';
    });

    btnMuteVideo.addEventListener('click', () => {
        if (!localStream) return;
        isVideoOn = !isVideoOn;
        localStream.getVideoTracks().forEach(t => t.enabled = isVideoOn);
        btnMuteVideo.textContent = isVideoOn ? '📹 Vídeo ON' : '🚫 Vídeo OFF';
        btnMuteVideo.style.background = isVideoOn ? '' : '#ef4444';
    });

    btnJoinRoom.addEventListener('click', () => {
        studentName = document.getElementById('studentName')?.value || 'Aluno';
        loadPeerAndConnect();
    });

    btnLeaveRoom.addEventListener('click', leaveRoom);

    btnSendChat.addEventListener('click', sendChat);
    chatInput.addEventListener('keydown', (e) => { if (e.key === 'Enter') sendChat(); });

    function loadPeerAndConnect() {
        if (typeof Peer === 'undefined') {
            const s = document.createElement('script');
            s.src = 'https://unpkg.com/peerjs@1.5.2/dist/peerjs.min.js';
            s.onload = startConnection;
            document.head.appendChild(s);
        } else {
            startConnection();
        }
    }

    function startConnection() {
        const studentId = 'aluno-' + Math.random().toString(36).substr(2, 8);
        roomId = studentId;
        if (roomIdDisplay) roomIdDisplay.textContent = studentId;

        peer = new Peer(studentId, { host: '0.peerjs.com', port: 443, path: '/', secure: true });

        peer.on('open', () => {
            setStatus('Conectado. Chamando o professor...', 'waiting');
            addChat('Sistema', 'Você entrou na sala como "' + studentName + '". Aguardando o professor...');

            const call = peer.call(TEACHER_PEER_ID, localStream, { metadata: { name: studentName } });
            if (call) {
                currentCall = call;
                call.on('stream', (rs) => {
                    remoteVideo.srcObject = rs;
                    setStatus('🟢 Aula ao vivo em andamento!', 'live');
                    btnLeaveRoom.classList.remove('hidden');
                    btnJoinRoom.disabled = true;
                });
                call.on('close', () => { setStatus('Chamada encerrada.', 'offline'); remoteVideo.srcObject = null; });
            } else {
                setStatus('Professor não está online. Tente novamente.', 'offline');
            }

            conn = peer.connect(TEACHER_PEER_ID);
            if (conn) {
                conn.on('open', () => { conn.send({ type: 'join', name: studentName }); });
                conn.on('data', (d) => { if (d.type === 'chat') addChat('Teacher Alex', d.message); });
            }

            peer.on('call', (ic) => {
                ic.answer(localStream);
                currentCall = ic;
                ic.on('stream', (rs) => {
                    remoteVideo.srcObject = rs;
                    setStatus('🟢 Aula ao vivo em andamento!', 'live');
                    btnLeaveRoom.classList.remove('hidden');
                    btnJoinRoom.disabled = true;
                });
            });

            peer.on('connection', (dc) => {
                dc.on('data', (d) => { if (d.type === 'chat') addChat('Teacher Alex', d.message); });
            });
        });

        peer.on('error', (err) => {
            if (err.type === 'peer-unavailable') {
                setStatus('⏳ Professor ainda não está online. Aguarde.', 'waiting');
            } else {
                setStatus('Erro: ' + err.message, 'offline');
            }
        });
    }

    function leaveRoom() {
        if (currentCall) currentCall.close();
        if (peer) peer.destroy();
        if (localStream) { localStream.getTracks().forEach(t => t.stop()); localStream = null; }
        localVideo.srcObject = null;
        remoteVideo.srcObject = null;
        setStatus('Você saiu da aula.', 'offline');
        btnLeaveRoom.classList.add('hidden');
        btnJoinRoom.disabled = false;
        btnStartCam.disabled = false;
        btnMuteMic.disabled = true;
        btnMuteVideo.disabled = true;
        addChat('Sistema', 'Você saiu da sala.');
    }

    function setStatus(msg, type) {
        if (statusText) statusText.textContent = msg;
        if (statusDot) statusDot.className = 'status-dot ' + type;
    }

    function sendChat() {
        const msg = chatInput.value.trim();
        if (!msg) return;
        addChat('Você', msg);
        if (conn && conn.open) conn.send({ type: 'chat', message: msg });
        chatInput.value = '';
    }

    function addChat(from, msg) {
        if (!chatMessages) return;
        const div = document.createElement('div');
        div.className = 'chat-msg';
        div.innerHTML = '<strong>' + from + ':</strong> ' + msg;
        chatMessages.appendChild(div);
        chatMessages.scrollTop = chatMessages.scrollHeight;
    }
});