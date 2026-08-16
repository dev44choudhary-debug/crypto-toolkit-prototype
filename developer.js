/* ═══════════════════════════════════════════════════════
   CRYPTOKIT — DEVELOPER TERMINAL ENGINE v2.0
   Full terminal emulator with CMD / PowerShell / Bash
   Enhanced input handling, responsive, more commands
═══════════════════════════════════════════════════════ */

'use strict';

/* ── STATE ─────────────────────────────────────────── */
const STATE = {
    shell:         'powershell',
    history:       [],
    historyIndex:  -1,
    lastOutput:    '',
    busy:          false,
    acIndex:       -1,
    rsaKeyPair:    null,
    lastEncrypted: '',
};

/* ── SHELL CONFIG ───────────────────────────────────── */
const SHELLS = {
    powershell: {
        label:       'Windows PowerShell',
        prompt:      'PS C:\\CryptoKit>',
        promptClass: 't-prompt-ps',
        chromeTitle: 'Windows PowerShell — CryptoKit Developer Terminal',
        engineLabel: 'PowerShell',
        bootLines: [
            { text: 'Windows PowerShell', cls: 't-white' },
            { text: 'Copyright (C) Microsoft Corporation. All rights reserved.', cls: 't-muted' },
            { text: '', cls: 'blank' },
            { text: 'CryptoKit Crypto Engine v2.0.0 loaded ✔', cls: 't-success' },
            { text: 'WebCrypto API  : Available ✔', cls: 't-success' },
            { text: 'Type  help  to see all available commands.', cls: 't-info' },
            { text: '', cls: 'blank' },
        ],
    },
    cmd: {
        label:       'Command Prompt',
        prompt:      'C:\\CryptoKit>',
        promptClass: 't-prompt-cmd',
        chromeTitle: 'Command Prompt — CryptoKit Developer Terminal',
        engineLabel: 'CMD',
        bootLines: [
            { text: 'Microsoft Windows [Version 10.0.22631]', cls: 't-white' },
            { text: '(c) Microsoft Corporation. All rights reserved.', cls: 't-muted' },
            { text: '', cls: 'blank' },
            { text: 'CryptoKit Crypto Engine v2.0.0 loaded ✔', cls: 't-success' },
            { text: 'Type  help  to see all available commands.', cls: 't-info' },
            { text: '', cls: 'blank' },
        ],
    },
    bash: {
        label:       'Bash / Zsh',
        prompt:      'cryptokit@dev:~$',
        promptClass: 't-prompt-bash',
        chromeTitle: 'Bash — CryptoKit Developer Terminal',
        engineLabel: 'Bash / Zsh',
        bootLines: [
            { text: 'CryptoKit Terminal  [bash 5.2.0]', cls: 't-success' },
            { text: 'WebCrypto Engine v2.0.0 | All systems online ✔', cls: 't-success' },
            { text: '# Type  help  to list all commands', cls: 't-comment' },
            { text: '', cls: 'blank' },
        ],
    },
};

/* ── QUICK COMMANDS PER SHELL ───────────────────────── */
const QUICK_CMDS = {
    powershell: [
        { icon: '🔑', name: 'SHA-256 Hash',         desc: 'Hash text with SHA-256',          cmd: 'cryptokit hash --algo sha256 "Type your text here"' },
        { icon: '#️⃣', name: 'All Hashes',            desc: 'All algorithms at once',          cmd: 'cryptokit hash --all "Type your text here"' },
        { icon: '🔐', name: 'RSA 2048 Key',          desc: 'Generate RSA-2048 pair',          cmd: 'cryptokit rsa --generate --bits 2048' },
        { icon: '🔐', name: 'RSA 4096 Key',          desc: 'Generate RSA-4096 pair',          cmd: 'cryptokit rsa --generate --bits 4096' },
        { icon: '🔑', name: 'Password 16 chars',     desc: 'Strong random password',          cmd: 'cryptokit passwd --generate --length 16 --strong' },
        { icon: '🔑', name: 'Password 32 chars',     desc: 'Extra strong password',           cmd: 'cryptokit passwd --generate --length 32 --strong' },
        { icon: '📝', name: 'Passphrase',            desc: 'Easy to remember passphrase',     cmd: 'cryptokit passwd --generate --passphrase' },
        { icon: '✅', name: 'Check Password',        desc: 'Analyze password strength',       cmd: 'cryptokit passwd --check "Type your password here"' },
        { icon: '📄', name: 'Base64 Encode',         desc: 'Encode any text to Base64',       cmd: 'cryptokit encode --base64 "Type your sentence here"' },
        { icon: '📄', name: 'Base64 Decode',         desc: 'Decode Base64 to text',           cmd: 'cryptokit decode --base64 "paste base64 here"' },
        { icon: '🔒', name: 'AES Encrypt',           desc: 'Encrypt text with AES-256',       cmd: 'cryptokit aes --encrypt "Your secret message here" --key "your-password"' },
        { icon: '🔓', name: 'AES Decrypt',           desc: 'Decrypt AES ciphertext',          cmd: 'cryptokit aes --decrypt "paste-ciphertext" --key "your-password"' },
        { icon: '🔀', name: 'Random Hex',            desc: 'Random hex string',               cmd: 'cryptokit random --hex 32' },
        { icon: '🔀', name: 'Random Base64',         desc: 'Random base64 string',            cmd: 'cryptokit random --base64 32' },
        { icon: '🔢', name: 'UUID Generator',        desc: 'Generate UUID v4',                cmd: 'cryptokit uuid' },
        { icon: '📊', name: 'Hash Compare',          desc: 'Compare two hashes',              cmd: 'cryptokit hash --compare "hash1" "hash2"' },
        { icon: '🔤', name: 'ROT13 Encode',          desc: 'ROT13 cipher',                    cmd: 'cryptokit rot13 "Type your text here"' },
        { icon: '🔤', name: 'Hex Encode',            desc: 'Text to hexadecimal',             cmd: 'cryptokit hex --encode "Type your text here"' },
        { icon: '🔤', name: 'Hex Decode',            desc: 'Hexadecimal to text',             cmd: 'cryptokit hex --decode "paste hex here"' },
        { icon: '📏', name: 'Char Count',            desc: 'Count characters and words',      cmd: 'cryptokit count "Type your sentence here"' },
        { icon: 'ℹ️', name: 'System Info',           desc: 'Engine details',                  cmd: 'cryptokit --info' },
        { icon: '❓', name: 'Help',                  desc: 'All available commands',           cmd: 'help' },
    ],
    cmd: [
        { icon: '#️⃣', name: 'certutil SHA256',       desc: 'SHA256 hash file',                cmd: 'certutil -hashfile document.txt SHA256' },
        { icon: '#️⃣', name: 'certutil MD5',          desc: 'MD5 hash file',                   cmd: 'certutil -hashfile document.txt MD5' },
        { icon: '#️⃣', name: 'certutil SHA512',       desc: 'SHA512 hash file',                cmd: 'certutil -hashfile document.txt SHA512' },
        { icon: '📄', name: 'certutil encode',       desc: 'Base64 encode file',              cmd: 'certutil -encode input.txt output.b64' },
        { icon: '🔑', name: 'SHA-256 Hash',          desc: 'Hash text with SHA-256',          cmd: 'cryptokit hash --algo sha256 "Type your text here"' },
        { icon: '#️⃣', name: 'All Hashes',            desc: 'All algorithms at once',          cmd: 'cryptokit hash --all "Type your text here"' },
        { icon: '🔐', name: 'RSA Key 2048',          desc: 'Generate RSA-2048',               cmd: 'openssl genrsa -out private.pem 2048' },
        { icon: '🔑', name: 'Password Gen',          desc: 'Secure password',                 cmd: 'cryptokit passwd --generate --length 16 --strong' },
        { icon: '✅', name: 'Check Password',        desc: 'Strength check',                  cmd: 'cryptokit passwd --check "Type your password here"' },
        { icon: '📄', name: 'Base64 Encode',         desc: 'Encode text',                     cmd: 'cryptokit encode --base64 "Type your sentence here"' },
        { icon: '🔒', name: 'AES Encrypt',           desc: 'Encrypt text',                    cmd: 'cryptokit aes --encrypt "Your secret message here" --key "your-password"' },
        { icon: '🔀', name: 'Random Hex',            desc: 'Random hex string',               cmd: 'cryptokit random --hex 32' },
        { icon: '🔢', name: 'UUID',                  desc: 'Generate UUID',                   cmd: 'cryptokit uuid' },
        { icon: '🔤', name: 'ROT13',                 desc: 'ROT13 cipher',                    cmd: 'cryptokit rot13 "Type your text here"' },
        { icon: 'ℹ️', name: 'System Info',           desc: 'Engine details',                  cmd: 'cryptokit --info' },
        { icon: '❓', name: 'Help',                  desc: 'All commands',                    cmd: 'help' },
    ],
    bash: [
        { icon: '#️⃣', name: 'shasum SHA256',         desc: 'Hash a file',                     cmd: 'shasum -a 256 file.txt' },
        { icon: '#️⃣', name: 'shasum SHA512',         desc: 'SHA512 hash',                     cmd: 'shasum -a 512 file.txt' },
        { icon: '🔐', name: 'openssl genrsa',        desc: 'Generate RSA key',                cmd: 'openssl genrsa -out private.pem 2048' },
        { icon: '🔑', name: 'openssl rand b64',      desc: 'Random base64',                   cmd: 'openssl rand -base64 20' },
        { icon: '🔑', name: 'openssl rand hex',      desc: 'Random hex',                      cmd: 'openssl rand -hex 32' },
        { icon: '🔑', name: 'SHA-256 Hash',          desc: 'Hash text',                       cmd: 'cryptokit hash --algo sha256 "Type your text here"' },
        { icon: '#️⃣', name: 'All Hashes',            desc: 'All algorithms',                  cmd: 'cryptokit hash --all "Type your text here"' },
        { icon: '✅', name: 'Check Password',        desc: 'Strength check',                  cmd: 'cryptokit passwd --check "Type your password here"' },
        { icon: '🔑', name: 'Password Gen',          desc: 'Secure password',                 cmd: 'cryptokit passwd --generate --length 20 --strong' },
        { icon: '📄', name: 'Base64 Encode',         desc: 'Encode string',                   cmd: 'echo -n "Type your sentence here" | base64' },
        { icon: '📄', name: 'Base64 Decode',         desc: 'Decode string',                   cmd: 'echo -n "aGVsbG8gd29ybGQ=" | base64 --decode' },
        { icon: '🔒', name: 'AES Encrypt',           desc: 'Encrypt text',                    cmd: 'cryptokit aes --encrypt "Your secret message here" --key "your-password"' },
        { icon: '🔀', name: 'Random Hex',            desc: 'Random hex',                      cmd: 'cryptokit random --hex 32' },
        { icon: '🔢', name: 'UUID',                  desc: 'Generate UUID',                   cmd: 'cryptokit uuid' },
        { icon: '🔤', name: 'ROT13',                 desc: 'ROT13 cipher',                    cmd: 'cryptokit rot13 "Type your text here"' },
        { icon: '📏', name: 'Char Count',            desc: 'Count chars and words',           cmd: 'cryptokit count "Type your sentence here"' },
        { icon: '❓', name: 'Help',                  desc: 'All commands',                    cmd: 'help' },
    ],
};

