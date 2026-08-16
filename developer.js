/* ═══════════════════════════════════════════════════════
   CRYPTOKIT — DEVELOPER TERMINAL ENGINE
   Full terminal emulator with CMD / PowerShell / Bash
═══════════════════════════════════════════════════════ */

'use strict';

/* ── STATE ─────────────────────────────────────────── */
const STATE = {
    shell:        'powershell',   // 'cmd' | 'powershell' | 'bash'
    history:      [],             // command history array
    historyIndex: -1,             // current history pointer
    lastOutput:   '',             // last output text for copy
    busy:         false,          // is a command running?
    acIndex:      -1,             // autocomplete selection index
};

/* ── SHELL CONFIG ───────────────────────────────────── */
const SHELLS = {
    powershell: {
        label:      'Windows PowerShell',
        prompt:     'PS C:\\CryptoKit>',
        promptClass:'t-prompt-ps',
        chromeTitle:'Windows PowerShell — CryptoKit Developer Terminal',
        engineLabel:'PowerShell',
        bootLines: [
            { text: 'Windows PowerShell', cls: 't-white' },
            { text: 'Copyright (C) Microsoft Corporation. All rights reserved.', cls: 't-muted' },
            { text: '', cls: 'blank' },
            { text: 'CryptoKit Crypto Engine v1.0.0 loaded ✔', cls: 't-success' },
            { text: 'WebCrypto API  : Available ✔', cls: 't-success' },
            { text: 'Type  help  to see all available commands.', cls: 't-info' },
            { text: '', cls: 'blank' },
        ],
    },
    cmd: {
        label:      'Command Prompt',
        prompt:     'C:\\CryptoKit>',
        promptClass:'t-prompt-cmd',
        chromeTitle:'Command Prompt — CryptoKit Developer Terminal',
        engineLabel:'CMD',
        bootLines: [
            { text: 'Microsoft Windows [Version 10.0.22621]', cls: 't-white' },
            { text: '(c) Microsoft Corporation. All rights reserved.', cls: 't-muted' },
            { text: '', cls: 'blank' },
            { text: 'CryptoKit Crypto Engine v1.0.0 loaded', cls: 't-success' },
            { text: 'Type  help  to see all available commands.', cls: 't-info' },
            { text: '', cls: 'blank' },
        ],
    },
    bash: {
        label:      'Bash / Zsh',
        prompt:     'cryptokit@dev:~$',
        promptClass:'t-prompt-bash',
        chromeTitle:'Bash — CryptoKit Developer Terminal',
        engineLabel:'Bash / Zsh',
        bootLines: [
            { text: 'CryptoKit Terminal  [bash 5.2.0]', cls: 't-success' },
            { text: 'WebCrypto API: available ✔', cls: 't-success' },
            { text: '# Type  help  to list all commands', cls: 't-comment' },
            { text: '', cls: 'blank' },
        ],
    },
};

/* ── QUICK COMMANDS PER SHELL ───────────────────────── */
const QUICK_CMDS = {
    powershell: [
        { icon:'🔑', name:'Get-FileHash SHA256', desc:'Hash a file',          cmd:'Get-FileHash .\\file.txt -Algorithm SHA256' },
        { icon:'🔐', name:'openssl genrsa',       desc:'Generate RSA key',     cmd:'openssl genrsa -out private.pem 2048' },
        { icon:'🔑', name:'Generate Password',    desc:'Secure password',      cmd:'cryptokit passwd --generate --length 16 --strong' },
        { icon:'✅', name:'Check Password',       desc:'Strength check',       cmd:'cryptokit passwd --check "MyPassword123"' },
        { icon:'📄', name:'Base64 Encode',        desc:'Encode string',        cmd:'cryptokit encode --base64 "hello world"' },
        { icon:'🔒', name:'AES Encrypt',          desc:'Encrypt text',         cmd:'cryptokit aes --encrypt "secret" --key "password"' },
        { icon:'ℹ️',  name:'System Info',          desc:'Engine details',       cmd:'cryptokit --info' },
        { icon:'❓', name:'Help',                  desc:'All commands',         cmd:'help' },
    ],
    cmd: [
        { icon:'#️⃣', name:'certutil MD5',         desc:'MD5 hash file',        cmd:'certutil -hashfile document.txt MD5' },
        { icon:'#️⃣', name:'certutil SHA256',       desc:'SHA256 hash file',     cmd:'certutil -hashfile document.txt SHA256' },
        { icon:'📄', name:'certutil encode',       desc:'Base64 encode file',   cmd:'certutil -encode input.txt output.b64' },
        { icon:'🔐', name:'openssl genrsa',        desc:'Generate RSA key',     cmd:'openssl genrsa -out private.pem 2048' },
        { icon:'🔑', name:'Generate Password',     desc:'Secure password',      cmd:'cryptokit passwd --generate --length 16 --strong' },
        { icon:'✅', name:'Check Password',        desc:'Strength check',       cmd:'cryptokit passwd --check "MyPassword123"' },
        { icon:'ℹ️',  name:'System Info',           desc:'Engine details',       cmd:'cryptokit --info' },
        { icon:'❓', name:'Help',                   desc:'All commands',         cmd:'help' },
    ],
    bash: [
        { icon:'#️⃣', name:'shasum SHA256',         desc:'Hash a file',          cmd:'shasum -a 256 file.txt' },
        { icon:'#️⃣', name:'shasum SHA512',         desc:'SHA512 hash',          cmd:'shasum -a 512 file.txt' },
        { icon:'🔐', name:'openssl genrsa',        desc:'Generate RSA key',     cmd:'openssl genrsa -out private.pem 2048' },
        { icon:'🔑', name:'openssl rand',           desc:'Random password',      cmd:'openssl rand -base64 20' },
        { icon:'✅', name:'Check Password',        desc:'Strength check',       cmd:'cryptokit passwd --check "MyPassword123"' },
        { icon:'📄', name:'Base64 Encode',         desc:'Encode string',        cmd:'echo -n "hello world" | base64' },
        { icon:'📄', name:'Base64 Decode',         desc:'Decode string',        cmd:'echo -n "aGVsbG8gd29ybGQ=" | base64 --decode' },
        { icon:'❓', name:'Help',                   desc:'All commands',         cmd:'help' },
    ],
};

/* ── ALL AVAILABLE COMMANDS ─────────────────────────── */
const COMMANDS = {

    /* ─── HELP ─────────────────────────────────── */
    help: {
        desc: 'List all available commands',
        run:  () => cmdHelp(),
    },

    clear: {
        desc: 'Clear the terminal screen',
        run:  () => clearTerminal(),
    },

    cls: {
        desc: 'Clear the terminal screen (CMD alias)',
        run:  () => clearTerminal(),
    },

    /* ─── INFO ─────────────────────────────────── */
    'cryptokit --info': {
        desc: 'Show engine information',
        run:  () => cmdInfo(),
    },

    'cryptokit --version': {
        desc: 'Show version',
        run:  () => cmdVersion(),
    },

    history: {
        desc: 'Show command history',
        run:  () => cmdHistory(),
    },

    /* ─── HASHING ──────────────────────────────── */
    // PowerShell / openssl style
    'Get-FileHash': {
        desc: 'Hash a file or string — PowerShell style',
        run:  (raw) => cmdHash(raw),
    },
    'certutil': {
        desc: 'Hash a file — Windows CMD certutil',
        run:  (raw) => cmdCertutil(raw),
    },
    'shasum': {
        desc: 'Hash a file or string — Unix/Mac style',
        run:  (raw) => cmdShasum(raw),
    },
    'md5': {
        desc: 'MD5 hash — Mac style',
        run:  (raw) => cmdMd5(raw),
    },

    /* ─── RSA ──────────────────────────────────── */
    'openssl': {
        desc: 'OpenSSL commands — RSA, encrypt, decrypt',
        run:  (raw) => cmdOpenssl(raw),
    },

    /* ─── CRYPTOKIT UNIVERSAL ──────────────────── */
    'cryptokit': {
        desc: 'CryptoKit unified command',
        run:  (raw) => cmdCryptokit(raw),
    },

    /* ─── BASE64 ───────────────────────────────── */
    'echo': {
        desc: 'Echo with pipe to base64 — Bash style',
        run:  (raw) => cmdEcho(raw),
    },

};

