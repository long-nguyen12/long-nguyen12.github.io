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
                    <p class="my-0 pt-0"><a class="" href="mailto:nguyenhoanglong@hdu.edu.vn">nguyenhoanglong@hdu.edu.vn</a></p>

                </div>
            </div>
        </div>

    </div>
    `;
  }
}

customElements.define("footer-component", Footer);