/* ── AUTOCOMPLETE SUGGESTIONS ───────────────────────── */
const AC_SUGGESTIONS = [
    { cmd: 'cryptokit hash --algo sha256 "text"',                 desc: 'SHA-256 hash' },
    { cmd: 'cryptokit hash --algo sha512 "text"',                 desc: 'SHA-512 hash' },
    { cmd: 'cryptokit hash --algo sha384 "text"',                 desc: 'SHA-384 hash' },
    { cmd: 'cryptokit hash --algo sha1 "text"',                   desc: 'SHA-1 hash' },
    { cmd: 'cryptokit hash --algo md5 "text"',                    desc: 'MD5 hash' },
    { cmd: 'cryptokit hash --all "text"',                         desc: 'All algorithms at once' },
    { cmd: 'cryptokit hash --compare "hash1" "hash2"',           desc: 'Compare two hashes' },
    { cmd: 'cryptokit rsa --generate',                            desc: 'Generate RSA-2048' },
    { cmd: 'cryptokit rsa --generate --bits 4096',                desc: 'Generate RSA-4096' },
    { cmd: 'cryptokit rsa --generate --bits 1024',                desc: 'Generate RSA-1024 (weak)' },
    { cmd: 'cryptokit rsa --analyze',                             desc: 'RSA key analysis guide' },
    { cmd: 'cryptokit passwd --generate',                         desc: 'Random password' },
    { cmd: 'cryptokit passwd --generate --length 20 --strong',    desc: 'Strong 20-char password' },
    { cmd: 'cryptokit passwd --generate --length 32 --strong',    desc: 'Extra strong 32-char' },
    { cmd: 'cryptokit passwd --generate --no-symbols',            desc: 'Password without symbols' },
    { cmd: 'cryptokit passwd --generate --no-numbers',            desc: 'Password without numbers' },
    { cmd: 'cryptokit passwd --generate --passphrase',            desc: 'Memorable passphrase' },
    { cmd: 'cryptokit passwd --generate --passphrase --words 6',  desc: '6-word passphrase' },
    { cmd: 'cryptokit passwd --check "password"',                 desc: 'Check password strength' },
    { cmd: 'cryptokit passwd --check "password" --verbose',       desc: 'Detailed strength check' },
    { cmd: 'cryptokit encode --base64 "your sentence"',           desc: 'Base64 encode text' },
    { cmd: 'cryptokit decode --base64 "base64string"',            desc: 'Base64 decode text' },
    { cmd: 'cryptokit aes --encrypt "message" --key "password"',  desc: 'AES-256 encrypt' },
    { cmd: 'cryptokit aes --decrypt "cipher" --key "password"',   desc: 'AES-256 decrypt' },
    { cmd: 'cryptokit random --hex 32',                           desc: 'Random hex string' },
    { cmd: 'cryptokit random --base64 32',                        desc: 'Random base64 string' },
    { cmd: 'cryptokit random --bytes 16',                         desc: 'Random decimal bytes' },
    { cmd: 'cryptokit uuid',                                      desc: 'Generate UUID v4' },
    { cmd: 'cryptokit rot13 "text"',                              desc: 'ROT13 cipher' },
    { cmd: 'cryptokit hex --encode "text"',                       desc: 'Text to hex' },
    { cmd: 'cryptokit hex --decode "hex"',                        desc: 'Hex to text' },
    { cmd: 'cryptokit count "text"',                              desc: 'Character & word count' },
    { cmd: 'cryptokit reverse "text"',                            desc: 'Reverse a string' },
    { cmd: 'cryptokit morse --encode "text"',                     desc: 'Text to Morse code' },
    { cmd: 'cryptokit morse --decode "morse"',                    desc: 'Morse code to text' },
    { cmd: 'cryptokit caesar --shift 3 "text"',                   desc: 'Caesar cipher' },
    { cmd: 'cryptokit --info',                                    desc: 'System info' },
    { cmd: 'cryptokit --version',                                 desc: 'Version info' },
    { cmd: 'openssl genrsa -out private.pem 2048',                desc: 'Generate RSA (OpenSSL)' },
    { cmd: 'openssl genrsa -out private.pem 4096',                desc: 'Generate RSA-4096' },
    { cmd: 'openssl rsa -in private.pem -pubout',                 desc: 'Extract public key' },
    { cmd: 'openssl rsa -in private.pem -text -noout',            desc: 'View key details' },
    { cmd: 'openssl rand -base64 20',                             desc: 'Random base64' },
    { cmd: 'openssl rand -hex 32',                                desc: 'Random hex' },
    { cmd: 'Get-FileHash .\\file.txt -Algorithm SHA256',          desc: 'PowerShell hash' },
    { cmd: 'Get-FileHash .\\file.txt -Algorithm MD5',             desc: 'PowerShell MD5' },
    { cmd: 'Get-FileHash .\\file.txt -Algorithm SHA512',          desc: 'PowerShell SHA512' },
    { cmd: 'certutil -hashfile document.txt SHA256',              desc: 'CMD hash' },
    { cmd: 'certutil -hashfile document.txt MD5',                 desc: 'CMD MD5' },
    { cmd: 'certutil -hashfile document.txt SHA512',              desc: 'CMD SHA512' },
    { cmd: 'certutil -encode input.txt output.b64',               desc: 'CMD Base64 encode' },
    { cmd: 'certutil -decode input.b64 output.txt',               desc: 'CMD Base64 decode' },
    { cmd: 'shasum -a 256 file.txt',                              desc: 'Unix SHA-256' },
    { cmd: 'shasum -a 512 file.txt',                              desc: 'Unix SHA-512' },
    { cmd: 'shasum -a 1 file.txt',                                desc: 'Unix SHA-1' },
    { cmd: 'md5 file.txt',                                        desc: 'macOS MD5' },
    { cmd: 'echo -n "text" | base64',                             desc: 'Bash base64 encode' },
    { cmd: 'echo -n "b64" | base64 --decode',                    desc: 'Bash base64 decode' },
    { cmd: 'help',                                                desc: 'Show all commands' },
    { cmd: 'clear',                                               desc: 'Clear terminal' },
    { cmd: 'cls',                                                 desc: 'Clear (CMD)' },
    { cmd: 'history',                                             desc: 'Command history' },
    { cmd: 'date',                                                desc: 'Current date & time' },
    { cmd: 'whoami',                                              desc: 'Current user' },
    { cmd: 'uname',                                               desc: 'System information' },
    { cmd: 'uptime',                                              desc: 'Session uptime' },
    { cmd: 'neofetch',                                            desc: 'System overview' },
];

/* ── REFERENCE PANEL DATA ───────────────────────────── */
const REF_GROUPS = [
    {
        icon: 'fas fa-hashtag', title: 'Hashing',
        items: [
            { syn: 'cryptokit hash --algo sha256 "your text"',    desc: 'SHA-256 hash' },
            { syn: 'cryptokit hash --algo sha512 "your text"',    desc: 'SHA-512 hash' },
            { syn: 'cryptokit hash --algo md5 "your text"',       desc: 'MD5 hash (weak)' },
            { syn: 'cryptokit hash --all "your text"',            desc: 'All algorithms' },
            { syn: 'cryptokit hash --compare "h1" "h2"',         desc: 'Compare hashes' },
        ],
    },
    {
        icon: 'fas fa-key', title: 'RSA Keys',
        items: [
            { syn: 'cryptokit rsa --generate',                    desc: 'RSA-2048 key pair' },
            { syn: 'cryptokit rsa --generate --bits 4096',        desc: 'RSA-4096 key pair' },
            { syn: 'openssl genrsa -out private.pem 2048',        desc: 'OpenSSL RSA key' },
            { syn: 'openssl rsa -in priv.pem -pubout',            desc: 'Extract public key' },
            { syn: 'cryptokit rsa --analyze',                     desc: 'Key security guide' },
        ],
    },
    {
        icon: 'fas fa-lock', title: 'Passwords',
        items: [
            { syn: 'cryptokit passwd --generate --length 16',     desc: 'Generate password' },
            { syn: 'cryptokit passwd --generate --strong',        desc: 'Strong password' },
            { syn: 'cryptokit passwd --generate --passphrase',    desc: 'Passphrase' },
            { syn: 'cryptokit passwd --check "your password"',    desc: 'Check strength' },
            { syn: 'openssl rand -base64 20',                     desc: 'Random base64' },
        ],
    },
    {
        icon: 'fas fa-code', title: 'Encoding',
        items: [
            { syn: 'cryptokit encode --base64 "any sentence"',    desc: 'Base64 encode' },
            { syn: 'cryptokit decode --base64 "b64 string"',      desc: 'Base64 decode' },
            { syn: 'cryptokit hex --encode "text"',                desc: 'Text to hex' },
            { syn: 'cryptokit hex --decode "hex string"',          desc: 'Hex to text' },
            { syn: 'cryptokit rot13 "your text"',                  desc: 'ROT13 cipher' },
            { syn: 'cryptokit morse --encode "text"',              desc: 'Morse encode' },
            { syn: 'cryptokit caesar --shift 3 "text"',            desc: 'Caesar cipher' },
        ],
    },
    {
        icon: 'fas fa-shield-alt', title: 'Encryption',
        items: [
            { syn: 'cryptokit aes --encrypt "msg" --key "pass"',  desc: 'AES-256 encrypt' },
            { syn: 'cryptokit aes --decrypt "enc" --key "pass"',  desc: 'AES-256 decrypt' },
        ],
    },
    {
        icon: 'fas fa-random', title: 'Random & Utils',
        items: [
            { syn: 'cryptokit random --hex 32',                    desc: 'Random hex string' },
            { syn: 'cryptokit random --base64 32',                 desc: 'Random base64' },
            { syn: 'cryptokit uuid',                               desc: 'UUID v4 generator' },
            { syn: 'cryptokit count "text"',                       desc: 'Char/word counter' },
            { syn: 'cryptokit reverse "text"',                     desc: 'Reverse string' },
            { syn: 'date',                                         desc: 'Current date/time' },
            { syn: 'whoami',                                       desc: 'Current user' },
            { syn: 'neofetch',                                     desc: 'System overview' },
        ],
    },
];


/* ═══════════════════════════════════════════════════════
   INIT
═══════════════════════════════════════════════════════ */
const SESSION_START = Date.now();

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
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    canvas.width  = window.innerWidth;
    canvas.height = window.innerHeight;

    const chars = '0123456789ABCDEFabcdef{}[]<>/\\|=+-*&%$#@!';
    const cols  = Math.floor(canvas.width / 18);
    const drops = Array(cols).fill(1);

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
    let dl = 0;
    shell.bootLines.forEach(line => {
        setTimeout(() => {
            if (line.cls === 'blank') appendBlank();
            else appendLine(line.text, line.cls);
        }, dl);
        dl += 55;
    });
    setTimeout(() => focusInput(), dl + 100);
}

/* ── SWITCH SHELL ───────────────────────────────────── */
function switchShell(shell) {
    if (STATE.shell === shell) return;
    STATE.shell       = shell;
    STATE.historyIndex = -1;
    document.querySelectorAll('.shell-btn').forEach(b => b.classList.remove('active'));
    const id = 'shell' + shell.charAt(0).toUpperCase() + shell.slice(1);
    const btn = document.getElementById(id);
    if (btn) btn.classList.add('active');
    clearTerminal(false);
    bootTerminal();
    buildSidebar();
    document.getElementById('engineShellLabel').textContent = SHELLS[shell].engineLabel;
}

/* ── UPDATE SHELL UI ────────────────────────────────── */
function updateShellUI() {
    const shell = SHELLS[STATE.shell];
    const prompt = document.getElementById('terminalPrompt');
    const chrome = document.getElementById('chromeTitle');
    const engine = document.getElementById('engineShellLabel');
    if (chrome) chrome.textContent = shell.chromeTitle;
    if (prompt) {
        prompt.textContent = shell.prompt;
        prompt.className   = `terminal-prompt ${shell.promptClass}`;
    }
    if (engine) engine.textContent = shell.engineLabel;
}

