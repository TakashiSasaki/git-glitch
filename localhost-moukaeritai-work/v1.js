class NameContentElement extends HTMLElement {
  constructor() {
    super();
    this.nameInput = document.createElement("input");
    this.nameInput.setAttribute("placeholder", "name");
    this.contentInput = document.createElement("input");
    this.contentInput.setAttribute("placeholder", "content");
  }

  static get observedAttributes() {
    return ["name", "content"];
  }

  connectedCallback() {
    this.appendChild(this.nameInput);
    this.appendChild(this.contentInput);
  }

  attributeChangedCallback(name, oldValue, newValue) {
    if (name == "name") {
      this.nameInput.value = newValue;
      return;
    }
    if (name == "content") {
      this.contentInput.value = newValue;
      return;
    }
  }
}
customElements.define("name-content", NameContentElement);

class MetaNameContents extends HTMLElement {
  connectedCallback() {
    this.textContent = "Hello, Web Components!";
    this.innerHTML = "<input placeholder='abc'></input>";
    this.style.backgroundColor = "yellow";

    document.querySelectorAll("meta").forEach((metaElement) => {
      if (metaElement.hasAttribute("name")) {
        const nameContentElement = document.createElement("name-content");
        nameContentElement.setAttribute(
          "name",
          metaElement.getAttribute("name")
        );
        nameContentElement.setAttribute(
          "content",
          metaElement.getAttribute("content")
        );
        this.appendChild(nameContentElement);
      }
    });
  }
}
customElements.define("meta-name-contents", MetaNameContents);

class PrintLocationElement extends HTMLElement {
}