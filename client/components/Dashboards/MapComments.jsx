import Alert from "@mui/material/Alert";
import Button from "@mui/material/Button";
import Card from "@mui/material/Card";
import Grid from "@mui/material/Grid"
import Typography from '@mui/material/Typography';
import PreviewIcon from '@mui/icons-material/Preview';
import TextField from '@mui/material/TextField';
import Stack from '@mui/material/Stack';
import DeleteForeverSharpIcon from '@mui/icons-material/DeleteForeverSharp';
import EditNoteIcon from '@mui/icons-material/EditNote';
import { useParams } from "react-router-dom";


import { useState } from 'react';

import { useGetCommentByUserQuery } from '../../redux/api';
import { useDeleteCommentForUserMutation } from "../../redux/api";
import { usePatchCommentMutation } from "../../redux/api";

const MapComments = () => {
    const [alert, setAlert] = useState(false);
    const [edit, setEdit] = useState(false);
    const [content, setContent] = useState();
    const [deleteComment, { isLoading: deleteIsLoading, Error: deleteError, data: deleteData }] = useDeleteCommentForUserMutation();
    const [patchComment, { isLoading: patchIsLoading, Error: patchError, data: patchData }] = usePatchCommentMutation();
    const { data, error, isLoading } = useGetCommentByUserQuery();

    if (!data) {
        return <div> Oops, our own web equipment is broken. We should have the issue resolved soon! </div>
    }
    if (isLoading) {
        return <div> Loading... </div>;
    }
    if (error) {
        return <div>Error:{error.message}</div>;
    }
    console.log(data);
    

    return (
        <>
            <Card sx={{ backgroundColor: "#D3E0E2", m: 1 }}>
                <Typography
                    sx={{
                        textAlign: "center",
                        fontSize: {
                            xs: "16px",
                            sm: "18px",
                            md: "20px",
                            lg: "24px",
                        }
                    }}>
                    My Comments:
                </Typography>
                {data && data.map((comment) => (
                    <Card key={comment.id} sx={{ m: 1, p: 2 }}>
                        <Grid container>
                            <Grid item xs={8}>
                                <Typography
                                    sx={{
                                        textAlign: "center",
                                        fontSize: {
                                            xs: "10px",
                                            sm: "12px",
                                            md: "14px",
                                            lg: "16px",
                                        }
                                    }}>
                                    {comment.content}
                                </Typography>
                            </Grid>
                            <Grid item xs={4}>
                                <Button
                                    variant="outlined"
                                    sx={{ m: 1 }}>
                                    <PreviewIcon />
                                </Button>
                                <Button
                                    onClick={() =>
                                        setEdit(true)
                                    }
                                    variant="outlined"
                                    sx={{ m: 1 }}>
                                    <EditNoteIcon />

                                </Button>
                                <Button
                                    onClick={() => setAlert(true)}
                                    variant="outlined"
                                    color="error"
                                    sx={{ m: 1 }}>
                                    <DeleteForeverSharpIcon />
                                </Button>
                            </Grid>
                        </Grid>
                        {alert && <Alert severity="warning">
                            Are you sure you want to delete this post? Once you do it's gone forever.
                            <Button
                                onClick={() => deleteComment(comment.id)}
                                variant="outlined"
                                color="error"
                                sx={{ m: 1 }}>
                                Yes, delete this review
                            </Button>
                            <Button
                                variant="outlined"
                                onClick={() => setAlert(false)}
                                sx={{ m: 1 }}>
                                No, keep this comment
                            </Button>
                        </Alert>
                        }
                        {edit && <Alert severity="info">
                            <div>
                                <form onSubmit = {(event) => {event.preventDefault(); patchComment({id:comment.id, content})}
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
                                            <Button type="submit" sx={{ backgroundColor: "#088395", color: "white", m: 2, p: 1 }}> Edit Comment</Button>
                                        </Stack>
                                    </Card>
                                </form>
                            </div>
                            <Button
                                variant="outlined"
                                onClick={() => setAlert(false)}
                                sx={{ m: 1 }}>
                                No, keep this comment
                            </Button>
                        </Alert>
                        }
                    </Card>
                ))}
            </Card>

        </>
    )
}

export default MapComments