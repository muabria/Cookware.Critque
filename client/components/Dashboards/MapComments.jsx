import Alert from "@mui/material/Alert";
import Box from "@mui/material/Box"
import Button from "@mui/material/Button";
import Card from "@mui/material/Card";
import Grid from "@mui/material/Grid"
import Stack from "@mui/material/Stack"
import Typography from '@mui/material/Typography';
import PreviewIcon from '@mui/icons-material/Preview';
import DeleteForeverSharpIcon from '@mui/icons-material/DeleteForeverSharp';
import TextField from '@mui/material/TextField';
import EditNoteIcon from '@mui/icons-material/EditNote';
import ArrowCircleRightIcon from '@mui/icons-material/ArrowCircleRight';
import { Link } from "react-router-dom";

import { useMediaQuery, useTheme } from '@mui/material';

import { useState } from 'react';

import { useGetCommentByUserQuery } from '../../redux/api';
import { useDeleteCommentForUserMutation } from "../../redux/api";
import { usePatchCommentMutation } from "../../redux/api";
import LoadingMessage from "../ErrorMessages/LoadingMessage";

const MapComments = () => {
    const [alert, setAlert] = useState(null);
    const [edit, setEdit] = useState(false);
    const [content, setContent] = useState();

    const theme = useTheme();
    const isMobile = useMediaQuery(theme.breakpoints.down("md"));

    const [deleteComment, { isLoading: deleteIsLoading, Error: deleteError, data: deleteData }] = useDeleteCommentForUserMutation();
    const [patchComment, { isLoading: patchIsLoading, Error: patchError, data: patchData }] = usePatchCommentMutation();
    const { data, error, isLoading } = useGetCommentByUserQuery();

    if (!data) {
        return <div> Oops, our own web equipment is broken. We should have the issue resolved soon! </div>
    }
    if (isLoading) {
        return <div><LoadingMessage /></div>;
    }
    if (error) {
        return <div>Error:{error.message}</div>;
    }

    return (
        <>
            {isMobile ?
                <div>
                    <Card sx={{ backgroundColor: "#D3E0E2", m: 1 }}>
                        <Typography
                            sx={{ textAlign: "center", color: "#205375" }}>
                            My Comments:
                        </Typography>
                        <Box sx={{ backgroundColor: "#EEF5FF"}}>
                            <Link to="/posts">
                                <Button
                                    sx={{ textTransform: "none", m: 1 }}>
                                    Want to make a comment? Go visit a review!
                                    <ArrowCircleRightIcon sx={{ mx: 1}} />
                                </Button>
                            </Link>
                        </Box>
                        {data && data.map((comment) => (
                            <Card key={comment.id} sx={{ m: 1, p: 2 }}>
                                <Grid container>
                                    <Grid item xs={12}>
                                        <Typography sx={{ color: "#205375" }}>
                                            {comment.content}
                                        </Typography>
                                    </Grid>
                                    <Grid item xs={12}>
                                        <Button>
                                            <PreviewIcon />
                                        </Button>
                                        <Button
                                            onClick={() => setEdit(comment.id)}
                                            sx={{ m: 1 }}>
                                            <EditNoteIcon />
                                        </Button>
                                        <Button
                                            onClick={() => setAlert(comment.id)}
                                            color="error">
                                            <DeleteForeverSharpIcon />
                                        </Button>
                                    </Grid>
                                </Grid>
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

                : //if is NOT mobile...
                <div>
                    <Card sx={{ backgroundColor: "#D3E0E2", m: 1 }}>
                        <Typography
                            variant="h5"
                            sx={{ textAlign: "center", color: "#205375" }}>
                            My Comments:
                        </Typography>
                        <Box sx={{ backgroundColor: "#EEF5FF" }}>
                            <Link to="/posts">
                                <Button
                                    sx={{ textTransform: "none", m: 1 }}>
                                    Want to make a comment? Go visit a review!
                                    <ArrowCircleRightIcon sx={{ mx: 1 }} />
                                </Button>
                            </Link>
                        </Box>
                        {data && data.map((comment) => (
                            <Card key={comment.id} sx={{ m: 1, p: 2 }}>
                                <Grid container>
                                    <Grid item xs={10.5}>
                                        <Typography
                                            sx={{ textAlign: "center", color: "#205375" }}>
                                            {comment.content}
                                        </Typography>
                                    </Grid>
                                    <Grid item xs={1.5}>
                                        <Stack direction="column">
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
                                    </Grid>
                                </Grid>
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

            }

        </>
    )
}

export default MapComments