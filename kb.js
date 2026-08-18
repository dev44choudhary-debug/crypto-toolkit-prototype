/* ═══════════════════════════════════════════════════════
   AI KNOWLEDGE BASE — CRYPTOKIT (EXPANDED)
═══════════════════════════════════════════════════════ */

var KB = [

    // ╔═══════════════════════════════════════╗
    // ║         TOOL NAVIGATION               ║
    // ╚═══════════════════════════════════════╝

    {
        id: 'hash',
        kw: ['hash','sha256','sha-256','sha512','md5','blake','checksum','digest','generate hash','hashing','hash generator','sha1','sha-1','sha3','keccak'],
        cat: 'tools',
        ans: '<strong>Hash Generator</strong> 🔐<br><br>✅ Hash any text instantly<br>✅ Choose MD5, SHA-1, SHA-256, SHA-512, SHA-3<br>✅ Generate all hashes at once<br>✅ Copy with one click<br><br><em>💡 Use SHA-256 or higher for security.</em>',
        tid: 'tool-hash',
        tn: 'Hash Generator',
        sg: ['Is MD5 safe?', 'SHA-256 vs SHA-512?', 'What is a hash?', 'What is SHA-3?']
    },
    {
        id: 'file',
        kw: ['file','integrity','tamper','tampered','changed','verify file','check file','file hash','modified','corrupted','authenticity','file verification'],
        cat: 'tools',
        ans: '<strong>File Integrity Checker</strong> 📁<br><br>✅ Upload file to generate hash<br>✅ Paste original hash to compare<br>✅ Detect any modification instantly<br>✅ Supports SHA-256, SHA-512, MD5<br><br><em>💡 Great for verifying downloads and detecting tampering.</em>',
        tid: 'tool-integrity',
        tn: 'File Integrity Checker',
        sg: ['What is SHA-256?', 'Verify a file', 'How does file integrity work?']
    },
    {
        id: 'rsa',
        kw: ['rsa','key pair','public key','private key','generate key','asymmetric','key size','2048','4096','pem','keypair','rsa key'],
        cat: 'tools',
        ans: '<strong>RSA Key Generator</strong> 🔑<br><br>✅ Generate RSA pairs (1024–4096 bits)<br>✅ Analyze key strength<br>✅ Export in PEM format<br>✅ Security recommendations included<br><br><em>💡 Use RSA-2048 minimum; RSA-4096 for long-term security.</em>',
        tid: 'tool-rsa',
        tn: 'RSA Key Generator',
        sg: ['Safe key size?', 'What is RSA?', 'RSA vs ECC?']
    },
    {
        id: 'enc',
        kw: ['encrypt','decrypt','aes','cipher','secret','message','lock','unlock','encryption','decryption','aes-256','symmetric encrypt'],
        cat: 'tools',
        ans: '<strong>Text Encrypt/Decrypt</strong> 🔒<br><br>✅ AES-256 encryption<br>✅ RSA public key encryption<br>✅ Encrypt any text or message<br>✅ Decrypt with your key<br><br><em>💡 AES-256 is the gold standard for symmetric encryption.</em>',
        tid: 'tool-encrypt',
        tn: 'Text Encrypt/Decrypt',
        sg: ['AES vs RSA?', 'What is AES-256?', 'What is symmetric encryption?']
    },
    {
        id: 'sig',
        kw: ['sign','signature','verify sign','digital sign','digital signature','ecdsa','rsa-pss','sign document'],
        cat: 'tools',
        ans: '<strong>Digital Signature</strong> ✍️<br><br>✅ Sign documents with private key<br>✅ Verify authenticity with public keys<br>✅ RSA-PSS and ECDSA support<br>✅ Non-repudiation guaranteed<br><br><em>💡 Proves both identity and data integrity.</em>',
        tid: 'tool-signature',
        tn: 'Digital Signature',
        sg: ['What is a digital signature?', 'ECDSA vs RSA?', 'What is non-repudiation?']
    },
    {
        id: 'pass',
        kw: ['password','strength','weak password','strong password','secure password','generate password','entropy','brute force','crack password','password checker'],
        cat: 'tools',
        ans: '<strong>Password Tools</strong> 🛡️<br><br>✅ Check password strength instantly<br>✅ Estimated crack time displayed<br>✅ Generate cryptographically secure passwords<br>✅ Entropy calculations shown<br><br><em>💡 Use 16+ characters with mixed case, numbers & symbols.</em>',
        tid: 'tool-password',
        tn: 'Password Tools',
        sg: ['What is entropy?', 'Strong password tips', 'What is brute force?']
    },


    // ╔═══════════════════════════════════════╗
    // ║         HASHING — DEEP KNOWLEDGE      ║
    // ╚═══════════════════════════════════════╝

    {
        id: 'whash',
        kw: ['what is hash','what is hashing','how hash work','explain hash','hash function','hash basics'],
        cat: 'learn',
        ans: '<strong>What is a Hash Function?</strong> 🔐<br><br>A hash function takes <em>any</em> input and produces a fixed-length fingerprint called a <em>digest</em>.<br><br><strong>Key Properties:</strong><br>• <strong>One-way</strong> — Cannot be reversed<br>• <strong>Deterministic</strong> — Same input always = same output<br>• <strong>Avalanche Effect</strong> — Tiny change → completely different hash<br>• <strong>Fixed Length</strong> — SHA-256 always = 64 hex characters<br>• <strong>Collision Resistant</strong> — Two inputs rarely share a hash<br><br><strong>Common Uses:</strong><br>🔹 Password storage<br>🔹 File integrity verification<br>🔹 Digital signatures<br>🔹 Blockchain transaction IDs',
        sg: ['Is MD5 safe?', 'SHA-256 vs SHA-512?', 'Hash Generator', 'What is SHA-3?']
    },
    {
        id: 'sha256',
        kw: ['sha256','sha-256','what is sha256','sha 256','sha256 explained','how sha256 works'],
        cat: 'learn',
        ans: '<strong>What is SHA-256?</strong> 🔐<br><br>SHA-256 (Secure Hash Algorithm 256-bit) is part of the SHA-2 family designed by the <strong>NSA</strong> and published by NIST in 2001.<br><br><strong>Key Facts:</strong><br>• Output: <strong>256 bits</strong> (64 hex characters)<br>• Rounds: <strong>64 compression rounds</strong><br>• Used in: Bitcoin, SSL/TLS, code signing, file integrity<br>• Never broken or compromised<br><br><strong>Example:</strong><br>Input: <code>hello</code><br>Output: <code>2cf24dba5fb0a30e...</code><br><br><em>💡 SHA-256 is the most widely deployed hash algorithm today.</em>',
        sg: ['SHA-256 vs SHA-512?', 'What is Bitcoin?', 'Generate a hash']
    },
    {
        id: 'sha512',
        kw: ['sha512','sha-512','what is sha512','sha 512','sha512 explained'],
        cat: 'learn',
        ans: '<strong>What is SHA-512?</strong> 🔐<br><br>SHA-512 is the 512-bit variant of the SHA-2 family — stronger and longer than SHA-256.<br><br><strong>Key Facts:</strong><br>• Output: <strong>512 bits</strong> (128 hex characters)<br>• More resistant to length-extension attacks<br>• Faster than SHA-256 on 64-bit processors<br>• Ideal for high-security applications<br><br><strong>SHA-256 vs SHA-512:</strong><br>🔹 SHA-256 → Most apps, blockchain<br>🔹 SHA-512 → Maximum security, enterprise systems<br><br><em>💡 Both are equally unbroken — SHA-512 just provides more margin.</em>',
        sg: ['SHA-256 vs SHA-512?', 'What is SHA-3?', 'Hash Generator']
    },
    {
        id: 'sha3',
        kw: ['sha3','sha-3','what is sha3','sha 3','keccak','sha3 explained','nist hash'],
        cat: 'learn',
        ans: '<strong>What is SHA-3?</strong> 🔐<br><br>SHA-3 is the <em>newest</em> member of the Secure Hash Algorithm family, standardized by NIST in <strong>2015</strong>.<br><br><strong>Based on Keccak Algorithm:</strong><br>• Completely different internal design from SHA-1/SHA-2<br>• Uses <strong>sponge construction</strong> (absorb & squeeze)<br>• Immune to length-extension attacks<br>• Variants: SHA3-224, SHA3-256, SHA3-384, SHA3-512<br><br><strong>Why SHA-3 Exists:</strong><br>🔹 Backup if SHA-2 is ever broken<br>🔹 Different mathematical structure = different attack surface<br><br><em>💡 Ethereum uses Keccak-256 (a variant of SHA-3).</em>',
        sg: ['SHA-256 vs SHA-3?', 'What is Ethereum?', 'Hash Generator']
    },
    {
        id: 'sha1',
        kw: ['sha1','sha-1','what is sha1','sha 1','is sha1 safe','sha1 broken'],
        cat: 'security',
        ans: '<strong>⚠️ SHA-1 is Deprecated!</strong><br><br>SHA-1 produces a 160-bit digest but has been <strong>broken</strong>.<br><br><strong>Why SHA-1 is Unsafe:</strong><br>❌ Collision attack demonstrated by Google (SHAttered, 2017)<br>❌ Two different PDFs with identical SHA-1 hash proven<br>❌ Removed from TLS/SSL standards<br>❌ No longer accepted by modern browsers<br><br><strong>Use Instead:</strong><br>✅ SHA-256 — General purpose<br>✅ SHA-512 — High security<br>✅ SHA-3 — Future-proof<br><br><em>💡 Never use SHA-1 for security-critical applications.</em>',
        sg: ['Try SHA-256', 'What is SHA-3?', 'Hash Generator']
    },
    {
        id: 'md5s',
        kw: ['md5 safe','is md5 safe','md5 secure','should i use md5','md5 broken','md5 weak','md5'],
        cat: 'security',
        ans: '<strong>⚠️ MD5 is NOT Safe for Security!</strong><br><br>MD5 (Message Digest 5) produces a 128-bit hash but has been <strong>critically broken since 2004</strong>.<br><br><strong>Why MD5 Fails:</strong><br>❌ Collision attacks proven (two files → same MD5)<br>❌ Rainbow table attacks crack passwords in seconds<br>❌ GPU can compute <strong>10 billion MD5/second</strong><br>❌ Flame malware used MD5 collision to forge Microsoft certificate<br><br><strong>Acceptable MD5 Uses (non-security):</strong><br>🔹 Checksums for accidental corruption (not tampering)<br>🔹 Non-cryptographic data deduplication<br><br><strong>Use Instead:</strong><br>✅ SHA-256 — General purpose<br>✅ SHA-512 — High security<br>✅ Argon2/bcrypt — Passwords',
        sg: ['Try SHA-256', 'Hash Generator', 'What is bcrypt?']
    },
    {
        id: 'blake2',
        kw: ['blake','blake2','blake3','blake hash','what is blake2','blake2 explained'],
        cat: 'learn',
        ans: '<strong>What is BLAKE2/BLAKE3?</strong> ⚡<br><br>BLAKE2 and BLAKE3 are modern cryptographic hash functions designed as <strong>faster and safer</strong> alternatives to MD5 and SHA-2.<br><br><strong>BLAKE2 Features:</strong><br>• Faster than MD5 yet more secure than SHA-3<br>• No length-extension attacks<br>• Built-in keying (like HMAC)<br>• Output size: configurable up to 512 bits<br><br><strong>BLAKE3 Features:</strong><br>• Even faster — parallelizable internally<br>• Single algorithm (no variants needed)<br>• Used in: Zcash, WireGuard, various file hashers<br><br><em>💡 BLAKE3 is the fastest cryptographic hash function available today.</em>',
        sg: ['Hash Generator', 'SHA-256 vs BLAKE2?', 'What is SHA-3?']
    },
    {
        id: 'hmac',
        kw: ['hmac','hash mac','message authentication','hmac sha256','what is hmac','mac cryptography'],
        cat: 'learn',
        ans: '<strong>What is HMAC?</strong> 🔏<br><br>HMAC (Hash-based Message Authentication Code) combines a <strong>hash function</strong> with a <strong>secret key</strong> to verify both integrity and authenticity.<br><br><strong>How It Works:</strong><br>1. Take message + secret key<br>2. Apply inner hash<br>3. Apply outer hash<br>4. Produce authentication tag<br><br><strong>Key Properties:</strong><br>• <strong>Integrity</strong> — Message not altered<br>• <strong>Authenticity</strong> — Sender knows the key<br>• Resists length-extension attacks<br><br><strong>Common Uses:</strong><br>🔹 JWT tokens (HMAC-SHA256)<br>🔹 API authentication<br>🔹 TLS record verification<br><br><em>💡 HMAC-SHA256 is widely used in secure API design.</em>',
        sg: ['What is SHA-256?', 'What is a digital signature?', 'What is JWT?']
    },
    {
        id: 'rainbow',
        kw: ['rainbow table','rainbow attack','precomputed hash','lookup table','hash cracking','hash attack'],
        cat: 'security',
        ans: '<strong>What is a Rainbow Table Attack?</strong> 🌈<br><br>A rainbow table is a <strong>precomputed database</strong> of hash values used to crack passwords without brute force.<br><br><strong>How It Works:</strong><br>1. Attacker steals password hashes from database<br>2. Looks up hash in precomputed table<br>3. Finds original password in seconds<br><br><strong>Defense — Password Salting:</strong><br>• Add random <strong>salt</strong> before hashing<br>• Even same password → different hash each time<br>• Rainbow tables become useless<br><br><strong>Best Password Hashing:</strong><br>✅ <strong>Argon2id</strong> — Winner of Password Hashing Competition<br>✅ <strong>bcrypt</strong> — Intentionally slow<br>✅ <strong>scrypt</strong> — Memory-hard<br><br><em>💡 Never store plain-text or unsalted password hashes.</em>',
        sg: ['What is salting?', 'What is bcrypt?', 'Password Tools']
    },
    {
        id: 'salting',
        kw: ['salt','salting','password salt','what is salt','hash salt','salted hash'],
        cat: 'learn',
        ans: '<strong>What is Password Salting?</strong> 🧂<br><br>A <strong>salt</strong> is a random value added to a password before hashing to prevent rainbow table attacks.<br><br><strong>Without Salt:</strong><br>❌ password123 → <code>482c811da5d5...</code> (same every time)<br><br><strong>With Salt:</strong><br>✅ password123 + <code>xK9#mP</code> → unique hash<br>✅ password123 + <code>aZ2$nQ</code> → completely different hash<br><br><strong>Rules for Salting:</strong><br>• Salt must be <strong>random</strong> for each user<br>• Salt stored alongside hash (not secret)<br>• Salt length: minimum 16 bytes<br><br><em>💡 Modern frameworks (bcrypt, Argon2) handle salting automatically.</em>',
        sg: ['Rainbow table attacks?', 'What is bcrypt?', 'Password Tools']
    },
    {
        id: 'bcrypt',
        kw: ['bcrypt','what is bcrypt','argon2','scrypt','password hashing','slow hash','work factor'],
        cat: 'learn',
        ans: '<strong>What is bcrypt?</strong> 🔒<br><br>bcrypt is a <strong>password hashing function</strong> specifically designed to be slow — making brute force attacks expensive.<br><br><strong>Key Features:</strong><br>• Built-in salting (automatic)<br>• <strong>Work factor</strong> (cost factor) — adjustable difficulty<br>• Higher cost = exponentially slower<br>• Cost 10 → ~100ms; Cost 14 → ~1.6 seconds<br><br><strong>Password Hashing Comparison:</strong><br>❌ MD5/SHA-256 → Too fast (not for passwords)<br>✅ bcrypt → Good (widely supported)<br>✅ scrypt → Memory-hard (GPU resistant)<br>✅ Argon2id → Best (PHC winner, recommended by OWASP)<br><br><em>💡 OWASP recommends Argon2id as the first choice for new systems.</em>',
        sg: ['What is salting?', 'Rainbow table attack?', 'Strong password tips']
    },
    {
        id: 'collision',
        kw: ['collision','hash collision','birthday attack','birthday paradox','collision resistance','collision attack'],
        cat: 'learn',
        ans: '<strong>What is a Hash Collision?</strong> 💥<br><br>A collision occurs when <strong>two different inputs produce the same hash output</strong>.<br><br><strong>Birthday Paradox:</strong><br>• In a group of 23 people → 50% chance two share a birthday<br>• Similarly: with enough attempts → collision probability rises<br>• A 256-bit hash needs ~2¹²⁸ attempts to find collision<br><br><strong>Real Collisions Found:</strong><br>❌ MD5 → Collisions found (2004)<br>❌ SHA-1 → Collisions found (2017, SHAttered)<br>✅ SHA-256 → No collisions found<br>✅ SHA-3 → No collisions found<br><br><strong>Collision Resistance Levels:</strong><br>• MD5 (128-bit) → 2⁶⁴ work to find collision ❌<br>• SHA-256 (256-bit) → 2¹²⁸ work ✅<br>• SHA-512 (512-bit) → 2²⁵⁶ work ✅<br><br><em>💡 Collision resistance is why longer hashes are more secure.</em>',
        sg: ['Is MD5 safe?', 'What is SHA-256?', 'Hash Generator']
    },
    {
        id: 'merkle',
        kw: ['merkle tree','merkle root','hash tree','merkle proof','what is merkle','merkle explained'],
        cat: 'learn',
        ans: '<strong>What is a Merkle Tree?</strong> 🌳<br><br>A Merkle tree is a <strong>tree of hash values</strong> where every leaf is a data hash and every branch is a hash of its children.<br><br><strong>How It Works:</strong><br>1. Hash each data block → leaf nodes<br>2. Hash pairs of leaves → branch nodes<br>3. Repeat until single hash → <strong>Merkle Root</strong><br><br><strong>Why It Matters:</strong><br>• Verify ANY single transaction without downloading all data<br>• Tamper-proof — changing one block changes the root<br>• Efficient — O(log n) verification<br><br><strong>Used In:</strong><br>🔹 Bitcoin block headers<br>🔹 Ethereum state trees<br>🔹 Git version control<br>🔹 Certificate Transparency logs<br><br><em>💡 Bitcoin uses Merkle trees to efficiently prove transactions exist in a block.</em>',
        sg: ['What is Bitcoin?', 'What is blockchain?', 'How does Bitcoin use hashing?']
    },


    // ╔═══════════════════════════════════════╗
    // ║       SYMMETRIC ENCRYPTION            ║
    // ╚═══════════════════════════════════════╝

    {
        id: 'waes',
        kw: ['what is aes','explain aes','aes algorithm','aes-256','symmetric encryption','how aes works','aes encryption'],
        cat: 'learn',
        ans: '<strong>What is AES?</strong> 🔒<br><br>AES (Advanced Encryption Standard) is the world\'s most trusted symmetric encryption algorithm, adopted by NIST in <strong>2001</strong>.<br><br><strong>Key Variants:</strong><br>• AES-128 → 128-bit key, 10 rounds<br>• AES-192 → 192-bit key, 12 rounds<br>• AES-256 → 256-bit key, 14 rounds ✅ (recommended)<br><br><strong>How It Works:</strong><br>1. Divide data into 128-bit blocks<br>2. Apply multiple rounds of substitution, permutation, mixing<br>3. Key expansion used each round<br><br><strong>Used By:</strong><br>🔹 US Government (Top Secret documents)<br>🔹 WhatsApp, Signal, iMessage<br>🔹 Banking systems, VPNs, TLS<br><br><em>AES-256 has NEVER been cracked. Brute force would take longer than the age of the universe!</em>',
        sg: ['AES vs RSA?', 'Encryption Tool', 'What are cipher modes?']
    },
    {
        id: 'aesmodes',
        kw: ['aes modes','cipher mode','ecb','cbc','gcm','ctr mode','aes-gcm','aes-cbc','what is gcm','what is cbc'],
        cat: 'learn',
        ans: '<strong>AES Cipher Modes</strong> 🔒<br><br>AES itself is a block cipher — cipher <em>modes</em> define how blocks are chained together.<br><br><strong>ECB (Electronic Codebook):</strong><br>❌ Each block encrypted independently<br>❌ Identical plaintext blocks → identical ciphertext (leaks patterns!)<br>❌ Never use for real data<br><br><strong>CBC (Cipher Block Chaining):</strong><br>✅ Each block XORed with previous ciphertext<br>✅ Requires IV (Initialization Vector)<br>⚠️ No built-in authentication<br><br><strong>CTR (Counter Mode):</strong><br>✅ Turns block cipher into stream cipher<br>✅ Parallelizable<br>⚠️ No built-in authentication<br><br><strong>GCM (Galois/Counter Mode):</strong><br>✅ Encryption + Authentication together (AEAD)<br>✅ Detects tampering automatically<br>✅ Used in TLS 1.3, HTTPS<br>✅ <strong>Recommended default</strong><br><br><em>💡 Always use AES-256-GCM for new applications.</em>',
        sg: ['What is AES?', 'What is TLS?', 'Encryption Tool']
    },
    {
        id: 'des',
        kw: ['des','des encryption','what is des','data encryption standard','3des','triple des','des algorithm'],
        cat: 'learn',
        ans: '<strong>What is DES?</strong> 🔓<br><br>DES (Data Encryption Standard) was the US government\'s encryption standard from <strong>1977 to 2001</strong> — now considered <strong>obsolete and broken</strong>.<br><br><strong>DES Specifications:</strong><br>• Key size: <strong>56 bits</strong> (critically small)<br>• Block size: 64 bits<br>• 16 Feistel rounds<br><br><strong>Why DES Failed:</strong><br>❌ 56-bit key → only 2⁵⁶ possible keys<br>❌ Cracked in <strong>22 hours</strong> by EFF DES Cracker (1999)<br>❌ Modern hardware can crack in seconds<br><br><strong>Triple DES (3DES):</strong><br>• Applies DES three times (Encrypt → Decrypt → Encrypt)<br>• Effective key: 112 bits<br>⚠️ Still slow, deprecated by NIST in 2017<br><br><strong>Use Instead:</strong><br>✅ AES-256 — Faster, stronger, modern<br><br><em>💡 DES is a landmark in cryptographic history — but never use it today.</em>',
        sg: ['What is AES?', 'AES vs DES?', 'Encryption Tool']
    },
    {
        id: 'rc4',
        kw: ['rc4','rc4 cipher','what is rc4','stream cipher','rc4 broken','rc4 weak'],
        cat: 'security',
        ans: '<strong>⚠️ RC4 is Broken — Do Not Use!</strong><br><br>RC4 was once the most widely used stream cipher (used in WEP, early SSL/TLS).<br><br><strong>Why RC4 Failed:</strong><br>❌ Statistical biases in keystream<br>❌ BEAST, POODLE, RC4 attacks in TLS<br>❌ Prohibited by RFC 7465 in TLS<br>❌ WEP (WiFi) completely broken due to RC4<br><br><strong>Safe Stream Cipher Alternatives:</strong><br>✅ <strong>ChaCha20-Poly1305</strong> — Used in TLS 1.3, WireGuard<br>✅ <strong>AES-GCM</strong> — Hardware accelerated<br><br><em>💡 ChaCha20-Poly1305 is the modern RC4 replacement endorsed by Google.</em>',
        sg: ['What is AES?', 'What is TLS?', 'What is ChaCha20?']
    },
    {
        id: 'chacha20',
        kw: ['chacha20','chacha','chacha20-poly1305','what is chacha20','stream cipher','salsa20'],
        cat: 'learn',
        ans: '<strong>What is ChaCha20-Poly1305?</strong> ⚡<br><br>ChaCha20-Poly1305 is a modern <strong>authenticated encryption</strong> cipher designed by Daniel J. Bernstein.<br><br><strong>ChaCha20 (Stream Cipher):</strong><br>• 256-bit key, 96-bit nonce<br>• 20 rounds of ARX operations (Add, Rotate, XOR)<br>• No lookup tables → immune to timing attacks<br><br><strong>Poly1305 (MAC):</strong><br>• Authenticates the ciphertext<br>• Detects any tampering<br><br><strong>Advantages over AES-GCM:</strong><br>✅ Faster on devices without AES hardware<br>✅ Safer nonce handling<br>✅ Used in: TLS 1.3, WireGuard, SSH, Noise Protocol<br><br><em>💡 Signal and WhatsApp use ChaCha20-Poly1305 on mobile devices.</em>',
        sg: ['What is AES-GCM?', 'What is TLS?', 'Encryption Tool']
    },
    {
        id: 'sym',
        kw: ['symmetric','symmetric encryption','symmetric key','symmetric algorithm','same key','secret key encryption'],
        cat: 'learn',
        ans: '<strong>What is Symmetric Encryption?</strong> 🔑<br><br>Symmetric encryption uses the <strong>same key</strong> to both encrypt and decrypt data.<br><br><strong>How It Works:</strong><br>Sender: plaintext + key → ciphertext<br>Receiver: ciphertext + same key → plaintext<br><br><strong>Advantages:</strong><br>✅ Extremely fast (hardware accelerated)<br>✅ Suitable for large data<br>✅ Simple key structure<br><br><strong>Disadvantages:</strong><br>❌ Key distribution problem — how to securely share the key?<br>❌ N people need N(N-1)/2 unique keys<br><br><strong>Common Symmetric Algorithms:</strong><br>✅ AES-256 (most widely used)<br>✅ ChaCha20-Poly1305<br>⚠️ 3DES (deprecated)<br>❌ DES (broken)<br>❌ RC4 (broken)<br><br><em>💡 Symmetric encryption is typically combined with asymmetric encryption to solve the key exchange problem (TLS does this).</em>',
        sg: ['What is AES?', 'Symmetric vs Asymmetric?', 'What is key exchange?']
    },


    // ╔═══════════════════════════════════════╗
    // ║       ASYMMETRIC ENCRYPTION           ║
    // ╚═══════════════════════════════════════╝

    {
        id: 'asym',
        kw: ['asymmetric','asymmetric encryption','public key encryption','asymmetric cryptography','public private key'],
        cat: 'learn',
        ans: '<strong>What is Asymmetric Encryption?</strong> 🔐<br><br>Asymmetric encryption uses a <strong>mathematically linked key pair</strong>:<br>• <strong>Public Key</strong> — Share with everyone<br>• <strong>Private Key</strong> — Keep secret<br><br><strong>How It Works:</strong><br>• Encrypt with public key → only private key can decrypt<br>• Sign with private key → anyone verifies with public key<br><br><strong>Advantages:</strong><br>✅ No shared secret needed<br>✅ Enables key exchange over insecure channels<br>✅ Enables digital signatures<br><br><strong>Disadvantages:</strong><br>❌ Much slower than symmetric (1000x)<br>❌ Not suitable for bulk data encryption<br><br><strong>Common Algorithms:</strong><br>✅ RSA<br>✅ ECC (Elliptic Curve Cryptography)<br>✅ ElGamal<br>✅ Diffie-Hellman (key exchange)<br><br><em>💡 In practice: asymmetric encryption shares a symmetric key, then symmetric encryption handles bulk data (hybrid encryption).</em>',
        sg: ['What is RSA?', 'What is ECC?', 'Symmetric vs Asymmetric?']
    },
    {
        id: 'wrsa',
        kw: ['what is rsa','explain rsa','rsa explained','how rsa works','public key cryptography','rsa algorithm','rsa cryptography'],
        cat: 'learn',
        ans: '<strong>What is RSA?</strong> 🔑<br><br>RSA (Rivest–Shamir–Adleman, 1977) is the most widely used public-key cryptosystem, based on the difficulty of <strong>factoring large integers</strong>.<br><br><strong>Mathematical Foundation:</strong><br>• Choose two large primes: p, q<br>• Compute n = p × q (public modulus)<br>• Compute φ(n) = (p-1)(q-1)<br>• Choose e (public exponent, typically 65537)<br>• Compute d = e⁻¹ mod φ(n) (private exponent)<br><br><strong>Encrypt:</strong> C = Mᵉ mod n<br><strong>Decrypt:</strong> M = Cᵈ mod n<br><br><strong>Security Assumption:</strong><br>Given n, finding p and q is computationally infeasible for large primes.<br><br><strong>Used In:</strong><br>🔹 HTTPS/TLS certificates<br>🔹 SSH authentication<br>🔹 Email (S/MIME, PGP)<br>🔹 Code signing',
        sg: ['Safe RSA key size?', 'RSA vs ECC?', 'Generate RSA Keys']
    },
    {
        id: 'rks',
        kw: ['rsa key size','key size','2048 bit','4096 bit','recommended key','key length','rsa size','rsa bits'],
        cat: 'security',
        ans: '<strong>RSA Key Size Guide</strong> 🔑<br><br><strong>Key Size Security Chart:</strong><br>• 512-bit → ❌ BROKEN (cracked in 1999)<br>• 1024-bit → ❌ BROKEN (avoid entirely)<br>• 2048-bit → ✅ Minimum acceptable (secure until ~2030)<br>• 3072-bit → ✅ Good (secure until ~2040)<br>• 4096-bit → ✅ Excellent (long-term security)<br>• 8192-bit → ✅ Maximum (very slow, overkill)<br><br><strong>NIST Recommendations:</strong><br>• 2024–2030: Minimum RSA-2048<br>• Post-2030: Minimum RSA-3072<br><br><strong>Performance Impact:</strong><br>Larger keys are slower — 4096-bit is ~8x slower than 2048-bit for operations.<br><br><em>💡 For most applications, RSA-2048 is fine today. Use 4096-bit for long-lived certificates.</em>',
        tid: 'tool-rsa',
        tn: 'RSA Key Generator',
        sg: ['Generate RSA Keys', 'What is RSA?', 'RSA vs ECC?']
    },
    {
        id: 'ecc',
        kw: ['ecc','elliptic curve','elliptic curve cryptography','ecdsa','ecdh','what is ecc','curve25519','p-256','secp256k1'],
        cat: 'learn',
        ans: '<strong>What is ECC (Elliptic Curve Cryptography)?</strong> 📈<br><br>ECC provides the same security as RSA but with <strong>much shorter keys</strong>, based on the mathematics of elliptic curves over finite fields.<br><br><strong>Security Comparison:</strong><br>• RSA-2048 ≈ ECC-224 (equivalent security)<br>• RSA-3072 ≈ ECC-256<br>• RSA-15360 ≈ ECC-521<br><br><strong>Advantages over RSA:</strong><br>✅ Shorter keys = faster operations<br>✅ Less bandwidth<br>✅ Better for mobile/IoT devices<br><br><strong>Common ECC Curves:</strong><br>• <strong>P-256</strong> (secp256r1) — NIST, TLS<br>• <strong>Curve25519</strong> — Modern, fast, resistant to backdoors<br>• <strong>secp256k1</strong> — Bitcoin, Ethereum<br><br><strong>ECC Algorithms:</strong><br>• <strong>ECDSA</strong> — Digital signatures (Bitcoin, TLS)<br>• <strong>ECDH</strong> — Key exchange (TLS, Signal)<br><br><em>💡 TLS 1.3 and modern systems prefer ECC over RSA for performance and security.</em>',
        sg: ['What is RSA?', 'RSA vs ECC?', 'What is ECDSA?', 'What is Bitcoin?']
    },
    {
        id: 'dh',
        kw: ['diffie hellman','key exchange','dh','ecdh','diffie-hellman','key agreement','what is diffie hellman'],
        cat: 'learn',
        ans: '<strong>What is Diffie-Hellman Key Exchange?</strong> 🤝<br><br>Diffie-Hellman (1976) allows two parties to establish a <strong>shared secret over an insecure channel</strong> without transmitting the key itself.<br><br><strong>The Magic — Color Analogy:</strong><br>1. Alice & Bob agree on public color (yellow)<br>2. Each mixes their secret color privately<br>3. Exchange mixed colors publicly<br>4. Each adds their secret → same final color!<br><br><strong>Mathematical Reality:</strong><br>• Based on discrete logarithm problem<br>• Computationally infeasible to reverse<br><br><strong>Variants:</strong><br>• <strong>DHE</strong> — Ephemeral (new key each session)<br>• <strong>ECDH</strong> — Elliptic curve variant (faster, smaller)<br>• <strong>ECDHE</strong> — Elliptic + Ephemeral ✅ (TLS 1.3 standard)<br><br><strong>Perfect Forward Secrecy:</strong><br>With ephemeral keys, compromising long-term key doesn\'t expose past sessions!<br><br><em>💡 ECDHE is used in every HTTPS connection you make today.</em>',
        sg: ['What is TLS?', 'What is ECC?', 'What is Perfect Forward Secrecy?']
    },
    {
        id: 'pfs',
        kw: ['perfect forward secrecy','forward secrecy','pfs','ephemeral key','session key'],
        cat: 'learn',
        ans: '<strong>What is Perfect Forward Secrecy (PFS)?</strong> 🛡️<br><br>PFS ensures that <strong>past communications remain secure</strong> even if long-term private keys are later compromised.<br><br><strong>Without PFS:</strong><br>❌ Attacker records encrypted traffic<br>❌ Later steals server private key<br>❌ Decrypts all recorded past traffic<br><br><strong>With PFS:</strong><br>✅ New ephemeral key generated for every session<br>✅ Session keys never stored<br>✅ Old sessions cannot be decrypted<br><br><strong>How to Achieve PFS:</strong><br>• Use DHE or ECDHE key exchange<br>• TLS 1.3 mandates PFS (ECDHE only)<br><br><strong>Uses:</strong><br>🔹 TLS 1.3 (mandatory)<br>🔹 Signal Protocol<br>🔹 WhatsApp, iMessage<br><br><em>💡 Always look for ECDHE cipher suites in TLS configurations.</em>',
        sg: ['What is Diffie-Hellman?', 'What is TLS?', 'What is ECC?']
    },
    {
        id: 'elgamal',
        kw: ['elgamal','elgamal encryption','what is elgamal','elgamal cryptosystem'],
        cat: 'learn',
        ans: '<strong>What is ElGamal Encryption?</strong> 🔐<br><br>ElGamal is an asymmetric encryption algorithm developed in 1985 by Taher Elgamal, based on the <strong>Diffie-Hellman key exchange</strong> concept.<br><br><strong>Key Properties:</strong><br>• Based on discrete logarithm problem<br>• Probabilistic encryption — same plaintext → different ciphertext each time<br>• Ciphertext twice the length of plaintext<br><br><strong>Variants:</strong><br>• <strong>ElGamal Encryption</strong> — Public key encryption<br>• <strong>ElGamal Signature</strong> — Basis for DSA (Digital Signature Algorithm)<br><br><strong>Used In:</strong><br>🔹 GNU Privacy Guard (GPG/PGP)<br>🔹 OpenPGP standard<br>🔹 Basis for DSA signatures<br><br><em>💡 Modern systems prefer ECC-based algorithms over ElGamal for efficiency.</em>',
        sg: ['What is RSA?', 'What is ECC?', 'What is DSA?']
    },


    // ╔═══════════════════════════════════════╗
    // ║       DIGITAL SIGNATURES              ║
    // ╚═══════════════════════════════════════╝

    {
        id: 'wdsig',
        kw: ['what is digital signature','digital signature explained','how digital signature works','sign document','verify signature'],
        cat: 'learn',
        ans: '<strong>What is a Digital Signature?</strong> ✍️<br><br>A digital signature is a cryptographic mechanism that proves:<br>• <strong>Authenticity</strong> — Message came from claimed sender<br>• <strong>Integrity</strong> — Message was not altered<br>• <strong>Non-repudiation</strong> — Sender cannot deny sending<br><br><strong>How It Works:</strong><br>1. Sender hashes the document → digest<br>2. Encrypts digest with <strong>private key</strong> → signature<br>3. Sends document + signature<br>4. Receiver hashes document → digest<br>5. Decrypts signature with <strong>public key</strong><br>6. Compares: if equal → valid ✅<br><br><strong>Signature Algorithms:</strong><br>• <strong>RSA-PSS</strong> — Probabilistic RSA signatures<br>• <strong>ECDSA</strong> — Compact elliptic curve signatures (Bitcoin!)<br>• <strong>EdDSA/Ed25519</strong> — Fastest, most secure modern option<br><br><em>💡 Every HTTPS certificate is digitally signed by a Certificate Authority.</em>',
        tid: 'tool-signature',
        tn: 'Digital Signature',
        sg: ['What is ECDSA?', 'What is non-repudiation?', 'Digital Signature Tool']
    },
    {
        id: 'ecdsa',
        kw: ['ecdsa','what is ecdsa','elliptic curve digital signature','ec signature','bitcoin signature'],
        cat: 'learn',
        ans: '<strong>What is ECDSA?</strong> ✍️<br><br>ECDSA (Elliptic Curve Digital Signature Algorithm) is the elliptic curve variant of DSA — used in Bitcoin, TLS, and most modern systems.<br><br><strong>Key Properties:</strong><br>• Shorter signatures vs RSA (256-bit vs 2048-bit)<br>• Fast verification<br>• Based on ECDLP (Elliptic Curve Discrete Log Problem)<br><br><strong>Critical Security Note — Nonce Reuse:</strong><br>❌ Reusing the random nonce k exposes the private key!<br>❌ Sony PlayStation 3 was hacked this way (2010)<br>✅ Use deterministic ECDSA (RFC 6979)<br><br><strong>Used In:</strong><br>🔹 Bitcoin transactions (secp256k1)<br>🔹 Ethereum (secp256k1)<br>🔹 TLS certificates (P-256)<br>🔹 SSH, code signing<br><br><em>💡 EdDSA (Ed25519) is the modern, safer alternative to ECDSA.</em>',
        sg: ['What is ECC?', 'What is Bitcoin?', 'Digital Signature Tool']
    },
    {
        id: 'ed25519',
        kw: ['ed25519','eddsa','edwards curve','what is ed25519','modern signature'],
        cat: 'learn',
        ans: '<strong>What is Ed25519 / EdDSA?</strong> ✍️<br><br>Ed25519 is a modern digital signature scheme using the Edwards-curve Digital Signature Algorithm (EdDSA) on Curve25519.<br><br><strong>Key Advantages:</strong><br>✅ Fastest signature algorithm<br>✅ Deterministic — no random nonce needed<br>✅ Immune to nonce-reuse vulnerabilities<br>✅ Compact 64-byte signatures<br>✅ Resistant to side-channel attacks<br><br><strong>Comparison:</strong><br>• RSA-2048 signature: 256 bytes<br>• ECDSA-256 signature: 64 bytes, nonce required<br>• Ed25519 signature: 64 bytes, deterministic ✅<br><br><strong>Used In:</strong><br>🔹 SSH (OpenSSH default)<br>🔹 TLS 1.3<br>🔹 Signal Protocol<br>🔹 Tor, WireGuard<br>🔹 Monero cryptocurrency<br><br><em>💡 When choosing a signature algorithm, Ed25519 is the modern best choice.</em>',
        sg: ['What is ECDSA?', 'What is ECC?', 'Digital Signature Tool']
    },
    {
        id: 'nonrep',
        kw: ['non-repudiation','nonrepudiation','what is non-repudiation','repudiation','cannot deny'],
        cat: 'learn',
        ans: '<strong>What is Non-Repudiation?</strong> ⚖️<br><br>Non-repudiation means a sender <strong>cannot later deny</strong> having sent a message or performed an action — proven through cryptographic means.<br><br><strong>How Cryptography Provides It:</strong><br>• Only the holder of a private key can create its signature<br>• Verified signatures are cryptographic proof of authorship<br>• Timestamp + signature = legal-grade proof<br><br><strong>Real-World Examples:</strong><br>🔹 E-signing contracts (DocuSign, Adobe Sign)<br>🔹 Code signing (Windows, macOS app signatures)<br>🔹 Financial transactions<br>🔹 Blockchain transactions<br><br><strong>Trust Requirements:</strong><br>• Requires proper key management<br>• Private key must remain truly private<br>• Certificate Authorities bind keys to identities<br><br><em>💡 Non-repudiation is one of the four pillars of information security (CIA + Non-repudiation).</em>',
        sg: ['What is a digital signature?', 'What is PKI?', 'Digital Signature Tool']
    },


    // ╔═══════════════════════════════════════╗
    // ║       KEY EXCHANGE & PKI              ║
    // ╚═══════════════════════════════════════╝

    {
        id: 'pki',
        kw: ['pki','public key infrastructure','certificate authority','ca','ssl certificate','x509','digital certificate','what is pki'],
        cat: 'learn',
        ans: '<strong>What is PKI?</strong> 🏛️<br><br>PKI (Public Key Infrastructure) is the framework of systems, processes, and policies that manage <strong>digital certificates and public key encryption</strong>.<br><br><strong>PKI Components:</strong><br>• <strong>Certificate Authority (CA)</strong> — Trusted entity that issues certificates<br>• <strong>Registration Authority (RA)</strong> — Verifies certificate requests<br>• <strong>Digital Certificate</strong> — Binds public key to identity<br>• <strong>Certificate Revocation List (CRL)</strong> — List of revoked certificates<br><br><strong>X.509 Certificate Contains:</strong><br>• Subject name (domain/person)<br>• Public key<br>• CA signature<br>• Validity period<br>• Serial number<br><br><strong>Chain of Trust:</strong><br>Root CA → Intermediate CA → End-entity Certificate<br><br><em>💡 When you see the padlock in your browser, PKI is working behind the scenes.</em>',
        sg: ['What is TLS?', 'What is HTTPS?', 'What is a digital signature?']
    },
    {
        id: 'tls',
        kw: ['tls','ssl','https','tls handshake','ssl tls','what is tls','tls 1.3','ssl certificate','secure connection'],
        cat: 'learn',
        ans: '<strong>What is TLS/SSL?</strong> 🔒<br><br>TLS (Transport Layer Security) is the cryptographic protocol that secures internet communications — it\'s what makes HTTPS work.<br><br><strong>TLS 1.3 Handshake (simplified):</strong><br>1. Client Hello → supported cipher suites<br>2. Server Hello → chosen suite + certificate<br>3. Key Exchange → ECDHE ephemeral keys<br>4. Finished → session keys derived<br>5. Encrypted communication begins<br><br><strong>Cryptography Used:</strong><br>• <strong>Key Exchange:</strong> ECDHE (forward secrecy)<br>• <strong>Authentication:</strong> RSA or ECDSA certificates<br>• <strong>Encryption:</strong> AES-GCM or ChaCha20-Poly1305<br>• <strong>MAC:</strong> HMAC-SHA256 or Poly1305<br><br><strong>Version History:</strong><br>❌ SSL 3.0 → Broken (POODLE)<br>❌ TLS 1.0/1.1 → Deprecated<br>✅ TLS 1.2 → Acceptable<br>✅ TLS 1.3 → Recommended (2018)<br><br><em>💡 TLS 1.3 is 40% faster than TLS 1.2 and significantly more secure.</em>',
        sg: ['What is AES-GCM?', 'What is ECDHE?', 'What is PKI?', 'What is Perfect Forward Secrecy?']
    },
    {
        id: 'pgp',
        kw: ['pgp','gpg','pretty good privacy','what is pgp','gnupg','email encryption','pgp key'],
        cat: 'learn',
        ans: '<strong>What is PGP/GPG?</strong> 📧<br><br>PGP (Pretty Good Privacy) is an encryption system for secure email and file encryption, created by Phil Zimmermann in <strong>1991</strong>.<br><br><strong>GPG</strong> (GNU Privacy Guard) is the free, open-source implementation of the OpenPGP standard.<br><br><strong>How PGP Email Works:</strong><br>1. Generate RSA or ECC key pair<br>2. Publish public key to keyserver<br>3. Sender fetches recipient\'s public key<br>4. Encrypts message with recipient\'s public key<br>5. Signs with sender\'s private key<br><br><strong>Web of Trust:</strong><br>• No central CA — users sign each other\'s keys<br>• Trust built through peer verification<br><br><strong>PGP Encrypts:</strong><br>🔹 Emails<br>🔹 Files<br>🔹 Code commits (Git signing)<br>🔹 Software releases<br><br><em>💡 Linux kernel code is signed with GPG. Each release tag is verified by the community.</em>',
        sg: ['What is RSA?', 'What is ECC?', 'What is digital signature?']
    },


    // ╔═══════════════════════════════════════╗
    // ║       BLOCKCHAIN & BITCOIN            ║
    // ╚═══════════════════════════════════════╝

    {
        id: 'blockchain',
        kw: ['blockchain','what is blockchain','how blockchain works','blockchain explained','distributed ledger','chain of blocks'],
        cat: 'learn',
        ans: '<strong>What is Blockchain?</strong> ⛓️<br><br>A blockchain is a <strong>distributed, immutable ledger</strong> where data is stored in cryptographically linked blocks.<br><br><strong>Block Structure:</strong><br>• <strong>Block Header</strong>: Previous hash, timestamp, merkle root, nonce<br>• <strong>Transaction Data</strong>: List of transactions<br>• <strong>Hash</strong>: SHA-256 fingerprint of entire block<br><br><strong>Chain Linking:</strong><br>Each block contains the <em>hash of the previous block</em> → altering any block breaks all subsequent blocks.<br><br><strong>Key Properties:</strong><br>• <strong>Decentralized</strong> — No single authority<br>• <strong>Immutable</strong> — Past records cannot be altered<br>• <strong>Transparent</strong> — All participants can verify<br>• <strong>Trustless</strong> — Code enforces rules, not institutions<br><br><strong>Consensus Mechanisms:</strong><br>• Proof of Work (Bitcoin)<br>• Proof of Stake (Ethereum 2.0)<br>• Delegated PoS, PoA, and others<br><br><em>💡 Blockchain solves the double-spend problem without a trusted central authority.</em>',
        sg: ['What is Bitcoin?', 'What is Proof of Work?', 'What is Merkle tree?', 'How does Bitcoin use hashing?']
    },
    {
        id: 'bitcoin',
        kw: ['bitcoin','what is bitcoin','btc','bitcoin security','bitcoin cryptography','satoshi','bitcoin explained'],
        cat: 'learn',
        ans: '<strong>What is Bitcoin?</strong> ₿<br><br>Bitcoin is the first decentralized cryptocurrency, created by the pseudonymous <strong>Satoshi Nakamoto</strong> in 2009, secured entirely by cryptography.<br><br><strong>Cryptography in Bitcoin:</strong><br>• <strong>SHA-256</strong> — Mining, block hashing, merkle trees<br>• <strong>RIPEMD-160</strong> — Address generation<br>• <strong>ECDSA (secp256k1)</strong> — Transaction signing<br>• <strong>SHA-256d</strong> — Double SHA-256 for extra security<br><br><strong>Bitcoin Address Generation:</strong><br>1. Generate private key (256-bit random)<br>2. ECDSA → public key<br>3. SHA-256 → hash<br>4. RIPEMD-160 → hash<br>5. Base58Check encoding → Bitcoin address<br><br><strong>Security Model:</strong><br>• Security = computational cost of attacking > reward<br>• 51% attack: control majority of hash rate<br>• Currently > 500 EH/s (exahashes/second)<br><br><em>💡 Bitcoin is often called "digital gold" secured by cryptographic proof of work.</em>',
        sg: ['What is SHA-256?', 'What is ECDSA?', 'What is Proof of Work?', 'What is blockchain?']
    },
    {
        id: 'pow',
        kw: ['proof of work','mining','bitcoin mining','pow','hash rate','nonce mining','what is mining'],
        cat: 'learn',
        ans: '<strong>What is Proof of Work (Mining)?</strong> ⛏️<br><br>Proof of Work is Bitcoin\'s consensus mechanism — miners compete to find a hash meeting a <strong>difficulty target</strong>.<br><br><strong>Mining Process:</strong><br>1. Collect pending transactions<br>2. Build candidate block<br>3. Try billions of <strong>nonce</strong> values<br>4. Compute SHA-256(SHA-256(block header))<br>5. If hash < target → Block found! 🎉<br>6. Broadcast to network → earn Bitcoin reward<br><br><strong>Difficulty Target:</strong><br>• Hash must start with enough leading zeros<br>• Difficulty adjusts every 2016 blocks (~2 weeks)<br>• Target: 1 block every ~10 minutes<br><br><strong>Why It\'s Secure:</strong><br>• Changing past block requires redoing ALL subsequent work<br>• Network\'s combined hash rate makes attack prohibitively expensive<br>• Current cost of 51% attack: ~$10 billion/hour<br><br><em>💡 SHA-256 is performed trillions of times per second across Bitcoin\'s global network.</em>',
        sg: ['What is Bitcoin?', 'What is SHA-256?', 'What is blockchain?', 'What is Proof of Stake?']
    },
    {
        id: 'pos',
        kw: ['proof of stake','pos','ethereum staking','staking','what is proof of stake','ethereum 2','eth2'],
        cat: 'learn',
        ans: '<strong>What is Proof of Stake?</strong> 🪙<br><br>Proof of Stake (PoS) is a consensus mechanism where validators are chosen based on their <strong>staked cryptocurrency</strong> rather than computational work.<br><br><strong>How It Works:</strong><br>1. Validators lock up (stake) cryptocurrency as collateral<br>2. Protocol randomly selects validators proportional to stake<br>3. Selected validator proposes block<br>4. Other validators attest (verify)<br>5. Block finalized → validator earns rewards<br><br><strong>Slashing:</strong><br>• Malicious validators lose their stake<br>• Cryptographic punishment for bad behavior<br><br><strong>PoW vs PoS:</strong><br>• PoW: Secure via energy expenditure<br>• PoS: Secure via economic collateral<br>• PoS uses ~99.95% less energy than PoW<br><br><strong>Uses:</strong><br>🔹 Ethereum (Merge, September 2022)<br>🔹 Cardano, Polkadot, Solana, Avalanche<br><br><em>💡 Ethereum switched from PoW to PoS in "The Merge" — reducing energy use by 99.95%.</em>',
        sg: ['What is blockchain?', 'What is Proof of Work?', 'What is Ethereum?']
    },
    {
        id: 'ethereum',
        kw: ['ethereum','eth','what is ethereum','smart contract','evm','ethereum cryptography','ether'],
        cat: 'learn',
        ans: '<strong>What is Ethereum?</strong> 💎<br><br>Ethereum is a decentralized platform enabling <strong>smart contracts</strong> and decentralized applications (dApps) secured by cryptography.<br><br><strong>Cryptography in Ethereum:</strong><br>• <strong>Keccak-256</strong> (SHA-3 variant) — Hashing, addresses<br>• <strong>ECDSA secp256k1</strong> — Transaction signing<br>• <strong>Merkle Patricia Trees</strong> — State management<br>• <strong>BLS Signatures</strong> — Validator aggregation (PoS)<br><br><strong>Ethereum Address:</strong><br>1. Private key (256-bit random)<br>2. ECDSA → 512-bit public key<br>3. Keccak-256 → 256-bit hash<br>4. Last 20 bytes → Ethereum address<br><br><strong>Smart Contract Security:</strong><br>• Code is law — bugs can be exploited<br>• Reentrancy attacks (DAO hack: $60M)<br>• Integer overflow vulnerabilities<br>• Formal verification increasingly used<br><br><em>💡 Ethereum\'s EVM runs smart contract code deterministically across thousands of nodes worldwide.</em>',
        sg: ['What is blockchain?', 'What is ECDSA?', 'What is Keccak?']
    },
    {
        id: 'wallet',
        kw: ['crypto wallet','bitcoin wallet','private key wallet','hd wallet','seed phrase','mnemonic','what is crypto wallet'],
        cat: 'learn',
        ans: '<strong>What is a Crypto Wallet?</strong> 👛<br><br>A crypto wallet doesn\'t store cryptocurrency — it stores <strong>private keys</strong> that give access to on-chain assets.<br><br><strong>Key Concepts:</strong><br>• <strong>Private Key</strong> → 256-bit random number (your master secret)<br>• <strong>Public Key</strong> → derived from private key via ECC<br>• <strong>Address</strong> → hashed public key (your "account number")<br><br><strong>HD Wallets (BIP32/39/44):</strong><br>• <strong>Seed Phrase</strong>: 12-24 random words<br>• Single seed → generates all keys deterministically<br>• One backup → access to all accounts<br><br><strong>Wallet Types:</strong><br>• <strong>Hot Wallet</strong> — Online (convenient, less secure)<br>• <strong>Cold Wallet</strong> — Offline hardware (most secure)<br>• <strong>Paper Wallet</strong> — Printed keys (secure if generated offline)<br><br><strong>Critical Rules:</strong><br>❌ Never share private keys or seed phrases<br>❌ Never store seed phrase digitally unencrypted<br>✅ Hardware wallets for large amounts<br><br><em>💡 "Not your keys, not your coins" — self-custody is the cryptographic foundation of crypto ownership.</em>',
        sg: ['What is Bitcoin?', 'What is ECC?', 'What is ECDSA?']
    },
    {
        id: 'zk',
        kw: ['zero knowledge','zk proof','zkp','zero knowledge proof','what is zkp','zksnark','zkrollup','zk-snark','zk-stark'],
        cat: 'learn',
        ans: '<strong>What is a Zero-Knowledge Proof?</strong> 🧠<br><br>A ZK proof allows one party (prover) to convince another (verifier) that a <strong>statement is true without revealing any information beyond its truth</strong>.<br><br><strong>Classic Example (Ali Baba Cave):</strong><br>• Alice knows the secret word to a cave<br>• She proves knowledge without revealing the word<br>• Bob can verify she knows it with high probability<br><br><strong>ZK Proof Properties:</strong><br>• <strong>Completeness</strong> — True statements always verified<br>• <strong>Soundness</strong> — False statements rarely pass<br>• <strong>Zero-Knowledge</strong> — No information leaked<br><br><strong>ZK Variants:</strong><br>• <strong>zk-SNARKs</strong> — Succinct, fast verify, trusted setup required<br>• <strong>zk-STARKs</strong> — No trusted setup, post-quantum ready, larger proofs<br>• <strong>Bulletproofs</strong> — No trusted setup, efficient range proofs<br><br><strong>Blockchain Applications:</strong><br>🔹 Zcash (shielded transactions)<br>🔹 StarkNet, zkSync (L2 scaling)<br>🔹 Privacy-preserving identity verification<br><br><em>💡 ZK proofs are considered one of the most important cryptographic innovations of the past decade.</em>',
        sg: ['What is blockchain?', 'What is Ethereum?', 'What is privacy in crypto?']
    },
    {
        id: 'smartcontract',
        kw: ['smart contract','what is smart contract','solidity','contract code','self executing contract','defi'],
        cat: 'learn',
        ans: '<strong>What is a Smart Contract?</strong> 📋<br><br>Smart contracts are self-executing programs stored on a blockchain that automatically enforce agreement terms when conditions are met.<br><br><strong>Key Properties:</strong><br>• <strong>Immutable</strong> — Cannot be altered after deployment<br>• <strong>Deterministic</strong> — Same inputs always produce same outputs<br>• <strong>Transparent</strong> — Anyone can audit the code<br>• <strong>Trustless</strong> — No intermediary needed<br><br><strong>Cryptographic Basis:</strong><br>• Deployed via signed transaction<br>• State stored in Merkle Patricia tree<br>• Events emitted are hash-logged<br>• Upgradability via proxy patterns (with risks)<br><br><strong>Security Vulnerabilities:</strong><br>❌ Reentrancy (DAO hack)<br>❌ Integer overflow/underflow<br>❌ Front-running<br>❌ Oracle manipulation<br><br><em>💡 Smart contract code is publicly auditable — always verify before interacting.</em>',
        sg: ['What is Ethereum?', 'What is blockchain?', 'What is ZK proof?']
    },


    // ╔═══════════════════════════════════════╗
    // ║       FILE INTEGRITY                  ║
    // ╚═══════════════════════════════════════╝

    {
        id: 'wfileint',
        kw: ['what is file integrity','file integrity explained','how file integrity works','file hash check','file verification'],
        cat: 'learn',
        ans: '<strong>What is File Integrity Verification?</strong> 📁<br><br>File integrity verification uses <strong>cryptographic hashing</strong> to detect whether a file has been altered, corrupted, or tampered with.<br><br><strong>Process:</strong><br>1. Original file → compute hash (e.g., SHA-256)<br>2. Publish or store the hash securely<br>3. Later: re-hash the file<br>4. Compare hashes → if different, file was modified<br><br><strong>What Can Change a File Hash?</strong><br>• Even 1 bit change → completely different hash<br>• Malware injection<br>• File corruption<br>• Man-in-the-middle download tampering<br><br><strong>Real Use Cases:</strong><br>🔹 Verifying software downloads (ISO files, installers)<br>🔹 Legal evidence chain of custody<br>🔹 Medical record integrity<br>🔹 Software supply chain security<br>🔹 Forensic investigation<br><br><em>💡 Always verify SHA-256 hashes when downloading software from the internet!</em>',
        tid: 'tool-integrity',
        tn: 'File Integrity Checker',
        sg: ['What is SHA-256?', 'File Integrity Checker', 'Verify a file']
    },
    {
        id: 'codesign',
        kw: ['code signing','software signing','signed software','authenticode','apple notarization','verify software'],
        cat: 'learn',
        ans: '<strong>What is Code Signing?</strong> 💻<br><br>Code signing uses digital signatures to verify that software comes from a <strong>known publisher</strong> and hasn\'t been tampered with.<br><br><strong>How It Works:</strong><br>1. Developer hashes the software<br>2. Signs hash with private key<br>3. Includes certificate (from CA) in signed package<br>4. User\'s OS verifies signature on installation<br><br><strong>Platform Implementations:</strong><br>• <strong>Windows</strong> — Authenticode (SHA-256 + RSA/ECC)<br>• <strong>macOS</strong> — Apple Notarization (Gatekeeper)<br>• <strong>Linux</strong> — GPG signing (packages, kernels)<br>• <strong>Android/iOS</strong> — APK/IPA signing<br><br><strong>Why It Matters:</strong><br>✅ Prevents supply chain attacks<br>✅ User sees "Verified Publisher"<br>✅ Malware injection detected<br>❌ Stolen signing certs = bypass (Stuxnet used stolen certs)<br><br><em>💡 Never run unsigned software from unknown sources — always verify code signatures.</em>',
        sg: ['What is digital signature?', 'File Integrity Checker', 'What is PKI?']
    },
    {
        id: 'fim',
        kw: ['fim','file integrity monitoring','intrusion detection','host ids','tripwire','file monitor'],
        cat: 'learn',
        ans: '<strong>What is File Integrity Monitoring (FIM)?</strong> 🔍<br><br>FIM is a security practice that continuously monitors critical files and alerts when unauthorized changes occur.<br><br><strong>How FIM Works:</strong><br>1. Create cryptographic baseline hash of all critical files<br>2. Continuously monitor files for changes<br>3. Alert on any hash mismatch<br>4. Log change details for forensics<br><br><strong>What FIM Monitors:</strong><br>🔹 System binaries (/bin, /usr/bin)<br>🔹 Configuration files (/etc)<br>🔹 Registry keys (Windows)<br>🔹 Web application files<br>🔹 Log files<br><br><strong>FIM Tools:</strong><br>• <strong>Tripwire</strong> — Classic enterprise FIM<br>• <strong>AIDE</strong> — Free, Unix-based<br>• <strong>Wazuh</strong> — Open-source SIEM with FIM<br>• <strong>AWS CloudTrail</strong> — Cloud file monitoring<br><br><strong>Compliance:</strong><br>Required by: PCI-DSS, HIPAA, SOX, ISO 27001<br><br><em>💡 FIM is a critical detective control for identifying system compromises.</em>',
        tid: 'tool-integrity',
        tn: 'File Integrity Checker',
        sg: ['File Integrity Checker', 'What is SHA-256?', 'What is a hash?']
    },


    // ╔═══════════════════════════════════════╗
    // ║       PASSWORD SECURITY               ║
    // ╚═══════════════════════════════════════╝

    {
        id: 'spass',
        kw: ['strong password','good password','password tips','password best practices','create strong password'],
        cat: 'security',
        ans: '<strong>Strong Password Guidelines</strong> 💪<br><br><strong>Length (Most Important):</strong><br>✅ Minimum 12 characters<br>✅ Recommended: 16-20+ characters<br>✅ Longer = exponentially harder to crack<br><br><strong>Composition:</strong><br>✅ Uppercase letters (A-Z)<br>✅ Lowercase letters (a-z)<br>✅ Numbers (0-9)<br>✅ Special characters (!@#$%^&*)<br>❌ No dictionary words<br>❌ No personal info (name, birthday)<br>❌ No keyboard patterns (qwerty, 12345)<br><br><strong>Management:</strong><br>✅ Unique password per account<br>✅ Use a password manager<br>✅ Enable two-factor authentication (2FA)<br>✅ Change compromised passwords immediately<br><br><strong>Check haveibeenpwned.com for breached passwords!</strong>',
        tid: 'tool-password',
        tn: 'Password Tools',
        sg: ['Generate password', 'What is 2FA?', 'What is password entropy?']
    },
    {
        id: 'entropy',
        kw: ['entropy','password entropy','what is entropy','bits of entropy','password strength','information entropy'],
        cat: 'learn',
        ans: '<strong>What is Password Entropy?</strong> 📊<br><br>Entropy measures the <strong>unpredictability</strong> of a password in bits — higher entropy = harder to crack.<br><br><strong>Entropy Formula:</strong><br>H = L × log₂(N)<br>• H = entropy (bits)<br>• L = password length<br>• N = character set size<br><br><strong>Character Set Sizes:</strong><br>• Lowercase only: 26 chars<br>• + Uppercase: 52 chars<br>• + Numbers: 62 chars<br>• + Symbols: ~95 chars<br><br><strong>Entropy Examples:</strong><br>• 8 chars, lowercase: ~38 bits ❌<br>• 8 chars, mixed+symbols: ~52 bits ⚠️<br>• 12 chars, mixed+symbols: ~79 bits ✅<br>• 16 chars, mixed+symbols: ~105 bits ✅✅<br>• 5 random words (passphrase): ~65 bits ✅<br><br><strong>Recommended Minimum:</strong> 80+ bits of entropy<br><br><em>💡 A passphrase like "correct-horse-battery-staple" can be both memorable and high-entropy!</em>',
        tid: 'tool-password',
        tn: 'Password Tools',
        sg: ['Password Generator', 'What is brute force?', 'Strong password tips']
    },
    {
        id: 'bruteforce',
        kw: ['brute force','brute force attack','dictionary attack','password crack','cracking password','credential attack'],
        cat: 'security',
        ans: '<strong>What is a Brute Force Attack?</strong> 🔨<br><br>Brute force tries <strong>every possible combination</strong> until finding the correct password or key.<br><br><strong>Attack Types:</strong><br>• <strong>Pure Brute Force</strong> — Try all combinations systematically<br>• <strong>Dictionary Attack</strong> — Try common words/phrases<br>• <strong>Hybrid</strong> — Dictionary + number/symbol appending<br>• <strong>Credential Stuffing</strong> — Use leaked username/password pairs<br><br><strong>Modern Cracking Speed (GPU cluster):</strong><br>• MD5: 100+ billion hashes/second<br>• bcrypt (cost 10): ~10,000 hashes/second<br>• Argon2id: ~100 hashes/second<br><br><strong>Time to Crack 8-char password:</strong><br>• MD5: minutes to hours<br>• bcrypt: years<br>• Argon2id: centuries<br><br><strong>Defense:</strong><br>✅ Use slow hash functions for passwords<br>✅ Account lockout after failed attempts<br>✅ CAPTCHA<br>✅ Multi-factor authentication<br><br><em>💡 Password length matters more than complexity — a 20-char lowercase password beats an 8-char complex one.</em>',
        sg: ['What is bcrypt?', 'Password entropy?', 'Password Tools']
    },
    {
        id: 'mfa',
        kw: ['2fa','mfa','two factor','multi factor','otp','totp','authenticator','two factor authentication','what is 2fa'],
        cat: 'security',
        ans: '<strong>What is Multi-Factor Authentication?</strong> 🔑🔑<br><br>MFA requires <strong>two or more verification factors</strong> to authenticate — something you know, have, or are.<br><br><strong>Authentication Factors:</strong><br>• <strong>Knowledge</strong> — Password, PIN, security question<br>• <strong>Possession</strong> — Phone, hardware key, smart card<br>• <strong>Inherence</strong> — Fingerprint, face, retina scan<br><br><strong>MFA Types by Security:</strong><br>❌ SMS OTP — Weak (SIM swap attacks)<br>⚠️ Email OTP — Better (account takeover risk)<br>✅ TOTP App — Good (Google Authenticator, Authy)<br>✅✅ FIDO2/WebAuthn — Best (hardware security keys)<br>✅✅ Passkeys — Excellent (phishing resistant)<br><br><strong>TOTP (Time-based OTP):</strong><br>• Shared secret + current timestamp<br>• HMAC-SHA1 → 6-digit code<br>• Changes every 30 seconds<br><br><em>💡 Enabling MFA blocks 99.9% of automated account attacks (Microsoft data).</em>',
        sg: ['What is HMAC?', 'What is FIDO2?', 'Strong password tips']
    },
    {
        id: 'passkeys',
        kw: ['passkey','passkeys','webauthn','fido2','passwordless','what is passkey','fido'],
        cat: 'learn',
        ans: '<strong>What are Passkeys?</strong> 🗝️<br><br>Passkeys are a <strong>passwordless authentication standard</strong> based on FIDO2/WebAuthn that replaces traditional passwords with cryptographic key pairs.<br><br><strong>How Passkeys Work:</strong><br>1. Device generates ECC key pair during registration<br>2. Public key sent to server<br>3. Private key stored securely (device TPM/Secure Enclave)<br>4. Login: server sends challenge<br>5. Device signs challenge with private key<br>6. Server verifies signature → authenticated ✅<br><br><strong>Security Advantages:</strong><br>✅ Phishing resistant — domain-bound<br>✅ No password database to breach<br>✅ No reused credentials<br>✅ Private key never leaves device<br><br><strong>Supported By:</strong><br>🔹 Apple (iCloud Keychain)<br>🔹 Google (Google Password Manager)<br>🔹 Microsoft (Windows Hello)<br>🔹 FIDO Alliance members<br><br><em>💡 Passkeys are considered the future of authentication — already supported by Apple, Google, and Microsoft.</em>',
        sg: ['What is 2FA?', 'What is ECC?', 'What is digital signature?']
    },
    {
        id: 'passmanager',
        kw: ['password manager','1password','bitwarden','lastpass','keychain','what is password manager'],
        cat: 'security',
        ans: '<strong>Password Managers — Why You Need One</strong> 🔐<br><br>A password manager securely stores and auto-fills unique passwords for every account — protected by one master password.<br><br><strong>Cryptographic Architecture (Bitwarden example):</strong><br>• Master password → PBKDF2-SHA256 (100,000 iterations) → master key<br>• Master key → AES-256 encryption of vault<br>• Zero-knowledge architecture — provider cannot see passwords<br><br><strong>Why Password Managers are Secure:</strong><br>✅ Each site gets unique, random 20+ char password<br>✅ Breach of one site doesn\'t affect others<br>✅ Encrypted vault requires master password to access<br>✅ Autofill prevents phishing (checks actual domain)<br><br><strong>Recommended Options:</strong><br>• <strong>Bitwarden</strong> — Open source, free ✅<br>• <strong>1Password</strong> — Excellent UX, paid<br>• <strong>KeePass</strong> — Offline, open source<br>• <strong>Apple Keychain</strong> — Built-in for Apple users<br><br><em>💡 A good password manager + 2FA = dramatically improved account security.</em>',
        sg: ['What is 2FA?', 'What is AES?', 'Strong password tips']
    },


    // ╔═══════════════════════════════════════╗
    // ║     CRYPTOGRAPHIC PROTOCOLS           ║
    // ╚═══════════════════════════════════════╝

    {
        id: 'ssh',
        kw: ['ssh','secure shell','what is ssh','ssh keys','ssh authentication','openssh','ssh tunnel'],
        cat: 'learn',
        ans: '<strong>What is SSH?</strong> 🖥️<br><br>SSH (Secure Shell) is a cryptographic protocol for secure remote access to servers over unsecured networks.<br><br><strong>SSH Cryptography:</strong><br>• <strong>Key Exchange</strong>: ECDH / DH<br>• <strong>Authentication</strong>: RSA, ECDSA, Ed25519 keys or passwords<br>• <strong>Encryption</strong>: AES-256-GCM, ChaCha20-Poly1305<br>• <strong>MAC</strong>: HMAC-SHA2, Poly1305<br><br><strong>SSH Key Authentication (preferred):</strong><br>1. Generate key pair: <code>ssh-keygen -t ed25519</code><br>2. Copy public key to server<br>3. Server challenges with random message<br>4. Client signs with private key<br>5. Server verifies → authenticated<br><br><strong>SSH vs Password Auth:</strong><br>❌ Password → brute forceable, phishable<br>✅ SSH Key → requires private key (nearly impossible to forge)<br><br><strong>SSH Tunneling:</strong><br>• Local port forwarding<br>• Remote port forwarding<br>• SOCKS proxy (dynamic forwarding)<br><br><em>💡 Always use Ed25519 SSH keys and disable password authentication on servers.</em>',
        sg: ['What is Ed25519?', 'What is ECC?', 'What is ECDH?']
    },
    {
        id: 'vpn',
        kw: ['vpn','virtual private network','what is vpn','wireguard','openvpn','ipsec','vpn encryption'],
        cat: 'learn',
        ans: '<strong>What is a VPN?</strong> 🌐<br><br>A VPN (Virtual Private Network) creates an <strong>encrypted tunnel</strong> between your device and a VPN server, protecting traffic from eavesdroppers.<br><br><strong>VPN Protocols Comparison:</strong><br>• <strong>WireGuard</strong> ✅ — Modern, fast, ChaCha20+Poly1305+Curve25519<br>• <strong>OpenVPN</strong> ✅ — Proven, flexible, AES-256<br>• <strong>IKEv2/IPSec</strong> ✅ — Mobile-friendly, fast reconnect<br>• <strong>L2TP/IPSec</strong> ⚠️ — Older, slower<br>• <strong>PPTP</strong> ❌ — Broken, never use<br><br><strong>WireGuard Cryptography Stack:</strong><br>• Key exchange: Curve25519 (ECDH)<br>• Encryption: ChaCha20Poly1305<br>• Hashing: BLAKE2s<br>• Timestamp: TAI64N<br><br><strong>What VPNs Do NOT Do:</strong><br>❌ Make you anonymous (VPN sees your traffic)<br>❌ Protect against malware<br>❌ Provide end-to-end encryption (only to VPN server)<br><br><em>💡 WireGuard has only ~4,000 lines of code vs OpenVPN\'s 100,000+ — smaller attack surface.</em>',
        sg: ['What is ChaCha20?', 'What is ECC?', 'What is TLS?']
    },
    {
        id: 'signal',
        kw: ['signal protocol','signal app','double ratchet','what is signal protocol','end to end encryption','e2ee'],
        cat: 'learn',
        ans: '<strong>What is the Signal Protocol?</strong> 📱<br><br>The Signal Protocol is the <strong>gold standard</strong> of end-to-end encrypted messaging, used by Signal, WhatsApp, and Google Messages.<br><br><strong>Protocol Components:</strong><br>• <strong>X3DH</strong> (Extended Triple Diffie-Hellman) — Initial key agreement<br>• <strong>Double Ratchet Algorithm</strong> — Ongoing key derivation<br>• <strong>Curve25519</strong> — Key exchange<br>• <strong>AES-256-CBC + HMAC-SHA256</strong> — Message encryption<br><br><strong>Double Ratchet Magic:</strong><br>• New encryption key for EVERY message<br>• Compromise of one key doesn\'t expose others<br>• Forward secrecy + break-in recovery<br><br><strong>End-to-End Encryption Means:</strong><br>✅ Only sender and receiver can read messages<br>✅ Even Signal\'s servers cannot read your messages<br>✅ Metadata minimized<br><br><em>💡 The Signal Protocol is open-source and peer-reviewed — it\'s considered cryptographically state-of-the-art.</em>',
        sg: ['What is Diffie-Hellman?', 'What is Perfect Forward Secrecy?', 'What is AES?']
    },
    {
        id: 'tor',
        kw: ['tor','tor browser','onion routing','what is tor','anonymity','onion encryption'],
        cat: 'learn',
        ans: '<strong>What is Tor (Onion Routing)?</strong> 🧅<br><br>Tor is an anonymity network that encrypts and routes traffic through <strong>multiple relays</strong> to conceal origin and destination.<br><br><strong>How Onion Routing Works:</strong><br>1. Client selects 3 relays (guard → middle → exit)<br>2. Builds layered encryption (like onion layers)<br>3. Each relay decrypts one layer → forwards<br>4. Exit relay delivers to destination<br>5. No single relay knows both origin AND destination<br><br><strong>Cryptography Used:</strong><br>• <strong>TLS</strong> — Link-layer encryption between relays<br>• <strong>Curve25519 / Ed25519</strong> — Key exchange and identity<br>• <strong>AES-256-CTR</strong> — Cell encryption<br>• <strong>SHA-3</strong> — Onion address generation (v3)<br><br><strong>Tor Limitations:</strong><br>⚠️ Exit node can see unencrypted traffic (use HTTPS!)<br>⚠️ Traffic correlation attacks possible<br>⚠️ Slow due to relay hops<br><br><em>💡 Always use HTTPS over Tor — Tor encrypts routing, not necessarily content.</em>',
        sg: ['What is TLS?', 'What is ECC?', 'What is anonymity?']
    },


    // ╔═══════════════════════════════════════╗
    // ║     POST-QUANTUM CRYPTOGRAPHY         ║
    // ╚═══════════════════════════════════════╝

    {
        id: 'quantum',
        kw: ['quantum','quantum computer','quantum cryptography','post quantum','quantum threat','qkd','quantum safe'],
        cat: 'learn',
        ans: '<strong>Quantum Computers vs Cryptography</strong> ⚛️<br><br>Quantum computers pose a <strong>future threat</strong> to some current cryptographic algorithms.<br><br><strong>Algorithms Threatened by Quantum:</strong><br>❌ <strong>RSA</strong> — Shor\'s algorithm breaks it in polynomial time<br>❌ <strong>ECC / ECDSA</strong> — Shor\'s algorithm breaks it<br>❌ <strong>Diffie-Hellman</strong> — Broken by quantum<br><br><strong>Algorithms Still Secure Against Quantum:</strong><br>✅ <strong>AES-256</strong> — Needs 2× key size vs classical (Grover\'s: 128-bit effective)<br>✅ <strong>SHA-256/SHA-3</strong> — Grover\'s halves security, still 128-bit effective<br><br><strong>Post-Quantum Timeline:</strong><br>• Current quantum computers: ~1000 qubits (noisy)<br>• RSA-2048 crack requires: ~4000 logical qubits<br>• Estimated threat: 10-20 years<br><br><strong>"Harvest Now, Decrypt Later" Attack:</strong><br>⚠️ Adversaries may be recording encrypted traffic today to decrypt when quantum arrives!<br><br><em>💡 NIST finalized the first post-quantum cryptography standards in 2024.</em>',
        sg: ['What is NIST post-quantum?', 'What is RSA?', 'What is ECC?']
    },
    {
        id: 'pqc',
        kw: ['post quantum cryptography','nist pqc','kyber','dilithium','lattice cryptography','crystals','sphincs','falcon'],
        cat: 'learn',
        ans: '<strong>Post-Quantum Cryptography Standards</strong> 🔮<br><br>NIST finalized the first post-quantum cryptographic standards in <strong>August 2024</strong>.<br><br><strong>NIST PQC Standards (FIPS):</strong><br>• <strong>ML-KEM</strong> (Kyber) — Key encapsulation mechanism<br>• <strong>ML-DSA</strong> (Dilithium) — Digital signatures<br>• <strong>SLH-DSA</strong> (SPHINCS+) — Hash-based signatures<br>• <strong>FN-DSA</strong> (Falcon) — Lattice signatures<br><br><strong>Mathematical Foundations:</strong><br>• <strong>Lattice problems</strong> — MLWE, MSIS (Kyber, Dilithium)<br>• <strong>Hash functions</strong> — SHA-3 (SPHINCS+)<br>• <strong>NTRU lattices</strong> — (Falcon)<br><br><strong>Transition Strategy:</strong><br>• Hybrid approach: classical + PQC (during transition)<br>• TLS 1.3 already testing hybrid X25519 + Kyber<br>• CNSA 2.0: US government transitioning by 2035<br><br><em>💡 Google Chrome already ships with X25519Kyber768 hybrid for quantum-resistant TLS connections.</em>',
        sg: ['What is quantum computing threat?', 'What is ECC?', 'What is TLS?']
    },
    {
        id: 'qkd',
        kw: ['qkd','quantum key distribution','bb84','quantum encryption','quantum communication'],
        cat: 'learn',
        ans: '<strong>What is Quantum Key Distribution (QKD)?</strong> ⚛️<br><br>QKD uses quantum mechanical properties to create <strong>theoretically unbreakable</strong> key exchange — any eavesdropping disturbs the quantum states and is detectable.<br><br><strong>BB84 Protocol:</strong><br>1. Alice sends photons in random polarization states<br>2. Bob measures in random bases<br>3. They compare bases over public channel<br>4. Mismatched bases discarded<br>5. Remaining bits → shared secret key<br>6. Eavesdropping changes photon states → detectable<br><br><strong>Key Property:</strong><br>Based on <strong>Heisenberg Uncertainty Principle</strong> — measuring quantum state disturbs it.<br><br><strong>Current Limitations:</strong><br>⚠️ Distance limited (~100km without repeaters)<br>⚠️ Requires specialized hardware<br>⚠️ Vulnerable to implementation attacks (not protocol)<br>⚠️ Very expensive and low throughput<br><br><em>💡 China operates the world\'s longest QKD network: 2000km Beijing-Shanghai fiber link.</em>',
        sg: ['What is post-quantum cryptography?', 'What is key exchange?', 'What is quantum computing?']
    },


    // ╔═══════════════════════════════════════╗
    // ║     CRYPTOGRAPHIC ATTACKS             ║
    // ╚═══════════════════════════════════════╝

    {
        id: 'mitm',
        kw: ['man in the middle','mitm','mitm attack','eavesdrop','intercept','sniffing','packet sniffing'],
        cat: 'security',
        ans: '<strong>What is a Man-in-the-Middle Attack?</strong> 🎭<br><br>MITM attacks occur when an attacker secretly <strong>intercepts and potentially alters</strong> communications between two parties who believe they\'re communicating directly.<br><br><strong>MITM Attack Types:</strong><br>• <strong>ARP Spoofing</strong> — Poisoning local network tables<br>• <strong>DNS Spoofing</strong> — Redirecting domain lookups<br>• <strong>SSL Stripping</strong> — Downgrading HTTPS to HTTP<br>• <strong>BGP Hijacking</strong> — Internet routing attacks<br>• <strong>Evil Twin WiFi</strong> — Rogue access points<br><br><strong>Cryptographic Defenses:</strong><br>✅ TLS/HTTPS — Certificates verify server identity<br>✅ Certificate Pinning — App trusts only specific cert<br>✅ HSTS — Force HTTPS always<br>✅ Public Key Pinning — Advanced cert verification<br>✅ Mutual TLS (mTLS) — Both sides authenticated<br><br><em>💡 Always verify the padlock AND domain name — SSL doesn\'t mean the site is legitimate.</em>',
        sg: ['What is TLS?', 'What is PKI?', 'What is certificate pinning?']
    },
    {
        id: 'sidechan',
        kw: ['side channel','timing attack','power analysis','cache attack','spectre','meltdown','side channel attack'],
        cat: 'security',
        ans: '<strong>What are Side-Channel Attacks?</strong> ⚡<br><br>Side-channel attacks exploit <strong>physical implementation details</strong> rather than mathematical weaknesses in cryptographic algorithms.<br><br><strong>Attack Types:</strong><br>• <strong>Timing Attacks</strong> — Measure operation time to infer secrets<br>• <strong>Power Analysis</strong> — Measure power consumption during crypto<br>• <strong>Electromagnetic</strong> — Monitor EM emissions<br>• <strong>Cache Attacks</strong> — Exploit CPU cache behavior (Spectre, Meltdown)<br>• <strong>Acoustic</strong> — Sound of computation<br><br><strong>Famous Examples:</strong><br>• PS3 ECDSA nonce attack → private key extracted<br>• Heartbleed — memory leak exposed private keys<br>• Spectre/Meltdown — CPU cache side-channels<br><br><strong>Defenses:</strong><br>✅ Constant-time implementations<br>✅ Hardware Security Modules (HSM)<br>✅ Blinding techniques<br>✅ Noise injection<br>✅ Process isolation<br><br><em>💡 A mathematically perfect algorithm can still be broken through poor implementation — side channels are why hardware crypto matters.</em>',
        sg: ['What is ECC?', 'What is RSA?', 'What is ECDSA?']
    },
    {
        id: 'replay',
        kw: ['replay attack','what is replay attack','session replay','replay prevention','nonce','timestamp'],
        cat: 'security',
        ans: '<strong>What is a Replay Attack?</strong> 🔄<br><br>A replay attack occurs when an attacker <strong>captures and retransmits</strong> valid encrypted messages to deceive a system into accepting them again.<br><br><strong>Example Scenario:</strong><br>1. Alice sends encrypted "Transfer $100 to Bob"<br>2. Attacker records the message<br>3. Attacker resends same message 100 times<br>4. Bank processes 100 transfers!<br><br><strong>Prevention Techniques:</strong><br>• <strong>Nonces</strong> — Unique random number per message (used once)<br>• <strong>Timestamps</strong> — Messages expire after short window<br>• <strong>Sequence Numbers</strong> — Monotonically increasing<br>• <strong>Session Tokens</strong> — Unique per session<br>• <strong>Challenge-Response</strong> — Server sends fresh challenge each time<br><br><strong>Used In:</strong><br>🔹 TLS record layer (sequence numbers)<br>🔹 Kerberos (timestamps)<br>🔹 OAuth tokens (jti claim)<br><br><em>💡 Blockchain prevents replay attacks by including block height and chain ID in transaction signatures.</em>',
        sg: ['What is TLS?', 'What is HMAC?', 'What is blockchain?']
    },
    {
        id: 'padding',
        kw: ['padding oracle','padding attack','poodle','beast attack','lucky thirteen','padding scheme'],
        cat: 'security',
        ans: '<strong>What is a Padding Oracle Attack?</strong> 🎰<br><br>Padding oracle attacks exploit error messages about <strong>invalid padding</strong> in block cipher decryption to decrypt ciphertext without the key.<br><br><strong>How It Works:</strong><br>1. Attacker submits modified ciphertext<br>2. Server reveals whether padding is valid or not<br>3. Attacker uses this oracle to decrypt byte-by-byte<br>4. Decrypts entire message with enough queries<br><br><strong>Famous Padding Attacks:</strong><br>❌ <strong>POODLE</strong> — SSL 3.0 CBC padding<br>❌ <strong>BEAST</strong> — TLS 1.0 CBC attack<br>❌ <strong>Lucky Thirteen</strong> — Timing-based CBC attack<br><br><strong>Defenses:</strong><br>✅ Use AEAD modes (AES-GCM) — authentication prevents oracle<br>✅ TLS 1.3 — Only AEAD cipher suites<br>✅ Constant-time decryption + verification<br>✅ Never reveal padding-specific errors<br><br><em>💡 This is exactly why TLS 1.3 mandates AEAD encryption and dropped CBC mode support.</em>',
        sg: ['What is AES-GCM?', 'What is TLS?', 'What is cipher mode?']
    },


    // ╔═══════════════════════════════════════╗
    // ║     CRYPTOGRAPHIC CONCEPTS            ║
    // ╚═══════════════════════════════════════╝

    {
        id: 'kdf',
        kw: ['kdf','key derivation','pbkdf2','hkdf','what is kdf','derive key','key stretching'],
        cat: 'learn',
        ans: '<strong>What is a Key Derivation Function (KDF)?</strong> 🔑<br><br>A KDF derives <strong>cryptographic keys</strong> from a source material (like a password) in a secure and controlled manner.<br><br><strong>Types of KDFs:</strong><br>• <strong>PBKDF2</strong> — Password-Based KDF 2 (NIST standard, many iterations)<br>• <strong>Argon2id</strong> — Memory-hard, PHC winner ✅<br>• <strong>scrypt</strong> — Memory + CPU hard<br>• <strong>bcrypt</strong> — Classic, widely supported<br>• <strong>HKDF</strong> — HMAC-based Extract-and-Expand KDF (TLS, Signal)<br><br><strong>Password Stretching:</strong><br>• Makes each attempt slow (prevent brute force)<br>• PBKDF2: configurable iterations<br>• Argon2id: configurable memory and time cost<br><br><strong>Key Expansion (HKDF):</strong><br>• Takes secure master secret → derives multiple keys<br>• Used in TLS 1.3 key schedule<br>• Signal Protocol double ratchet<br><br><em>💡 HKDF is used to derive session keys in TLS 1.3 — expanding one master secret into separate keys for each direction.</em>',
        sg: ['What is bcrypt?', 'What is TLS?', 'Password security']
    },
    {
        id: 'prng',
        kw: ['random number','prng','csprng','randomness','entropy source','random generator','secure random'],
        cat: 'learn',
        ans: '<strong>Cryptographic Random Number Generation</strong> 🎲<br><br>Randomness is the <strong>foundation of all cryptography</strong> — weak random number generation is catastrophic.<br><br><strong>Types:</strong><br>• <strong>PRNG</strong> — Pseudorandom Number Generator (deterministic, seeded)<br>• <strong>CSPRNG</strong> — Cryptographically Secure PRNG (unpredictable)<br>• <strong>TRNG</strong> — True RNG (hardware noise: thermal, quantum)<br><br><strong>CSPRNG Sources:</strong><br>• Linux: <code>/dev/urandom</code> (ChaCha20 based)<br>• Windows: <code>BCryptGenRandom</code><br>• Hardware: Intel RDRAND, AMD RDSEED<br>• Hardware Security Modules<br><br><strong>Catastrophic Failures:</strong><br>❌ Debian SSL bug (2008) — 32,768 predictable keys<br>❌ Android Bitcoin wallets (2013) — repeated k values<br>❌ PS3 ECDSA — static k → private key extracted<br><br><strong>Rules:</strong><br>✅ Always use CSPRNG for cryptographic keys<br>✅ Never use <code>Math.random()</code> for security<br>✅ Use <code>crypto.getRandomValues()</code> in browser<br><br><em>💡 "Anyone who attempts to generate random numbers by deterministic means is living in sin." — John von Neumann</em>',
        sg: ['What is ECDSA?', 'What is key generation?', 'RSA Key Generator']
    },
    {
        id: 'obfus',
        kw: ['obfuscation','security through obscurity','steganography','hidden message','what is steganography'],
        cat: 'learn',
        ans: '<strong>Obfuscation vs Cryptography</strong> 🙈<br><br><strong>Security through Obscurity:</strong><br>Hiding HOW something works rather than mathematically securing it.<br>❌ Not considered true security<br>❌ Once algorithm is discovered → complete failure<br>❌ Violates Kerckhoffs\'s Principle<br><br><strong>Kerckhoffs\'s Principle:</strong><br>"A cryptosystem should be secure even if everything about the system, except the key, is public knowledge."<br><br><strong>Steganography:</strong><br>Hiding the existence of a message (different from encryption)<br>• Hide text in image pixel LSBs<br>• Hide data in audio waveforms<br>• Invisible watermarks<br>• Combined with encryption = very powerful<br><br><strong>Obfuscation Uses (legitimate):</strong><br>🔹 Intellectual property protection<br>🔹 Anti-cheat systems (supplementary)<br>🔹 Anti-analysis of malware (attackers use this too!)<br><br><em>💡 Cryptography is open and peer-reviewed. AES, RSA, and SHA-256 are public — their strength comes from math, not secrecy.</em>',
        sg: ['What is AES?', 'What is Kerckhoffs principle?', 'What is encryption?']
    },
    {
        id: 'hsm',
        kw: ['hsm','hardware security module','tpm','secure enclave','what is hsm','key storage','hardware crypto'],
        cat: 'learn',
        ans: '<strong>What is a Hardware Security Module (HSM)?</strong> 🔐<br><br>An HSM is a <strong>tamper-resistant hardware device</strong> that securely stores cryptographic keys and performs cryptographic operations.<br><br><strong>Key Features:</strong><br>• Keys never leave the hardware unencrypted<br>• Physical tamper protection (self-destruct on breach)<br>• FIPS 140-2/3 certified<br>• Dedicated crypto acceleration<br><br><strong>HSM vs TPM vs Secure Enclave:</strong><br>• <strong>HSM</strong> — Enterprise, network-attached, high throughput<br>• <strong>TPM</strong> — Consumer, on-motherboard, platform integrity<br>• <strong>Secure Enclave</strong> — Mobile (Apple, Android), biometric keys<br>• <strong>YubiKey</strong> — Personal security key (FIDO2, PIV)<br><br><strong>HSM Use Cases:</strong><br>🔹 Certificate Authority key protection<br>🔹 Payment card processing (PCI-DSS required)<br>🔹 Code signing infrastructure<br>🔹 Blockchain custody solutions<br><br><em>💡 Every major bank and CA uses HSMs to protect their root private keys — some are stored in vaults guarded 24/7.</em>',
        sg: ['What is PKI?', 'What is RSA?', 'What is code signing?']
    },
    {
        id: 'xor',
        kw: ['xor','xor encryption','one time pad','otp','vernam cipher','what is xor crypto'],
        cat: 'learn',
        ans: '<strong>XOR and the One-Time Pad</strong> ⊕<br><br>XOR (exclusive OR) is the <strong>fundamental operation</strong> underlying most stream ciphers and the theoretically perfect One-Time Pad.<br><br><strong>XOR Truth Table:</strong><br>0 ⊕ 0 = 0<br>0 ⊕ 1 = 1<br>1 ⊕ 0 = 1<br>1 ⊕ 1 = 0<br><br><strong>XOR Cipher:</strong><br>Encrypt: plaintext ⊕ key = ciphertext<br>Decrypt: ciphertext ⊕ key = plaintext<br><br><strong>One-Time Pad (Vernam Cipher):</strong><br>• Key = truly random, same length as message, used once<br>• Mathematically PROVEN unbreakable (Shannon, 1949)<br>• Perfect secrecy — ciphertext reveals zero information<br><br><strong>OTP Practical Problems:</strong><br>❌ Key must be as long as message<br>❌ Truly random key required<br>❌ Key must be securely distributed<br>❌ Key must never be reused (Two-time pad = broken!)<br><br><em>💡 Stream ciphers like AES-CTR and ChaCha20 are pseudorandom approximations of the OTP.</em>',
        sg: ['What is AES?', 'What is ChaCha20?', 'What is stream cipher?']
    },


    // ╔═══════════════════════════════════════╗
    // ║     REAL-WORLD CRYPTO EVENTS          ║
    // ╚═══════════════════════════════════════╝

    {
        id: 'heartbleed',
        kw: ['heartbleed','openssl bug','heartbleed vulnerability','ssl bug 2014','memory leak'],
        cat: 'security',
        ans: '<strong>Heartbleed Bug (CVE-2014-0160)</strong> 💔<br><br>Heartbleed was a catastrophic OpenSSL vulnerability discovered in April <strong>2014</strong> that allowed attackers to read server memory remotely.<br><br><strong>What Happened:</strong><br>• OpenSSL heartbeat extension had a bounds-checking bug<br>• Attacker sent small heartbeat → requested large response<br>• Server returned 64KB of memory contents<br>• Memory contained: private keys, passwords, session tokens<br><br><strong>Impact:</strong><br>• ~17% of the internet\'s secure servers affected<br>• All major websites required password resets<br>• Private keys potentially compromised<br>• No server-side logging of attacks<br><br><strong>Lessons Learned:</strong><br>✅ Memory-safe languages (Rust, Go) prevent such bugs<br>✅ Regular security audits of crypto libraries<br>✅ Certificate revocation readiness<br>✅ Bug bounty programs<br><br><em>💡 Heartbleed prompted the Core Infrastructure Initiative — funding critical open-source security projects.</em>',
        sg: ['What is TLS?', 'What is PKI?', 'What is OpenSSL?']
    },
    {
        id: 'stuxnet',
        kw: ['stuxnet','stuxnet worm','industrial malware','cyberweapon','stolen certificate'],
        cat: 'security',
        ans: '<strong>Stuxnet — Crypto-Enabled Cyberweapon</strong> 💣<br><br>Stuxnet (discovered 2010) was the world\'s first known cyber weapon, targeting Iran\'s nuclear program — notable for its sophisticated use and abuse of cryptography.<br><br><strong>Cryptographic Aspects:</strong><br>• Used <strong>two stolen, valid digital certificates</strong> (Realtek, JMicron) to sign drivers<br>• Bypassed Windows signature verification<br>• Exploited MD5 weaknesses in certificate verification<br>• Encrypted command-and-control communications<br><br><strong>How Stolen Certs Enabled It:</strong><br>• Windows requires signed drivers<br>• Stuxnet signed with real, trusted certificates<br>• Appeared legitimate to security software<br><br><strong>Crypto Lessons:</strong><br>✅ Code signing is only as strong as key security<br>✅ Certificate revocation must be fast<br>✅ Multiple signing certificates should be monitored<br>❌ MD5 certificate fingerprints were being used<br><br><em>💡 Stuxnet demonstrated that cryptographic trust systems can be weaponized if private keys are stolen.</em>',
        sg: ['What is code signing?', 'What is PKI?', 'What is MD5?']
    },
    {
        id: 'shatrd',
        kw: ['shattered','sha1 collision','google sha1','sha1 attack 2017','sha1 broken'],
        cat: 'security',
        ans: '<strong>SHAttered — SHA-1 Collision Attack (2017)</strong> 💥<br><br>In February 2017, Google researchers demonstrated the first <strong>practical SHA-1 collision</strong>, producing two different PDF files with identical SHA-1 hashes.<br><br><strong>Technical Details:</strong><br>• Required 9 quintillion (9 × 10¹⁸) SHA-1 computations<br>• Used 6,500 CPU-years and 110 GPU-years<br>• Cost approximately $110,000 in cloud computing<br>• Collision found in PDF parsing structure<br><br><strong>Impact:</strong><br>• Definitively proved SHA-1 unsafe for security<br>• GitHub, browsers dropped SHA-1 support<br>• Certificate authorities stopped issuing SHA-1 certs<br><br><strong>Aftermath:</strong><br>✅ Accelerated migration to SHA-256<br>✅ Chrome/Firefox display warnings for SHA-1 sites<br>✅ Git announced plans to migrate from SHA-1<br><br><em>💡 The actual collision PDFs are available at shattered.io — you can verify them yourself!</em>',
        sg: ['Is SHA-1 safe?', 'What is SHA-256?', 'Hash Generator']
    },


    // ╔═══════════════════════════════════════╗
    // ║     SECURITY CONCEPTS                 ║
    // ╚═══════════════════════════════════════╝

    {
        id: 'cia',
        kw: ['cia triad','confidentiality','integrity','availability','what is cia','security triad','information security'],
        cat: 'learn',
        ans: '<strong>The CIA Triad</strong> 🛡️<br><br>The three fundamental goals of information security:<br><br><strong>Confidentiality:</strong><br>• Only authorized parties access data<br>• Cryptographic tools: Encryption (AES, RSA), Access Control<br>• Threats: Eavesdropping, data breaches<br><br><strong>Integrity:</strong><br>• Data is accurate and unmodified<br>• Cryptographic tools: Hash functions, Digital signatures, MACs<br>• Threats: Tampering, corruption, injection attacks<br><br><strong>Availability:</strong><br>• Systems accessible when needed<br>• Tools: Redundancy, DDoS protection, backups<br>• Threats: DDoS attacks, ransomware, hardware failures<br><br><strong>Extended: CIAAN</strong><br>+ <strong>Authenticity</strong> — Verified identity<br>+ <strong>Non-repudiation</strong> — Cannot deny actions<br><br><em>💡 Cryptography primarily serves Confidentiality and Integrity — it\'s the mathematical backbone of information security.</em>',
        sg: ['What is encryption?', 'What is a hash?', 'What is digital signature?']
    },
    {
        id: 'hybrid',
        kw: ['hybrid encryption','hybrid cryptography','rsa aes combined','asymmetric symmetric combined'],
        cat: 'learn',
        ans: '<strong>What is Hybrid Encryption?</strong> 🔐<br><br>Hybrid encryption combines <strong>asymmetric and symmetric encryption</strong> to get the best of both: security of public-key crypto + speed of symmetric crypto.<br><br><strong>How It Works:</strong><br>1. Generate random symmetric key (AES-256 session key)<br>2. Encrypt actual data with symmetric key (fast!)<br>3. Encrypt symmetric key with recipient\'s public key (RSA/ECC)<br>4. Send: encrypted data + encrypted session key<br>5. Recipient decrypts session key with private key<br>6. Uses session key to decrypt data<br><br><strong>Why It\'s Used Everywhere:</strong><br>• RSA/ECC encryption is 1000x slower than AES<br>• AES can\'t solve key distribution alone<br>• Hybrid gets: speed + secure key exchange<br><br><strong>Real Implementations:</strong><br>🔹 TLS/HTTPS — ECDHE key exchange → AES session<br>🔹 PGP/GPG — RSA wrapped AES key<br>🔹 Signal — X3DH + AES encryption<br><br><em>💡 Every HTTPS connection uses hybrid encryption — this is the foundation of internet security.</em>',
        sg: ['What is RSA?', 'What is AES?', 'What is TLS?', 'Symmetric vs Asymmetric?']
    },
    {
        id: 'ciphertext',
        kw: ['ciphertext','plaintext','what is ciphertext','what is plaintext','encrypted data','cipher text'],
        cat: 'learn',
        ans: '<strong>Plaintext vs Ciphertext</strong> 📝🔒<br><br><strong>Plaintext:</strong><br>• The original, readable data before encryption<br>• Example: "Hello, World!"<br>• Also called: cleartext<br><br><strong>Ciphertext:</strong><br>• Scrambled, unreadable output after encryption<br>• Example: <code>U2FsdGVkX1+3/Rd...</code><br>• Appears random without the key<br><br><strong>Encryption Process:</strong><br>Plaintext + Key + Algorithm → Ciphertext<br><br><strong>Decryption Process:</strong><br>Ciphertext + Key (+ Algorithm) → Plaintext<br><br><strong>Key Properties of Good Ciphertext:</strong><br>✅ Indistinguishable from random data<br>✅ Small plaintext change → completely different ciphertext<br>✅ No statistical patterns visible<br>✅ Size reveals minimum info about plaintext<br><br><em>💡 Semantic security means an attacker cannot determine ANY information about plaintext from ciphertext.</em>',
        sg: ['What is AES?', 'Encryption Tool', 'What is a cipher?']
    },
    {
        id: 'encoding',
        kw: ['base64','hex encoding','encoding vs encryption','base58','what is base64','url encoding'],
        cat: 'learn',
        ans: '<strong>Encoding vs Encryption vs Hashing</strong> ⚠️<br><br>Three very different operations often confused:<br><br><strong>Encoding:</strong><br>• Converts data format — NOT for security!<br>• Reversible without any key<br>• Examples: Base64, Hex, URL encoding<br>• Purpose: Data transmission compatibility<br>❌ Base64 is NOT encryption<br><br><strong>Encryption:</strong><br>• Protects confidentiality<br>• Reversible WITH the correct key<br>• Examples: AES, RSA<br>• Purpose: Keep data secret<br><br><strong>Hashing:</strong><br>• Creates fixed-length fingerprint<br>• Irreversible (one-way)<br>• Examples: SHA-256, MD5<br>• Purpose: Integrity verification<br><br><strong>Common Misconception:</strong><br>❌ "I encoded it in Base64, so it\'s encrypted"<br>✅ Base64 is trivially reversible by anyone!<br><br><em>💡 Bitcoin addresses use Base58Check — Base58 encoding with checksum, NOT encryption.</em>',
        sg: ['What is encryption?', 'What is a hash?', 'What is AES?']
    },


    // ╔═══════════════════════════════════════╗
    // ║     SECURITY BEST PRACTICES           ║
    // ╚═══════════════════════════════════════╝

    {
        id: 'cryptobp',
        kw: ['cryptography best practices','crypto recommendations','which algorithm','best crypto','recommended algorithms','secure coding crypto'],
        cat: 'security',
        ans: '<strong>Cryptography Best Practices 2024</strong> ✅<br><br><strong>Symmetric Encryption:</strong><br>✅ AES-256-GCM (first choice)<br>✅ ChaCha20-Poly1305 (mobile/no AES hardware)<br>❌ DES, 3DES, RC4, Blowfish<br><br><strong>Asymmetric Encryption / Key Exchange:</strong><br>✅ ECDH with Curve25519 or P-256<br>✅ RSA-2048 minimum (RSA-4096 preferred)<br>❌ RSA-1024, DH < 2048-bit<br><br><strong>Digital Signatures:</strong><br>✅ Ed25519 (first choice)<br>✅ ECDSA P-256 with RFC 6979<br>✅ RSA-PSS (2048+ bits)<br>❌ RSA-PKCS1v1.5, DSA-1024<br><br><strong>Hashing:</strong><br>✅ SHA-256, SHA-512, SHA-3<br>✅ BLAKE2, BLAKE3<br>❌ MD5, SHA-1<br><br><strong>Password Hashing:</strong><br>✅ Argon2id (OWASP #1)<br>✅ bcrypt, scrypt<br>❌ MD5, SHA-256 (unsalted or fast)<br><br><strong>Protocols:</strong><br>✅ TLS 1.3, SSH with Ed25519<br>❌ SSL, TLS 1.0/1.1, Telnet<br><br><em>💡 Always use peer-reviewed, standardized algorithms — never implement your own crypto!</em>',
        sg: ['What is AES?', 'What is Ed25519?', 'What is Argon2?']
    },
    {
        id: 'norollcrypto',
        kw: ['roll your own crypto','custom crypto','dont roll crypto','implement crypto','own algorithm'],
        cat: 'security',
        ans: '<strong>⚠️ Never Roll Your Own Crypto!</strong><br><br>One of the most important rules in cryptography:<br><strong>"Don\'t roll your own crypto"</strong><br><br><strong>Why Amateur Crypto Always Fails:</strong><br>• Cryptographic algorithms require years of peer review<br>• Subtle flaws are invisible to non-experts<br>• Side-channel vulnerabilities are extremely hard to avoid<br>• You will miss edge cases attackers will exploit<br><br><strong>Historical Examples of Failed Custom Crypto:</strong><br>❌ DVD encryption (CSS) — Broken by students in 1999<br>❌ GSM A5/1 — Broken, calls interceptable<br>❌ WEP — Completely broken due to bad RC4 use<br>❌ Telegram\'s MTProto (v1) — Multiple vulnerabilities<br><br><strong>What You SHOULD Do:</strong><br>✅ Use established libraries (libsodium, OpenSSL, BouncyCastle)<br>✅ Use high-level APIs designed to prevent mistakes<br>✅ Have crypto code audited by experts<br>✅ Follow NIST/OWASP recommendations<br><br><em>💡 Even expert cryptographers at NSA and universities miss vulnerabilities — don\'t try to do better alone.</em>',
        sg: ['What are best practices?', 'What is AES?', 'What is libsodium?']
    },
    {
        id: 'about',
        kw: ['about cryptokit','what is cryptokit','who made','cryptokit info','is cryptokit safe','about this site'],
        cat: 'help',
        ans: '<strong>About CryptoKit</strong> 🔐<br><br>CryptoKit is your free, open-source cryptography toolkit built for security professionals, developers, and learners.<br><br><strong>Security Principles:</strong><br>🔒 <strong>Zero data storage</strong> — Nothing sent to servers<br>🌐 <strong>Client-side processing</strong> — All crypto runs in your browser<br>📖 <strong>Open source</strong> — Fully auditable code<br>🆓 <strong>Free forever</strong> — No subscriptions<br>🛡️ <strong>NIST compliant</strong> — Only vetted algorithms<br><br><strong>Tools Available:</strong><br>🔹 Hash Generator (MD5, SHA-1/256/512, SHA-3)<br>🔹 File Integrity Checker<br>🔹 RSA Key Generator<br>🔹 Text Encrypt/Decrypt (AES-256, RSA)<br>🔹 Digital Signature Tool<br>🔹 Password Strength & Generator<br><br><strong>Algorithms Used:</strong><br>All tools use Web Crypto API or audited JavaScript libraries implementing NIST-approved algorithms.',
        sg: ['See all tools', 'Learn cryptography', 'Hash Generator', 'RSA Key Generator']
    }
];