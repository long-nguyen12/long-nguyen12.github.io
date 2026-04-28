class Footer extends HTMLElement {
  constructor() {
    super();
  }

  connectedCallback() {
    this.innerHTML = `
      <div class="footer-lemos mt-5">
        <div class="py-4 px-md-5 container-fluid">
          <div class="row align-items-center">
            <div class="col-12 col-md-7">
              <p class="footer-title mb-1">&copy; 2026 Hoang Long Nguyen</p>
              <p class="footer-contact mb-0">
                <a href="mailto:longnguyenhoang.ict@gmail.com">longnguyenhoang.ict@gmail.com</a>
              </p>
            </div>
            <div class="col-12 col-md-5 text-md-right mt-3 mt-md-0">
              <div class="footer-counter">
                <img
                  src="https://hitscounter.dev/api/hit?url=https%3A%2F%2Flong-nguyen12.github.io%2F&label=&icon=display&color=%23140330&message=&style=flat&tz=UTC"
                  alt="Visitor counter"
                />
              </div>
            </div>
          </div>
        </div>
      </div>
    `;
  }
}

customElements.define("footer-component", Footer);
