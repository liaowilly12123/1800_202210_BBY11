/**
 * The funtion displays the code in the display-code.html.
 */
function insertCode() {
  const code = localStorage.getItem("code");
  document.getElementById("code").value = code;
}

insertCode();