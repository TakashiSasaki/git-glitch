import { LitElement, html, css } from "https://unpkg.com/lit@2?module";
import FirebaseConfigElement from "./firebase-config.js";
import "./firebase-user.js";

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
        <legend>
          <a
            href="https://firebase.google.com/docs/reference/js/v8/firebase.app.App"
            >firebase.app.App</a
          >
        </legend>
        <label
          >automaticDataCollectionEnabled<input
            value="${this.firebaseApp.automaticDataCollectionEnabled}"
            readonly
        /></label>
        <label>name<input value="${this.firebaseApp.name}" readonly /></label>
        <label
          >last updated <input value="${this.lastUpdated}" readonly
        /></label>
        <label
          >options
          <firebase-config
            .firebaseConfig="${this.firebaseApp.options}"
          ></firebase-config
        ></label>
      </fieldset>
    </div> `;
  } //render()
} //class FirebaseAppElement

customElements.define("firebase-app", FirebaseAppElement);
export default FirebaseAppElement;
