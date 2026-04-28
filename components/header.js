class Header extends HTMLElement {
  constructor() {
    super();
  }

  connectedCallback() {
    this.innerHTML = `
      <header>
        <nav class="navbar navbar-expand-lg navbar-dark">
          <div class="container nav-shell">
            <a class="navbar-brand" href="/">Hoang Long Nguyen</a>
            <button
              class="navbar-toggler collapsed"
              type="button"
              data-toggle="collapse"
              data-target="#navbarCollapse"
              aria-controls="navbarCollapse"
              aria-expanded="false"
              aria-label="Toggle navigation"
            >
              <span class="navbar-toggler-icon"></span>
            </button>
            <div class="navbar-collapse collapse" id="navbarCollapse">
              <ul class="navbar-nav ml-auto">
                <li class="nav-item">
                  <a class="nav-link" href="/">Home</a>
                </li>
                <li class="nav-item">
                  <a class="nav-link" href="/pages/education.html">Education</a>
                </li>
                <li class="nav-item">
                  <a class="nav-link" href="/pages/publications.html">Publication</a>
                </li>
                <li class="nav-item">
                  <a class="nav-link" href="/pages/experience.html">Experience</a>
                </li>
                <li class="nav-item">
                  <a class="nav-link" href="/pages/skills.html">Skill</a>
                </li>
                <li class="nav-item">
                  <a class="nav-link" href="/pages/projects.html">Project</a>
                </li>
                <li class="nav-item">
                  <a class="nav-link" href="/pages/misc.html">Misc</a>
                </li>
              </ul>
            </div>
          </div>
        </nav>
      </header>
    `;

    const normalizePath = (value) => {
      if (!value || value === "/index.html") {
        return "/";
      }

      return value.replace(/\/index\.html$/, "").replace(/\/+$/, "") || "/";
    };

    const currentPath = normalizePath(window.location.pathname);
    const links = this.querySelectorAll(".nav-link");

    links.forEach((link) => {
      const linkPath = normalizePath(link.getAttribute("href"));
      if (linkPath === currentPath) {
        link.classList.add("active");
        link.setAttribute("aria-current", "page");
      }
    });
  }
}

customElements.define("header-component", Header);
