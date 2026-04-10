const navToggle = document.getElementById('navToggle');
const navLinks = document.getElementById('navLinks');
const studentAccessForm = document.getElementById('studentAccessForm');
const enrollmentForm = document.getElementById('enrollmentForm');
const accessMessage = document.getElementById('accessMessage');
const enrollmentMessage = document.getElementById('enrollmentMessage');
const agendawebAccess = document.getElementById('agendawebAccess');
const studentWelcome = document.getElementById('studentWelcome');
const memberTokenBox = document.getElementById('memberTokenBox');
const memberTokenValue = document.getElementById('memberTokenValue');
const accessSubmitButton = studentAccessForm?.querySelector('button[type="submit"]');
const enrollmentSubmitButton = enrollmentForm?.querySelector('button[type="submit"]');

if (navToggle && navLinks) {
    navToggle.addEventListener('click', () => {
        navLinks.classList.toggle('active');
        navToggle.classList.toggle('active');
    });
}

document.querySelectorAll('.nav-links a').forEach((link) => {
    link.addEventListener('click', () => {
        navLinks?.classList.remove('active');
        navToggle?.classList.remove('active');
    });
});

window.addEventListener('scroll', () => {
    const navbar = document.querySelector('.navbar');
    if (!navbar) return;
    navbar.classList.toggle('scrolled', window.scrollY > 50);
});

function setMessage(element, text, type = '') {
    if (!element) return;
    element.textContent = text;
    element.className = type ? `${element.id === 'enrollmentMessage' ? 'enrollment-message' : 'access-message'} ${type}` : (element.id === 'enrollmentMessage' ? 'enrollment-message' : 'access-message');
}

function setButtonState(button, isLoading, loadingText, defaultText) {
    if (!button) return;
    button.disabled = isLoading;
    button.textContent = isLoading ? loadingText : defaultText;
}

function showMemberArea(student) {
    if (studentAccessForm) {
        studentAccessForm.classList.add('hidden');
    }

    if (agendawebAccess) {
        agendawebAccess.classList.remove('hidden');
    }

    if (studentWelcome) {
        studentWelcome.textContent = `Olá, ${student.name}! Seu acesso está ativo. Use os links abaixo para entrar no portal de exercícios do Agendaweb.`;
    }

    if (memberTokenBox && memberTokenValue) {
        memberTokenValue.textContent = student.accessToken || 'Token indisponível';
        memberTokenBox.classList.remove('hidden');
    }

    setMessage(accessMessage, 'Área de membros liberada com sucesso.', 'success');
}

function hideMemberArea() {
    if (studentAccessForm) {
        studentAccessForm.classList.remove('hidden');
    }

    if (agendawebAccess) {
        agendawebAccess.classList.add('hidden');
    }

    if (memberTokenBox) {
        memberTokenBox.classList.add('hidden');
    }
}

async function requestJson(url, options = {}) {
    const config = {
        headers: {
            'Content-Type': 'application/json',
            ...(options.headers || {}),
        },
        ...options,
    };

    const response = await fetch(url, config);
    const data = await response.json().catch(() => ({}));

    if (!response.ok) {
        throw new Error(data.message || 'Ocorreu um erro na comunicação com o servidor.');
    }

    return data;
}

async function restoreSession() {
    try {
        const data = await requestJson('/api/member/me');
        showMemberArea(data.student);
    } catch {
        hideMemberArea();
    }
}

if (studentAccessForm) {
    studentAccessForm.addEventListener('submit', async (event) => {
        event.preventDefault();

        const studentName = document.getElementById('studentName').value.trim();
        const studentEmail = document.getElementById('studentEmail').value.trim();
        const studentToken = document.getElementById('studentToken').value.trim();

        if (!studentName || !studentEmail || !studentToken) {
            setMessage(accessMessage, 'Preencha nome, e-mail e token para continuar.', 'error');
            hideMemberArea();
            return;
        }

        try {
            setButtonState(accessSubmitButton, true, 'Validando...', 'Validar token e acessar');
            setMessage(accessMessage, 'Validando acesso no servidor...', '');
            const data = await requestJson('/api/member-access', {
                method: 'POST',
                body: JSON.stringify({
                    email: studentEmail,
                    token: studentToken,
                }),
            });
            showMemberArea({ ...data.student, name: data.student.name || studentName });
        } catch (error) {
            setMessage(accessMessage, error.message, 'error');
            hideMemberArea();
        } finally {
            setButtonState(accessSubmitButton, false, 'Validando...', 'Validar token e acessar');
        }
    });
}

if (enrollmentForm) {
    enrollmentForm.addEventListener('submit', async (event) => {
        event.preventDefault();

        const studentData = {
            name: document.getElementById('enrollName').value.trim(),
            email: document.getElementById('enrollEmail').value.trim(),
            phone: document.getElementById('enrollPhone').value.trim(),
            cep: document.getElementById('enrollCep').value.trim(),
            address: document.getElementById('enrollAddress').value.trim(),
            goal: document.getElementById('enrollGoal').value.trim(),
            contractDuration: document.getElementById('contractDuration').value,
            selectedPackage: document.getElementById('selectedPackage').value,
        };

        if (!studentData.name || !studentData.email || !studentData.phone || !studentData.cep || !studentData.address || !studentData.goal || !studentData.contractDuration || !studentData.selectedPackage) {
            setMessage(enrollmentMessage, 'Preencha todos os campos da matrícula.', 'error');
            return;
        }

        try {
            setButtonState(enrollmentSubmitButton, true, 'Enviando matrícula...', 'Matricular e liberar acesso');
            setMessage(enrollmentMessage, 'Enviando matrícula para o servidor...', '');
            const data = await requestJson('/api/enroll', {
                method: 'POST',
                body: JSON.stringify(studentData),
            });

            setMessage(enrollmentMessage, data.message, 'success');
            showMemberArea(data.student);
            enrollmentForm.reset();
            window.location.hash = '#exercicios';
        } catch (error) {
            setMessage(enrollmentMessage, error.message, 'error');
        } finally {
            setButtonState(enrollmentSubmitButton, false, 'Enviando matrícula...', 'Matricular e liberar acesso');
        }
    });
}

restoreSession();