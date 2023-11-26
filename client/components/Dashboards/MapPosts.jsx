import Alert from "@mui/material/Alert";
import Button from "@mui/material/Button";
import Card from "@mui/material/Card";
import Grid from "@mui/material/Grid"
import Rating from "@mui/material/Rating"
import Typography from '@mui/material/Typography';
import PreviewIcon from '@mui/icons-material/Preview';
import DeleteForeverSharpIcon from '@mui/icons-material/DeleteForeverSharp';

import { useState } from "react";

import { useGetReviewByUserQuery } from "../../redux/api";
import { useDeleteReviewForUserMutation } from "../../redux/api";

 //<-----------------DELETE REVIEW HELPER FUNCTION------------------->

const MapPosts = () => {
    const [alert, setAlert] = useState(false);

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
                                    readOnly="true"
                                    value={review.rating}
                                />
                                <Typography>
                                    {review.content}
                                </Typography>
                            </Grid>
                            <Grid item={4}>
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
                            </Grid>
                        </Grid>
                    </Card>
                ))}
                {alert && <Alert severity="warning">
                    Are you sure you want to delete this post? Once you do it's gone forever.
                    <Button
                        onClick={() => deleteReview()}
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
        </>
    )
}

export default MapPosts