'use strict';

(() => {
  const day = document.querySelector('main[data-day]');
  if (!day) return;

  const key = 'dubai-detailed-plan-v1:' + day.dataset.day;
  const panels = [...day.querySelectorAll('[data-variant-panel]')];
  const buttons = [...day.querySelectorAll('[data-variant]')];
  const copyButton = day.querySelector('[data-copy-day]');
  const compactButton = day.querySelector('[data-compact]');
  const prep = [...day.querySelectorAll('[data-prep]')];
  const notes = day.querySelector('[data-day-notes]');
  const noteStatus = day.querySelector('[data-note-status]');
  const form = day.querySelector('[data-flight-form]');
  const flightResult = day.querySelector('[data-flight-result]');
  let noteTimer;
  let copyTimer;

  function readPlan() {
    let saved;
    try { saved = JSON.parse(localStorage.getItem(key)); } catch { saved = null; }
    return {
      variant: Number.isInteger(saved?.variant) && panels[saved.variant] ? saved.variant : 0,
      compact: saved?.compact === true,
      prep: Array.isArray(saved?.prep) ? saved.prep.filter(id => typeof id === 'string') : [],
      notes: typeof saved?.notes === 'string' ? saved.notes.slice(0, 2500) : '',
      flight: saved?.flight && typeof saved.flight === 'object' ? saved.flight : null,
    };
  }

  let plan = readPlan();

  function persist() {
    try {
      localStorage.setItem(key, JSON.stringify(plan));
      return true;
    } catch {
      return false;
    }
  }

  function renderVariant() {
    for (const button of buttons) {
      const active = Number(button.dataset.variant) === plan.variant;
      button.setAttribute('aria-pressed', String(active));
      button.classList.toggle('active', active);
    }
    for (const panel of panels) panel.hidden = Number(panel.dataset.variantPanel) !== plan.variant;
  }

  function renderCompact() {
    day.classList.toggle('quick-read', plan.compact);
    compactButton.setAttribute('aria-pressed', String(plan.compact));
    compactButton.textContent = plan.compact ? 'Подробный вид' : 'Короткий вид';
  }

  function renderPrep() {
    for (const input of prep) input.checked = plan.prep.includes(input.dataset.prep);
  }

  function copyText() {
    const variant = panels[plan.variant];
    const title = day.querySelector('h1').textContent;
    const heading = day.querySelector('.expanded-schedule .kicker').textContent;
    const steps = [...variant.querySelectorAll('li')].map((li, i) => (i + 1) + '. ' + li.textContent);
    const schedule = [...day.querySelectorAll('.detail-stop')].map(item =>
      item.querySelector('.stop-time').textContent + ' · ' + item.querySelector('h3').textContent
    );
    const map = variant.querySelector('.stop-links a')?.href;
    const text = [
      heading + ' — ' + title, '', 'Сценарий: ' + variant.querySelector('h3').textContent,
      ...steps, '', 'Расписание и альтернативы:', ...schedule,
      ...(map ? ['', map] : []),
      '', window.location.href.split('#')[0],
    ];
    return text.join('\n');
  }

  async function copyPlan() {
    try {
      await navigator.clipboard.writeText(copyText());
    } catch {
      const helper = document.createElement('textarea');
      helper.value = copyText();
      helper.className = 'visually-hidden';
      helper.setAttribute('readonly', '');
      day.append(helper);
      helper.select();
      const copied = document.execCommand('copy');
      helper.remove();
      copyButton.focus();
      if (!copied) {
        copyButton.textContent = 'Копирование недоступно';
        return;
      }
    }
    clearTimeout(copyTimer);
    copyButton.textContent = 'Скопировано';
    copyTimer = setTimeout(() => copyButton.textContent = 'Скопировать план', 1900);
  }

  function printTime(date) {
    return new Intl.DateTimeFormat('ru-RU', {
      timeZone: 'Asia/Dubai', weekday: 'short', day: 'numeric', month: 'long',
      hour: '2-digit', minute: '2-digit', hourCycle: 'h23',
    }).format(date);
  }

  function updateFlight(data) {
    const date = new Date(data.date + 'T' + data.time + ':00+04:00');
    const minutes = [data.drive, data.checkin, data.buffer].map(Number);
    if (!Number.isFinite(date.getTime()) || minutes.some(n => !Number.isInteger(n) || n < 0 || n > 600)) {
      flightResult.textContent = 'Укажите время рейса и три значения в минутах.';
      return false;
    }
    const terminal = new Date(date.getTime() - minutes[1] * 60000);
    const leave = new Date(terminal.getTime() - (minutes[0] + minutes[2]) * 60000);
    const result = document.createElement('strong');
    result.textContent = 'Выехать к ' + printTime(leave);
    flightResult.replaceChildren(result, document.createTextNode(' В терминале — к ' + printTime(terminal) + '. Время Дубая.'));
    return true;
  }

  function render() {
    renderVariant();
    renderCompact();
    renderPrep();
    notes.value = plan.notes;
    if (form && plan.flight) {
      for (const input of form.querySelectorAll('input')) {
        const value = plan.flight[input.name];
        if (typeof value === 'string') input.value = value;
      }
      updateFlight(plan.flight);
    }
  }

  for (const button of buttons) {
    button.addEventListener('click', () => {
      plan.variant = Number(button.dataset.variant);
      persist();
      renderVariant();
    });
  }
  compactButton.addEventListener('click', () => {
    plan.compact = !plan.compact;
    persist();
    renderCompact();
  });
  for (const input of prep) {
    input.addEventListener('change', () => {
      plan.prep = prep.filter(item => item.checked).map(item => item.dataset.prep);
      persist();
    });
  }
  notes.addEventListener('input', () => {
    plan.notes = notes.value;
    const saved = persist();
    noteStatus.textContent = saved ? 'Заметки сохранены.' : 'Браузер не разрешил сохранить заметки.';
    clearTimeout(noteTimer);
    if (saved) noteTimer = setTimeout(() => noteStatus.textContent = 'Сохраняются в этом браузере.', 1600);
  });
  copyButton.addEventListener('click', copyPlan);
  if (form) {
    form.addEventListener('submit', event => {
      event.preventDefault();
      const data = Object.fromEntries(new FormData(form));
      if (updateFlight(data)) {
        plan.flight = data;
        persist();
      }
    });
  }
  window.addEventListener('pageshow', () => {
    plan = readPlan();
    render();
  });
  window.addEventListener('storage', event => {
    if (event.key === key) {
      plan = readPlan();
      render();
    }
  });
  render();
})();
