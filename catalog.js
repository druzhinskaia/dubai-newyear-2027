const operator = 'https://www.onlinetours.ru';
const studioPath = '/oteli/oae/deira/studio-m-arabian-plaza-hotel-hotel-apartments-by-millennium';
const standardDates = '26 декабря 2026 — 2 января 2027';

const hotels = [
  {
    name: 'Studio M Arabian Plaza', area: 'Дейра', stars: 3, rating: 8.6,
    image: 'studio', alt: 'Бассейн Studio M Arabian Plaza', path: studioPath,
    coordinates: [25.277002, 55.350269],
    mealTimes: {"breakfast": "06:30–10:30", "dinner": "18:30–22:30", "note": "Level M.", "sources": [["Millennium", "https://www.millenniumhotels.com/en/studio-m-hotel-arabian-plaza/faq/dining"]]},
    gallery: [["studio-room", "Номер Studio M Arabian Plaza"], ["studio-dining", "Ресторан Studio M Arabian Plaza"]],
    description: 'Хвалят сытные завтраки и горячие блюда. Есть жалобы на однообразие. Метро рядом, отзывы о шаттле до пляжа расходятся.',
    albumCount: 51,
    offers: [[160880, "/book/8a30f14f8caf4c53bf539d9f8abbc8aa", "Двухразовое питание"]]
  },
  {
    name: 'ibis Deira Creekside', area: 'Дейра', stars: 3, rating: 8.9,
    image: 'creek', alt: 'Номер ibis Deira Creekside', path: '/oteli/oae/dubai/ibis-deira-city-centre',
    coordinates: [25.253194, 55.332931],
    mealTimes: {"breakfast": "06:30–10:30", "dinner": "18:00–23:00", "note": "Завтрак в Tempo, ужин в Bistro Domino.", "sources": [["Accor", "https://all.accor.com/hotel/6481/index.en.shtml"], ["Onlinetours", "https://www.onlinetours.ru/oteli/oae/dubai/ibis-deira-city-centre?adults=2&cheapest_date=2026-12-04&start_from=2026-12-02&start_to=2026-12-11&ticket_strategy=include"]]},
    gallery: [["creek-lobby", "Лобби ibis Deira Creekside"], ["creek-dining", "Ресторан ibis Deira Creekside"]],
    description: 'Гости хвалят завтраки и ужины. Некоторые отмечают, что блюда повторяются.',
    albumCount: 37,
    offers: [[172347, "/book/8a2b646c6cea70f7bb8288c4b5c5154f", "Двухразовое питание"]]
  },
  {
    name: 'ibis One Central', area: 'World Trade Centre', stars: 3, rating: 9.2,
    image: 'central', alt: 'Лобби ibis One Central', path: '/oteli/oae/trade-centre-area/ibis-one-central',
    coordinates: [25.221433, 55.28622],
    mealTimes: {"breakfast": "06:30–10:00", "dinner": "19:00–23:00", "note": "Ужин по меню в Wok & Co, по данным Onlinetours.", "sources": [["Onlinetours", "https://www.onlinetours.ru/oteli/oae/trade-centre-area/ibis-one-central?adults=2&cheapest_date=2026-11-30&start_from=2026-11-28&start_to=2026-12-04&ticket_strategy=include"]]},
    gallery: [["central-room", "Номер ibis One Central"], ["central-dining", "Ресторан ibis One Central"]],
    description: 'Хвалят разнообразный завтрак и ужины по меню. Удобно добираться в центр.',
    albumCount: 89,
    offers: [[179962, "/book/97a162e1538c0cdecabc11cf43f3ccc4", "Двухразовое питание"]]
  },
  {
    name: 'Mövenpick Grand Al Bustan', area: 'Аль-Гархуд', stars: 5, rating: 9.1,
    image: 'bustan', alt: 'Кафе Mövenpick Grand Al Bustan', path: '/oteli/oae/dubai/roda-al-bustan-hotel',
    coordinates: [25.248039, 55.345355],
    mealTimes: {"breakfast": "06:30–10:30", "dinner": "18:30–00:00", "note": "В Makan по пт–сб завтрак до 11:00.", "sources": [["Mövenpick", "https://movenpick.accor.com/en/middle-east/uae/dubai/grand-al-bustan-dubai/restaurants/makan-casual-dining.html"]]},
    gallery: [["bustan-room", "Номер Mövenpick Grand Al Bustan"], ["bustan-dining", "Ресторан Mövenpick Grand Al Bustan"]],
    description: 'Много похвалы за кухню в целом. Есть отдельные жалобы на однообразные завтраки.',
    albumCount: 109,
    offers: [[217249, "/book/652dbe759ef7677d60aee8569f5aab71", "Двухразовое питание"]]
  },
  {
    name: 'Citymax Bur Dubai', area: 'Бур-Дубай', stars: 3, rating: 7,
    image: 'citymax', alt: 'Бассейн Citymax Bur Dubai', path: '/oteli/oae/dubai/citymax-hotel-bur-dubai',
    coordinates: [25.25111, 55.2921],
    mealTimes: {"breakfast": "06:30–10:30", "dinner": "19:00–23:00", "note": "Расписание City Café из ответа отеля.", "sources": [["Ответ отеля", "https://www.tripadvisor.in/FAQ_Answers-g295424-d1546995-t4870512-Sir_I_am_coming_on_in_hotel_on_17th_jan_Can_you.html"]]},
    gallery: [["citymax-room", "Номер Citymax Bur Dubai"], ["citymax-dining", "Ресторан Citymax Bur Dubai"]],
    description: 'Простой завтрак, много индийских блюд. Известна цена праздничного ужина.',
    albumCount: 68,
    offers: [[168145, "/book/a4ca445a25d164fae2972766c13381bd", "Двухразовое питание"]]
  },
  {
    name: 'ibis Dubai Al Rigga', area: 'Дейра', stars: 3, rating: 8,
    image: 'rigga', alt: 'Завтрак в ibis Dubai Al Rigga', path: '/oteli/oae/dubai/ibis-al-rigga-dubai',
    coordinates: [25.26532, 55.32135],
    mealTimes: {"breakfast": "06:00–10:00", "dinner": "18:00–23:00", "note": "По данным «Пегаса». Expedia указывает завтрак 06:30–10:30.", "sources": [["Пегас", "https://pegast.ru/hotel/uae/dubai/dubai/ibis-al-rigga-16179"], ["Expedia", "https://www.expedia.com/Dubai-Hotels-Ibis-Al-Rigga.h3084786.Hotel-Information"]]},
    gallery: [["rigga-room", "Номер ibis Dubai Al Rigga"], ["rigga-lobby", "Кафе ibis Dubai Al Rigga"]],
    description: 'Сытный завтрак с яйцами, йогуртами и фруктами. Рядом метро и кафе.',
    albumCount: 46,
    offers: [[174972, "/book/ffb4c6194c9844bbe39c707b56387372", "Двухразовое питание"]]
  },
  {
    name: 'ibis Mall Avenue', area: 'Аль-Барша', stars: 3, rating: 8.3,
    image: 'mall', alt: 'Стойка регистрации ibis Mall Avenue', path: '/oteli/oae/dubai/ibis-mall-of-the-emirates',
    coordinates: [25.116528, 55.196111],
    mealTimes: {"breakfast": "06:30–10:30", "dinner": "17:00–23:00", "note": "По сб–вс завтрак до 11:00. Ужин по данным Bronix.", "sources": [["Accor", "https://all.accor.com/hotel/6493/index.en.shtml"], ["Bronix", "https://bronix.uz/new/hotel/uae/dubay/ibis-mall-of-the-emirates"]]},
    gallery: [["mall-room", "Номер ibis Mall Avenue"], ["mall-dining", "Ресторан ibis Mall Avenue"]],
    description: 'Гости хвалят выбор на завтрак и двухразовое питание. Номера скромные, торговый центр рядом.',
    albumCount: 60,
    offers: [[173922, "/book/02052d231bb9ffa9029fa455a73700b1", "Двухразовое питание"]]
  },
  {
    name: 'Rose Plaza', area: 'Аль-Барша', stars: 3,
    image: 'rose', alt: 'Терраса с бассейном Rose Plaza', path: '/oteli/oae/al-barsha/rose-plaza',
    coordinates: [25.114244, 55.202603],
    mealTimes: {"breakfast": "07:00–10:30", "dinner": "Время не подтверждено", "note": "Trip.com указывает часы ресторана 07:00–02:00.", "sources": [["Booking", "https://www.booking.com/hotel/ae/rose-plaza-al-barsha.html?dist=0&keep_landing=1&sb_price_type=total&type=total"], ["Trip.com", "https://ru.trip.com/hotels/dubai-hotel-detail-67683925/rose-plaza-hotel-al-barsha/"]]},
    gallery: [["rose-room", "Номер Rose Plaza"], ["rose-lobby", "Лаунж Rose Plaza"]],
    description: 'Хвалят фрукты, яйца на заказ и разнообразие завтрака. Отзывов о еде немного. Цены из карточки.',
    albumCount: 98,
    offers: [[178645, "/book/b9b3733ecedad2eebaac08346155462b", "Двухразовое питание"]]
  },
  {
    name: 'Citymax Al Barsha at the Mall', area: 'Аль-Барша', stars: 3, rating: 8,
    image: 'barsha', alt: 'Бассейн Citymax Al Barsha at the Mall', path: '/oteli/oae/dubai/citymax-hotel-al-barsha',
    coordinates: [25.11536, 55.20387],
    mealTimes: {"breakfast": "06:30–10:30", "dinner": "19:00–23:00", "note": "Обычное расписание City Café, по данным Bronix.", "sources": [["Bronix", "https://bronix.uz/new/hotel/uae/dubay/citymax-hotel-al-barsha-at-the-mall"]]},
    gallery: [["barsha-room", "Номер Citymax Al Barsha at the Mall"], ["barsha-dining", "Ресторан Citymax Al Barsha at the Mall"]],
    description: 'Завтраки сытные, выбор оценивают по-разному. Некоторым гостям ужины понравились больше завтраков.',
    albumCount: 62,
    offers: [[188890, "/book/3f54ebe218c0da4dadfc57cba0a0651e", "Двухразовое питание"]]
  },
  {
    name: 'ibis Styles Jumeira', area: 'Джумейра', stars: 3, rating: 7.6,
    image: 'jumeira', alt: 'Номер ibis Styles Jumeira', path: '/oteli/oae/jumeira/ibis-styles-dubai-jumeira',
    coordinates: [25.240313, 55.273209],
    mealTimes: {"breakfast": "06:30–10:30", "dinner": "19:00–22:00", "note": "Street Café.", "sources": [["Отель", "https://www.rhotels.ae/en/ibis-styles-jumeira-dubai/dining/street-cafe.html"]]},
    gallery: [["jumeira-dining", "Шведский стол ibis Styles Jumeira"], ["jumeira-room", "Номер с двумя кроватями ibis Styles Jumeira"]],
    description: 'Завтрак простой, часть гостей отмечает повторяющиеся блюда. Вариант для тех, кому важен район.',
    albumCount: 65,
    offers: [[185564, "/book/a8c2df1c04b63ea22ec645429f3a9868", "Двухразовое питание"], [190290, "/book/7c29485ae7caa6342a761aa1b331b70d", "Стандартный с видом на окрестности"]]
  },
  {
    name: 'Holiday Inn Express Dubai Airport', area: 'Рядом с аэропортом', stars: 3,
    image: 'airport', alt: 'Фасад Holiday Inn Express Dubai Airport', path: '/oteli/oae/dubai/holiday-inn-express-dubai-airport',
    coordinates: [25.24163, 55.36028],
    mealTimes: {"breakfast": "06:30–10:00", "dinner": "18:00–22:00", "note": "Завтрак по Onlinetours. «Пегас» указывает 06:00–09:30 и ужин 18:00–22:00.", "sources": [["Onlinetours", "https://www.onlinetours.ru/oteli/oae/dubai/holiday-inn-express-dubai-airport"], ["Пегас", "https://pegast.ru/hotel/uae/dubai/dubai/holiday-inn-express-dubai-airport-garhoud-deira-16182"]]},
    gallery: [["airport-room", "Номер Holiday Inn Express Dubai Airport"], ["airport-dining", "Зал завтраков Holiday Inn Express Dubai Airport"]],
    description: 'Есть похвала за разнообразие завтрака и жалобы на очереди. Расположение удобно для аэропорта.',
    albumCount: 42,
    offers: [[197337, "/book/3cbbe8d5fbb85df02d6f651dd29fbf1e", "Двухразовое питание"]]
  },
  {
    name: 'Comfort Inn', area: 'Дейра', stars: 3, rating: 5,
    image: 'comfort', alt: 'Бассейн Comfort Inn', path: '/oteli/oae/dubai/comfort-inn-hotel-apartments',
    coordinates: [25.264333, 55.322143],
    mealTimes: {"breakfast": "07:00–10:00", "dinner": "18:00–22:00", "note": "По данным Onlinetours.", "sources": [["Onlinetours", "https://www.onlinetours.ru/oteli/oae/dubai/comfort-inn-hotel-apartments"]]},
    gallery: [["comfort-room", "Номер Comfort Inn"], ["comfort-dining", "Ресторан Comfort Inn"]],
    description: 'В отзывах часто упоминают скудные завтраки и небольшие порции на обед.',
    albumCount: 56,
    offers: [[155103, "/book/a1fd436c0325d48d03afb603abc8eb83", "Двухразовое питание"]]
  },
  {
    name: 'IntercityHotel Jaddaf Waterfront', area: 'Аль-Джадаф', stars: 3,
    image: 'intercity', alt: 'Бассейн IntercityHotel Jaddaf Waterfront', path: '/oteli/oae/jadaf/intercityhotel-dubai-jaddaf-waterfront',
    coordinates: [25.227111, 55.338185],
    mealTimes: {"breakfast": "07:00–10:30", "dinner": "19:00–22:30", "note": "По H Rewards. Accor указывает завтрак до 10:00 пн–пт и до 11:00 сб–вс.", "sources": [["H Rewards", "https://hrewards.com/en/intercityhotel-dubai-jaddaf-waterfront/restaurant-bar"], ["Accor", "https://all.accor.com/hotel/C706/index.en.shtml"]]},
    gallery: [["intercity-room", "Номер IntercityHotel Jaddaf Waterfront"], ["intercity-dining", "Ресторан IntercityHotel Jaddaf Waterfront"]],
    description: 'Общая оценка Booking — 7,9. Континентальный завтрак или шведский стол. Цена из карточки.',
    albumCount: 30,
    offers: []
  },
];

