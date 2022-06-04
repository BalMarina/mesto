import { profileNameEl, profileDescriptionEl, } from ''

export default class UserInfo {
  constructor(name, descr) {
    this._name = document.querySelector(name)
    this._description = document.querySelector(description)
  }

  getUserInfo() {
    return {
      name: this._name,
      description: this._description
    }
  }

  setUserInfo({ name, description }) {
    this._name = name
    this._description = description

    this._generate()
  }

  _generate() {
    profileNameEl.textContent = this._name
    profileDescriptionEl.textContent = this._description
  }
}
