const nav = document.getElementById('nav');
  window.addEventListener('scroll', () => {
    nav.classList.toggle('scrolled', window.scrollY > 20);
  });

  // Blog modal
  const modalData = {
    'quem-e-glaucia': {
      photo: 'popup1.jpg',
      tag: 'Quem sou eu',
      title: 'Conheça Gláucia Gianet: a psicóloga por trás do EMDR',
      text: `
        <p>Formada em Psicologia pela Universidade Estadual de Londrina (UEL), com especialização em Terapia Cognitivo-Comportamental pelo Instituto Aaron Beck e certificação em EMDR pelo Instituto EMDR Brasil, Gláucia Gianet construiu uma carreira centrada em um objetivo: transformar o sofrimento emocional em reais possibilidades de mudança.</p>
        <p>Seu consultório, localizado no coração de Belo Horizonte, foi pensado para ser um espaço de acolhimento genuíno, um lugar onde o paciente se sente seguro para trazer o que mais pesa. "Acredito que a terapia precisa ser técnica E humana. Uma não funciona sem a outra", afirma.</p>
        <p>Com mais de 5.000 atendimentos realizados e avaliação 5,0 no Google, Gláucia é reconhecida pela capacidade de criar vínculos terapêuticos sólidos desde o primeiro atendimento. Seus pacientes relatam não apenas melhora dos sintomas, mas uma reestruturação completa da forma como encaram a vida.</p>
        <p>Além do atendimento presencial em BH, ela atende online para todo o Brasil, tornando o acesso ao EMDR possível independente de onde você esteja.</p>
        <p><strong>Especialidades:</strong> EMDR · TCC · Neuropsicologia · Ansiedade · Trauma · Depressão · Relacionamentos · Psicologia do Trânsito</p>
      `
    },
    'o-que-e-emdr': {
      photo: 'popup2.jpg',
      tag: 'EMDR',
      title: 'O que é EMDR e como ele funciona no cérebro?',
      text: `
        <p>EMDR significa <em>Eye Movement Desensitization and Reprocessing</em>, Dessensibilização e Reprocessamento por Movimentos Oculares. É uma abordagem terapêutica desenvolvida nos anos 80 pela pesquisadora Francine Shapiro e hoje reconhecida pela Organização Mundial da Saúde (OMS) como tratamento de primeira linha para trauma e TEPT.</p>
        <p><strong>Como funciona na prática?</strong> Durante as sessões, o paciente é guiado a evocar memórias perturbadoras enquanto realiza movimentos oculares bilaterais (ou outro tipo de estimulação bilateral). Esse processo ativa o mecanismo natural de processamento do cérebro, semelhante ao que acontece durante o sono REM, permitindo que memórias "travadas" sejam integradas de forma adaptativa.</p>
        <p><strong>O que acontece no cérebro?</strong> Estudos de neuroimagem mostram que o EMDR reduz a hiperatividade da amígdala (centro do medo) e fortalece a conexão com o córtex pré-frontal (centro da razão). O resultado: a memória traumática perde sua carga emocional, você ainda lembra o que aconteceu, mas sem o sofrimento de antes.</p>
        <p><strong>Quem pode se beneficiar?</strong> O EMDR vai muito além do trauma de guerra. Ele é indicado para ansiedade, depressão, fobias, relacionamentos disfuncionais, baixa autoestima, lutos não elaborados, burnout e qualquer experiência passada que ainda cause sofrimento no presente.</p>
        <p>As sessões com Gláucia seguem um protocolo estruturado de 8 fases, adaptado à história e ao ritmo de cada paciente. Atendimento online ou presencial em BH.</p>
      `
    },
    'evolucao-emdr': {
      photo: 'popup3.jpg',
      tag: 'Transformação',
      title: 'Como sei se estou evoluindo na terapia EMDR?',
      text: `
        <p>Uma das dúvidas mais comuns de quem inicia o processo terapêutico com EMDR é: "Como vou saber se estou melhorando?" A boa notícia é que o progresso costuma ser perceptível, às vezes de forma rápida, às vezes gradual, mas sempre real.</p>
        <p><strong>Primeiras semanas:</strong> É comum sentir um certo processamento emocional entre sessões, vivências que surgem durante o dia, sonhos mais vívidos, ou uma sensação de "reorganização interna". Isso é sinal de que o processo está acontecendo.</p>
        <p><strong>Após 4 a 8 sessões:</strong> A maioria dos pacientes começa a notar que situações que antes disparavam reações intensas (ansiedade, raiva, evitação) passam a ser encaradas com mais calma. A memória perturbadora começa a perder sua carga emocional.</p>
        <p><strong>Sinais concretos de progresso:</strong></p>
        <p>→ Conseguir pensar em um evento doloroso sem sentir o mesmo sofrimento físico (aperto no peito, falta de ar, choro)<br>
        → Dormir melhor e ter menos pesadelos<br>
        → Reagir de forma diferente em situações que antes te desestabilizavam<br>
        → Sentir-se mais presente no seu próprio corpo e na sua vida<br>
        → Perceber mudanças positivas em relacionamentos e autoconhecimento</p>
        <p>Cada processo é único. Gláucia acompanha de perto a evolução de cada paciente, ajustando o protocolo conforme necessário. Se você está curioso sobre como o EMDR pode funcionar no seu caso específico, agende uma conversa inicial, sem compromisso.</p>
      `
    }
  };

  function openModal(id) {
    const d = modalData[id];
    if (!d) return;
    document.getElementById('modalPhoto').src = d.photo;
    document.getElementById('modalPhoto').alt = d.title;
    document.getElementById('modalTag').textContent = d.tag;
    document.getElementById('modalTitle').textContent = d.title;
    document.getElementById('modalText').innerHTML = d.text;
    document.getElementById('modalOverlay').classList.add('active');
    document.body.style.overflow = 'hidden';
  }

  function closeModal() {
    document.getElementById('modalOverlay').classList.remove('active');
    document.body.style.overflow = '';
  }

  function closeModalOutside(e) {
    if (e.target === document.getElementById('modalOverlay')) closeModal();
  }

  document.addEventListener('keydown', e => { if (e.key === 'Escape') closeModal(); });

  // Reviews carousel
  (function() {
    const track   = document.querySelector('.reviews-track');
    const slider  = document.getElementById('reviewsSlider');
    const dotsEl  = document.getElementById('reviewDots');
    const prevBtn = document.getElementById('reviewPrev');
    const nextBtn = document.getElementById('reviewNext');
    if (!slider) return;

    const cards = Array.from(slider.querySelectorAll('.review-card'));
    const GAP   = 24;
    let cur = 0;

    function visible() {
      return window.innerWidth < 640 ? 1 : window.innerWidth < 1024 ? 2 : 3;
    }

    function cardWidth() {
      const v = visible();
      return (track.clientWidth - GAP * (v - 1)) / v;
    }

    function buildDots() {
      dotsEl.innerHTML = '';
      const total = cards.length - visible() + 1;
      for (let i = 0; i < total; i++) {
        const d = document.createElement('button');
        d.className = 'carousel-dot' + (i === 0 ? ' active' : '');
        d.addEventListener('click', () => goTo(i));
        dotsEl.appendChild(d);
      }
    }

    function goTo(idx) {
      const max = cards.length - visible();
      cur = Math.max(0, Math.min(idx, max));
      const w = cardWidth();
      cards.forEach(c => { c.style.width = w + 'px'; });
      slider.style.transform = 'translateX(-' + (cur * (w + GAP)) + 'px)';
      Array.from(dotsEl.children).forEach((d, i) => d.classList.toggle('active', i === cur));
      prevBtn.disabled = cur === 0;
      nextBtn.disabled = cur >= max;
    }

    prevBtn.addEventListener('click', () => goTo(cur - 1));
    nextBtn.addEventListener('click', () => goTo(cur + 1));

    function init() { buildDots(); goTo(0); }
    init();
    window.addEventListener('resize', init);
  })();

  // Transforms accordion (mobile only)
  document.querySelectorAll('.transform-card').forEach(function(card) {
    card.addEventListener('click', function() {
      if (window.innerWidth > 640) return;
      var isOpen = card.classList.contains('open');
      document.querySelectorAll('.transform-card.open').forEach(function(c){ c.classList.remove('open'); });
      if (!isOpen) card.classList.add('open');
    });
  });