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

    render() {
      return html`
        <fieldset>
          <legend>
            <a
              href="https://firebase.google.com/docs/reference/js/v8/firebase.UserInfo"
              >firebase.UserInfo</a
            >
          </legend>
          <label>
          </label>
        </fieldset>
      `;
    }
  } //class LitElement
);
