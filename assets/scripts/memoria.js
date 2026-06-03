 const objetos = [
      '🚒','🌃','⌚','🚗','📺','💾','💻','🚼','🛎','🪑','👔','🍽️','📚','🌊','🧳'
    ];

    const board = document.getElementById("game-board");
    const scoreDisplay = document.getElementById("score");
    const congrats = document.getElementById("congrats");
    const restartBtn = document.getElementById("restart-btn");
    const matchSound = document.getElementById("match-sound");

    let flipped = [], lockBoard = false, score = 0, matchedPairs = 0;

    function shuffle(array) {
      return array.sort(() => 0.5 - Math.random());
    }

    function createCard(icon) {
      const card = document.createElement("div");
      card.classList.add("card");
      card.dataset.icon = icon;

      card.innerHTML = `
        <div class="card-inner">
          <div class="card-front">❓</div>
          <div class="card-back">${icon}</div>
        </div>
      `;

      card.addEventListener("click", () => {
        if (lockBoard || card.classList.contains("flipped") || flipped.includes(card)) return;
       
        card.classList.add("flipped");
        flipped.push(card);

        if (flipped.length === 2) {
          lockBoard = true;
          const [first, second] = flipped;
          if (first.dataset.icon === second.dataset.icon) {
            matchSound.play();
            score += 10;
            matchedPairs++;
            scoreDisplay.textContent = `Pontos: ${score}`;
            flipped = [];
            lockBoard = false;
            if (matchedPairs === objetos.length) showCongrats();
          } else {
            setTimeout(() => {
              first.classList.remove("flipped");
              second.classList.remove("flipped");
              flipped = [];
              lockBoard = false;
            }, 1000);
          }
        }
      });

      return card;
    }

    function initGame() {
      board.innerHTML = "";
      flipped = [];
      lockBoard = false;
      score = 0;
      matchedPairs = 0;
      scoreDisplay.textContent = "Pontos: 0";
      congrats.style.display = "none";
      restartBtn.style.display = "none";

      const icons = shuffle([...objetos, ...objetos]);
      icons.forEach(icon => {
        const card = createCard(icon);
        board.appendChild(card);
      });
    }

    function showCongrats() {
      congrats.style.display = "block";
      restartBtn.style.display = "inline-block";
      confetti();
    }

    function confetti() {
      const duration = 2 * 1000;
      const end = Date.now() + duration;
      const colors = ['#bb0000', '#ffffff', '#00bb00', '#0000bb'];

      (function frame() {
        confettiEffect();
        if (Date.now() < end) requestAnimationFrame(frame);
      })();
    }

    function confettiEffect() {
      const particle = document.createElement("div");
      particle.style.position = "fixed";
      particle.style.zIndex = 1000;
      particle.style.width = "10px";
      particle.style.height = "10px";
      particle.style.background = `hsl(${Math.random() * 360}, 100%, 50%)`;
      particle.style.left = `${Math.random() * 100}%`;
      particle.style.top = `0%`;
      particle.style.opacity = 1;
      particle.style.transition = "top 2s ease, opacity 2s ease";

      document.body.appendChild(particle);
      setTimeout(() => {
        particle.style.top = "100%";
        particle.style.opacity = 0;
      }, 50);
      setTimeout(() => particle.remove(), 2000);
    }

    restartBtn.addEventListener("click", initGame);
    initGame();