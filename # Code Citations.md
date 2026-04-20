# Code Citations

## License: unknown
https://github.com/akileshtangella/akilesh.net/blob/bfb68daab8b84f48f7419774f6e2727d95bbbbc1/index.html

```


````html
// filepath: c:\Users\Usuário\OneDrive\Desktop\ProjetosVScode\projeto2\professor.html
<!DOCTYPE html>
<html lang="pt-BR">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Painel do Professor — Teacher Alex</title>
    <link rel="icon" type="image/png" href="img/foto-profissional.png">
    <link rel="stylesheet" href="styles.css">
    <link rel="preconnect" href="https://fonts.googleapis.com">
    <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
    <link href="https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700;800&display=swap" rel="stylesheet">
    <style>
        body {
            font-family: 'Inter', sans-serif;
            background: #0f172a;
            color: #e2e8f0;
            margin: 0;
            min-height: 100vh;
        }

        /* ===== LOGIN ===== */
        .login-overlay {
            position: fixed;
            inset: 0;
            background: rgba(15, 23, 42, 0.97);
            display: flex;
            align-items: center;
            justify-content: center;
            z-index: 9999;
        }
        .login-overlay.hidden { display: none; }
        .login-box {
            background: #1e293b;
            border: 1px solid #334155;
            border-radius: 16px;
            padding: 40px 36px;
            max-width: 400px;
            width: 100%;
            text-align: center;
        }
        .login-box img {
            width: 80px;
            height: 80px;
            border-radius: 50%;
            object-fit: cover;
            margin-bottom: 16px;
            border: 3px solid #2563eb;
        }
        .login-box h2 { font-size: 1.4rem; margin-bottom: 6px; }
        .login-box p { color: #94a3b8; font-size: 0.9rem; margin-bottom: 20px; }
        .login-box input {
            width: 100%;
            padding: 12px 14px;
            border: 1px solid #334155;
            border-radius: 8px;
            background: #0f172a;
            color: #e2e8f0;
            font-size: 1rem;
            margin-bottom: 12px;
            box-sizing: border-box;
        }
        .login-box button {
            width: 100%;
            padding: 12px;
            background: #2563eb;
            color: #fff;
            border: none;
            border-radius: 8px;
            font-size: 1rem;
            font-weight: 700;
            cursor: pointer;
            transition: background 0.2s;
        }
        .login-box button:hover { background: #1d4ed8; }
        .login-error { color: #ef4444; font-size: 0.85rem; margin-top: 8px; }

        /* ===== PAINEL ===== */
        .panel-header {
            background: #1e293b;
            border-bottom: 1px solid #334155;
            padding: 16px 24px;
            display: flex;
            align-items: center;
            justify-content: space-between;
            flex-wrap: wrap;
            gap: 12px;
        }
        .panel-header-left {
            display: flex;
            align-items: center;
            gap: 12px;
        }
        .panel-header img {
            width: 44px;
            height: 44px;
            border-radius: 50%;
            object-fit: cover;
            border: 2px solid #2563eb;
        }
        .panel-header h1 { font-size: 1.2rem; margin: 0; }
        .panel-header span { color: #94a3b8; font-size: 0.85rem; }
        .btn-logout {
            padding: 8px 18px;
            background: #ef4444;
            color: #fff;
            border: none;
            border-radius: 8px;
            font-weight: 700;
            cursor: pointer;
            font-size: 0.85rem;
        }
        .btn-logout:hover { background: #dc2626; }

        /* ===== GRID PRINCIPAL ===== */
        .panel-grid {
            display: grid;
            grid-template-columns: 1fr 320px;
            gap: 0;
            min-height: calc(100vh - 77px);
        }
        @media (max-width: 900px) {
            .panel-grid { grid-template-columns: 1fr; }
        }

        /* ===== ÁREA DE VÍDEO ===== */
        .video-section {
            padding: 24px;
            display: flex;
            flex-direction: column;
            gap: 16px;
        }
        .live-status-bar {
            display: flex;
            align-items: center;
            gap: 10px;
            background: #1e293b;
            border: 1px solid #334155;
            border-radius: 10px;
            padding: 12px 18px;
            font-weight: 600;
            font-size: 0.95rem;
        }
        .status-dot {
            width: 14px;
            height: 14px;
            border-radius: 50%;
            flex-shrink: 0;
        }
        .status-dot.offline { background: #6b7280; }
        .status-dot.waiting { background: #f59e0b; animation: pulse 1.5s infinite; }
        .status-dot.live { background: #22c55e; animation: pulse 1s infinite; }
        @keyframes pulse {
            0%, 100% { opacity: 1; transform: scale(1); }
            50% { opacity: 0.5; transform: scale(1.3); }
        }

        .video-grid {
            display: grid;
            grid-template-columns: 1fr 1fr;
            gap: 14px;
        }
        @media (max-width: 700px) { .video-grid { grid-template-columns: 1fr; } }
        .video-wrapper {
            position: relative;
            background: #000;
            border-radius: 14px;
            overflow: hidden;
            aspect-ratio: 16/9;
            border: 2px solid #334155;
        }
        .video-wrapper video {
            width: 100%;
            height: 100%;
            object-fit: cover;
        }
        .video-label {
            position: absolute;
            bottom: 10px;
            left: 12px;
            background: rgba(0,0,0,0.65);
            color: #fff;
            padding: 4px 12px;
            border-radius: 20px;
            font-size: 0.8rem;
            font-weight: 600;
        }

        .controls-row {
            display: flex;
            flex-wrap: wrap;
            gap: 10px;
        }
        .ctrl-btn {
            padding: 10px 20px;
            border: none;
            border-radius: 10px;
            font-weight: 700;
            font-size: 0.9rem;
            cursor: pointer;
            transition: all 0.2s;
            color: #fff;
        }
        .ctrl-btn:disabled { opacity: 0.35; cursor: not-allowed; }
        .ctrl-btn.cam { background: #2563eb; }
        .ctrl-btn.cam:hover:not(:disabled) { background: #1d4ed8; }
        .ctrl-btn.mic { background: #10b981; }
        .ctrl-btn.mic:hover:not(:disabled) { background: #059669; }
        .ctrl-btn.vid { background: #8b5cf6; }
        .ctrl-btn.vid:hover:not(:disabled) { background: #7c3aed; }
        .ctrl-btn.start { background: #22c55e; }
        .ctrl-btn.start:hover:not(:disabled) { background: #16a34a; }
        .ctrl-btn.stop { background: #ef4444; }
        .ctrl-btn.stop:hover:not(:disabled) { background: #dc2626; }
        .ctrl-btn.hidden { display: none; }

        .room-info {
            background: #1e293b;
            border: 1px solid #334155;
            border-radius: 10px;
            padding: 14px 18px;
            font-size: 0.88rem;
            color: #94a3b8;
            line-height: 1.7;
        }
        .room-info strong { color: #e2e8f0; }
        .room-id-code {
            font-family: monospace;
            background: #334155;
            padding: 2px 10px;
            border-radius: 4px;
            color: #38bdf8;
            font-weight: 700;
        }

        /* ===== ALUNOS CONECTADOS ===== */
        .students-list {
            background: #1e293b;
            border: 1px solid #334155;
            border-radius: 10px;
            padding: 14px 18px;
            margin-top: 8px;
        }
        .students-list h4 { margin: 0 0 10px; font-size: 0.95rem; color: #e
```


