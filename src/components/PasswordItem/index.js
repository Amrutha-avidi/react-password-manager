import './index.css'

const PasswordItem = props => {
  const {passwordDetails, onDeletePassword} = props
  const {
    id,
    inputWebsite,
    inputUserName,
    inputPassword,
    initialClassName,
  } = passwordDetails

  const firstLetter = inputWebsite[0].toUpperCase()

  const deletePassword = () => {
    onDeletePassword(id)
  }

  return (
    <li className="password-item-container">
      <div className={`first-letter-con ${initialClassName}`}>
        <p>{firstLetter}</p>
      </div>
      <div className="details">
        <p className="detail-items">{inputWebsite}</p>
        <p className="detail-items">{inputUserName}</p>
        <p>{inputPassword}</p>
      </div>
      <button data-testid="delete" type="button" onClick={deletePassword}>
        <img
          src="https://assets.ccbp.in/frontend/react-js/password-manager-delete-img.png"
          alt="delete"
          className="del-img"
        />
      </button>
    </li>
  )
}
export default PasswordItem