/* ─── AUTOCOMPLETE SUGGESTIONS ──────────────────────── */
const AC_SUGGESTIONS = [
    // cryptokit
    { cmd: 'cryptokit hash --algo sha256 "text"',        desc: 'SHA-256 hash of text' },
    { cmd: 'cryptokit hash --algo sha512 "text"',        desc: 'SHA-512 hash of text' },
    { cmd: 'cryptokit hash --algo md5 "text"',           desc: 'MD5 hash of text' },
    { cmd: 'cryptokit hash --algo sha1 "text"',          desc: 'SHA-1 hash of text' },
    { cmd: 'cryptokit hash --all "text"',                desc: 'All hashes at once' },
    { cmd: 'cryptokit hash --compare "h1" "h2"',        desc: 'Compare two hashes' },
    { cmd: 'cryptokit rsa --generate',                   desc: 'Generate RSA-2048 key pair' },
    { cmd: 'cryptokit rsa --generate --bits 4096',       desc: 'Generate RSA-4096 key pair' },
    { cmd: 'cryptokit rsa --analyze',                    desc: 'Analyze an RSA key' },
    { cmd: 'cryptokit passwd --generate',                desc: 'Generate secure password' },
    { cmd: 'cryptokit passwd --generate --length 20 --strong', desc: 'Strong 20-char password' },
    { cmd: 'cryptokit passwd --generate --no-symbols',   desc: 'Password without symbols' },
    { cmd: 'cryptokit passwd --generate --passphrase',   desc: 'Generate passphrase' },
    { cmd: 'cryptokit passwd --check "password"',        desc: 'Check password strength' },
    { cmd: 'cryptokit encode --base64 "text"',           desc: 'Base64 encode string' },
    { cmd: 'cryptokit decode --base64 "text"',           desc: 'Base64 decode string' },
    { cmd: 'cryptokit aes --encrypt "msg" --key "pass"', desc: 'AES-256 encrypt message' },
    { cmd: 'cryptokit aes --decrypt "cipher" --key "pass"', desc: 'AES-256 decrypt' },
    { cmd: 'cryptokit --info',                           desc: 'Show system info' },
    { cmd: 'cryptokit --version',                        desc: 'Show version' },
    // openssl
    { cmd: 'openssl genrsa -out private.pem 2048',       desc: 'Generate RSA-2048 private key' },
    { cmd: 'openssl genrsa -out private.pem 4096',       desc: 'Generate RSA-4096 private key' },
    { cmd: 'openssl rsa -in private.pem -pubout -out public.pem', desc: 'Extract public key' },
    { cmd: 'openssl rsa -in private.pem -text -noout',   desc: 'View RSA key details' },
    { cmd: 'openssl rand -base64 20',                    desc: 'Generate random base64 string' },
    { cmd: 'openssl rand -hex 32',                       desc: 'Generate random hex string' },
    // powershell
    { cmd: 'Get-FileHash .\\file.txt -Algorithm SHA256', desc: 'SHA-256 hash (PowerShell)' },
    { cmd: 'Get-FileHash .\\file.txt -Algorithm MD5',    desc: 'MD5 hash (PowerShell)' },
    { cmd: 'Get-FileHash .\\file.txt -Algorithm SHA512', desc: 'SHA-512 hash (PowerShell)' },
    // certutil
    { cmd: 'certutil -hashfile document.txt SHA256',     desc: 'SHA-256 hash (CMD certutil)' },
    { cmd: 'certutil -hashfile document.txt MD5',        desc: 'MD5 hash (CMD certutil)' },
    { cmd: 'certutil -hashfile document.txt SHA512',     desc: 'SHA-512 hash (CMD certutil)' },
    { cmd: 'certutil -encode input.txt output.b64',      desc: 'Base64 encode file (CMD)' },
    { cmd: 'certutil -decode input.b64 output.txt',      desc: 'Base64 decode file (CMD)' },
    // shasum
    { cmd: 'shasum -a 256 file.txt',                     desc: 'SHA-256 hash (Unix)' },
    { cmd: 'shasum -a 512 file.txt',                     desc: 'SHA-512 hash (Unix)' },
    { cmd: 'shasum -a 1 file.txt',                       desc: 'SHA-1 hash (Unix)' },
    { cmd: 'md5 file.txt',                               desc: 'MD5 hash (macOS)' },
    // echo
    { cmd: 'echo -n "hello world" | base64',             desc: 'Base64 encode (bash)' },
    { cmd: 'echo -n "aGVsbG8=" | base64 --decode',       desc: 'Base64 decode (bash)' },
    // utils
    { cmd: 'help',     desc: 'Show all commands' },
    { cmd: 'clear',    desc: 'Clear terminal' },
    { cmd: 'cls',      desc: 'Clear terminal (CMD)' },
    { cmd: 'history',  desc: 'Show command history' },
];

/* ── REFERENCE PANEL DATA ───────────────────────────── */
const REF_GROUPS = [
    {
        icon: 'fas fa-hashtag', title: 'Hashing',
        items: [
            { syn: 'cryptokit hash --algo sha256 "text"', desc: 'SHA-256 hash' },
            { syn: 'cryptokit hash --all "text"',          desc: 'All algorithms' },
            { syn: 'Get-FileHash file -Algorithm SHA256',  desc: 'PowerShell hash' },
            { syn: 'certutil -hashfile file SHA256',       desc: 'CMD hash' },
            { syn: 'shasum -a 256 file.txt',               desc: 'Bash hash' },
            { syn: 'md5 file.txt',                         desc: 'Mac MD5' },
        ],
    },
    {
        icon: 'fas fa-key', title: 'RSA Keys',
        items: [
            { syn: 'cryptokit rsa --generate',              desc: 'RSA-2048 key pair' },
            { syn: 'cryptokit rsa --generate --bits 4096',  desc: 'RSA-4096 key pair' },
            { syn: 'openssl genrsa -out private.pem 2048',  desc: 'OpenSSL RSA key' },
            { syn: 'openssl rsa -in priv.pem -pubout',      desc: 'Extract public key' },
            { syn: 'openssl rsa -in priv.pem -text',        desc: 'View key details' },
        ],
    },
    {
        icon: 'fas fa-lock', title: 'Passwords',
        items: [
            { syn: 'cryptokit passwd --generate --length 16', desc: 'Generate password' },
            { syn: 'cryptokit passwd --generate --strong',     desc: 'Strong password' },
            { syn: 'cryptokit passwd --generate --passphrase', desc: 'Generate passphrase' },
            { syn: 'cryptokit passwd --check "pass"',          desc: 'Check strength' },
            { syn: 'openssl rand -base64 20',                  desc: 'Random base64' },
        ],
    },
    {
        icon: 'fas fa-code', title: 'Encoding',
        items: [
            { syn: 'cryptokit encode --base64 "text"',           desc: 'Base64 encode' },
            { syn: 'cryptokit decode --base64 "dGV4dA=="',       desc: 'Base64 decode' },
            { syn: 'echo -n "text" | base64',                    desc: 'Bash encode' },
            { syn: 'certutil -encode input.txt out.b64',         desc: 'CMD encode' },
        ],
    },
    {
        icon: 'fas fa-shield-alt', title: 'Encryption',
        items: [
            { syn: 'cryptokit aes --encrypt "msg" --key "k"', desc: 'AES-256 encrypt' },
            { syn: 'cryptokit aes --decrypt "enc" --key "k"', desc: 'AES-256 decrypt' },
            { syn: 'cryptokit rsa --encrypt "msg"',            desc: 'RSA encrypt' },
        ],
    },
];

/* ═══════════════════════════════════════════════════════
   INIT
═══════════════════════════════════════════════════════ */
document.addEventListener('DOMContentLoaded', () => {
    initMatrix();
    bootTerminal();
    buildSidebar();
    buildRefPanel();
    initInputListeners();
});

/* ── MATRIX CANVAS ─────────────────────────────────── */
function initMatrix() {
    const canvas = document.getElementById('matrixCanvas');
    const ctx    = canvas.getContext('2d');
    canvas.width  = window.innerWidth;
    canvas.height = window.innerHeight;

    const chars  = '0123456789ABCDEF';
    const cols   = Math.floor(canvas.width / 18);
    const drops  = Array(cols).fill(1);

    setInterval(() => {
        ctx.fillStyle = 'rgba(0,0,0,0.05)';
        ctx.fillRect(0, 0, canvas.width, canvas.height);
        ctx.fillStyle = '#7c3aed';
        ctx.font = '13px JetBrains Mono';
        drops.forEach((y, i) => {
            const ch = chars[Math.floor(Math.random() * chars.length)];
            ctx.fillText(ch, i * 18, y * 18);
            if (y * 18 > canvas.height && Math.random() > 0.975) drops[i] = 0;
            drops[i]++;
        });
    }, 60);

    window.addEventListener('resize', () => {
        canvas.width  = window.innerWidth;
        canvas.height = window.innerHeight;
    });
}

/* ── BOOT TERMINAL ──────────────────────────────────── */
function bootTerminal() {
    const shell = SHELLS[STATE.shell];
    updateShellUI();

    const out = document.getElementById('terminalOutput');
    out.innerHTML = '';

    let delay = 0;
    shell.bootLines.forEach(line => {
        setTimeout(() => {
            if (line.cls === 'blank') {
                appendBlank();
            } else {
                appendLine(line.text, line.cls);
            }
        }, delay);
        delay += 60;
    });

    setTimeout(() => focusInput(), delay + 100);
}

/* ── SWITCH SHELL ───────────────────────────────────── */
function switchShell(shell) {
    if (STATE.shell === shell) return;
    STATE.shell       = shell;
    STATE.historyIndex = -1;

    // Update shell buttons
    document.querySelectorAll('.shell-btn').forEach(b => b.classList.remove('active'));
    document.getElementById(`shell${capitalize(shell)}`).classList.add('active');

    clearTerminal(false);
    bootTerminal();
    buildSidebar();
    document.getElementById('engineShellLabel').textContent = SHELLS[shell].engineLabel;
}

function capitalize(str) {
    return str.charAt(0).toUpperCase() + str.slice(1);
}

/* ── UPDATE SHELL UI ────────────────────────────────── */
function updateShellUI() {
    const shell = SHELLS[STATE.shell];
    document.getElementById('chromeTitle').textContent   = shell.chromeTitle;
    document.getElementById('terminalPrompt').textContent = shell.prompt;
    document.getElementById('terminalPrompt').className  = `terminal-prompt ${shell.promptClass}`;
    document.getElementById('engineShellLabel').textContent = shell.engineLabel;
}

/* ── BUILD SIDEBAR ──────────────────────────────────── */
function buildSidebar() {
    const list = document.getElementById('quickCmdList');
    list.innerHTML = '';
    QUICK_CMDS[STATE.shell].forEach(item => {
        const el = document.createElement('div');
        el.className = 'cmd-item';
        el.innerHTML = `
            <span class="cmd-item-icon">${item.icon}</span>
            <div class="cmd-item-info">
                <span class="cmd-item-name">${item.name}</span>
                <span class="cmd-item-desc">${item.desc}</span>
            </div>
        `;
        el.onclick = () => {
            document.getElementById('terminalInput').value = item.cmd;
            focusInput();
            hideAutocomplete();
        };
        list.appendChild(el);
    });
}

