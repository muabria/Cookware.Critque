import Alert from "@mui/material/Alert";
import Button from "@mui/material/Button";
import Card from "@mui/material/Card";
import Grid from "@mui/material/Grid"
import Rating from "@mui/material/Rating"
import Stack from '@mui/material/Stack';
import Typography from '@mui/material/Typography';
import PreviewIcon from '@mui/icons-material/Preview';
import DeleteForeverSharpIcon from '@mui/icons-material/DeleteForeverSharp';

import { Link } from "react-router-dom";

import { useState } from "react";

import { useGetReviewsQuery, useDeleteReviewForUserMutation } from "../../../../../redux/api";
import ProvideUsername from "../../../../SingleReview/ProvideUsername";

const DesktopAdminMapPosts = () => {
    const [alert, setAlert] = useState(false);

    const { data, error, isLoading } = useGetReviewsQuery();
    const [deleteReview] = useDeleteReviewForUserMutation();

    if (isLoading) {
        return <div> </div>;
    }
    if (error) {
        return <div>Error:{error.message}</div>;
    }

    return (
        <div>
            <Card
                elevation={10}
                sx={{ backgroundColor: "#D3E0E2", m: 1 }}>
                <Typography variant="h5" sx={{ textAlign: "center", color: "#205375" }}>
                    All Reviews:
                </Typography>
                {data && data.map((review) => (
                    <Card
                        key={review.id}
                        sx={{ m: 1, p: 2 }}
                        elevation={10}>
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
                                <ProvideUsername userId={review.userId}/>
                                <Link to={`/review/${review.id}`}>
                                    <Button
                                        variant="outlined"
                                        sx={{ m: 1 }}>
                                        <PreviewIcon />
                                    </Button>
                                </Link>
                                <Button
                                    onClick={() => setAlert(review.id)}
                                    variant="outlined"
                                    color="error"
                                    sx={{ textTransform: "none", m: 1 }}>
                                    <DeleteForeverSharpIcon />
                                </Button>
                                
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
                                    Yes, delete this review.
                                </Button>
                                <Button
                                    variant="outlined"
                                    onClick={() => setAlert(false)}
                                    sx={{ textTransform: "none", m: 1 }}>
                                    No, keep this review.
                                </Button>
                            </Stack>
                        </Alert>
                        }
                    </Card>
                ))}
            </Card>
        </div>
    )
}

export default DesktopAdminMapPosts