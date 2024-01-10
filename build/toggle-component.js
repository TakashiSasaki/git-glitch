class ToggleComponent extends HTMLElement {
  constructor() {
    super();

    this.attachShadow({ mode: "open" });
    this.shadowRoot.innerHTML = `
            <style>
              #toggleContent {
                display: none;
                margin-top: 10px;
                border: 1px solid #ddd;
                padding: 10px;
              }
            </style>
            <button id="toggleButton">表示/非表示</button>
            <div id="toggleContent">
              <slot></slot>
            </div>
          `;

    this.button = this.shadowRoot.querySelector("#toggleButton");
    this.content = this.shadowRoot.querySelector("#toggleContent");
  }

  // 属性の変更を監視するための関数
  static get observedAttributes() {
    return ["show-text", "hide-text"];
  }

  // 属性が変更されたときに呼ばれる関数
  attributeChangedCallback(name, oldValue, newValue) {
    if (name === "show-text") {
      this.showText = newValue;
    } else if (name === "hide-text") {
      this.hideText = newValue;
    }
    this.updateButtonText();
  }

  connectedCallback() {
    this.showText = this.getAttribute("show-text") || "Show";
    this.hideText = this.getAttribute("hide-text") || "Hide";

    const isContentVisible =
      localStorage.getItem("isContentVisible") === "true";
    this.content.style.display = isContentVisible ? "block" : "none";
    this.updateButtonText(isContentVisible);

    this.button.addEventListener("click", () => {
      const isVisible = this.content.style.display === "block";
      this.content.style.display = isVisible ? "none" : "block";
      localStorage.setItem("isContentVisible", !isVisible);
      this.updateButtonText(!isVisible);
    });
  }

  updateButtonText(isVisible) {
    this.button.textContent = isVisible ? this.hideText : this.showText;
  }
}

customElements.define("toggle-component", ToggleComponent);
