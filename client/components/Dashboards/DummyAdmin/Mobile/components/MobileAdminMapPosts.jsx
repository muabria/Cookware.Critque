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

import { Link } from "react-router-dom";

import { useState } from "react";

import { useGetReviewsQuery } from "../../../../../redux/api";

const MobileAdminMapPosts = () => {
    const [alert, setAlert] = useState(false);

    const { data, error, isLoading } = useGetReviewsQuery();
    
    if (isLoading) {
        return <div> </div>;
    }
    if (error) {
        return <div>Error:{error.message}</div>;
    }

    return (
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
                                <Link to={`/review/${review.id}`}>
                                    <Button
                                        sx={{ m: 1 }}>
                                        <PreviewIcon />
                                    </Button>
                                </Link>
                                <Button
                                    onClick={() => setAlert(review.id)}
                                    color="error"
                                    sx={{ m: 1 }}>
                                    <DeleteForeverSharpIcon />
                                </Button>
                            </Grid>
                        </Grid>
                        {alert === review.id && <Alert severity="warning">
                            Are you sure you want to delete this post? Once you do, it's gone forever.
                            <Button
                                onClick={console.log("Delete")}
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
                        </Alert>
                        }
                    </Card>
                ))}
            </Accordion>
        </div>
    )
}

export default MobileAdminMapPosts