## License: unknown
https://github.com/akileshtangella/akilesh.net/blob/bfb68daab8b84f48f7419774f6e2727d95bbbbc1/index.html

```


````html
// filepath: c:\Users\Usuário\OneDrive\Desktop\ProjetosVScode\projeto2\professor.html
<!DOCTYPE html>
<html lang="pt-BR">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Painel do Professor — Teacher Alex</title>
    <link rel="icon" type="image/png" href="img/foto-profissional.png">
    <link rel="stylesheet" href="styles.css">
    <link rel="preconnect" href="https://fonts.googleapis.com">
    <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
    <link href="https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700;800&display=swap" rel="stylesheet">
    <style>
        body {
            font-family: 'Inter', sans-serif;
            background: #0f172a;
            color: #e2e8f0;
            margin: 0;
            min-height: 100vh;
        }

        /* ===== LOGIN ===== */
        .login-overlay {
            position: fixed;
            inset: 0;
            background: rgba(15, 23, 42, 0.97);
            display: flex;
            align-items: center;
            justify-content: center;
            z-index: 9999;
        }
        .login-overlay.hidden { display: none; }
        .login-box {
            background: #1e293b;
            border: 1px solid #334155;
            border-radius: 16px;
            padding: 40px 36px;
            max-width: 400px;
            width: 100%;
            text-align: center;
        }
        .login-box img {
            width: 80px;
            height: 80px;
            border-radius: 50%;
            object-fit: cover;
            margin-bottom: 16px;
            border: 3px solid #2563eb;
        }
        .login-box h2 { font-size: 1.4rem; margin-bottom: 6px; }
        .login-box p { color: #94a3b8; font-size: 0.9rem; margin-bottom: 20px; }
        .login-box input {
            width: 100%;
            padding: 12px 14px;
            border: 1px solid #334155;
            border-radius: 8px;
            background: #0f172a;
            color: #e2e8f0;
            font-size: 1rem;
            margin-bottom: 12px;
            box-sizing: border-box;
        }
        .login-box button {
            width: 100%;
            padding: 12px;
            background: #2563eb;
            color: #fff;
            border: none;
            border-radius: 8px;
            font-size: 1rem;
            font-weight: 700;
            cursor: pointer;
            transition: background 0.2s;
        }
        .login-box button:hover { background: #1d4ed8; }
        .login-error { color: #ef4444; font-size: 0.85rem; margin-top: 8px; }

        /* ===== PAINEL ===== */
        .panel-header {
            background: #1e293b;
            border-bottom: 1px solid #334155;
            padding: 16px 24px;
            display: flex;
            align-items: center;
            justify-content: space-between;
            flex-wrap: wrap;
            gap: 12px;
        }
        .panel-header-left {
            display: flex;
            align-items: center;
            gap: 12px;
        }
        .panel-header img {
            width: 44px;
            height: 44px;
            border-radius: 50%;
            object-fit: cover;
            border: 2px solid #2563eb;
        }
        .panel-header h1 { font-size: 1.2rem; margin: 0; }
        .panel-header span { color: #94a3b8; font-size: 0.85rem; }
        .btn-logout {
            padding: 8px 18px;
            background: #ef4444;
            color: #fff;
            border: none;
            border-radius: 8px;
            font-weight: 700;
            cursor: pointer;
            font-size: 0.85rem;
        }
        .btn-logout:hover { background: #dc2626; }

        /* ===== GRID PRINCIPAL ===== */
        .panel-grid {
            display: grid;
            grid-template-columns: 1fr 320px;
            gap: 0;
            min-height: calc(100vh - 77px);
        }
        @media (max-width: 900px) {
            .panel-grid { grid-template-columns: 1fr; }
        }

        /* ===== ÁREA DE VÍDEO ===== */
        .video-section {
            padding: 24px;
            display: flex;
            flex-direction: column;
            gap: 16px;
        }
        .live-status-bar {
            display: flex;
            align-items: center;
            gap: 10px;
            background: #1e293b;
            border: 1px solid #334155;
            border-radius: 10px;
            padding: 12px 18px;
            font-weight: 600;
            font-size: 0.95rem;
        }
        .status-dot {
            width: 14px;
            height: 14px;
            border-radius: 50%;
            flex-shrink: 0;
        }
        .status-dot.offline { background: #6b7280; }
        .status-dot.waiting { background: #f59e0b; animation: pulse 1.5s infinite; }
        .status-dot.live { background: #22c55e; animation: pulse 1s infinite; }
        @keyframes pulse {
            0%, 100% { opacity: 1; transform: scale(1); }
            50% { opacity: 0.5; transform: scale(1.3); }
        }

        .video-grid {
            display: grid;
            grid-template-columns: 1fr 1fr;
            gap: 14px;
        }
        @media (max-width: 700px) { .video-grid { grid-template-columns: 1fr; } }
        .video-wrapper {
            position: relative;
            background: #000;
            border-radius: 14px;
            overflow: hidden;
            aspect-ratio: 16/9;
            border: 2px solid #334155;
        }
        .video-wrapper video {
            width: 100%;
            height: 100%;
            object-fit: cover;
        }
        .video-label {
            position: absolute;
            bottom: 10px;
            left: 12px;
            background: rgba(0,0,0,0.65);
            color: #fff;
            padding: 4px 12px;
            border-radius: 20px;
            font-size: 0.8rem;
            font-weight: 600;
        }

        .controls-row {
            display: flex;
            flex-wrap: wrap;
            gap: 10px;
        }
        .ctrl-btn {
            padding: 10px 20px;
            border: none;
            border-radius: 10px;
            font-weight: 700;
            font-size: 0.9rem;
            cursor: pointer;
            transition: all 0.2s;
            color: #fff;
        }
        .ctrl-btn:disabled { opacity: 0.35; cursor: not-allowed; }
        .ctrl-btn.cam { background: #2563eb; }
        .ctrl-btn.cam:hover:not(:disabled) { background: #1d4ed8; }
        .ctrl-btn.mic { background: #10b981; }
        .ctrl-btn.mic:hover:not(:disabled) { background: #059669; }
        .ctrl-btn.vid { background: #8b5cf6; }
        .ctrl-btn.vid:hover:not(:disabled) { background: #7c3aed; }
        .ctrl-btn.start { background: #22c55e; }
        .ctrl-btn.start:hover:not(:disabled) { background: #16a34a; }
        .ctrl-btn.stop { background: #ef4444; }
        .ctrl-btn.stop:hover:not(:disabled) { background: #dc2626; }
        .ctrl-btn.hidden { display: none; }

        .room-info {
            background: #1e293b;
            border: 1px solid #334155;
            border-radius: 10px;
            padding: 14px 18px;
            font-size: 0.88rem;
            color: #94a3b8;
            line-height: 1.7;
        }
        .room-info strong { color: #e2e8f0; }
        .room-id-code {
            font-family: monospace;
            background: #334155;
            padding: 2px 10px;
            border-radius: 4px;
            color: #38bdf8;
            font-weight: 700;
        }

        /* ===== ALUNOS CONECTADOS ===== */
        .students-list {
            background: #1e293b;
            border: 1px solid #334155;
            border-radius: 10px;
            padding: 14px 18px;
            margin-top: 8px;
        }
        .students-list h4 { margin: 0 0 10px; font-size: 0.95rem; color: #e
```


