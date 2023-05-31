import Input from "../Input/Input.js";
import Textarea from "../Textarea/Textarea.js";
import { inputAge, inputWeight, inputPressure } from "../Config/configInput.js";
import { textareaDiseases } from "../Config/configTextarea.js";
class VisitCardiologist {
  createForm() {
    const containerInpt = document.createElement("div");
    containerInpt.className = "form__item";
    const ageInput = new Input(inputAge).render();
    const weightInput = new Input(inputWeight).render();
    const pressureInput = new Input(inputPressure).render();
    const diseasesTextarea = new Textarea(textareaDiseases).render();
    containerInpt.append(ageInput, weightInput, pressureInput, diseasesTextarea);
    return containerInpt;
  }
  editForm({ age, weight, pressure, diseases }) {
    const containerInpt = document.createElement("div");
    containerInpt.className = "form__item";
    const ageInput = new Input(inputAge).render(age);
    const weightInput = new Input(inputWeight).render(weight);
    const pressureInput = new Input(inputPressure).render(pressure);
    const diseasesTextarea = new Textarea(textareaDiseases).render(diseases);
    containerInpt.append(ageInput, weightInput, pressureInput, diseasesTextarea);
    return containerInpt;
  }
  renderShowMore({ goalVisit, date, urgency, pressure, weight, age, diseases }, parent) {
    parent.innerHTML = `<p class="card__subtitle">Goal of the visit:</p>
    <p class="card__text">${goalVisit}</p>
    <p class="card__subtitle">Date:</p>
    <p class="card__text">${date}</p>
    <p class="card__subtitle">Urgency:</p>
    <p class="card__text">${urgency}</p>
    <p class="card__subtitle">Age:</p>
    <p class="card__text">${age}</p>
    <p class="card__subtitle">Pressure:</p>
    <p class="card__text">${pressure}</p>
    <p class="card__subtitle">Weight:</p>
    <p class="card__text">${weight} kg</p>
    <p class="card__subtitle">Transferred Diseases:</p>
    <p class="card__text">${diseases}</p>`;
  }
}
const visitCardiologist = new VisitCardiologist();
export default visitCardiologist;
