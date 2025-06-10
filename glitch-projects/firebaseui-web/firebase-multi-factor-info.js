import { LitElement, html, css } from "https://unpkg.com/lit@2?module";

class FirebaseMultiFactorInfoElement extends LitElement {
  constructor() {
    super();
    this.lastUpdated = new Date();
  }

  updated(changedProperties) {
    if (!changedProperties.has("lastUpdated")) {
      this.lastUpdated = new Date();
    }
    super.updated(changedProperties);
  } //updated()

  static properties = {
    multiFactorInfo: {
      type: Object,
    },
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

  render() {
    return html`
      <fieldset>
        <legend>firebase.auth.MultiFactorInfo</legend>
        <label
          >displayName:
          <input value="${this.multiFactorInfo.displayName}" readonly />
        </label>
        <label
          >enrollmentTime:
          <input value="${this.multiFactorInfo.enrollmentTime}" readonly />
        </label>
        <label
          >factorId:<input value="${this.multiFactorInfo.factorId}" readonly
        /></label>
        <label
          >uid:<input value="${this.multiFactorInfo.uid}" readonly
        /></label>
        <label
          >last updated:<input
            value="${this.multiFactorInfo.lastUpdated}"
            readonly
        /></label>
      </fieldset>
    `;
  }
} //class FirebaseMultiFactorInfoElement
