/* ═══════════════════════════════════════════
   TEAM PAGE - Animations & Effects
═══════════════════════════════════════════ */

// ─── PARTICLE BACKGROUND ───
var teamCanvas = document.getElementById('team-particle-canvas');
var teamCtx = teamCanvas.getContext('2d');

function resizeTeamCanvas() {
    teamCanvas.width = window.innerWidth;
    teamCanvas.height = window.innerHeight;
}
resizeTeamCanvas();

var teamParticles = [];
var TP_CHARS = '0123456789ABCDEF';

function createTeamParticle() {
    return {
        x: Math.random() * teamCanvas.width,
        y: Math.random() * teamCanvas.height,
        size: Math.random() * 12 + 8,
        speed: Math.random() * 0.5 + 0.2,
        opacity: Math.random() * 0.3 + 0.1,
        char: TP_CHARS[Math.floor(Math.random() * TP_CHARS.length)],
        color: Math.random() > 0.5 ? '#6C63FF' : '#00B4D8'
    };
}

for (var i = 0; i < 50; i++) {
    teamParticles.push(createTeamParticle());
}

function animateTeamParticles() {
    teamCtx.clearRect(0, 0, teamCanvas.width, teamCanvas.height);

    for (var i = 0; i < teamParticles.length; i++) {
        var p = teamParticles[i];
        p.y += p.speed;

        if (p.y > teamCanvas.height) {
            teamParticles[i] = createTeamParticle();
            teamParticles[i].y = 0;
        }

        if (Math.random() < 0.03) {
            p.char = TP_CHARS[Math.floor(Math.random() * TP_CHARS.length)];
        }

        teamCtx.globalAlpha = p.opacity;
        teamCtx.fillStyle = p.color;
        teamCtx.font = p.size + 'px JetBrains Mono, monospace';
        teamCtx.fillText(p.char, p.x, p.y);
    }

    requestAnimationFrame(animateTeamParticles);
}

animateTeamParticles();

window.addEventListener('resize', resizeTeamCanvas);


// ─── MEMBER CARDS SCROLL REVEAL ───
var memberObserver = new IntersectionObserver(function(entries) {
    entries.forEach(function(entry) {
        if (entry.isIntersecting) {
            entry.target.classList.add('visible');
            memberObserver.unobserve(entry.target);
        }
    });
}, {
    threshold: 0.15,
    rootMargin: '-50px'
});

var members = document.querySelectorAll('.tp-member');
for (var i = 0; i < members.length; i++) {
    memberObserver.observe(members[i]);
}


// ─── SMOOTH SCROLL FOR SCROLL HINT ───
document.querySelector('.tp-scroll-hint').addEventListener('click', function() {
    document.querySelector('.tp-members-section').scrollIntoView({
        behavior: 'smooth'
    });
});
document.querySelector('.tp-scroll-hint').style.cursor = 'pointer';


// ─── PARALLAX EFFECT ON HERO ORBS ───
window.addEventListener('mousemove', function(e) {
    var orb1 = document.querySelector('.tp-orb-1');
    var orb2 = document.querySelector('.tp-orb-2');

    if (orb1 && orb2) {
        var x = (e.clientX / window.innerWidth) - 0.5;
        var y = (e.clientY / window.innerHeight) - 0.5;

        orb1.style.transform = 'translate(' + (x * 30) + 'px, ' + (y * 30) + 'px)';
        orb2.style.transform = 'translate(' + (x * -30) + 'px, ' + (y * -30) + 'px)';
    }
});