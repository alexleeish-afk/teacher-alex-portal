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
