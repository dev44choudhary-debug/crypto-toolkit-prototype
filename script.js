/* ═══════════════════════════════════════════════════════
   AI KNOWLEDGE BASE
═══════════════════════════════════════════════════════ */

var KB = [
    // ── Tool Navigation ──
    {
        id: 'hash',
        kw: ['hash','sha256','sha-256','sha512','md5','blake','checksum','digest','generate hash','hashing','hash generator'],
        cat: 'tools',
        ans: '<strong>Hash Generator</strong> 🔐<br><br>✅ Hash any text instantly<br>✅ Choose MD5, SHA-1, SHA-256, SHA-512<br>✅ Generate all hashes at once<br>✅ Copy with one click<br><br><em>💡 Use SHA-256 or higher for security.</em>',
        tid: 'tool-hash',
        tn: 'Hash Generator',
        sg: ['Is MD5 safe?', 'SHA-256 vs SHA-512?', 'What is a hash?']
    },
    {
        id: 'file',
        kw: ['file','integrity','tamper','tampered','changed','verify file','check file','file hash','modified','corrupted','authenticity'],
        cat: 'tools',
        ans: '<strong>File Integrity Checker</strong> 📁<br><br>✅ Upload file to generate hash<br>✅ Paste original hash to compare<br>✅ Detect any modification instantly<br>✅ Supports SHA-256, SHA-512, MD5<br><br><em>💡 Great for verifying downloads.</em>',
        tid: 'tool-integrity',
        tn: 'File Integrity Checker',
        sg: ['What is SHA-256?', 'Verify a file']
    },
    {
        id: 'rsa',
        kw: ['rsa','key pair','public key','private key','generate key','asymmetric','key size','2048','4096','pem','keypair'],
        cat: 'tools',
        ans: '<strong>RSA Key Generator</strong> 🔑<br><br>✅ Generate RSA pairs (1024-4096 bits)<br>✅ Analyze key strength<br>✅ Export in PEM format<br>✅ Security recommendations<br><br><em>💡 Use RSA-2048 minimum.</em>',
        tid: 'tool-rsa',
        tn: 'RSA Key Generator',
        sg: ['Safe key size?', 'What is RSA?']
    },
    {
        id: 'enc',
        kw: ['encrypt','decrypt','aes','cipher','secret','message','lock','unlock','encryption','decryption','aes-256'],
        cat: 'tools',
        ans: '<strong>Text Encrypt/Decrypt</strong> 🔒<br><br>✅ AES-256 encryption<br>✅ RSA public key encryption<br>✅ Encrypt any text or message<br>✅ Decrypt with your key<br><br><em>💡 AES-256 is the gold standard.</em>',
        tid: 'tool-encrypt',
        tn: 'Text Encrypt/Decrypt',
        sg: ['AES vs RSA?', 'What is AES-256?']
    },
    {
        id: 'sig',
        kw: ['sign','signature','verify sign','digital sign','digital signature','ecdsa','rsa-pss'],
        cat: 'tools',
        ans: '<strong>Digital Signature</strong> ✍️<br><br>✅ Sign documents with private key<br>✅ Verify with public keys<br>✅ RSA-PSS and ECDSA support<br><br><em>💡 Proves identity and integrity.</em>',
        tid: 'tool-signature',
        tn: 'Digital Signature',
        sg: ['What is digital signature?']
    },
    {
        id: 'pass',
        kw: ['password','strength','weak password','strong password','secure password','generate password','entropy','brute force','crack password'],
        cat: 'tools',
        ans: '<strong>Password Tools</strong> 🛡️<br><br>✅ Check password strength<br>✅ Estimated crack time<br>✅ Generate secure passwords<br>✅ Entropy calculations<br><br><em>💡 16+ chars with mixed case, numbers & symbols.</em>',
        tid: 'tool-password',
        tn: 'Password Tools',
        sg: ['What is entropy?', 'Strong password tips']
    },

    // ── Education ──
    {
        id: 'whash',
        kw: ['what is hash','what is hashing','how hash work','explain hash','hash function'],
        cat: 'learn',
        ans: '<strong>What is a Hash Function?</strong> 🔐<br><br>Takes any input → produces fixed-length fingerprint.<br><br>• <strong>One-way</strong> — Cannot be reversed<br>• <strong>Deterministic</strong> — Same input = same output<br>• <strong>Avalanche effect</strong> — Tiny change = different hash<br>• <strong>Fixed length</strong> — SHA-256 = always 64 hex chars',
        sg: ['Is MD5 safe?', 'Hash Generator']
    },
    {
        id: 'wrsa',
        kw: ['what is rsa','explain rsa','rsa explained','how rsa works','public key cryptography','asymmetric encryption'],
        cat: 'learn',
        ans: '<strong>What is RSA?</strong> 🔑<br><br>Most widely used public-key encryption.<br><br>• <strong>Two linked keys</strong> (public + private)<br>• <strong>Public</strong> → anyone encrypts<br>• <strong>Private</strong> → only you decrypt<br><br>Used in: HTTPS, email, SSH, digital signatures',
        sg: ['Safe key size?', 'Generate RSA keys']
    },
    {
        id: 'waes',
        kw: ['what is aes','explain aes','aes algorithm','aes-256','symmetric encryption','how aes works'],
        cat: 'learn',
        ans: '<strong>What is AES?</strong> 🔒<br><br>World\'s most trusted symmetric encryption.<br><br>• <strong>Same key</strong> to encrypt & decrypt<br>• <strong>AES-256</strong> = strongest variant<br>• Used by: Governments, banks, WhatsApp<br><br><em>AES-256 has never been cracked!</em>',
        sg: ['AES vs RSA?', 'Encryption Tool']
    },

    // ── Security Advice ──
    {
        id: 'md5s',
        kw: ['md5 safe','is md5 safe','md5 secure','should i use md5','md5 broken','md5 weak'],
        cat: 'security',
        ans: '<strong>⚠️ MD5 is NOT safe!</strong><br><br>Broken since 2004:<br>❌ Collision attacks proven<br>❌ Rainbow tables easily crack it<br><br>Use instead:<br>✅ SHA-256 — General purpose<br>✅ SHA-512 — High security<br>✅ Argon2/bcrypt — For passwords',
        sg: ['Try SHA-256', 'Hash Generator']
    },
    {
        id: 'rks',
        kw: ['rsa key size','key size','2048 bit','4096 bit','recommended key','key length','rsa size'],
        cat: 'security',
        ans: '<strong>RSA Key Size Guide</strong> 🔑<br><br>1024-bit → ❌ BROKEN<br>2048-bit → ✅ Minimum (until ~2030)<br>3072-bit → ✅ Good (until ~2040)<br>4096-bit → ✅ Excellent (long-term)<br><br><em>Larger = more secure but slower.</em>',
        tid: 'tool-rsa',
        tn: 'RSA Key Generator',
        sg: ['Generate RSA Keys', 'What is RSA?']
    },
    {
        id: 'spass',
        kw: ['strong password','good password','password tips','password best practices'],
        cat: 'security',
        ans: '<strong>Strong Password Tips</strong> 💪<br><br>✅ 16+ characters minimum<br>✅ Uppercase & lowercase<br>✅ Numbers (0-9)<br>✅ Special chars (!@#$%^&*)<br>✅ No dictionary words<br>✅ Unique per account',
        tid: 'tool-password',
        tn: 'Password Tools',
        sg: ['Generate password', 'Check strength']
    },

    // ── About ──
    {
        id: 'about',
        kw: ['about cryptokit','what is cryptokit','who made','cryptokit info','is cryptokit safe'],
        cat: 'help',
        ans: '<strong>About CryptoKit</strong> 🔐<br><br>Free, open-source crypto toolkit.<br><br>🔒 Zero data storage<br>🌐 Client-side processing<br>📖 Open source on GitHub<br>🆓 Free forever<br>🛡️ NIST compliant algorithms',
        sg: ['See all tools', 'Learn crypto']
    }
];


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
    var best = null;
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

