class Footer {
  constructor() {
    this.footer = document.createElement("footer");
  }
  render(parent) {
    this.footer.className = "footer";
    const container = document.createElement("div");
    container.className = "footer__content";
    container.innerHTML = `<h6 class="footer__title">Doctors  Digital  Assistant</h6>
    <p class="footer__text">Here you can create cards of patients visits to different doctors. You can add new visits, edit and update, delete if necessary, use the Search.</p>
    <div class="footer__item">
    <p class="footer__text">FOR ENTRY :</p>
    <p class="footer__text">Click: <span>Log In</span></p>
    <p class="footer__text">Click: <span>Demo User</span></p>
    </div>
    <p class="footer__text">For security purposes, the deletion of cards function is currently working as a simulation!</p>`;
    this.footer.append(container);
    parent.append(this.footer);
  }
}
const footer = new Footer();
export default footer;
