# Teacher Alex Portal

## Hospedagem definitiva recomendada: Render

Entre **Render**, **Railway** e **Vercel**, a melhor opção para este projeto é o **Render** porque ele lida bem com `Node.js + Express`, variáveis de ambiente, deploy automático por GitHub e URL pública estável.

> O arquivo `render.yaml` já está pronto no projeto.

## Caminho definitivo de publicação

### 1) Subir para o GitHub
Crie um repositório vazio e rode:

```bash
git branch -M main
git remote add origin https://github.com/SEU-USUARIO/teacher-alex-portal.git
git push -u origin main
```

### 2) Publicar no Render
1. Acesse `https://render.com`
2. Clique em **New +** → **Web Service**
3. Conecte o repositório do GitHub
4. O Render vai ler automaticamente o `render.yaml`
5. Adicione as variáveis de ambiente que faltam no painel

### 3) Variáveis obrigatórias no Render
Use os mesmos valores do seu `.env`:

```env
NOTIFY_EMAIL=teacherr.alex@gmail.com
SMTP_USER=teacherr.alex@gmail.com
SMTP_PASS=SUA_SENHA_DE_APP_DO_GOOGLE
SMTP_FROM="Teacher Alex <teacherr.alex@gmail.com>"
```

## Configuração rápida do e-mail local

1. Abra o arquivo `.env`
2. Cole sua **Senha de App do Google** nesta linha:

```env
SMTP_PASS=
```

Exemplo:

```env
SMTP_PASS=abcd efgh ijkl mnop
```

ou

```env
SMTP_PASS=abcdefghijklmnop
```

## Rodar localmente

```bash
npm install
npm start
```

Depois abra:

```text
http://localhost:3000
```

## Destino dos cadastros

Os dados das matrículas serão enviados para:

- `teacherr.alex@gmail.com`

## Netlify + Backend Externo (100% funcional)

Esta arquitetura usa:

- Frontend no Netlify: `https://teacher-alex-portal-afk.netlify.app`
- Backend no Render ou Railway: API Node/Express

### 1) Frontend (Netlify)

O arquivo `config.js` define a URL da API externa:

```js
window.TEACHER_ALEX_API_BASE_URL = "https://teacher-alex-portal.onrender.com";
```

Se usar Railway, troque para a URL do seu serviço Railway.

### 2) Backend no Render

No serviço backend, configure:

```env
NODE_ENV=production
FRONTEND_ORIGINS=https://teacher-alex-portal-afk.netlify.app
NOTIFY_EMAIL=teacherr.alex@gmail.com
SMTP_HOST=smtp.gmail.com
SMTP_PORT=587
SMTP_SECURE=false
SMTP_USER=teacherr.alex@gmail.com
SMTP_PASS=SUA_SENHA_DE_APP_DO_GOOGLE
SMTP_FROM=Teacher Alex <teacherr.alex@gmail.com>
```

### 3) Backend no Railway (alternativa)

Use as mesmas variáveis acima no Railway. Depois, atualize `config.js` com a URL:

```js
window.TEACHER_ALEX_API_BASE_URL = "https://SEU-SERVICO.up.railway.app";
```

### 4) Publicar alterações no Netlify

Após mudar `config.js`, publique novamente:

```bash
npx netlify deploy --prod --dir . --site 5392ae88-8c77-42d7-8fe5-54313e2635d4
```
