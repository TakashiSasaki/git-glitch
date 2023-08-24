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
  
  get displayName(){
    return this._multiFactorInfo.displayName;
  }
  
  get enrollmentTime(){
    return this._multiFactorInfo.enrollmentTime;
  }

  render() {
    return html`
      <fieldset>
        <legend>firebase.auth.MultiFactorInfo</legend>
        <label
          >displayName
          <input value="${this.displayName}" />
        </label>
        <label
          >enrollmentTime
          <input value="${this.enrollmentTime}" />
        </label>
        <label>factorId <input value="${this.factorId}" /></label>
        <label>uid <input value="${this.uid}" /></label>
        <label>last updated time <input value="${this.lastUpdated}" /></label>
      </fieldset>
    `;
  }
} //class FirebaseMultiFactorInfoElement
