const express = require('express');
const session = require('express-session');
const nodemailer = require('nodemailer');
const path = require('path');
const fs = require('fs');
const crypto = require('crypto');
require('dotenv').config();

const app = express();
const PORT = Number(process.env.PORT) || 3000;
const ROOT_DIR = __dirname;
const DATA_DIR = path.join(ROOT_DIR, 'data');
const DATA_FILE = path.join(DATA_DIR, 'students.json');
const NOTIFY_EMAIL = process.env.NOTIFY_EMAIL || 'teacherr.alex@gmail.com';

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(
    session({
        secret: process.env.SESSION_SECRET || 'teacher-alex-session-secret-change-me',
        resave: false,
        saveUninitialized: false,
        cookie: {
            httpOnly: true,
            sameSite: 'lax',
            maxAge: 1000 * 60 * 60 * 24 * 7,
        },
    })
);

app.use(express.static(ROOT_DIR));

async function ensureDataStore() {
    await fs.promises.mkdir(DATA_DIR, { recursive: true });
    try {
        await fs.promises.access(DATA_FILE);
    } catch {
        await fs.promises.writeFile(DATA_FILE, '[]', 'utf8');
    }
}

async function readStudents() {
    await ensureDataStore();
    const raw = await fs.promises.readFile(DATA_FILE, 'utf8');
    return JSON.parse(raw || '[]');
}

async function writeStudents(students) {
    await fs.promises.writeFile(DATA_FILE, JSON.stringify(students, null, 2), 'utf8');
}

function normalizeEmail(email) {
    return String(email || '').trim().toLowerCase();
}

function generateAccessToken() {
    return `TA-${crypto.randomBytes(4).toString('hex').toUpperCase()}`;
}

function sanitizeStudent(student) {
    return {
        id: student.id,
        name: student.name,
        email: student.email,
        phone: student.phone,
        cep: student.cep,
        address: student.address,
        goal: student.goal,
        contractDuration: student.contractDuration,
        selectedPackage: student.selectedPackage,
        accessToken: student.accessToken,
        status: student.status,
        enrolledAt: student.enrolledAt,
    };
}

function createTransporter() {
    const smtpUser = process.env.SMTP_USER;
    const smtpPass = process.env.SMTP_PASS;

    if (!smtpUser || !smtpPass) {
        return null;
    }

    return nodemailer.createTransport({
        host: process.env.SMTP_HOST || 'smtp.gmail.com',
        port: Number(process.env.SMTP_PORT) || 587,
        secure: String(process.env.SMTP_SECURE || 'false') === 'true',
        auth: {
            user: smtpUser,
            pass: smtpPass,
        },
    });
}

async function sendEnrollmentEmail(student, isNewEnrollment) {
    const transporter = createTransporter();

    if (!transporter) {
        return false;
    }

    const mailHtml = `
        <h2>${isNewEnrollment ? 'Nova matrícula' : 'Atualização de matrícula'} - Teacher Alex</h2>
        <p><strong>Nome:</strong> ${student.name}</p>
        <p><strong>E-mail:</strong> ${student.email}</p>
        <p><strong>WhatsApp:</strong> ${student.phone}</p>
        <p><strong>CEP:</strong> ${student.cep}</p>
        <p><strong>Endereço:</strong> ${student.address}</p>
        <p><strong>Objetivo:</strong> ${student.goal}</p>
        <p><strong>Tempo de contrato:</strong> ${student.contractDuration}</p>
        <p><strong>Pacote escolhido:</strong> ${student.selectedPackage}</p>
        <p><strong>Token de acesso:</strong> ${student.accessToken}</p>
        <p><strong>Status:</strong> ${student.status}</p>
        <p><strong>Data:</strong> ${new Date(student.enrolledAt).toLocaleString('pt-BR')}</p>
    `;

    await transporter.sendMail({
        from: process.env.SMTP_FROM || process.env.SMTP_USER,
        to: NOTIFY_EMAIL,
        replyTo: student.email,
        subject: `${isNewEnrollment ? 'Nova matrícula' : 'Matrícula atualizada'} - Teacher Alex`,
        html: mailHtml,
    });

    return true;
}

