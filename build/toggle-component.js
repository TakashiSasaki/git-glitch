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
            <!-- TODO: 非表示になっているときには「Show Debug Messagesと-->
            <button id="toggleButton">表示/非表示</button>
            <div id="toggleContent">
              sample debug message
            </div>
          `;

    this.button = this.shadowRoot.querySelector("#toggleButton");
    this.content = this.shadowRoot.querySelector("#toggleContent");
  }

  connectedCallback() {
    const isContentVisible =
      localStorage.getItem("isContentVisible") === "true";
    this.content.style.display = isContentVisible ? "block" : "none";

    this.button.addEventListener("click", () => {
      const isVisible = this.content.style.display === "block";
      this.content.style.display = isVisible ? "none" : "block";
      localStorage.setItem("isContentVisible", !isVisible);
    });
  }
}

customElements.define("toggle-component", ToggleComponent);
