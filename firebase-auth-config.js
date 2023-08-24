import { LitElement, html, css } from "https://unpkg.com/lit@2?module";

customElements.define(
  "firebase-auth-config",
  class extends LitElement {
    constructor() {
      super();
    }

    static properties = {
      firebaseAuthConfig: { type: Object },
    }; //properties

    render() {
      return html`
        <fieldset>
          <legend>
            <a
              href="https://firebase.google.com/docs/reference/js/v8/firebase.auth.Config"
              >firebase.auth.Config</a
            >
          </legend>
          <label
            >apiHost<input value="${this.firebaseAuthConfig.apiHost}" readonly
          /></label>
          <label
            >apiKey <input value="${this.firebaseAuthConfig.apiKey}" readonly
          /></label>
          <label
            >apiScheme
            <input value="${this.firebaseAuthConfig.apiScheme}" readonly
          /></label>
          <label>authDomain<input value="${this.firebaseAuthConfig.authDomain}" readonly></label>
          <label>sdkClientVersion <input value="${this.firebaseAuthConfig.sdkClientVersion}"
        </fieldset>
      `;
    }
  }
);
