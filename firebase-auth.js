import { LitElement, html, css } from "https://unpkg.com/lit@2?module";
import "./firebase-app.js";
import "./firebase-auth-config.js";

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
        },
      };
    }

    static get styles() {
      return css`
        fieldset {
          background-color: #dfffdf;
        }
        label {
          display: block;
        }
      `;
    } //styles

    u() {
      this.firebaseAuth = firebase.auth();
      const firebaseAppElement = this.shadowRoot.querySelector("firebase-app");
      if (firebaseAppElement) {
        firebaseAppElement.firebaseApp = this.firebaseAuth.app;
      } //if
      const firebaseAuthConfigElement = this.shadowRoot.querySelector(
        "firebase-auth-config"
      );
      console.log(firebaseAuthConfigElement);
      console.log(this.firebaseAuth.config);
      if (firebaseAuthConfigElement) {
        firebaseAuthConfigElement.firebaseAuthConfig = this.firebaseAuth.config;
      }
    }

    connectedCallback() {
      super.connectedCallback();
      this.intervalId = setInterval(u, 10000); // 1000ミリ秒ごとに更新
    } //connectedCallback

    disconnectedCallback() {
      clearInterval(this.intervalId);
      super.disconnectedCallback();
    } //disconnectedCallback

    render() {
      return html`
      <fieldset>
      <legend><a href="https://firebase.google.com/docs/reference/js/v8/firebase.auth.Auth#config">firebase.auth.Auth</a></legend>
      <label>app<firebase-app></firebase-app></label>
      <label>config<firebase-auth-config
         ></firebase-auth-config></label>
      <label>currentUser<firebase-user .firebaseUser=${this.firebaseAuth.currentUser}/></firebase-user></label>
      <label>emulatorConfig<input placeholder="N/A" readonly></label>
      <label>languageCode<input value="${this.firebaseAuth.languageCode}" redonly></label>
      <label>name<input value="${this.firebaseAuth.name} readonly"></label>
      <label>appVerificationDisabledForTesting
      <input value="${this.firebaseAuth.settings.appVerificationDisabledForTesting}" readonly>
      </label>
      <label>tenantId<input value=${this.firebaseAuth.tenantId} readonly></label>
      </fieldset>
      `;
    }
  }
);