app.get('/api/health', (_req, res) => {
    res.json({
        ok: true,
        emailConfigured: Boolean(process.env.SMTP_USER && process.env.SMTP_PASS),
        notifyEmail: NOTIFY_EMAIL,
    });
});

app.post('/api/enroll', async (req, res) => {
    try {
        const name = String(req.body.name || '').trim();
        const email = normalizeEmail(req.body.email);
        const phone = String(req.body.phone || '').trim();
        const cep = String(req.body.cep || '').trim();
        const address = String(req.body.address || '').trim();
        const goal = String(req.body.goal || '').trim();
        const contractDuration = String(req.body.contractDuration || '').trim();
        const selectedPackage = String(req.body.selectedPackage || '').trim();

        if (!name || !email || !phone || !cep || !address || !goal || !contractDuration || !selectedPackage) {
            return res.status(400).json({ success: false, message: 'Preencha todos os campos da matrícula.' });
        }

        const students = await readStudents();
        let student = students.find((item) => normalizeEmail(item.email) === email);
        const isNewEnrollment = !student;

        if (student) {
            student.name = name;
            student.phone = phone;
            student.cep = cep;
            student.address = address;
            student.goal = goal;
            student.contractDuration = contractDuration;
            student.selectedPackage = selectedPackage;
            student.status = 'active';
            if (!student.accessToken) {
                student.accessToken = generateAccessToken();
            }
            student.updatedAt = new Date().toISOString();
        } else {
            student = {
                id: crypto.randomUUID(),
                name,
                email,
                phone,
                cep,
                address,
                goal,
                contractDuration,
                selectedPackage,
                accessToken: generateAccessToken(),
                status: 'active',
                enrolledAt: new Date().toISOString(),
                updatedAt: new Date().toISOString(),
            };
            students.push(student);
        }

        await writeStudents(students);
        req.session.studentId = student.id;

        let emailSent = false;
        try {
            emailSent = await sendEnrollmentEmail(student, isNewEnrollment);
        } catch (error) {
            emailSent = false;
        }

        return res.status(isNewEnrollment ? 201 : 200).json({
            success: true,
            emailSent,
            message: emailSent
                ? 'Matrícula recebida e enviada ao e-mail do professor.'
                : 'Matrícula salva com sucesso. Configure o SMTP no backend para envio automático por e-mail.',
            student: sanitizeStudent(student),
        });
    } catch (error) {
        return res.status(500).json({ success: false, message: 'Não foi possível concluir a matrícula agora.' });
    }
});

app.post('/api/member-access', async (req, res) => {
    try {
        const email = normalizeEmail(req.body.email);
        const token = String(req.body.token || '').trim().toUpperCase();

        if (!email || !token) {
            return res.status(400).json({ success: false, message: 'Informe e-mail e token para acessar.' });
        }

        const students = await readStudents();
        const student = students.find(
            (item) => normalizeEmail(item.email) === email && String(item.accessToken).toUpperCase() === token && item.status === 'active'
        );

        if (!student) {
            return res.status(401).json({ success: false, message: 'E-mail ou token inválidos.' });
        }

        req.session.studentId = student.id;
        return res.json({ success: true, student: sanitizeStudent(student) });
    } catch (error) {
        return res.status(500).json({ success: false, message: 'Não foi possível validar o acesso.' });
    }
});

app.get('/api/member/me', async (req, res) => {
    try {
        if (!req.session.studentId) {
            return res.status(401).json({ success: false, message: 'Sessão não encontrada.' });
        }

        const students = await readStudents();
        const student = students.find((item) => item.id === req.session.studentId && item.status === 'active');

        if (!student) {
            return res.status(401).json({ success: false, message: 'Aluno não encontrado.' });
        }

        return res.json({ success: true, student: sanitizeStudent(student) });
    } catch (error) {
        return res.status(500).json({ success: false, message: 'Não foi possível carregar a sessão.' });
    }
});

app.post('/api/member/logout', (req, res) => {
    req.session.destroy(() => {
        res.json({ success: true });
    });
});

app.get('*', (_req, res) => {
    res.sendFile(path.join(ROOT_DIR, 'index.html'));
});

ensureDataStore().then(() => {
    app.listen(PORT, () => {
        console.log(`Teacher Alex portal disponível em http://localhost:${PORT}`);
    });
});