import Button from "../Button/Button.js";
import { btnLogin, visitCreate } from "../Config/configBtn.js";
import Modal from "../Modal/Modal.js";
import { loginIn, visitModal } from "../Config/configModal.js";
import api from "../API/API.js";
import visit from "../Visit/Visit.js";

class Header {
  constructor() {
    this.header = document.createElement("header");
  }
  render(parent) {
    this.header.className = "header";
    parent.append(this.header);
    const container = document.createElement("div");
    container.className = "header__content";
    this.header.append(container);
    const logo = document.createElement("div");
    logo.className = "header__logo";
    logo.innerHTML = '<img src="./img/logo.png" alt="logo">';
    container.append(logo);
    if (api.token) {
      this.renderCreate(container);
    }
    if (!api.token) {
      this.renderLogin(container);
    }
  }
  handlerLogin(e) {
    e.preventDefault();
    const parent = document.getElementById("root");
    const modal = new Modal(loginIn, parent).render();
  }
  renderLogin(container) {
    const buttonLogIn = new Button(btnLogin).render(this.handlerLogin);
    buttonLogIn.id = "buttonLogIn";
    container.append(buttonLogIn);
  }
  renderCreate(container) {
    const buttonLogin = document.getElementById("buttonLogIn");
    if (buttonLogin) {
      buttonLogin.remove();
    }
    const createVisit = new Button(visitCreate).render(this.handlerVisit);
    container.append(createVisit);
    try {
      const res = api.getData("/cards");
      if (!res) {
        throw new Error("");
      }
      res.then((data) => visit.render(data));
    } catch (error) {
      console.error(error);
    }
    return;
  }
  handlerVisit(e) {
    e.preventDefault();
    const parent = document.getElementById("root");
    const modal = new Modal(visitModal, parent).render();
  }
}
const header = new Header();
export default header;
