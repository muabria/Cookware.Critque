import Alert from "@mui/material/Alert";
import Button from "@mui/material/Button";
import Card from "@mui/material/Card";
import Grid from "@mui/material/Grid"
import Rating from "@mui/material/Rating"
import Stack from "@mui/material/Stack"
import Typography from '@mui/material/Typography';
import PreviewIcon from '@mui/icons-material/Preview';
import DeleteForeverSharpIcon from '@mui/icons-material/DeleteForeverSharp';
import EditNoteIcon from '@mui/icons-material/EditNote';

import { useMediaQuery, useTheme } from '@mui/material';

import { Link } from "react-router-dom";

import { useState } from "react";

import { useGetReviewByUserQuery } from "../../redux/api";
import { useDeleteReviewForUserMutation } from "../../redux/api";

//<-----------------DELETE REVIEW HELPER FUNCTION------------------->

const MapPosts = () => {
    const [alert, setAlert] = useState(false);
    const [editForm, setEditForm] = useState(false);

    const theme = useTheme();
    const isMobile = useMediaQuery(theme.breakpoints.down("md"));

    const [deleteReview, { isLoading: deleteIsLoading, Error: deleteError, data: deleteData }] = useDeleteReviewForUserMutation();
    const { data, error, isLoading } = useGetReviewByUserQuery();

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
            {isMobile
                ?
                <div>
                    <Card sx={{ backgroundColor: "#D3E0E2", m: 1 }}>
                        <Typography variant="h5" sx={{ textAlign: "center" }}>
                            My Reviews:
                        </Typography>
                        {data && data.map((review) => (
                            <Card key={review.id} sx={{ m: 1, p: 2 }}>
                                <Grid container>
                                    <Grid item xs={8}>
                                        <Typography variant="h5" sx={{ textAlign: "center" }}>
                                            {review.title}
                                        </Typography>
                                        <Typography variant="h6">
                                            {review.equipment}
                                        </Typography>
                                        <Rating
                                            readOnly={true}
                                            value={review.rating}
                                        />
                                        <Typography>
                                            {review.content}
                                        </Typography>
                                    </Grid>
                                    <Grid item xs={4}>
                                        <Link to={`/equipment/${review.id}/review`}>
                                            <Button>
                                                <PreviewIcon />
                                            </Button>
                                        </Link>
                                        <Link to={`/edit_review/${review.id}`}>
                                            <Button>
                                                <EditNoteIcon />
                                            </Button>
                                        </Link>
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
                                        onClick={() => deleteReview(review.id)}
                                        variant="outlined"
                                        color="error"
                                        sx={{ m: 1 }}>
                                        Yes, I want to delete this review
                                    </Button>
                                    <Button
                                        variant="outlined"
                                        onClick={() => setAlert(false)}
                                        sx={{ m: 1 }}>
                                        No, keep this review
                                    </Button>
                                </Alert>
                                }
                                {editForm && <Alert severity="warning">
                                    Are you sure you want to edit this post?
                                    <Link to={`/edit_review/${review.id}`}>
                                        <Button
                                            onClick={console.log("Working!")}
                                            variant="outlined"
                                            color="error"
                                            sx={{ m: 1 }}>
                                            Yes, I want to edit this review
                                        </Button>
                                    </Link>

                                    <Button
                                        variant="outlined"
                                        onClick={() => setAlert(false)}
                                        sx={{ m: 1 }}>
                                        No, I don't need to edit this review
                                    </Button>
                                </Alert>
                                }
                            </Card>
                        ))}
                    </Card>
                </div>

                : //is NOT mobile...
                <div>
                    <Card sx={{ backgroundColor: "#D3E0E2", m: 1 }}>
                        <Typography variant="h5" sx={{ textAlign: "center" }}>
                            My Reviews:
                        </Typography>
                        {data && data.map((review) => (
                            <Card key={review.id} sx={{ m: 1, p: 2 }}>
                                <Grid container>

                                    <Grid item xs={10}>
                                        <Stack direction="row">
                                            <Typography variant="h5" sx={{ textAlign: "center" }}>
                                                {review.title}
                                            </Typography>
                                            <Typography variant="h6">
                                                {review.equipment}
                                            </Typography>
                                            <Rating
                                                readOnly={true}
                                                value={review.rating}
                                            />
                                            <Typography>
                                                {review.content}
                                            </Typography>
                                        </Stack>
                                    </Grid>
                                    <Grid item xs={2}>
                                        <Stack direction="column">
                                            <Link to={`/equipment/${review.id}/review`}>
                                                <Button
                                                    variant="outlined"
                                                    sx={{ m: 1 }}>
                                                    <PreviewIcon />
                                                </Button>
                                            </Link>
                                            <Link to={`/edit_review/${review.id}`}>
                                                <Button
                                                    variant="outlined"
                                                    sx={{ m: 1 }}>
                                                    <EditNoteIcon />
                                                </Button>
                                            </Link>
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
                                        onClick={() => deleteReview(review.id)}
                                        variant="outlined"
                                        color="error"
                                        sx={{ m: 1 }}>
                                        Yes, I want to delete this review
                                    </Button>
                                    <Button
                                        variant="outlined"
                                        onClick={() => setAlert(false)}
                                        sx={{ m: 1 }}>
                                        No, keep this review
                                    </Button>
                                </Alert>
                                }
                                {editForm && <Alert severity="warning">
                                    Are you sure you want to edit this post?
                                    <Link to={`/edit_review/${review.id}`}>
                                        <Button
                                            onClick={console.log("Working!")}
                                            variant="outlined"
                                            color="error"
                                            sx={{ m: 1 }}>
                                            Yes, I want to edit this review
                                        </Button>
                                    </Link>
                                    <Button
                                        variant="outlined"
                                        onClick={() => setAlert(false)}
                                        sx={{ m: 1 }}>
                                        No, I don't need to edit this review
                                    </Button>
                                </Alert>
                                }
                            </Card>
                        ))}
                    </Card>
                </div>}
        </>
    )
}

export default MapPosts