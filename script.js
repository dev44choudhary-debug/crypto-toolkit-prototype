/* ═══════════════════════════════════════════════════════
   CATEGORY RESPONSES
═══════════════════════════════════════════════════════ */

var catResp = {
    tools: {
        t: '<strong>🔧 Available Tools:</strong><br><br>🔑 RSA Key Generator<br>📁 File Integrity Checker<br># Hash Generator<br>🔒 Text Encrypt/Decrypt<br>✍️ Digital Signature<br>🛡️ Password Tools<br><br>Which one do you need?',
        s: ['Hash Generator', 'RSA Keys', 'File Integrity', 'Encryption']
    },
    learn: {
        t: '<strong>📚 Learn Cryptography:</strong><br><br>🔐 What is hashing?<br>🔑 How does RSA work?<br>🔒 What is AES?<br><br>Ask any of these!',
        s: ['What is SHA-256?', 'What is RSA?', 'What is AES?']
    },
    security: {
        t: '<strong>🛡️ Security Advice:</strong><br><br>⚠️ Is MD5 safe?<br>🔑 RSA key size guide<br>💪 Strong password tips<br><br>What is your question?',
        s: ['Is MD5 safe?', 'RSA key size?', 'Password tips']
    },
    help: {
        t: '<strong>❓ I can help with:</strong><br><br>🔧 Finding the right tool<br>📚 Explaining concepts<br>🛡️ Security best practices<br><br>Just type naturally!',
        s: ['All tools', 'Learn crypto', 'Security advice']
    }
};

var fallbacks = [
    'Hmm, I don\'t have that answer yet! 🤔<br><br>Try asking about hashing, encryption, RSA, passwords, or our tools.<br><br><em>Or use the topic chips above!</em>',
    'That\'s outside my knowledge base! 🤖<br><br>I specialize in cryptography. Try browsing by category above!'
];


/* ═══════════════════════════════════════════════════════
   MATCHING ENGINE
═══════════════════════════════════════════════════════ */

function findMatch(q) {
    var query = q.toLowerCase().replace(/[?!.,]/g, '').trim();
    var words = query.split(/\s+/);
    var best  = null;
    var bestScore = 0;

    for (var i = 0; i < KB.length; i++) {
        var entry = KB[i];
        var score = 0;

        for (var j = 0; j < entry.kw.length; j++) {
            var kw = entry.kw[j];
            if (query.indexOf(kw) !== -1) {
                score += kw.split(' ').length * 3;
            }
            for (var k = 0; k < words.length; k++) {
                if (kw.indexOf(words[k]) !== -1 && words[k].length > 3) {
                    score += 1;
                }
            }
        }

        if (score > bestScore) {
            bestScore = score;
            best = entry;
        }
    }

    return bestScore >= 2 ? best : null;
}


/* ═══════════════════════════════════════════════════════
   CHAT STATE & FUNCTIONS
═══════════════════════════════════════════════════════ */

var chatOpen     = false;
var msgCount     = 0;
var currentTheme = 'normal';


/* ── Toggle Chat Window ── */
function toggleChat() {
    chatOpen = !chatOpen;
    var w = document.getElementById('aiChatWindow');
    if (chatOpen) {
        w.classList.add('open');
        if (msgCount === 0) showWelcome();
    } else {
        w.classList.remove('open');
    }
}


/* ── Welcome Message ── */
function showWelcome() {
    var h   = (currentTheme === 'hacker');
    var msg = h
        ? '> GHOST TERMINAL ONLINE<br>> KB LOADED [' + KB.length + ' entries]<br>> SECURE CHANNEL ACTIVE<br><br>I am <strong>GHOST</strong>. Ask about encryption, hashing, or tools.<br><em>Type /help for commands.</em>'
        : '👋 Hi! I\'m <strong>CryptoBot</strong>!<br><br>🔧 Find the <strong>right tool</strong><br>📚 <strong>Explain</strong> crypto concepts<br>🛡️ <strong>Security advice</strong><br><br>What can I help with?';

    addBot(msg, ['What is SHA-256?', 'Is MD5 safe?', 'Show all tools', 'What is RSA?']);
    msgCount++;
}


