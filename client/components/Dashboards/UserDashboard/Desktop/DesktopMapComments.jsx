import Alert from "@mui/material/Alert";
import Box from "@mui/material/Box"
import Button from "@mui/material/Button";
import Card from "@mui/material/Card";
import Stack from "@mui/material/Stack"
import Typography from '@mui/material/Typography';
import PreviewIcon from '@mui/icons-material/Preview';
import DeleteForeverSharpIcon from '@mui/icons-material/DeleteForeverSharp';
import TextField from '@mui/material/TextField';
import EditNoteIcon from '@mui/icons-material/EditNote';
import { Link } from "react-router-dom";

import { useState } from 'react';

import { useGetCommentByUserQuery } from "../../../../redux/api";
import { useDeleteCommentForUserMutation } from "../../../../redux/api";
import { usePatchCommentMutation } from "../../../../redux/api";

const DesktopMapComments = () => {
    const [alert, setAlert] = useState(null);
    const [edit, setEdit] = useState(false);
    const [content, setContent] = useState();

    const [deleteComment] = useDeleteCommentForUserMutation();
    const [patchComment] = usePatchCommentMutation();
    const { data, error, isLoading } = useGetCommentByUserQuery();

    if (isLoading) {
        return <div> </div>;
    }
    if (error) {
        return <div>Error:{error.message}</div>;
    }
    return (
        <div>
            <Card
                className="dashboard-component"
                elevation={10}
                sx={{ m: 1 }}>
                <Typography
                    variant="h5"
                    sx={{ textAlign: "center", color: "#205375" }}>
                    My Comments:
                </Typography>
                <Box sx={{ backgroundColor: "#EEF5FF" }}>
                    <Link to="/posts">
                        <Typography textAlign="center">
                            <Button
                                sx={{
                                    textTransform: "none",
                                    backgroundColor: "transparent",
                                    color: "#088395",
                                    m: 1, px: 3, py: 1,
                                    border: 1,
                                    borderColor: "#088395",
                                    borderBottom: 3,
                                    borderRight: 3,
                                    borderRadius: 2
                                }}>
                                Click here to comment on a review
                            </Button>
                        </Typography>
                    </Link>
                </Box>
                {data && data.map((comment) => (
                    <Card 
                    key={comment.id}
                    elevation={10} 
                    sx={{ m: 1, p: 2 }}>
                        <Typography
                            sx={{ textAlign: "center", color: "#205375" }}>
                            {comment.content}
                        </Typography>
                        <Stack direction="row" sx={{ mx: 3 }}>
                            <Button
                                variant="outlined"
                                sx={{ m: 1 }}>
                                <PreviewIcon />
                            </Button>
                            <Button
                                onClick={() => setEdit(comment.id)}
                                variant="outlined"
                                sx={{ m: 1 }}>
                                <EditNoteIcon />
                            </Button>
                            <Button
                                onClick={() => setAlert(comment.id)}
                                variant="outlined"
                                color="error"
                                sx={{ m: 1 }}>
                                <DeleteForeverSharpIcon />
                            </Button>
                        </Stack>
                        {edit === comment.id && <Alert severity="info">
                            <div>
                                <form onSubmit={(event) => { event.preventDefault(); patchComment({ id: comment.id, content }) }
                                }>
                                    <Card>
                                        <Stack direction="column">
                                            <Typography>
                                                Add a comment
                                            </Typography>
                                            <TextField sx={{ my: 2 }}
                                                onChange={(event) => setContent(event.target.value)}
                                                value={content}
                                                id="content"
                                                label="Add Comment Here"
                                                multiline
                                                rows={4}
                                                defaultValue="Type something"
                                            />
                                            <Button type="submit" sx={{ textTransform: "none", backgroundColor: "#088395", color: "white", m: 2, p: 1 }}>
                                                Edit Comment
                                            </Button>
                                        </Stack>
                                    </Card>
                                </form>
                            </div>
                            <Button
                                variant="outlined"
                                onClick={() => setEdit(null)}
                                sx={{ textTransform: "none", m: 1 }}>
                                No, keep this comment.
                            </Button>
                        </Alert>
                        }
                        {alert === comment.id && <Alert severity="warning">
                            Are you sure you want to delete this post? Once you do, it's gone forever.
                            <Button
                                onClick={() => deleteComment(comment.id)}
                                variant="outlined"
                                color="error"
                                sx={{ textTransform: "none", m: 1 }}>
                                Yes, delete this review.
                            </Button>
                            <Button
                                variant="outlined"
                                onClick={() => setAlert(null)}
                                sx={{ textTransform: "none", m: 1 }}>
                                No, keep this comment.
                            </Button>
                        </Alert>
                        }
                    </Card>
                ))}
            </Card>
        </div>
    )
}

export default DesktopMapComments