import { LitElement, html, css } from "https://unpkg.com/lit@2?module";
import FirebaseConfigElement from "./firebase-config.js";

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

  get name() {
    return this._firebaseApp.name;
  }

  get automaticDataCollectionEnabled() {
    if (this._firebaseApp === undefined) {
      throw new Error("_firebaseApp is not initialized.");
    } else {
      return this._firebaseApp.automaticDataCollectionEnabled;
    }
  }

  get options() {
    return this._firebaseApp.options;
  }

  static get styles() {
    return css`
      :host > div {
        background-color: #eeffff;
      }
      legend {
        margin: inherit;
        margin-left: 0.5em;
        font-size: 1.3em;
        text-decoration: underline;
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
      <fieldset>
        <legend>firebase-app</legend>
        <label
          >automaticDataCollectionEnabled<input
            value="${this.automaticDataCollectionEnabled}"
            readonly
        /></label>
        <label>name<input value="${this.name}" readonly /></label>
        <label
          >last updated <input value="${this.lastUpdated}" readonly
        /></label>

        <firebase-config .firebaseConfig="${this.options}"></firebase-config>
        <firebase-user></firebase-user>
      </fieldset>
    </div> `;
  } //render()
} //class FirebaseAppElement

customElements.define("firebase-app", FirebaseAppElement);
export default FirebaseAppElement;
