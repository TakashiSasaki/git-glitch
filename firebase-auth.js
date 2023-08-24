import { LitElement, html, css } from "https://unpkg.com/lit@2?module";
import "./firebase-app.js";

customElements.define(
  "firebase-auth",

  class extends LitElement {
    constructor() {
      super();
      this.lastUpdated = new Date();
    }

    updated(changedProperties) {
      if (!changedProperties.has("lastUpdated")) {
        this.lastUpdated = new Date();
      }
      super.updated(changedProperties);
    }

    static get properties() {
      return {
        firebaseAuth: {
          type: Object,
          hasChanged(newVal, oldVal) {
            console.log(newVal, oldVal);
            return true;
          },
        },
      };
    }

    set firebaseAuth(newValue) {
      this._firebaseAuth = newValue;
      const firebaseAppElement = this.shadowRoot.querySelector("firebase-app");
      if (firebaseAppElement) {
        firebaseAppElement.firebaseApp = newValue.app;
      }
      this.requestUpdate();
    }

    get firebaseAuth() {
      if (!this._firebaseAuth) throw Error("firebaseAuth is not set.");
      return this._firebaseAuth;
    }

    static get styles() {
      return css`
        fieldset {
          background-color: #ffddff;
        }
        label {
          display: block;
        }
      `;
    } //styles

    render() {
      return html`
      <fieldset>
      <legend>firebase.auth.Auth</legend>
      <label>app<firebase-app></firebase-app></label>
      <label>config<firebase-auth-config
         ></firebase-auth-config></label>
      <label>currentUser<firebase-user/></firebase-user></label>
      <label>emulatorConfig<input placeholder="N/A"></label>
      <label>languageCode<input value="${this.firebaseAuth.languageCode}"></label>
      <label>name<input value="${this.firebaseAuth.name}"></label>
      <label>appVerificationDisabledForTesting
      <input value="${this.firebaseAuth.settings.appVerificationDisabledForTesting}">
      </label>
      <label>tenantId<input value=${this.firebaseAuth.tenantId}></label>
      </fieldset>
      `;
    }
  }
);