## License: unknown
https://github.com/CybroOdoo/CybroAddons/blob/496c5fb6e6e791367ca5d8635d872d020bfbd6b9/login_using_qr/static/description/index.html

```


````html
// filepath: c:\Users\Usuário\OneDrive\Desktop\ProjetosVScode\projeto2\professor.html
<!DOCTYPE html>
<html lang="pt-BR">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Painel do Professor — Teacher Alex</title>
    <link rel="icon" type="image/png" href="img/foto-profissional.png">
    <link rel="stylesheet" href="styles.css">
    <link rel="preconnect" href="https://fonts.googleapis.com">
    <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
    <link href="https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700;800&display=swap" rel="stylesheet">
    <style>
        body {
            font-family: 'Inter', sans-serif;
            background: #0f172a;
            color: #e2e8f0;
            margin: 0;
            min-height: 100vh;
        }

        /* ===== LOGIN ===== */
        .login-overlay {
            position: fixed;
            inset: 0;
            background: rgba(15, 23, 42, 0.97);
            display: flex;
            align-items: center;
            justify-content: center;
            z-index: 9999;
        }
        .login-overlay.hidden { display: none; }
        .login-box {
            background: #1e293b;
            border: 1px solid #334155;
            border-radius: 16px;
            padding: 40px 36px;
            max-width: 400px;
            width: 100%;
            text-align: center;
        }
        .login-box img {
            width: 80px;
            height: 80px;
            border-radius: 50%;
            object-fit: cover;
            margin-bottom: 16px;
            border: 3px solid #2563eb;
        }
        .login-box h2 { font-size: 1.4rem; margin-bottom: 6px; }
        .login-box p { color: #94a3b8; font-size: 0.9rem; margin-bottom: 20px; }
        .login-box input {
            width: 100%;
            padding: 12px 14px;
            border: 1px solid #334155;
            border-radius: 8px;
            background: #0f172a;
            color: #e2e8f0;
            font-size: 1rem;
            margin-bottom: 12px;
            box-sizing: border-box;
        }
        .login-box button {
            width: 100%;
            padding: 12px;
            background: #2563eb;
            color: #fff;
            border: none;
            border-radius: 8px;
            font-size: 1rem;
            font-weight: 700;
            cursor: pointer;
            transition: background 0.2s;
        }
        .login-box button:hover { background: #1d4ed8; }
        .login-error { color: #ef4444; font-size: 0.85rem; margin-top: 8px; }

        /* ===== PAINEL ===== */
        .panel-header {
            background: #1e293b;
            border-bottom: 1px solid #334155;
            padding: 16px 24px;
            display: flex;
            align-items: center;
            justify-content: space-between;
            flex-wrap: wrap;
            gap: 12px;
        }
        .panel-header-left {
            display: flex;
            align-items: center;
            gap: 12px;
        }
        .panel-header img {
            width: 44px;
            height: 44px;
            border-radius: 50%;
            object-fit: cover;
            border: 2px solid #2563eb;
        }
        .panel-header h1 { font-size: 1.2rem; margin: 0; }
        .panel-header span { color: #94a3b8; font-size: 0.85rem; }
        .btn-logout {
            padding: 8px 18px;
            background: #ef4444;
            color: #fff;
            border: none;
            border-radius: 8px;
            font-weight: 700;
            cursor: pointer;
            font-size: 0.85rem;
        }
        .btn-logout:hover { background: #dc2626; }

        /* ===== GRID PRINCIPAL ===== */
        .panel-grid {
            display: grid;
            grid-template-columns: 1fr 320px;
            gap: 0;
            min-height: calc(100vh - 77px);
        }
        @media (max-width: 900px) {
            .panel-grid { grid-template-columns: 1fr; }
        }

        /* ===== ÁREA DE VÍDEO ===== */
        .video-section {
            padding: 24px;
            display: flex;
            flex-direction: column;
            gap: 16px;
        }
        .live-status-bar {
            display: flex;
            align-items: center;
            gap: 10px;
            background: #1e293b;
            border: 1px solid #334155;
            border-radius: 10px;
            padding: 12px 18px;
            font-weight: 600;
            font-size: 0.95rem;
        }
        .status-dot {
            width: 14px;
            height: 14px;
            border-radius: 50%;
            flex-shrink: 0;
        }
        .status-dot.offline { background: #6b7280; }
        .status-dot.waiting { background: #f59e0b; animation: pulse 1.5s infinite; }
        .status-dot.live { background: #22c55e; animation: pulse 1s infinite; }
        @keyframes pulse {
            0%, 100% { opacity: 1; transform: scale(1); }
            50% { opacity: 0.5; transform: scale(1.3); }
        }

        .video-grid {
            display: grid;
            grid-template-columns: 1fr 1fr;
            gap: 14px;
        }
        @media (max-width: 700px) { .video-grid { grid-template-columns: 1fr; } }
        .video-wrapper {
            position: relative;
            background: #000;
            border-radius: 14px;
            overflow: hidden;
            aspect-ratio: 16/9;
            border: 2px solid #334155;
        }
        .video-wrapper video {
            width: 100%;
            height: 100%;
            object-fit: cover;
        }
        .video-label {
            position: absolute;
            bottom: 10px;
            left: 12px;
            background: rgba(0,0,0,0.65);
            color: #fff;
            padding: 4px 12px;
            border-radius: 20px;
            font-size: 0.8rem;
            font-weight: 600;
        }

        .controls-row {
            display: flex;
            flex-wrap: wrap;
            gap: 10px;
        }
        .ctrl-btn {
            padding: 10px 20px;
            border: none;
            border-radius: 10px;
            font-weight: 700;
            font-size: 0.9rem;
            cursor: pointer;
            transition: all 0.2s;
            color: #fff;
        }
        .ctrl-btn:disabled { opacity: 0.35; cursor: not-allowed; }
        .ctrl-btn.cam { background: #2563eb; }
        .ctrl-btn.cam:hover:not(:disabled) { background: #1d4ed8; }
        .ctrl-btn.mic { background: #10b981; }
        .ctrl-btn.mic:hover:not(:disabled) { background: #059669; }
        .ctrl-btn.vid { background: #8b5cf6; }
        .ctrl-btn.vid:hover:not(:disabled) { background: #7c3aed; }
        .ctrl-btn.start { background: #22c55e; }
        .ctrl-btn.start:hover:not(:disabled) { background: #16a34a; }
        .ctrl-btn.stop { background: #ef4444; }
        .ctrl-btn.stop:hover:not(:disabled) { background: #dc2626; }
        .ctrl-btn.hidden { display: none; }

        .room-info {
            background: #1e293b;
            border: 1px solid #334155;
            border-radius: 10px;
            padding: 14px 18px;
            font-size: 0.88rem;
            color: #94a3b8;
            line-height: 1.7;
        }
        .room-info strong { color: #e2e8f0; }
        .room-id-code {
            font-family: monospace;
            background: #334155;
            padding: 2px 10px;
            border-radius: 4px;
            color: #38bdf8;
            font-weight: 700;
        }

        /* ===== ALUNOS CONECTADOS ===== */
        .students-list {
            background: #1e293b;
            border: 1px solid #334155;
            border-radius: 10px;
            padding: 14px 18px;
            margin-top: 8px;
        }
        .students-list h4 { margin: 0 0 10px; font-size: 0.95rem; color: #e2e8f0; }
        .student-entry {
            display: flex;
            align-items: center;
            gap: 8px;
            padding: 6px 0;
            border-bottom: 1px solid #334155;
            
```


