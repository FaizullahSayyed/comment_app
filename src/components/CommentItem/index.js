import './index.css'

const CommentItem = props => {
  const {
    commentDetails,
    updateLikeStatus,
    deleteComment,
    backgrounds,
    userCommentsDetails,
  } = props
  const {userName, userComment, commentTimeStamp, isLiked, id} = commentDetails
  const timeDifference = new Date() - commentTimeStamp

  const colorNum = Math.floor(
    userCommentsDetails.indexOf(commentDetails) % backgrounds.length,
  )

  const updateLike = () => {
    updateLikeStatus(id)
  }

  const onClickDeleteComment = () => {
    deleteComment(id)
  }

  return (
    <li className="list-item">
      <div className="name-comment-container">
        <div className="profile-pic-name-container">
          <div className={`profile-pic-container ${backgrounds[colorNum]}`}>
            {userName[0]}
          </div>
          <div className="name-container">{userName}</div>
          <div className="time-container">
            {timeDifference < 1000 * 60
              ? 'less than a minute ago'
              : `${Math.floor(timeDifference / 1000 / 60)} minutes ago`}
          </div>
        </div>
        <p className="comment">{userComment}</p>
        <div className="buttons-container">
          <div className="like-button-container">
            <button type="button" onClick={updateLike} className="like-button">
              <img
                src={
                  isLiked
                    ? 'https://assets.ccbp.in/frontend/react-js/comments-app/liked-img.png'
                    : 'https://assets.ccbp.in/frontend/react-js/comments-app/like-img.png'
                }
                alt="like"
              />
              like
            </button>
          </div>
          <div className="delete-button-container">
            <button
              type="button"
              onClick={onClickDeleteComment}
              className="delete-button"
              data-testid="delete"
            >
              <img
                src="https://assets.ccbp.in/frontend/react-js/comments-app/delete-img.png "
                alt="delete"
              />
            </button>
          </div>
        </div>
      </div>
    </li>
  )
}
export default CommentItem
