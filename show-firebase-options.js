import { LitElement, html, css } from "https://unpkg.com/lit@2?module";

customElements.define(
  "show-firebase-options",

  class extends LitElement {
    constructor() {
      super();
    } //constructor

    static get styles() {
      return css`
        :host div {
          background-color: yellow;
        }
        label {
          display: block;
        }
      `;
    } //styles()

    get apiKey(){
      return firebase.auth().apiKey;
    }
    
    get appId(){
      return firebase.auth().appId;
    }
    
    get authDomain(){
      return firebase.auth().authDomain;
    }
    
    get databaseURL(){
      return firebase.auth().databaseURL;
    }
    
    get measurementId(){
      return firebase.auth().measurementId;
    }
    
    get messagingSenderId(){
      return firebase.auth().messagingSenderId;
    }
    
    get projectId(){
      return firebase.auth().projectId;
    }
    
    get storageBucket(){
      return firebase.auth().storageBucket;
    }
    
    render() {
      return html```
<div>
  <label>apiKey<input value="${this.apiKey}"</label>
  <label>appId<input value="${this.appId}"></label>
  <label>authDomain<input value="${this.authDomain}"></label>
  <label>databaseURL<input value=${this.databaseURL}"></label>
  <label>measurementId<input value=${this.measurementId}"></label>
  <label>messagingSenderId<input value=${this.messagingSenderId}"></label>
  <label>projectId<input value=${this.projectId}"></label>
  <label>storageBucket<input value=${this.storageBucket}"></label>
</div>
```;
    } //render()
  } //LitElement
);//customElement.define
