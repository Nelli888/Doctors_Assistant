import Input from "../Input/Input.js";
import Button from "../Button/Button.js";
import { inputEmail, inputPassword, inputSearch } from "../Config/configInput.js";
import { btnSubmit, btnCancel, btnCreate, btnSearch, btnEditCreate, deleteButton, btnNo } from "../Config/configBtn.js";
import api from "../API/API.js";
import visit from "../Visit/Visit.js";
import visitCardiologist from "../VisitCardiologist/VisitCardiologist.js";
import visitDentist from "../VisitDentist/VisitDentist.js";
import visitTherapist from "../VisitTherapist/VisitTherapist.js";
import header from "../Header/Header.js";
import Select from "../Select/Select.js";
import { selectDoctor, selectStatus, selectUrgency } from "../Config/configSelect.js";
import { createFormData, createFormDataUpperCase } from "../Utils/utils.js";

class Form {
  constructor(closeModal) {
    this.closeModal = closeModal;
    this.form = document.createElement("form");
  }
  renderFilter() {
    this.form.className = "form-filter";
    const containerLow = document.createElement("div");
    containerLow.className = "form-filter__item";
    const urgencySelect = new Select(selectUrgency).render();
    const statusSelect = new Select(selectStatus).render();
    containerLow.append(urgencySelect, statusSelect);
    const container = document.createElement("div");
    container.className = "form-filter__item";
    const searchInput = new Input(inputSearch).render();
    const searchBtn = new Button(btnSearch).render();
    container.append(searchInput, searchBtn);
    this.form.append(container, containerLow);
    this.form.addEventListener("submit", this.handlerFilter.bind(this));
    return this.form;
  }
  renderEdit(data) {
    const select = new Select(selectDoctor).render(data.doctor);
    const newForm = visit.editForm(data);
    this.form.append(select, newForm);
    this.form.className = "form";
    if (data.doctor === "therapist") {
      const { age } = data;
      const editVisit = visitTherapist.editForm({ age });
      this.form.append(editVisit);
    }
    if (data.doctor === "cardiologist") {
      const { age, weight, pressure, diseases } = data;
      const editVisit = visitCardiologist.editForm({ age, weight, pressure, diseases });
      this.form.append(editVisit);
    }
    if (data.doctor === "dentist") {
      const { lastVisit } = data;
      const editVisit = visitDentist.editForm({ lastVisit });
      this.form.append(editVisit);
    }
    const btnEdit = new Button(btnEditCreate).render();
    const cancelBtn = new Button(btnCancel).render(this.closeModal);
    const btnWrapper = document.createElement("div");
    btnWrapper.className = "btn__wrapper";
    btnWrapper.append(btnEdit, cancelBtn);
    this.form.append(btnWrapper);
    this.form.addEventListener("submit", this.handlerEdit.bind(this, data.id));
    return this.form;
  }
  async handlerFilter(e) {
    e.preventDefault();
    const selects = this.form.querySelectorAll(".select");
    const inputs = this.form.querySelectorAll(".inpt");
    const formDataSelect = createFormData(selects);
    const formDataInput = createFormData(inputs);
    const formData = { ...formDataSelect, ...formDataInput };
    try {
      const users = await api.getData("/cards");
      if (formData.search && formData.urgency === "Urgency" && formData.status === "Status") {
        const filtered = users.filter((item) => {
          if (item.doctor.toLowerCase().includes(formData.search.toLowerCase())) {
            return item;
          }
          if (item.description.toLowerCase().includes(formData.search.toLowerCase())) {
            return item;
          }
          if (item.name.toLowerCase().includes(formData.search.toLowerCase())) {
            return item;
          }
          if (item.goalVisit.toLowerCase().includes(formData.search.toLowerCase())) {
            return item;
          }
        });
        visit.render(filtered);
      }
      if (!formData.search && formData.urgency === "Urgency" && (formData.status === "done" || formData.status === "open")) {
        const filtered = users.filter((item) => {
          const today = new Date();
          const value = item.date.split(".").reverse().join(".");
          const dateVisit = new Date(value);
          if (formData.status === "done" && today > dateVisit) {
            return item;
          }
          if (formData.status === "open" && today < dateVisit) {
            return item;
          }
        });
        visit.render(filtered);
      }
      if (formData.search && formData.urgency === "Urgency" && (formData.status === "done" || formData.status === "open")) {
        const filtered = users.filter((item) => {
          const today = new Date();
          const value = item.date.split(".").reverse().join(".");
          const dateVisit = new Date(value);
          if (formData.status === "done" && today > dateVisit && item.doctor.toLowerCase().includes(formData.search.toLowerCase())) {
            return item;
          }
          if (formData.status === "open" && today < dateVisit && item.doctor.toLowerCase().includes(formData.search.toLowerCase())) {
            return item;
          }
        });
        visit.render(filtered);
      }
      if (
        !formData.search &&
        formData.status === "Status" &&
        (formData.urgency === "Normal" || formData.urgency === "High" || formData.urgency === "Low")
      ) {
        if (formData.urgency === "Normal") {
          const filtered = users.filter((item) => item.urgency === "Normal");
          this.filtered = filtered;
        }
        if (formData.urgency === "High") {
          const filtered = users.filter((item) => item.urgency === "High");
          this.filtered = filtered;
        }
        if (formData.urgency === "Low") {
          const filtered = users.filter((item) => item.urgency === "Low");
          this.filtered = filtered;
        }
        visit.render(this.filtered);
      }
      if (
        formData.search &&
        formData.status === "Status" &&
        (formData.urgency === "Normal" || formData.urgency === "High" || formData.urgency === "Low")
      ) {
        const filter = users.filter((item) => item.doctor.toLowerCase().includes(formData.search.toLowerCase()));
        if (formData.urgency === "Normal") {
          const filtered = filter.filter((item) => item.urgency === "Normal");
          this.filtered = filtered;
        }
        if (formData.urgency === "High") {
          const filtered = filter.filter((item) => item.urgency === "High");
          this.filtered = filtered;
        }
        if (formData.urgency === "Low") {
          const filtered = filter.filter((item) => item.urgency === "Low");
          this.filtered = filtered;
        }
        visit.render(this.filtered);
      }
      if (
        formData.search &&
        (formData.urgency === "Normal" || formData.urgency === "High" || formData.urgency === "Low") &&
        (formData.status === "done" || formData.status === "open")
      ) {
        const filterDoctor = users.filter((item) => item.doctor.toLowerCase().includes(formData.search.toLowerCase()));
        const filterDate = filterDoctor.filter((item) => {
          const today = new Date();
          const value = item.date.split(".").reverse().join(".");
          const dateVisit = new Date(value);
          if (formData.status === "done" && today > dateVisit) {
            return item;
          }
          if (formData.status === "open" && today < dateVisit) {
            return item;
          }
        });
        if (formData.urgency === "Normal") {
          const filtered = filterDate.filter((item) => item.urgency === "Normal");
          this.filtered = filtered;
        }
        if (formData.urgency === "High") {
          const filtered = filterDate.filter((item) => item.urgency === "High");
          this.filtered = filtered;
        }
        if (formData.urgency === "Low") {
          const filtered = filterDate.filter((item) => item.urgency === "Low");
          this.filtered = filtered;
        }
        visit.render(this.filtered);
      }
      if (
        !formData.search &&
        (formData.urgency === "Normal" || formData.urgency === "High" || formData.urgency === "Low") &&
        (formData.status === "done" || formData.status === "open")
      ) {
        if (formData.urgency === "Normal") {
          const filtered = users.filter((item) => item.urgency === "Normal");
          this.filtered = filtered;
        }
        if (formData.urgency === "High") {
          const filtered = users.filter((item) => item.urgency === "High");
          this.filtered = filtered;
        }
        if (formData.urgency === "Low") {
          const filtered = users.filter((item) => item.urgency === "Low");
          this.filtered = filtered;
        }
        const filterResult = this.filtered.filter((item) => {
          const today = new Date();
          const value = item.date.split(".").reverse().join(".");
          const dateVisit = new Date(value);
          if (formData.status === "done" && today > dateVisit) {
            return item;
          }
          if (formData.status === "open" && today < dateVisit) {
            return item;
          }
        });
        visit.render(filterResult);
      }
    } catch (error) {
      console.error(error);
    }
  }
  renderLogin() {
    const inEmail = new Input(inputEmail).render();
    inEmail.id = "email";
    const wrapperEmail = document.createElement("label");
    wrapperEmail.htmlFor = "email";
    wrapperEmail.className = "inpt__wrapper";
    wrapperEmail.append(inEmail);
    const inPassword = new Input(inputPassword).render();
    inPassword.id = "password";
    const wrapperPassword = document.createElement("label");
    wrapperPassword.htmlFor = "password";
    wrapperPassword.className = "inpt__wrapper";
    wrapperPassword.append(inPassword);
    const wrapperBtn = document.createElement("div");
    wrapperBtn.className = "btn__wrapper";
    const submitBtn = new Button(btnSubmit).render();
    this.form.addEventListener("submit", this.handlerSubmit.bind(this));
    const cancelBtn = new Button(btnCancel).render(this.closeModal);
    wrapperBtn.append(submitBtn, cancelBtn);
    this.form.append(wrapperEmail, wrapperPassword, wrapperBtn);
    this.form.className = "form-login";
    return this.form;
  }
  renderCreateVisit() {
    const select = new Select(selectDoctor).render();
    select.addEventListener("change", this.handlerOnchange.bind(this));
    this.form.append(select);
    this.form.className = "form";
    return this.form;
  }
  renderDelete(id) {
    const text = document.createElement("div");
    text.className = "form__text";
    text.innerHTML = "Are you sure? Do you want to delete this card?";
    const noButton = new Button(btnNo).render(this.closeModal);
    const deleteBtn = new Button(deleteButton).render(this.handlerDelete.bind(this, id));
    this.form.append(text, noButton, deleteBtn);
    this.form.className = "form";
    return this.form;
  }
  async handlerDelete(id) {
    try {
      const li = document.getElementById(id);
      // const deleteData = await api.deleteData("/cards", li.id);
      // if (!deleteData) {
      //   throw new Error("Card not found");
      // }
      // if (deleteData.ok) {
      //   li.remove();
      // }
      li.remove();
      this.closeModal();
    } catch (error) {
      console.error(error);
    }
  }
  handlerOnchange(e) {
    const formContent = this.form.querySelector(".form__content");
    if (formContent) {
      formContent.remove();
    }
    const wrapper = document.createElement("div");
    wrapper.className = "form__content";
    const visitMain = visit.createForm();
    const wrapperBtn = document.createElement("div");
    wrapperBtn.className = "btn__wrapper";
    const submitBtn = new Button(btnCreate).render();
    this.form.addEventListener("submit", this.handlerSubmitCreate.bind(this));
    const cancelBtn = new Button(btnCancel).render(this.closeModal);
    wrapperBtn.append(submitBtn, cancelBtn);
    if (e.target.value === "cardiologist") {
      const visitCardio = visitCardiologist.createForm();
      wrapper.append(visitMain, visitCardio, wrapperBtn);
    }
    if (e.target.value === "dentist") {
      const dentistVisit = visitDentist.createForm();
      wrapper.append(visitMain, dentistVisit, wrapperBtn);
    }
    if (e.target.value === "therapist") {
      const therapistVisit = visitTherapist.createForm();
      wrapper.append(visitMain, therapistVisit, wrapperBtn);
    }
    this.form.append(wrapper);
  }
  async handlerSubmit(e) {
    e.preventDefault();
    const inputs = this.form.querySelectorAll(".inpt");
    const formData = createFormData(inputs);
    try {
      const res = await api.login("/cards/login", formData);
      if (!res) {
        throw new Error("Invalid");
      }
      const container = document.querySelector(".header__content");
      header.renderCreate(container);
      this.closeModal();
    } catch (error) {
      console.error(error);
      this.renderError(error.message);
    }
  }
  renderError(error) {
    const form = document.querySelector(".form-login");
    if (form.classList.contains("active")) {
      const errors = form.querySelectorAll(".error");
      errors.forEach((item) => item.remove());
    }
    if (!form.classList.contains("active")) {
      form.classList.add("active");
    }
    const email = form.querySelector("#email");
    const password = form.querySelector("#password");
    password.insertAdjacentHTML("afterend", `<span class="error">${error} Password</span>`);
    email.insertAdjacentHTML("afterend", `<span class="error">${error} Email</span>`);
  }
  async handlerSubmitCreate(e) {
    e.preventDefault();
    const formData = this.createData();
    const card = await api.createData("/cards", formData);
    const newCard = visit.renderCard(card);
    const parent = document.querySelector(".card");
    parent.append(newCard);
    this.closeModal();
  }
  createData() {
    const inputs = this.form.querySelectorAll("input");
    const formData = createFormDataUpperCase(inputs);
    const selects = this.form.querySelectorAll("select");
    const formDataSelect = createFormData(selects);
    const textareas = this.form.querySelectorAll("textarea");
    const formDataTextareas = createFormDataUpperCase(textareas);
    return { ...formData, ...formDataSelect, ...formDataTextareas };
  }
  async handlerEdit(id, e) {
    e.preventDefault();
    const formData = this.createData();
    try {
      const card = await api.updateData("/cards", id, formData);
      const li = document.getElementById(id);
      const updatedLi = visit.renderCard(card);
      const ul = li.closest("ul");
      const replacedNode = ul.replaceChild(updatedLi, li);
      this.closeModal();
    } catch (error) {
      console.error(error);
    }
  }
}
export default Form;
