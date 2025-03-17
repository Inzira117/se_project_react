class Auth {
  constructor({ baseUrl, headers }) {
    this.baseUrl = baseUrl;
    this.headers = headers;
    this._checkResponse = this._checkResponse.bind(this);
  }

  _checkResponse(res) {
    if (res.ok) {
      return res.json();
    }

    if (res.status === 409) {
      return Promise.reject(
        "This email is already registered. Please try logging in or use a different email."
      );
    }

    return Promise.reject(`Error ${res.status}: ${res.statusText}`);
  }

  registerUser({ name, avatar, email, password }) {
    console.log("Sending registration request with:", {
      name,
      avatar,
      email,
      password: "***",
    });
    return fetch(this.baseUrl + "/signup", {
      method: "POST",
      headers: this.headers,
      body: JSON.stringify({
        name,
        avatar,
        email,
        password,
      }),
    }).then(this._checkResponse);
  }

  loginUser({ email, password }) {
    return fetch(this.baseUrl + "/signin", {
      method: "POST",
      headers: this.headers,
      body: JSON.stringify({
        email,
        password,
      }),
    }).then(this._checkResponse);
  }

  verifyToken(token) {
    return fetch(this.baseUrl + "/users/me", {
      method: "GET",
      headers: {
        ...this.headers,
        Authorization: `Bearer ${token}`,
      },
    }).then(this._checkResponse);
  }
}

export default Auth;
