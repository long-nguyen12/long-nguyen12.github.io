const template = document.getElementById("welcome-msg");

if (template) {
  document.body.appendChild(template.content.cloneNode(true));
}
