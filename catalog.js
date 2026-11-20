const operator = 'https://www.onlinetours.ru';
const studioPath = '/oteli/oae/deira/studio-m-arabian-plaza-hotel-hotel-apartments-by-millennium';
const standardDates = '26 декабря — 1 января';
const shortDates = '28 декабря — 1 января';
const meals = {
  breakfast: 'Завтраки',
  half: 'Двухразовое',
  full: 'Трёхразовое'
};

function offer(meal, price, bookingPath) {
  return { meal, price, bookingPath };
}

const hotels = [
  {
    name: 'Studio M Arabian Plaza', area: 'Дейра', stars: 3, rating: 8.6,
    image: 'studio', alt: 'Бассейн Studio M Arabian Plaza', path: studioPath,
    gallery: [["studio-room", "Номер Studio M Arabian Plaza"], ["studio-dining", "Ресторан Studio M Arabian Plaza"]],
    description: 'Хвалят сытные завтраки и горячие блюда. Есть жалобы на однообразие. Метро рядом, отзывы о шаттле до пляжа расходятся.',
    offers: [offer('breakfast', 111420, '/offer_groups?group=1Q88p7Tkpzjq3FMAXXpbSZ095TJ9GjzbIt71E5chbvMUzI4-f4jzsGnRBq7bz07XlU4Qg68fMhLL6UJ61uf4dnBJ39p6HIJsbrkmJFFUp0wZrmEkS2rVag61--mYgQmThNxGPkMW4A--wc0jpN4uAcCYNp4sjvUAbw'), offer('half', 124260, '/book/298db66fdb79c5d1f3624b96ef231dd8'), offer('full', 137099, '/book/bf90044d77c820484aedbf19ea2a3461')]
  },
  {
    name: 'ibis Deira Creekside', area: 'Дейра', stars: 3, rating: 8.9,
    image: 'creek', alt: 'Номер ibis Deira Creekside', path: '/oteli/oae/dubai/ibis-deira-city-centre',
    gallery: [["creek-lobby", "Лобби ibis Deira Creekside"], ["creek-dining", "Ресторан ibis Deira Creekside"]],
    description: 'Гости хвалят завтраки и ужины. Некоторые отмечают, что блюда повторяются.',
    offers: [offer('breakfast', 125139), offer('half', 139649, '/book/a1d75c0b2e4c05c416b07dffb878081d')]
  },
  {
    name: 'ibis One Central', area: 'World Trade Centre', stars: 3, rating: 9.2,
    image: 'central', alt: 'Лобби ibis One Central', path: '/oteli/oae/trade-centre-area/ibis-one-central',
    gallery: [["central-room", "Номер ibis One Central"], ["central-dining", "Ресторан ibis One Central"]],
    description: 'Хвалят разнообразный завтрак и ужины по меню. Удобно добираться в центр.',
    offers: [offer('breakfast', 143450, '/book/97e257644ee13f4b32fdefea8422665a'), offer('half', 151732)]
  },
  {
    name: 'Mövenpick Grand Al Bustan', area: 'Аль-Гархуд', stars: 5, rating: 9.1,
    image: 'bustan', alt: 'Кафе Mövenpick Grand Al Bustan', path: '/oteli/oae/dubai/roda-al-bustan-hotel',
    gallery: [["bustan-room", "Номер Mövenpick Grand Al Bustan"], ["bustan-dining", "Ресторан Mövenpick Grand Al Bustan"]],
    description: 'Много похвалы за кухню в целом. Есть отдельные жалобы на однообразные завтраки.',
    offers: [offer('breakfast', 141848, '/book/2ebef5ad94fd301a30ed217996c1e4c5'), offer('half', 165855)]
  },
  {
    name: 'Citymax Bur Dubai', area: 'Бур-Дубай', stars: 3, rating: 7,
    image: 'citymax', alt: 'Бассейн Citymax Bur Dubai', path: '/oteli/oae/dubai/citymax-hotel-bur-dubai',
    gallery: [["citymax-room", "Номер Citymax Bur Dubai"], ["citymax-dining", "Ресторан Citymax Bur Dubai"]],
    description: 'Простой завтрак, много индийских блюд. Известна цена праздничного ужина.',
    offers: [offer('breakfast', 113883), offer('half', 129888, '/book/624a401c177ab0dc9fb4db32370cc6ae')]
  },
  {
    name: 'ibis Dubai Al Rigga', area: 'Дейра', stars: 3, rating: 8,
    image: 'rigga', alt: 'Завтрак в ibis Dubai Al Rigga', path: '/oteli/oae/dubai/ibis-al-rigga-dubai',
    gallery: [["rigga-room", "Номер ibis Dubai Al Rigga"], ["rigga-lobby", "Кафе ibis Dubai Al Rigga"]],
    description: 'Сытный завтрак с яйцами, йогуртами и фруктами. Рядом метро и кафе.',
    offers: [offer('breakfast', 125139), offer('half', 139649, '/book/01ea0da12f1e12bffa2749581a82dbdf')]
  },
  {
    name: 'ibis Mall Avenue', area: 'Аль-Барша', stars: 3, rating: 8.3,
    image: 'mall', alt: 'Стойка регистрации ibis Mall Avenue', path: '/oteli/oae/dubai/ibis-mall-of-the-emirates',
    gallery: [["mall-room", "Номер ibis Mall Avenue"], ["mall-dining", "Ресторан ibis Mall Avenue"]],
    description: 'Гости хвалят выбор на завтрак и двухразовое питание. Номера скромные, торговый центр рядом.',
    offers: [offer('breakfast', 127074), offer('half', 141496, '/book/ed719b8b7865c26f63f44363192654fb')]
  },
  {
    name: 'Rose Plaza', area: 'Аль-Барша', stars: 3,
    image: 'rose', alt: 'Терраса с бассейном Rose Plaza', path: '/oteli/oae/al-barsha/rose-plaza',
    gallery: [["rose-room", "Номер Rose Plaza"], ["rose-lobby", "Лаунж Rose Plaza"]],
    description: 'Хвалят фрукты, яйца на заказ и разнообразие завтрака. Отзывов о еде немного. Цены из карточки.',
    offers: [offer('breakfast', 127953), offer('half', 140704)]
  },
  {
    name: 'Citymax Al Barsha at the Mall', area: 'Аль-Барша', stars: 3, rating: 8,
    image: 'barsha', alt: 'Бассейн Citymax Al Barsha at the Mall', path: '/oteli/oae/dubai/citymax-hotel-al-barsha',
    gallery: [["barsha-room", "Номер Citymax Al Barsha at the Mall"], ["barsha-dining", "Ресторан Citymax Al Barsha at the Mall"]],
    description: 'Завтраки сытные, выбор оценивают по-разному. Некоторым гостям ужины понравились больше завтраков.',
    offers: [offer('breakfast', 126106), offer('half', 142112, '/offer_groups?group=ui4KX-B4QRLotK0QpT93vvLLQ4QWYYO_7KIQXEN0iRIzQO3SAoNN7EBCBfFnk7Uz_QCYztoqumF0EM5zcs7QStrPF2ufk19inBZzM125OXQtNahBZNGOMEzE--xwlh8ip4jA170Ybi--oO2AOOG431eFVDRrMe6pIw')]
  },
  {
    name: 'ibis Styles Jumeira', area: 'Джумейра', stars: 3, rating: 7.6,
    image: 'jumeira', alt: 'Номер ibis Styles Jumeira', path: '/oteli/oae/jumeira/ibis-styles-dubai-jumeira',
    gallery: [["jumeira-dining", "Шведский стол ibis Styles Jumeira"], ["jumeira-room", "Номер с двумя кроватями ibis Styles Jumeira"]],
    description: 'Завтрак простой, часть гостей отмечает повторяющиеся блюда. Вариант для тех, кому важен район.',
    offers: [offer('breakfast', 140001), offer('half', 149235, '/book/71920ebc9625322ed40721b0b99c24e7')]
  },
  {
    name: 'Holiday Inn Express Dubai Airport', area: 'Рядом с аэропортом', stars: 3,
    image: 'airport', alt: 'Фасад Holiday Inn Express Dubai Airport', path: '/oteli/oae/dubai/holiday-inn-express-dubai-airport',
    gallery: [["airport-room", "Номер Holiday Inn Express Dubai Airport"], ["airport-dining", "Зал завтраков Holiday Inn Express Dubai Airport"]],
    description: 'Есть похвала за разнообразие завтрака и жалобы на очереди. Расположение удобно для аэропорта.',
    offers: [offer('breakfast', 129536), offer('half', 143958, '/book/99bdb8ca2ceac59bf168784875af00d9')]
  },
  {
    name: 'Comfort Inn', area: 'Дейра', stars: 3, rating: 5,
    image: 'comfort', alt: 'Бассейн Comfort Inn', path: '/oteli/oae/dubai/comfort-inn-hotel-apartments',
    gallery: [["comfort-room", "Номер Comfort Inn"], ["comfort-dining", "Ресторан Comfort Inn"]],
    description: 'В отзывах часто упоминают скудные завтраки и небольшие порции на обед.',
    offers: [offer('breakfast', 125051), offer('half', 131823, '/book/546086bb340a05ac92f87a512ecb3fd0')]
  },
  {
    name: 'IntercityHotel Jaddaf Waterfront', area: 'Аль-Джадаф', stars: 3,
    image: 'intercity', alt: 'Бассейн IntercityHotel Jaddaf Waterfront', path: '/oteli/oae/jadaf/intercityhotel-dubai-jaddaf-waterfront',
    gallery: [["intercity-room", "Номер IntercityHotel Jaddaf Waterfront"], ["intercity-dining", "Ресторан IntercityHotel Jaddaf Waterfront"]],
    dates: shortDates, day: '28', nights: '4',
    description: 'Общая оценка Booking — 7,9. Континентальный завтрак или шведский стол. Цена из карточки.',
    offers: [offer('breakfast', 135830), offer('half', 149514)]
  },
];

