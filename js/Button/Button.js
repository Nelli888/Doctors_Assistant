class Button {
  constructor({ text, className, type, icon }) {
    (this.text = text), (this.className = className), (this.type = type), (this.icon = icon);
  }
  render(handleClick) {
    const button = document.createElement("button");
    button.className = this.className;
    button.innerHTML = this.text + this.icon;
    button.type = this.type;
    button.addEventListener("click", handleClick);
    return button;
  }
}
export default Button;
