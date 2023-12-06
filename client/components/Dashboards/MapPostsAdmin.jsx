import Accordion from "@mui/material/Accordion";
import AccordionSummary from '@mui/material/AccordionSummary';
import Alert from "@mui/material/Alert";
import Button from "@mui/material/Button";
import Card from "@mui/material/Card";
import Grid from "@mui/material/Grid"
import Rating from "@mui/material/Rating"
import Typography from '@mui/material/Typography';
import PreviewIcon from '@mui/icons-material/Preview';
import DeleteForeverSharpIcon from '@mui/icons-material/DeleteForeverSharp';
import ExpandCircleDownIcon from '@mui/icons-material/ExpandCircleDown';
import { useMediaQuery, useTheme } from '@mui/material';

import { Link } from "react-router-dom";

import { useState } from "react";

import { useGetReviewsQuery } from "../../redux/api";
import { useDeleteReviewForUserMutation } from "../../redux/api";
import LoadingMessage from "../ErrorMessages/LoadingMessage";
// import { useDeleteReviewForUserMutation } from "../../redux/api";

//<-----------------DELETE REVIEW HELPER FUNCTION------------------->

const MapPostsAdmin = () => {
    const [alert, setAlert] = useState(false);

    const theme = useTheme();
    const isMobile = useMediaQuery(theme.breakpoints.down("md"));

    const { data, error, isLoading } = useGetReviewsQuery();
    const [deleteReview, { data: mutationData, error: mutationError, isLoading: mutationIsLoading }] = useDeleteReviewForUserMutation();

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
                    <Accordion sx={{ m: 2, backgroundColor: "#D9E4DD" }}>
                        <AccordionSummary>
                            <Typography
                                variant="h5"
                                sx={{ textAlign: "center", color: "#205375" }}>
                                All Reviews <ExpandCircleDownIcon sx={{ color: "#205375" }} />
                            </Typography>
                        </AccordionSummary>
                        {data && data.map((review) => (
                            <Card key={review.id} sx={{ m: 1, p: 2 }}>
                                <Grid container>
                                    <Grid item xs={12}>
                                        <Typography variant="h5" sx={{ textAlign: "center", color: "#205375" }}>
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
                                    <Grid item xs={12}>
                                        <Link to={`/equipment/${review.id}/review`}>
                                            <Button
                                                sx={{ m: 1 }}>
                                                <PreviewIcon />
                                            </Button>
                                        </Link>
                                        <Button
                                            onClick={() => setAlert(true)}
                                            color="error"
                                            sx={{ m: 1 }}>
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
                                        Yes, delete this review
                                    </Button>
                                    <Button
                                        variant="outlined"
                                        onClick={() => setAlert(false)}
                                        sx={{ m: 1 }}>
                                        No, keep this review
                                    </Button>
                                </Alert>
                                }
                            </Card>
                        ))}
                    </Accordion>
                </div>

                :// is NOT mobile...
                <div>
                    <Card sx={{ backgroundColor: "#D3E0E2", m: 1 }}>
                        <Typography variant="h5" sx={{ textAlign: "center", color: "#205375" }}>
                            All Reviews:
                        </Typography>
                        {data && data.map((review) => (
                            <Card key={review.id} sx={{ m: 1, p: 2 }}>
                                <Grid container>
                                    <Grid item xs={8}>
                                        <Typography variant="h5" sx={{ textAlign: "center", color: "#205375" }}>
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
                                        <Link to={`/equipment/${review.id}/review`}>
                                            <Button
                                                variant="outlined"
                                                sx={{ m: 1 }}>
                                                <PreviewIcon />
                                            </Button>
                                        </Link>
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
                                        onClick={() => deleteReview(review.id)}
                                        variant="outlined"
                                        color="error"
                                        sx={{ m: 1 }}>
                                        Yes, delete this review
                                    </Button>
                                    <Button
                                        variant="outlined"
                                        onClick={() => setAlert(false)}
                                        sx={{ m: 1 }}>
                                        No, keep this review
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

export default MapPostsAdmin