const grid = document.querySelector('#catalog-grid');
const count = document.querySelector('#results-count');
const budget = document.querySelector('#budget');
const sort = document.querySelector('#sort');
const filterButtons = [...document.querySelectorAll('button[data-meal]')];
const formatter = new Intl.NumberFormat('ru-RU');
let activeMeal = 'all';

function rubles(price) {
  return formatter.format(price) + ' ₽';
}

function tourLink(hotel, chosen) {
  if (chosen.bookingPath) return operator + chosen.bookingPath;
  const day = hotel.day ?? '26';
  const nights = hotel.nights ?? '6';
  const date = '2026-12-' + day;
  const query = new URLSearchParams({
    adults: '2',
    depart_city_id: '20001',
    start_from: date,
    start_to: date,
    duration_from: nights,
    duration_to: nights,
    ticket_strategy: 'include'
  });
  return operator + hotel.path + '?' + query;
}

function makeText(tag, value, className) {
  const element = document.createElement(tag);
  element.textContent = value;
  if (className) element.className = className;
  return element;
}

function makeLink(text, hotel, chosen, className) {
  const link = makeText('a', text, className);
  link.href = tourLink(hotel, chosen);
  link.target = '_blank';
  link.rel = 'noopener noreferrer';
  link.setAttribute('aria-label', hotel.name + ', ' + meals[chosen.meal] + ', ' + rubles(chosen.price));
  return link;
}

