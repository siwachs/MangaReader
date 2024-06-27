class SpoilerElement extends HTMLElement {
  private _shadowRoot: ShadowRoot;

  constructor() {
    super();

    this._shadowRoot = this.attachShadow({ mode: "open" });

    const spoiler = document.createElement("span");
    spoiler.tabIndex = 0;
    spoiler.classList.add(
      "inline p-[0_0.5em] bg-[var(--app-text-color-blue-gray)] text-transparent hover:bg-[var(--app-text-color-grayish-blue)] hover:text-inherit focus:bg-[var(--app-text-color-grayish-blue)] focus:text-inherit",
    );
    spoiler.textContent = this.textContent;

    this._shadowRoot.appendChild(spoiler);
  }
}

customElements.define("spoiler", SpoilerElement);
