import { LitElement, html, css } from "https://unpkg.com/lit@2?module";

customElements.define(
  "firebase-auth-info",

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

    static get styles() {
      return css`
        :host div {
          background-color: yellow;
        }
      `;
    }

    get app() {
      return firebase.auth().app;
    }

    get config() {
      return firebase.auth().cofnig;
    }

    get currentUser() {
      return firebase.auth().currentUser;
    }

    get languageCode() {
      return firebase.auth().languageCode;
    }

    get name() {
      return firebase.auth().name;
    }

    get settings() {
      return firebase.auth().settings;
    }

    get tenantId() {
      return firebase.auth().tenantId;
    }

    render() {
      return html`
      <fieldset>
      <legend>firebase.auth.Auth</legend>
      <label>config<firebase-auth-config
         .firebaseAuthConfig="${this.firebaseAuthConfig}"></firebase-auth-config></label>
      <label>currentUser<firebase-user .firebaseUser=${this.firebaseUser}/></firebase-user></label>
      <label>emulatorConfig<input placeholder="N/A"></label>
      <label>languageCode<input value="${this.languageCode}"></label>
      <label>name<input value="${this.name}"></label>
      <label>appVerificationDisabledForTesting<input value="${this.appVerificationDisabledForTesting}"></label>
      <label>tenantId<input value=${this.tenantId}</label>
      </fieldset>
      `;
    }
  }
);
