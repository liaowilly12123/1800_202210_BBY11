function insertCode() {
  const code = localStorage.getItem("code");
  document.getElementById("code").value = code;
}

insertCode();