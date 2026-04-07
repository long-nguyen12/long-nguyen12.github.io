class Footer extends HTMLElement {
  constructor() {
    super();
  }

  connectedCallback() {
    this.innerHTML = `
    <div class="footer-lemos mt-5">
        <div class="py-3 px-md-5 container-fluid">
            <div class="row align-items-center">
                <div class="col-12 col-md-6">
                    <p class="mb-0" style="color: var(--light-gray);">© 2026 Hoang Long Nguyen</p>
                    <p class="my-0 pt-0"><a class="" href="mailto:longnguyenhoang.ict@gmail.com">longnguyenhoang.ict@gmail.com</a></p>
                </div>
                <div class="col-12 col-md-6 text-md-right mt-3 mt-md-0">
                    <img src="https://hitscounter.dev/api/hit?url=https%3A%2F%2Flong-nguyen12.github.io%2F&label=&icon=display&color=%23140330&message=&style=flat&tz=UTC" alt="Visitor counter">
                </div>
            </div>
        </div>
    </div>
    `;
  }
}

customElements.define("footer-component", Footer);
