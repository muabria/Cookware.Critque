
import Button from '@mui/material/Button';
import Card from '@mui/material/Card';
import Typography from '@mui/material/Typography';
import TextField from '@mui/material/TextField';
import Stack from '@mui/material/Stack';
import AddCommentIcon from '@mui/icons-material/AddComment';

import { useState } from 'react';

import { usePostCommentMutation } from '../../redux/api';

const CommentForm = () => {
const [comment,setComment] = useState(" ");
  //<-----------------TEXTFIELD STATE ------------------->
  const [postcomment, error] = usePostCommentMutation();
  console.log(comment);

  if (error) { 
    return <div>Whoops! Something went wrong posting the comment.</div>
  }

const handleSubmit = async (event) =>{
try {
event.preventDefault ();
await postcomment ({ content }) 
console.log(succes);
}
catch (error){
console.log(error);
}
}
  return (
    <div>
      <form onSubmit={handleSubmit}>
       <Card sx={{p:6}}>
        <Stack direction="column">
        <Typography>
          Add a comment 
        </Typography>
        <TextField sx={{my:2}}
        onChange={(event) => setComment(event.target.value)}
          value={comment} 
          id="comment"
          label="Comment"
          multiline
          rows={4}
          defaultValue="Type something"
        />
        <Button type="submit" sx={{backgroundColor:"purple", color:"white"}}><AddCommentIcon /> Submit comment</Button>
        </Stack>
       </Card>
      </form>
    </div>  
  );
}

export default CommentForm