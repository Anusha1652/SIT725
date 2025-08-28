function clickMe() {
  alert("Thanks for clicking me!");
}

function renderCards(items) {
  const container = $("#card-section");
  container.empty();
  (items || []).forEach(item => {
    const card = $(`
      <div class="col s12 m4">
        <div class="card">
          <div class="card-content">
            <span class="card-title">${item.title || 'Project'}</span>
            <p>${item.description || 'No description'}</p>
          </div>
          <div class="card-action">
            <a href="${item.link || '#'}" target="_blank">Open</a>
          </div>
        </div>
      </div>
    `);
    container.append(card);
  });
}

async function loadProjects() {
  try {
    const res = await fetch('/api/projects');
    const json = await res.json();
    renderCards(json.data || []);
  } catch (e) {
    console.warn('Load error', e);
    renderCards([]);
  }
}

async function submitForm(e) {
  e.preventDefault();
  try {
    const body = {
      title: $("#title").val(),
      description: $("#description").val(),
      link: $("#link").val()
    };
    const res = await fetch('/api/projects', {
      method: 'POST',
      headers: {'Content-Type': 'application/json'},
      body: JSON.stringify(body)
    });
    const json = await res.json();
    if (json && json.data) {
      M.toast({ html: 'Project created' });
      $("#title, #description, #link").val('');
      M.updateTextFields();
      await loadProjects();
    } else {
      throw new Error('Create failed');
    }
  } catch (e) {
    console.warn('Create error', e);
    M.toast({ html: 'Create failed' });
  }
  return false;
}

$(function () {
  loadProjects();
});
