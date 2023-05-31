class Textarea {
  constructor({ name, placeholder, required, className }) {
    (this.name = name), (this.placeholder = placeholder), (this.required = required), (this.className = className);
  }
  render(data) {
    const textarea = document.createElement("textarea");
    if (data) {
      textarea.value = data;
    }
    textarea.placeholder = this.placeholder;
    textarea.className = this.className;
    textarea.name = this.name;
    textarea.required = this.required;
    this.textarea = textarea;
    return this.textarea;
  }
}
export default Textarea;
