class Input {
  constructor({ type, name, placeholder, required, className }) {
    (this.type = type), (this.name = name), (this.placeholder = placeholder), (this.required = required), (this.className = className);
  }
  render(data) {
    const input = document.createElement("input");
    if (data) {
      input.value = data;
    }
    input.placeholder = this.placeholder;
    input.className = this.className;
    input.name = this.name;
    input.type = this.type;
    input.required = this.required;
    this.input = input;
    return this.input;
  }
}
export default Input;
