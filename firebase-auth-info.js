import { LitElement, html, css } from "https://unpkg.com/lit@2?module";

customElements.define(
  "firebase-auth-info",

  class extends LitElement {
    constructor() {
      super();
    }

    static get styles() {
      return css`
        :host div {
          background-color: yellow;
        }
      `;
    }

    get app() {
      return firebase.auth().app;
    }
    
    get appName(){
      return this.app().name;
    }
    
    get config(){
      return firebase.auth().cofnig;
    }
    
    get currentUser(){
      return firebase.auth().currentUser;
    }
    
    
    get languageCode(){
      return firebase.auth().languageCode;
    }
    
    get name(){
      return firebase.auth().name;
    }
    
    get settings(){
      return firebase.auth().settings;
    }
    
    get tenantId(){
      return firebase.auth().tenantId;
    }
    
    

    connectedCallback() {
      super.connectedCallback();
      // インターバルを設定
      this.intervalId = setInterval(() => {
        this.data = "Updated data"; // 必要なデータを更新
        this.requestUpdate(); // 必要に応じてコンポーネントを更新
      }, 1000); // 1秒ごとに更新
    }

    disconnectedCallback() {
      super.disconnectedCallback();
      // インターバルをクリア
      clearInterval(this.intervalId);
    }

    static get properties() {
      return {
        greeting: { type: String },
      };
    }

    attributeChangedCallback(name, oldValue, newValue) {
      console.log(`${name} changed from ${oldValue} to ${newValue}`);
      this.greeting = newValue;
    }

    render() {
      return html`<div>${this.greeting} hoge</div>`;
    }
  }
);
