function loadComponentToId(nodeId, component) {
  fetch(component)
    .then(res => res.text())
    .then(body => document.querySelector(nodeId).innerHTML = body)
}

function loadSkeleton() {
  loadComponentToId("#navbarPlaceholder", "./components/header.html");
}

loadSkeleton();
