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
import LoadingMessage from "../ErrorMessages/LoadingMessage";

//<-----------------DELETE REVIEW HELPER FUNCTION------------------->

const MapPosts = () => {
    const [alert, setAlert] = useState(null);

    const theme = useTheme();
    const isMobile = useMediaQuery(theme.breakpoints.down("md"));

    const [deleteReview, { isLoading: deleteIsLoading, Error: deleteError, data: deleteData }] = useDeleteReviewForUserMutation();
    const { data, error, isLoading } = useGetReviewByUserQuery();

    if (!data) {
        return <div> Oops, our own web equipment is broken. We should have the issue resolved soon! </div>
    }
    if (isLoading) {
        return <div><LoadingMessage /></div>;
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
                        <Typography variant="h5" sx={{ textAlign: "center", color: "#205375" }}>
                            My Reviews:
                        </Typography>
                        {data && data.map((review) => (
                            <Card key={review.id} sx={{ m: 1, p: 2 }}>
                                <Grid container>
                                    <Grid item xs={8}>
                                        <Typography variant="h5" sx={{ color: "#205375" }}>
                                            {review.title}
                                        </Typography>
                                        <Typography variant="h6" sx={{ color: "#205375" }}>
                                            {review.equipment}
                                        </Typography>
                                        <Rating
                                            readOnly={true}
                                            value={review.rating}
                                        />
                                        <Typography sx={{ color: "#205375" }}>
                                            {review.content}
                                        </Typography>
                                    </Grid>
                                    <Grid item xs={4}>
                                        <Link to={`/review/${review.id}`}>
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
                                            onClick={() => setAlert(review.id)}
                                            color="error">
                                            <DeleteForeverSharpIcon />
                                        </Button>
                                    </Grid>
                                </Grid>
                                {alert === review.id && <Alert severity="warning">
                                    Are you sure you want to delete this post? Once you do, it's gone forever.
                                    <Button
                                        onClick={() => deleteReview(review.id)}
                                        variant="outlined"
                                        color="error"
                                        sx={{ textTransform: "none", m: 1 }}>
                                        Yes, I want to delete this review.
                                    </Button>
                                    <Button
                                        variant="outlined"
                                        onClick={() => setAlert(null)}
                                        sx={{ textTransform: "none", m: 1 }}>
                                        No, keep this review.
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
                        <Typography variant="h5" sx={{ textAlign: "center", color: "#205375" }}>
                            My Reviews:
                        </Typography>
                        {data && data.map((review) => (
                            <Card key={review.id} sx={{ m: 1, p: 2 }}>
                                <Grid container>
                                    <Grid item xs={10.5}>
                                        <Stack direction="column">
                                            <Typography variant="h5" sx={{ color: "#205375" }}>
                                                {review.title}
                                            </Typography>
                                            <Typography variant="h6" sx={{ color: "#205375" }}>
                                                {review.equipment}
                                            </Typography>
                                            <Rating
                                                readOnly={true}
                                                value={review.rating}
                                            />
                                            <Typography sx={{ color: "#205375" }}>
                                                {review.content}
                                            </Typography>
                                        </Stack>
                                    </Grid>
                                    <Grid item xs={1.5}>
                                        <Stack direction="column">
                                            <Link to={`/review/${review.id}`}>
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
                                                onClick={() => setAlert(review.id)}
                                                variant="outlined"
                                                color="error"
                                                sx={{ textTransform: "none", m: 1 }}>
                                                <DeleteForeverSharpIcon />
                                            </Button>
                                        </Stack>
                                    </Grid>
                                </Grid>
                                {alert === review.id && <Alert severity="warning">
                                    <Stack direction="column">
                                        Are you sure you want to delete this post? Once you do, it's gone forever.
                                        <Button
                                            onClick={() => deleteReview(review.id)}
                                            variant="outlined"
                                            color="error"
                                            sx={{ textTransform: "none", m: 1 }}>
                                            Yes, I want to delete this review.
                                        </Button>
                                        <Button
                                            variant="outlined"
                                            onClick={() => setAlert(null)}
                                            sx={{ textTransform: "none", m: 1 }}>
                                            No, keep this review.
                                        </Button>
                                    </Stack>
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