/* ── Add Bot Message ── */
function addBot(html, sug, tid, tn) {
    sug = sug || [];
    tid = tid || null;
    tn  = tn  || null;

    var msgs = document.getElementById('aiMessages');
    var h    = (currentTheme === 'hacker');

    var wrapper = document.createElement('div');
    wrapper.className = 'ai-msg';

    var avatar = document.createElement('div');
    avatar.className   = 'ai-msg-avatar bot';
    avatar.textContent = h ? '👾' : '🤖';

    var content = document.createElement('div');
    content.className  = 'ai-msg-content bot';

    var textDiv = document.createElement('div');
    textDiv.innerHTML  = html;
    content.appendChild(textDiv);

    // Tool Navigation Button
    if (tid) {
        var toolBtn = document.createElement('button');
        toolBtn.className = 'ai-tool-btn';
        toolBtn.innerHTML = '<i class="fas fa-arrow-right"></i> ' + (h ? '> OPEN: ' : 'Open ') + tn;
        toolBtn.onclick = (function(toolId, isHacker) {
            return function() {
                var el = document.getElementById(toolId);
                if (el) {
                    el.scrollIntoView({ behavior: 'smooth', block: 'center' });
                    el.style.transition = 'box-shadow 0.3s';
                    el.style.boxShadow  = isHacker
                        ? '0 0 40px rgba(0,255,65,0.5)'
                        : '0 0 40px rgba(108,99,255,0.4)';
                    setTimeout(function() { el.style.boxShadow = ''; }, 2500);
                }
            };
        })(tid, h);
        content.appendChild(toolBtn);
    }

    // Suggestion Buttons
    if (sug.length > 0) {
        var sugDiv = document.createElement('div');
        sugDiv.className = 'ai-quick-suggestions';
        for (var i = 0; i < sug.length; i++) {
            var sugBtn = document.createElement('button');
            sugBtn.className   = 'ai-suggestion-btn';
            sugBtn.textContent = h ? '> ' + sug[i] : sug[i];
            sugBtn.onclick = (function(s) {
                return function() { sendQuery(s); };
            })(sug[i]);
            sugDiv.appendChild(sugBtn);
        }
        content.appendChild(sugDiv);
    }

    // Feedback Row
    var fb = document.createElement('div');
    fb.className = 'ai-feedback';
    fb.innerHTML =
        '<span>Helpful?</span>' +
        '<button class="ai-fb-btn" onclick="this.parentElement.innerHTML=\'<span style=color:var(--success)>✅ Thanks!</span>\'">👍</button>' +
        '<button class="ai-fb-btn" onclick="this.parentElement.innerHTML=\'<span style=color:var(--accent)>😔 Try rephrasing.</span>\'">👎</button>';
    content.appendChild(fb);

    wrapper.appendChild(avatar);
    wrapper.appendChild(content);
    msgs.appendChild(wrapper);
    msgs.scrollTop = msgs.scrollHeight;
}


/* ── Add User Message ── */
function addUser(text) {
    var msgs = document.getElementById('aiMessages');
    var h    = (currentTheme === 'hacker');

    var wrapper = document.createElement('div');
    wrapper.className = 'ai-msg user';

    var avatar = document.createElement('div');
    avatar.className   = 'ai-msg-avatar user';
    avatar.textContent = h ? '💀' : '👤';

    var content = document.createElement('div');
    content.className  = 'ai-msg-content user';
    content.textContent = text;

    wrapper.appendChild(content);
    wrapper.appendChild(avatar);
    msgs.appendChild(wrapper);
    msgs.scrollTop = msgs.scrollHeight;
}


/* ── Typing Indicator ── */
function showTyping() {
    var msgs = document.getElementById('aiMessages');
    var h    = (currentTheme === 'hacker');

    var d  = document.createElement('div');
    d.className = 'ai-typing';
    d.id        = 'typingInd';

    var av = document.createElement('div');
    av.className   = 'ai-msg-avatar bot';
    av.textContent = h ? '👾' : '🤖';

    var dots = document.createElement('div');
    dots.className = 'ai-typing-dots';
    dots.innerHTML =
        '<div class="ai-typing-dot"></div>' +
        '<div class="ai-typing-dot"></div>' +
        '<div class="ai-typing-dot"></div>';

    d.appendChild(av);
    d.appendChild(dots);
    msgs.appendChild(d);
    msgs.scrollTop = msgs.scrollHeight;
}

function hideTyping() {
    var t = document.getElementById('typingInd');
    if (t) t.remove();
}


/* ── Send Message ── */
function sendMessage() {
    var input = document.getElementById('aiInput');
    var q     = input.value.trim();
    if (!q) return;
    input.value        = '';
    input.style.height = 'auto';
    sendQuery(q);
}


/* ── Process Query ── */
function sendQuery(q) {
    var h = (currentTheme === 'hacker');

    if (h && q.charAt(0) === '/') {
        handleCmd(q);
        return;
    }

    addUser(q);
    showTyping();
    msgCount++;

    setTimeout(function() {
        hideTyping();
        var m = findMatch(q);
        if (m) {
            addBot(m.ans, m.sg || [], m.tid || null, m.tn || null);
        } else {
            addBot(
                fallbacks[Math.floor(Math.random() * fallbacks.length)],
                ['Show all tools', 'Learn crypto', 'Security advice']
            );
        }
    }, 600 + Math.random() * 400);
}


/* ── Hacker Slash Commands ── */
function handleCmd(cmd) {
    addUser(cmd);
    showTyping();

    setTimeout(function() {
        hideTyping();
        var c = cmd.toLowerCase().trim();

        if      (c === '/help')    { addBot('> COMMANDS:<br>/tools /hash /rsa /encrypt /file /pass /sign /clear /about<br><br>Or just type naturally.', ['/tools', '/hash', '/rsa']); }
        else if (c === '/tools')   { askCategory('tools'); }
        else if (c === '/hash')    { addBot('> LAUNCHING: Hash Generator...',       [], 'tool-hash',      'Hash Generator'); }
        else if (c === '/rsa')     { addBot('> LAUNCHING: RSA Generator...',        [], 'tool-rsa',       'RSA Key Generator'); }
        else if (c === '/encrypt') { addBot('> LAUNCHING: Encrypt Tool...',         [], 'tool-encrypt',   'Text Encrypt/Decrypt'); }
        else if (c === '/file')    { addBot('> LAUNCHING: File Integrity...',       [], 'tool-integrity', 'File Integrity Checker'); }
        else if (c === '/pass')    { addBot('> LAUNCHING: Password Tools...',       [], 'tool-password',  'Password Tools'); }
        else if (c === '/sign')    { addBot('> LAUNCHING: Digital Signature...',    [], 'tool-signature', 'Digital Signature'); }
        else if (c === '/clear')   {
            document.getElementById('aiMessages').innerHTML = '';
            msgCount = 0;
            showWelcome();
        }
        else if (c === '/about')   { sendQuery('about cryptokit'); }
        else                       { addBot('> UNKNOWN: ' + cmd + '<br>> TYPE /help', ['/help']); }
    }, 400);
}


