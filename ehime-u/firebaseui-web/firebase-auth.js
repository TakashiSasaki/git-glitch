//import { LitElement, html, css } from "https://unpkg.com/lit@2?module";
import {
  LitElement,
  html,
  css,
} from "https://cdn.jsdelivr.net/gh/lit/dist@2/all/lit-all.min.js";
import "./firebase-app.js";
import "./firebase-auth-config.js";
import "./firebase-user.js";

customElements.define(
  "firebase-auth",

  class extends LitElement {
    constructor() {
      super();
      this.lastUpdated = new Date();
      this.autoRefresh = false;
    }

    updated(changedProperties) {
      if (!changedProperties.has("lastUpdated")) {
        this.lastUpdated = new Date();
      }
      super.updated(changedProperties);
    } //updated

    static properties = {
      firebaseAuth: {
        type: Object,
      },
      autoRefresh: {
        type: Boolean,
        reflect: true,
      },
    };

    static get styles() {
      return css`
        legend {
          font-size: 1.3em;
        }
        fieldset {
          background-color: #dfffdf;
        }
        label {
          display: block;
          margin-top: 0.2em;
        }
        label input {
          min-width: 33em;
        }
      `;
    } //styles

    connectedCallback() {
      super.connectedCallback();
      console.log(this.autoRefresh);
      if (this.autoRefresh) {
        this.intervalId = setInterval(() => {
          this.firebaseAuth = firebase.auth();
        }, 5000);
      }
    } //connectedCallback

    disconnectedCallback() {
      clearInterval(this.intervalId);
      super.disconnectedCallback();
    } //disconnectedCallback

    render() {
      return html`
      <fieldset>
      <legend><a href="https://firebase.google.com/docs/reference/js/v8/firebase.auth.Auth#config">firebase.auth.Auth</a></legend>
      <label>app<firebase-app .firebaseApp=${this.firebaseAuth.app}></firebase-app></label>
      <label>config<firebase-auth-config .firebaseAuthConfig=${this.firebaseAuthConfig}
         ></firebase-auth-config></label>
      <label>currentUser<firebase-user .firebaseUser="${this.firebaseAuth.currentUser}"/></firebase-user></label>
      <label>emulatorConfig<input placeholder="N/A" readonly/></label>
      <label>languageCode<input value="${this.firebaseAuth.languageCode}" readonly/></label>
      <label>name<input value="${this.firebaseAuth.name}" readonly></label>
      <label>appVerificationDisabledForTesting
      <input value="${this.firebaseAuth.settings.appVerificationDisabledForTesting}" readonly/>
      </label>
      <label>tenantId<input value=${this.firebaseAuth.tenantId} readonly/></label>
      <label>last updated time<input value=${this.lastUpdated} readonly/></label>
      </fieldset>
      `;
    } //render()
  } //class LitElement
);