var chatOpen = false;
var msgCount = 0;
var currentTheme = 'normal';


// Toggle Chat Window
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


// Show Welcome Message
function showWelcome() {
    var h = (currentTheme === 'hacker');
    var msg = h
        ? '> GHOST TERMINAL ONLINE<br>> KB LOADED [' + KB.length + ' entries]<br>> SECURE CHANNEL ACTIVE<br><br>I am <strong>GHOST</strong>. Ask about encryption, hashing, or tools.<br><em>Type /help for commands.</em>'
        : '👋 Hi! I\'m <strong>CryptoBot</strong>!<br><br>🔧 Find the <strong>right tool</strong><br>📚 <strong>Explain</strong> crypto concepts<br>🛡️ <strong>Security advice</strong><br><br>What can I help with?';

    addBot(msg, ['What is SHA-256?', 'Is MD5 safe?', 'Show all tools', 'What is RSA?']);
    msgCount++;
}


// Add Bot Message
function addBot(html, sug, tid, tn) {
    sug = sug || [];
    tid = tid || null;
    tn = tn || null;

    var msgs = document.getElementById('aiMessages');
    var h = (currentTheme === 'hacker');

    var wrapper = document.createElement('div');
    wrapper.className = 'ai-msg';

    // Avatar
    var avatar = document.createElement('div');
    avatar.className = 'ai-msg-avatar bot';
    avatar.textContent = h ? '👾' : '🤖';

    // Content
    var content = document.createElement('div');
    content.className = 'ai-msg-content bot';

    var textDiv = document.createElement('div');
    textDiv.innerHTML = html;
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
                    el.style.boxShadow = isHacker
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
            sugBtn.className = 'ai-suggestion-btn';
            sugBtn.textContent = h ? '> ' + sug[i] : sug[i];
            sugBtn.onclick = (function(s) {
                return function() { sendQuery(s); };
            })(sug[i]);
            sugDiv.appendChild(sugBtn);
        }
        content.appendChild(sugDiv);
    }

    // Feedback Buttons
    var fb = document.createElement('div');
    fb.className = 'ai-feedback';
    fb.innerHTML = '<span>Helpful?</span>' +
        '<button class="ai-fb-btn" onclick="this.parentElement.innerHTML=\'<span style=color:var(--success)>✅ Thanks!</span>\'">👍</button>' +
        '<button class="ai-fb-btn" onclick="this.parentElement.innerHTML=\'<span style=color:var(--accent)>😔 Try rephrasing.</span>\'">👎</button>';
    content.appendChild(fb);

    wrapper.appendChild(avatar);
    wrapper.appendChild(content);
    msgs.appendChild(wrapper);
    msgs.scrollTop = msgs.scrollHeight;
}


