import { LitElement, html, css } from "https://unpkg.com/lit@2?module";
customElements.define(
  "firebase-options",
  class extends LitElement {
    constructor() {
      super();
      this.lastUpdated = new Date();
    } //constructor

    static properties = {
      firebaseOptions: { type: Object },
    };

    static get styles() {
      return css`
        legend {
          margin: inherit;
          margin-left: 0.5em;
          font-size: 1.3em;
          text-decoration: underline;
        }

        fieldset {
          background-color: yellow;
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

    updated(changedProperties) {
      if (!changedProperties.has("lastUpdated")) {
        this.lastUpdated = new Date();
      }
      super.updated(changedProperties);
    } //updated()

    render() {
      return html`
        <fieldset>
          <legend>
            <a
              href="https://firebase.google.com/docs/reference/js/app.firebaseoptions?hl=en"
              >FirebaseOptions</a
            >
          </legend>
          <label
            >apiKey<input value="${this.firebaseOptions.apiKey}" readonly
          /></label>
          <label
            >appId<input value="${this.firebaseOptions.appId}" readonly
          /></label>
          <label
            >authDomain<input
              value="${this.firebaseOptions.authDomain}"
              readonly
          /></label>
          <label
            >databaseURL<input
              value="${this.firebaseOptions.databaseURL}"
              readonly
          /></label>
          <label
            >measurementId<input
              value="${this.firebaseOptions.measurementId}"
              readonly
          /></label>
          <label
            >messagingSenderId<input
              value="${this.firebaseOptions.messagingSenderId}"
              readonly
          /></label>
          <label
            >projectId<input value="${this.firebaseOptions.projectId}" readonly
          /></label>
          <label
            >storageBucket<input
              value="${this.firebaseOptions.storageBucket}"
              readonly
          /></label>
          <label
            >last updated <input value="${this.lastUpdated}" readonly
          /></label>
        </fieldset>
      `;
    } //render()
  } //LitElement
);