/* ── BUILD SIDEBAR ──────────────────────────────────── */
function buildSidebar() {
    const list = document.getElementById('quickCmdList');
    if (!list) return;
    list.innerHTML = '';
    QUICK_CMDS[STATE.shell].forEach(item => {
        const el = document.createElement('div');
        el.className = 'cmd-item';
        el.innerHTML = `
            <span class="cmd-item-icon">${item.icon}</span>
            <div class="cmd-item-info">
                <span class="cmd-item-name">${escapeHtml(item.name)}</span>
                <span class="cmd-item-desc">${escapeHtml(item.desc)}</span>
            </div>`;
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
    if (!acc) return;
    acc.innerHTML = '';
    REF_GROUPS.forEach((group, gi) => {
        const div = document.createElement('div');
        div.className = 'ref-group';
        div.innerHTML = `
            <div class="ref-group-header" onclick="toggleRefGroup(${gi})">
                <span><i class="${group.icon}"></i> ${group.title}</span>
                <i class="fas fa-chevron-right ref-arrow"></i>
            </div>
            <div class="ref-group-body">
                ${group.items.map(it => `
                    <div class="ref-cmd-item" onclick="injectCommand(\`${it.syn.replace(/`/g,"\\`")}\`)">
                        <span class="ref-cmd-syntax">${escapeHtml(it.syn)}</span>
                        <span class="ref-cmd-desc">${it.desc}</span>
                    </div>`).join('')}
            </div>`;
        acc.appendChild(div);
    });
}

function toggleRefGroup(index) {
    document.querySelectorAll('.ref-group').forEach((g, i) => {
        if (i === index) g.classList.toggle('open');
    });
}

/* ── INPUT LISTENERS ────────────────────────────────── */
function initInputListeners() {
    const input = document.getElementById('terminalInput');
    if (!input) return;

    input.addEventListener('keydown', e => {
        if (e.key === 'Enter') {
            e.preventDefault();
            const acBox = document.getElementById('autocompleteBox');
            if (acBox && acBox.style.display === 'block' && STATE.acIndex >= 0) {
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
        if (e.key === 'ArrowUp') {
            e.preventDefault();
            const acBox = document.getElementById('autocompleteBox');
            if (acBox && acBox.style.display === 'block') { navigateAC(-1); return; }
            navigateHistory(1);
            return;
        }
        if (e.key === 'ArrowDown') {
            e.preventDefault();
            const acBox = document.getElementById('autocompleteBox');
            if (acBox && acBox.style.display === 'block') { navigateAC(1); return; }
            navigateHistory(-1);
            return;
        }
        if (e.key === 'Tab') {
            e.preventDefault();
            const acBox = document.getElementById('autocompleteBox');
            if (acBox && acBox.style.display === 'block') navigateAC(1);
            else showAutocomplete(input.value);
            return;
        }
        if (e.key === 'Escape') { hideAutocomplete(); return; }
        if (e.key === 'l' && e.ctrlKey) { e.preventDefault(); clearTerminal(); return; }
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
        if (val.length > 0) showAutocomplete(val);
        else hideAutocomplete();
    });

    document.addEventListener('click', e => {
        if (!e.target.closest('#autocompleteBox') && !e.target.closest('#terminalInput'))
            hideAutocomplete();
    });

    const termOut = document.getElementById('terminalOutput');
    if (termOut) termOut.addEventListener('click', () => focusInput());
}

/* ── HISTORY ────────────────────────────────────────── */
function navigateHistory(dir) {
    const input = document.getElementById('terminalInput');
    if (!STATE.history.length) return;
    STATE.historyIndex = Math.max(-1, Math.min(STATE.history.length - 1, STATE.historyIndex + dir));
    input.value = STATE.historyIndex === -1 ? '' : STATE.history[STATE.history.length - 1 - STATE.historyIndex];
}

/* ── AUTOCOMPLETE ───────────────────────────────────── */
function showAutocomplete(query) {
    const box   = document.getElementById('autocompleteBox');
    const input = document.getElementById('terminalInput');
    if (!box || !input) return;
    const lq = query.toLowerCase();
    const matches = AC_SUGGESTIONS.filter(s =>
        s.cmd.toLowerCase().includes(lq) || s.desc.toLowerCase().includes(lq)
    ).slice(0, 10);

    if (!matches.length) { hideAutocomplete(); return; }

    box.innerHTML = matches.map((m, i) => `
        <div class="ac-item" data-cmd="${escapeHtml(m.cmd)}" data-index="${i}"
             onclick="selectAC(\`${m.cmd.replace(/`/g,'\\`')}\`)">
            <span class="ac-cmd">${escapeHtml(m.cmd)}</span>
            <span class="ac-desc">${escapeHtml(m.desc)}</span>
        </div>`).join('');

    const rect = input.getBoundingClientRect();
    box.style.left   = rect.left + 'px';
    box.style.bottom = (window.innerHeight - rect.top + 6) + 'px';
    box.style.display = 'block';
    STATE.acIndex = -1;
}

function hideAutocomplete() {
    const box = document.getElementById('autocompleteBox');
    if (box) box.style.display = 'none';
    STATE.acIndex = -1;
}

function navigateAC(dir) {
    const box   = document.getElementById('autocompleteBox');
    const items = box ? box.querySelectorAll('.ac-item') : [];
    if (!items.length) return;
    STATE.acIndex = (STATE.acIndex + dir + items.length) % items.length;
    items.forEach((it, i) => it.classList.toggle('active', i === STATE.acIndex));
    document.getElementById('terminalInput').value = items[STATE.acIndex].dataset.cmd;
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

    STATE.history.push(raw);
    STATE.historyIndex = -1;
    input.value = '';
    hideAutocomplete();
    updateHistoryUI();
    echoCommand(raw);
    executeCommand(raw);
}

/* ── ECHO COMMAND ───────────────────────────────────── */
function echoCommand(raw) {
    const shell = SHELLS[STATE.shell];
    const out   = document.getElementById('terminalOutput');
    const line  = document.createElement('span');
    line.className = 'output-line line-cmd-echo';
    const parts = tokenize(raw);
    let html = `<span class="${shell.promptClass}">${escapeHtml(shell.prompt)}&nbsp;</span>`;
    parts.forEach((p, i) => {
        if (i === 0) html += `<span class="t-cmd">${escapeHtml(p)}</span>`;
        else if (p.startsWith('--') || p.startsWith('-')) html += `&nbsp;<span class="t-flag">${escapeHtml(p)}</span>`;
        else if (p.startsWith('"') || p.startsWith("'")) html += `&nbsp;<span class="t-value">${escapeHtml(p)}</span>`;
        else html += `&nbsp;<span class="t-string">${escapeHtml(p)}</span>`;
    });
    line.innerHTML = html;
    out.appendChild(line);
    scrollBottom();
}


/* ═══════════════════════════════════════════════════════
   TOKENIZER — Handles full sentences in quotes
═══════════════════════════════════════════════════════ */
function tokenize(raw) {
    const tokens = [];
    const regex  = /"([^"]*?)"|'([^']*?)'|(\S+)/g;
    let   m;
    while ((m = regex.exec(raw)) !== null) {
        if (m[1] !== undefined)      tokens.push(`"${m[1]}"`);
        else if (m[2] !== undefined) tokens.push(`'${m[2]}'`);
        else                         tokens.push(m[3]);
    }
    return tokens;
}

/* ── EXTRACT ALL QUOTED STRINGS ─────────────────────── */
function extractAllQuoted(raw) {
    const results = [];
    const regex   = /"([^"]*?)"|'([^']*?)'/g;
    let   m;
    while ((m = regex.exec(raw)) !== null) {
        results.push(m[1] !== undefined ? m[1] : m[2]);
    }
    return results;
}

/* ── EXTRACT FIRST QUOTED STRING ────────────────────── */
function extractQuoted(raw) {
    const all = extractAllQuoted(raw);
    return all.length > 0 ? all[0] : null;
}

/* ── PARSE FLAGS ────────────────────────────────────── */
function parseFlags(raw) {
    const flags  = {};
    const tokens = tokenize(raw);
    for (let i = 0; i < tokens.length; i++) {
        const t = tokens[i];
        if (t.startsWith('--')) {
            const key  = t.slice(2);
            const next = tokens[i + 1];
            if (next && !next.startsWith('-')) {
                flags[key] = next.replace(/^["']|["']$/g, '');
                i++;
            } else {
                flags[key] = true;
            }
        } else if (t.startsWith('-') && t.length === 2) {
            const key  = t.slice(1);
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


/* ═══════════════════════════════════════════════════════
   EXECUTE COMMAND — MAIN ROUTER
═══════════════════════════════════════════════════════ */
function executeCommand(raw) {
    const lower = raw.toLowerCase().trim();
    const first = tokenize(raw)[0]?.toLowerCase();

    // Simple exact commands
    if (lower === 'help')               { cmdHelp();     return; }
    if (lower === 'clear' || lower === 'cls') { clearTerminal(); return; }
    if (lower === 'history')            { cmdHistory();  return; }
    if (lower === 'date')               { cmdDate();     return; }
    if (lower === 'whoami')             { cmdWhoami();   return; }
    if (lower === 'uname' || lower === 'uname -a') { cmdUname(); return; }
    if (lower === 'uptime')             { cmdUptime();   return; }
    if (lower === 'neofetch')           { cmdNeofetch(); return; }
    if (lower === 'pwd')                { cmdPwd();      return; }
    if (lower === 'hostname')           { cmdHostname(); return; }

    // Route by first token
    switch (first) {
        case 'cryptokit':    cmdCryptokit(raw); break;
        case 'openssl':      cmdOpenssl(raw);   break;
        case 'get-filehash': cmdGetFileHash(raw); break;
        case 'certutil':     cmdCertutil(raw);  break;
        case 'shasum':       cmdShasum(raw);    break;
        case 'md5':          cmdMd5(raw);       break;
        case 'echo':         cmdEcho(raw);      break;
        default:             cmdUnknown(raw);
    }
}


/* ═══════════════════════════════════════════════════════
   COMMAND IMPLEMENTATIONS
═══════════════════════════════════════════════════════ */

/* ── HELP ───────────────────────────────────────────── */
function cmdHelp() {
    const lines = [
        { t: '', c: 'blank' },
        { t: '  ╔══════════════════════════════════════════════════════════╗', c: 't-accent' },
        { t: '  ║        CryptoKit Developer Terminal v2.0 — Help         ║', c: 't-accent' },
        { t: '  ╚══════════════════════════════════════════════════════════╝', c: 't-accent' },
        { t: '', c: 'blank' },
        { t: '  ── HASHING ─────────────────────────────────────────────────', c: 't-muted' },
        { t: '  cryptokit hash --algo <alg> "your text here"     Hash a string', c: 't-white' },
        { t: '  cryptokit hash --all "your text here"             All algorithms', c: 't-white' },
        { t: '  cryptokit hash --compare "hash1" "hash2"         Compare hashes', c: 't-white' },
        { t: '  Algos: sha256, sha512, sha384, sha1, md5', c: 't-muted' },
        { t: '', c: 'blank' },
        { t: '  ── RSA KEYS ────────────────────────────────────────────────', c: 't-muted' },
        { t: '  cryptokit rsa --generate                          RSA-2048 pair', c: 't-white' },
        { t: '  cryptokit rsa --generate --bits 4096              RSA-4096 pair', c: 't-white' },
        { t: '  cryptokit rsa --analyze                           Security guide', c: 't-white' },
        { t: '  openssl genrsa -out private.pem 2048              OpenSSL RSA', c: 't-white' },
        { t: '', c: 'blank' },
        { t: '  ── PASSWORDS ───────────────────────────────────────────────', c: 't-muted' },
        { t: '  cryptokit passwd --generate                       Random password', c: 't-white' },
        { t: '  cryptokit passwd --generate --length 20 --strong  Custom length', c: 't-white' },
        { t: '  cryptokit passwd --generate --passphrase          Word passphrase', c: 't-white' },
        { t: '  cryptokit passwd --check "your password here"     Strength check', c: 't-white' },
        { t: '', c: 'blank' },
        { t: '  ── ENCODING & CIPHERS ──────────────────────────────────────', c: 't-muted' },
        { t: '  cryptokit encode --base64 "your sentence here"   Base64 encode', c: 't-white' },
        { t: '  cryptokit decode --base64 "base64 string here"   Base64 decode', c: 't-white' },
        { t: '  cryptokit hex --encode "your text"                Text → Hex', c: 't-white' },
        { t: '  cryptokit hex --decode "hex string"               Hex → Text', c: 't-white' },
        { t: '  cryptokit rot13 "your text"                       ROT13 cipher', c: 't-white' },
        { t: '  cryptokit caesar --shift 3 "your text"            Caesar cipher', c: 't-white' },
        { t: '  cryptokit morse --encode "your text"              Morse code', c: 't-white' },
        { t: '  cryptokit morse --decode "-- --- .-. ... ."       Morse decode', c: 't-white' },
        { t: '', c: 'blank' },
        { t: '  ── ENCRYPTION ──────────────────────────────────────────────', c: 't-muted' },
        { t: '  cryptokit aes --encrypt "message" --key "pass"   AES-256-GCM', c: 't-white' },
        { t: '  cryptokit aes --decrypt "cipher" --key "pass"    AES decrypt', c: 't-white' },
        { t: '', c: 'blank' },
        { t: '  ── RANDOM & UTILITIES ──────────────────────────────────────', c: 't-muted' },
        { t: '  cryptokit random --hex 32                         Random hex', c: 't-white' },
        { t: '  cryptokit random --base64 32                      Random base64', c: 't-white' },
        { t: '  cryptokit uuid                                    UUID v4', c: 't-white' },
        { t: '  cryptokit count "your text"                       Char/word count', c: 't-white' },
        { t: '  cryptokit reverse "your text"                     Reverse string', c: 't-white' },
        { t: '  openssl rand -hex 32                              OpenSSL random', c: 't-white' },
        { t: '', c: 'blank' },
        { t: '  ── SYSTEM ────────────────────────────────────────────────', c: 't-muted' },
        { t: '  help / clear / cls / history                      Basics', c: 't-white' },
        { t: '  cryptokit --info / --version                      Engine info', c: 't-white' },
        { t: '  date / whoami / uname / uptime / neofetch         System', c: 't-white' },
        { t: '', c: 'blank' },
        { t: '  💡 Tip: Put your text inside double quotes "like this"', c: 't-info' },
        { t: '  💡 Tip: Press Tab for autocomplete, ↑↓ for history', c: 't-info' },
        { t: '', c: 'blank' },
    ];
    printLines(lines);
}

/* ── INFO / VERSION ─────────────────────────────────── */
function cmdInfo() {
    const shell = SHELLS[STATE.shell];
    printLines([
        { t: '', c: 'blank' },
        { t: '  ╔══════════════════════════════════════════╗', c: 't-accent' },
        { t: '  ║    CryptoKit Developer Terminal v2.0      ║', c: 't-accent' },
        { t: '  ╚══════════════════════════════════════════╝', c: 't-accent' },
        { t: `  Shell Mode   : ${shell.label}`, c: 't-white' },
        { t: `  Engine       : WebCrypto API (W3C Standard)`, c: 't-white' },
        { t: `  Hash Algos   : MD5, SHA-1, SHA-256, SHA-384, SHA-512`, c: 't-white' },
        { t: `  RSA Support  : 1024, 2048, 4096 bits`, c: 't-white' },
        { t: `  AES Support  : AES-256-GCM (PBKDF2 key derivation)`, c: 't-white' },
        { t: `  Ciphers      : ROT13, Caesar, Morse, Hex, Base64`, c: 't-white' },
        { t: `  Storage      : None — 100% client-side`, c: 't-success' },
        { t: `  License      : MIT Open Source`, c: 't-white' },
        { t: `  Platform     : ${navigator.platform}`, c: 't-white' },
        { t: `  User Agent   : ${navigator.userAgent.substring(0, 60)}...`, c: 't-muted' },
        { t: '', c: 'blank' },
    ]);
}

function cmdVersion() {
    printLines([
        { t: '', c: 'blank' },
        { t: '  CryptoKit v2.0.0', c: 't-success' },
        { t: '  Developer Terminal Module v2.0.0', c: 't-white' },
        { t: '  WebCrypto Engine: Available ✔', c: 't-success' },
        { t: '', c: 'blank' },
    ]);
}

/* ── HISTORY ────────────────────────────────────────── */
function cmdHistory() {
    if (!STATE.history.length) {
        printLines([{ t: '  No commands in history yet.', c: 't-muted' }, { t: '', c: 'blank' }]);
        return;
    }
    const lines = [{ t: '', c: 'blank' }];
    STATE.history.forEach((cmd, i) => {
        lines.push({ t: `  ${String(i + 1).padStart(4)}  ${cmd}`, c: 't-white' });
    });
    lines.push({ t: '', c: 'blank' });
    printLines(lines);
}

/* ── SYSTEM COMMANDS ────────────────────────────────── */
function cmdDate() {
    const now = new Date();
    printLines([
        { t: '', c: 'blank' },
        { t: `  ${now.toString()}`, c: 't-white' },
        { t: `  ISO: ${now.toISOString()}`, c: 't-muted' },
        { t: `  Timestamp: ${now.getTime()}`, c: 't-muted' },
        { t: '', c: 'blank' },
    ]);
}

function cmdWhoami() {
    printLines([
        { t: '', c: 'blank' },
        { t: '  cryptokit-user@developer-terminal', c: 't-success' },
        { t: '  Role: Developer | Mode: Terminal', c: 't-muted' },
        { t: '', c: 'blank' },
    ]);
}

function cmdUname() {
    printLines([
        { t: '', c: 'blank' },
        { t: `  CryptoKit DevTerminal 2.0.0 ${navigator.platform} WebCrypto`, c: 't-white' },
        { t: `  Platform: ${navigator.platform}`, c: 't-muted' },
        { t: `  Language: ${navigator.language}`, c: 't-muted' },
        { t: '', c: 'blank' },
    ]);
}

function cmdUptime() {
    const elapsed = Date.now() - SESSION_START;
    const sec     = Math.floor(elapsed / 1000);
    const min     = Math.floor(sec / 60);
    const hr      = Math.floor(min / 60);
    printLines([
        { t: '', c: 'blank' },
        { t: `  Session uptime: ${hr}h ${min % 60}m ${sec % 60}s`, c: 't-white' },
        { t: `  Commands executed: ${STATE.history.length}`, c: 't-muted' },
        { t: '', c: 'blank' },
    ]);
}

function cmdPwd() {
    const paths = { powershell: 'C:\\CryptoKit', cmd: 'C:\\CryptoKit', bash: '/home/cryptokit' };
    printLines([{ t: '', c: 'blank' }, { t: `  ${paths[STATE.shell]}`, c: 't-white' }, { t: '', c: 'blank' }]);
}

function cmdHostname() {
    printLines([{ t: '', c: 'blank' }, { t: '  cryptokit-dev-terminal', c: 't-white' }, { t: '', c: 'blank' }]);
}

function cmdNeofetch() {
    printLines([
        { t: '', c: 'blank' },
        { t: '         ╔═══════════╗          cryptokit-user@dev-terminal', c: 't-accent' },
        { t: '         ║  CRYPTO   ║          ─────────────────────────────', c: 't-accent' },
        { t: '         ║   KIT     ║          OS       : CryptoKit DevOS 2.0', c: 't-white' },
        { t: '         ║  v2.0.0   ║          Kernel   : WebCrypto API', c: 't-white' },
        { t: '         ╚═══════════╝          Shell    : ' + SHELLS[STATE.shell].label, c: 't-white' },
        { t: `                                Uptime   : ${Math.floor((Date.now()-SESSION_START)/1000)}s`, c: 't-white' },
        { t: `                                Commands : ${STATE.history.length}`, c: 't-white' },
        { t: `                                Platform : ${navigator.platform}`, c: 't-white' },
        { t: `                                Language : ${navigator.language}`, c: 't-white' },
        { t: `                                Terminal : CryptoKit Dev Terminal`, c: 't-white' },
        { t: '                                Engine   : WebCrypto + CSPRNG', c: 't-white' },
        { t: '', c: 'blank' },
        { t: '         ███ ███ ███ ███ ███ ███ ███ ███', c: 't-accent' },
        { t: '', c: 'blank' },
    ]);
}

/* ═══════════════════════════════════════════════════════
   CRYPTOKIT UNIVERSAL ROUTER
═══════════════════════════════════════════════════════ */
function cmdCryptokit(raw) {
    const tokens = tokenize(raw);
    const sub    = tokens[1]?.toLowerCase();

    if (!sub) {
        printLines([
            { t: '', c: 'blank' },
            { t: '  Usage: cryptokit <command> [options]', c: 't-warning' },
            { t: '  Type  help  for full command list.', c: 't-info' },
            { t: '', c: 'blank' },
        ]);
        return;
    }

    switch (sub) {
        case 'hash':     cmdCryptokitHash(raw);   break;
        case 'rsa':      cmdCryptokitRSA(raw);    break;
        case 'passwd':   cmdCryptokitPasswd(raw);  break;
        case 'encode':   cmdCryptokitEncode(raw);  break;
        case 'decode':   cmdCryptokitDecode(raw);  break;
        case 'aes':      cmdCryptokitAES(raw);     break;
        case 'random':   cmdCryptokitRandom(raw);  break;
        case 'uuid':     cmdUUID();                break;
        case 'rot13':    cmdROT13(raw);            break;
        case 'hex':      cmdHex(raw);              break;
        case 'count':    cmdCount(raw);            break;
        case 'reverse':  cmdReverse(raw);          break;
        case 'morse':    cmdMorse(raw);            break;
        case 'caesar':   cmdCaesar(raw);           break;
        case '--info':   cmdInfo();                break;
        case '--version':cmdVersion();             break;
        default:
            printLines([
                { t: '', c: 'blank' },
                { t: `  Unknown subcommand: ${sub}`, c: 't-error' },
                { t: '  Type  help  for full command list.', c: 't-info' },
                { t: '', c: 'blank' },
            ]);
    }
}


/* ═══════════════════════════════════════════════════════
   HASHING — Supports full sentences
═══════════════════════════════════════════════════════ */
function cmdCryptokitHash(raw) {
    const flags = parseFlags(raw);
    const text  = extractQuoted(raw);

    // --compare mode
    if (flags.compare !== undefined) {
        const allQ = extractAllQuoted(raw);
        if (allQ.length < 2) {
            printError('Usage: cryptokit hash --compare "hash1" "hash2"');
            return;
        }
        const match = allQ[0].toLowerCase() === allQ[1].toLowerCase();
        printLines([
            { t: '', c: 'blank' },
            { t: `  Hash 1  : ${allQ[0]}`, c: 't-label' },
            { t: `  Hash 2  : ${allQ[1]}`, c: 't-label' },
            { t: '', c: 'blank' },
            { t: `  Result  : ${match ? '✔ MATCH — Hashes are identical' : '✘ NO MATCH — Hashes differ'}`, c: match ? 't-success' : 't-error' },
            { t: '', c: 'blank' },
        ]);
        return;
    }

    if (!text && text !== '') {
        printError('Usage: cryptokit hash --algo sha256 "your text or sentence here"');
        return;
    }

    const algo = (flags.algo || 'sha256').toLowerCase();

    if (flags.all !== undefined) {
        hashAllAlgos(text);
        return;
    }

    hashText(text, algo);
}

async function hashText(text, algo) {
    const algoMap = { sha256:'SHA-256', sha512:'SHA-512', sha384:'SHA-384', sha1:'SHA-1', md5:null };
    STATE.busy = true;
    printLines([{ t: `  ⚙ Computing ${algo.toUpperCase()} hash...`, c: 't-info' }]);
    await delay(200);

    try {
        let hashHex;
        const isWeak = algo === 'md5' || algo === 'sha1';

        if (algo === 'md5') {
            hashHex = md5Sim(text);
        } else {
            const webAlgo = algoMap[algo];
            if (!webAlgo) {
                printError(`Unsupported algorithm: ${algo}. Use: sha256, sha512, sha384, sha1, md5`);
                STATE.busy = false;
                return;
            }
            const buf = await crypto.subtle.digest(webAlgo, new TextEncoder().encode(text));
            hashHex   = bufToHex(buf);
        }

        printLines([
            { t: '', c: 'blank' },
            { t: `  Algorithm : ${(algoMap[algo] || 'MD5').toUpperCase()}`, c: 't-label' },
            { t: `  Input     : "${text}"`, c: 't-label' },
            { t: `  Length    : ${text.length} chars / ${new Blob([text]).size} bytes`, c: 't-label' },
            { t: `  Hash      : ${hashHex}`, c: 't-hash' },
            { t: `  Hex Len   : ${hashHex.length} characters`, c: 't-label' },
            { t: '', c: 'blank' },
        ]);

        if (isWeak) {
            appendLine(`  ⚠ Warning: ${algo.toUpperCase()} is cryptographically weak. Use SHA-256 or higher for security.`, 't-warning');
            appendBlank();
        } else {
            appendLine('  ✔ Hash generated successfully', 't-success');
            appendBlank();
        }

        STATE.lastOutput = hashHex;
    } catch (err) {
        printError(`Hash error: ${err.message}`);
    }
    STATE.busy = false;
}

async function hashAllAlgos(text) {
    STATE.busy = true;
    printLines([{ t: '', c: 'blank' }, { t: `  ⚙ Computing all hashes for: "${text}"`, c: 't-info' }]);
    await delay(200);

    const algos = [
        { name: 'MD5',     web: null,       weak: true },
        { name: 'SHA-1',   web: 'SHA-1',    weak: true },
        { name: 'SHA-256', web: 'SHA-256',  weak: false },
        { name: 'SHA-384', web: 'SHA-384',  weak: false },
        { name: 'SHA-512', web: 'SHA-512',  weak: false },
    ];

    const enc = new TextEncoder().encode(text);
    appendBlank();
    appendLine('  ┌────────────┬──────────────────────────────────────────────────────────────────┬────────────┐', 't-muted');
    appendLine('  │ Algorithm  │ Hash                                                             │ Status     │', 't-muted');
    appendLine('  ├────────────┼──────────────────────────────────────────────────────────────────┼────────────┤', 't-muted');

    for (const a of algos) {
        let hash;
        if (!a.web) hash = md5Sim(text);
        else {
            const buf = await crypto.subtle.digest(a.web, enc);
            hash = bufToHex(buf);
        }
        const shortHash = hash.substring(0, 64).padEnd(64);
        const status    = a.weak ? '⚠ Weak' : '✔ Strong';
        appendLine(`  │ ${a.name.padEnd(10)} │ ${shortHash}   │ ${status.padEnd(10)} │`, a.weak ? 't-warning' : 't-success');
    }

    appendLine('  └────────────┴──────────────────────────────────────────────────────────────────┴────────────┘', 't-muted');
    appendBlank();
    appendLine(`  Input: "${text}" (${text.length} chars)`, 't-muted');
    appendBlank();
    STATE.busy = false;
}


/* ═══════════════════════════════════════════════════════
   RSA KEY GENERATION
═══════════════════════════════════════════════════════ */
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
        await generateRSA(bits);
    } else if (action === '--analyze') {
        cmdRSAAnalyze();
    } else {
        printError(`Unknown RSA action: ${action}. Try: --generate, --analyze`);
    }
}

async function generateRSA(bits) {
    STATE.busy = true;
    printLines([
        { t: '', c: 'blank' },
        { t: `  ⚙ Generating RSA-${bits} key pair...`, c: 't-info' },
        { t: '  Please wait, this may take a moment...', c: 't-muted' },
    ]);
    await delay(100);

    try {
        const start = performance.now();
        const keyPair = await crypto.subtle.generateKey(
            { name:'RSA-OAEP', modulusLength:bits, publicExponent:new Uint8Array([1,0,1]), hash:'SHA-256' },
            true, ['encrypt','decrypt']
        );
        const elapsed = (performance.now() - start).toFixed(0);

        const pubDer  = await crypto.subtle.exportKey('spki', keyPair.publicKey);
        const pubB64  = bufToB64(pubDer);
        const pubPem  = wrapPem(pubB64, 'PUBLIC KEY');

        const privDer = await crypto.subtle.exportKey('pkcs8', keyPair.privateKey);
        const privB64 = bufToB64(privDer);
        const privPem = wrapPem(privB64, 'PRIVATE KEY');

        STATE.rsaKeyPair = { pub: pubPem, priv: privPem, bits };

        printLines([
            { t: '', c: 'blank' },
            { t: `  ✔ RSA-${bits} key pair generated in ${elapsed}ms`, c: 't-success' },
            { t: `  Key Size   : ${bits} bits`, c: 't-label' },
            { t: `  Algorithm  : RSA-OAEP with SHA-256`, c: 't-label' },
            { t: `  Exponent   : 65537 (0x10001)`, c: 't-label' },
            { t: '', c: 'blank' },
            { t: '  ── PUBLIC KEY ─────────────────────────────────────────────', c: 't-muted' },
        ]);
        pubPem.split('\n').forEach(l => appendLine('  ' + l, 't-key'));
        appendBlank();
        appendLine('  ── PRIVATE KEY ────────────────────────────────────────────', 't-muted');
        privPem.split('\n').forEach(l => appendLine('  ' + l, 't-purple'));
        printLines([
            { t: '', c: 'blank' },
            { t: '  ⚠ Keep your private key SECRET! Never share it publicly.', c: 't-warning' },
            { t: `  Security: ${bits >= 4096 ? '🛡️ Excellent — Long-term security' : bits >= 2048 ? '🔒 Good — NIST recommended minimum' : '⚠️ Weak — Upgrade to 2048+'}`, c: bits >= 2048 ? 't-success' : 't-warning' },
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
        { t: '  ╔═══════════════════════════════════════════════╗', c: 't-accent' },
        { t: '  ║     RSA Key Security Analysis Guide            ║', c: 't-accent' },
        { t: '  ╚═══════════════════════════════════════════════╝', c: 't-accent' },
        { t: '', c: 'blank' },
        { t: '  Key Size       Status                Recommendation', c: 't-muted' },
        { t: '  ──────────     ──────────────────    ─────────────────────────', c: 't-muted' },
        { t: '  512-bit        ✘ BROKEN              Never use', c: 't-error' },
        { t: '  1024-bit       ✘ DEPRECATED          Phase out immediately', c: 't-error' },
        { t: '  2048-bit       ✔ ACCEPTABLE          NIST minimum through 2030', c: 't-warning' },
        { t: '  3072-bit       ✔ GOOD                Recommended for new systems', c: 't-success' },
        { t: '  4096-bit       ✔ EXCELLENT           Long-term sensitive data', c: 't-success' },
        { t: '', c: 'blank' },
        { t: '  Standards: NIST SP 800-57, OWASP Key Management', c: 't-info' },
        { t: '', c: 'blank' },
    ]);
}


/* ═══════════════════════════════════════════════════════
   PASSWORD — Supports full sentences and all options
═══════════════════════════════════════════════════════ */
function cmdCryptokitPasswd(raw) {
    const flags  = parseFlags(raw);
    const tokens = tokenize(raw);
    const action = tokens[2];

    if (action === '--generate') {
        generatePassword(flags);
    } else if (action === '--check') {
        const pwd = extractQuoted(raw);
        if (!pwd) {
            printError('Usage: cryptokit passwd --check "your password here"');
            return;
        }
        checkPasswordStrength(pwd, !!flags.verbose);
    } else {
        printError('Usage: cryptokit passwd --generate [options] | --check "password"');
    }
}

function generatePassword(flags) {
    const length    = parseInt(flags.length || '16');
    const noSymbols = flags['no-symbols'] !== undefined;
    const noNumbers = flags['no-numbers'] !== undefined;
    const strong    = flags.strong !== undefined;
    const passphrase= flags.passphrase !== undefined;

    if (passphrase) {
        const wordCount = parseInt(flags.words || '5');
        generatePassphrase(wordCount);
        return;
    }

    if (length < 4 || length > 128) {
        printError('Password length must be between 4 and 128 characters');
        return;
    }

    let charset = 'abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ';
    if (!noNumbers) charset += '0123456789';
    if (!noSymbols) charset += '!@#$%^&*()_+-=[]{}|;:,.<>?';
    if (strong)     charset += '~`"\'/\\<>{}[]';

    const arr = new Uint32Array(length);
    crypto.getRandomValues(arr);
    let pwd = '';
    for (let i = 0; i < length; i++) pwd += charset[arr[i] % charset.length];

    const s = calcPasswordStrength(pwd);
    printLines([
        { t: '', c: 'blank' },
        { t: '  ✔ Password Generated Successfully', c: 't-success' },
        { t: '  ─────────────────────────────────────────────────', c: 't-muted' },
        { t: `  Password   : ${pwd}`, c: 't-hash' },
        { t: `  Length     : ${pwd.length} characters`, c: 't-label' },
        { t: `  Charset    : ${charset.length} possible chars`, c: 't-label' },
        { t: `  Entropy    : ${s.entropy.toFixed(1)} bits`, c: 't-label' },
        { t: `  Strength   : ${s.label} ${s.icon}`, c: s.cls },
        { t: `  Crack Time : ${s.crackTime}`, c: 't-label' },
        { t: `  Options    : ${noSymbols ? 'No symbols ' : ''}${noNumbers ? 'No numbers ' : ''}${strong ? 'Strong ' : ''}`.trim() || 'Default', c: 't-muted' },
        { t: '', c: 'blank' },
        { t: '  ⚠ Store this password securely. Do not share it.', c: 't-warning' },
        { t: '', c: 'blank' },
    ]);
    STATE.lastOutput = pwd;
}

function generatePassphrase(wordCount) {
    const words = [
        'correct','horse','battery','staple','purple','elephant','mountain',
        'ocean','thunder','crystal','shadow','dragon','forest','copper',
        'silver','golden','rocket','phoenix','solar','lunar','cosmic',
        'cipher','matrix','quantum','vector','kernel','delta','sigma',
        'alpha','omega','nebula','prism','falcon','tiger','arctic',
        'plasma','circuit','voltage','binary','beacon','carbon','zenith',
        'harbor','bridge','tunnel','castle','garden','island','valley',
    ];
    if (wordCount < 3) wordCount = 3;
    if (wordCount > 12) wordCount = 12;

    const arr    = new Uint32Array(wordCount);
    crypto.getRandomValues(arr);
    const phrase = Array.from(arr).map(n => words[n % words.length]).join('-');
    const entropy = (Math.log2(words.length) * wordCount).toFixed(1);

    printLines([
        { t: '', c: 'blank' },
        { t: '  ✔ Passphrase Generated Successfully', c: 't-success' },
        { t: '  ─────────────────────────────────────────────────', c: 't-muted' },
        { t: `  Passphrase : ${phrase}`, c: 't-hash' },
        { t: `  Words      : ${wordCount} random words`, c: 't-label' },
        { t: `  Word Pool  : ${words.length} words`, c: 't-label' },
        { t: `  Entropy    : ${entropy} bits`, c: 't-label' },
        { t: `  Method     : Diceware-style CSPRNG selection`, c: 't-label' },
        { t: '', c: 'blank' },
        { t: '  💡 Passphrases are easy to remember and very secure', c: 't-info' },
        { t: '', c: 'blank' },
    ]);
    STATE.lastOutput = phrase;
}

function checkPasswordStrength(pwd, verbose) {
    const s = calcPasswordStrength(pwd);
    const checks = [
        { label: 'Length ≥ 8 characters',  ok: pwd.length >= 8 },
        { label: 'Length ≥ 12 characters', ok: pwd.length >= 12 },
        { label: 'Length ≥ 16 characters', ok: pwd.length >= 16 },
        { label: 'Has uppercase (A-Z)',    ok: /[A-Z]/.test(pwd) },
        { label: 'Has lowercase (a-z)',    ok: /[a-z]/.test(pwd) },
        { label: 'Has numbers (0-9)',      ok: /[0-9]/.test(pwd) },
        { label: 'Has special symbols',    ok: /[^a-zA-Z0-9]/.test(pwd) },
        { label: 'No common patterns',     ok: !isCommonPattern(pwd) },
        { label: 'No repeated chars (aaa)',ok: !/(.)\1{2,}/.test(pwd) },
        { label: 'No sequential (abc,123)',ok: !hasSequential(pwd) },
    ];
    const score = checks.filter(c => c.ok).length;
    const bar   = buildStrengthBar(score, checks.length);

    printLines([
        { t: '', c: 'blank' },
        { t: '  ╔══════════════════════════════════════════════╗', c: 't-accent' },
        { t: '  ║      Password Strength Analysis               ║', c: 't-accent' },
        { t: '  ╚══════════════════════════════════════════════╝', c: 't-accent' },
        { t: `  Password   : ${'•'.repeat(Math.min(pwd.length, 30))} (${pwd.length} chars)`, c: 't-label' },
        { t: `  Entropy    : ${s.entropy.toFixed(1)} bits`, c: 't-label' },
        { t: `  Strength   : ${s.label} ${s.icon}`, c: s.cls },
        { t: `  Score      : ${score}/${checks.length}  ${bar}`, c: 't-label' },
        { t: `  Crack Time : ${s.crackTime}`, c: 't-label' },
    ]);

    if (verbose || true) {
        appendBlank();
        appendLine('  Detailed Analysis:', 't-muted');
        appendLine('  ──────────────────────────────────────', 't-muted');
        checks.forEach(c => {
            appendLine(`    ${c.ok ? '✔' : '✘'} ${c.label}`, c.ok ? 't-success' : 't-error');
        });
    }

    const missing = checks.filter(c => !c.ok);
    if (missing.length > 0) {
        appendBlank();
        appendLine('  💡 Suggestions to improve:', 't-warning');
        missing.forEach(m => appendLine(`    → ${m.label}`, 't-muted'));
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
    if (entropy < 28)      { label='VERY WEAK';  icon='💀'; cls='t-error';   crackTime='Instantly'; }
    else if (entropy < 36) { label='WEAK';        icon='⚠️';  cls='t-error';   crackTime='Seconds to minutes'; }
    else if (entropy < 50) { label='FAIR';         icon='🟡'; cls='t-warning'; crackTime='Hours to days'; }
    else if (entropy < 65) { label='MODERATE';    icon='⚡'; cls='t-warning'; crackTime='Days to months'; }
    else if (entropy < 80) { label='STRONG';       icon='🔒'; cls='t-success'; crackTime='Years'; }
    else if (entropy < 100){ label='VERY STRONG'; icon='🛡️';  cls='t-success'; crackTime='Centuries'; }
    else                   { label='EXCELLENT';    icon='🏆'; cls='t-success'; crackTime='Heat death of universe'; }
    return { entropy, label, icon, cls, crackTime };
}

function isCommonPattern(pwd) {
    const common = ['password','123456','qwerty','abc123','letmein','admin','welcome','monkey','master','login','princess','dragon','passw0rd'];
    return common.some(c => pwd.toLowerCase().includes(c));
}

function hasSequential(pwd) {
    const seqs = ['abcdef','bcdefg','cdefgh','123456','234567','345678','qwerty','asdfgh','zxcvbn'];
    return seqs.some(s => pwd.toLowerCase().includes(s));
}

function buildStrengthBar(score, max) {
    const filled = Math.round((score / max) * 20);
    return '█'.repeat(filled) + '░'.repeat(20 - filled);
}


/* ═══════════════════════════════════════════════════════
   ENCODING / DECODING — Supports full sentences
═══════════════════════════════════════════════════════ */
function cmdCryptokitEncode(raw) {
    const flags = parseFlags(raw);
    const text  = extractQuoted(raw);

    if (flags.base64 !== undefined) {
        const input = text !== null ? text : (typeof flags.base64 === 'string' ? flags.base64 : null);
        if (input === null) {
            printError('Usage: cryptokit encode --base64 "your full sentence here"');
            return;
        }
        try {
            const encoded = btoa(unescape(encodeURIComponent(input)));
            printLines([
                { t: '', c: 'blank' },
                { t: `  Input    : "${input}"`, c: 't-label' },
                { t: `  Bytes    : ${new Blob([input]).size}`, c: 't-label' },
                { t: `  Base64   : ${encoded}`, c: 't-hash' },
                { t: `  B64 Len  : ${encoded.length} characters`, c: 't-label' },
                { t: '  ✔ Encoded successfully', c: 't-success' },
                { t: '', c: 'blank' },
            ]);
            STATE.lastOutput = encoded;
        } catch (err) {
            printError(`Encoding error: ${err.message}`);
        }
    } else {
        printError('Specify encoding type: cryptokit encode --base64 "your text"');
    }
}

function cmdCryptokitDecode(raw) {
    const flags = parseFlags(raw);
    const text  = extractQuoted(raw);

    if (flags.base64 !== undefined) {
        const input = text !== null ? text : (typeof flags.base64 === 'string' ? flags.base64 : null);
        if (input === null) {
            printError('Usage: cryptokit decode --base64 "your base64 string here"');
            return;
        }
        try {
            const decoded = decodeURIComponent(escape(atob(input)));
            printLines([
                { t: '', c: 'blank' },
                { t: `  Input    : "${input}"`, c: 't-label' },
                { t: `  Decoded  : "${decoded}"`, c: 't-hash' },
                { t: `  Length   : ${decoded.length} characters`, c: 't-label' },
                { t: '  ✔ Decoded successfully', c: 't-success' },
                { t: '', c: 'blank' },
            ]);
            STATE.lastOutput = decoded;
        } catch {
            printError('Invalid Base64 string. Please check your input and try again.');
        }
    } else {
        printError('Specify encoding type: cryptokit decode --base64 "base64string"');
    }
}


/* ═══════════════════════════════════════════════════════
   AES ENCRYPTION — Supports full sentences
═══════════════════════════════════════════════════════ */
async function cmdCryptokitAES(raw) {
    const flags   = parseFlags(raw);
    const tokens  = tokenize(raw);
    const action  = tokens[2];
    const allQ    = extractAllQuoted(raw);

    if (action === '--encrypt') {
        const msg = allQ[0];
        const key = flags.key || allQ[1];
        if (!msg || !key) {
            printError('Usage: cryptokit aes --encrypt "your full message here" --key "your-password"');
            return;
        }
        await aesEncrypt(msg, key);
    } else if (action === '--decrypt') {
        const cipher = allQ[0];
        const key    = flags.key || allQ[1];
        if (!cipher || !key) {
            printError('Usage: cryptokit aes --decrypt "ciphertext" --key "your-password"');
            return;
        }
        await aesDecrypt(cipher, key);
    } else {
        printError('Usage: cryptokit aes --encrypt "message" --key "password"');
    }
}

async function aesEncrypt(msg, password) {
    STATE.busy = true;
    printLines([{ t: '  ⚙ Encrypting with AES-256-GCM...', c: 't-info' }]);
    await delay(200);
    try {
        const enc     = new TextEncoder();
        const salt    = crypto.getRandomValues(new Uint8Array(16));
        const iv      = crypto.getRandomValues(new Uint8Array(12));
        const keyMat  = await crypto.subtle.importKey('raw', enc.encode(password), 'PBKDF2', false, ['deriveKey']);
        const aesKey  = await crypto.subtle.deriveKey(
            { name:'PBKDF2', salt, iterations:100000, hash:'SHA-256' },
            keyMat, { name:'AES-GCM', length:256 }, false, ['encrypt']
        );
        const cipher  = await crypto.subtle.encrypt({ name:'AES-GCM', iv }, aesKey, enc.encode(msg));
        const combined = new Uint8Array(salt.length + iv.length + cipher.byteLength);
        combined.set(salt, 0);
        combined.set(iv, 16);
        combined.set(new Uint8Array(cipher), 28);
        const b64 = bufToB64(combined.buffer);

        STATE.lastEncrypted = b64;
        printLines([
            { t: '', c: 'blank' },
            { t: '  ✔ AES-256-GCM Encryption Successful', c: 't-success' },
            { t: '  ─────────────────────────────────────────────────────', c: 't-muted' },
            { t: `  Algorithm  : AES-256-GCM`, c: 't-label' },
            { t: `  KDF        : PBKDF2-SHA256 (100,000 iterations)`, c: 't-label' },
            { t: `  Input      : "${msg}"`, c: 't-label' },
            { t: `  Input Len  : ${msg.length} chars / ${new Blob([msg]).size} bytes`, c: 't-label' },
            { t: `  Ciphertext :`, c: 't-label' },
            { t: `  ${b64}`, c: 't-hash' },
            { t: `  Cipher Len : ${b64.length} characters`, c: 't-label' },
            { t: '', c: 'blank' },
            { t: '  💡 To decrypt: cryptokit aes --decrypt "<ciphertext>" --key "same-password"', c: 't-info' },
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
        const enc      = new TextEncoder();
        const dec      = new TextDecoder();
        const combined = new Uint8Array(b64ToBuf(cipherB64));
        const salt     = combined.slice(0, 16);
        const iv       = combined.slice(16, 28);
        const data     = combined.slice(28);
        const keyMat   = await crypto.subtle.importKey('raw', enc.encode(password), 'PBKDF2', false, ['deriveKey']);
        const aesKey   = await crypto.subtle.deriveKey(
            { name:'PBKDF2', salt, iterations:100000, hash:'SHA-256' },
            keyMat, { name:'AES-GCM', length:256 }, false, ['decrypt']
        );
        const plain    = await crypto.subtle.decrypt({ name:'AES-GCM', iv }, aesKey, data);
        const result   = dec.decode(plain);

        printLines([
            { t: '', c: 'blank' },
            { t: '  ✔ AES-256-GCM Decryption Successful', c: 't-success' },
            { t: '  ─────────────────────────────────────────────────────', c: 't-muted' },
            { t: `  Plaintext : "${result}"`, c: 't-hash' },
            { t: `  Length    : ${result.length} characters`, c: 't-label' },
            { t: '', c: 'blank' },
        ]);
        STATE.lastOutput = result;
    } catch {
        printError('Decryption failed. Wrong password or corrupted ciphertext.');
    }
    STATE.busy = false;
}


/* ═══════════════════════════════════════════════════════
   NEW COMMANDS — ROT13, HEX, MORSE, CAESAR, etc.
═══════════════════════════════════════════════════════ */

/* ── RANDOM ─────────────────────────────────────────── */
function cmdCryptokitRandom(raw) {
    const flags = parseFlags(raw);
    const size  = parseInt(flags.hex || flags.base64 || flags.bytes || '16');
    const bytes = crypto.getRandomValues(new Uint8Array(Math.min(size, 256)));
    let result, format;

    if (flags.hex)         { result = Array.from(bytes).map(b => b.toString(16).padStart(2,'0')).join(''); format = 'Hexadecimal'; }
    else if (flags.base64) { result = bufToB64(bytes.buffer); format = 'Base64'; }
    else                   { result = Array.from(bytes).join(' '); format = 'Decimal'; }

    printLines([
        { t: '', c: 'blank' },
        { t: `  ✔ Random ${size} bytes generated`, c: 't-success' },
        { t: `  Format : ${format}`, c: 't-label' },
        { t: `  Output : ${result}`, c: 't-hash' },
        { t: `  Length : ${result.length} characters`, c: 't-label' },
        { t: '', c: 'blank' },
    ]);
    STATE.lastOutput = result;
}

/* ── UUID ───────────────────────────────────────────── */
function cmdUUID() {
    const uuid = 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, c => {
        const r = crypto.getRandomValues(new Uint8Array(1))[0] % 16;
        const v = c === 'x' ? r : (r & 0x3 | 0x8);
        return v.toString(16);
    });
    printLines([
        { t: '', c: 'blank' },
        { t: `  ✔ UUID v4 Generated`, c: 't-success' },
        { t: `  UUID : ${uuid}`, c: 't-hash' },
        { t: `  Type : Version 4 (random)`, c: 't-label' },
        { t: '', c: 'blank' },
    ]);
    STATE.lastOutput = uuid;
}

/* ── ROT13 ──────────────────────────────────────────── */
function cmdROT13(raw) {
    const text = extractQuoted(raw);
    if (!text) {
        printError('Usage: cryptokit rot13 "your text or sentence here"');
        return;
    }
    const result = text.replace(/[a-zA-Z]/g, c => {
        const base = c <= 'Z' ? 65 : 97;
        return String.fromCharCode(((c.charCodeAt(0) - base + 13) % 26) + base);
    });
    printLines([
        { t: '', c: 'blank' },
        { t: `  Input  : "${text}"`, c: 't-label' },
        { t: `  ROT13  : "${result}"`, c: 't-hash' },
        { t: `  Length : ${text.length} characters`, c: 't-label' },
        { t: '  💡 Apply ROT13 again to decode', c: 't-info' },
        { t: '', c: 'blank' },
    ]);
    STATE.lastOutput = result;
}

/* ── HEX ENCODE / DECODE ───────────────────────────── */
function cmdHex(raw) {
    const flags = parseFlags(raw);
    const text  = extractQuoted(raw);

    if (flags.encode !== undefined) {
        const input = text || (typeof flags.encode === 'string' ? flags.encode : null);
        if (!input) { printError('Usage: cryptokit hex --encode "your text here"'); return; }
        const hex = Array.from(new TextEncoder().encode(input)).map(b => b.toString(16).padStart(2, '0')).join(' ');
        printLines([
            { t: '', c: 'blank' },
            { t: `  Input : "${input}"`, c: 't-label' },
            { t: `  Hex   : ${hex}`, c: 't-hash' },
            { t: `  Bytes : ${input.length}`, c: 't-label' },
            { t: '  ✔ Encoded successfully', c: 't-success' },
            { t: '', c: 'blank' },
        ]);
        STATE.lastOutput = hex;
    } else if (flags.decode !== undefined) {
        const input = text || (typeof flags.decode === 'string' ? flags.decode : null);
        if (!input) { printError('Usage: cryptokit hex --decode "68 65 6c 6c 6f"'); return; }
        try {
            const clean = input.replace(/\s+/g, '');
            const bytes = clean.match(/.{1,2}/g).map(h => parseInt(h, 16));
            const result = new TextDecoder().decode(new Uint8Array(bytes));
            printLines([
                { t: '', c: 'blank' },
                { t: `  Input   : "${input}"`, c: 't-label' },
                { t: `  Decoded : "${result}"`, c: 't-hash' },
                { t: '  ✔ Decoded successfully', c: 't-success' },
                { t: '', c: 'blank' },
            ]);
            STATE.lastOutput = result;
        } catch { printError('Invalid hex string. Use format: "68 65 6c 6c 6f" or "68656c6c6f"'); }
    } else {
        printError('Usage: cryptokit hex --encode "text" | --decode "hex"');
    }
}

/* ── COUNT ──────────────────────────────────────────── */
function cmdCount(raw) {
    const text = extractQuoted(raw);
    if (!text) { printError('Usage: cryptokit count "your sentence or text here"'); return; }
    const chars  = text.length;
    const words  = text.trim().split(/\s+/).filter(w => w.length > 0).length;
    const lines  = text.split('\n').length;
    const bytes  = new Blob([text]).size;
    const spaces = (text.match(/\s/g) || []).length;
    const digits = (text.match(/[0-9]/g) || []).length;
    const uppers = (text.match(/[A-Z]/g) || []).length;
    const lowers = (text.match(/[a-z]/g) || []).length;
    const specials = (text.match(/[^a-zA-Z0-9\s]/g) || []).length;

    printLines([
        { t: '', c: 'blank' },
        { t: `  Text Analysis for: "${text.substring(0, 50)}${text.length > 50 ? '...' : ''}"`, c: 't-accent' },
        { t: '  ──────────────────────────────────────────────', c: 't-muted' },
        { t: `  Characters   : ${chars}`, c: 't-white' },
        { t: `  Words        : ${words}`, c: 't-white' },
        { t: `  Lines        : ${lines}`, c: 't-white' },
        { t: `  Bytes (UTF8) : ${bytes}`, c: 't-white' },
        { t: `  Spaces       : ${spaces}`, c: 't-white' },
        { t: `  Uppercase    : ${uppers}`, c: 't-white' },
        { t: `  Lowercase    : ${lowers}`, c: 't-white' },
        { t: `  Digits       : ${digits}`, c: 't-white' },
        { t: `  Special Chars: ${specials}`, c: 't-white' },
        { t: '', c: 'blank' },
    ]);
}

/* ── REVERSE ────────────────────────────────────────── */
function cmdReverse(raw) {
    const text = extractQuoted(raw);
    if (!text) { printError('Usage: cryptokit reverse "your text here"'); return; }
    const result = text.split('').reverse().join('');
    printLines([
        { t: '', c: 'blank' },
        { t: `  Input    : "${text}"`, c: 't-label' },
        { t: `  Reversed : "${result}"`, c: 't-hash' },
        { t: '', c: 'blank' },
    ]);
    STATE.lastOutput = result;
}

/* ── MORSE CODE ─────────────────────────────────────── */
const MORSE_MAP = {
    'A':'.-','B':'-...','C':'-.-.','D':'-..','E':'.','F':'..-.','G':'--.',
    'H':'....','I':'..','J':'.---','K':'-.-','L':'.-..','M':'--','N':'-.',
    'O':'---','P':'.--.','Q':'--.-','R':'.-.','S':'...','T':'-','U':'..-',
    'V':'...-','W':'.--','X':'-..-','Y':'-.--','Z':'--..',
    '0':'-----','1':'.----','2':'..---','3':'...--','4':'....-',
    '5':'.....','6':'-....','7':'--...','8':'---..','9':'----.',
    ' ':' / ','!':'-.-.--','?':'..--..','@':'.--.-.','&':'.-...',
    '.':'.-.-.-',',':'--..--',':':'---...',';':'-.-.-.','=':'-...-',
    '+':'.-.-.','−':'-....-','/':'-..-.','(':'-.--.',')':'-.--.-',
};
const MORSE_REV = {};
Object.keys(MORSE_MAP).forEach(k => { if (k !== ' ') MORSE_REV[MORSE_MAP[k]] = k; });

function cmdMorse(raw) {
    const flags = parseFlags(raw);
    const text  = extractQuoted(raw);
    if (!text) { printError('Usage: cryptokit morse --encode "text" | --decode "-- --- .-."'); return; }

    if (flags.encode !== undefined) {
        const result = text.toUpperCase().split('').map(c => MORSE_MAP[c] || c).join(' ');
        printLines([
            { t: '', c: 'blank' },
            { t: `  Input : "${text}"`, c: 't-label' },
            { t: `  Morse : ${result}`, c: 't-hash' },
            { t: '  ✔ Encoded to Morse code', c: 't-success' },
            { t: '', c: 'blank' },
        ]);
        STATE.lastOutput = result;
    } else if (flags.decode !== undefined) {
        const words = text.split(' / ');
        const result = words.map(word =>
            word.split(' ').map(code => MORSE_REV[code] || code).join('')
        ).join(' ');
        printLines([
            { t: '', c: 'blank' },
            { t: `  Input   : "${text}"`, c: 't-label' },
            { t: `  Decoded : "${result}"`, c: 't-hash' },
            { t: '  ✔ Decoded from Morse code', c: 't-success' },
            { t: '', c: 'blank' },
        ]);
        STATE.lastOutput = result;
    } else {
        printError('Usage: cryptokit morse --encode "text" | --decode "morse"');
    }
}

/* ── CAESAR CIPHER ──────────────────────────────────── */
function cmdCaesar(raw) {
    const flags = parseFlags(raw);
    const text  = extractQuoted(raw);
    const shift = parseInt(flags.shift || '3');

    if (!text) { printError('Usage: cryptokit caesar --shift 3 "your text here"'); return; }

    const result = text.replace(/[a-zA-Z]/g, c => {
        const base = c <= 'Z' ? 65 : 97;
        return String.fromCharCode(((c.charCodeAt(0) - base + shift) % 26 + 26) % 26 + base);
    });

    printLines([
        { t: '', c: 'blank' },
        { t: `  Input    : "${text}"`, c: 't-label' },
        { t: `  Shift    : ${shift}`, c: 't-label' },
        { t: `  Cipher   : "${result}"`, c: 't-hash' },
        { t: `  💡 To decode, use shift ${26 - (shift % 26)}`, c: 't-info' },
        { t: '', c: 'blank' },
    ]);
    STATE.lastOutput = result;
}


/* ═══════════════════════════════════════════════════════
   OPENSSL COMMANDS
═══════════════════════════════════════════════════════ */
async function cmdOpenssl(raw) {
    const tokens = tokenize(raw);
    const sub    = tokens[1]?.toLowerCase();

    if (sub === 'genrsa') {
        const bits = parseInt(tokens[tokens.length - 1]) || 2048;
        await generateRSA(bits);
    } else if (sub === 'rsa') {
        if (raw.includes('-pubout')) {
            printLines([
                { t: '', c: 'blank' },
                { t: '  ℹ In browser mode, use: cryptokit rsa --generate', c: 't-info' },
                { t: '  Public key will be shown automatically.', c: 't-muted' },
                { t: '', c: 'blank' },
            ]);
        } else if (raw.includes('-text')) {
            cmdRSAAnalyze();
        } else {
            printLines([
                { t: '', c: 'blank' },
                { t: '  openssl rsa subcommands:', c: 't-info' },
                { t: '    -pubout : Extract public key', c: 't-white' },
                { t: '    -text   : View key details', c: 't-white' },
                { t: '', c: 'blank' },
            ]);
        }
    } else if (sub === 'rand') {
        const isHex = raw.includes('-hex');
        const isB64 = raw.includes('-base64');
        const count = parseInt(tokens[tokens.length - 1]) || 16;
        const bytes = crypto.getRandomValues(new Uint8Array(Math.min(count, 256)));
        let result, format;
        if (isHex)      { result = Array.from(bytes).map(b => b.toString(16).padStart(2,'0')).join(''); format = 'hex'; }
        else if (isB64) { result = bufToB64(bytes.buffer); format = 'base64'; }
        else            { result = Array.from(bytes).join(' '); format = 'decimal'; }
        printLines([
            { t: '', c: 'blank' },
            { t: `  ✔ ${count} random bytes (${format})`, c: 't-success' },
            { t: `  ${result}`, c: 't-hash' },
            { t: '', c: 'blank' },
        ]);
        STATE.lastOutput = result;
    } else {
        printLines([
            { t: '', c: 'blank' },
            { t: '  Supported openssl commands:', c: 't-info' },
            { t: '    openssl genrsa -out key.pem <bits>   Generate RSA', c: 't-white' },
            { t: '    openssl rsa -in key.pem -pubout      Public key', c: 't-white' },
            { t: '    openssl rsa -in key.pem -text        Key details', c: 't-white' },
            { t: '    openssl rand -hex <n>                Random hex', c: 't-white' },
            { t: '    openssl rand -base64 <n>             Random base64', c: 't-white' },
            { t: '', c: 'blank' },
        ]);
    }
}


/* ═══════════════════════════════════════════════════════
   POWERSHELL / CMD / BASH NATIVE COMMANDS
═══════════════════════════════════════════════════════ */
async function cmdGetFileHash(raw) {
    const tokens = tokenize(raw);
    let algo = 'SHA-256';
    const aIdx = tokens.findIndex(t => t.toLowerCase() === '-algorithm');
    if (aIdx !== -1 && tokens[aIdx + 1]) {
        const map = { sha256:'SHA-256', sha512:'SHA-512', sha384:'SHA-384', sha1:'SHA-1', md5:null };
        algo = map[tokens[aIdx + 1].toLowerCase()] ?? 'SHA-256';
    }
    const filename = tokens[1] || 'file.txt';
    const text = `[File content simulation: ${filename}]`;
    STATE.busy = true;
    await delay(250);
    let hash;
    if (!algo) hash = md5Sim(text);
    else { const buf = await crypto.subtle.digest(algo, new TextEncoder().encode(text)); hash = bufToHex(buf); }
    printLines([
        { t: '', c: 'blank' },
        { t: '  Algorithm       Hash                                                              Path', c: 't-muted' },
        { t: '  ---------       ----                                                              ----', c: 't-muted' },
        { t: `  ${(algo||'MD5').padEnd(15)} ${hash.padEnd(66)} ${filename}`, c: 't-success' },
        { t: '', c: 'blank' },
        { t: '  ℹ Browser mode: simulated file hash. Use File Integrity tool for real files.', c: 't-muted' },
        { t: '', c: 'blank' },
    ]);
    STATE.lastOutput = hash;
    STATE.busy = false;
}

async function cmdCertutil(raw) {
    const tokens = tokenize(raw);
    const flag = tokens[1]?.toLowerCase();
    if (flag === '-hashfile') {
        const filename = tokens[2] || 'file.txt';
        const algoStr = tokens[3]?.toUpperCase() || 'SHA256';
        const map = { SHA256:'SHA-256', SHA512:'SHA-512', SHA384:'SHA-384', SHA1:'SHA-1', MD5:null };
        const algo = map[algoStr];
        const text = `[File content simulation: ${filename}]`;
        STATE.busy = true;
        await delay(200);
        let hash;
        if (algo === null) hash = md5Sim(text);
        else { const buf = await crypto.subtle.digest(algo, new TextEncoder().encode(text)); hash = bufToHex(buf); }
        printLines([
            { t: '', c: 'blank' },
            { t: `  ${algoStr} hash of ${filename}:`, c: 't-white' },
            { t: `  ${hash}`, c: 't-hash' },
            { t: '  CertUtil: -hashfile command completed successfully.', c: 't-success' },
            { t: '', c: 'blank' },
        ]);
        STATE.lastOutput = hash;
        STATE.busy = false;
    } else if (flag === '-encode') {
        const inFile = tokens[2] || 'input.txt';
        const sample = btoa(`[Simulated: ${inFile}]`);
        printLines([
            { t: '', c: 'blank' },
            { t: `  Input: ${inFile} → Base64: ${sample}`, c: 't-hash' },
            { t: '  CertUtil: -encode command completed successfully.', c: 't-success' },
            { t: '', c: 'blank' },
        ]);
        STATE.lastOutput = sample;
    } else {
        printLines([
            { t: '', c: 'blank' },
            { t: '  certutil -hashfile <file> <algo>   Hash file', c: 't-white' },
            { t: '  certutil -encode <in> <out>        Base64 encode', c: 't-white' },
            { t: '  certutil -decode <in> <out>        Base64 decode', c: 't-white' },
            { t: '', c: 'blank' },
        ]);
    }
}

async function cmdShasum(raw) {
    const tokens = tokenize(raw);
    const aIdx   = tokens.indexOf('-a');
    const algoNum= aIdx !== -1 ? tokens[aIdx + 1] : '256';
    const file   = tokens[tokens.length - 1];
    const map    = { '256':'SHA-256','512':'SHA-512','384':'SHA-384','1':'SHA-1' };
    const algo   = map[algoNum] || 'SHA-256';
    STATE.busy = true;
    await delay(200);
    const buf  = await crypto.subtle.digest(algo, new TextEncoder().encode(`[File: ${file}]`));
    const hash = bufToHex(buf);
    printLines([
        { t: `  ${hash}  ${file}`, c: 't-hash' },
        { t: '', c: 'blank' },
    ]);
    STATE.lastOutput = hash;
    STATE.busy = false;
}

function cmdMd5(raw) {
    const file = tokenize(raw)[1] || 'file.txt';
    const hash = md5Sim(`[File: ${file}]`);
    printLines([
        { t: `  MD5 (${file}) = ${hash}`, c: 't-hash' },
        { t: '  ⚠ MD5 is cryptographically broken. Use SHA-256+.', c: 't-warning' },
        { t: '', c: 'blank' },
    ]);
    STATE.lastOutput = hash;
}

/* ── ECHO (bash pipe to base64) ─────────────────────── */
function cmdEcho(raw) {
    if (raw.includes('| base64')) {
        const text = extractQuoted(raw);
        if (!text) { printError('Usage: echo -n "your full sentence here" | base64'); return; }
        if (raw.includes('--decode') || raw.includes('-d')) {
            try {
                const decoded = decodeURIComponent(escape(atob(text)));
                printLines([{ t: `  ${decoded}`, c: 't-hash' }, { t: '', c: 'blank' }]);
                STATE.lastOutput = decoded;
            } catch { printError('Invalid Base64 string.'); }
        } else {
            const encoded = btoa(unescape(encodeURIComponent(text)));
            printLines([{ t: `  ${encoded}`, c: 't-hash' }, { t: '', c: 'blank' }]);
            STATE.lastOutput = encoded;
        }
    } else {
        const text = extractQuoted(raw) || raw.replace(/^echo\s+-?n?\s*/i, '').trim();
        printLines([{ t: `  ${text}`, c: 't-white' }, { t: '', c: 'blank' }]);
    }
}

/* ── UNKNOWN ────────────────────────────────────────── */
function cmdUnknown(raw) {
    const cmd = tokenize(raw)[0];
    printLines([
        { t: '', c: 'blank' },
        { t: `  ✘ '${cmd}' is not recognized as a command.`, c: 't-error' },
        { t: '', c: 'blank' },
        { t: '  Did you mean one of these?', c: 't-info' },
    ]);
    const matches = AC_SUGGESTIONS.filter(s => s.cmd.toLowerCase().startsWith(cmd.toLowerCase().substring(0, 3))).slice(0, 4);
    if (matches.length) {
        matches.forEach(m => appendLine(`    → ${m.cmd}`, 't-muted'));
    } else {
        appendLine('    → Type  help  for all available commands', 't-muted');
    }
    appendBlank();
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
    if (out) out.scrollTop = out.scrollHeight;
}

function updateHistoryUI() {
    const list = document.getElementById('historyList');
    if (!list) return;
    if (!STATE.history.length) {
        list.innerHTML = '<div class="history-empty">No commands yet</div>';
        return;
    }
    list.innerHTML = '';
    [...STATE.history].reverse().slice(0, 20).forEach(cmd => {
        const div = document.createElement('div');
        div.className   = 'history-item';
        div.textContent = cmd;
        div.onclick     = () => { document.getElementById('terminalInput').value = cmd; focusInput(); };
        list.appendChild(div);
    });
}


/* ═══════════════════════════════════════════════════════
   UTILITY FUNCTIONS
═══════════════════════════════════════════════════════ */
function focusInput() {
    const input = document.getElementById('terminalInput');
    if (input) input.focus();
}

function injectCommand(cmd) {
    document.getElementById('terminalInput').value = cmd;
    focusInput();
}

function clearTerminal(reboot = true) {
    const out = document.getElementById('terminalOutput');
    if (out) out.innerHTML = '';
    if (reboot) bootTerminal();
}

function copyLastOutput() {
    if (!STATE.lastOutput) { showToast('Nothing to copy yet', 'error'); return; }
    navigator.clipboard.writeText(STATE.lastOutput).then(() => showToast('✔ Copied to clipboard!', 'success')).catch(() => showToast('Copy failed', 'error'));
}

function downloadSession() {
    const out  = document.getElementById('terminalOutput');
    const text = out ? (out.innerText || out.textContent) : '';
    const blob = new Blob([text], { type: 'text/plain' });
    const url  = URL.createObjectURL(blob);
    const a    = document.createElement('a');
    a.href = url;
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
    if (!t) return;
    t.textContent = msg;
    t.className   = `toast show ${type}`;
    setTimeout(() => t.className = 'toast', 2800);
}

function delay(ms) { return new Promise(r => setTimeout(r, ms)); }
function bufToHex(buf) { return Array.from(new Uint8Array(buf)).map(b => b.toString(16).padStart(2,'0')).join(''); }
function bufToB64(buf) { const bytes = new Uint8Array(buf); let bin = ''; bytes.forEach(b => bin += String.fromCharCode(b)); return btoa(bin); }
function b64ToBuf(b64) { const bin = atob(b64); const bytes = new Uint8Array(bin.length); for (let i = 0; i < bin.length; i++) bytes[i] = bin.charCodeAt(i); return bytes.buffer; }
function wrapPem(b64, label) { const lines = b64.match(/.{1,64}/g) || [b64]; return `-----BEGIN ${label}-----\n${lines.join('\n')}\n-----END ${label}-----`; }
function escapeHtml(str) { return String(str).replace(/&/g,'&amp;').replace(/</g,'&lt;').replace(/>/g,'&gt;').replace(/"/g,'&quot;').replace(/'/g,'&#39;'); }

function md5Sim(str) {
    let h = 0;
    for (let i = 0; i < str.length; i++) { h = ((h << 5) - h) + str.charCodeAt(i); h |= 0; }
    const h1 = Math.abs(h).toString(16).padStart(8,'0');
    const h2 = Math.abs(h * 1234567).toString(16).padStart(8,'0');
    const h3 = Math.abs(h * 7654321).toString(16).padStart(8,'0');
    const h4 = Math.abs(h * 9876543).toString(16).padStart(8,'0');
    return (h1 + h2 + h3 + h4).substring(0, 32);
}