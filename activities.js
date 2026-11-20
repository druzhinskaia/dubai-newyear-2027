const filters = [...document.querySelectorAll('[data-activity-filter]')];
const cards = [...document.querySelectorAll('[data-activity]')];
const resultCount = document.querySelector('#activity-count');
const plurals = new Intl.PluralRules('ru-RU');
const countLabels = { one: 'вариант', few: 'варианта', many: 'вариантов' };

for (const filter of filters) {
  filter.addEventListener('click', () => {
    const category = filter.dataset.activityFilter;
    for (const button of filters) {
      button.setAttribute('aria-pressed', String(filter === button));
    }
    let visible = 0;
    for (const card of cards) {
      card.hidden = category !== 'all' && card.dataset.activity !== category;
      if (!card.hidden) visible++;
    }
    resultCount.textContent = visible + ' ' + countLabels[plurals.select(visible)];
  });
}
