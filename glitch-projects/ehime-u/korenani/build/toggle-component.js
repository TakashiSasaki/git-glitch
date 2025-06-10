class ToggleComponent extends HTMLElement {
  constructor() {
    super();

    this.attachShadow({ mode: "open" });
    this.shadowRoot.innerHTML = `
            <style>
  #toggleButton {
    margin-top: 0.1em;
    margin-bottom: 0px;
    padding: 5px 10px;
    border: 1px solid #ddd;
    background-color: #f8f8f8;
  }

  #toggleButton.active {
    box-shadow: -4px -4px 8px rgba(0, 0, 0, 0.2); /* 左辺と上辺にシャドウを追加 */
  }

  #toggleContent {
    display: none;
    margin-top: 0;
    margin-bottom: 1em;
    border: 1px solid #ddd;
    padding: 10px;
    background-color: #f8f8f8;
  }
  
  #toggleContent.active {
    box-shadow: 4px 4px 8px rgba(0, 0, 0, 0.2); /* 右辺と下辺にシャドウを追加 */
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

  static get observedAttributes() {
    return ["show-text", "hide-text"];
  }

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
    if (isVisible) {
      this.button.classList.add("active"); // ボタンにシャドウを表示
      this.content.classList.add("active"); // コンテンツエリアにシャドウを表示
    } else {
      this.button.classList.remove("active"); // ボタンのシャドウを非表示
      this.content.classList.remove("active"); // コンテンツエリアのシャドウを非表示
    }
  }
}

customElements.define("toggle-component", ToggleComponent);
