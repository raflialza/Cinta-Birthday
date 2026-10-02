document.addEventListener("DOMContentLoaded", () => {
  // 1. Controls Play / Pause Background Music
  const musicBtn = document.getElementById("musicBtn");
  const bgMusic = document.getElementById("bgMusic");
  let isPlaying = false;

  musicBtn.addEventListener("click", () => {
    if (isPlaying) {
      bgMusic.pause();
      musicBtn.classList.remove("playing");
      musicBtn.innerHTML = '<i class="fas fa-music"></i>';
    } else {
      bgMusic.play();
      musicBtn.classList.add("playing");
      musicBtn.innerHTML = '<i class="fas fa-pause"></i>';
    }
    isPlaying = !isPlaying;
  });

  // 2. Button Scroll & Trigger Confetti
  const openSurpriseBtn = document.getElementById("openSurpriseBtn");
  const letterSection = document.getElementById("letterSection");

  openSurpriseBtn.addEventListener("click", () => {
    letterSection.scrollIntoView({ behavior: "smooth" });
    triggerConfetti();
    // Otomatis putar musik jika belum menyala
    if (!isPlaying) {
      bgMusic.play().catch(() => console.log("Autoplay blocked by browser"));
      musicBtn.classList.add("playing");
      musicBtn.innerHTML = '<i class="fas fa-pause"></i>';
      isPlaying = true;
    }
  });

  // 3. Envelope Toggle
  const envelope = document.getElementById("envelope");
  envelope.addEventListener("click", () => {
    envelope.classList.toggle("open");
  });

  // 4. Tiup Lilin (Blowing Candle Feature)
  const cakeBtn = document.getElementById("cakeBtn");
  const flame = document.getElementById("flame");
  const wishStatus = document.getElementById("wishStatus");

  cakeBtn.addEventListener("click", () => {
    if (!flame.classList.contains("off")) {
      flame.classList.add("off");
      wishStatus.innerText =
        "🎉 Lilin berhasil ditiup! Semoga semua impianmu terkabul, sayang! ❤️";
      triggerConfetti();
    } else {
      flame.classList.remove("off");
      wishStatus.innerText = "Lilin masih menyala 🔥 (Klik kue untuk meniup)";
    }
  });

  // 5. Simple Confetti Particles System
  const canvas = document.getElementById("confettiCanvas");
  const ctx = canvas.getContext("2d");
  let particles = [];

  function resizeCanvas() {
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;
  }

  window.addEventListener("resize", resizeCanvas);
  resizeCanvas();

  function triggerConfetti() {
    const colors = [
      "#ff4d6d",
      "#ff758f",
      "#ffb3c1",
      "#ffd166",
      "#06d6a0",
      "#118ab2",
    ];
    for (let i = 0; i < 80; i++) {
      particles.push({
        x: window.innerWidth / 2,
        y: window.innerHeight / 2,
        vx: (Math.random() - 0.5) * 12,
        vy: (Math.random() - 0.5) * 12 - 3,
        size: Math.random() * 8 + 4,
        color: colors[Math.floor(Math.random() * colors.length)],
        life: 100,
      });
    }
  }

  function updateConfetti() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);

    particles.forEach((p, index) => {
      p.x += p.vx;
      p.y += p.vy;
      p.vy += 0.2; // Gravity
      p.life -= 1;

      ctx.fillStyle = p.color;
      ctx.beginPath();
      ctx.arc(p.x, p.y, p.size, 0, Math.PI * 2);
      ctx.fill();

      if (p.life <= 0) {
        particles.splice(index, 1);
      }
    });

    requestAnimationFrame(updateConfetti);
  }

  updateConfetti();
});