## License: unknown
https://github.com/akileshtangella/akilesh.net/blob/bfb68daab8b84f48f7419774f6e2727d95bbbbc1/index.html

```


````html
// filepath: c:\Users\Usuário\OneDrive\Desktop\ProjetosVScode\projeto2\professor.html
<!DOCTYPE html>
<html lang="pt-BR">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Painel do Professor — Teacher Alex</title>
    <link rel="icon" type="image/png" href="img/foto-profissional.png">
    <link rel="stylesheet" href="styles.css">
    <link rel="preconnect" href="https://fonts.googleapis.com">
    <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
    <link href="https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700;800&display=swap" rel="stylesheet">
    <style>
        body {
            font-family: 'Inter', sans-serif;
            background: #0f172a;
            color: #e2e8f0;
            margin: 0;
            min-height: 100vh;
        }

        /* ===== LOGIN ===== */
        .login-overlay {
            position: fixed;
            inset: 0;
            background: rgba(15, 23, 42, 0.97);
            display: flex;
            align-items: center;
            justify-content: center;
            z-index: 9999;
        }
        .login-overlay.hidden { display: none; }
        .login-box {
            background: #1e293b;
            border: 1px solid #334155;
            border-radius: 16px;
            padding: 40px 36px;
            max-width: 400px;
            width: 100%;
            text-align: center;
        }
        .login-box img {
            width: 80px;
            height: 80px;
            border-radius: 50%;
            object-fit: cover;
            margin-bottom: 16px;
            border: 3px solid #2563eb;
        }
        .login-box h2 { font-size: 1.4rem; margin-bottom: 6px; }
        .login-box p { color: #94a3b8; font-size: 0.9rem; margin-bottom: 20px; }
        .login-box input {
            width: 100%;
            padding: 12px 14px;
            border: 1px solid #334155;
            border-radius: 8px;
            background: #0f172a;
            color: #e2e8f0;
            font-size: 1rem;
            margin-bottom: 12px;
            box-sizing: border-box;
        }
        .login-box button {
            width: 100%;
            padding: 12px;
            background: #2563eb;
            color: #fff;
            border: none;
            border-radius: 8px;
            font-size: 1rem;
            font-weight: 700;
            cursor: pointer;
            transition: background 0.2s;
        }
        .login-box button:hover { background: #1d4ed8; }
        .login-error { color: #ef4444; font-size: 0.85rem; margin-top: 8px; }

        /* ===== PAINEL ===== */
        .panel-header {
            background: #1e293b;
            border-bottom: 1px solid #334155;
            padding: 16px 24px;
            display: flex;
            align-items: center;
            justify-content: space-between;
            flex-wrap: wrap;
            gap: 12px;
        }
        .panel-header-left {
            display: flex;
            align-items: center;
            gap: 12px;
        }
        .panel-header img {
            width: 44px;
            height: 44px;
            border-radius: 50%;
            object-fit: cover;
            border: 2px solid #2563eb;
        }
        .panel-header h1 { font-size: 1.2rem; margin: 0; }
        .panel-header span { color: #94a3b8; font-size: 0.85rem; }
        .btn-logout {
            padding: 8px 18px;
            background: #ef4444;
            color: #fff;
            border: none;
            border-radius: 8px;
            font-weight: 700;
            cursor: pointer;
            font-size: 0.85rem;
        }
        .btn-logout:hover { background: #dc2626; }

        /* ===== GRID PRINCIPAL ===== */
        .panel-grid {
            display: grid;
            grid-template-columns: 1fr 320px;
            gap: 0;
            min-height: calc(100vh - 77px);
        }
        @media (max-width: 900px) {
            .panel-grid { grid-template-columns: 1fr; }
        }

        /* ===== ÁREA DE VÍDEO ===== */
        .video-section {
            padding: 24px;
            display: flex;
            flex-direction: column;
            gap: 16px;
        }
        .live-status-bar {
            display: flex;
            align-items: center;
            gap: 10px;
            background: #1e293b;
            border: 1px solid #334155;
            border-radius: 10px;
            padding: 12px 18px;
            font-weight: 600;
            font-size: 0.95rem;
        }
        .status-dot {
            width: 14px;
            height: 14px;
            border-radius: 50%;
            flex-shrink: 0;
        }
        .status-dot.offline { background: #6b7280; }
        .status-dot.waiting { background: #f59e0b; animation: pulse 1.5s infinite; }
        .status-dot.live { background: #22c55e; animation: pulse 1s infinite; }
        @keyframes pulse {
            0%, 100% { opacity: 1; transform: scale(1); }
            50% { opacity: 0.5; transform: scale(1.3); }
        }

        .video-grid {
            display: grid;
            grid-template-columns: 1fr 1fr;
            gap: 14px;
        }
        @media (max-width: 700px) { .video-grid { grid-template-columns: 1fr; } }
        .video-wrapper {
            position: relative;
            background: #000;
            border-radius: 14px;
            overflow: hidden;
            aspect-ratio: 16/9;
            border: 2px solid #334155;
        }
        .video-wrapper video {
            width: 100%;
            height: 100%;
            object-fit: cover;
        }
        .video-label {
            position: absolute;
            bottom: 10px;
            left: 12px;
            background: rgba(0,0,0,0.65);
            color: #fff;
            padding: 4px 12px;
            border-radius: 20px;
            font-size: 0.8rem;
            font-weight: 600;
        }

        .controls-row {
            display: flex;
            flex-wrap: wrap;
            gap: 10px;
        }
        .ctrl-btn {
            padding: 10px 20px;
            border: none;
            border-radius: 10px;
            font-weight: 700;
            font-size: 0.9rem;
            cursor: pointer;
            transition: all 0.2s;
            color: #fff;
        }
        .ctrl-btn:disabled { opacity: 0.35; cursor: not-allowed; }
        .ctrl-btn.cam { background: #2563eb; }
        .ctrl-btn.cam:hover:not(:disabled) { background: #1d4ed8; }
        .ctrl-btn.mic { background: #10b981; }
        .ctrl-btn.mic:hover:not(:disabled) { background: #059669; }
        .ctrl-btn.vid { background: #8b5cf6; }
        .ctrl-btn.vid:hover:not(:disabled) { background: #7c3aed; }
        .ctrl-btn.start { background: #22c55e; }
        .ctrl-btn.start:hover:not(:disabled) { background: #16a34a; }
        .ctrl-btn.stop { background: #ef4444; }
        .ctrl-btn.stop:hover:not(:disabled) { background: #dc2626; }
        .ctrl-btn.hidden { display: none; }

        .room-info {
            background: #1e293b;
            border: 1px solid #334155;
            border-radius: 10px;
            padding: 14px 18px;
            font-size: 0.88rem;
            color: #94a3b8;
            line-height: 1.7;
        }
        .room-info strong { color: #e2e8f0; }
        .room-id-code {
            font-family: monospace;
            background: #334155;
            padding: 2px 10px;
            border-radius: 4px;
            color: #38bdf8;
            font-weight: 700;
        }

        /* ===== ALUNOS CONECTADOS ===== */
        .students-list {
            background: #1e293b;
            border: 1px solid #334155;
            border-radius: 10px;
            padding: 14px 18px;
            margin-top: 8px;
        }
        .students-list h4 { margin: 0 0 10px; font-size: 0.95rem; color: #e2e8f0; }
        .student-entry {
            display: flex;
            align-items: center;
            gap: 8px;
            padding: 6px 0;
            border-bottom: 1px solid #334155;
            
```


