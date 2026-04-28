class FooterL extends HTMLElement {
  constructor() {
    super();
  }

  connectedCallback() {
    const startYear = 2024;
    const currentYear = new Date().getFullYear();
    const yearDisplay =
      startYear === currentYear ? `${startYear}` : `${startYear}&ndash;${currentYear}`;

    this.innerHTML = `
      <div class="footer-lemos-nifme">
        <div class="pt-2 pb-3 px-md-5 container-fluid">
          <div class="row">
            <div class="col-12 col-md-7">
              <p class="mb-0 small footer-credit">
                Template by
                <a href="https://rochanaro.github.io/" target="_blank">RochanaRO</a>
                via
                <a href="https://github.com/rochanaro/academic-portfolio-template-lemos" target="_blank">
                  GitHub <i class="mx-1 fab footer-icons fa-github" aria-hidden="true"></i>
                </a>
                &copy;${yearDisplay}
              </p>
            </div>
          </div>
        </div>
      </div>
    `;
  }
}

customElements.define("footer-component-lemos", FooterL);
