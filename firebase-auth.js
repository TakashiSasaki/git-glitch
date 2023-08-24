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

    set firebaseAuth(newValue) {
      console.log(newValue);
      const oldValue = this._firebaseAuth;
      this._firebaseAuth = newValue;
      this.requestUpdate("firebaseAuth", oldValue);
    }

    get firebaseAuth() {
      return this._firebaseAuth;
    }

    static get styles() {
      return css`
        fieldset {
          background-color: #ffddff;
        }
        label{display:block}
      `;
    }

    get app() {
      if(this._firebaseAuth === undefined)
        throw new Error("_firebaseAuth is not initialized");
      return this._firebaseAuth.app;
    }

    get config() {
      return this._firebaseAuth.config;
    }

    get currentUser() {
      return this._firebaseAuth.currentUser;
    }

    get languageCode() {
      return this._firebaseAuth.languageCode;
    }

    get name() {
      return this._firebaseAuth.name;
    }

    get settings() {
      return this._firebaseAuth.settings;
    }

    get tenantId() {
      return this._firebaseAuth.tenantId;
    }

    get appVerificationDisabledForTesting() {
      return this._firebaseAuth.settings.appVerificationDisabledForTesting;
    }

    render() {
      return html`
      <fieldset>
      <legend>firebase.auth.Auth</legend>
      <label>app<firebase-app .firebaseApp="${this.app}"></firebase-app></label>
      <label>config<firebase-auth-config
         .firebaseAuthConfig="${this.config}"></firebase-auth-config></label>
      <label>currentUser<firebase-user .firebaseUser=${this.currentUser}/></firebase-user></label>
      <label>emulatorConfig<input placeholder="N/A"></label>
      <label>languageCode<input value="${this.languageCode}"></label>
      <label>name<input value="${this.name}"></label>
      <label>appVerificationDisabledForTesting<input value="${this.appVerificationDisabledForTesting}"></label>
      <label>tenantId<input value=${this.tenantId}></label>
      </fieldset>
      `;
    }
  }
);
