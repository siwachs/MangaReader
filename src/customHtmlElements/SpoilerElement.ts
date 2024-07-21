class SpoilerTag extends HTMLElement {
  setInitialStyles() {
    this.style.display = "inline-block";
    this.style.backgroundColor = "var(--app-text-color-blue-gray)";
    this.style.padding = "0 0.5em";
    this.style.color = "transparent";
  }

  showSpoiler() {
    this.style.color = "inherit";
    this.style.backgroundColor = "var(--app-text-color-grayish-blue)";
  }

  hideSpoiler() {
    if (this === document.activeElement || this.getAttribute("data-active"))
      return;
    this.style.color = "transparent";
    this.style.backgroundColor = "var(--app-text-color-blue-gray)";
  }

  connectedCallback() {
    this.setAttribute("tabindex", "0");

    this.setInitialStyles();

    if (this.getAttribute("data-active")) {
      this.showSpoiler();
    }

    this.addEventListener("mouseenter", () => {
      this.showSpoiler();
    });

    this.addEventListener("mouseleave", () => {
      this.hideSpoiler();
    });

    this.addEventListener("focus", () => {
      this.showSpoiler();
    });

    this.addEventListener("blur", () => {
      this.hideSpoiler();
    });
  }
}

export default SpoilerTag;