/* ── Browse Category ── */
function askCategory(cat) {
    var r = catResp[cat];
    if (!r) return;
    addUser('Browse: ' + cat);
    showTyping();
    setTimeout(function() {
        hideTyping();
        addBot(r.t, r.s);
    }, 500);
}


/* ── Clear Chat ── */
function clearChat() {
    document.getElementById('aiMessages').innerHTML = '';
    msgCount = 0;
    showWelcome();
}


/* ══════════════════════════════════════════════════════
   ── Update AI Theme ──
   Called every time mode switches (hacker ↔ normal).
   Fixes: name stays "GHOST" when switching back to normal.
══════════════════════════════════════════════════════ */
function updateAiTheme(isH) {

    /* ── Header elements ── */
    var fabIcon  = document.getElementById('fabIcon');
    var aiAvatar = document.getElementById('aiAvatar');
    var aiName   = document.getElementById('aiName');
    var aiStatus = document.getElementById('aiStatusText');
    var aiInput  = document.querySelector('.ai-input');

    /* ── Apply icon / name / status / placeholder ── */
    if (fabIcon)  fabIcon.textContent  = isH ? '👾' : '🤖';
    if (aiAvatar) aiAvatar.textContent = isH ? '👾' : '🤖';
    if (aiStatus) aiStatus.textContent = isH ? 'ONLINE · SECURE' : 'Online · Ready';
    if (aiInput)  aiInput.placeholder  = isH
        ? '> TYPE QUERY OR /help...'
        : 'Ask me anything about cryptography...';

    /* ── FIX: Force name update with reflow trick ── */
    if (aiName) {
        aiName.textContent   = '';          /* clear first         */
        aiName.offsetHeight;                /* force browser reflow */
        aiName.textContent   = isH ? 'GHOST' : 'CryptoBot'; /* set new name */
    }

    /* ── Update all existing bot avatars already in chat ── */
    var botAvatars = document.querySelectorAll('.ai-msg-avatar.bot');
    for (var i = 0; i < botAvatars.length; i++) {
        botAvatars[i].textContent = isH ? '👾' : '🤖';
    }

    /* ── Update all existing user avatars already in chat ── */
    var userAvatars = document.querySelectorAll('.ai-msg-avatar.user');
    for (var i = 0; i < userAvatars.length; i++) {
        userAvatars[i].textContent = isH ? '💀' : '👤';
    }

    /* ── Update suggestion button prefixes ── */
    var sugBtns = document.querySelectorAll('.ai-suggestion-btn');
    for (var i = 0; i < sugBtns.length; i++) {
        var txt = sugBtns[i].textContent;
        if (isH && txt.substring(0, 2) !== '> ') {
            sugBtns[i].textContent = '> ' + txt;
        } else if (!isH && txt.substring(0, 2) === '> ') {
            sugBtns[i].textContent = txt.substring(2);
        }
    }
}


/* ═══════════════════════════════════════════════════════
   PARTICLE CANVAS — Normal Mode
═══════════════════════════════════════════════════════ */

var pCanvas = document.getElementById('particle-canvas');
var pCtx    = pCanvas.getContext('2d');

function resizePC() {
    pCanvas.width  = window.innerWidth;
    pCanvas.height = window.innerHeight;
}
resizePC();

var particles = [];
var HEX_CHARS = '0123456789ABCDEF';

function createParticle() {
    return {
        x:       Math.random() * pCanvas.width,
        y:       Math.random() * pCanvas.height,
        size:    Math.random() * 10 + 8,
        speed:   Math.random() * 0.4 + 0.2,
        opacity: Math.random() * 0.3 + 0.1,
        char:    HEX_CHARS[Math.floor(Math.random() * HEX_CHARS.length)],
        color:   Math.random() > 0.5 ? '#6C63FF' : '#00B4D8'
    };
}

for (var i = 0; i < 60; i++) { particles.push(createParticle()); }

var pAnimId;

function animateParticles() {
    if (currentTheme !== 'normal') return;
    pCtx.clearRect(0, 0, pCanvas.width, pCanvas.height);

    for (var i = 0; i < particles.length; i++) {
        var p = particles[i];
        p.y += p.speed;

        if (p.y > pCanvas.height) {
            particles[i]   = createParticle();
            particles[i].y = 0;
        }

        if (Math.random() < 0.05) {
            p.char = HEX_CHARS[Math.floor(Math.random() * HEX_CHARS.length)];
        }

        pCtx.globalAlpha = p.opacity;
        pCtx.fillStyle   = p.color;
        pCtx.font        = p.size + 'px JetBrains Mono';
        pCtx.fillText(p.char, p.x, p.y);
    }

    pAnimId = requestAnimationFrame(animateParticles);
}

