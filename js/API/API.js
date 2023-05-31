// Your token is: 9dea5720-cfc1-454f-aa81-f8328776d616
class API {
  constructor() {
    this.baseUrl = "https://ajax.test-danit.com/api/v2";
    this.token = this.getToken();
  }
  async getData(url) {
    const response = await fetch(`${this.baseUrl}${url}`, {
      headers: { "Content-Type": "application/json", Authorization: `Bearer ${this.token}` },
    });
    return response.json();
  }
  async createData(url, data) {
    const response = await fetch(`${this.baseUrl}${url}`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${this.token}`,
      },
      body: JSON.stringify(data),
    });
    if (response.ok) {
      return response.json();
    }
  }
  async updateData(url, id, data) {
    const response = await fetch(`${this.baseUrl}${url}/${id}`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${this.token}`,
      },
      body: JSON.stringify(data),
    });
    if (response.ok) {
      return response.json();
    }
  }
  async deleteData(url, id) {
    const response = await fetch(`${this.baseUrl}${url}/${id}`, {
      method: "DELETE",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${this.token}`,
      },
    });
    if (response.ok) {
      return response;
    }
  }
  async login(url, data) {
    const response = await fetch(`${this.baseUrl}${url}`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(data),
    });
    if (response.ok) {
      this.token = await response.text();
      localStorage.setItem("token", this.token);
      return this.token;
    }
  }
  getToken() {
    const token = localStorage.getItem("token");
    if (token) {
      return token;
    }
    return null;
  }
}
const api = new API();
export default api;
