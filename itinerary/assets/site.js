'use strict';

const catalog = window.DUBAI_CATALOG;
const key = 'dubai-winter-itinerary-v1';
const currency = new Intl.NumberFormat('ru-RU', { maximumFractionDigits: 2 });
const integer = new Intl.NumberFormat('ru-RU', { maximumFractionDigits: 0 });
const defaultSelected = catalog.costs.filter(item => item.pick).map(item => item.key);
const knownPrices = new Map(catalog.costs.map(item => [item.key, item]));
const currentDay = document.querySelector('[data-day]')?.dataset.day;
const root = document.body.dataset.root;
const toast = document.querySelector('#toast');
let toastTimer;

function readState() {
  let saved;
  try {
    saved = JSON.parse(localStorage.getItem(key));
  } catch {
    saved = null;
  }
  return {
    rate: Number.isFinite(saved?.rate) && saved.rate > 0 ? saved.rate : catalog.rate,
    party: saved?.party === 1 ? 1 : 2,
    savedDays: new Set(Array.isArray(saved?.savedDays) ? saved.savedDays : []),
    completed: new Set(Array.isArray(saved?.completed) ? saved.completed : []),
    selected: new Set(Array.isArray(saved?.selected) ? saved.selected.filter(id => knownPrices.has(id)) : defaultSelected),
  };
}

let state = readState();

function saveState() {
  const publicState = {
    rate: state.rate,
    party: state.party,
    savedDays: [...state.savedDays],
    completed: [...state.completed],
    selected: [...state.selected],
  };
  try {
    localStorage.setItem(key, JSON.stringify(publicState));
  } catch {
    showToast('В этом режиме браузера сохранение недоступно');
  }
}

function showToast(message) {
  window.clearTimeout(toastTimer);
  toast.textContent = message;
  toast.classList.add('visible');
  toastTimer = window.setTimeout(() => toast.classList.remove('visible'), 1700);
}

function limits(item) {
  const quantity = item.per === 'party' ? 1 : state.party;
  return [item.low * quantity, (item.high ?? item.low) * quantity];
}

function displayAmount(lo, hi = lo, converter = currency) {
  if (Math.abs(lo - hi) < 0.000001) return converter.format(lo);
  return converter.format(lo) + '–' + converter.format(hi);
}

function moneyText(lo, hi = lo) {
  return displayAmount(lo, hi) + ' AED · ≈ ' + displayAmount(lo * state.rate, hi * state.rate, integer) + ' ₽';
}

function selectedCosts(slug) {
  return catalog.costs.filter(item => state.selected.has(item.key) && (!slug || item.slug === slug));
}

function totals(items) {
  return items.reduce((total, item) => {
    const [low, high] = limits(item);
    return [total[0] + low, total[1] + high];
  }, [0, 0]);
}

function updatePrices() {
  for (const label of document.querySelectorAll('[data-rub]')) {
    const low = Number(label.dataset.rub) * state.rate;
    const high = label.dataset.high ? Number(label.dataset.high) * state.rate : low;
    label.textContent = displayAmount(low, high, integer) + ' ₽';
  }
  for (const label of document.querySelectorAll('[data-rate-now]')) label.textContent = currency.format(state.rate);
  for (const label of document.querySelectorAll('[data-rate-origin]')) {
    label.textContent = state.rate === catalog.rate ? 'за 1 AED · ЦБ 21.11.2026' : 'за 1 AED · ваш курс';
  }
  for (const label of document.querySelectorAll('[data-person-label]')) label.textContent = state.party === 2 ? 'двоих' : 'одного';
  for (const input of document.querySelectorAll('[data-price]')) input.checked = state.selected.has(input.dataset.price);
  const dayTotal = document.querySelector('[data-day-total]');
  if (dayTotal) dayTotal.textContent = moneyText(...totals(selectedCosts(currentDay)));
  const budgetTotal = document.querySelector('#budget-total');
  if (budgetTotal) budgetTotal.textContent = moneyText(...totals(selectedCosts()));
}

