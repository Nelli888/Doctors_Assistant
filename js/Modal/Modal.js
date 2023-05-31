import Form from "../Form/Form.js";
import Button from "../Button/Button.js";
import { demoUser } from "../Config/configBtn.js";
class Modal {
  constructor({ text, className, id }, parent) {
    (this.text = text), (this.className = className), (this.id = id), (this.parent = parent);
    this.demouser = { email: "letostephanie8@gmail.com", password: "09052023" };
  }
  render(data) {
    this.parent.insertAdjacentHTML("beforeend", this.text);
    const close = document.querySelector(".close");
    close.addEventListener("click", this.closeModal.bind(this));
    const modalContent = document.querySelector(".modal__content");
    if (this.id === "loginIn") {
      this.renderLoginModal(modalContent);
    }
    if (this.id === "visitModal") {
      this.renderVisitModal(modalContent);
    }
    if (this.id === "editModal") {
      this.renderEditModal(modalContent, data);
    }
    if (this.id === "deleteModal") {
      this.renderDeleteModal(modalContent, data);
    }
  }
  renderLoginModal(modalContent) {
    const form = new Form(this.closeModal.bind(this)).renderLogin();
    const demoBtn = new Button(demoUser).render(this.handlerDemoUser.bind(this));
    modalContent.append(form, demoBtn);
  }
  renderVisitModal(modalContent) {
    const form = new Form(this.closeModal.bind(this)).renderCreateVisit();
    modalContent.append(form);
  }
  renderEditModal(modalContent, data) {
    const form = new Form(this.closeModal.bind(this)).renderEdit(data);
    modalContent.append(form);
  }
  closeModal() {
    document.querySelector(`.${this.className}`).remove();
  }
  renderDeleteModal(modalContent, id) {
    const form = new Form(this.closeModal.bind(this)).renderDelete(id);
    modalContent.append(form);
  }
  handlerDemoUser(e) {
    const parent = e.target.closest("div");
    const form = parent.querySelector(".form-login");
    const inputs = form.querySelectorAll(".inpt");
    inputs.forEach((input) => {
      input.value = this.demouser[input.name];
    });
    const errors = form.querySelectorAll(".error");
    errors.forEach((item) => item.remove());
  }
}
export default Modal;
