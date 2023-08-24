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

    set firebaseAuthConfig(newValue) {
      console.log(newValue);
      if (!newValue) {
        this._firebaseAuthConfig = {};
      } else {
        this._firebaseAuthConfig = newValue;
      }
    }

    get firebaseAuthConfig() {
      return this._firebaseAuthConfig;
    }

    connectedCallback() {
      super.connectedCallback();
      this.intervalId = setInterval(() => {
        this.requestUpdate();
      }, 3000); 
    } //connectedCallback

    disconnectedCallback() {
      clearInterval(this.intervalId);
      super.disconnectedCallback();
    } //disconnectedCallback

    render() {
      return html`
        <fieldset>
          <legend>
            <a
              href="https://firebase.google.com/docs/reference/js/v8/firebase.auth.Config"
              target="firebase.auth.Config">firebase.auth.Config</a
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
          <label
            >authDomain<input
              value="${this.firebaseAuthConfig.authDomain}"
              readonly
          /></label>
          <label
            >sdkClientVersion
            <input value="${this.firebaseAuthConfig.sdkClientVersion}" readonly
          /></label>
          <label
            >tokenApiHost
            <input value="${this.firebaseAuthConfig.tokenApiHost}" readonly
          /></label>
        </fieldset>
      `;
    } //render
  } //LitElement
);
