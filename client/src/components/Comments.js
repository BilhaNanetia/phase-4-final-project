import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useParams } from 'react-router-dom';

const Comments = () => {
  const [comments, setComments] = useState([]);
  const [newComment, setNewComment] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);
  const { recipeId } = useParams();

  useEffect(() => {
    const fetchComments = async () => {
      setIsLoading(true);
      setError(null);

      try {
        const response = await axios.get(`/recipes/${recipeId}/comments`);
        setComments(response.data);
      } catch (error) {
        console.error('There was an error fetching comments!', error);
        setError('An error occurred. Please try again later.');
      } finally {
        setIsLoading(false);
      }
    };

    fetchComments();
  }, [recipeId]);

  const handleCommentChange = (e) => {
    setNewComment(e.target.value);
  };

  const handleSubmitComment = async (e) => {
    e.preventDefault();
    setIsLoading(true);
    setError(null);

    if (!newComment.trim()) {
      setIsLoading(false);
      return; // Handle empty comment
    }

    try {
      const token = localStorage.getItem('jwtToken'); 

      const response = await axios.post(
        `/recipes/${recipeId}/comments`,
        { content: newComment },
        { headers: { Authorization: `Bearer ${token}` } } // Include JWT token in header
      );

      setComments([...comments, response.data]); // Add new comment to state
      setNewComment(''); // Clear comment input after submission
    } catch (error) {
      console.error('There was an error adding a comment!', error);
      setError('An error occurred. Please try again later.');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div>
      <h2>Comments</h2>
      {isLoading ? (
        <p>Loading comments...</p>
      ) : error ? (
        <p className="error-message">{error}</p>
      ) : (
        <ul>
          {comments.map(comment => (
            <li key={comment.id}>
              <p>{comment.content}</p>
              <span>by {comment.author}</span>
            </li>
          ))}
        </ul>
      )}
      <form onSubmit={handleSubmitComment}>
        <label htmlFor="comment">Add Comment:</label>
        <textarea id="comment" value={newComment} onChange={handleCommentChange} />
        <button type="submit" disabled={isLoading}>
          {isLoading ? 'Posting...' : 'Add Comment'}
        </button>
      </form>
    </div>
  );
};

export default Comments;
