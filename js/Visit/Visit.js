import Button from "../Button/Button.js";
import { showMore, btnEdit, btnDelete } from "../Config/configBtn.js";
import Input from "../Input/Input.js";
import Textarea from "../Textarea/Textarea.js";
import Select from "../Select/Select.js";
import { inputGoalVisit, inputName, inputDate, inputPhoto } from "../Config/configInput.js";
import { textareaDescription } from "../Config/configTextarea.js";
import { photoUsers } from "../Config/configPhoto.js";
import { selectUrgency } from "../Config/configSelect.js";
import visitCardiologist from "../VisitCardiologist/VisitCardiologist.js";
import visitDentist from "../VisitDentist/VisitDentist.js";
import visitTherapist from "../VisitTherapist/VisitTherapist.js";
import filterForm from "../FormFilter/FormFilter.js";
import Modal from "../Modal/Modal.js";
import { editModal, deleteModal } from "../Config/configModal.js";
class Visit {
  constructor() {
    this.users = [];
  }
  render(data) {
    this.users = data;
    console.log(this.users);
    const parent = document.querySelector(".main");
    parent.innerHTML = "";
    const filter = document.getElementById("filter");
    if (!filter) {
      const form = filterForm.render();
      parent.prepend(form);
    }
    const ul = document.createElement("ul");
    ul.className = "card";
    if (!this.users.length) {
      ul.insertAdjacentHTML("beforeend", `<li class="card__blank">No items have been added ...</li>`);
      parent.append(ul);
      return parent;
    }
    this.users.forEach((user, index) => {
      ul.append(this.renderCard(user, index));
    });
    parent.append(ul);
    return parent;
  }
  renderCard({ id, name, doctor, description, img, ...rest }) {
    const li = document.createElement("li");
    li.id = id;
    li.className = "card__item";
    li.innerHTML = `<p class="card__title">Visit to ${doctor[0].toUpperCase()}${doctor.slice(1)}</p>
    <div class="card__photo"><img src=${img}></div>
    <p class="card__subtitle">Name:</p>
    <p class="card__text">${name}</p>
    <p class="card__subtitle">Doctor:</p>
    <p class="card__text">${doctor[0].toUpperCase()}${doctor.slice(1)}</p>
    <p class="card__subtitle">Description:</p>
    <p class="card__text">${description[0].toUpperCase()}${description.slice(1)}</p>`;
    const menu = document.createElement("div");
    menu.className = "card__menu";
    const editBtn = new Button(btnEdit).render(this.handlerEdit.bind(this));
    const deleteBtn = new Button(btnDelete).render(this.handlerDelete.bind(this));
    const moreShow = new Button(showMore).render(this.handlershowMore.bind(this, rest, doctor));
    menu.append(editBtn, moreShow, deleteBtn);
    li.append(menu);
    return li;
  }
  handlerEdit(e) {
    e.preventDefault();
    const parent = document.querySelector("#root");
    const id = e.target.closest("li").id;
    const finded = this.users.find((item) => item.id === +id);
    const modal = new Modal(editModal, parent).render(finded);
  }
  handlerDelete(e) {
    e.preventDefault();
    const id = e.target.closest("li").id;
    const parent = document.querySelector("#root");
    const modal = new Modal(deleteModal, parent).render(id);
  }
  handlershowMore(rest, doctor, e) {
    const li = e.target.closest("li");
    const element = li.querySelector(".card__menu");
    let parent = null;
    const item = li.querySelector(".card__info");
    if (item) {
      item.remove();
      e.target.textContent = "Show More";
      return;
    }
    if (!item) {
      parent = document.createElement("div");
      parent.className = "card__info";
      element.before(parent);
      e.target.textContent = "Hide";
    }
    if (doctor.toLowerCase() === "dentist") {
      visitDentist.renderShowMore(rest, parent);
    }
    if (doctor.toLowerCase() === "cardiologist") {
      visitCardiologist.renderShowMore(rest, parent);
    }
    if (doctor.toLowerCase() === "therapist") {
      visitTherapist.renderShowMore(rest, parent);
    }
  }
  createForm() {
    const containerInpt = document.createElement("div");
    containerInpt.className = "form__item";
    const goalVisit = new Input(inputGoalVisit).render();
    const descriptionVisit = new Textarea(textareaDescription).render();
    const urgencySelect = new Select(selectUrgency).render();
    const nameInput = new Input(inputName).render();
    const dateInput = new Input(inputDate).render();
    const data = photoUsers[this.users.length];
    const photoInput = new Input(inputPhoto).render(data.image);
    containerInpt.append(goalVisit, descriptionVisit, urgencySelect, nameInput, dateInput, photoInput);
    return containerInpt;
  }
  editForm({ goalVisit, description, urgency, name, date, img, ...rest }) {
    const containerInpt = document.createElement("div");
    containerInpt.className = "form__item";
    const goalVisitInpt = new Input(inputGoalVisit).render(goalVisit);
    const descriptionVisit = new Textarea(textareaDescription).render(description);
    const urgencySelect = new Select(selectUrgency).render(urgency);
    const nameInput = new Input(inputName).render(name);
    const dateInput = new Input(inputDate).render(date);
    const data = photoUsers[this.users.length];
    const photoInput = new Input(inputPhoto).render(img);
    containerInpt.append(goalVisitInpt, descriptionVisit, urgencySelect, nameInput, dateInput, photoInput);
    return containerInpt;
  }
}
const visit = new Visit();
export default visit;
