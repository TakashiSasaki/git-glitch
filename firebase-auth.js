import { LitElement, html, css } from "https://unpkg.com/lit@2?module";

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

    static properties = {
      firebaseAuth: { type: Object },
    };

    static get styles() {
      return css`
        fieldset {
          background-color: #ffddff;
        }
        label {
          display: block;
        }
      `;
    }//styles()

    render() {
      return html`
      <fieldset>
      <legend>firebase.auth.Auth</legend>
      <label>app<firebase-app .firebaseApp="${this.firebaseAuth.app}"></firebase-app></label>
      <label>config<firebase-auth-config
         .firebaseAuthConfig="${this.firebaseAuth.config}"></firebase-auth-config></label>
      <label>currentUser<firebase-user .firebaseUser=${this.firebaseAuth.currentUser}/></firebase-user></label>
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
