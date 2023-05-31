export const selectDoctor = {
  name: "doctor",
  options: ["", "cardiologist", "dentist", "therapist"],
  text: ["Doctor", "Cardiologist", "Dentist", "Therapist"],
  required: true,
  className: "select",
};
export const selectUrgency = {
  name: "urgency",
  options: ["", "Low", "Normal", "High"],
  text: ["Urgency", "Low", "Normal", "High"],
  required: false,
  className: "select",
};
export const selectStatus = {
  name: "status",
  options: ["", "open", "done"],
  text: ["Status", "Open", "Done"],
  required: false,
  className: "select",
};