const grid = document.querySelector('#catalog-grid');
const count = document.querySelector('#results-count');
const budget = document.querySelector('#budget');
const sort = document.querySelector('#sort');
const favoriteFilter = document.querySelector('#favorites-filter');
const allFilter = document.querySelector('#all-hotels');
const storageKey = 'dubai-2027-favorite-hotels';
let favorites = new Set();
try {
  const saved = JSON.parse(localStorage.getItem(storageKey) ?? '[]');
  if (Array.isArray(saved)) favorites = new Set(saved);
} catch {}
let favoritesOnly = false;
const formatter = new Intl.NumberFormat('ru-RU');


function rubles(price) {
  return formatter.format(price) + ' ₽';
}

function makeText(tag, value, className) {
  const element = document.createElement(tag);
  element.textContent = value;
  if (className) element.className = className;
  return element;
}

function externalLink(label, url, className) {
  const link = makeText('a', label, className);
  link.href = url;
  link.target = '_blank';
  link.rel = 'noopener noreferrer';
  return link;
}

function makeFavorite(hotel) {
  const heart = makeText('button', '', 'favorite-heart');
  heart.type = 'button';
  heart.setAttribute('aria-label', 'Избранное: ' + hotel.name);
  function update() {
    const selected = favorites.has(hotel.image);
    heart.textContent = selected ? '♥' : '♡';
    heart.setAttribute('aria-pressed', String(selected));
  }
  update();
  heart.addEventListener('click', () => {
    if (favorites.has(hotel.image)) favorites.delete(hotel.image);
    else favorites.add(hotel.image);
    try {
      localStorage.setItem(storageKey, JSON.stringify([...favorites]));
    } catch {}
    update();
    updateFavoriteCount();
    if (favoritesOnly) {
      render();
      favoriteFilter.focus();
    }
  });
  return heart;
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
  gallery.append(track, previous, next, count, makeFavorite(hotel));
  return gallery;
}

