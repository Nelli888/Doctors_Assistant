import header from "./Header/Header.js";
import main from "./Main/Main.js";
import footer from "./Footer/Footer.js";

function render() {
  const parent = document.querySelector(".body");
  header.render(parent);
  main.render(parent);
  footer.render(parent);
}
render();