animateParticles();


/* ═══════════════════════════════════════════════════════
   MATRIX RAIN — Hacker Mode
═══════════════════════════════════════════════════════ */

var mCanvas = document.getElementById('matrix-canvas');
var mCtx    = mCanvas.getContext('2d');

function resizeMC() {
    mCanvas.width  = window.innerWidth;
    mCanvas.height = window.innerHeight;
}
resizeMC();

var matrixChars  = 'アイウエオカキクケコサシスセソ0123456789ABCDEF{}[]<>|/*&^%$#@!';
var fontSize     = 14;
var columns      = Math.floor(mCanvas.width / fontSize);
var drops        = [];
for (var i = 0; i < columns; i++) drops[i] = 1;

var matrixColors = [
    '#00FF41','#00FF41','#00FF41','#00FF41','#00FF41',
    '#39FF14','#39FF14','#CCFF00','#00E5FF'
];

var mAnimId;

function drawMatrix() {
    if (currentTheme !== 'hacker') return;

    mCtx.fillStyle = 'rgba(0, 0, 0, 0.05)';
    mCtx.fillRect(0, 0, mCanvas.width, mCanvas.height);
    mCtx.font = fontSize + 'px Share Tech Mono';

    for (var i = 0; i < drops.length; i++) {
        var ch = matrixChars[Math.floor(Math.random() * matrixChars.length)];
        mCtx.fillStyle = (drops[i] * fontSize < 50)
            ? '#FFFFFF'
            : matrixColors[Math.floor(Math.random() * matrixColors.length)];
        mCtx.fillText(ch, i * fontSize, drops[i] * fontSize);

        if (drops[i] * fontSize > mCanvas.height && Math.random() > 0.975) {
            drops[i] = 0;
        }
        drops[i]++;
    }

    mAnimId = requestAnimationFrame(drawMatrix);
}

/* ── Resize handler ── */
window.addEventListener('resize', function() {
    resizePC();
    resizeMC();
    columns = Math.floor(mCanvas.width / fontSize);
    drops   = [];
    for (var i = 0; i < columns; i++) drops[i] = 1;
});


/* ═══════════════════════════════════════════════════════
   TERMINAL SYSTEM — Clean Typewriter Animation
   Single authoritative system. No duplicate runners.
═══════════════════════════════════════════════════════ */

/* ── Terminal data for each OS ── */
var TERMINALS = {
    mac: {
        title:  'cryptokit ~ zsh',
        prompt: '➜ ~',
        lines: [
            { type: 'cmd',     text: 'cryptokit hash --algo SHA-256 --input "Hello World"' },
            { type: 'output',  text: 'Algorithm  : SHA-256' },
            { type: 'output',  text: 'Input      : "Hello World"' },
            { type: 'hash',    text: 'a591a6d40bf420404a011733cfb7b190d62c65bf0bcda32b...' },
            { type: 'success', text: '✅  Hash generated in 2ms' },
            { type: 'blank' },
            { type: 'cmd',     text: 'cryptokit rsa --generate --bits 2048' },
            { type: 'info',    text: '⚙  Generating RSA-2048 key pair...' },
            { type: 'output',  text: 'Public  → -----BEGIN PUBLIC KEY-----' },
            { type: 'output',  text: 'Private → -----BEGIN PRIVATE KEY-----' },
            { type: 'success', text: '✅  Keys saved to ./keys/ in 180ms' },
            { type: 'blank' },
            { type: 'cmd',     text: 'cryptokit verify --file report.pdf --hash a3f5c8...' },
            { type: 'info',    text: '🔍  Computing SHA-256 of report.pdf...' },
            { type: 'output',  text: 'Expected : a3f5c8d2e1b4a7f9c2d5e8a1b4c7d0e3' },
            { type: 'output',  text: 'Actual   : a3f5c8d2e1b4a7f9c2d5e8a1b4c7d0e3' },
            { type: 'success', text: '✅  File integrity verified — no tampering detected!' },
            { type: 'blank' },
            { type: 'cmd',     text: 'cryptokit encrypt --algo AES-256 --file secret.txt' },
            { type: 'info',    text: '🔒  Encrypting with AES-256-CBC...' },
            { type: 'output',  text: 'Output   → secret.txt.enc' },
            { type: 'success', text: '✅  Encryption complete in 5ms' },
            { type: 'blank' },
            { type: 'cursor' }
        ]
    },
    win: {
        title:  'C:\\Users\\CryptoKit> cmd.exe',
        prompt: 'C:\\CryptoKit>',
        lines: [
            { type: 'cmd',     text: 'cryptokit.exe hash /algo:SHA-256 /input:"Hello World"' },
            { type: 'output',  text: 'Algorithm  : SHA-256' },
            { type: 'output',  text: 'Input      : "Hello World"' },
            { type: 'hash',    text: 'A591A6D40BF420404A011733CFB7B190D62C65BF0BCDA32B...' },
            { type: 'success', text: '[OK]  Hash generated in 2ms' },
            { type: 'blank' },
            { type: 'cmd',     text: 'cryptokit.exe rsa /generate /bits:2048' },
            { type: 'info',    text: '[**]  Generating RSA-2048 key pair...' },
            { type: 'output',  text: 'Public  -> -----BEGIN PUBLIC KEY-----' },
            { type: 'output',  text: 'Private -> -----BEGIN PRIVATE KEY-----' },
            { type: 'success', text: '[OK]  Keys saved to .\\keys\\ in 180ms' },
            { type: 'blank' },
            { type: 'cmd',     text: 'cryptokit.exe verify /file:report.pdf /hash:a3f5c8...' },
            { type: 'info',    text: '[..]  Computing SHA-256 of report.pdf...' },
            { type: 'output',  text: 'Expected : a3f5c8d2e1b4a7f9c2d5e8a1b4c7d0e3' },
            { type: 'output',  text: 'Actual   : a3f5c8d2e1b4a7f9c2d5e8a1b4c7d0e3' },
            { type: 'success', text: '[OK]  File integrity verified — no tampering detected!' },
            { type: 'blank' },
            { type: 'cmd',     text: 'cryptokit.exe encrypt /algo:AES-256 /file:secret.txt' },
            { type: 'info',    text: '[..]  Encrypting with AES-256-CBC...' },
            { type: 'output',  text: 'Output   -> secret.txt.enc' },
            { type: 'success', text: '[OK]  Encryption complete in 5ms' },
            { type: 'blank' },
            { type: 'cursor' }
        ]
    }
};