function makeHotelCard(hotel) {
  const card = makeText('article', '', 'hotel');
  card.id = 'hotel-' + hotel.image;
  const meta = makeText('div', '', 'hotel-meta');
  meta.append(makeText('span', hotel.stars + '★ · ' + hotel.area));
  if (hotel.rating) meta.append(makeText('span', 'Еда ' + formatter.format(hotel.rating) + '/10', 'hotel-rating'));

  const album = makeText('button', 'Смотреть все фото · ' + hotel.albumCount, 'album-button');
  album.type = 'button';
  album.setAttribute('aria-label', album.textContent + ' · ' + hotel.name);
  album.addEventListener('click', () => openHotelAlbum(hotel, album));

  const priceList = makeText('ul', '', 'hotel-prices');
  for (const [price, path, label] of hotel.offers) {
    const row = document.createElement('li');
    row.append(makeText('span', label), externalLink('от ' + rubles(price), operator + path));
    priceList.append(row);
  }

  card.append(makeHotelGallery(hotel), album, meta, makeText('h3', hotel.name),
    makeText('p', standardDates, 'hotel-dates'), makeText('p', hotel.description, 'hotel-text'),
    makeMealTimes(hotel.mealTimes));
  if (hotel.offers.length) {
    card.append(priceList, externalLink('Проверить тур', operator + hotel.offers[0][1], 'button outlined'));
  } else {
    card.append(makeText('p', 'На эти даты с двухразовым питанием цену не подтвердила.', 'hotel-dates'));
  }
  return card;
}