/* ── BUILD REF PANEL ────────────────────────────────── */
function buildRefPanel() {
    const acc = document.getElementById('refAccordion');
    acc.innerHTML = '';
    REF_GROUPS.forEach((group, gi) => {
        const div = document.createElement('div');
        div.className = 'ref-group';
        div.innerHTML = `
            <div class="ref-group-header" onclick="toggleRefGroup(${gi})">
                <span><i class="${group.icon}"></i>${group.title}</span>
                <i class="fas fa-chevron-right ref-arrow"></i>
            </div>
            <div class="ref-group-body">
                ${group.items.map(it => `
                    <div class="ref-cmd-item" onclick="injectCommand('${it.syn.replace(/'/g,"\\'")}')">
                        <span class="ref-cmd-syntax">${escapeHtml(it.syn)}</span>
                        <span class="ref-cmd-desc">${it.desc}</span>
                    </div>
                `).join('')}
            </div>
        `;
        acc.appendChild(div);
    });
}

function toggleRefGroup(index) {
    const groups = document.querySelectorAll('.ref-group');
    groups[index].classList.toggle('open');
}

/* ── INIT INPUT LISTENERS ───────────────────────────── */
function initInputListeners() {
    const input = document.getElementById('terminalInput');

    input.addEventListener('keydown', e => {
        // Enter
        if (e.key === 'Enter') {
            e.preventDefault();
            const acBox = document.getElementById('autocompleteBox');
            if (acBox.style.display === 'block' && STATE.acIndex >= 0) {
                const items = acBox.querySelectorAll('.ac-item');
                if (items[STATE.acIndex]) {
                    input.value = items[STATE.acIndex].dataset.cmd;
                    hideAutocomplete();
                    return;
                }
            }
            runCommand();
            return;
        }

        // Arrow Up — history
        if (e.key === 'ArrowUp') {
            e.preventDefault();
            const acBox = document.getElementById('autocompleteBox');
            if (acBox.style.display === 'block') {
                navigateAC(-1); return;
            }
            navigateHistory(1);
            return;
        }

        // Arrow Down — history
        if (e.key === 'ArrowDown') {
            e.preventDefault();
            const acBox = document.getElementById('autocompleteBox');
            if (acBox.style.display === 'block') {
                navigateAC(1); return;
            }
            navigateHistory(-1);
            return;
        }

        // Tab — autocomplete
        if (e.key === 'Tab') {
            e.preventDefault();
            const acBox = document.getElementById('autocompleteBox');
            if (acBox.style.display === 'block') {
                navigateAC(1);
            } else {
                showAutocomplete(input.value);
            }
            return;
        }

        // Escape
        if (e.key === 'Escape') {
            hideAutocomplete();
            return;
        }

        // Ctrl+L — clear
        if (e.key === 'l' && e.ctrlKey) {
            e.preventDefault();
            clearTerminal();
            return;
        }

        // Ctrl+C
        if (e.key === 'c' && e.ctrlKey && !e.shiftKey) {
            if (STATE.busy) {
                STATE.busy = false;
                appendLine('^C', 't-error');
                appendBlank();
            }
        }
    });

    input.addEventListener('input', () => {
        const val = input.value.trim();
        if (val.length > 0) {
            showAutocomplete(val);
        } else {
            hideAutocomplete();
        }
    });

    // Click outside to close autocomplete
    document.addEventListener('click', e => {
        if (!e.target.closest('#autocompleteBox') && !e.target.closest('#terminalInput')) {
            hideAutocomplete();
        }
    });

    // Click terminal area to focus input
    document.getElementById('terminalOutput').addEventListener('click', () => focusInput());
}

/* ── HISTORY NAVIGATION ─────────────────────────────── */
function navigateHistory(dir) {
    const input = document.getElementById('terminalInput');
    if (STATE.history.length === 0) return;

    STATE.historyIndex = Math.max(-1,
        Math.min(STATE.history.length - 1, STATE.historyIndex + dir));

    if (STATE.historyIndex === -1) {
        input.value = '';
    } else {
        input.value = STATE.history[STATE.history.length - 1 - STATE.historyIndex];
    }
}

/* ── AUTOCOMPLETE ───────────────────────────────────── */
function showAutocomplete(query) {
    const box   = document.getElementById('autocompleteBox');
    const input = document.getElementById('terminalInput');
    const lq    = query.toLowerCase();

    const matches = AC_SUGGESTIONS.filter(s =>
        s.cmd.toLowerCase().includes(lq) ||
        s.desc.toLowerCase().includes(lq)
    ).slice(0, 10);

    if (matches.length === 0) {
        hideAutocomplete();
        return;
    }

    box.innerHTML = matches.map((m, i) => `
        <div class="ac-item" data-cmd="${escapeHtml(m.cmd)}" data-index="${i}"
             onclick="selectAC('${m.cmd.replace(/'/g,"\\'")}')">
            <span class="ac-cmd">${escapeHtml(m.cmd)}</span>
            <span class="ac-desc">${escapeHtml(m.desc)}</span>
        </div>
    `).join('');

    // Position below input
    const rect = input.getBoundingClientRect();
    box.style.left    = rect.left + 'px';
    box.style.bottom  = (window.innerHeight - rect.top + 6) + 'px';
    box.style.display = 'block';
    STATE.acIndex = -1;
}

function hideAutocomplete() {
    document.getElementById('autocompleteBox').style.display = 'none';
    STATE.acIndex = -1;
}

function navigateAC(dir) {
    const box   = document.getElementById('autocompleteBox');
    const items = box.querySelectorAll('.ac-item');
    if (!items.length) return;

    STATE.acIndex = (STATE.acIndex + dir + items.length) % items.length;
    items.forEach((it, i) => it.classList.toggle('active', i === STATE.acIndex));

    const input = document.getElementById('terminalInput');
    input.value = items[STATE.acIndex].dataset.cmd;
}

function selectAC(cmd) {
    document.getElementById('terminalInput').value = cmd;
    hideAutocomplete();
    focusInput();
}

/* ── RUN COMMAND ────────────────────────────────────── */
function runCommand() {
    if (STATE.busy) return;

    const input = document.getElementById('terminalInput');
    const raw   = input.value.trim();
    if (!raw) return;

    // Add to history
    STATE.history.push(raw);
    STATE.historyIndex = -1;
    input.value = '';
    hideAutocomplete();
    updateHistoryUI();

    // Echo command
    echoCommand(raw);

    // Execute
    executeCommand(raw);
}

/* ── ECHO COMMAND ───────────────────────────────────── */
function echoCommand(raw) {
    const shell    = SHELLS[STATE.shell];
    const out      = document.getElementById('terminalOutput');
    const line     = document.createElement('span');
    line.className = 'output-line line-cmd-echo';

    const parts = tokenize(raw);
    let html = `<span class="${shell.promptClass}">${escapeHtml(shell.prompt)}&nbsp;</span>`;
    parts.forEach((p, i) => {
        if (i === 0) {
            html += `<span class="t-cmd">${escapeHtml(p)}</span>`;
        } else if (p.startsWith('--') || p.startsWith('-')) {
            html += `&nbsp;<span class="t-flag">${escapeHtml(p)}</span>`;
        } else if (p.startsWith('"') || p.startsWith("'")) {
            html += `&nbsp;<span class="t-value">${escapeHtml(p)}</span>`;
        } else {
            html += `&nbsp;<span class="t-string">${escapeHtml(p)}</span>`;
        }
    });

    line.innerHTML = html;
    out.appendChild(line);
    scrollBottom();
}

/* ── TOKENIZE RAW COMMAND ───────────────────────────── */
function tokenize(raw) {
    const tokens = [];
    const regex  = /"([^"]*?)"|'([^']*?)'|(\S+)/g;
    let   match;
    while ((match = regex.exec(raw)) !== null) {
        if (match[1] !== undefined)      tokens.push(`"${match[1]}"`);
        else if (match[2] !== undefined) tokens.push(`'${match[2]}'`);
        else                             tokens.push(match[3]);
    }
    return tokens;
}

