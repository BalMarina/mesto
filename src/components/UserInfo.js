export default class UserInfo {
  constructor(nameSelector, descriptionSelector, avatarSelector) {
    // this.about = about
    // this.avatar = avatar
    // this.cohort = cohort
    // this.name = name
    // this.id = _id

    this._nameElement = document.querySelector(nameSelector)
    this._descriptionElement = document.querySelector(descriptionSelector)
    this._avatarElement = document.querySelector(avatarSelector)
  }

  getUserInfo() {
    const { id, name, about, avatar } = this;
    return { id, name, about, avatar }
  }

  setUserInfo({ name, about, avatar, _id }) {
    this.name = name
    this.about = about
    this.avatar = avatar
    this.id = _id

    this._nameElement.textContent = name
    this._descriptionElement.textContent = about
    this._avatarElement.src = avatar
  }
}