function updateBudgetList() {
  const list = document.querySelector('#budget-list');
  if (!list) return;
  list.replaceChildren();
  for (const item of selectedCosts()) {
    const line = document.createElement('div');
    line.className = 'budget-item';
    const name = document.createElement('div');
    const date = document.createElement('small');
    date.textContent = item.date + ' ';
    const title = document.createElement('a');
    title.textContent = item.title;
    title.href = 'days/' + item.slug + '.html#day-prices';
    name.append(date, title);
    const cost = document.createElement('span');
    cost.className = 'line-cost';
    cost.textContent = moneyText(...limits(item));
    line.append(name, cost);
    list.append(line);
  }
  if (!list.childElementCount) {
    const empty = document.createElement('p');
    empty.className = 'muted';
    empty.textContent = 'Пока ничего не выбрано. Добавьте расходы на странице нужного дня.';
    list.append(empty);
  }
}

const cards = [...document.querySelectorAll('[data-card]')];
const filterButtons = [...document.querySelectorAll('[data-filter]')];
const empty = document.querySelector('#favorites-empty');
let filter = location.hash === '#saved' ? 'saved' : 'all';

function updateFavorites() {
  for (const heart of document.querySelectorAll('[data-fav]')) {
    const selected = state.savedDays.has(heart.dataset.fav);
    heart.setAttribute('aria-pressed', String(selected));
    heart.firstElementChild.textContent = selected ? '♥' : '♡';
  }
  for (const count of document.querySelectorAll('[data-fav-count]')) {
    count.textContent = state.savedDays.size;
    count.hidden = state.savedDays.size === 0;
  }
  for (const button of filterButtons) {
    button.classList.toggle('active', button.dataset.filter === filter);
    button.setAttribute('aria-pressed', String(button.dataset.filter === filter));
  }
  for (const card of cards) {
    card.hidden = filter === 'saved' && !state.savedDays.has(card.dataset.card)
      || filter === 'newyear' && card.dataset.card !== '31-dec';
  }
  if (empty) empty.hidden = filter !== 'saved' || cards.some(card => !card.hidden);
}

function updateProgress() {
  const stops = [...document.querySelectorAll('[data-stop]')];
  for (const stop of stops) {
    stop.checked = state.completed.has(stop.dataset.stop);
    stop.closest('.stop').classList.toggle('is-checked', stop.checked);
  }
  const counter = document.querySelector('[data-progress]');
  if (counter) counter.textContent = stops.filter(stop => stop.checked).length + '/' + stops.length;
}

function parseNumber(value) {
  const cleaned = value.trim().replace(/[\u00a0\u202f ]/g, '').replace(',', '.');
  if (!/^\d+(\.\d+)?$/.test(cleaned)) return NaN;
  return Number(cleaned);
}

const form = document.querySelector('#settings-form');
const rateInput = document.querySelector('#rate-input');
const amount = document.querySelector('#amount');
const conversion = document.querySelector('#conversion');

function updateForm() {
  if (!form) return;
  rateInput.value = String(state.rate).replace('.', ',');
  form.querySelector('input[name="party"][value="' + state.party + '"]').checked = true;
}

function updateConversion() {
  if (!conversion) return;
  const parsed = parseNumber(amount.value);
  conversion.textContent = Number.isFinite(parsed) && parsed <= 100000000 ? integer.format(parsed * state.rate) + ' ₽' : 'Введите сумму';
}

if (form) {
  const status = document.querySelector('#rate-status');
  form.addEventListener('submit', event => {
    event.preventDefault();
    const newRate = parseNumber(rateInput.value);
    if (!Number.isFinite(newRate) || newRate <= 0 || newRate > 10000) {
      status.textContent = 'Укажите положительный курс, например 22,38.';
      rateInput.focus();
      return;
    }
    state.rate = newRate;
    state.party = Number(new FormData(form).get('party'));
    saveState();
    updatePrices();
    updateBudgetList();
    updateConversion();
    status.textContent = 'Курс и число гостей обновлены.';
  });
  document.querySelector('#reset-rate').addEventListener('click', () => {
    state.rate = catalog.rate;
    rateInput.value = String(state.rate).replace('.', ',');
    saveState();
    updatePrices();
    updateBudgetList();
    updateConversion();
    status.textContent = 'Восстановлен курс ЦБ.';
  });
  document.querySelector('#clear-budget').addEventListener('click', () => {
    state.selected.clear();
    saveState();
    updatePrices();
    updateBudgetList();
    showToast('Отметки в бюджете сняты');
  });
  amount.addEventListener('input', updateConversion);
}

