import { LitElement, html, css } from "https://unpkg.com/lit@2?module";

class FirebaseUserElement extends LitElement {
  constructor() {
    super();
    console.log("FirebaseUserElement constructor");
    this.lastUpdated = new Date();
  } //constructor

  static properties = {
    firebaseUser: { type: Object },
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
    return html`<fieldset>
      <legend>firebase-user</legend>
      <label>displayName <input value="${this.displayName}" readonly /></label>
      <label>email <input value="${this.email}" readonly /></label>
      <label
        >emailVerified<input value="${this.emailVerified}" readonly
      /></label>
      <label>isAnonymous<input value="${this.isAnonymous}" readonly /></label>
      <label>creationTime<input value="${this.creationTime}" readonly /></label>
      <label
        >lastSignInTime <input value="${this.lastSignInTime}" readonly
      /></label>
      <label> multiFactor </label>
      <label>phoneNumber <input value="${this.phoneNumber}" readonly /></label>
      <label>photoURL <input value="${this.photoURL}" readoly /></label>
      <div>prividerData</div>
      <label>refreshToken <input value="${this.refreshToken}" readoly /></label>
      <label>tenantId <input value="${this.tenantId}" readoly /></label>
      <label>uid <input value="${this.uid}" readoly /></label>
      <label>last updated <input value="${this.lastUpdated}" readonly /></label>
    </fieldset> `;
  } //render()
} //LitElement

customElements.define("firebase-user", FirebaseUserElement);
export default FirebaseUserElement;
