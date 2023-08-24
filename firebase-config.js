import { LitElement, html, css } from "https://unpkg.com/lit@2?module";

class FirebaseConfigElement extends LitElement {
  constructor() {
    super();
    this.lastUpdated = new Date();
  } //constructor

  static properties = {
    firebaseConfig: { type: Object },
  };

  set firebaseConfig(newValue) {
    console.log(newValue);
    this._firebaseConfig = newValue;
    this.requestUpdate();
  }

  get firebaseConfig() {
    return this._firebaseConfig;
  }

  static get styles() {
    return css`
      :host div {
        margin: 0.5em;
        background-color: yellow;
        border: 1px dotted gray;
      }
      :host div h1 {
        margin: inherit;
        padding: inherit;
        text-decoration: underline;
        font-size: 1.3em;
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

  get apiKey() {
    return this.firebaseConfig.apiKey;
  }

  get appId() {
    return this.firebaseConfig.appId;
  }

  get authDomain() {
    return this.firebaseConfig.authDomain;
  }

  get databaseURL() {
    return this.firebaseConfig.databaseURL;
  }

  get measurementId() {
    return this.firebaseConfig.measurementId;
  }

  get messagingSenderId() {
    return this.firebaseConfig.messagingSenderId;
  }

  get projectId() {
    return this.firebaseConfig.projectId;
  }

  get storageBucket() {
    return this.firebaseConfig.storageBucket;
  }

  updated(changedProperties) {
    if (!changedProperties.has("lastUpdated")) {
      this.lastUpdated = new Date();
    }
    super.updated(changedProperties);
  } //updated()

  render() {
    return html`<div>
    <h1>firebase-config</h1>
      <label>apiKey<input value="${this.apiKey}" readonly /></label>
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
} //LitElement

customElements.define("firebase-config", FirebaseConfigElement);
export default FirebaseConfigElement;