/* ── Typing speed per line type (ms per character) ── */
var CHAR_DELAYS = {
    cmd:     42,
    output:  18,
    hash:    12,
    success: 22,
    info:    22
};

/* ── Post-line pause (ms) ── */
var LINE_PAUSE = {
    cmd:    480,
    output:  70,
    hash:    70,
    success: 90,
    info:    90,
    blank:  200,
    restart: 2800
};

/* ── Terminal state ── */
var termOS      = 'mac';
var termTimerId = null;
var termAlive   = false;


/* ── Build one empty terminal line element ── */
function buildTermLine(type, prompt) {
    var el = document.createElement('div');
    el.className = 'terminal-line tl-' + type;

    switch (type) {
        case 'cmd':
            el.innerHTML =
                '<span class="terminal-prompt">' + prompt + ' </span>' +
                '<span class="terminal-cmd"></span>';
            break;
        case 'output':
            el.innerHTML = '<span class="terminal-output"></span>';
            break;
        case 'hash':
            el.innerHTML = '<span class="terminal-hash"></span>';
            break;
        case 'success':
            el.innerHTML = '<span class="terminal-success"></span>';
            break;
        case 'info':
            el.innerHTML = '<span class="terminal-info"></span>';
            break;
        case 'blank':
            el.innerHTML = '&nbsp;';
            break;
        case 'cursor':
            el.innerHTML =
                '<span class="terminal-prompt">' + prompt + ' </span>' +
                '<span class="terminal-cursor-blink">█</span>';
            break;
    }
    return el;
}


/* ── Type characters one-by-one into a span ── */
function typeIntoSpan(span, text, charDelay, onDone) {
    var idx = 0;

    function nextChar() {
        if (!termAlive) return;
        if (idx < text.length) {
            span.textContent += text[idx++];
            var body = document.getElementById('terminalBody');
            if (body) body.scrollTop = body.scrollHeight;
            termTimerId = setTimeout(nextChar, charDelay);
        } else {
            onDone();
        }
    }

    nextChar();
}


/* ── Render lines one after another (recursive, index-driven) ── */
function renderLine(lines, prompt, idx) {
    if (!termAlive) return;

    if (idx >= lines.length) {
        termTimerId = setTimeout(function() {
            var body = document.getElementById('terminalBody');
            if (body && termAlive) {
                body.innerHTML = '';
                renderLine(lines, prompt, 0);
            }
        }, LINE_PAUSE.restart);
        return;
    }

    var line = lines[idx];
    var body = document.getElementById('terminalBody');
    if (!body) return;

    /* ── blank line ── */
    if (line.type === 'blank') {
        body.appendChild(buildTermLine('blank', prompt));
        body.scrollTop = body.scrollHeight;
        termTimerId = setTimeout(function() {
            renderLine(lines, prompt, idx + 1);
        }, LINE_PAUSE.blank);
        return;
    }

    /* ── blinking cursor (last line) ── */
    if (line.type === 'cursor') {
        body.appendChild(buildTermLine('cursor', prompt));
        body.scrollTop = body.scrollHeight;
        termTimerId = setTimeout(function() {
            if (body && termAlive) {
                body.innerHTML = '';
                renderLine(lines, prompt, 0);
            }
        }, LINE_PAUSE.restart);
        return;
    }

    /* ── typed lines ── */
    var el   = buildTermLine(line.type, prompt);
    body.appendChild(el);
    body.scrollTop = body.scrollHeight;

    var spanClass = {
        cmd:     '.terminal-cmd',
        output:  '.terminal-output',
        hash:    '.terminal-hash',
        success: '.terminal-success',
        info:    '.terminal-info'
    }[line.type];

    var span      = el.querySelector(spanClass);
    var charDelay = CHAR_DELAYS[line.type] || 20;
    var postPause = LINE_PAUSE[line.type]  || 80;

    typeIntoSpan(span, line.text || '', charDelay, function() {
        termTimerId = setTimeout(function() {
            renderLine(lines, prompt, idx + 1);
        }, postPause);
    });
}


