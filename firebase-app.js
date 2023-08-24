import { LitElement, html, css } from "https://unpkg.com/lit@2?module";
import  FirebaseConfigElement from "./firebase-config.js";

class FirebaseAppElement extends LitElement {
  constructor() {
    super();
    this.lastUpdated = new Date();
  } //constructor

  updated(changedProperties) {
    if (!changedProperties.has("lastUpdated")) {
      this.lastUpdated = new Date();
    }
    super.updated(changedProperties);
  } //updated()

  static properties = {
    firebaseApp: { type: Object },
  };

  set firebaseApp(newValue) {
    this._firebaseApp = newValue;
    this.requestUpdate();
  }

  get firebaseApp() {
    return this._firebaseApp;
  }
  
  get name(){
    return this._firebaseApp.name;
  }
  
  get automaticDataCollectionEnabled(){
    return this._firebaseApp.automaticDataCollectionEnabled;
  }
  
  
  get options(){
    return this._firebaseApp.options;
  }

  static get styles() {
    return css`
      :host div {
        background-color: #eeffff;
        border: 1px dotted gray;
      }
      label {
        display: block;
      }
      input {
        margin-left: 1em;
        min-width: 32em;
      }
      firebase-config {
        max-width: 90%;
        margin-top: 0.5em;
        margin-bottom: 0.5em;
        margin-left: 0.5em;
        margin-right: 0.5em;
      }
    `;
  } //styles()

  render() {
    return html`<div>
      <label>automaticDataCollectionEnabled<input value="${this.automaticDataCollectionEnabled}" readonly /></label>
      <label>name<input value="${this.name}" readonly/></label>
      <firebase-config .firebaseConfig="${this.options}"></firebase-config>
    </div> `;
  } //render()
} //class FirebaseAppElement

customElements.define("firebase-app", FirebaseAppElement);
export default FirebaseAppElement;
