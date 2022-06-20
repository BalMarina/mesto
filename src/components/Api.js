export default class Api {
  constructor(url) {
    this._url = url,
      this._headers = {
        'Content-type': 'application/json',
        'authorization': 'f36e7156-517e-4278-9213-56884bb1e4f8'
      }
  }

  getUser() {
    return fetch(`${this._url}/users/me`, {
      headers: this._headers
    })
      .then(res => {
        if (res.ok) {
          return res.json()
        }
        return Promise.reject(`AAAAAAAAAAAAAAAAAAAAAAAAAAAAAAA: ${res.status}`)
      });
  }

  addUser(userData) {
    return fetch(`${this._url}/users/me`, {
      headers: this._headers,
      method: 'PATCH',
      body: JSON.stringify(userData)
    })
      .then(res => {
        if (res.ok) {
          return res.json()
        }
        return Promise.reject(`AAAAAAAAAAAAAAAAAAAAAAAAAAAAAAA: ${res.status}`)
      })
  }

  getCards() {
    return fetch(`${this._url}/cards`, {
      headers: this._headers
    })
      .then(res => {
        if (res.ok) {
          return res.json()
        }
        return Promise.reject(`AAAAAAAAAAAAAAAAAAAAAAAAAAAAAAA: ${res.status}`)
      })
  }

  addCard({ name, link, ...rest }) {
    return fetch(`${this._url}/cards`, {
      headers: this._headers,
      method: 'POST',
      body: JSON.stringify({ name: name, link: link, ...rest })
    })
      .then(res => {
        if (res.ok) {
          return res.json()
        }
        return Promise.reject(`AAAAAAAAAAAAAAAAAAAAAAAAAAAAAAA: ${res.status}`)
      })
  }

  likeCard(cardId) {
    return fetch(`${this._url}/cards/likes/${cardId}`, {
      method: 'PUT',
      headers: this._headers,
    }
    )
      .then(res => {
        if (res.ok) {
          return res.json();
        }
        return Promise.reject(`AAAAAAAAAAAAAAAAAAAAAAAAAAAAAAA: ${res.status}`);
      })
  }

  dislikeCard(cardId) {
    return fetch(`${this._url}/cards/likes/${cardId}`, {
      method: 'DELETE',
      headers: this._headers,
    })
      .then(res => {
        if (res.ok) {
          return res.json();
        }
        return Promise.reject(`AAAAAAAAAAAAAAAAAAAAAAAAAAAAAAA: ${res.status}`);
      })
  }


  deleteCard(cardId) {
    return fetch(`${this._url}/cards/${cardId}`, {
      method: 'DELETE',
      headers: this._headers,
    })
      .then(res => {
        if (res.ok) {
          return res.json();
        }
        return Promise.reject(`AAAAAAAAAAAAAAAAAAAAAAAAAAAAAAA: ${res.status}`);
      })
  }

  changeAvatar(data) {
    return fetch(`${this._url}/users/me/avatar`, {
      method: 'PATCH',
      headers: this._headers,
      body: JSON.stringify(data)
    })
      .then(res => {
        if (res.ok) {
          return res.json();
        }
        return Promise.reject(`AAAAAAAAAAAAAAAAAAAAAAAAAAAAAAA: ${res.status}`);
      })
  }

}