/* ── Start (or restart) the terminal for the given OS ── */
function startTerminal(os) {
    termAlive = false;
    clearTimeout(termTimerId);

    var data  = TERMINALS[os];
    var body  = document.getElementById('terminalBody');
    var title = document.getElementById('terminalTitle');

    if (!body || !title || !data) return;

    body.innerHTML    = '';
    title.textContent = data.title;

    termTimerId = setTimeout(function() {
        termAlive = true;
        renderLine(data.lines, data.prompt, 0);
    }, 120);
}


/* ── OS switcher button handler ── */
function switchTermOS(os) {
    termOS = os;

    var macBtn = document.getElementById('osMac');
    var winBtn = document.getElementById('osWin');
    if (macBtn) macBtn.classList.toggle('active', os === 'mac');
    if (winBtn) winBtn.classList.toggle('active', os === 'win');

    startTerminal(os);
}


/* ═══════════════════════════════════════════════════════
   THEME TOGGLE — Boot Messages & Transition
═══════════════════════════════════════════════════════ */

var hackerBoot = [
    '> INITIALIZING HACKER MODE...',
    '> LOADING MATRIX PROTOCOLS...',
    '> BYPASSING NORMAL INTERFACE...',
    '> ACTIVATING DARK TERMINAL...',
    '> ENCRYPTING VISUAL LAYER...',
    '> ACCESS GRANTED. WELCOME, HACKER. 🟢'
];

var normalBoot = [
    '> SWITCHING TO NORMAL MODE...',
    '> RESTORING CLEAN INTERFACE...',
    '> DEACTIVATING MATRIX...',
    '> DONE. WELCOME BACK. ✓'
];

function showTransition(msgs, callback) {
    var overlay = document.getElementById('themeOverlay');
    var textEl  = document.getElementById('transitionText');
    overlay.classList.add('active');
    textEl.innerHTML = '';

    var idx = 0;

    function nextLine() {
        if (idx < msgs.length) {
            if (idx > 0) textEl.innerHTML += '<br>';
            textEl.innerHTML += msgs[idx];
            idx++;
            setTimeout(nextLine, 250);
        } else {
            setTimeout(function() {
                callback();
                setTimeout(function() {
                    overlay.classList.remove('active');
                }, 300);
            }, 400);
        }
    }

    nextLine();
}


/* ═══════════════════════════════════════════════════════
   MODE DROPDOWN SELECTOR
═══════════════════════════════════════════════════════ */

function toggleModeDropdown() {
    var dropdown = document.getElementById('modeDropdown');
    var arrow    = document.getElementById('modeArrow');
    if (dropdown) dropdown.classList.toggle('open');
    if (arrow)    arrow.classList.toggle('open');
}

/* Close dropdown on outside click */
document.addEventListener('click', function(e) {
    var selector = document.getElementById('modeSelector');
    if (selector && !selector.contains(e.target)) {
        var dd = document.getElementById('modeDropdown');
        var ar = document.getElementById('modeArrow');
        if (dd) dd.classList.remove('open');
        if (ar) ar.classList.remove('open');
    }
});

/* Mobile quick-switch */
function mobileThemeSwitch() {
    selectMode(currentTheme === 'normal' ? 'hacker' : 'normal');
}


/* ══════════════════════════════════════════════════════
   MAIN MODE SELECTOR
   FIX: updateAiTheme() is now called BEFORE the chat
        is cleared/re-shown so the header name is always
        correct when showWelcome() reads currentTheme.
══════════════════════════════════════════════════════ */
function selectMode(mode) {

    /* Close dropdown */
    var dd = document.getElementById('modeDropdown');
    var ar = document.getElementById('modeArrow');
    if (dd) dd.classList.remove('open');
    if (ar) ar.classList.remove('open');

    /* No-op if already in this mode */
    if (mode === currentTheme) return;

    var isGoingHacker = (mode === 'hacker');
    var bootMsgs      = isGoingHacker ? hackerBoot : normalBoot;

    showTransition(bootMsgs, function() {

        if (isGoingHacker) {
            /* ── TO HACKER ── */
            currentTheme = 'hacker';
            document.documentElement.setAttribute('data-theme', 'hacker');
            localStorage.setItem('cryptokit-theme', 'hacker');

            cancelAnimationFrame(pAnimId);
            pCtx.clearRect(0, 0, pCanvas.width, pCanvas.height);

            mCtx.clearRect(0, 0, mCanvas.width, mCanvas.height);
            columns = Math.floor(mCanvas.width / fontSize);
            drops   = [];
            for (var i = 0; i < columns; i++) drops[i] = 1;
            drawMatrix();

            var mi = document.getElementById('modeIcon');
            var ml = document.getElementById('modeLabel');
            var cn = document.getElementById('checkNormal');
            var ch = document.getElementById('checkHacker');
            if (mi) mi.textContent   = '💀';
            if (ml) ml.textContent   = 'Hacker';
            if (cn) cn.style.display = 'none';
            if (ch) ch.style.display = 'inline';

        } else {
            /* ── TO NORMAL ── */
            currentTheme = 'normal';
            document.documentElement.setAttribute('data-theme', 'normal');
            localStorage.setItem('cryptokit-theme', 'normal');

            cancelAnimationFrame(mAnimId);
            mCtx.clearRect(0, 0, mCanvas.width, mCanvas.height);

            animateParticles();

            var mi2 = document.getElementById('modeIcon');
            var ml2 = document.getElementById('modeLabel');
            var cn2 = document.getElementById('checkNormal');
            var ch2 = document.getElementById('checkHacker');
            if (mi2) mi2.textContent   = '☀️';
            if (ml2) ml2.textContent   = 'Normal';
            if (cn2) cn2.style.display = 'inline';
            if (ch2) ch2.style.display = 'none';
        }

        /*
         * ── FIX: updateAiTheme FIRST ──
         * Update the header name/icon BEFORE clearing the chat.
         * This guarantees aiName reads the correct value
         * and showWelcome() uses the already-updated currentTheme.
         */
        updateAiTheme(isGoingHacker);

        /* ── Then reset chat (always, not just when open) ── */
        var msgs = document.getElementById('aiMessages');
        if (msgs) msgs.innerHTML = '';
        msgCount = 0;

        /* Only re-show welcome if chat window is actually open */
        if (chatOpen) {
            showWelcome();
        }
    });
}

