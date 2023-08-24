import { LitElement, html, css } from "https://unpkg.com/lit@2?module";
import { FirebaseConfigElement} from "./firebase-cofnig.js";

class FirebaseConfigElement extends LitElement {
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
    console.log(newValue);
    this._firebaseApp = newValue;
    this.requestUpdate();
  }

  get firebaseApp() {
    return this._firebaseApp;
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
    `;
  } //styles()

  render() {
    return html`<div>
      <label>automaticDataCollectionEnabled<input value="${this.apiKey}" readonly /></label>
      <label>appId<input value="${this.appId}" readonly /></label>
      <label>authDomain<input value="${this.authDomain}" readonly /></label>
      <label>databaseURL<input value="${this.databaseURL}" readonly /></label>
      <label
        >measurementId<input value="${this.measurementId}" readonly
      /></label>
      <label
        >messagingSenderId<input value="${this.messagingSenderId}" readonly
      /></label>
      <label>projectId<input value="${this.projectId}" readonly /></label>
      <label
        >storageBucket<input value="${this.storageBucket}" readoly
      /></label>
      <label>last updated <input value="${this.lastUpdated}" readonly /></label>
    </div> `;
  } //render()
} //class FirebaseAppElement

customElements.define("firebase-app", FirebaseAppElement);
export default FirebaseAppElement;
