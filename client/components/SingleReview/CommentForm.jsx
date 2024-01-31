
import Button from '@mui/material/Button';
import Card from '@mui/material/Card';
import TextField from '@mui/material/TextField';
import Stack from '@mui/material/Stack';
import AddCommentIcon from '@mui/icons-material/AddComment';

import { useParams } from "react-router-dom"

import { useState } from 'react';

import { useGetSingleReviewQuery, usePostCommentMutation } from '../../redux/api';

const CommentForm = () => {
  const [content, setContent] = useState(" ");

  const { id } = useParams();

  const { data: postData, error: postError, isLoading: postIsLoading } = useGetSingleReviewQuery(id);
  const [postComment, { data, error, isLoading }] = usePostCommentMutation();

  if (isLoading) {
    return <div> </div>
  }
  if (error) {
    return <div>Whoops! Something went wrong posting the comment.</div>
  }

  const handleSubmit = async (event) => {
    try {
      event.preventDefault();
      await postComment({ postId: postData.id, content })
      console.log("Succces!");
    }
    catch (error) {
      console.log(error);
    }
  }
  return (
    <div>
      <form onSubmit={handleSubmit}>
        <Card sx={{ p: 6 }}>
          <Stack direction="column">
            <TextField sx={{ my: 2 }}
              onChange={(event) => setContent(event.target.value)}
              value={content}
              id="content"
              label="Add Comment Here"
              required={true}
              multiline
              rows={2}
              defaultValue="Type something"
            />
            <button
              type="submit"
              className="critique-button">
              Add a Comment
            </button>
          </Stack>
        </Card>
      </form>
    </div>
  );
}

export default CommentForm