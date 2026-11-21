const hotelAlbum = document.querySelector('#hotel-album');
const albumTitle = document.querySelector('#album-title');
const albumSources = document.querySelector('#album-sources');
const albumContent = document.querySelector('#album-content');
let albumRequest;
let albumTrigger;

hotelAlbum.addEventListener('close', () => {
  albumRequest?.abort();
  albumTrigger?.focus();
});

function neighborhoodLink(hotel) {
  const coordinate = hotel.coordinates.join(',');
  return 'https://www.google.com/maps/search/?api=1&query=' + encodeURIComponent(coordinate);
}

async function openHotelAlbum(hotel, trigger) {
  albumRequest?.abort();
  const request = new AbortController();
  albumRequest = request;
  albumTrigger = trigger;
  albumTitle.textContent = hotel.name;
  albumSources.replaceChildren(
    externalLink('Окрестности на карте', neighborhoodLink(hotel), 'text-link'),
    externalLink('Галерея Onlinetours', operator + hotel.path, 'text-link')
  );
  if (hotel.image === 'central') {
    albumSources.append(externalLink('Номера на сайте Accor', 'https://all.accor.com/hotel/7080/index.en.shtml', 'text-link'));
  }
  const status = makeText('p', 'Загружаем фотографии…');
  status.setAttribute('role', 'status');
  albumContent.replaceChildren(status);
  if (!hotelAlbum.open) hotelAlbum.showModal();
  try {
    const response = await fetch('assets/galleries/' + hotel.image + '.json', { signal: request.signal });
    if (!response.ok) throw new Error('Gallery unavailable');
    const groups = await response.json();
    if (request.signal.aborted) return;
    renderHotelAlbum(hotel, groups);
  } catch {
    if (!request.signal.aborted) status.textContent = 'Альбом временно недоступен. Фото можно посмотреть на странице Onlinetours.';
  }
}

function renderHotelAlbum(hotel, groups) {
  const localPhotos = [[hotel.image, hotel.alt], ...hotel.gallery];
  const photos = Object.entries(groups).flatMap(([group, urls]) => urls.map((url, index) => ({
    url, group, label: group + ' · ' + (index + 1) + ' · ' + hotel.name
  })));
  const rooms = localPhotos.filter(([, label]) => /номер/i.test(label));
  if (rooms.length) {
    photos.unshift(...rooms.map(([file, label]) => ({
      url: 'assets/' + file + '.webp', group: 'Примеры номеров', label
    })));
  }

  const stage = makeText('div', '', 'album-stage');
  const activeImage = document.createElement('img');
  stage.append(activeImage);
  const groupsSelect = makeText('select', '', 'album-options');
  groupsSelect.setAttribute('aria-label', 'Раздел фотографий');
  const names = [...new Set(photos.map(photo => photo.group))];
  groupsSelect.append(new Option('Все фото', ''), ...names.map(name => new Option(name, name)));

  const previous = makeText('button', 'Назад', 'button outlined');
  const next = makeText('button', 'Дальше', 'button outlined');
  previous.type = next.type = 'button';
  const progress = makeText('span', '', 'hotel-dates');
  progress.setAttribute('aria-live', 'polite');
  const openPhoto = externalLink('Открыть фото', '#', 'text-link');
  const toolbar = makeText('div', '', 'album-toolbar');
  toolbar.append(groupsSelect, previous, progress, next, openPhoto);
  const thumbs = makeText('div', '', 'album-thumbs');

  let shownPhotos = photos;
  let index = 0;
  let selectedThumb;
  function showPhoto(number) {
    index = Math.max(0, Math.min(shownPhotos.length - 1, number));
    const photo = shownPhotos[index];
    activeImage.src = photo.url;
    activeImage.alt = photo.label;
    progress.textContent = photo.group + ' · ' + (index + 1) + ' / ' + shownPhotos.length;
    openPhoto.href = photo.url;
    previous.disabled = index === 0;
    next.disabled = index === shownPhotos.length - 1;
    selectedThumb?.removeAttribute('aria-current');
    selectedThumb = thumbs.children[index];
    selectedThumb.setAttribute('aria-current', 'true');
  }
  activeImage.addEventListener('error', () => {
    if (activeImage.getAttribute('src') !== 'assets/' + hotel.image + '.webp') {
      activeImage.alt = 'Фото источника временно недоступно. Обложка ' + hotel.name;
      activeImage.src = 'assets/' + hotel.image + '.webp';
    }
  });
  function selectGroup() {
    shownPhotos = photos.filter(photo => !groupsSelect.value || photo.group === groupsSelect.value);
    thumbs.replaceChildren(...shownPhotos.map((photo, i) => {
      const button = makeText('button', '');
      button.type = 'button';
      button.setAttribute('aria-label', photo.label);
      const image = document.createElement('img');
      image.src = photo.url;
      image.loading = 'lazy';
      image.decoding = 'async';
      image.alt = '';
      button.append(image);
      button.addEventListener('click', () => showPhoto(i));
      return button;
    }));
    showPhoto(0);
  }
  groupsSelect.addEventListener('change', selectGroup);
  previous.addEventListener('click', () => showPhoto(index - 1));
  next.addEventListener('click', () => showPhoto(index + 1));
  stage.tabIndex = 0;
  stage.setAttribute('aria-label', 'Фотографии. Стрелки меняют снимок.');
  stage.addEventListener('keydown', event => {
    if (event.key !== 'ArrowLeft' && event.key !== 'ArrowRight') return;
    event.preventDefault();
    showPhoto(index + (event.key === 'ArrowRight' ? 1 : -1));
  });
  albumContent.replaceChildren(stage, toolbar, thumbs);
  selectGroup();
}
