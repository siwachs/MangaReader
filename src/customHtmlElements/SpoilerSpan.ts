class SpoilerOverlay extends HTMLSpanElement {
  constructor() {
    super();

    this.attachShadow({ mode: "open" });
    this.tabIndex = 0;

    if (this.shadowRoot)
      this.shadowRoot.innerHTML = `<span><slot></slot></span>`;

    this.style.backgroundColor = "var(--app-text-color-blue-gray)";
    this.style.padding = "0 0.5em";
    this.style.color = "transparent";

    this.addEventListener("mouseenter", () => {
      this.style.color = "inherit";
      this.style.backgroundColor = "var(--app-text-color-grayish-blue)";
    });

    this.addEventListener("mouseleave", () => {
      this.style.color = "transparent";
      this.style.backgroundColor = "var(--app-text-color-blue-gray)";
    });

    this.addEventListener("focus", () => {
      this.style.color = "inherit";
      this.style.background = "var(--app-text-color-grayish-blue)";
    });

    this.addEventListener("blur", () => {
      this.style.color = "transparent";
      this.style.background = "var(--app-text-color-blue-gray)";
    });
  }
}

customElements.define("spoiler-span", SpoilerOverlay, { extends: "span" });