// Add User Message
function addUser(text) {
    var msgs = document.getElementById('aiMessages');
    var h = (currentTheme === 'hacker');

    var wrapper = document.createElement('div');
    wrapper.className = 'ai-msg user';

    var avatar = document.createElement('div');
    avatar.className = 'ai-msg-avatar user';
    avatar.textContent = h ? '💀' : '👤';

    var content = document.createElement('div');
    content.className = 'ai-msg-content user';
    content.textContent = text;

    wrapper.appendChild(content);
    wrapper.appendChild(avatar);
    msgs.appendChild(wrapper);
    msgs.scrollTop = msgs.scrollHeight;
}


// Typing Indicator
function showTyping() {
    var msgs = document.getElementById('aiMessages');
    var h = (currentTheme === 'hacker');

    var d = document.createElement('div');
    d.className = 'ai-typing';
    d.id = 'typingInd';

    var av = document.createElement('div');
    av.className = 'ai-msg-avatar bot';
    av.textContent = h ? '👾' : '🤖';

    var dots = document.createElement('div');
    dots.className = 'ai-typing-dots';
    dots.innerHTML = '<div class="ai-typing-dot"></div><div class="ai-typing-dot"></div><div class="ai-typing-dot"></div>';

    d.appendChild(av);
    d.appendChild(dots);
    msgs.appendChild(d);
    msgs.scrollTop = msgs.scrollHeight;
}

function hideTyping() {
    var t = document.getElementById('typingInd');
    if (t) t.remove();
}


// Send Message
function sendMessage() {
    var input = document.getElementById('aiInput');
    var q = input.value.trim();
    if (!q) return;
    input.value = '';
    input.style.height = 'auto';
    sendQuery(q);
}


