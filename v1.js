class MyElement extends HTMLElement {
  constructor() {
    super();
    this.textContent = "Hello, Web Components!";
  }
}
customElements.define("my-element", MyElement);