function makeHotelGallery(hotel) {
  const gallery = makeText('div', '', 'hotel-gallery');
  gallery.setAttribute('role', 'group');
  gallery.setAttribute('aria-label', 'Фотографии отеля ' + hotel.name);
  const track = makeText('div', '', 'hotel-gallery-track');
  track.tabIndex = 0;
  track.setAttribute('aria-label', 'Лента фотографий');

  const photos = [[hotel.image, hotel.alt], ...hotel.gallery];
  for (const [file, alt] of photos) {
    const photo = document.createElement('img');
    photo.className = 'hotel-img';
    photo.src = 'assets/' + file + '.webp';
    photo.alt = alt;
    photo.loading = 'lazy';
    photo.decoding = 'async';
    photo.draggable = false;
    photo.width = 780;
    photo.height = 605;
    track.append(photo);
  }

  const previous = makeText('button', '', 'gallery-control gallery-prev');
  const next = makeText('button', '', 'gallery-control gallery-next');
  previous.type = next.type = 'button';
  previous.setAttribute('aria-label', 'Предыдущее фото');
  next.setAttribute('aria-label', 'Следующее фото');
  const count = makeText('span', '', 'gallery-count');
  count.setAttribute('aria-live', 'polite');
  count.setAttribute('aria-atomic', 'true');

  const last = photos.length - 1;
  function current() {
    return Math.max(0, Math.min(last, Math.round(track.scrollLeft / (track.clientWidth || 1))));
  }
  function update(index) {
    count.textContent = (index + 1) + ' / ' + photos.length;
    previous.setAttribute('aria-disabled', String(index === 0));
    next.setAttribute('aria-disabled', String(index === last));
  }
  function move(step) {
    const index = current();
    const target = Math.max(0, Math.min(last, index + step));
    if (target !== index) track.scrollTo({ left: track.clientWidth * target });
  }
  previous.addEventListener('click', () => move(-1));
  next.addEventListener('click', () => move(1));
  track.addEventListener('keydown', event => {
    if (event.key !== 'ArrowLeft' && event.key !== 'ArrowRight') return;
    event.preventDefault();
    move(event.key === 'ArrowRight' ? 1 : -1);
  });
  let shown = 0;
  track.addEventListener('scroll', () => {
    const index = current();
    if (index === shown) return;
    shown = index;
    update(index);
  }, { passive: true });
  update(0);
  gallery.append(track, previous, next, count);
  return gallery;
}

