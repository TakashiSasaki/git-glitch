import { LitElement, html, css } from "https://unpkg.com/lit@2?module";

customElements.define(
  "firebase-user-info",
  "firebase-auth",
  class extends LitElement {
    constructor() {
      super();
    }

    static properties = {
      userInfo: { type: Object },
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
    
    set firebaseUserInfo

    render() {
      return html`
        <fieldset>
          <legend>
            <a
              href="https://firebase.google.com/docs/reference/js/v8/firebase.UserInfo"
              >firebase.UserInfo</a
            >
          </legend>
          <label>displayName<input value="${this.displayName}" readonly/></label>
          <label>email<input value="${this.email}" readonly/></label>
          <label>phoneNumber<input value="${this.phoneNumber}" readonly/></label>
          <label>photoURL<input value="${this.photoURL}" readonly/></label>
          <label>providerId<input value="${this.providerId}" readonly/></label>
          <label>uid<input value="${this.uid}" readonly/></label>
          </label>
        </fieldset>
      `;
    }
  } //class LitElement
);

customElements.define("firebase-user-info-array", class extends LitElement{
  
  
  render() {
  }
}
