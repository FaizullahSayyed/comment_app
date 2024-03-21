import {Component} from 'react'
import {v4 as uuidv4} from 'uuid'

import CommentItem from '../CommentItem'

import './index.css'

const initialContainerBackgroundClassNames = [
  'amber',
  'blue',
  'orange',
  'emerald',
  'teal',
  'red',
  'light-blue',
]

class Comments extends Component {
  state = {userCommentsDetails: [], userName: '', userComment: ''}

  updateUserName = event => {
    this.setState({userName: event.target.value})
  }

  updateUserComment = event => {
    this.setState({userComment: event.target.value})
  }

  updateCommentsList = event => {
    event.preventDefault()
    const {userName, userComment} = this.state
    const newCommentDetails = {
      id: uuidv4(),
      userName,
      userComment,
      commentTimeStamp: new Date(),
      isLiked: false,
    }
    this.setState(prevState => ({
      userCommentsDetails: [
        ...prevState.userCommentsDetails,
        newCommentDetails,
      ],
      userName: '',
      userComment: '',
    }))
  }

  updateLikeStatus = id => {
    this.setState(prevState => ({
      userCommentsDetails: prevState.userCommentsDetails.map(eachComment => {
        if (eachComment.id === id) {
          return {...eachComment, isLiked: !eachComment.isLiked}
        }
        return eachComment
      }),
    }))
  }

  deleteComment = id => {
    this.setState(prevState => ({
      userCommentsDetails: prevState.userCommentsDetails.filter(
        eachComment => eachComment.id !== id,
      ),
    }))
  }

  render() {
    const {userCommentsDetails, userName, userComment} = this.state
    // userCommentsDetails.reverse()
    const numOfComment = userCommentsDetails.length

    return (
      <div className="bg-container">
        <div className="inner-container">
          <form>
            <div className="comment-input-container">
              <h1 className="main-heading">Comments</h1>
              <div className="input-container">
                <div>
                  <p className="input-heading">
                    Say Something about 4.0 Technologies
                  </p>
                  <div className="input-image-container">
                    <div className="input-fields-container">
                      <input
                        type="text"
                        placeholder="Enter Your Name"
                        value={userName}
                        onChange={this.updateUserName}
                        className="name-input-field"
                      />
                      <textarea
                        rows="8"
                        cols="32"
                        placeholder="Enter Your Comment"
                        value={userComment}
                        onChange={this.updateUserComment}
                        className="textarea"
                      >
                        Default text (optional)
                      </textarea>
                    </div>
                    <div className="comments-image-container">
                      <img
                        src="https://assets.ccbp.in/frontend/react-js/comments-app/comments-img.png"
                        className="comments-image"
                        alt="comments"
                      />
                    </div>
                  </div>
                </div>
              </div>
              <div className="add-comment-button-container">
                <button
                  type="button"
                  onClick={this.updateCommentsList}
                  className="add-comment-button"
                >
                  Add Comment
                </button>
              </div>
            </div>
          </form>
          <hr className="horizontal-line" />
          <div className="comment-container">
            <div className="comments-number">
              <span className="number-of-comments">{numOfComment}</span>{' '}
              Comments
            </div>
            <ul className="comments-list-container">
              {userCommentsDetails.map(commentDetails => (
                <CommentItem
                  key={commentDetails.id}
                  commentDetails={commentDetails}
                  updateLikeStatus={this.updateLikeStatus}
                  deleteComment={this.deleteComment}
                  backgrounds={initialContainerBackgroundClassNames}
                  userCommentsDetails={userCommentsDetails}
                />
              ))}
            </ul>
          </div>
        </div>
      </div>
    )
  }
}

export default Comments
