class SpoilerTag extends HTMLElement {
  connectedCallback() {
    this.setAttribute("tabindex", "0");

    this.style.display = "inline-block";
    this.style.backgroundColor = "var(--app-text-color-blue-gray)";
    this.style.padding = "0 0.5em";
    this.style.color = "transparent";

    this.addEventListener("mouseenter", () => {
      this.style.color = "inherit";
      this.style.backgroundColor = "var(--app-text-color-grayish-blue)";
    });

    this.addEventListener("mouseleave", () => {
      if (this === document.activeElement) return;
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

export default SpoilerTag;
