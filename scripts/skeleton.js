/**
 * Loads a component to the targeted node.
 * @param {*} nodeId the ID of the node to target
 * @param {*} component the component to load into the target
 */
function loadComponentToId(nodeId, component) {
  fetch(component)
  .then(res => res.text())
  .then(body => document.querySelector(nodeId).innerHTML = body)
}

/**
 * Loads the skeleton of components into the page.
 */
function loadSkeleton() {
  loadComponentToId("#navbarPlaceholder", "./../components/header.html");
  loadComponentToId("#footerPlaceholder", "./../components/footer.html");
}

loadSkeleton();
