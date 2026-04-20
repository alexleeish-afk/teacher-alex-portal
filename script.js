document.addEventListener('DOMContentLoaded', () => {

    // ===== NAVBAR TOGGLE =====
    const navToggle = document.getElementById('navToggle');
    const navLinks = document.getElementById('navLinks');
    if (navToggle && navLinks) {
        navToggle.addEventListener('click', () => {
            navLinks.classList.toggle('open');
            navToggle.classList.toggle('open');
        });
        navLinks.querySelectorAll('a').forEach(link => {
            link.addEventListener('click', () => {
                navLinks.classList.remove('open');
                navToggle.classList.remove('open');
            });
        });
    }

    // ===== TOKENS VÁLIDOS =====
    const VALID_TOKENS = ['ALEX2024', 'ALUNO2024', 'ENGLISH2024', 'TEACHER2024'];

    // ===== MATRÍCULA =====
    const enrollmentForm = document.getElementById('enrollmentForm');
    const enrollmentMessage = document.getElementById('enrollmentMessage');

    if (enrollmentForm) {
        enrollmentForm.addEventListener('submit', (e) => {
            e.preventDefault();

            const name = document.getElementById('enrollName').value.trim();
            const email = document.getElementById('enrollEmail').value.trim();
            const phone = document.getElementById('enrollPhone').value.trim();
            const cep = document.getElementById('enrollCep').value.trim();
            const address = document.getElementById('enrollAddress').value.trim();
            const goal = document.getElementById('enrollGoal').value.trim();
            const contract = document.getElementById('contractDuration').value;
            const pack = document.getElementById('selectedPackage').value;

            if (!name || !email || !phone || !contract || !pack) {
                enrollmentMessage.textContent = '⚠️ Preencha todos os campos obrigatórios.';
                enrollmentMessage.style.color = '#ef4444';
                return;
            }

            // Gera token único para o aluno
            const generatedToken = 'ALUNO-' + Math.random().toString(36).substr(2, 6).toUpperCase();

            // Salva no localStorage para liberar acesso automático
            localStorage.setItem('teacherAlexAccess', JSON.stringify({
                name: name,
                email: email,
                token: generatedToken,
                enrolled: true
            }));

            // Monta corpo do e-mail
            const subject = encodeURIComponent('Nova Matrícula - ' + name);
            const body = encodeURIComponent(
                'Nova matrícula recebida!\n\n' +
                'Nome: ' + name + '\n' +
                'E-mail: ' + email + '\n' +
                'WhatsApp: ' + phone + '\n' +
                'CEP: ' + cep + '\n' +
                'Endereço: ' + address + '\n' +
                'Objetivo: ' + goal + '\n' +
                'Contrato: ' + contract + '\n' +
                'Pacote: ' + pack + '\n' +
                'Token gerado: ' + generatedToken
            );

            // Abre e-mail
            window.open('mailto:teacherr.alex@gmail.com?subject=' + subject + '&body=' + body);

            enrollmentMessage.innerHTML = '✅ Matrícula enviada com sucesso!<br>Seu token de acesso: <strong>' + generatedToken + '</strong><br>A área de membros já está liberada. Vá até "Área de Alunos" acima.';
            enrollmentMessage.style.color = '#22c55e';

            // Preenche automaticamente o formulário de acesso
            const studentNameInput = document.getElementById('studentName');
            const studentEmailInput = document.getElementById('studentEmail');
            const studentTokenInput = document.getElementById('studentToken');
            if (studentNameInput) studentNameInput.value = name;
            if (studentEmailInput) studentEmailInput.value = email;
            if (studentTokenInput) studentTokenInput.value = generatedToken;

            // Libera a área de membros automaticamente
            openMemberArea(name, generatedToken);

            enrollmentForm.reset();
        });
    }

    // ===== ACESSO POR TOKEN =====
    const studentAccessForm = document.getElementById('studentAccessForm');
    const accessMessage = document.getElementById('accessMessage');

    if (studentAccessForm) {
        studentAccessForm.addEventListener('submit', (e) => {
            e.preventDefault();

            const name = document.getElementById('studentName').value.trim();
            const email = document.getElementById('studentEmail').value.trim();
            const token = document.getElementById('studentToken').value.trim().toUpperCase();

            if (!name || !email || !token) {
                accessMessage.textContent = '⚠️ Preencha todos os campos.';
                accessMessage.style.color = '#ef4444';
                return;
            }

            // Verifica token fixo OU token gerado pela matrícula
            const saved = JSON.parse(localStorage.getItem('teacherAlexAccess') || '{}');
            const isValidFixed = VALID_TOKENS.includes(token);
            const isValidGenerated = saved.token && saved.token.toUpperCase() === token;

            if (isValidFixed || isValidGenerated) {
                accessMessage.textContent = '✅ Token válido! Bem-vindo(a), ' + name + '!';
                accessMessage.style.color = '#22c55e';

                localStorage.setItem('teacherAlexAccess', JSON.stringify({
                    name: name,
                    email: email,
                    token: token,
                    enrolled: true
                }));

                openMemberArea(name, token);
            } else {
                accessMessage.textContent = '❌ Token inválido. Verifique com o professor.';
                accessMessage.style.color = '#ef4444';
            }
        });
    }

    // ===== ABRIR ÁREA DE MEMBROS =====
    function openMemberArea(name, token) {
        const agendawebAccess = document.getElementById('agendawebAccess');
        const studentWelcome = document.getElementById('studentWelcome');
        const memberTokenBox = document.getElementById('memberTokenBox');
        const memberTokenValue = document.getElementById('memberTokenValue');

        if (agendawebAccess) agendawebAccess.classList.remove('hidden');
        if (studentWelcome) studentWelcome.innerHTML = '👋 Bem-vindo(a), <strong>' + name + '</strong>! Você tem acesso completo à área de membros.';
        if (memberTokenBox) memberTokenBox.classList.remove('hidden');
        if (memberTokenValue) memberTokenValue.textContent = token;

        // Scroll suave até a área
        agendawebAccess.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }

    // ===== VERIFICAR ACESSO SALVO (auto-login) =====
    const saved = JSON.parse(localStorage.getItem('teacherAlexAccess') || '{}');
    if (saved.enrolled && saved.name) {
        const studentNameInput = document.getElementById('studentName');
        const studentEmailInput = document.getElementById('studentEmail');
        const studentTokenInput = document.getElementById('studentToken');
        if (studentNameInput) studentNameInput.value = saved.name;
        if (studentEmailInput) studentEmailInput.value = saved.email || '';
        if (studentTokenInput) studentTokenInput.value = saved.token || '';
        openMemberArea(saved.name, saved.token);
    }

    // ===== ABAS DA ÁREA DE MEMBROS =====
    document.querySelectorAll('.member-tab').forEach(tab => {
        tab.addEventListener('click', () => {
            document.querySelectorAll('.member-tab').forEach(t => t.classList.remove('active'));
            document.querySelectorAll('.tab-content').forEach(c => c.classList.remove('active'));
            tab.classList.add('active');
            const target = document.getElementById('tab-' + tab.dataset.tab);
            if (target) target.classList.add('active');
        });
    });

    // ===== ACCORDION DAS AULAS =====
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
            const answer = item.dataset.answer.toLowerCase().trim().replace(/\s+/g, ' ');
            const userAnswer = input.value.toLowerCase().trim().replace(/\s+/g, ' ');

            if (!userAnswer) {
                result.textContent = '⚠️ Digite sua resposta.';
                result.style.color = '#f59e0b';
                return;
            }

            if (userAnswer === answer) {
                result.textContent = '✅ Correto!';
                result.style.color = '#22c55e';
                input.style.borderColor = '#22c55e';
            } else {
                result.textContent = '❌ Resposta: ' + item.dataset.answer;
                result.style.color = '#ef4444';
                input.style.borderColor = '#ef4444';
            }
        });

        // Enter para verificar
        const input = btn.closest('.exercise-item').querySelector('input');
        if (input) {
            input.addEventListener('keydown', (e) => {
                if (e.key === 'Enter') {
                    e.preventDefault();
                    btn.click();
                }
            });
        }
    });

});