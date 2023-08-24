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
        },
      };
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

    connectedCallback() {
      super.connectedCallback();
      this.intervalId = setInterval(() => {
        const firebaseAppElement =
          this.shadowRoot.querySelector("firebase-app");
        console.log(firebaseAppElement);
        if (firebaseAppElement) {
          firebaseAppElement.firebaseApp = this.firebaseAuth.app;
        } //if
      }, 3000); // 1000ミリ秒ごとに更新
    } //connectedCallback

    disconnectedCallback() {
      clearInterval(this.intervalId);
      super.disconnectedCallback();
    } //disconnectedCallback

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
