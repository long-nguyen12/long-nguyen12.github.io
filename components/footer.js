class Footer extends HTMLElement {
  constructor() {
    super();
  }

  connectedCallback() {
    this.innerHTML = `
      <div class="footer-lemos mt-5">
        <div class="py-4 px-md-5 container-fluid">
          <div class="row align-items-center">
            <div class="col-12 col-md-6">
              <p class="footer-title mb-1">&copy; 2026 Hoang Long Nguyen</p>
              <p class="footer-contact mb-0">AI researcher in computer vision and multimedia fact-checking.</p>
            </div>
            <div class="col-12 col-md-6 mt-3 mt-md-0">
              <nav class="footer-links justify-content-md-end" aria-label="Contact links">
                <a href="mailto:longnguyenhoang.ict@gmail.com">Email</a>
                <a href="https://scholar.google.com/citations?user=Ijeon7UAAAAJ&hl=en" target="_blank" rel="noopener noreferrer">Scholar</a>
                <a href="https://github.com/long-nguyen12" target="_blank" rel="noopener noreferrer">GitHub</a>
                <a href="https://www.linkedin.com/in/longnh12/" target="_blank" rel="noopener noreferrer">LinkedIn</a>
              </nav>
            </div>
          </div>
        </div>
      </div>
    `;
  }
}

customElements.define("footer-component", Footer);
