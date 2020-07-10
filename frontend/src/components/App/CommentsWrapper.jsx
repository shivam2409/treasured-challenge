import React from 'react';

import './App.css';

import Comment from './Comment';
import { createReply } from '../../services/reply';

function CommentsWrapper({ comments, createComment }) {
  return (
    <section className='comments'>
      {[...comments]
        .sort((a, b) => new Date(b.created_at) - new Date(a.created_at))
        .map((comment) => (
          <Comment
            key={comment.id}
            comment={comment}
            createComment={createComment}
          />
        ))}
    </section>
  );
}

export default CommentsWrapper;
