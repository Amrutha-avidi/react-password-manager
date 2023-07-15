import {Component} from 'react'

import {v4 as uudiv4} from 'uuid'

import PasswordItem from '../PasswordItem'

import './index.css'

const initialContainerBackgroundClassNames = [
  'amber',
  'grey',
  'orange',
  'emerald',
  'teal',
  'red',
  'light-blue',
]

class PasswordManager extends Component {
  state = {
    passwordList: [],
    inputWebsite: '',
    inputUserName: '',
    inputPassword: '',
    inputSearch: '',
    isChecked: false,
  }

  onDeletePassword = id => {
    const {passwordList} = this.state
    this.setState({
      passwordList: passwordList.filter(password => id !== password.id),
    })
  }

  onAddPassword = event => {
    event.preventDefault()

    const {inputPassword, inputUserName, inputWebsite} = this.state

    const initialBackgroundColor =
      initialContainerBackgroundClassNames[
        Math.ceil(
          Math.random() * initialContainerBackgroundClassNames.length - 1,
        )
      ]

    const newPassword = {
      id: uudiv4(),
      inputWebsite,
      inputUserName,
      inputPassword,
      initialClassName: initialBackgroundColor,
    }

    this.setState(prevState => ({
      passwordList: [...prevState.passwordList, newPassword],
      inputWebsite: '',
      inputUserName: '',
      inputPassword: '',
    }))
  }

  enterWebsite = event => {
    this.setState({inputWebsite: event.target.value})
  }

  enterUserName = event => {
    this.setState({inputUserName: event.target.value})
  }

  enterPassword = event => {
    this.setState({inputPassword: event.target.value})
  }

  onSearch = event => {
    this.setState({inputSearch: event.target.value})
  }

  showPassword = () => {
    const {isChecked} = this.state
    this.setState({isChecked: !isChecked})
  }

  render() {
    const {
      passwordList,
      inputPassword,
      inputUserName,
      inputWebsite,
      inputSearch,
      isChecked,
    } = this.state

    let ArePasswordAvailable = false
    if (passwordList.length === 0) {
      ArePasswordAvailable = true
    }

    const filteredPasswordList = passwordList.filter(eachItem =>
      eachItem.inputWebsite.toLowerCase().includes(inputSearch.toLowerCase()),
    )

    return (
      <div className="bg">
        <div className="main">
          <div className="logo-con">
            <img
              className="app-logo"
              src="https://assets.ccbp.in/frontend/react-js/password-manager-logo-img.png"
              alt="app logo"
            />
          </div>
          <div className="container-1">
            <div className="input-container">
              <form className="input-block" onSubmit={this.onAddPassword}>
                <h1 className="head">Add New Password</h1>
                <div className="input-con">
                  <div className="img-con">
                    <img
                      className="input-image"
                      src="https://assets.ccbp.in/frontend/react-js/password-manager-website-img.png"
                      alt="website"
                    />
                  </div>
                  <input
                    value={inputWebsite}
                    className="input"
                    type="text"
                    placeholder="Enter Website"
                    onChange={this.enterWebsite}
                  />
                </div>
                <div className="input-con">
                  <div className="img-con">
                    <img
                      className="input-image"
                      src="https://assets.ccbp.in/frontend/react-js/password-manager-username-img.png"
                      alt="username"
                    />
                  </div>
                  <input
                    value={inputUserName}
                    className="input"
                    type="text"
                    placeholder="Enter UserName"
                    onChange={this.enterUserName}
                  />
                </div>
                <div className="input-con">
                  <div className="img-con">
                    <img
                      className="input-image"
                      src="https://assets.ccbp.in/frontend/react-js/password-manager-password-img.png"
                      alt="password"
                    />
                  </div>
                  <input
                    value={inputPassword}
                    className="input"
                    type="password"
                    placeholder="Enter Password"
                    onChange={this.enterPassword}
                  />
                </div>
                <div className="button-con">
                  <button className="add-button" type="submit">
                    Add
                  </button>
                </div>
              </form>
              <img
                className="password-manager-img"
                src="https://assets.ccbp.in/frontend/react-js/password-manager-lg-img.png"
                alt="password manager"
              />
            </div>
          </div>
          <div className="container-1">
            <div className="password-head-con">
              <div className="password-count-con">
                <h1 className="head">Your Passwords</h1>
                <p className="password-count">{passwordList.length}</p>
              </div>
              <div className="input-con">
                <div className="img-con">
                  <img
                    className="input-image"
                    src="https://assets.ccbp.in/frontend/react-js/password-manager-search-img.png"
                    alt="search"
                  />
                </div>
                <input
                  value={inputSearch}
                  onChange={this.onSearch}
                  className="input"
                  type="search"
                  placeholder="Search"
                />
              </div>
            </div>
            <hr />
            <div className="password-con">
              <div className="show-passwords">
                <input
                  value={isChecked}
                  className="check"
                  type="checkbox"
                  id="check"
                  onChange={this.showPassword}
                />
                <label htmlFor="check" className="head">
                  Show Passwords
                </label>
              </div>

              <ul className="password-items-con">
                {filteredPasswordList.map(eachPassword => (
                  <PasswordItem
                    key={eachPassword.id}
                    passwordDetails={eachPassword}
                    onDeletePassword={this.onDeletePassword}
                  />
                ))}
              </ul>

              <div>
                {ArePasswordAvailable && (
                  <div className="no-password">
                    <img
                      className="no-password-img"
                      src="https://assets.ccbp.in/frontend/react-js/no-passwords-img.png"
                      alt="no-passwords"
                    />
                    <p className="head">No Passwords</p>
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>
    )
  }
}

export default PasswordManager
