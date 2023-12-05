import Alert from "@mui/material/Alert";
import Button from "@mui/material/Button";
import Card from "@mui/material/Card";
import Grid from "@mui/material/Grid"
import Stack  from "@mui/material/Stack"
import Typography from '@mui/material/Typography';
import PreviewIcon from '@mui/icons-material/Preview';
import DeleteForeverSharpIcon from '@mui/icons-material/DeleteForeverSharp';

import { useMediaQuery, useTheme } from '@mui/material';

import { useState } from 'react';

import { useGetCommentByUserQuery } from '../../redux/api';
import { useDeleteCommentForUserMutation } from "../../redux/api";

const MapComments = () => {
    const [alert, setAlert] = useState(false);

    const theme = useTheme();
    const isMobile = useMediaQuery(theme.breakpoints.down("md"));

    const [deleteComment, { isLoading: deleteIsLoading, Error: deleteError, data: deleteData }] = useDeleteCommentForUserMutation();
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
            {isMobile ?
                <div>
                    <Card sx={{ backgroundColor: "#D3E0E2", m: 1 }}>
                        <Typography
                            sx={{ textAlign: "center" }}>
                            My Comments:
                        </Typography>
                        {data && data.map((comment) => (
                            <Card key={comment.id} sx={{ m: 1, p: 2 }}>
                                <Grid container>
                                    <Grid item xs={12}>
                                        <Typography>
                                            {comment.content}
                                        </Typography>
                                    </Grid>
                                    <Grid item xs={12}>
                                        <Button>
                                            <PreviewIcon />
                                        </Button>
                                        <Button
                                            onClick={() => setAlert(true)}
                                            color="error">
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
                            </Card>
                        ))}
                    </Card>
                </div>

                : //if is NOT mobile...
                <div>
                    <Card sx={{ backgroundColor: "#D3E0E2", m: 1 }}>
                        <Typography
                            variant="h5"
                            sx={{ textAlign: "center" }}>
                            My Comments:
                        </Typography>
                        {data && data.map((comment) => (
                            <Card key={comment.id} sx={{ m: 1, p: 2 }}>
                                <Grid container>
                                    <Grid item xs={10.5}>
                                        <Typography
                                            sx={{ textAlign: "center" }}>
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
                                                onClick={() => setAlert(true)}
                                                variant="outlined"
                                                color="error"
                                                sx={{ m: 1 }}>
                                                <DeleteForeverSharpIcon />
                                            </Button>
                                        </Stack>
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
                            </Card>
                        ))}
                    </Card>
                </div>

            }

        </>
    )
}

export default MapComments