## License: unknown
https://github.com/CybroOdoo/CybroAddons/blob/496c5fb6e6e791367ca5d8635d872d020bfbd6b9/login_using_qr/static/description/index.html

```


````html
// filepath: c:\Users\Usuário\OneDrive\Desktop\ProjetosVScode\projeto2\professor.html
<!DOCTYPE html>
<html lang="pt-BR">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Painel do Professor — Teacher Alex</title>
    <link rel="icon" type="image/png" href="img/foto-profissional.png">
    <link rel="stylesheet" href="styles.css">
    <link rel="preconnect" href="https://fonts.googleapis.com">
    <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
    <link href="https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700;800&display=swap" rel="stylesheet">
    <style>
        body {
            font-family: 'Inter', sans-serif;
            background: #0f172a;
            color: #e2e8f0;
            margin: 0;
            min-height: 100vh;
        }

        /* ===== LOGIN ===== */
        .login-overlay {
            position: fixed;
            inset: 0;
            background: rgba(15, 23, 42, 0.97);
            display: flex;
            align-items: center;
            justify-content: center;
            z-index: 9999;
        }
        .login-overlay.hidden { display: none; }
        .login-box {
            background: #1e293b;
            border: 1px solid #334155;
            border-radius: 16px;
            padding: 40px 36px;
            max-width: 400px;
            width: 100%;
            text-align: center;
        }
        .login-box img {
            width: 80px;
            height: 80px;
            border-radius: 50%;
            object-fit: cover;
            margin-bottom: 16px;
            border: 3px solid #2563eb;
        }
        .login-box h2 { font-size: 1.4rem; margin-bottom: 6px; }
        .login-box p { color: #94a3b8; font-size: 0.9rem; margin-bottom: 20px; }
        .login-box input {
            width: 100%;
            padding: 12px 14px;
            border: 1px solid #334155;
            border-radius: 8px;
            background: #0f172a;
            color: #e2e8f0;
            font-size: 1rem;
            margin-bottom: 12px;
            box-sizing: border-box;
        }
        .login-box button {
            width: 100%;
            padding: 12px;
            background: #2563eb;
            color: #fff;
            border: none;
            border-radius: 8px;
            font-size: 1rem;
            font-weight: 700;
            cursor: pointer;
            transition: background 0.2s;
        }
        .login-box button:hover { background: #1d4ed8; }
        .login-error { color: #ef4444; font-size: 0.85rem; margin-top: 8px; }

        /* ===== PAINEL ===== */
        .panel-header {
            background: #1e293b;
            border-bottom: 1px solid #334155;
            padding: 16px 24px;
            display: flex;
            align-items: center;
            justify-content: space-between;
            flex-wrap: wrap;
            gap: 12px;
        }
        .panel-header-left {
            display: flex;
            align-items: center;
            gap: 12px;
        }
        .panel-header img {
            width: 44px;
            height: 44px;
            border-radius: 50%;
            object-fit: cover;
            border: 2px solid #2563eb;
        }
        .panel-header h1 { font-size: 1.2rem; margin: 0; }
        .panel-header span { color: #94a3b8; font-size: 0.85rem; }
        .btn-logout {
            padding: 8px 18px;
            background: #ef4444;
            color: #fff;
            border: none;
            border-radius: 8px;
            font-weight: 700;
            cursor: pointer;
            font-size: 0.85rem;
        }
        .btn-logout:hover { background: #dc2626; }

        /* ===== GRID PRINCIPAL ===== */
        .panel-grid {
            display: grid;
            grid-template-columns: 1fr 320px;
            gap: 0;
            min-height: calc(100vh - 77px);
        }
        @media (max-width: 900px) {
            .panel-grid { grid-template-columns: 1fr; }
        }

        /* ===== ÁREA DE VÍDEO ===== */
        .video-section {
            padding: 24px;
            display: flex;
            flex-direction: column;
            gap: 16px;
        }
        .live-status-bar {
            display: flex;
            align-items: center;
            gap: 10px;
            background: #1e293b;
            border: 1px solid #334155;
            border-radius: 10px;
            padding: 12px 18px;
            font-weight: 600;
            font-size: 0.95rem;
        }
        .status-dot {
            width: 14px;
            height: 14px;
            border-radius: 50%;
            flex-shrink: 0;
        }
        .status-dot.offline { background: #6b7280; }
        .status-dot.waiting { background: #f59e0b; animation: pulse 1.5s infinite; }
        .status-dot.live { background: #22c55e; animation: pulse 1s infinite; }
        @keyframes pulse {
            0%, 100% { opacity: 1; transform: scale(1); }
            50% { opacity: 0.5; transform: scale(1.3); }
        }

        .video-grid {
            display: grid;
            grid-template-columns: 1fr 1fr;
            gap: 14px;
        }
        @media (max-width: 700px) { .video-grid { grid-template-columns: 1fr; } }
        .video-wrapper {
            position: relative;
            background: #000;
            border-radius: 14px;
            overflow: hidden;
            aspect-ratio: 16/9;
            border: 2px solid #334155;
        }
        .video-wrapper video {
            width: 100%;
            height: 100%;
            object-fit: cover;
        }
        .video-label {
            position: absolute;
            bottom: 10px;
            left: 12px;
            background: rgba(0,0,0,0.65);
            color: #fff;
            padding: 4px 12px;
            border-radius: 20px;
            font-size: 0.8rem;
            font-weight: 600;
        }

        .controls-row {
            display: flex;
            flex-wrap: wrap;
            gap: 10px;
        }
        .ctrl-btn {
            padding: 10px 20px;
            border: none;
            border-radius: 10px;
            font-weight: 700;
            font-size: 0.9rem;
            cursor: pointer;
            transition: all 0.2s;
            color: #fff;
        }
        .ctrl-btn:disabled { opacity: 0.35; cursor: not-allowed; }
        .ctrl-btn.cam { background: #2563eb; }
        .ctrl-btn.cam:hover:not(:disabled) { background: #1d4ed8; }
        .ctrl-btn.mic { background: #10b981; }
        .ctrl-btn.mic:hover:not(:disabled) { background: #059669; }
        .ctrl-btn.vid { background: #8b5cf6; }
        .ctrl-btn.vid:hover:not(:disabled) { background: #7c3aed; }
        .ctrl-btn.start { background: #22c55e; }
        .ctrl-btn.start:hover:not(:disabled) { background: #16a34a; }
        .ctrl-btn.stop { background: #ef4444; }
        .ctrl-btn.stop:hover:not(:disabled) { background: #dc2626; }
        .ctrl-btn.hidden { display: none; }

        .room-info {
            background: #1e293b;
            border: 1px solid #334155;
            border-radius: 10px;
            padding: 14px 18px;
            font-size: 0.88rem;
            color: #94a3b8;
            line-height: 1.7;
        }
        .room-info strong { color: #e2e8f0; }
        .room-id-code {
            font-family: monospace;
            background: #334155;
            padding: 2px 10px;
            border-radius: 4px;
            color: #38bdf8;
            font-weight: 700;
        }

        /* ===== ALUNOS CONECTADOS ===== */
        .students-list {
            background: #1e293b;
            border: 1px solid #334155;
            border-radius: 10px;
            padding: 14px 18px;
            margin-top: 8px;
        }
        .students-list h4 { margin: 0 0 10px; font-size: 0.95rem; color: #e2e8f0; }
        .student-entry {
            display: flex;
            align-items: center;
            gap: 8px;
            padding: 6px 0;
            border-bottom: 1px solid #334155;
            
```