/* Backwards-compat wrapper */
function toggleTheme() {
    selectMode(currentTheme === 'normal' ? 'hacker' : 'normal');
}


/* ═══════════════════════════════════════════════════════
   NAVBAR & MOBILE MENU
═══════════════════════════════════════════════════════ */

var navbar       = document.getElementById('navbar');
var scrollTopBtn = document.getElementById('scrollTop');

window.addEventListener('scroll', function() {
    if (window.scrollY > 50) {
        navbar.classList.add('scrolled');
        scrollTopBtn.classList.add('visible');
    } else {
        navbar.classList.remove('scrolled');
        scrollTopBtn.classList.remove('visible');
    }
});

function toggleMenu() {
    document.getElementById('mobileMenu').classList.toggle('open');
}


/* ═══════════════════════════════════════════════════════
   LIVE DEMO
═══════════════════════════════════════════════════════ */

var demoMode = 'hash';

function setDemoTab(btn, mode) {
    var tabs = document.querySelectorAll('.demo-tab');
    for (var i = 0; i < tabs.length; i++) { tabs[i].classList.remove('active'); }
    btn.classList.add('active');
    demoMode = mode;

    var sel = document.getElementById('demoAlgo');
    var inp = document.getElementById('demoInput');

    if (mode === 'hash') {
        sel.style.display = 'block';
        inp.placeholder   = 'Type text to hash...';
    } else if (mode === 'base64') {
        sel.style.display = 'none';
        inp.placeholder   = 'Type text to encode in Base64...';
    } else {
        sel.style.display = 'none';
        inp.placeholder   = 'Enter a password to check strength...';
    }

    document.getElementById('demoResult').innerHTML =
        '<span class="demo-result-placeholder">Your result will appear here...</span>';
}

function sha256Hash(msg) {
    return crypto.subtle.digest('SHA-256', new TextEncoder().encode(msg)).then(function(buf) {
        return Array.from(new Uint8Array(buf)).map(function(b) {
            return b.toString(16).padStart(2, '0');
        }).join('');
    });
}

function sha512Hash(msg) {
    return crypto.subtle.digest('SHA-512', new TextEncoder().encode(msg)).then(function(buf) {
        return Array.from(new Uint8Array(buf)).map(function(b) {
            return b.toString(16).padStart(2, '0');
        }).join('');
    });
}

function fakeMd5(str) {
    var h = 0;
    for (var i = 0; i < str.length; i++) {
        h = ((h << 5) - h) + str.charCodeAt(i);
        h |= 0;
    }
    return Math.abs(h).toString(16).padStart(8, '0').repeat(4);
}

function getPassStrength(p) {
    var s = 0;
    if (p.length >= 8)           s++;
    if (p.length >= 12)          s++;
    if (p.length >= 16)          s++;
    if (/[A-Z]/.test(p))         s++;
    if (/[a-z]/.test(p))         s++;
    if (/[0-9]/.test(p))         s++;
    if (/[^A-Za-z0-9]/.test(p))  s++;

    if (s <= 2) return { label: '❌ Very Weak',  color: '#FF4444' };
    if (s <= 3) return { label: '⚠️ Weak',       color: '#FF8C00' };
    if (s <= 4) return { label: '🟡 Fair',        color: '#FFD700' };
    if (s <= 5) return { label: '🟢 Strong',      color: '#00CC66' };
    return            { label: '✅ Very Strong',  color: '#00FF88' };
}

