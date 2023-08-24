import { LitElement, html, css } from "https://unpkg.com/lit@2?module";

class FirebaseUserElement extends LitElement {
  constructor() {
    super();
    this.lastUpdated = new Date();
  } //constructor

  static properties = {
    firebaseUser: { type: Object },
  };

  set firebaseConfig(newValue) {
    console.log(newValue);
    this._firebaseUser = newValue;
    this.requestUpdate();
  }

  get firebaseUser() {
    return this._firebaseUser;
  }

  static get styles() {
    return css`
      :host div {
        background-color: yellow;
        border: 1px dotted gray;
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

  get displayName() {
    return this.firebaseUser.displayName;
  }

  get email() {
    return this.firebaseUser.email;
  }

  get emailVerified() {
    return this.firebaseUser.emailVerified;
  }

  get isAnonymous() {
    return this.firebaseUser.isAnonymous;
  }

  get creationTime() {
    return this.firebaseUser.metadata.creationTime;
  }

  get lastSignInTime() {
    return this.firebaseUser.metadata.lastSignInTime;
  }

  get multiFactor() {
    return this.firebaseUser.multiFactor;
  }

  get phoneNumber() {
    return this.firebaseUser.phoneNumber;
  }

  get photoURL() {
    return this.firebaseUser.photoURL;
  }

  get providerData() {
    return this.firebaseUser.providerData;
  }

  get providerId() {
    return this.firebaseUser.providerId;
  }

  get refreshToken() {
    return this.firebaseUser.refreshToken;
  }

  get tenantId() {
    return this.firebaseUser.tenantId;
  }

  get uid() {
    return this.firebaseUser.uid;
  }

  updated(changedProperties) {
    if (!changedProperties.has("lastUpdated")) {
      this.lastUpdated = new Date();
    }
    super.updated(changedProperties);
  } //updated()

  render() {
    return html`<div>
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
      <div>
        multiFactor
        <label
          >phoneNumber <input value="${this.phoneNumber}" readonly
        /></label>
        <label>photoURL <input value="${this.photoURL}" readoly /></label>
        <div>prividerData</div>
        <label
          >refreshToken <input value="${this.refreshToken}" readoly
        /></label>
        <label>tenantId <input value="${this.tenantId}" readoly /></label>
        <label>uid <input value="${this.uid}" readoly /></label>
        <label
          >last updated <input value="${this.lastUpdated}" readonly
        /></label>
      </div>
    </div> `;
  } //render()
} //LitElement

customElements.define("firebase-config", FirebaseConfigElement);
export default FirebaseConfigElement;
