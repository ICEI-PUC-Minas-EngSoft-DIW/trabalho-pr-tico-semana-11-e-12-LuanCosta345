// Estrutura JSON dos itens (dados fictícios) — escopo global
const ITEMS = [
  {
    id: 'trilha-canion',
    title: 'Trilha do Cânion',
    description: 'Percurso entre rochas e leito de rio até o cânion.',
    image: './trilha.jpg',
    difficulty: 'Média',
    distanceKm: 6.5,
    durationMin: 180,
    bestSeason: 'Maio a Agosto',
    location: 'Conceição do Mato Dentro - MG',
    photos: [
      { src: './trilha.jpg', title: 'Trecho da trilha' },
      { src: './trechoDoRioPedras.jpg', title: 'Rio com pedras' }
    ]
  },
  {
    id: 'poco-cachoeira',
    title: 'Poço da Cachoeira',
    description: 'Chegada ao poço principal com vista da queda.',
    image: './poço.jpg',
    difficulty: 'Difícil',
    distanceKm: 18,
    durationMin: 420,
    bestSeason: 'Junho a Setembro',
    location: 'Parque do Tabuleiro - MG',
    photos: [
      { src: './poço.jpg', title: 'Poço principal' },
      { src: './riachoQuedaCachoeira.jpg', title: 'Riacho e queda' }
    ]
  },
  {
    id: 'mirante-superior',
    title: 'Mirante Superior',
    description: 'Vista panorâmica para fotografias e contemplação.',
    image: './mirante.jpg',
    difficulty: 'Média',
    distanceKm: 4.2,
    durationMin: 150,
    bestSeason: 'Ano todo',
    location: 'Serra do Espinhaço - MG',
    photos: [
      { src: './mirante.jpg', title: 'Mirante superior' },
      { src: './PanoramaMontanha.jpg', title: 'Panorama das montanhas' }
    ]
  }
];

document.addEventListener('DOMContentLoaded', () => {
  console.log('App inicializado');

  // Renderização dinâmica dos cards na home
  const cardsContainer = document.getElementById('cards-container');
  if (cardsContainer) {
    renderHomeCards(ITEMS, cardsContainer);
  }

  // Carrossel de destaques na home
  const carouselContainer = document.getElementById('carousel-container');
  if (carouselContainer) {
    renderHighlightsCarousel(ITEMS, carouselContainer);
  }

  // Seção do autor
  const authorContainer = document.getElementById('autor-container');
  if (authorContainer) {
    renderAuthorSection(authorContainer);
  }

  // Renderização da página de detalhes quando aplicável
  const detailsContainer = document.getElementById('detalhes-container');
  if (detailsContainer) {
    renderDetailsPage(detailsContainer);
  }
});

function renderHomeCards(items, container) {
  if (!Array.isArray(items)) return;
  container.innerHTML = '';

  items.forEach((item) => {
    const col = document.createElement('div');
    col.className = 'col-lg-4 col-md-6';

    const card = document.createElement('div');
    card.className = 'card h-100 shadow-sm border-0';

    const img = document.createElement('img');
    img.src = item.image;
    img.alt = item.title;
    img.className = 'card-img-top';
    img.style.height = '200px';
    img.style.objectFit = 'cover';

    const body = document.createElement('div');
    body.className = 'card-body';

    const h5 = document.createElement('h5');
    h5.className = 'card-title text-primary';
    h5.textContent = item.title;

    const p = document.createElement('p');
    p.className = 'card-text';
    p.textContent = item.description;

    const link = document.createElement('a');
    link.href = `detalhes.html?id=${encodeURIComponent(item.id)}`;
    link.className = 'btn btn-outline-primary';
    link.textContent = 'Ver detalhes';

    body.appendChild(h5);
    body.appendChild(p);
    body.appendChild(link);

    card.appendChild(img);
    card.appendChild(body);

    col.appendChild(card);
    container.appendChild(col);
  });
}

function renderHighlightsCarousel(items, container) {
  if (!Array.isArray(items) || items.length === 0) return;

  const id = 'carouselDestaques';

  container.innerHTML = '';

  const carousel = document.createElement('div');
  carousel.id = id;
  carousel.className = 'carousel slide';
  carousel.setAttribute('data-bs-ride', 'carousel');

  const indicators = document.createElement('div');
  indicators.className = 'carousel-indicators';

  const inner = document.createElement('div');
  inner.className = 'carousel-inner rounded shadow';

  items.forEach((item, index) => {
    const button = document.createElement('button');
    button.type = 'button';
    button.setAttribute('data-bs-target', `#${id}`);
    button.setAttribute('data-bs-slide-to', String(index));
    if (index === 0) button.className = 'active';
    button.setAttribute('aria-label', `Slide ${index + 1}`);
    indicators.appendChild(button);

    const slide = document.createElement('div');
    slide.className = `carousel-item${index === 0 ? ' active' : ''}`;

    const img = document.createElement('img');
    img.src = item.image;
    img.alt = item.title;
    img.className = 'd-block w-100';
    img.style.height = '420px';
    img.style.objectFit = 'cover';

    const caption = document.createElement('div');
    caption.className = 'carousel-caption d-none d-md-block bg-dark bg-opacity-50 rounded p-3';
    const h5 = document.createElement('h5');
    h5.textContent = item.title;
    const p = document.createElement('p');
    p.textContent = item.description;
    const link = document.createElement('a');
    link.href = `detalhes.html?id=${encodeURIComponent(item.id)}`;
    link.className = 'btn btn-warning btn-sm';
    link.textContent = 'Ver detalhes';
    caption.appendChild(h5);
    caption.appendChild(p);
    caption.appendChild(link);

    slide.appendChild(img);
    slide.appendChild(caption);
    inner.appendChild(slide);
  });

  const prev = document.createElement('button');
  prev.className = 'carousel-control-prev';
  prev.type = 'button';
  prev.setAttribute('data-bs-target', `#${id}`);
  prev.setAttribute('data-bs-slide', 'prev');
  prev.innerHTML = '<span class="carousel-control-prev-icon" aria-hidden="true"></span><span class="visually-hidden">Anterior</span>';

  const next = document.createElement('button');
  next.className = 'carousel-control-next';
  next.type = 'button';
  next.setAttribute('data-bs-target', `#${id}`);
  next.setAttribute('data-bs-slide', 'next');
  next.innerHTML = '<span class="carousel-control-next-icon" aria-hidden="true"></span><span class="visually-hidden">Próximo</span>';

  carousel.appendChild(indicators);
  carousel.appendChild(inner);
  carousel.appendChild(prev);
  carousel.appendChild(next);

  container.appendChild(carousel);
}