function makeHotelCard(hotel, relevant) {
  const card = document.createElement('article');
  card.className = 'hotel';
  card.dataset.price = String(Math.min(...relevant.map(tour => tour.price)));
  const meta = document.createElement('div');
  meta.className = 'hotel-meta';
  meta.append(makeText('span', hotel.stars + '★ · ' + hotel.area));
  if (hotel.rating) meta.append(makeText('span', 'Еда ' + formatter.format(hotel.rating) + '/10', 'hotel-rating'));

  const priceList = document.createElement('ul');
  priceList.className = 'hotel-prices';
  for (const tour of relevant) {
    const row = document.createElement('li');
    row.append(makeText('span', meals[tour.meal]), makeLink('от ' + rubles(tour.price), hotel, tour));
    priceList.append(row);
  }

  const preferred = relevant.find(tour => tour.meal === 'half') ?? relevant[0];
  const buttonText = preferred.bookingPath ? 'Открыть тур' : 'Выбрать тур';
  card.append(
    makeHotelGallery(hotel), meta, makeText('h3', hotel.name),
    makeText('p', hotel.dates ?? standardDates, 'hotel-dates'),
    makeText('p', hotel.description, 'hotel-text'), priceList,
    makeLink(buttonText, hotel, preferred, 'button outlined')
  );
  return card;
}

function render() {
  const available = hotels.map(hotel => ({
    hotel,
    options: hotel.offers.filter(tour =>
      (activeMeal === 'all' || activeMeal === tour.meal) &&
      (!budget.checked || tour.price <= 150000))
  })).filter(entry => entry.options.length);

  if (sort.value === 'low') {
    const lowest = entry => Math.min(...entry.options.map(tour => tour.price));
    available.sort((a, b) => lowest(a) - lowest(b));
  } else if (sort.value === 'rating') {
    available.sort((a, b) => (b.hotel.rating ?? 0) - (a.hotel.rating ?? 0));
  }

  const cards = available.map(entry => makeHotelCard(entry.hotel, entry.options));
  grid.replaceChildren(...cards);
  if (!cards.length) grid.append(makeText('p', 'Туров по этим параметрам нет. Попробуйте другое питание или снимите ограничение по цене.', 'no-results'));
  const forms = { one: 'отель', few: 'отеля', many: 'отелей' };
  count.textContent = available.length + ' ' + forms[new Intl.PluralRules('ru-RU').select(available.length)];
}

function setMeal(selected) {
  activeMeal = selected;
  for (const button of filterButtons) {
    button.setAttribute('aria-pressed', String(button.dataset.meal === selected));
  }
  render();
}

for (const button of filterButtons) {
  button.addEventListener('click', () => setMeal(button.dataset.meal));
}
for (const shortcut of document.querySelectorAll('[data-shortcut]')) {
  shortcut.addEventListener('click', () => {
    budget.checked = true;
    setMeal(shortcut.dataset.shortcut);
  });
}

sort.addEventListener('change', render);
budget.addEventListener('change', render);
render();
