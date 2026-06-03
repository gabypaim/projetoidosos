const temas = {
  animais: {
    palavras: ['GATO', 'CAO', 'PATO', 'URSO', 'LOBO', 'SAPO', 'RATO'],
    grade: [
      ['G', 'A', 'T', 'O', 'L', 'B', 'B', 'B'],
      ['C', 'E', 'W', 'J', 'O', 'X', 'l', 'X'],
      ['A', 'R', 'U', 'X', 'B', 'X', 'O', 'M'],
      ['O', 'O', 'R', 'P', 'R', 'D', 'P', 'Y'],
      ['G', 'O', 'S', 'A', 'Z', 'C', 'U', 'S'],
      ['X', 'V', 'O', 'T', 'B', 'X', 'I', 'Q'],
      ['L', 'O', 'B', 'O', 'Ç', 'K', 'V', 'l'],
      ['R', 'A', 'T', 'O', 'S', 'A', 'P', 'O']
    ]
  },
  cores: {
    palavras: ['AZUL', 'ROSA', 'VERDE', 'BRANCO', 'PRETO', 'AMARELO', 'CINZA'],
    grade: [
      ['A', 'Z', 'U', 'L', 'R', 'P', 'X', 'B'],
      ['T', 'B', 'R', 'A', 'N', 'C', 'O', 'C'],
      ['R', 'A', 'S', 'D', 'B', 'E', 'E', 'I'],
      ['O', 'G', 'R', 'A', 'N', 'C', 'O', 'N'],
      ['S', 'M', 'I', 'N', 'Z', 'A', 'K', 'Z'],
      ['A', 'P', 'R', 'E', 'T', 'O', 'R', 'A'],
      ['L', 'A', 'M', 'A', 'R', 'E', 'L', 'O'],
      ['V', 'E', 'R', 'D', 'E', 'X', 'Y', 'Z']
    ]
  },
  objetos: {
    palavras: ['MESA', 'CADEIRA', 'LIVRO', 'PANELA', 'JANELA', 'TESOURA', 'COPO'],
    grade: [
      ['M', 'E', 'S', 'A', 'C', 'A', 'D', 'T'],
      ['X', 'Z', 'J', 'I', 'R', 'A', 'T', 'E'],
      ['P', 'A', 'N', 'E', 'L', 'A', 'Q', 'S'],
      ['L', 'I', 'V', 'R', 'O', 'B', 'L', 'O'],
      ['J', 'A', 'N', 'E', 'L', 'A', 'O', 'U'],
      ['C', 'O', 'P', 'O', 'Z', 'S', 'X', 'R'],
      ['R', 'U', 'A', 'S', 'O', 'U', 'R', 'A'],
      ['C', 'A', 'D', 'E', 'I', 'R', 'A', 'M']
    ]
  },
  paises: {
    palavras: ['BRASIL', 'CHINA', 'MEXICO', 'FRANCA', 'ITALIA', 'EGITO', 'JAPAO'],
    grade: [
      ['B', 'R', 'A', 'S', 'I', 'L', 'I', 'E'],
      ['H', 'O', 'H', 'I', 'M', 'A', 'T', 'G'],
      ['M', 'E', 'X', 'I', 'C', 'O', 'A', 'I'],
      ['F', 'C', 'A', 'N', 'C', 'A', 'L', 'T'],
      ['I', 'H', 'A', 'L', 'I', 'A', 'I', 'O'],
      ['G', 'I', 'E', 'G', 'O', 'R', 'A', 'T'],
      ['S', 'N', 'J', 'A', 'P', 'A', 'O', 'O'],
      ['L', 'A', 'F', 'R', 'A', 'N', 'C', 'A']
    ]
  }
};

let selecionadas = [];
let letrasElementos = [];
let palavrasEncontradas = new Set();
let palavras = [];
let gradeLetras = [];

function iniciarJogo(temaSelecionado) {
  const tema = temas[temaSelecionado];
  palavras = tema.palavras;
  gradeLetras = tema.grade;

  document.getElementById('menu').style.display = 'none';
  document.getElementById('jogo').style.display = 'flex';
  document.getElementById('mensagem-final').style.display = 'none';
  palavrasEncontradas.clear();
  selecionadas = [];
  letrasElementos = [];

  const grade = document.getElementById('grade');
  grade.innerHTML = '';
  document.getElementById('lista-palavras').textContent = palavras.join(', ');

  for (let i = 0; i < gradeLetras.length; i++) {
    for (let j = 0; j < gradeLetras[i].length; j++) {
      const letra = document.createElement('div');
      letra.classList.add('letra');
      letra.textContent = gradeLetras[i][j];
      letra.dataset.row = i;
      letra.dataset.col = j;
      letra.addEventListener('mousedown', startSelect);
      letra.addEventListener('mouseenter', continueSelect);
      letra.addEventListener('mouseup', endSelect);

      // Suporte ao toque:
      letra.addEventListener('touchstart', (e) => {
        e.preventDefault(); // evita o zoom e outros comportamentos
        startSelect({ target: letra });
      }, { passive: false });

      letra.addEventListener('touchmove', (e) => {
        e.preventDefault();
        const touch = e.touches[0];
        const element = document.elementFromPoint(touch.clientX, touch.clientY);
        if (element?.classList.contains('letra')) {
          continueSelect({ target: element });
        }
      }, { passive: false });

      letra.addEventListener('touchend', (e) => {
        e.preventDefault();
        endSelect();
      }, { passive: false });
            grade.appendChild(letra);
            letrasElementos.push(letra);
          }
  }
}

let selecionando = false;

function startSelect(e) {
  selecionando = true;
  selecionadas = [e.target];
  e.target.classList.add('selecionada');
}

function continueSelect(e) {
  if (selecionando && !selecionadas.includes(e.target)) {
    selecionadas.push(e.target);
    e.target.classList.add('selecionada');
  }
}

function endSelect() {
  selecionando = false;
  const palavraFormada = selecionadas.map(el => el.textContent).join('').toUpperCase();
  if (palavras.includes(palavraFormada) && !palavrasEncontradas.has(palavraFormada)) {
    palavrasEncontradas.add(palavraFormada);
    selecionadas.forEach(el => {
      el.classList.remove('selecionada');
      el.classList.add('encontrada');
    });
    document.getElementById('audio-acerto').play();
  } else {
    selecionadas.forEach(el => el.classList.remove('selecionada'));
  }
  selecionadas = [];
  atualizarLista();
}

function atualizarLista() {
  const restantes = palavras.filter(p => !palavrasEncontradas.has(p));
  document.getElementById('lista-palavras').textContent = restantes.join(', ');
  if (restantes.length === 0) {
    const msg = document.getElementById('mensagem-final');
    msg.style.display = 'block';
    msg.style.animation = 'cair-do-topo 1.2s ease-out forwards';
    confetti();
  }
}

function voltarMenu() {
  document.getElementById('jogo').style.display = 'none';
  document.getElementById('menu').style.display = 'block';
}

function reiniciarJogo() {
  iniciarJogo(Object.keys(temas).find(t => temas[t].palavras === palavras));
}

document.body.addEventListener('mouseup', () => {
  if (selecionando) endSelect();
});

function confetti() {
  const duration = 2000;
  const end = Date.now() + duration;

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