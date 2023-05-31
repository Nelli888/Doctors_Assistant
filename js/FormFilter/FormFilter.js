import Form from "../Form/Form.js";
class Filter {
  constructor() {
    this.filter = document.createElement("div");
    this.filter.id = "filter";
  }
  render() {
    this.filter.innerHTML = "";
    const form = new Form().renderFilter();
    this.filter.append(form);
    return this.filter;
  }
}
const filterForm = new Filter();
export default filterForm;