function renderAuthorSection(container) {
  container.innerHTML = '';
  const card = document.createElement('div');
  card.className = 'card border-0 shadow';
  const body = document.createElement('div');
  body.className = 'card-body';
  const h3 = document.createElement('h3');
  h3.className = 'fw-bold text-primary mb-3';
  h3.textContent = 'Sobre o Autor';
  const p = document.createElement('p');
  p.className = 'mb-2';
  p.textContent = 'Trabalho acadêmico desenvolvido por Luan Costa. Projeto base para a próxima etapa com consumo de APIs e funcionalidades avançadas.';
  const list = document.createElement('ul');
  list.className = 'mb-0';
  const li1 = document.createElement('li'); li1.textContent = 'Curso: Programação Web';
  const li2 = document.createElement('li'); li2.textContent = 'Semestre: 2025/2';
  const li3 = document.createElement('li'); li3.textContent = 'Contato: luan@example.com';
  list.appendChild(li1); list.appendChild(li2); list.appendChild(li3);
  body.appendChild(h3);
  body.appendChild(p);
  body.appendChild(list);
  card.appendChild(body);
  container.appendChild(card);
}

function renderDetailsPage(container) {
  const params = new URLSearchParams(window.location.search);
  const id = params.get('id');

  if (!id) {
    container.innerHTML = '<div class="alert alert-warning" role="alert">Nenhum item informado na URL.</div>';
    return;
  }

  const item = ITEMS.find((i) => i.id === id);
  if (!item) {
    container.innerHTML = '<div class="alert alert-danger" role="alert">Item não encontrado.</div>';
    return;
  }

  container.innerHTML = '';

  const colImg = document.createElement('div');
  colImg.className = 'col-lg-6';
  const img = document.createElement('img');
  img.src = item.image;
  img.alt = item.title;
  img.className = 'img-fluid rounded shadow';
  colImg.appendChild(img);

  const colText = document.createElement('div');
  colText.className = 'col-lg-6 d-flex align-items-center';
  const content = document.createElement('div');
  const h1 = document.createElement('h2');
  h1.className = 'fw-bold text-primary mb-3';
  h1.textContent = item.title;
  const p = document.createElement('p');
  p.className = 'lead';
  p.textContent = item.description;

  // Lista com 5+ detalhes
  const detailsList = document.createElement('ul');
  detailsList.className = 'list-unstyled mt-3';
  const d1 = document.createElement('li'); d1.innerHTML = `<strong>Dificuldade:</strong> ${item.difficulty}`;
  const d2 = document.createElement('li'); d2.innerHTML = `<strong>Distância:</strong> ${item.distanceKm} km`;
  const d3 = document.createElement('li'); d3.innerHTML = `<strong>Duração:</strong> ${Math.round(item.durationMin/60)}h ${item.durationMin%60}min`;
  const d4 = document.createElement('li'); d4.innerHTML = `<strong>Melhor época:</strong> ${item.bestSeason}`;
  const d5 = document.createElement('li'); d5.innerHTML = `<strong>Localização:</strong> ${item.location}`;
  detailsList.appendChild(d1); detailsList.appendChild(d2); detailsList.appendChild(d3); detailsList.appendChild(d4); detailsList.appendChild(d5);

  const back = document.createElement('a');
  back.href = 'index.html';
  back.className = 'btn btn-outline-secondary mt-3';
  back.textContent = 'Voltar para a Home';

  content.appendChild(h1);
  content.appendChild(p);
  content.appendChild(detailsList);
  content.appendChild(back);
  colText.appendChild(content);

  container.appendChild(colImg);
  container.appendChild(colText);

  // Seção de fotos vinculadas
  const fotosContainer = document.getElementById('fotos-container');
  if (fotosContainer) {
    fotosContainer.innerHTML = '';
    const row = document.createElement('div');
    row.className = 'row g-3';
    (item.photos || []).forEach((photo) => {
      const col = document.createElement('div');
      col.className = 'col-sm-6 col-md-4 col-lg-3';
      const card = document.createElement('div');
      card.className = 'card border-0 shadow-sm h-100';
      const img = document.createElement('img');
      img.src = photo.src;
      img.alt = photo.title;
      img.className = 'card-img-top';
      img.style.height = '160px';
      img.style.objectFit = 'cover';
      const body = document.createElement('div');
      body.className = 'card-body p-2';
      const small = document.createElement('p');
      small.className = 'card-text small text-muted text-center';
      small.textContent = photo.title;
      body.appendChild(small);
      card.appendChild(img);
      card.appendChild(body);
      col.appendChild(card);
      row.appendChild(col);
    });
    fotosContainer.appendChild(row);
  }
}


