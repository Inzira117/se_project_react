class Api {
  constructor({ baseUrl, headers }) {
    this.baseUrl = baseUrl;
    this._headers = headers;
  }

  _checkRes(res) {
    if (res.ok) {
      return res.json();
    }
    return Promise.reject(`Error ${res.status}`);
  }

  getCards() {
    return fetch(this.baseUrl + "/items", {
      method: "GET",
      headers: this._headers,
    }).then(this._checkRes);
  }

  addItem(name, link, weather) {
    const token = localStorage.getItem("jwt");
    return fetch(this.baseUrl + "/items/", {
      method: "POST",
      headers: {
        ...this._headers,
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify({
        name,
        imageUrl: link,
        weather,
      }),
    }).then(this._checkRes);
  }

  deleteItem(id, token) {
    return fetch(this.baseUrl + "/items/" + id, {
      method: "DELETE",
      headers: {
        ...this._headers,
        Authorization: `Bearer ${token}`,
      },
    }).then(this._checkRes);
  }

  addCardLike(id, token) {
    return fetch(this.baseUrl + "/items/" + id + "/likes", {
      method: "PUT",
      headers: {
        ...this._headers,
        Authorization: `Bearer ${token}`,
      },
    }).then(this._checkRes);
  }

  removeCardLike(id, token) {
    return fetch(this.baseUrl + "/items/" + id + "/likes", {
      method: "DELETE",
      headers: {
        ...this._headers,
        Authorization: `Bearer ${token}`,
      },
    }).then(this._checkRes);
  }

  editUser(token, name, avatar) {
    return fetch(this.baseUrl + "/users/me", {
      method: "PATCH",
      headers: {
        ...this._headers,
        Authorization: `Bearer ${token}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        name,
        avatar,
      }),
    }).then(this._checkRes);
  }
}

export default Api;
