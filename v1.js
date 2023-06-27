class NameContentElement extends HTMLElement {
  static get observedAttributes(){
    return ["name", "content"];
  }
  
  connectedCallback() {
    this.nameInput = document.createElement("input");
    this.contentInput = document.createElement("input");
    this.appendChild(this.nameInput);
    this.appendChild(this.contentInput);
  }
  
  attributeChangedCallback(name, oldValue, newValue){
    if(name="name"){
      this.nameInput.value = newValue;
      return;
    }
    if(name="content"){
      this.contentInput = newValue;
      return;
    }
  }
}
customElements.define("name-content", NameContentElement);

class MyElement extends HTMLElement {
  connectedCallback() {
    this.textContent = "Hello, Web Components!";
    this.innerHTML = "<input placeholder='abc'></input>";
    this.style.backgroundColor = "yellow";
    
    document.querySelector("meta").forEach(element =>{
      const nameContentElement = document.createElement("name-content");
      
      nameContentElement.setAttribute("name", element.getAttribute("name"));
      nameContentElement.setAttribute("content", element.getAttribute("content"));
    });
  }
}
customElements.define("my-element", MyElement);
