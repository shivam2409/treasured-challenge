import React, { useState } from 'react';
import CreateCommentContainer from './CreateCommentContainer';

function Comment({ comment, createComment }) {
  const [toggle, settoggle] = useState(false);
  function showDiv() {
    return <CreateCommentContainer createComment={createComment} />;
  }
  return (
    <div key={comment.id} className='comment'>
      <header className='comment__header'>
        <h2 className='comment__heading'>{comment.user.name} says...</h2>
        <span className='comment_timestamp'>
          {new Intl.DateTimeFormat('en-US', {
            dateStyle: 'medium',
            timeStyle: 'short',
          }).format(new Date(comment.created_at))}
        </span>
      </header>
      <p className='comment__body'>{comment.content}</p>
      {toggle && showDiv()}
      <div className='reply__button'>
        <button
          className='button button--primary'
          onClick={() => settoggle(!toggle)}
        >
          Reply
        </button>
      </div>
    </div>
  );
}

export default Comment;
