import Input from "../Input/Input.js";
import { inputAge } from "../Config/configInput.js";
class VisitTherapist {
  createForm() {
    const containerInpt = document.createElement("div");
    containerInpt.className = "form__item";
    const ageInput = new Input(inputAge).render();
    containerInpt.append(ageInput);
    return containerInpt;
  }
  editForm({ age }) {
    const containerInpt = document.createElement("div");
    containerInpt.className = "form__item";
    const ageInput = new Input(inputAge).render(age);
    containerInpt.append(ageInput);
    return containerInpt;
  }
  renderShowMore({ goalVisit, date, urgency, age }, parent) {
    parent.innerHTML = `<p class="card__subtitle">Goal of the visit:</p>
    <p class="card__text">${goalVisit}</p>
    <p class="card__subtitle">Date:</p>
    <p class="card__text">${date}</p>
    <p class="card__subtitle">Urgency:</p>
    <p class="card__text">${urgency}</p>
    <p class="card__subtitle">Age:</p>
    <p class="card__text">${age}</p>`;
  }
}
const visitTherapist = new VisitTherapist();
export default visitTherapist;
