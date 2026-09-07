(() => {
  const form = document.querySelector('[data-archive-form]');
  if (!form) return;

  const search = form.elements.q;
  const topic = form.elements.topic;
  const count = document.querySelector('[data-result-count]');
  const empty = document.querySelector('[data-empty-state]');
  const groups = [...document.querySelectorAll('.year-group')];
  const normalize = value => value.normalize('NFKD').replace(/[\u0300-\u036f]/g, '').toLowerCase();
  const notes = [...document.querySelectorAll('[data-search]')].map(element => ({
    element,
    text: normalize(element.dataset.search),
    topics: JSON.parse(element.dataset.topics),
  }));

  function update(writeURL = true) {
    const words = normalize(search.value).trim().split(/\s+/).filter(Boolean);
    let matches = 0;
    for (const note of notes) {
      const show = words.every(word => note.text.includes(word)) && (!topic.value || note.topics.includes(topic.value));
      note.element.hidden = !show;
      if (show) matches++;
    }
    for (const group of groups) {
      group.hidden = !group.querySelector('.post-item:not([hidden])');
    }
    count.textContent = `${matches} ${matches === 1 ? 'note' : 'notes'}${words.length || topic.value ? ' found' : ''}`;
    empty.hidden = matches !== 0;
    if (writeURL) {
      const url = new URL(window.location.href);
      for (const [key, value] of [['q', search.value.trim()], ['topic', topic.value]]) {
        if (value) url.searchParams.set(key, value);
        else url.searchParams.delete(key);
      }
      history.replaceState(null, '', url);
    }
  }

  function readURL() {
    const params = new URLSearchParams(window.location.search);
    search.value = params.get('q') || '';
    topic.value = params.get('topic') || '';
    if (topic.selectedIndex < 0) topic.value = '';
    update(false);
  }

  form.addEventListener('submit', event => { event.preventDefault(); update(); });
  search.addEventListener('input', () => update());
  topic.addEventListener('change', () => update());
  form.addEventListener('reset', event => {
    event.preventDefault();
    search.value = '';
    topic.value = '';
    update();
    search.focus();
  });
  window.addEventListener('popstate', readURL);
  window.addEventListener('pageshow', readURL);
  readURL();
  form.hidden = false;
  count.hidden = false;
})();
