class Header extends HTMLElement {
  constructor() {
    super();
  }

  connectedCallback() {
    this.innerHTML = `
      <header>
        <nav class="navbar navbar-expand-lg navbar-light">
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
                  <a class="nav-link" href="/pages/publications.html">Publications</a>
                </li>
                <li class="nav-item dropdown">
                  <a
                    class="nav-link dropdown-toggle"
                    href="#"
                    id="cvDropdown"
                    role="button"
                    data-toggle="dropdown"
                    aria-haspopup="true"
                    aria-expanded="false"
                  >
                    CV
                  </a>
                  <div class="dropdown-menu dropdown-menu-right" aria-labelledby="cvDropdown">
                    <a class="dropdown-item" href="/pages/education.html">Education</a>
                    <a class="dropdown-item" href="/pages/experience.html">Experience</a>
                    <a class="dropdown-item" href="/pages/skills.html">Skills</a>
                  </div>
                </li>
                <li class="nav-item">
                  <a class="nav-link" href="/pages/projects.html">Projects</a>
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
    const links = this.querySelectorAll(".nav-link, .dropdown-item");

    links.forEach((link) => {
      const linkPath = normalizePath(link.getAttribute("href"));
      if (linkPath === currentPath) {
        link.classList.add("active");
        link.setAttribute("aria-current", "page");

        const dropdown = link.closest(".dropdown");
        if (dropdown) {
          dropdown.querySelector(".dropdown-toggle").classList.add("active");
        }
      }
    });
  }
}

customElements.define("header-component", Header);
