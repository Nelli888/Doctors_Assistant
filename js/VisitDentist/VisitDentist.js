import Input from "../Input/Input.js";
import { inputLastVisit } from "../Config/configInput.js";
class VisitDentist {
  createForm() {
    const containerInpt = document.createElement("div");
    containerInpt.className = "form__item";
    const lastVisitInput = new Input(inputLastVisit).render();
    containerInpt.append(lastVisitInput);
    return containerInpt;
  }
  editForm({ lastVisit }) {
    const containerInpt = document.createElement("div");
    containerInpt.className = "form__item";
    const lastVisitInput = new Input(inputLastVisit).render(lastVisit);
    containerInpt.append(lastVisitInput);
    return containerInpt;
  }
  renderShowMore({ goalVisit, date, urgency, lastVisit }, parent) {
    parent.innerHTML = `<p class="card__subtitle">Goal of the visit:</p>
    <p class="card__text">${goalVisit}</p>
    <p class="card__subtitle">Date:</p>
    <p class="card__text">${date}</p>
    <p class="card__subtitle">Urgency:</p>
    <p class="card__text">${urgency}</p>
    <p class="card__subtitle">Last Visit:</p>
    <p class="card__text">${lastVisit}</p>`;
  }
}
const visitDentist = new VisitDentist();
export default visitDentist;