function runDemo() {
    var val = document.getElementById('demoInput').value;
    var res = document.getElementById('demoResult');

    if (!val.trim()) {
        res.innerHTML = '<span class="demo-result-placeholder">Your result will appear here...</span>';
        return;
    }

    if (demoMode === 'hash') {
        var algo = document.getElementById('demoAlgo').value;
        var hashPromise;

        if      (algo === 'sha256') hashPromise = sha256Hash(val);
        else if (algo === 'sha512') hashPromise = sha512Hash(val);
        else                        hashPromise = Promise.resolve(fakeMd5(val));

        hashPromise.then(function(hash) {
            var warn = (algo === 'md5')
                ? '<br><small style="color:#FF8C00">⚠️ MD5 is weak. Use SHA-256+ in production.</small>'
                : '';
            res.innerHTML =
                '<span class="demo-result-text">' + hash + warn + '</span>' +
                '<button class="btn-copy" onclick="copyResult(\'' + hash + '\')"><i class="fas fa-copy"></i> Copy</button>';
        });

    } else if (demoMode === 'base64') {
        var encoded = btoa(unescape(encodeURIComponent(val)));
        res.innerHTML =
            '<span class="demo-result-text">' + encoded + '</span>' +
            '<button class="btn-copy" onclick="copyResult(\'' + encoded + '\')"><i class="fas fa-copy"></i> Copy</button>';

    } else {
        var str = getPassStrength(val);
        res.innerHTML =
            '<span class="demo-result-text" style="color:' + str.color + ';font-size:16px;font-weight:600;font-family:inherit;">' + str.label + '</span>' +
            '<span style="font-size:12px;color:var(--text-muted);">' + val.length + ' chars</span>';
    }
}

function copyResult(text) {
    navigator.clipboard.writeText(text).then(function() {
        var btn = document.querySelector('.btn-copy');
        if (btn) {
            var orig = btn.innerHTML;
            btn.innerHTML        = '<i class="fas fa-check"></i> Copied!';
            btn.style.background = 'var(--success)';
            btn.style.color      = '#000';
            setTimeout(function() {
                btn.innerHTML        = orig;
                btn.style.background = '';
                btn.style.color      = '';
            }, 2000);
        }
    });
}


/* ═══════════════════════════════════════════════════════
   INTERSECTION OBSERVERS
═══════════════════════════════════════════════════════ */

var observer = new IntersectionObserver(function(entries) {
    entries.forEach(function(entry, i) {
        if (entry.isIntersecting) {
            setTimeout(function() {
                entry.target.classList.add('visible');
            }, i * 80);
        }
    });
}, { threshold: 0.1 });

var fadeEls = document.querySelectorAll('.fade-up');
for (var i = 0; i < fadeEls.length; i++) { observer.observe(fadeEls[i]); }

/* Stats counter */
function animateCounter(el) {
    var target = parseInt(el.getAttribute('data-target'));
    var suffix = el.getAttribute('data-suffix') || '';

    if (target === 0) { el.textContent = '0' + suffix; return; }

    var current = 0;
    var step    = target / 60;
    var timer   = setInterval(function() {
        current += step;
        if (current >= target) { current = target; clearInterval(timer); }
        el.textContent = Math.floor(current) + suffix;
    }, 20);
}

var statsObserver = new IntersectionObserver(function(entries) {
    entries.forEach(function(entry) {
        if (entry.isIntersecting) {
            var nums = entry.target.querySelectorAll('.stat-number');
            for (var i = 0; i < nums.length; i++) { animateCounter(nums[i]); }
            statsObserver.unobserve(entry.target);
        }
    });
}, { threshold: 0.3 });

var statContainers = document.querySelectorAll('.stats-container');
for (var i = 0; i < statContainers.length; i++) { statsObserver.observe(statContainers[i]); }


/* ═══════════════════════════════════════════════════════
   FEEDBACK FORM
═══════════════════════════════════════════════════════ */

var currentRating = 0;

function setRating(rating) {
    currentRating = rating;
    var stars = document.querySelectorAll('.rating-star');
    for (var i = 0; i < stars.length; i++) {
        if (i < rating) {
            stars[i].textContent = '★';
            stars[i].classList.add('active');
        } else {
            stars[i].textContent = '☆';
            stars[i].classList.remove('active');
        }
    }
}

function submitFeedback(event) {
    event.preventDefault();

    if (currentRating === 0) { alert('Please select a rating!'); return false; }

    var form   = document.getElementById('feedbackForm');
    var inputs = form.querySelectorAll('input, textarea');
    var name   = inputs[0].value;

    var wrapper = document.querySelector('.feedback-form-wrapper');
    wrapper.innerHTML =
        '<div style="text-align:center;padding:40px 20px;">' +
        '<div style="font-size:48px;margin-bottom:16px;">🎉</div>' +
        '<h3 style="font-family:Space Grotesk,sans-serif;font-size:22px;font-weight:700;color:var(--text-primary);margin-bottom:8px;">Thank You, ' + name + '!</h3>' +
        '<p style="color:var(--text-secondary);font-size:15px;">Your ' + currentRating + '-star feedback has been received.<br>We truly appreciate your input!</p>' +
        '</div>';

    return false;
}


/* ═══════════════════════════════════════════════════════
   PAGE LOAD — Restore saved theme + boot terminal
═══════════════════════════════════════════════════════ */

window.addEventListener('DOMContentLoaded', function() {

    /* 1. Boot the terminal (mac by default) */
    setTimeout(function() { startTerminal('mac'); }, 600);

    /* 2. Restore saved theme (silently, no overlay) */
    var savedTheme = localStorage.getItem('cryptokit-theme');
    if (savedTheme && savedTheme !== currentTheme) {
        currentTheme = (savedTheme === 'hacker') ? 'normal' : 'hacker';
        selectMode(savedTheme);
    }
});