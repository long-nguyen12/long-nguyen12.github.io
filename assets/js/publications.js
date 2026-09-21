(function () {
  "use strict";

  const highlightedAuthor = "Nguyen, Hoang Long";

  // Add or edit publications here. A numeric `featured` value places the work
  // in the selected-publications section on the homepage.
  const publications = [
    {
      id: "nguyen2026snm",
      year: 2026,
      type: "Journal",
      title:
        "SNM: A medical image fusion method using SSFRG decomposition, NRBOFA base fusion, and multi-level morphological gradient",
      authors: [
        "Nguyen, Hoang-Long",
        "Le, Thi-Hong-Ha",
        "Nguyen, Hoang Long",
        "Dinh, Phu-Hung",
        "Giang, Nguyen Long",
      ],
      venue: "Biomedical Signal Processing and Control",
      citation: "113, 109080",
      doi: "10.1016/j.bspc.2025.109080",
      bibtex: String.raw`@article{nguyen2026snm,
  title={SNM: A medical image fusion method using SSFRG decomposition, NRBOFA base fusion, and multi-level morphological gradient},
  author={Nguyen, Hoang-Long and Le, Thi-Hong-Ha and Nguyen, Hoang Long and Dinh, Phu-Hung and Giang, Nguyen Long},
  journal={Biomedical Signal Processing and Control},
  volume={113},
  pages={109080},
  year={2026},
  publisher={Elsevier},
  doi={10.1016/j.bspc.2025.109080}
}`,
    },
    {
      id: "nguyen2026enhancing",
      year: 2026,
      type: "Journal",
      title:
        "Enhancing Infrared Small Target Detection: A Multi-scale Feature Integration Approach with an Optimized Combined Loss Function",
      featuredTitle: "Enhancing Infrared Small Target Detection",
      authors: ["Nguyen, Dinh Cong", "Nguyen, Hoang Long"],
      venue: "SN Computer Science",
      citation: "7(2), 192",
      doi: "10.1007/s42979-026-04779-y",
      code: "https://github.com/long-nguyen12/irstd-pytorch",
      bibtex: String.raw`@article{nguyen2026enhancing,
  title={Enhancing Infrared Small Target Detection: A Multi-scale Feature Integration Approach with an Optimized Combined Loss Function},
  author={Nguyen, Dinh Cong and Nguyen, Hoang Long},
  journal={SN Computer Science},
  volume={7},
  number={2},
  pages={192},
  year={2026},
  publisher={Springer Nature Singapore},
  doi={10.1007/s42979-026-04779-y}
}`,
    },
    {
      id: "pham2026tsdfusion",
      year: 2026,
      type: "Journal",
      title:
        "TSDFusion: a new medical image fusion method based on transformer and dynamic threshold neural P system",
      featuredTitle: "TSDFusion: a new medical image fusion method",
      authors: [
        "Pham, Quang Nam",
        "Nguyen, Hoang Trung",
        "Nguyen, Hoang Long",
        "Le, Thi-Hong-Ha",
        "Nguyen, Hoang-Long",
        "Nguyen, Long Giang",
      ],
      venue: "The Imaging Science Journal",
      citation: "74(6), 660–676",
      doi: "10.1080/13682199.2026.2635216",
      code: "https://github.com/long-nguyen12/TSDFusion",
      bibtex: String.raw`@article{pham2026tsdfusion,
  title={TSDFusion: a new medical image fusion method based on transformer and dynamic threshold neural P system},
  author={Pham, Quang Nam and Nguyen, Hoang Trung and Nguyen, Hoang Long and Le, Thi-Hong-Ha and Nguyen, Hoang-Long and Nguyen, Long Giang},
  journal={The Imaging Science Journal},
  volume={74},
  number={6},
  pages={660--676},
  year={2026},
  publisher={Taylor \& Francis},
  doi={10.1080/13682199.2026.2635216}
}`,
    },
    {
      id: "nguyen2026explainable",
      year: 2026,
      type: "Workshop",
      title: "Explainable Automated Fact-Checking: An Overview",
      authors: ["Nguyen, Hoang Long", "Rayar, Frédéric", "Ragot, Nicolas"],
      venue: "ROMCIR 2026",
      bibtex: String.raw`@article{nguyen2026explainable,
  title={Explainable Automated Fact-Checking: An Overview},
  author={Nguyen, Hoang Long and Rayar, Fr{\'e}d{\'e}ric and Ragot, Nicolas},
  journal={ROMCIR 2026},
  year={2026}
}`,
    },
    {
      id: "nguyen2026crosstrans",
      year: 2026,
      type: "Conference",
      featured: 1,
      title:
        "CrossTrans-MFC: An Effective Cross Transformer Approach for Multimedia Fact-Checking",
      authors: ["Nguyen, Hoang Long", "Rayar, Frédéric", "Ragot, Nicolas"],
      venue: "CBMI 2026",
      bibtex: String.raw`@inproceedings{nguyen2026crosstrans,
  title={CrossTrans-MFC: An Effective Cross Transformer Approach for Multimedia Fact-Checking},
  author={Nguyen, Hoang Long and Rayar, Fr{\'e}d{\'e}ric and Ragot, Nicolas},
  booktitle={CBMI 2026},
  year={2026}
}`,
    },
    {
      id: "pham2026rcdfusion",
      year: 2026,
      type: "Journal",
      title:
        "RCDFusion: Co-Attention Guided Dynamic Convolution for Multi-Modal Medical Image Fusion",
      authors: [
        "Pham, Quang Nam",
        "Dao, Ngoc-Hieu",
        "Nguyen, Hoang Long",
        "Nguyen, Hoang Trung",
        "Nguyen, Long Giang",
      ],
      venue: "IEICE Transactions on Information and Systems",
      citation: "2025EDP7237",
      bibtex: String.raw`@article{pham2026rcdfusion,
  title={RCDFusion: Co-Attention Guided Dynamic Convolution for Multi-Modal Medical Image Fusion},
  author={Pham, Quang Nam and Dao, Ngoc-Hieu and Nguyen, Hoang Long and Nguyen, Hoang Trung and Nguyen, Long Giang},
  journal={IEICE Transactions on Information and Systems},
  pages={2025EDP7237},
  year={2026},
  publisher={The Institute of Electronics, Information and Communication Engineers}
}`,
    },
    {
      id: "hoang2026benchmarking",
      year: 2026,
      type: "Journal",
      featured: 2,
      title:
        "Benchmarking Vietnamese image captioning: A spatially-aware transformer and the HDUCap dataset",
      authors: [
        "Hoang, Anh Cong",
        "Nguyen, Hoang Long",
        "Pham, The-Anh",
        "Nguyen, Dinh Cong",
      ],
      venue: "Journal of Visual Communication and Image Representation",
      citation: "104963",
      bibtex: String.raw`@article{hoang2026benchmarking,
  title={Benchmarking Vietnamese image captioning: A spatially-aware transformer and the HDUCap dataset},
  author={Hoang, Anh Cong and Nguyen, Hoang Long and Pham, The-Anh and Nguyen, Dinh Cong},
  journal={Journal of Visual Communication and Image Representation},
  pages={104963},
  year={2026},
  publisher={Elsevier}
}`,
    },
    {
      id: "nguyen2025colonnext",
      year: 2025,
      type: "Journal",
      title: "ColonNeXt: Fully Convolutional Attention for Polyp Segmentation",
      featured: 3,
      authors: ["Nguyen, Dinh Cong", "Nguyen, Hoang Long"],
      venue: "Journal of Imaging Informatics in Medicine",
      citation: "38(4), 2194–2209",
      doi: "10.1007/s10278-024-01342-0",
      code: "https://github.com/long-nguyen12/colonnext-pytorch",
      bibtex: String.raw`@article{nguyen2025colonnext,
  title={ColonNeXt: Fully Convolutional Attention for Polyp Segmentation},
  author={Nguyen, Dinh Cong and Nguyen, Hoang Long},
  journal={Journal of Imaging Informatics in Medicine},
  volume={38},
  number={4},
  pages={2194--2209},
  year={2025},
  publisher={Springer},
  doi={10.1007/s10278-024-01342-0}
}`,
    },
    {
      id: "nguyen2025early",
      year: 2025,
      type: "Journal",
      title:
        "Early Exit Based on Deep Learning Model for Polyp Colonoscopy Image Classification",
      authors: ["Nguyen, Hoang Long", "Phan, Minh-Vu", "Pham, The-Anh"],
      venue: "Journal of Technical Education Science",
      citation: "20(3), 40–47",
      doi: "10.54644/jte.2025.1721",
      bibtex: String.raw`@article{nguyen2025early,
  title={Early Exit Based on Deep Learning Model for Polyp Colonoscopy Image Classification},
  author={Nguyen, Hoang Long and Phan, Minh-Vu and Pham, The-Anh},
  journal={Journal of Technical Education Science},
  volume={20},
  number={3},
  pages={40--47},
  year={2025},
  doi={10.54644/jte.2025.1721}
}`,
    },
    {
      id: "hoang12025dual",
      year: 2025,
      type: "Conference",
      title: "Dual Attention for Vietnamese Image Captioning",
      authors: [
        "Hoang, Anh Cong",
        "Nguyen, Hoang Long",
        "Le, Thi Thuy",
        "Phan, Minh Phong",
        "Pham, The Anh",
        "Nguyen, Dinh Cong",
      ],
      venue:
        "International Conference on Industrial Networks and Intelligent Systems",
      citation: "174–183",
      doi: "10.1007/978-3-032-02362-9_14",
      bibtex: String.raw`@inproceedings{hoang12025dual,
  title={Dual Attention for Vietnamese Image Captioning},
  author={Hoang, Anh Cong and Nguyen, Hoang Long and Le, Thi Thuy and Phan, Minh Phong and Pham, The Anh and Nguyen, Dinh Cong},
  booktitle={International Conference on Industrial Networks and Intelligent Systems},
  pages={174--183},
  year={2025},
  organization={Springer Nature Switzerland},
  doi={10.1007/978-3-032-02362-9_14}
}`,
    },
    {
      id: "nguyen2024polypooling",
      year: 2024,
      type: "Journal",
      title:
        "PolyPooling: An accurate polyp segmentation from colonoscopy images",
      authors: ["Nguyen, Dinh Cong", "Nguyen, Hoang Long"],
      venue: "Biomedical Signal Processing and Control",
      citation: "92, 105979",
      doi: "10.1016/j.bspc.2024.105979",
      code: "https://github.com/long-nguyen12/PolyPooling",
      bibtex: String.raw`@article{nguyen2024polypooling,
  title={PolyPooling: An accurate polyp segmentation from colonoscopy images},
  author={Nguyen, Dinh Cong and Nguyen, Hoang Long},
  journal={Biomedical Signal Processing and Control},
  volume={92},
  pages={105979},
  year={2024},
  doi={10.1016/j.bspc.2024.105979}
}`,
    },
    {
      id: "hoang2023performance",
      year: 2023,
      type: "Conference",
      title:
        "Performance Evaluation of CNN-Based Encoders for Image Captioning",
      authors: ["Hoang, Anh Cong", "Nguyen, Dinh Cong", "Nguyen, Hoang Long"],
      venue:
        "International Conference on Control, Automation and Information Sciences",
      citation: "212–217",
      doi: "10.1109/ICCAIS59597.2023.10382370",
      bibtex: String.raw`@inproceedings{hoang2023performance,
  title={Performance Evaluation of CNN-Based Encoders for Image Captioning},
  author={Hoang, Anh Cong and Nguyen, Dinh Cong and Nguyen, Hoang Long},
  booktitle={International Conference on Control, Automation and Information Sciences (ICCAIS)},
  pages={212--217},
  year={2023},
  doi={10.1109/ICCAIS59597.2023.10382370}
}`,
    },
    {
      id: "nguyen2022vacant",
      year: 2022,
      type: "Conference",
      title:
        "Vacant Parking Car Detection and Notification by Using Multi-camera System and Deep Learning",
      authors: [
        "Nguyen, Dinh Cong",
        "Le, Viet Nam",
        "Nguyen, Hoang Long",
        "Tran, Doan Minh",
        "Cao, Van Luyen",
      ],
      venue: "Intelligent Systems and Networks",
      citation: "221–229",
      doi: "10.1007/978-981-19-3394-3_26",
      bibtex: String.raw`@incollection{nguyen2022vacant,
  title={Vacant Parking Car Detection and Notification by Using Multi-camera System and Deep Learning},
  author={Nguyen, Dinh Cong and Le, Viet Nam and Nguyen, Hoang Long and Tran, Doan Minh and Cao, Van Luyen},
  booktitle={Intelligent Systems and Networks: Selected Articles from ICISN 2022, Vietnam},
  pages={221--229},
  year={2022},
  publisher={Springer},
  doi={10.1007/978-981-19-3394-3_26}
}`,
    },
    {
      id: "nguyen2022proposed",
      year: 2022,
      type: "Conference",
      title:
        "From a Proposed CNN Model to a Real-World Application in Rice Disease Classification",
      authors: [
        "Nguyen, Hoang Long",
        "Tran, Thi Ha",
        "Le Thi, Hong Ha",
        "Nguyen, Dinh Cong",
      ],
      venue: "Research in Intelligent and Computing in Engineering",
      citation: "177–182",
      doi: "10.15439/2022R34",
      bibtex: String.raw`@inproceedings{nguyen2022proposed,
  title={From a Proposed CNN Model to a Real-World Application in Rice Disease Classification},
  author={Nguyen, Hoang Long and Tran, Thi Ha and Le Thi, Hong Ha and Nguyen, Dinh Cong},
  booktitle={Research in Intelligent and Computing in Engineering},
  pages={177--182},
  year={2022},
  doi={10.15439/2022R34}
}`,
    },
  ];

  const escapeHtml = (value) =>
    String(value).replace(
      /[&<>"']/g,
      (character) =>
        ({
          "&": "&amp;",
          "<": "&lt;",
          ">": "&gt;",
          '"': "&quot;",
          "'": "&#039;",
        })[character],
    );

  const externalLink = (url, label, className, showArrow = true) => `
    <a class="${className}" href="${escapeHtml(url)}" target="_blank" rel="noopener noreferrer">
      ${escapeHtml(label)}${showArrow ? ' <span aria-hidden="true">&#8599;</span>' : ""}
    </a>`;

  const renderAuthors = (authors) =>
    authors
      .map((author) => {
        const name = escapeHtml(author);
        return author === highlightedAuthor ? `<strong>${name}</strong>` : name;
      })
      .join("; ");

  const renderPublication = (publication) => {
    const collapseId = `collapseBibtex-${publication.id}`;
    const bibtexId = `bibtex-${publication.id}`;
    const title = publication.doi
      ? externalLink(
          `https://doi.org/${publication.doi}`,
          publication.title,
          "",
          false,
        )
      : escapeHtml(publication.title);
    const links = [];

    if (publication.doi) {
      links.push(
        externalLink(
          `https://doi.org/${publication.doi}`,
          "DOI",
          "publication-link",
        ),
      );
    }
    if (publication.code) {
      links.push(externalLink(publication.code, "Code", "publication-link"));
    }

    const typeClass =
      publication.type === "Journal" ? "" : " publication-type--conference";
    const citation = publication.citation
      ? `, ${escapeHtml(publication.citation)}`
      : "";

    return `
      <article class="publication-entry" id="publication-${publication.id}">
        <span class="publication-type${typeClass}">${escapeHtml(publication.type)}</span>
        <h3 class="publication-title">${title}</h3>
        <p class="publication-authors">${renderAuthors(publication.authors)}.</p>
        <p class="publication-venue"><cite>${escapeHtml(publication.venue)}</cite>${citation}.</p>
        <div class="publication-actions">
          ${links.join("")}
          <button class="btn btn-blue btn-sm" type="button" data-toggle="collapse" data-target="#${collapseId}" aria-expanded="false" aria-controls="${collapseId}">BibTeX</button>
        </div>
        <div id="${collapseId}" class="collapse bibtex-card position-relative">
          <button class="btn btn-sm bibtex-copy-btn" type="button" data-copy-bibtex="${bibtexId}">Copy</button>
          <pre id="${bibtexId}">${escapeHtml(publication.bibtex)}</pre>
        </div>
      </article>`;
  };

  const renderPublicationList = () => {
    const container = document.getElementById("publications-list");
    if (!container) {
      return;
    }

    const sortedPublications = [...publications].sort(
      (first, second) => second.year - first.year,
    );
    const years = [
      ...new Set(sortedPublications.map((publication) => publication.year)),
    ];

    container.innerHTML = years
      .map((year) => {
        const entries = sortedPublications
          .filter((publication) => publication.year === year)
          .map(renderPublication)
          .join("");

        return `
        <section class="publication-group" aria-labelledby="publications-${year}">
          <h2 class="publication-year" id="publications-${year}">${year}</h2>
          <div class="publication-list">${entries}</div>
        </section>`;
      })
      .join("");
  };

  const renderHighlightedPublications = () => {
    const container = document.getElementById("highlighted-publications");
    if (!container) {
      return;
    }

    container.innerHTML = publications
      .filter((publication) => Number.isInteger(publication.featured))
      .sort((first, second) => first.featured - second.featured)
      .map((publication) => {
        const title = publication.featuredTitle || publication.title;
        const href = publication.doi
          ? `https://doi.org/${publication.doi}`
          : `/pages/publications.html#publication-${publication.id}`;
        const externalAttributes = publication.doi
          ? ' target="_blank" rel="noopener noreferrer"'
          : "";

        return `
          <article class="selected-publication">
            <p>${publication.year} <span aria-hidden="true">·</span> ${escapeHtml(publication.venue)}</p>
            <h3><a href="${escapeHtml(href)}"${externalAttributes}>${escapeHtml(title)}</a></h3>
          </article>`;
      })
      .join("");
  };

  const copyBibtex = async (button) => {
    const bibtexBlock = document.getElementById(button.dataset.copyBibtex);
    if (!bibtexBlock) {
      return;
    }

    const originalLabel = button.textContent;
    try {
      await navigator.clipboard.writeText(bibtexBlock.innerText.trim());
      button.textContent = "Copied";
      window.setTimeout(() => {
        button.textContent = originalLabel;
      }, 1600);
    } catch (error) {
      console.error("Failed to copy BibTeX:", error);
    }
  };

  document.addEventListener("click", (event) => {
    const button = event.target.closest("[data-copy-bibtex]");
    if (button) {
      copyBibtex(button);
    }
  });

  renderPublicationList();
  renderHighlightedPublications();
})();
