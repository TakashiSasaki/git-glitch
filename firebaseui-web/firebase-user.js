import { LitElement, html, css } from "https://unpkg.com/lit@2?module";
import "./firebase-user-info.js";

class FirebaseUserElement extends LitElement {
  constructor() {
    super();
    this.lastUpdated = new Date();
    this.autoRefresh = false;
  } //constructor

  static properties = {
    firebaseUser: { type: Object },
    autoRefresh: { type: Boolean },
  };

  static get styles() {
    return css`
      fieldset {
        background-color: #ffdffd;
      }
      legend {
        font-size: 1.3em;
        text-decoration: underline;
      }
      legend span{
        font-size: 1em;
        text-decoration: none;
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

  connectedCallback() {
    super.connectedCallback();
    if (this.autoRefresh) {
      this.intervalId = setInterval(() => {
        this.firebaseUser = firebase.auth().currentUser;
      }, 5000);
    } //if
  } //connectedCallback

  disconnectedCallback() {
    clearInterval(this.intervalId);
    super.disconnectedCallback();
  } //disconnectedCallback

  render() {
    return html`<fieldset>
      <legend>firebase-user<span>(${this.autoRefresh ? "auto refresh" : ""})</span></legend>
      <label
        >displayName <input value="${this.firebaseUser.displayName}" readonly
      /></label>
      <label>email <input value="${this.firebaseUser.email}" readonly /></label>
      <label
        >emailVerified<input
          value="${this.firebaseUser.emailVerified}"
          readonly
      /></label>
      <label
        >isAnonymous<input value="${this.firebaseUser.isAnonymous}" readonly
      /></label>
      <label
        >creationTime<input
          value="${this.firebaseUser.metadata.creationTime}"
          readonly
      /></label>
      <label
        >lastSignInTime
        <input value="${this.firebaseUser.metadata.lastSignInTime}" readonly
      /></label>
      <label> multiFactor <input value="N/A" readonly/></label>
      <label
        >phoneNumber <input value="${this.firebaseUser.phoneNumber}" readonly
      /></label>
      <label
        >photoURL <input value="${this.firebaseUser.photoURL}" readonly
      /></label>
      <label
        >providerData:
        <div>
          ${this.firebaseUser.providerData.map(
            (item) => html`
          <firebase-user-info .firebaseUserInfo=${item}>
          </firease-user-info>`
          )}
        </div></label
      >
      <label
        >providerId <input value="${this.firebaseUser.providerId}" readonly
      /></label>
      <label
        >refreshToken <input value="${this.firebaseUser.refreshToken}" readonly
      /></label>
      <label
        >tenantId <input value="${this.firebaseUser.tenantId}" readonly
      /></label>
      <label>uid <input value="${this.firebaseUser.uid}" readonly /></label>
      <label>last updated <input value="${this.lastUpdated}" readonly /></label>
    </fieldset> `;
  } //render()
} //LitElement

customElements.define("firebase-user", FirebaseUserElement);
export default FirebaseUserElement;
