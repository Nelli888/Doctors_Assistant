class Select {
  constructor({ name, options, text, required, className }) {
    (this.name = name), (this.options = options), (this.text = text), (this.required = required), (this.className = className);
  }
  render(data) {
    const select = document.createElement("select");
    select.className = this.className;
    select.name = this.name;
    select.required = this.required;
    const wrapperSelect = document.createElement("label");
    wrapperSelect.htmlFor = "select";
    wrapperSelect.className = "select__wrapper";
    select.insertAdjacentHTML(
      "beforeend",
      `${this.text
        .map((item, index) => {
          if (!index && !data) {
            return `<option disabled selected>${item}</option>`;
          }
          if (data && data.toLowerCase() === item.toLowerCase()) {
            return `<option selected value=${this.options[index]}>${item}</option>`;
          }
          return `<option value=${this.options[index]}>${item}</option>`;
        })
        .join("")}`
    );
    wrapperSelect.append(select);
    this.wrapperSelect = wrapperSelect;
    return this.wrapperSelect;
  }
}
export default Select;
