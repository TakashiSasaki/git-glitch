import { LitElement, html, css } from "https://unpkg.com/lit@2?module";

class FirebaseOptionsElement extends LitElement {
  constructor() {
    super();
  } //constructor

  static properties = {
    firebaseOptions: { type: Object },
  };

  static get styles() {
    return css`
      :host div {
        background-color: yellow;
      }
      label {
        display: block;
      }
    `;
  } //styles()

  get apiKey() {
    return firebaseOptions.apiKey;
  }

  get appId() {
    return firebaseOptions.appId;
  }

  get authDomain() {
    return firebaseOptions.authDomain;
  }

  get databaseURL() {
    return firebaseOptions.databaseURL;
  }

  get measurementId() {
    return firebaseOptions.measurementId;
  }

  get messagingSenderId() {
    return firebaseOptions.messagingSenderId;
  }

  get projectId() {
    return firebaseOptions.projectId;
  }

  get storageBucket() {
    return firebaseOptions.storageBucket;
  }

  render() {
    return html`<div>
      <label>apiKey<input value="${this.apiKey}"</label>
      <label>appId<input value="${this.appId}" /></label>
      <label>authDomain<input value="${this.authDomain}" /></label>
      <label>databaseURL<input value="${this.databaseURL}" /></label>
      <label>measurementId<input value="${this.measurementId}" /></label>
      <label
        >messagingSenderId<input value="${this.messagingSenderId}"
      /></label>
      <label>projectId<input value="${this.projectId}" /></label>
      <label>storageBucket<input value="${this.storageBucket}" /></label>
    </div> `;
  } //render()
} //LitElement

customElements.define( "firebase-options", FirebaseOptionsElement);
export FirebaseOptionsElement;