function makeMealTimes(times) {
  const block = makeText('div', '', 'hotel-meals');
  const schedule = document.createElement('dl');
  for (const [label, hours] of [['Завтрак', times.breakfast], ['Ужин', times.dinner]]) {
    const row = makeText('div', '', 'hotel-meals-row');
    row.append(makeText('dt', label), makeText('dd', hours));
    schedule.append(row);
  }
  const note = makeText('small', times.note, 'hotel-meals-note');
  const sources = makeText('div', '', 'hotel-meals-sources');
  for (const [label, href] of times.sources) {
    const link = makeText('a', label, 'text-link');
    link.href = href;
    link.target = '_blank';
    link.rel = 'noopener noreferrer';
    sources.append(link);
  }
  block.append(schedule, note, sources);
  return block;
}

function updateFavoriteCount() {
  favoriteFilter.textContent = 'Избранное · ' + favorites.size;
  favoriteFilter.setAttribute('aria-pressed', String(favoritesOnly));
  allFilter.setAttribute('aria-pressed', String(!favoritesOnly));
}

function render() {
  const available = hotels.filter(hotel =>
    (!favoritesOnly || favorites.has(hotel.image)) &&
    (!budget.checked || (hotel.offers[0]?.[0] ?? Infinity) <= 150000)
  );
  if (sort.value === 'low') {
    available.sort((a, b) => (a.offers[0]?.[0] ?? Infinity) - (b.offers[0]?.[0] ?? Infinity));
  } else if (sort.value === 'rating') {
    available.sort((a, b) => (b.rating ?? 0) - (a.rating ?? 0));
  }
  grid.replaceChildren(...available.map(makeHotelCard));
  hotelMap.update(available);
  if (!available.length) {
    const message = budget.checked
      ? 'До 150 000 ₽ на эти даты с двухразовым питанием пока ничего не подтверждено.'
      : 'В избранном пока пусто. Нажмите на сердечко на карточке отеля.';
    grid.append(makeText('p', message, 'no-results'));
  }
  const forms = { one: 'отель', few: 'отеля', many: 'отелей' };
  count.textContent = available.length + ' ' + forms[new Intl.PluralRules('ru-RU').select(available.length)];
}

function showFavorites(selected) {
  favoritesOnly = selected;
  updateFavoriteCount();
  render();
}

allFilter.addEventListener('click', () => showFavorites(false));
favoriteFilter.addEventListener('click', () => {
  budget.checked = false;
  showFavorites(true);
});
for (const shortcut of document.querySelectorAll('[data-shortcut]')) {
  shortcut.addEventListener('click', () => {
    budget.checked = shortcut.dataset.shortcut === 'budget';
    showFavorites(false);
  });
}
sort.addEventListener('change', render);
budget.addEventListener('change', render);
const hotelMap = createHotelMap(hotels);
updateFavoriteCount();
render();
