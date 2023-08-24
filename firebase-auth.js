import { LitElement, html, css } from "https://unpkg.com/lit@2?module";
import "./firebase-app.js";
import "./firebase-auth-config.js";
import "./firebase-user.js";

customElements.define(
  "firebase-auth",

  class extends LitElement {
    constructor() {
      super();
      this.lastUpdated = new Date();
      this.autoRefresh = 100;
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
      `;
    } //styles

    initChildCustomElements() {
      this.firebaseAuth = firebase.auth();
      try {
        this.shadowRoot.querySelector("firebase-app").firebaseApp =
          this.firebaseAuth.app;
        this.shadowRoot.querySelector(
          "firebase-auth-config"
        ).firebaseAuthConfig = this.firebaseAuth.config;
        this.shadowRoot.querySelector("firebase-user").firebaseUser =
          this.firebaseAuth.currentUser;
      } catch (e) {
        console.log(e);
      } //try
    } //initChildCustomElements


    connectedCallback() {
      super.connectedCallback();
      console.log(this.autoRefresh);
      if (this.autoRefresh) {
        this.intervalId = setInterval(() => {
          this.initChildCustomElements();
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
      <div> ${this.autoRefresh}</div>
      <legend><a href="https://firebase.google.com/docs/reference/js/v8/firebase.auth.Auth#config">firebase.auth.Auth</a></legend>
      <label>app<firebase-app></firebase-app></label>
      <label>config<firebase-auth-config
         ></firebase-auth-config></label>
      <label>currentUser<firebase-user/></firebase-user></label>
      <label>emulatorConfig<input placeholder="N/A" readonly/></label>
      <label>languageCode<input value="${this.firebaseAuth.languageCode}" readonly/></label>
      <label>name<input value="${this.firebaseAuth.name}" readonly></label>
      <label>appVerificationDisabledForTesting
      <input value="${this.firebaseAuth.settings.appVerificationDisabledForTesting}" readonly/>
      </label>
      <label>tenantId<input value=${this.firebaseAuth.tenantId} readonly/></label>
      <label>last updated time<input value=${this.lastUpdated}/></label>
      </fieldset>
      `;
    } //render()
  } //class LitElement
);