document.addEventListener('change', event => {
  const { target } = event;
  if (target.matches('[data-jump]') && target.value) location.href = target.value;
  if (target.matches('[data-stop]')) {
    if (target.checked) state.completed.add(target.dataset.stop);
    else state.completed.delete(target.dataset.stop);
    saveState();
    updateProgress();
  }
  if (target.matches('[data-price]')) {
    const id = target.dataset.price;
    const item = knownPrices.get(id);
    if (target.checked) {
      if (item.group) {
        for (const other of catalog.costs) {
          if (other.group === item.group && other.key !== id) state.selected.delete(other.key);
        }
      }
      state.selected.add(id);
    } else {
      state.selected.delete(id);
    }
    saveState();
    updatePrices();
  }
});

for (const button of filterButtons) {
  button.addEventListener('click', () => {
    filter = button.dataset.filter;
    const destination = filter === 'saved' ? '#saved' : '#route';
    history.replaceState(null, '', destination);
    updateFavorites();
  });
}
for (const heart of document.querySelectorAll('[data-fav]')) {
  heart.addEventListener('click', () => {
    const slug = heart.dataset.fav;
    if (state.savedDays.has(slug)) {
      state.savedDays.delete(slug);
      showToast('День убран из избранного');
    } else {
      state.savedDays.add(slug);
      showToast('День сохранён');
    }
    saveState();
    updateFavorites();
  });
}

const photos = [...document.querySelectorAll('[data-photo]')];
const unique = [...new Map(photos.map(node => [node.dataset.photo,node])).values()];
const dialog = document.querySelector('#lightbox');
const fullPhoto = document.querySelector('#lightbox-photo');
const caption = document.querySelector('#lightbox-caption');
const source = document.querySelector('#lightbox-source');
let photoIndex = 0;
let previousFocus = null;

function showPhoto(index) {
  photoIndex = (index + unique.length) % unique.length;
  const info = unique[photoIndex].dataset;
  fullPhoto.src = info.photo;
  fullPhoto.alt = info.caption;
  caption.textContent = info.caption + ' · ' + (photoIndex + 1) + '/' + unique.length;
  source.href = info.source;
  source.hidden = !info.source;
}

dialog.querySelector('.lb-prev').hidden = unique.length < 2;
dialog.querySelector('.lb-next').hidden = unique.length < 2;
for (const button of photos) {
  button.addEventListener('click', () => {
    previousFocus = button;
    showPhoto(unique.findIndex(item => item.dataset.photo === button.dataset.photo));
    dialog.showModal();
  });
}
dialog.querySelector('.lb-close').addEventListener('click', () => dialog.close());
dialog.querySelector('.lb-next').addEventListener('click', () => showPhoto(photoIndex + 1));
dialog.querySelector('.lb-prev').addEventListener('click', () => showPhoto(photoIndex - 1));
dialog.addEventListener('click', event => {
  if (event.target === dialog) {
    const edge = dialog.getBoundingClientRect();
    if (event.clientX < edge.left || event.clientX > edge.right || event.clientY < edge.top || event.clientY > edge.bottom) dialog.close();
  }
});
dialog.addEventListener('close', () => previousFocus?.focus());
dialog.addEventListener('keydown', event => {
  if (event.key === 'ArrowRight' && unique.length > 1) showPhoto(photoIndex + 1);
  if (event.key === 'ArrowLeft' && unique.length > 1) showPhoto(photoIndex - 1);
});
window.addEventListener('hashchange', () => {
  if (location.hash === '#saved') filter = 'saved';
  if (location.hash === '#route') filter = 'all';
  updateFavorites();
});
window.addEventListener('pageshow', () => {
  state = readState();
  updatePrices();
  updateBudgetList();
  updateFavorites();
  updateProgress();
  updateForm();
  updateConversion();
});
const activeDate = document.querySelector('.day-nav a[aria-current]');
if (activeDate) {
  const scroller = activeDate.parentElement;
  scroller.scrollLeft = Math.max(0, activeDate.offsetLeft - scroller.offsetLeft - scroller.clientWidth / 2 + activeDate.clientWidth / 2);
}
window.addEventListener('storage', event => {
  if (event.key !== key) return;
  state = readState();
  updatePrices();
  updateBudgetList();
  updateFavorites();
  updateProgress();
  updateForm();
  updateConversion();
});
