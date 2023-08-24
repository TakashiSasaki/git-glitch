import { LitElement, html, css } from "https://unpkg.com/lit@2?module";

class FirebaseUserElement extends LitElement {
  constructor() {
    super();
    this.lastUpdated = new Date();
  } //constructor

  static properties = {
    firebaseUser: { type: Object },
  };

  set firebaseUser(newValue) {
    console.log(newValue);
    this._firebaseUser = newValue;
    this.requestUpdate();
  }

  get firebaseUser() {
    return this._firebaseUser;
  }

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

  get displayName() {
    console.log(this.firebaseUser);
    return this._firebaseUser.displayName;
  }

  get email() {
    return this._firebaseUser.email;
  }

  get emailVerified() {
    return this._firebaseUser.emailVerified;
  }

  get isAnonymous() {
    return this._firebaseUser.isAnonymous;
  }

  get creationTime() {
    return this._firebaseUser.metadata.creationTime;
  }

  get lastSignInTime() {
    return this._firebaseUser.metadata.lastSignInTime;
  }

  get multiFactor() {
    return this._firebaseUser.multiFactor;
  }

  get phoneNumber() {
    return this._firebaseUser.phoneNumber;
  }

  get photoURL() {
    return this._firebaseUser.photoURL;
  }

  get providerData() {
    return this._firebaseUser.providerData;
  }

  get providerId() {
    return this._firebaseUser.providerId;
  }

  get refreshToken() {
    return this._firebaseUser.refreshToken;
  }

  get tenantId() {
    return this._firebaseUser.tenantId;
  }

  get uid() {
    return this._firebaseUser.uid;
  }

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
