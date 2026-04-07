class Footer extends HTMLElement {
  constructor() {
    super();
  }

  connectedCallback() {
    this.innerHTML = `
    <div class="footer-lemos mt-5">
        <div class="py-3 px-md-5 container-fluid">
            <div class="row">
                <div class="col-auto col-md-5 align-middle">
                    <p class="mb-0" style="color: var(--light-gray);">© 2026 Hoang Long Nguyen</p>
                    <p class="my-0 pt-0"><a class="" href="mailto:longnguyenhoang.ict@gmail.com">longnguyenhoang.ict@gmail.com</a></p>
                </div>
                <div class="col-auto col-md-7 text-md-right align-middle">
                    <p class="mb-0" style="font-weight: 600; color: var(--blue-medium);">
                        Total visitors: <span id="footer-visitor-count">Loading...</span>
                    </p>
                </div>
            </div>
        </div>
    </div>
    `;

    const footerProjectName = "long-nguyen-website";
    fetch(`https://api.countapi.xyz/hit/${footerProjectName}`)
      .then((response) => response.json())
      .then((data) => {
        const el = this.querySelector("#footer-visitor-count");
        if (el) el.textContent = data.value.toLocaleString();
      })
      .catch(() => {
        const el = this.querySelector("#footer-visitor-count");
        if (el) el.textContent = "N/A";
      });
  }
}

customElements.define("footer-component", Footer);
