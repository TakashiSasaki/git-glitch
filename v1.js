class MyElement extends HTMLElement {
  connectedCallback() {
    this.textContent = "Hello, Web Components!";
    this.innerHTML("<input placeholder='abc'></input>");
    this.style.backgroundColor = "yellow";
    this.querySelector("input").value = "abc";
  }
}
customElements.define("my-element", MyElement);
