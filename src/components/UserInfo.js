// import { profileNameEl, profileDescriptionEl, } from './index.js'

export default class UserInfo {
  constructor(username, description) {
    this._name = document.querySelector(username)
    this._description = document.querySelector(description)
  }

  getUserInfo() {
    return {
      username: this._name.textContent,
      description: this._description.textContent
    }
  }

  setUserInfo({ username, description }) {
    this._name.textContent = username
    this._description.textContent = description

    // this._generate()
  }

  //   _generate() {
  //     profileNameEl.textContent = this._name
  //     profileDescriptionEl.textContent = this._description
  //   }
}