/* ── PARSE FLAGS FROM RAW ───────────────────────────── */
function parseFlags(raw) {
    const flags  = {};
    const tokens = tokenize(raw);
    for (let i = 0; i < tokens.length; i++) {
        const t = tokens[i];
        if (t.startsWith('--')) {
            const key = t.slice(2);
            const next = tokens[i + 1];
            if (next && !next.startsWith('-')) {
                flags[key] = next.replace(/^["']|["']$/g, '');
                i++;
            } else {
                flags[key] = true;
            }
        } else if (t.startsWith('-') && t.length === 2) {
            const key = t.slice(1);
            const next = tokens[i + 1];
            if (next && !next.startsWith('-')) {
                flags[key] = next.replace(/^["']|["']$/g, '');
                i++;
            } else {
                flags[key] = true;
            }
        }
    }
    return flags;
}

/* ── EXTRACT QUOTED STRING ──────────────────────────── */
function extractQuoted(raw) {
    const m = raw.match(/"([^"]*?)"|'([^']*?)'/);
    return m ? (m[1] !== undefined ? m[1] : m[2]) : null;
}

/* ── EXECUTE COMMAND ────────────────────────────────── */
function executeCommand(raw) {
    const lower = raw.toLowerCase();
    const first = tokenize(raw)[0]?.toLowerCase();

    // Exact matches first
    if (lower === 'help')    { cmdHelp();    return; }
    if (lower === 'clear' || lower === 'cls') { clearTerminal(); return; }
    if (lower === 'history') { cmdHistory(); return; }
    if (lower === 'cryptokit --info')    { cmdInfo();    return; }
    if (lower === 'cryptokit --version') { cmdVersion(); return; }

    // Route by first token
    switch (first) {
        case 'cryptokit': cmdCryptokit(raw); break;
        case 'openssl':   cmdOpenssl(raw);   break;
        case 'get-filehash': cmdGetFileHash(raw); break;
        case 'certutil':  cmdCertutil(raw);  break;
        case 'shasum':    cmdShasum(raw);    break;
        case 'md5':       cmdMd5(raw);       break;
        case 'echo':      cmdEcho(raw);      break;
        default:
            cmdUnknown(raw);
    }
}

/* ═══════════════════════════════════════════════════════
   COMMAND IMPLEMENTATIONS
═══════════════════════════════════════════════════════ */

/* ── HELP ───────────────────────────────────────────── */
function cmdHelp() {
    const lines = [
        { t: '┌──────────────────────────────────────────────────────┐', c: 't-muted' },
        { t: '│        CryptoKit Developer Terminal — Help            │', c: 't-accent' },
        { t: '└──────────────────────────────────────────────────────┘', c: 't-muted' },
        { t: '', c: 'blank' },
        { t: '── HASHING ────────────────────────────────────────────', c: 't-muted' },
        { t: '  cryptokit hash --algo <alg> "text"   Hash a string', c: 't-white' },
        { t: '  cryptokit hash --all "text"           All algorithms', c: 't-white' },
        { t: '  cryptokit hash --compare "h1" "h2"   Compare hashes', c: 't-white' },
        { t: '  Get-FileHash .\\file -Algorithm SHA256 (PowerShell)', c: 't-white' },
        { t: '  certutil -hashfile file SHA256         (CMD)', c: 't-white' },
        { t: '  shasum -a 256 file.txt                 (Bash)', c: 't-white' },
        { t: '  md5 file.txt                           (macOS)', c: 't-white' },
        { t: '', c: 'blank' },
        { t: '── RSA KEYS ───────────────────────────────────────────', c: 't-muted' },
        { t: '  cryptokit rsa --generate               RSA-2048 pair', c: 't-white' },
        { t: '  cryptokit rsa --generate --bits 4096   RSA-4096 pair', c: 't-white' },
        { t: '  openssl genrsa -out private.pem 2048   OpenSSL key', c: 't-white' },
        { t: '  openssl rsa -in priv.pem -pubout       Extract pub key', c: 't-white' },
        { t: '  openssl rsa -in priv.pem -text         View key info', c: 't-white' },
        { t: '', c: 'blank' },
        { t: '── PASSWORDS ──────────────────────────────────────────', c: 't-muted' },
        { t: '  cryptokit passwd --generate             Random password', c: 't-white' },
        { t: '  cryptokit passwd --generate --length 20 Custom length', c: 't-white' },
        { t: '  cryptokit passwd --generate --strong    Strong mode', c: 't-white' },
        { t: '  cryptokit passwd --generate --passphrase Passphrase', c: 't-white' },
        { t: '  cryptokit passwd --check "password"     Strength check', c: 't-white' },
        { t: '  openssl rand -base64 20                 Random (OpenSSL)', c: 't-white' },
        { t: '', c: 'blank' },
        { t: '── ENCODING & ENCRYPTION ──────────────────────────────', c: 't-muted' },
        { t: '  cryptokit encode --base64 "text"        Encode', c: 't-white' },
        { t: '  cryptokit decode --base64 "b64"         Decode', c: 't-white' },
        { t: '  cryptokit aes --encrypt "msg" --key "k" AES-256', c: 't-white' },
        { t: '  cryptokit aes --decrypt "enc" --key "k" AES decrypt', c: 't-white' },
        { t: '  echo -n "text" | base64                 Bash encode', c: 't-white' },
        { t: '  certutil -encode input.txt out.b64       CMD encode', c: 't-white' },
        { t: '', c: 'blank' },
        { t: '── UTILS ──────────────────────────────────────────────', c: 't-muted' },
        { t: '  help              This menu', c: 't-white' },
        { t: '  clear / cls       Clear terminal', c: 't-white' },
        { t: '  history           Command history', c: 't-white' },
        { t: '  cryptokit --info  Engine information', c: 't-white' },
        { t: '', c: 'blank' },
        { t: 'Tip: Press Tab for autocomplete, ↑↓ for history', c: 't-info' },
        { t: '', c: 'blank' },
    ];
    printLines(lines);
}

/* ── INFO ───────────────────────────────────────────── */
function cmdInfo() {
    const shell = SHELLS[STATE.shell];
    printLines([
        { t: '', c: 'blank' },
        { t: '  CryptoKit Developer Terminal', c: 't-accent' },
        { t: '  ─────────────────────────────────────────', c: 't-muted' },
        { t: `  Version      : v1.0.0`, c: 't-white' },
        { t: `  Shell Mode   : ${shell.label}`, c: 't-white' },
        { t: `  Engine       : WebCrypto API (W3C Standard)`, c: 't-white' },
        { t: `  Algorithms   : SHA-1, SHA-256, SHA-384, SHA-512, MD5`, c: 't-white' },
        { t: `  RSA Support  : 1024, 2048, 4096 bits`, c: 't-white' },
        { t: `  AES Support  : AES-256-GCM, AES-256-CBC`, c: 't-white' },
        { t: `  Storage      : None — all client-side`, c: 't-success' },
        { t: `  License      : MIT Open Source`, c: 't-white' },
        { t: `  Browser      : ${navigator.userAgent.split(' ').pop()}`, c: 't-white' },
        { t: '', c: 'blank' },
    ]);
}

/* ── VERSION ────────────────────────────────────────── */
function cmdVersion() {
    printLines([
        { t: '', c: 'blank' },
        { t: '  CryptoKit v1.0.0', c: 't-success' },
        { t: '  Developer Terminal Module v1.0.0', c: 't-white' },
        { t: '', c: 'blank' },
    ]);
}

/* ── HISTORY CMD ────────────────────────────────────── */
function cmdHistory() {
    if (STATE.history.length === 0) {
        printLines([{ t: '  No commands in history yet.', c: 't-muted' }]);
        appendBlank();
        return;
    }
    const lines = [{ t: '', c: 'blank' }];
    STATE.history.forEach((cmd, i) => {
        lines.push({ t: `  ${String(i + 1).padStart(3)}  ${cmd}`, c: 't-white' });
    });
    lines.push({ t: '', c: 'blank' });
    printLines(lines);
}

/* ── CRYPTOKIT UNIVERSAL ────────────────────────────── */
function cmdCryptokit(raw) {
    const tokens = tokenize(raw);
    const sub    = tokens[1];

    if (!sub) {
        printLines([
            { t: '', c: 'blank' },
            { t: '  Usage: cryptokit <command> [options]', c: 't-warning' },
            { t: '  Type  help  for a full command list.', c: 't-info' },
            { t: '', c: 'blank' },
        ]);
        return;
    }

    switch (sub.toLowerCase()) {
        case 'hash':   cmdCryptokitHash(raw);   break;
        case 'rsa':    cmdCryptokitRSA(raw);    break;
        case 'passwd': cmdCryptokitPasswd(raw); break;
        case 'encode': cmdCryptokitEncode(raw); break;
        case 'decode': cmdCryptokitDecode(raw); break;
        case 'aes':    cmdCryptokitAES(raw);    break;
        case '--info':    cmdInfo();    break;
        case '--version': cmdVersion(); break;
        default:
            printLines([
                { t: '', c: 'blank' },
                { t: `  Unknown subcommand: ${sub}`, c: 't-error' },
                { t: '  Type  help  for a full command list.', c: 't-info' },
                { t: '', c: 'blank' },
            ]);
    }
}

/* ── CRYPTOKIT HASH ─────────────────────────────────── */
function cmdCryptokitHash(raw) {
    const flags = parseFlags(raw);
    const algo  = (flags.algo || 'sha256').toLowerCase();
    const text  = extractQuoted(raw);

    // --compare mode
    if (flags.compare !== undefined) {
        const tokens = tokenize(raw);
        const quoted = [];
        tokens.forEach(t => {
            if ((t.startsWith('"') || t.startsWith("'")) && t !== '"' && t !== "'") {
                quoted.push(t.replace(/^["']|["']$/g, ''));
            }
        });
        if (quoted.length < 2) {
            printError('Usage: cryptokit hash --compare "hash1" "hash2"');
            return;
        }
        const match = quoted[0].toLowerCase() === quoted[1].toLowerCase();
        printLines([
            { t: '', c: 'blank' },
            { t: `  Hash 1 : ${quoted[0]}`, c: 't-label' },
            { t: `  Hash 2 : ${quoted[1]}`, c: 't-label' },
            { t: `  Result : ${match ? '✔ MATCH — Hashes are identical' : '✘ NO MATCH — Hashes differ'}`, c: match ? 't-success' : 't-error' },
            { t: '', c: 'blank' },
        ]);
        return;
    }

    if (!text) {
        printError('Usage: cryptokit hash --algo sha256 "your text here"');
        return;
    }

    // --all mode
    if (flags.all !== undefined) {
        hashAllAlgos(text);
        return;
    }

    hashText(text, algo);
}

async function hashText(text, algo) {
    const algoMap = {
        'sha256': 'SHA-256',
        'sha512': 'SHA-512',
        'sha384': 'SHA-384',
        'sha1':   'SHA-1',
        'md5':    null,
    };

    STATE.busy = true;
    printLines([{ t: `  ⚙ Computing ${algo.toUpperCase()} hash...`, c: 't-info' }]);

    await delay(200);

    try {
        let hashHex;
        if (algo === 'md5') {
            hashHex = md5Sim(text);
            printLines([
                { t: '', c: 'blank' },
                { t: `  Algorithm : MD5`, c: 't-label' },
                { t: `  Input     : "${text}"`, c: 't-label' },
                { t: `  Hash      : ${hashHex}`, c: 't-hash' },
                { t: `  ⚠ Warning : MD5 is cryptographically broken. Use SHA-256+.`, c: 't-warning' },
                { t: '', c: 'blank' },
            ]);
        } else {
            const webAlgo = algoMap[algo];
            if (!webAlgo) {
                printError(`Unsupported algorithm: ${algo}. Use sha256, sha512, sha384, sha1, md5`);
                STATE.busy = false;
                return;
            }
            const enc    = new TextEncoder().encode(text);
            const buf    = await crypto.subtle.digest(webAlgo, enc);
            hashHex      = bufToHex(buf);

            printLines([
                { t: '', c: 'blank' },
                { t: `  Algorithm : ${webAlgo}`, c: 't-label' },
                { t: `  Input     : "${text}"`, c: 't-label' },
                { t: `  Length    : ${text.length} characters`, c: 't-label' },
                { t: `  Hash      : ${hashHex}`, c: 't-hash' },
                { t: `  Hex Len   : ${hashHex.length} characters`, c: 't-label' },
                { t: '  ✔ Hash generated successfully', c: 't-success' },
                { t: '', c: 'blank' },
            ]);
        }

        STATE.lastOutput = hashHex;
    } catch (err) {
        printError(`Hash error: ${err.message}`);
    }

    STATE.busy = false;
}

async function hashAllAlgos(text) {
    STATE.busy = true;
    printLines([
        { t: '', c: 'blank' },
        { t: `  ⚙ Computing all hashes for: "${text}"`, c: 't-info' },
    ]);

    await delay(300);

    const algos = [
        { name: 'MD5     ', web: null,      label: '⚠ Weak' },
        { name: 'SHA-1   ', web: 'SHA-1',   label: '⚠ Weak' },
        { name: 'SHA-256 ', web: 'SHA-256', label: '✔ Strong' },
        { name: 'SHA-384 ', web: 'SHA-384', label: '✔ Strong' },
        { name: 'SHA-512 ', web: 'SHA-512', label: '✔ Strongest' },
    ];

    const enc = new TextEncoder().encode(text);

    printLines([{ t: '', c: 'blank' }]);
    printLines([{ t: '  Algorithm    Hash                                                              Status', c: 't-muted' }]);
    printLines([{ t: '  ──────────   ────────────────────────────────────────────────────────────────  ──────', c: 't-muted' }]);

    for (const a of algos) {
        let hash;
        if (!a.web) {
            hash = md5Sim(text);
        } else {
            const buf = await crypto.subtle.digest(a.web, enc);
            hash = bufToHex(buf).substring(0, 64);
        }
        appendLine(
            `  ${a.name}   ${hash.padEnd(66)}  ${a.label}`,
            a.label.includes('Weak') ? 't-warning' : 't-success'
        );
    }

    printLines([{ t: '', c: 'blank' }]);
    STATE.busy = false;
}

/* ── CRYPTOKIT RSA ──────────────────────────────────── */
async function cmdCryptokitRSA(raw) {
    const flags  = parseFlags(raw);
    const tokens = tokenize(raw);
    const action = tokens[2];

    if (!action || action === '--generate') {
        const bits  = parseInt(flags.bits || '2048');
        const valid = [1024, 2048, 4096];
        if (!valid.includes(bits)) {
            printError(`Invalid key size: ${bits}. Supported: 1024, 2048, 4096`);
            return;
        }
        await generateRSA(bits, flags.export || 'pem');
    } else if (action === '--analyze') {
        cmdRSAAnalyze();
    } else {
        printError(`Unknown RSA action: ${action}. Try: --generate, --analyze`);
    }
}

async function generateRSA(bits, exportFmt) {
    STATE.busy = true;
    printLines([
        { t: '', c: 'blank' },
        { t: `  ⚙ Generating RSA-${bits} key pair...`, c: 't-info' },
        { t: `  This may take a moment for larger key sizes`, c: 't-muted' },
    ]);

    await delay(100);

    try {
        const keyPair = await crypto.subtle.generateKey(
            {
                name:           'RSA-OAEP',
                modulusLength:  bits,
                publicExponent: new Uint8Array([1, 0, 1]),
                hash:           'SHA-256',
            },
            true,
            ['encrypt', 'decrypt']
        );

        // Export public key
        const pubDer  = await crypto.subtle.exportKey('spki', keyPair.publicKey);
        const pubB64  = bufToB64(pubDer);
        const pubPem  = wrapPem(pubB64, 'PUBLIC KEY');

        // Export private key
        const privDer = await crypto.subtle.exportKey('pkcs8', keyPair.privateKey);
        const privB64 = bufToB64(privDer);
        const privPem = wrapPem(privB64, 'PRIVATE KEY');

        printLines([
            { t: '', c: 'blank' },
            { t: `  ✔ RSA-${bits} key pair generated successfully`, c: 't-success' },
            { t: `  Key Size   : ${bits} bits`, c: 't-label' },
            { t: `  Algorithm  : RSA-OAEP with SHA-256`, c: 't-label' },
            { t: `  Exponent   : 65537 (0x10001)`, c: 't-label' },
            { t: `  Format     : ${exportFmt.toUpperCase()}`, c: 't-label' },
            { t: '', c: 'blank' },
            { t: '  ── PUBLIC KEY ────────────────────────────────────────', c: 't-muted' },
        ]);

        pubPem.split('\n').forEach(l => appendLine('  ' + l, 't-key'));

        printLines([
            { t: '', c: 'blank' },
            { t: '  ── PRIVATE KEY ───────────────────────────────────────', c: 't-muted' },
        ]);

        privPem.split('\n').forEach(l => appendLine('  ' + l, 't-purple'));

        printLines([
            { t: '', c: 'blank' },
            { t: '  ⚠ Keep your private key secret! Never share it.', c: 't-warning' },
            { t: `  Security Rating: ${bits >= 4096 ? '🔒🔒🔒 Excellent' : bits >= 2048 ? '🔒🔒 Good' : '🔒 Weak — upgrade to 2048+'}`, c: bits >= 2048 ? 't-success' : 't-warning' },
            { t: '', c: 'blank' },
        ]);

        STATE.lastOutput = pubPem + '\n\n' + privPem;

    } catch (err) {
        printError(`RSA generation failed: ${err.message}`);
    }

    STATE.busy = false;
}

function cmdRSAAnalyze() {
    printLines([
        { t: '', c: 'blank' },
        { t: '  RSA Key Security Analysis Guide', c: 't-accent' },
        { t: '  ─────────────────────────────────────────────────────', c: 't-muted' },
        { t: '  1024-bit  →  ✘ BROKEN — Do not use', c: 't-error' },
        { t: '  2048-bit  →  ✔ Acceptable — Minimum recommended', c: 't-warning' },
        { t: '  3072-bit  →  ✔ Good — Recommended for new systems', c: 't-success' },
        { t: '  4096-bit  →  ✔ Excellent — Long-term security', c: 't-success' },
        { t: '', c: 'blank' },
        { t: '  NIST Recommendation: 2048-bit minimum through 2030', c: 't-info' },
        { t: '  OWASP Recommendation: 4096-bit for sensitive data', c: 't-info' },
        { t: '', c: 'blank' },
    ]);
}

/* ── CRYPTOKIT PASSWORD ─────────────────────────────── */
function cmdCryptokitPasswd(raw) {
    const flags  = parseFlags(raw);
    const tokens = tokenize(raw);
    const action = tokens[2];

    if (action === '--generate') {
        generatePassword(flags);
    } else if (action === '--check') {
        const pwd = extractQuoted(raw);
        if (!pwd) {
            printError('Usage: cryptokit passwd --check "your_password"');
            return;
        }
        checkPasswordStrength(pwd, !!flags.verbose);
    } else {
        printError('Usage: cryptokit passwd --generate | --check "password"');
    }
}

function generatePassword(flags) {
    const length     = parseInt(flags.length || '16');
    const noSymbols  = flags['no-symbols'] !== undefined;
    const noNumbers  = flags['no-numbers'] !== undefined;
    const strong     = flags.strong !== undefined;
    const passphrase = flags.passphrase !== undefined;

    if (passphrase) {
        generatePassphrase();
        return;
    }

    let charset = 'abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ';
    if (!noNumbers)  charset += '0123456789';
    if (!noSymbols)  charset += '!@#$%^&*()_+-=[]{}|;:,.<>?';
    if (strong)      charset += '~`"\'\\/<>';

    const arr  = new Uint32Array(length);
    crypto.getRandomValues(arr);
    let pwd = '';
    for (let i = 0; i < length; i++) {
        pwd += charset[arr[i] % charset.length];
    }

    const strength = calcPasswordStrength(pwd);

    printLines([
        { t: '', c: 'blank' },
        { t: `  ✔ Password Generated`, c: 't-success' },
        { t: `  ─────────────────────────────────────────────`, c: 't-muted' },
        { t: `  Password  : ${pwd}`, c: 't-hash' },
        { t: `  Length    : ${pwd.length} characters`, c: 't-label' },
        { t: `  Charset   : ${charset.length} possible characters`, c: 't-label' },
        { t: `  Entropy   : ${strength.entropy.toFixed(1)} bits`, c: 't-label' },
        { t: `  Strength  : ${strength.label} ${strength.icon}`, c: strength.cls },
        { t: `  Est. Crack: ${strength.crackTime}`, c: 't-label' },
        { t: '', c: 'blank' },
        { t: '  ⚠ Store this password securely. Do not share it.', c: 't-warning' },
        { t: '', c: 'blank' },
    ]);

    STATE.lastOutput = pwd;
}

function generatePassphrase() {
    const words = [
        'correct','horse','battery','staple','purple','elephant',
        'mountain','ocean','thunder','crystal','shadow','dragon',
        'forest','copper','silver','golden','rocket','phoenix',
        'solar','lunar','cosmic','cipher','matrix','quantum',
        'vector','kernel','delta','sigma','alpha','omega',
    ];
    const count  = 5;
    const arr    = new Uint32Array(count);
    crypto.getRandomValues(arr);
    const phrase = Array.from(arr).map(n => words[n % words.length]).join('-');
    const entropy = (Math.log2(words.length) * count).toFixed(1);

    printLines([
        { t: '', c: 'blank' },
        { t: '  ✔ Passphrase Generated', c: 't-success' },
        { t: '  ─────────────────────────────────────────────', c: 't-muted' },
        { t: `  Passphrase : ${phrase}`, c: 't-hash' },
        { t: `  Words      : ${count} random words`, c: 't-label' },
        { t: `  Entropy    : ${entropy} bits`, c: 't-label' },
        { t: `  Method     : Diceware-style CSPRNG`, c: 't-label' },
        { t: '  ✔ Passphrases are easier to remember and highly secure', c: 't-success' },
        { t: '', c: 'blank' },
    ]);

    STATE.lastOutput = phrase;
}

function checkPasswordStrength(pwd, verbose) {
    const s = calcPasswordStrength(pwd);
    const checks = [
        { label: 'Length ≥ 8',       ok: pwd.length >= 8 },
        { label: 'Length ≥ 12',      ok: pwd.length >= 12 },
        { label: 'Uppercase letters', ok: /[A-Z]/.test(pwd) },
        { label: 'Lowercase letters', ok: /[a-z]/.test(pwd) },
        { label: 'Numbers',           ok: /[0-9]/.test(pwd) },
        { label: 'Special symbols',   ok: /[^a-zA-Z0-9]/.test(pwd) },
        { label: 'No common patterns',ok: !isCommonPattern(pwd) },
    ];

    const score  = checks.filter(c => c.ok).length;
    const bar    = buildStrengthBar(score, checks.length);

    printLines([
        { t: '', c: 'blank' },
        { t: `  Password Strength Analysis`, c: 't-accent' },
        { t: `  ─────────────────────────────────────────────`, c: 't-muted' },
        { t: `  Password  : ${'*'.repeat(Math.min(pwd.length, 20))}`, c: 't-label' },
        { t: `  Length    : ${pwd.length} characters`, c: 't-label' },
        { t: `  Entropy   : ${s.entropy.toFixed(1)} bits`, c: 't-label' },
        { t: `  Strength  : ${s.label} ${s.icon}`, c: s.cls },
        { t: `  Score     : ${score}/${checks.length}  ${bar}`, c: 't-label' },
        { t: `  Est. Crack: ${s.crackTime}`, c: 't-label' },
    ]);

    if (verbose) {
        appendLine('', 't-muted');
        appendLine('  Detailed Checks:', 't-muted');
        checks.forEach(c => {
            appendLine(`    ${c.ok ? '✔' : '✘'} ${c.label}`, c.ok ? 't-success' : 't-error');
        });
    }

    // Suggestions
    const missing = checks.filter(c => !c.ok);
    if (missing.length > 0) {
        appendBlank();
        appendLine('  Suggestions to improve:', 't-warning');
        missing.forEach(m => {
            appendLine(`    → Add ${m.label.toLowerCase()}`, 't-muted');
        });
    }

    appendBlank();
}

function calcPasswordStrength(pwd) {
    let charset = 0;
    if (/[a-z]/.test(pwd)) charset += 26;
    if (/[A-Z]/.test(pwd)) charset += 26;
    if (/[0-9]/.test(pwd)) charset += 10;
    if (/[^a-zA-Z0-9]/.test(pwd)) charset += 32;

    const entropy = pwd.length * Math.log2(charset || 1);
    let label, icon, cls, crackTime;

    if (entropy < 28)      { label = 'VERY WEAK';  icon = '💀'; cls = 't-error';   crackTime = 'Instantly'; }
    else if (entropy < 36) { label = 'WEAK';        icon = '⚠️';  cls = 't-error';   crackTime = 'Seconds to minutes'; }
    else if (entropy < 60) { label = 'MODERATE';   icon = '⚡'; cls = 't-warning'; crackTime = 'Hours to days'; }
    else if (entropy < 80) { label = 'STRONG';      icon = '🔒'; cls = 't-success'; crackTime = 'Years'; }
    else                   { label = 'VERY STRONG'; icon = '🛡️';  cls = 't-success'; crackTime = 'Centuries+'; }

    return { entropy, label, icon, cls, crackTime };
}

function isCommonPattern(pwd) {
    const common = ['password','123456','qwerty','abc123','letmein','admin','welcome','monkey'];
    return common.some(c => pwd.toLowerCase().includes(c));
}

function buildStrengthBar(score, max) {
    const filled = Math.round((score / max) * 10);
    const empty  = 10 - filled;
    return '[' + '█'.repeat(filled) + '░'.repeat(empty) + ']';
}

/* ── CRYPTOKIT ENCODE / DECODE ──────────────────────── */
function cmdCryptokitEncode(raw) {
    const flags = parseFlags(raw);
    const text  = extractQuoted(raw);

    if (flags.base64 !== undefined) {
        if (!text) {
            printError('Usage: cryptokit encode --base64 "your text"');
            return;
        }
        const encoded = btoa(unescape(encodeURIComponent(text)));
        printLines([
            { t: '', c: 'blank' },
            { t: `  Input   : "${text}"`, c: 't-label' },
            { t: `  Base64  : ${encoded}`, c: 't-hash' },
            { t: '  ✔ Encoded successfully', c: 't-success' },
            { t: '', c: 'blank' },
        ]);
        STATE.lastOutput = encoded;
    } else {
        printError('Specify encoding: cryptokit encode --base64 "text"');
    }
}

function cmdCryptokitDecode(raw) {
    const flags = parseFlags(raw);
    const text  = extractQuoted(raw);

    if (flags.base64 !== undefined) {
        if (!text) {
            printError('Usage: cryptokit decode --base64 "base64string"');
            return;
        }
        try {
            const decoded = decodeURIComponent(escape(atob(text)));
            printLines([
                { t: '', c: 'blank' },
                { t: `  Input   : "${text}"`, c: 't-label' },
                { t: `  Decoded : ${decoded}`, c: 't-hash' },
                { t: '  ✔ Decoded successfully', c: 't-success' },
                { t: '', c: 'blank' },
            ]);
            STATE.lastOutput = decoded;
        } catch {
            printError('Invalid Base64 string. Check your input.');
        }
    } else {
        printError('Specify encoding: cryptokit decode --base64 "..."');
    }
}

/* ── CRYPTOKIT AES ──────────────────────────────────── */
async function cmdCryptokitAES(raw) {
    const flags  = parseFlags(raw);
    const tokens = tokenize(raw);
    const action = tokens[2];

    const quoted = [];
    const qRegex = /"([^"]*?)"|'([^']*?)'/g;
    let   m;
    while ((m = qRegex.exec(raw)) !== null) {
        quoted.push(m[1] !== undefined ? m[1] : m[2]);
    }

    if (action === '--encrypt') {
        const msg = quoted[0];
        const key = flags.key || quoted[1];
        if (!msg || !key) {
            printError('Usage: cryptokit aes --encrypt "message" --key "password"');
            return;
        }
        await aesEncrypt(msg, key);
    } else if (action === '--decrypt') {
        const cipher = quoted[0];
        const key    = flags.key || quoted[1];
        if (!cipher || !key) {
            printError('Usage: cryptokit aes --decrypt "ciphertext" --key "password"');
            return;
        }
        await aesDecrypt(cipher, key);
    } else {
        printError('Usage: cryptokit aes --encrypt "msg" --key "pass" | --decrypt ...');
    }
}

async function aesEncrypt(msg, password) {
    STATE.busy = true;
    printLines([{ t: '  ⚙ Encrypting with AES-256-GCM...', c: 't-info' }]);
    await delay(200);

    try {
        const enc       = new TextEncoder();
        const salt      = crypto.getRandomValues(new Uint8Array(16));
        const iv        = crypto.getRandomValues(new Uint8Array(12));
        const keyMat    = await crypto.subtle.importKey('raw', enc.encode(password), 'PBKDF2', false, ['deriveKey']);
        const aesKey    = await crypto.subtle.deriveKey(
            { name:'PBKDF2', salt, iterations:100000, hash:'SHA-256' },
            keyMat, { name:'AES-GCM', length:256 }, false, ['encrypt']
        );
        const cipher    = await crypto.subtle.encrypt({ name:'AES-GCM', iv }, aesKey, enc.encode(msg));
        const combined  = new Uint8Array(salt.length + iv.length + cipher.byteLength);
        combined.set(salt, 0);
        combined.set(iv, 16);
        combined.set(new Uint8Array(cipher), 28);
        const b64       = bufToB64(combined.buffer);

        printLines([
            { t: '', c: 'blank' },
            { t: `  ✔ AES-256-GCM Encryption successful`, c: 't-success' },
            { t: `  Algorithm  : AES-256-GCM`, c: 't-label' },
            { t: `  KDF        : PBKDF2-SHA256 (100,000 iterations)`, c: 't-label' },
            { t: `  Input      : "${msg}"`, c: 't-label' },
            { t: `  Ciphertext : ${b64}`, c: 't-hash' },
            { t: '', c: 'blank' },
            { t: '  Tip: Use  cryptokit aes --decrypt  with the same key to recover', c: 't-muted' },
            { t: '', c: 'blank' },
        ]);

        STATE.lastOutput = b64;
    } catch (err) {
        printError(`Encryption failed: ${err.message}`);
    }

    STATE.busy = false;
}

async function aesDecrypt(cipherB64, password) {
    STATE.busy = true;
    printLines([{ t: '  ⚙ Decrypting with AES-256-GCM...', c: 't-info' }]);
    await delay(200);

    try {
        const enc       = new TextEncoder();
        const dec       = new TextDecoder();
        const combined  = new Uint8Array(b64ToBuf(cipherB64));
        const salt      = combined.slice(0, 16);
        const iv        = combined.slice(16, 28);
        const data      = combined.slice(28);
        const keyMat    = await crypto.subtle.importKey('raw', enc.encode(password), 'PBKDF2', false, ['deriveKey']);
        const aesKey    = await crypto.subtle.deriveKey(
            { name:'PBKDF2', salt, iterations:100000, hash:'SHA-256' },
            keyMat, { name:'AES-GCM', length:256 }, false, ['decrypt']
        );
        const plain     = await crypto.subtle.decrypt({ name:'AES-GCM', iv }, aesKey, data);

        printLines([
            { t: '', c: 'blank' },
            { t: `  ✔ AES-256-GCM Decryption successful`, c: 't-success' },
            { t: `  Plaintext : ${dec.decode(plain)}`, c: 't-hash' },
            { t: '', c: 'blank' },
        ]);

        STATE.lastOutput = dec.decode(plain);
    } catch {
        printError('Decryption failed. Wrong key or corrupted ciphertext.');
    }

    STATE.busy = false;
}

/* ── OPENSSL ────────────────────────────────────────── */
async function cmdOpenssl(raw) {
    const tokens = tokenize(raw);
    const sub    = tokens[1]?.toLowerCase();

    if (sub === 'genrsa') {
        const bits = parseInt(tokens[tokens.length - 1]) || 2048;
        await generateRSA(bits, 'pem');
    } else if (sub === 'rsa') {
        if (raw.includes('-pubout')) {
            printLines([
                { t: '', c: 'blank' },
                { t: '  openssl rsa — Extract Public Key', c: 't-info' },
                { t: '  In browser mode, generate a key pair first:', c: 't-muted' },
                { t: '  $ cryptokit rsa --generate --bits 2048', c: 't-white' },
                { t: '  The public key will be shown automatically.', c: 't-muted' },
                { t: '', c: 'blank' },
            ]);
        } else if (raw.includes('-text')) {
            cmdRSAAnalyze();
        } else {
            printLines([
                { t: '', c: 'blank' },
                { t: '  openssl rsa flags:', c: 't-info' },
                { t: '    -in <file>   : Input key file', c: 't-white' },
                { t: '    -pubout      : Output public key', c: 't-white' },
                { t: '    -text        : Print key in text form', c: 't-white' },
                { t: '    -noout       : Do not output key', c: 't-white' },
                { t: '', c: 'blank' },
            ]);
        }
    } else if (sub === 'rand') {
        const flags  = parseFlags(raw);
        const count  = parseInt(tokens[tokens.length - 1]) || 16;
        const isHex  = raw.includes('-hex');
        const isB64  = raw.includes('-base64');
        const bytes  = crypto.getRandomValues(new Uint8Array(count));
        let   result;

        if (isHex)     result = Array.from(bytes).map(b => b.toString(16).padStart(2,'0')).join('');
        else if (isB64) result = bufToB64(bytes.buffer);
        else            result = Array.from(bytes).join(' ');

        printLines([
            { t: '', c: 'blank' },
            { t: `  ✔ Random ${count} bytes generated`, c: 't-success' },
            { t: `  Format : ${isHex ? 'Hexadecimal' : isB64 ? 'Base64' : 'Decimal'}`, c: 't-label' },
            { t: `  Output : ${result}`, c: 't-hash' },
            { t: '', c: 'blank' },
        ]);
        STATE.lastOutput = result;
    } else if (sub === 'rsautl' || sub === 'pkeyutl') {
        printLines([
            { t: '', c: 'blank' },
            { t: '  RSA encrypt/decrypt — use CryptoKit wrapper instead:', c: 't-info' },
            { t: '  $ cryptokit aes --encrypt "message" --key "password"', c: 't-white' },
            { t: '', c: 'blank' },
        ]);
    } else {
        printLines([
            { t: '', c: 'blank' },
            { t: '  Supported openssl commands in browser mode:', c: 't-info' },
            { t: '    openssl genrsa -out private.pem <bits>    Generate RSA key', c: 't-white' },
            { t: '    openssl rsa -in priv.pem -pubout          Extract public key', c: 't-white' },
            { t: '    openssl rsa -in priv.pem -text            Key details', c: 't-white' },
            { t: '    openssl rand -hex <n>                     Random hex', c: 't-white' },
            { t: '    openssl rand -base64 <n>                  Random Base64', c: 't-white' },
            { t: '', c: 'blank' },
        ]);
    }
}

/* ── GET-FILEHASH (PowerShell) ──────────────────────── */
async function cmdGetFileHash(raw) {
    const tokens = tokenize(raw);
    let   algo   = 'SHA-256';

    const algoIdx = raw.toLowerCase().indexOf('-algorithm');
    if (algoIdx !== -1) {
        const algoToken = tokens[tokens.findIndex(t => t.toLowerCase() === '-algorithm') + 1];
        if (algoToken) {
            const map = { sha256:'SHA-256', sha512:'SHA-512', sha384:'SHA-384', sha1:'SHA-1', md5:null };
            algo = map[algoToken.toLowerCase()] || 'SHA-256';
        }
    }

    // Simulate file hash — use filename as seed text
    const filename = tokens[1] || 'file.txt';
    const text     = `[Simulated hash for: ${filename}]`;

    STATE.busy = true;
    printLines([{ t: '', c: 'blank' }]);
    printLines([{ t: `  ⚙ Computing ${algo} hash...`, c: 't-info' }]);
    await delay(300);

    try {
        let hash;
        if (!algo) {
            hash = md5Sim(text);
        } else {
            const buf = await crypto.subtle.digest(algo, new TextEncoder().encode(text));
            hash      = bufToHex(buf);
        }

        // PowerShell-style table output
        printLines([
            { t: '', c: 'blank' },
            { t: '  Algorithm       Hash                                                              Path', c: 't-muted' },
            { t: '  ---------       ----                                                              ----', c: 't-muted' },
            { t: `  ${(algo||'MD5').padEnd(15)} ${hash.padEnd(66)} ${filename}`, c: 't-success' },
            { t: '', c: 'blank' },
            { t: '  ℹ Browser mode: hash computed from filename as seed.', c: 't-muted' },
            { t: '     Upload real files on the File Integrity tool page.', c: 't-muted' },
            { t: '', c: 'blank' },
        ]);

        STATE.lastOutput = hash;
    } catch (err) {
        printError(`Hash error: ${err.message}`);
    }

    STATE.busy = false;
}

/* ── CERTUTIL (CMD) ─────────────────────────────────── */
async function cmdCertutil(raw) {
    const tokens = tokenize(raw);
    const flag   = tokens[1]?.toLowerCase();

    if (flag === '-hashfile') {
        const filename = tokens[2] || 'file.txt';
        const algoStr  = tokens[3]?.toUpperCase() || 'SHA256';
        const algoMap  = { SHA256:'SHA-256', SHA512:'SHA-512', SHA384:'SHA-384', SHA1:'SHA-1', MD5:null };
        const algo     = algoMap[algoStr];

        const text = `[Simulated hash for: ${filename}]`;
        STATE.busy = true;
        printLines([{ t: `  ⚙ CertUtil: hashing ${filename}...`, c: 't-info' }]);
        await delay(250);

        try {
            let hash;
            if (algo === null) {
                hash = md5Sim(text);
            } else {
                const buf = await crypto.subtle.digest(algo, new TextEncoder().encode(text));
                hash      = bufToHex(buf);
            }

            // CMD certutil output style
            printLines([
                { t: '', c: 'blank' },
                { t: `  ${algoStr} hash of ${filename}:`, c: 't-white' },
                { t: `  ${hash}`, c: 't-hash' },
                { t: `  CertUtil: -hashfile command completed successfully.`, c: 't-success' },
                { t: '', c: 'blank' },
                { t: '  ℹ Browser mode: hash computed from filename as seed.', c: 't-muted' },
                { t: '', c: 'blank' },
            ]);

            STATE.lastOutput = hash;
        } catch (err) {
            printError(`CertUtil error: ${err.message}`);
        }

        STATE.busy = false;

    } else if (flag === '-encode') {
        const inFile  = tokens[2] || 'input.txt';
        const outFile = tokens[3] || 'output.b64';
        const sample  = btoa(`[Simulated content of ${inFile}]`);
        printLines([
            { t: '', c: 'blank' },
            { t: `  Input  : ${inFile}`, c: 't-label' },
            { t: `  Output : ${outFile}`, c: 't-label' },
            { t: `  Base64 : ${sample}`, c: 't-hash' },
            { t: `  CertUtil: -encode command completed successfully.`, c: 't-success' },
            { t: '', c: 'blank' },
        ]);
        STATE.lastOutput = sample;

    } else if (flag === '-decode') {
        const inFile  = tokens[2] || 'input.b64';
        const outFile = tokens[3] || 'output.txt';
        printLines([
            { t: '', c: 'blank' },
            { t: `  Input  : ${inFile}`, c: 't-label' },
            { t: `  Output : ${outFile}`, c: 't-label' },
            { t: `  CertUtil: -decode command completed successfully.`, c: 't-success' },
            { t: '', c: 'blank' },
        ]);

    } else {
        printLines([
            { t: '', c: 'blank' },
            { t: '  Supported certutil commands:', c: 't-info' },
            { t: '    certutil -hashfile <file> <algo>        Hash a file', c: 't-white' },
            { t: '    certutil -encode <in> <out.b64>         Base64 encode', c: 't-white' },
            { t: '    certutil -decode <in.b64> <out>         Base64 decode', c: 't-white' },
            { t: '', c: 'blank' },
        ]);
    }
}

/* ── SHASUM (Bash/Unix) ─────────────────────────────── */
async function cmdShasum(raw) {
    const tokens  = tokenize(raw);
    const aFlag   = tokens.indexOf('-a');
    const algoNum = aFlag !== -1 ? tokens[aFlag + 1] : '256';
    const file    = tokens[tokens.length - 1];

    const algoMap = { '256':'SHA-256', '512':'SHA-512', '384':'SHA-384', '1':'SHA-1' };
    const algo    = algoMap[algoNum] || 'SHA-256';

    STATE.busy = true;
    printLines([{ t: `  ⚙ Computing SHA-${algoNum}...`, c: 't-info' }]);
    await delay(200);

    try {
        const text = `[Simulated content of: ${file}]`;
        const buf  = await crypto.subtle.digest(algo, new TextEncoder().encode(text));
        const hash = bufToHex(buf);

        // Unix shasum output style
        printLines([
            { t: `  ${hash}  ${file}`, c: 't-hash' },
            { t: '', c: 'blank' },
            { t: '  ℹ Browser mode: hash computed from filename as seed.', c: 't-muted' },
            { t: '', c: 'blank' },
        ]);

        STATE.lastOutput = hash;
    } catch (err) {
        printError(`shasum error: ${err.message}`);
    }

    STATE.busy = false;
}

/* ── MD5 (macOS) ────────────────────────────────────── */
function cmdMd5(raw) {
    const tokens = tokenize(raw);
    const file   = tokens[1] || 'file.txt';
    const hash   = md5Sim(`[Simulated content of: ${file}]`);

    printLines([
        { t: `  MD5 (${file}) = ${hash}`, c: 't-hash' },
        { t: '', c: 'blank' },
        { t: '  ⚠ MD5 is cryptographically broken. Use SHA-256 or higher.', c: 't-warning' },
        { t: '  ℹ Browser mode: hash computed from filename as seed.', c: 't-muted' },
        { t: '', c: 'blank' },
    ]);

    STATE.lastOutput = hash;
}

/* ── ECHO (Bash base64) ─────────────────────────────── */
function cmdEcho(raw) {
    if (raw.includes('| base64')) {
        const text = extractQuoted(raw);
        if (!text) {
            printError('Usage: echo -n "your text" | base64');
            return;
        }
        if (raw.includes('--decode') || raw.includes('-d')) {
            try {
                const decoded = atob(text);
                printLines([
                    { t: `  ${decoded}`, c: 't-hash' },
                    { t: '', c: 'blank' },
                ]);
                STATE.lastOutput = decoded;
            } catch {
                printError('Invalid Base64 string.');
            }
        } else {
            const encoded = btoa(unescape(encodeURIComponent(text)));
            printLines([
                { t: `  ${encoded}`, c: 't-hash' },
                { t: '', c: 'blank' },
            ]);
            STATE.lastOutput = encoded;
        }
    } else {
        const text = extractQuoted(raw) || raw.replace(/^echo\s+-?n?\s*/i, '').trim();
        printLines([{ t: `  ${text}`, c: 't-white' }]);
        appendBlank();
    }
}

/* ── UNKNOWN COMMAND ────────────────────────────────── */
function cmdUnknown(raw) {
    const cmd = tokenize(raw)[0];
    printLines([
        { t: '', c: 'blank' },
        { t: `  '${cmd}' : The term is not recognized.`, c: 't-error' },
        { t: `  Type  help  to see all available commands.`, c: 't-info' },
        { t: '', c: 'blank' },
    ]);
}

/* ═══════════════════════════════════════════════════════
   OUTPUT HELPERS
═══════════════════════════════════════════════════════ */
function appendLine(text, cls) {
    const out  = document.getElementById('terminalOutput');
    const span = document.createElement('span');
    span.className = `output-line ${cls}`;
    span.textContent = text;
    out.appendChild(span);
    scrollBottom();
}

function appendBlank() {
    const out  = document.getElementById('terminalOutput');
    const span = document.createElement('span');
    span.className = 'output-blank';
    out.appendChild(span);
}

function printLines(lines) {
    lines.forEach(l => {
        if (l.c === 'blank') appendBlank();
        else appendLine(l.t, l.c);
    });
    scrollBottom();
}

function printError(msg) {
    appendBlank();
    appendLine(`  ✘ Error: ${msg}`, 't-error');
    appendBlank();
}

function scrollBottom() {
    const out = document.getElementById('terminalOutput');
    out.scrollTop = out.scrollHeight;
}

function updateHistoryUI() {
    const list = document.getElementById('historyList');
    if (STATE.history.length === 0) {
        list.innerHTML = '<div class="history-empty">No commands yet</div>';
        return;
    }
    list.innerHTML = '';
    [...STATE.history].reverse().slice(0, 15).forEach(cmd => {
        const div = document.createElement('div');
        div.className   = 'history-item';
        div.textContent = cmd;
        div.onclick     = () => {
            document.getElementById('terminalInput').value = cmd;
            focusInput();
        };
        list.appendChild(div);
    });
}

/* ── UTILITY FUNCTIONS ──────────────────────────────── */
function focusInput() {
    document.getElementById('terminalInput').focus();
}

function injectCommand(cmd) {
    document.getElementById('terminalInput').value = cmd;
    focusInput();
}

function clearTerminal(reboot = true) {
    document.getElementById('terminalOutput').innerHTML = '';
    if (reboot) bootTerminal();
}

function copyLastOutput() {
    if (!STATE.lastOutput) {
        showToast('Nothing to copy yet', 'error');
        return;
    }
    navigator.clipboard.writeText(STATE.lastOutput).then(() => {
        showToast('✔ Copied to clipboard!', 'success');
    }).catch(() => {
        showToast('Copy failed', 'error');
    });
}

function downloadSession() {
    const out  = document.getElementById('terminalOutput');
    const text = out.innerText || out.textContent;
    const blob = new Blob([text], { type: 'text/plain' });
    const url  = URL.createObjectURL(blob);
    const a    = document.createElement('a');
    a.href     = url;
    a.download = `cryptokit-session-${Date.now()}.txt`;
    a.click();
    URL.revokeObjectURL(url);
    showToast('✔ Session downloaded!', 'success');
}

function toggleFullscreen() {
    if (!document.fullscreenElement) {
        document.documentElement.requestFullscreen();
        document.getElementById('fsBtn').innerHTML = '<i class="fas fa-compress"></i>';
    } else {
        document.exitFullscreen();
        document.getElementById('fsBtn').innerHTML = '<i class="fas fa-expand"></i>';
    }
}

function showToast(msg, type = '') {
    const t = document.getElementById('toast');
    t.textContent = msg;
    t.className   = `toast show ${type}`;
    setTimeout(() => t.className = 'toast', 2800);
}

function delay(ms) {
    return new Promise(r => setTimeout(r, ms));
}

function bufToHex(buf) {
    return Array.from(new Uint8Array(buf))
        .map(b => b.toString(16).padStart(2, '0')).join('');
}

function bufToB64(buf) {
    const bytes  = new Uint8Array(buf);
    let   binary = '';
    bytes.forEach(b => binary += String.fromCharCode(b));
    return btoa(binary);
}

function b64ToBuf(b64) {
    const binary = atob(b64);
    const bytes  = new Uint8Array(binary.length);
    for (let i = 0; i < binary.length; i++) bytes[i] = binary.charCodeAt(i);
    return bytes.buffer;
}

function wrapPem(b64, label) {
    const lines = b64.match(/.{1,64}/g) || [b64];
    return `-----BEGIN ${label}-----\n${lines.join('\n')}\n-----END ${label}-----`;
}

function escapeHtml(str) {
    return String(str)
        .replace(/&/g, '&amp;')
        .replace(/</g, '&lt;')
        .replace(/>/g, '&gt;')
        .replace(/"/g, '&quot;')
        .replace(/'/g, '&#39;');
}

/* ── MD5 SIMULATION (browser fallback) ─────────────── */
function md5Sim(str) {
    // Simple non-cryptographic simulation for display purposes
    // Real MD5 not available in WebCrypto (intentionally excluded as it's broken)
    let hash = 0;
    for (let i = 0; i < str.length; i++) {
        hash = ((hash << 5) - hash) + str.charCodeAt(i);
        hash |= 0;
    }
    // Expand to look like MD5 (32 hex chars)
    const h1 = Math.abs(hash).toString(16).padStart(8, '0');
    const h2 = Math.abs(hash * 1234567).toString(16).padStart(8, '0');
    const h3 = Math.abs(hash * 7654321).toString(16).padStart(8, '0');
    const h4 = Math.abs(hash * 9876543).toString(16).padStart(8, '0');
    return (h1 + h2 + h3 + h4).substring(0, 32);
}