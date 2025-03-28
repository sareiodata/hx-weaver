document.addEventListener('DOMContentLoaded', function() {
  // Get the body element
  const body = document.body;
  // Fix initial flicker. Not sure about this. Might remove later. Should not impact SEO since the final JS rendered template is correct.
  body.style.display = 'none';
});

window.addEventListener("load", function () {
   loadTemplate();
});

function loadTemplate() {
  // Get the current page content before replacing it
  const currentContent = document.body.innerHTML;

  // Extract the title from the current document
  const currentTitle = document.title;

  fetch("theme/template.html")
    .then((response) => response.text())
    .then((template) => {
      const parser = new DOMParser();
      const templateDoc = parser.parseFromString(template, "text/html");

      // Replace the title in the template
      templateDoc.title = currentTitle;

      // Replace the current document with the template
      document.documentElement.innerHTML =
        templateDoc.documentElement.innerHTML;

      // Load HTMX
      const htmxScript = document.createElement("script");
      htmxScript.src = "https://unpkg.com/htmx.org@2.0.4";
      document.head.appendChild(htmxScript);

      // Load Content
      const contentElement = document.getElementById("content");
      contentElement.innerHTML = currentContent;
    })
    .catch((error) => console.error("Error loading template:", error));
}