// Process Query
function sendQuery(q) {
    var h = (currentTheme === 'hacker');

    // Handle hacker slash commands
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


// Hacker Slash Commands
function handleCmd(cmd) {
    addUser(cmd);
    showTyping();

    setTimeout(function() {
        hideTyping();
        var c = cmd.toLowerCase().trim();

        if (c === '/help') {
            addBot('> COMMANDS:<br>/tools /hash /rsa /encrypt /file /pass /sign /clear /about<br><br>Or just type naturally.', ['/tools', '/hash', '/rsa']);
        } else if (c === '/tools') {
            askCategory('tools');
        } else if (c === '/hash') {
            addBot('> LAUNCHING: Hash Generator...', [], 'tool-hash', 'Hash Generator');
        } else if (c === '/rsa') {
            addBot('> LAUNCHING: RSA Generator...', [], 'tool-rsa', 'RSA Key Generator');
        } else if (c === '/encrypt') {
            addBot('> LAUNCHING: Encrypt Tool...', [], 'tool-encrypt', 'Text Encrypt/Decrypt');
        } else if (c === '/file') {
            addBot('> LAUNCHING: File Integrity...', [], 'tool-integrity', 'File Integrity Checker');
        } else if (c === '/pass') {
            addBot('> LAUNCHING: Password Tools...', [], 'tool-password', 'Password Tools');
        } else if (c === '/sign') {
            addBot('> LAUNCHING: Digital Signature...', [], 'tool-signature', 'Digital Signature');
        } else if (c === '/clear') {
            document.getElementById('aiMessages').innerHTML = '';
            msgCount = 0;
            showWelcome();
        } else if (c === '/about') {
            sendQuery('about cryptokit');
        } else {
            addBot('> UNKNOWN: ' + cmd + '<br>> TYPE /help', ['/help']);
        }
    }, 400);
}


// Browse Category
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


// Clear Chat
function clearChat() {
    document.getElementById('aiMessages').innerHTML = '';
    msgCount = 0;
    showWelcome();
}


// Update AI Theme
function updateAiTheme(isH) {
    var fabIcon = document.getElementById('fabIcon');
    var aiAvatar = document.getElementById('aiAvatar');
    var aiName = document.getElementById('aiName');
    var aiStatus = document.getElementById('aiStatusText');
    var aiInput = document.querySelector('.ai-input');

    if (fabIcon) fabIcon.textContent = isH ? '👾' : '🤖';
    if (aiAvatar) aiAvatar.textContent = isH ? '👾' : '🤖';
    if (aiName) aiName.textContent = isH ? 'GHOST' : 'CryptoBot';
    if (aiStatus) aiStatus.textContent = isH ? 'ONLINE · SECURE' : 'Online · Ready';
    if (aiInput) aiInput.placeholder = isH
        ? '> TYPE QUERY OR /help...'
        : 'Ask me anything about cryptography...';
}


/* ═══════════════════════════════════════════════════════
   PARTICLE CANVAS - Normal Mode
═══════════════════════════════════════════════════════ */

var pCanvas = document.getElementById('particle-canvas');
var pCtx = pCanvas.getContext('2d');

function resizePC() {
    pCanvas.width = window.innerWidth;
    pCanvas.height = window.innerHeight;
}
resizePC();

var particles = [];
var HEX_CHARS = '0123456789ABCDEF';

function createParticle() {
    return {
        x: Math.random() * pCanvas.width,
        y: Math.random() * pCanvas.height,
        size: Math.random() * 10 + 8,
        speed: Math.random() * 0.4 + 0.2,
        opacity: Math.random() * 0.3 + 0.1,
        char: HEX_CHARS[Math.floor(Math.random() * HEX_CHARS.length)],
        color: Math.random() > 0.5 ? '#6C63FF' : '#00B4D8'
    };
}

for (var i = 0; i < 60; i++) {
    particles.push(createParticle());
}

var pAnimId;

function animateParticles() {
    if (currentTheme !== 'normal') return;
    pCtx.clearRect(0, 0, pCanvas.width, pCanvas.height);

    for (var i = 0; i < particles.length; i++) {
        var p = particles[i];
        p.y += p.speed;

        if (p.y > pCanvas.height) {
            particles[i] = createParticle();
            particles[i].y = 0;
        }

        if (Math.random() < 0.05) {
            p.char = HEX_CHARS[Math.floor(Math.random() * HEX_CHARS.length)];
        }

        pCtx.globalAlpha = p.opacity;
        pCtx.fillStyle = p.color;
        pCtx.font = p.size + 'px JetBrains Mono';
        pCtx.fillText(p.char, p.x, p.y);
    }

    pAnimId = requestAnimationFrame(animateParticles);
}

animateParticles();


/* ═══════════════════════════════════════════════════════
   MATRIX RAIN - Hacker Mode
═══════════════════════════════════════════════════════ */

var mCanvas = document.getElementById('matrix-canvas');
var mCtx = mCanvas.getContext('2d');

function resizeMC() {
    mCanvas.width = window.innerWidth;
    mCanvas.height = window.innerHeight;
}
resizeMC();

var matrixChars = 'アイウエオカキクケコサシスセソ0123456789ABCDEF{}[]<>|/*&^%$#@!';
var fontSize = 14;
var columns = Math.floor(mCanvas.width / fontSize);
var drops = [];
for (var i = 0; i < columns; i++) drops[i] = 1;

// Multiple colors for hacker mode matrix (dominantly green + rare accents)
var matrixColors = ['#00FF41', '#00FF41', '#00FF41', '#00FF41', '#00FF41', '#39FF14', '#39FF14', '#CCFF00', '#00E5FF'];

var mAnimId;

function drawMatrix() {
    if (currentTheme !== 'hacker') return;

    mCtx.fillStyle = 'rgba(0, 0, 0, 0.05)';
    mCtx.fillRect(0, 0, mCanvas.width, mCanvas.height);
    mCtx.font = fontSize + 'px Share Tech Mono';

    for (var i = 0; i < drops.length; i++) {
        var ch = matrixChars[Math.floor(Math.random() * matrixChars.length)];
        // White at head, colored trail
        if (drops[i] * fontSize < 50) {
            mCtx.fillStyle = '#FFFFFF';
        } else {
            mCtx.fillStyle = matrixColors[Math.floor(Math.random() * matrixColors.length)];
        }
        mCtx.fillText(ch, i * fontSize, drops[i] * fontSize);

        if (drops[i] * fontSize > mCanvas.height && Math.random() > 0.975) {
            drops[i] = 0;
        }
        drops[i]++;
    }

    mAnimId = requestAnimationFrame(drawMatrix);
}

// Handle window resize
window.addEventListener('resize', function() {
    resizePC();
    resizeMC();
    columns = Math.floor(mCanvas.width / fontSize);
    drops = [];
    for (var i = 0; i < columns; i++) drops[i] = 1;
});


/* ═══════════════════════════════════════════════════════
   TERMINAL ANIMATION
═══════════════════════════════════════════════════════ */

var macTermLines = [
    { type: 'prompt',  text: 'cryptokit hash --algo SHA-256 --input "Hello"' },
    { type: 'key',     text: 'Algorithm: ', val: 'SHA-256' },
    { type: 'value',   text: '185f8db32921bd46d35e5f139f501d393a6b...' },
    { type: 'success', text: '✅ Hash generated in 2ms' },
    { type: 'blank',   text: '' },
    { type: 'prompt',  text: 'cryptokit rsa --generate --bits 2048' },
    { type: 'success', text: '⚙  Generating RSA-2048 key pair...' },
    { type: 'key',     text: 'Public:  ', val: '-----BEGIN PUBLIC KEY-----' },
    { type: 'key',     text: 'Private: ', val: '-----BEGIN PRIVATE KEY-----' },
    { type: 'success', text: '✅ Keys generated in 180ms' },
    { type: 'blank',   text: '' },
    { type: 'prompt',  text: 'cryptokit verify --file report.pdf' },
    { type: 'value',   text: 'a3f5c8d2e1b4a7f9c2d5e8a1b4c7d0e3...' },
    { type: 'success', text: '✅ File integrity verified!' },
    { type: 'blank',   text: '' },
    { type: 'cursor',  text: '' }
];

var winTermLines = [
    { type: 'prompt',  text: 'cryptokit.exe hash /algo:SHA-256 /input:"Hello"' },
    { type: 'key',     text: 'Algorithm: ', val: 'SHA-256' },
    { type: 'value',   text: '185f8db32921bd46d35e5f139f501d393a6b...' },
    { type: 'success', text: '[OK] Hash generated in 2ms' },
    { type: 'blank',   text: '' },
    { type: 'prompt',  text: 'cryptokit.exe rsa /generate /bits:2048' },
    { type: 'success', text: '[...] Generating RSA-2048 key pair...' },
    { type: 'key',     text: 'Public:  ', val: '-----BEGIN PUBLIC KEY-----' },
    { type: 'key',     text: 'Private: ', val: '-----BEGIN PRIVATE KEY-----' },
    { type: 'success', text: '[OK] Keys generated in 180ms' },
    { type: 'blank',   text: '' },
    { type: 'prompt',  text: 'cryptokit.exe verify /file:report.pdf' },
    { type: 'value',   text: 'a3f5c8d2e1b4a7f9c2d5e8a1b4c7d0e3...' },
    { type: 'success', text: '[OK] File integrity verified!' },
    { type: 'blank',   text: '' },
    { type: 'cursor',  text: '' }
];

var termLines = macTermLines;
var termBody = document.getElementById('terminalBody');
var lineIdx = 0;

function addTermLine() {
    if (lineIdx >= termLines.length) {
        setTimeout(function() {
            termBody.innerHTML = '';
            lineIdx = 0;
            addTermLine();
        }, 3000);
        return;
    }

    var line = termLines[lineIdx];
    var el = document.createElement('div');
    el.className = 'terminal-line';

    if (line.type === 'prompt') {
        el.innerHTML = '<span class="terminal-prompt">❯ </span><span class="terminal-cmd">' + line.text + '</span>';
    } else if (line.type === 'key') {
        el.innerHTML = '<span class="terminal-key">&nbsp;&nbsp;' + line.text + '</span><span class="terminal-value">' + line.val + '</span>';
    } else if (line.type === 'value') {
        el.innerHTML = '<span class="terminal-value">&nbsp;&nbsp;' + line.text + '</span>';
    } else if (line.type === 'success') {
        el.innerHTML = '<span class="terminal-success">&nbsp;&nbsp;' + line.text + '</span>';
    } else if (line.type === 'cursor') {
        el.innerHTML = '<span class="terminal-prompt">❯ </span><span class="terminal-cursor"></span>';
    } else {
        el.innerHTML = '&nbsp;';
    }

    termBody.appendChild(el);
    termBody.scrollTop = termBody.scrollHeight;
    lineIdx++;

    var delay = (line.type === 'blank') ? 150 : (line.type === 'cursor') ? 0 : 550;
    setTimeout(addTermLine, delay);
}

// Start terminal after page loads
setTimeout(addTermLine, 800);



// ═══════════════════════════════════════════════════════
// TERMINAL OS SWITCHER — Uses YOUR existing CSS classes
// ═══════════════════════════════════════════════════════
const TERM_COMMANDS = {
    mac: {
        title: 'cryptokit ~ zsh',
        lines: [
            { type: 'cmd', prompt: '➜', cmd: 'cryptokit hash --algo SHA-256 --input "Hello"' },
            { type: 'out', html: '<span class="terminal-key">Algorithm:</span> <span class="terminal-value">SHA-256</span>' },
            { type: 'out', html: '<span class="terminal-value">185f8db32921bd46d35e5f139f501d393a6b...</span>' },
            { type: 'out', html: '<span class="terminal-success">✅ Hash generated in 2ms</span>' },
            { type: 'blank' },
            { type: 'cmd', prompt: '➜', cmd: 'cryptokit rsa --generate --bits 2048' },
            { type: 'out', html: '<span class="terminal-success">⚙ Generating RSA-2048 key pair...</span>' },
            { type: 'out', html: '<span class="terminal-key">Public:</span>  <span class="terminal-value">-----BEGIN PUBLIC KEY-----</span>' },
            { type: 'out', html: '<span class="terminal-key">Private:</span> <span class="terminal-value">-----BEGIN PRIVATE KEY-----</span>' },
            { type: 'out', html: '<span class="terminal-success">✅ Keys generated in 180ms</span>' },
            { type: 'blank' },
            { type: 'cmd', prompt: '➜', cmd: 'cryptokit verify --file report.pdf' },
            { type: 'out', html: '<span class="terminal-value">a3f5c8d2e1b4a7f9c2d5e8a1b4c7d0e3...</span>' },
            { type: 'out', html: '<span class="terminal-success">✅ File integrity verified!</span>' },
            { type: 'blank' },
            { type: 'cmd', prompt: '➜', cmd: '<span class="terminal-cursor"></span>' }
        ]
    },
    win: {
        title: 'C:\\CryptoKit> cmd.exe',
        lines: [
            { type: 'cmd', prompt: 'C:\\CryptoKit&gt;', cmd: 'cryptokit.exe hash /algo:SHA-256 /input:"Hello"' },
            { type: 'out', html: '<span class="terminal-key">Algorithm:</span> <span class="terminal-value">SHA-256</span>' },
            { type: 'out', html: '<span class="terminal-value">185F8DB32921BD46D35E5F139F501D393A6B...</span>' },
            { type: 'out', html: '<span class="terminal-success">[OK] Hash generated in 2ms</span>' },
            { type: 'blank' },
            { type: 'cmd', prompt: 'C:\\CryptoKit&gt;', cmd: 'cryptokit.exe rsa /generate /bits:2048' },
            { type: 'out', html: '<span class="terminal-success">[*] Generating RSA-2048 key pair...</span>' },
            { type: 'out', html: '<span class="terminal-key">Public:</span>  <span class="terminal-value">-----BEGIN PUBLIC KEY-----</span>' },
            { type: 'out', html: '<span class="terminal-key">Private:</span> <span class="terminal-value">-----BEGIN PRIVATE KEY-----</span>' },
            { type: 'out', html: '<span class="terminal-success">[OK] Keys generated in 180ms</span>' },
            { type: 'blank' },
            { type: 'cmd', prompt: 'C:\\CryptoKit&gt;', cmd: 'cryptokit.exe verify /file:report.pdf' },
            { type: 'out', html: '<span class="terminal-value">A3F5C8D2E1B4A7F9C2D5E8A1B4C7D0E3...</span>' },
            { type: 'out', html: '<span class="terminal-success">[OK] File integrity verified!</span>' },
            { type: 'blank' },
            { type: 'cmd', prompt: 'C:\\CryptoKit&gt;', cmd: '<span class="terminal-cursor"></span>' }
        ]
    }
};

function renderTerminal(os) {
    const body  = document.getElementById('terminalBody');
    const title = document.getElementById('terminalTitle');
    if (!body || !title) return;

    const data = TERM_COMMANDS[os];
    title.textContent = data.title;

    let html = '';
    data.lines.forEach((line, i) => {
        // stagger the fade-in animation
        const delay = `style="animation-delay:${i * 0.05}s"`;
        if (line.type === 'blank') {
            html += `<div class="terminal-line" ${delay}>&nbsp;</div>`;
        } else if (line.type === 'cmd') {
            html += `<div class="terminal-line" ${delay}><span class="terminal-prompt">${line.prompt}</span> <span class="terminal-cmd">${line.cmd}</span></div>`;
        } else if (line.type === 'out') {
            html += `<div class="terminal-line" ${delay}>${line.html}</div>`;
        }
    });
    body.innerHTML = html;
}

function switchTermOS(os) {
    const macBtn = document.getElementById('osMac');
    const winBtn = document.getElementById('osWin');
    if (macBtn) macBtn.classList.toggle('active', os === 'mac');
    if (winBtn) winBtn.classList.toggle('active', os === 'win');
    renderTerminal(os);
}

// Initialize on page load
document.addEventListener('DOMContentLoaded', () => {
    renderTerminal('mac');
});



/* ═══════════════════════════════════════════════════════
   THEME TOGGLE - BOOT MESSAGES
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
    var textEl = document.getElementById('transitionText');
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
   ⭐ MODE DROPDOWN SELECTOR (SINGLE CLEAN VERSION)
═══════════════════════════════════════════════════════ */

function toggleModeDropdown() {
    var dropdown = document.getElementById('modeDropdown');
    var arrow = document.getElementById('modeArrow');
    if (dropdown) dropdown.classList.toggle('open');
    if (arrow) arrow.classList.toggle('open');
}

// Close dropdown when clicking outside
document.addEventListener('click', function(e) {
    var selector = document.getElementById('modeSelector');
    if (selector && !selector.contains(e.target)) {
        var dd = document.getElementById('modeDropdown');
        var ar = document.getElementById('modeArrow');
        if (dd) dd.classList.remove('open');
        if (ar) ar.classList.remove('open');
    }
});

// Mobile theme quick switch
function mobileThemeSwitch() {
    var newMode = (currentTheme === 'normal') ? 'hacker' : 'normal';
    selectMode(newMode);
}

// MAIN MODE SELECTOR FUNCTION
function selectMode(mode) {

    // Step 1: Close the dropdown
    var dd = document.getElementById('modeDropdown');
    var ar = document.getElementById('modeArrow');
    if (dd) dd.classList.remove('open');
    if (ar) ar.classList.remove('open');

    // Step 2: Skip if already in this mode
    if (mode === currentTheme) return;

    // Step 3: Pick the right boot messages
    var isGoingHacker = (mode === 'hacker');
    var bootMsgs = isGoingHacker ? hackerBoot : normalBoot;

    // Step 4: Show transition overlay, then switch everything
    showTransition(bootMsgs, function() {

        if (isGoingHacker) {
            // ── SWITCH TO HACKER ──
            currentTheme = 'hacker';
            document.documentElement.setAttribute('data-theme', 'hacker');
            localStorage.setItem('cryptokit-theme', 'hacker');

            // Stop normal particles
            cancelAnimationFrame(pAnimId);
            pCtx.clearRect(0, 0, pCanvas.width, pCanvas.height);

            // Start matrix rain
            mCtx.clearRect(0, 0, mCanvas.width, mCanvas.height);
            columns = Math.floor(mCanvas.width / fontSize);
            drops = [];
            for (var i = 0; i < columns; i++) drops[i] = 1;
            drawMatrix();

            // Update dropdown UI
            var mi = document.getElementById('modeIcon');
            var ml = document.getElementById('modeLabel');
            var cn = document.getElementById('checkNormal');
            var ch = document.getElementById('checkHacker');
            if (mi) mi.textContent = '💀';
            if (ml) ml.textContent = 'Hacker';
            if (cn) cn.style.display = 'none';
            if (ch) ch.style.display = 'inline';

            // Update AI assistant
            updateAiTheme(true);

        } else {
            // ── SWITCH TO NORMAL ──
            currentTheme = 'normal';
            document.documentElement.setAttribute('data-theme', 'normal');
            localStorage.setItem('cryptokit-theme', 'normal');

            // Stop matrix rain
            cancelAnimationFrame(mAnimId);
            mCtx.clearRect(0, 0, mCanvas.width, mCanvas.height);

            // Start normal particles
            animateParticles();

            // Update dropdown UI
            var mi2 = document.getElementById('modeIcon');
            var ml2 = document.getElementById('modeLabel');
            var cn2 = document.getElementById('checkNormal');
            var ch2 = document.getElementById('checkHacker');
            if (mi2) mi2.textContent = '☀️';
            if (ml2) ml2.textContent = 'Normal';
            if (cn2) cn2.style.display = 'inline';
            if (ch2) ch2.style.display = 'none';

            // Update AI assistant
            updateAiTheme(false);
        }

        // Refresh AI chat if it was open
        if (chatOpen && msgCount > 0) {
            document.getElementById('aiMessages').innerHTML = '';
            msgCount = 0;
            showWelcome();
        }
    });
}

// Keep toggleTheme as a wrapper (for backwards compatibility)
function toggleTheme() {
    var newMode = (currentTheme === 'normal') ? 'hacker' : 'normal';
    selectMode(newMode);
}


/* ═══════════════════════════════════════════════════════
   NAVBAR & MOBILE MENU
═══════════════════════════════════════════════════════ */

var navbar = document.getElementById('navbar');
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
   LIVE DEMO FUNCTIONALITY
═══════════════════════════════════════════════════════ */

var demoMode = 'hash';

function setDemoTab(btn, mode) {
    var tabs = document.querySelectorAll('.demo-tab');
    for (var i = 0; i < tabs.length; i++) {
        tabs[i].classList.remove('active');
    }
    btn.classList.add('active');
    demoMode = mode;

    var sel = document.getElementById('demoAlgo');
    var inp = document.getElementById('demoInput');

    if (mode === 'hash') {
        sel.style.display = 'block';
        inp.placeholder = 'Type text to hash...';
    } else if (mode === 'base64') {
        sel.style.display = 'none';
        inp.placeholder = 'Type text to encode in Base64...';
    } else {
        sel.style.display = 'none';
        inp.placeholder = 'Enter a password to check strength...';
    }

    document.getElementById('demoResult').innerHTML =
        '<span class="demo-result-placeholder">Your result will appear here...</span>';
}

// Hash Functions
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

// Password Strength
function getPassStrength(p) {
    var s = 0;
    if (p.length >= 8) s++;
    if (p.length >= 12) s++;
    if (p.length >= 16) s++;
    if (/[A-Z]/.test(p)) s++;
    if (/[a-z]/.test(p)) s++;
    if (/[0-9]/.test(p)) s++;
    if (/[^A-Za-z0-9]/.test(p)) s++;

    if (s <= 2) return { label: '❌ Very Weak', color: '#FF4444' };
    if (s <= 3) return { label: '⚠️ Weak', color: '#FF8C00' };
    if (s <= 4) return { label: '🟡 Fair', color: '#FFD700' };
    if (s <= 5) return { label: '🟢 Strong', color: '#00CC66' };
    return { label: '✅ Very Strong', color: '#00FF88' };
}

// Run Demo
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

        if (algo === 'sha256') hashPromise = sha256Hash(val);
        else if (algo === 'sha512') hashPromise = sha512Hash(val);
        else hashPromise = Promise.resolve(fakeMd5(val));

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

// Copy to Clipboard
function copyResult(text) {
    navigator.clipboard.writeText(text).then(function() {
        var btn = document.querySelector('.btn-copy');
        if (btn) {
            var orig = btn.innerHTML;
            btn.innerHTML = '<i class="fas fa-check"></i> Copied!';
            btn.style.background = 'var(--success)';
            btn.style.color = '#000';
            setTimeout(function() {
                btn.innerHTML = orig;
                btn.style.background = '';
                btn.style.color = '';
            }, 2000);
        }
    });
}


/* ═══════════════════════════════════════════════════════
   INTERSECTION OBSERVERS
═══════════════════════════════════════════════════════ */

// Fade Up Observer
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
for (var i = 0; i < fadeEls.length; i++) {
    observer.observe(fadeEls[i]);
}

// Stats Counter Observer
function animateCounter(el) {
    var target = parseInt(el.getAttribute('data-target'));
    var suffix = el.getAttribute('data-suffix') || '';

    if (target === 0) {
        el.textContent = '0' + suffix;
        return;
    }

    var current = 0;
    var step = target / 60;
    var timer = setInterval(function() {
        current += step;
        if (current >= target) {
            current = target;
            clearInterval(timer);
        }
        el.textContent = Math.floor(current) + suffix;
    }, 20);
}

var statsObserver = new IntersectionObserver(function(entries) {
    entries.forEach(function(entry) {
        if (entry.isIntersecting) {
            var nums = entry.target.querySelectorAll('.stat-number');
            for (var i = 0; i < nums.length; i++) {
                animateCounter(nums[i]);
            }
            statsObserver.unobserve(entry.target);
        }
    });
}, { threshold: 0.3 });

var statContainers = document.querySelectorAll('.stats-container');
for (var i = 0; i < statContainers.length; i++) {
    statsObserver.observe(statContainers[i]);
}


/* ═══════════════════════════════════════════════════════
   FEEDBACK FORM FUNCTIONS
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

    if (currentRating === 0) {
        alert('Please select a rating!');
        return false;
    }

    // Get form data
    var form = document.getElementById('feedbackForm');
    var inputs = form.querySelectorAll('input, textarea');
    var name = inputs[0].value;

    // Show success message
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
   🚀 LOAD SAVED THEME ON PAGE LOAD
═══════════════════════════════════════════════════════ */

window.addEventListener('DOMContentLoaded', function() {
    var savedTheme = localStorage.getItem('cryptokit-theme');
    if (savedTheme && savedTheme !== currentTheme) {
        // Silently apply saved theme without transition overlay
        currentTheme = (savedTheme === 'hacker') ? 'normal' : 'hacker'; // Trick selectMode to switch
        selectMode(savedTheme);
    }
});