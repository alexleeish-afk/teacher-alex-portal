# Teacher Alex Portal

## Configuração rápida do e-mail

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

## Antes disso

- Ative a **verificação em 2 etapas** na conta Google
- Gere uma senha em **Segurança > Senhas de app**
- Use o e-mail `teacherr.alex@gmail.com`

## Rodar o projeto

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
