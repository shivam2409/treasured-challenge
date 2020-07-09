import React from 'react';
import './App.css';
import useComments from '../../hooks/useComments';
import CreateCommentContainer from './CreateCommentContainer';
import CommentsWrapper from './CommentsWrapper';

function AppWrapper() {
  const { comments, createComment } = useComments();

  return (
    <div className='comments-container'>
      <header className='comments-header'>
        <h1>Comments</h1>
      </header>
      <CreateCommentContainer createComment={createComment} />
      <CommentsWrapper comments={comments} />
    </div>
  );
}

export default AppWrapper;
