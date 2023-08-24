import { LitElement, html, css } from "https://unpkg.com/lit@2?module";

customElements.define(
  "firebase-user-info",
  class extends LitElement {
    constructor() {
      super();
    }

    static properties = {
      firebaseUserInfo: { type: Object },
    }; //properties

    static styles = css`
      legend {
        margin: inherit;
        margin-left: 0.5em;
        font-size: 1.3em;
        text-decoration: underline;
      }

      fieldset {
        background-color: #dfdfff;
      }
      label {
        display: block;
      }
      input {
        margin-left: 1em;
        min-width: 32em;
      }
    `;

    set firebaseUserInfo(newValue) {
      this._firebaseUserInfo = newValue;
      this.requestUpdate();
    } //init

    get firebaseUserInfo() {
      return this._firebaseUserInfo;
    }

    render() {
      return html`
        <fieldset>
          <legend>
            <a
              href="https://firebase.google.com/docs/reference/js/v8/firebase.UserInfo"
              >firebase.UserInfo</a
            >
          </legend>
          <label>displayName<input value="${this.firebaseUserInfo.displayName}" readonly/></label>
          <label>email<input value="${this.firebaseUserInfo.email}" readonly/></label>
          <label>phoneNumber<input value="${this.firebaseUserInfo.phoneNumber}" readonly/></label>
          <label>photoURL<input value="${this.firebaseUserInfo.photoURL}" readonly/></label>
          <label>providerId<input value="${this.firebaseUserInfo.providerId}" readonly/></label>
          <label>uid<input value="${this.firebaseUserInfo.uid}" readonly/></label>
          </label>
        </fieldset>
      `;
    }
  } //class LitElement
);
