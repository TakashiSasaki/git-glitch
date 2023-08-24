import { LitElement, html, css } from "https://unpkg.com/lit@2?module";

customElements.define(
  "firebase-user-info",
  "firebase-auth",
  class extends LitElement {
    constructor(){
      super();
    }
    
    static properties = {
      userInfo: {type:Object},
    }//properties
    
    
    render(){}
    
    
  }//class LitElement
);
