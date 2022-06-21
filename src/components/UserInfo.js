export default class UserInfo {
  constructor(nameSelector, descriptionSelector, avatarSelector) {
    this._nameElement = document.querySelector(nameSelector)
    this._descriptionElement = document.querySelector(descriptionSelector)
    this._avatarElement = document.querySelector(avatarSelector)
  }

  getUserInfo() {
    const { _id: id, _name: name, _about: about, _avatar: avatar } = this;
    return { id, name, about, avatar }
  }

  setUserInfo(data) {
    if (data.hasOwnProperty('name')) {
      this._name = data.name
      this._nameElement.textContent = data.name
    }

    if (data.hasOwnProperty('about')) {
      this._about = data.about
      this._descriptionElement.textContent = data.about
    }

    if (data.hasOwnProperty('avatar')) {
      this._avatar = data.avatar
      this._avatarElement.src = data.avatar
    }

    if (data.hasOwnProperty('_id')) {
      this._id = data._id
    }
  }
}
