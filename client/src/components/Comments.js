import React, { useEffect, useState } from 'react';
import axios from 'axios';

const Comments = ({ recipeId }) => {
  const [comments, setComments] = useState([]);
  const [comment, setComment] = useState('');

  useEffect(() => {
    axios.get(`/recipes/${recipeId}/comments`)
      .then(response => {
        setComments(response.data);
      })
      .catch(error => {
        console.error('There was an error fetching the comments!', error);
      });
  }, [recipeId]);

  const handleCommentChange = (e) => {
    setComment(e.target.value);
  };

  const handleCommentSubmit = (e) => {
    e.preventDefault();
    axios.post(`/recipes/${recipeId}/comments`, { content: comment }, {
      headers: {
        Authorization: `Bearer ${localStorage.getItem('token')}`
      }
    })
    .then(response => {
      setComments([...comments, response.data]);
      setComment('');
    })
    .catch(error => {
      console.error('There was an error adding the comment!', error);
    });
  };

  return (
    <div>
      <h2>Comments</h2>
      <ul>
        {comments.map(comment => (
          <li key={comment.id}>{comment.author}: {comment.content}</li>
        ))}
      </ul>
      <form onSubmit={handleCommentSubmit}>
        <label>
          Add a comment:
          <input type="text" value={comment} onChange={handleCommentChange} />
        </label>
        <br />
        <button type="submit">Submit</button>
      </form>
    </div>
  );
};

export default Comments;
