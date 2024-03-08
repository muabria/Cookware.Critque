import { useState } from "react"

import Alert from "@mui/material/Alert"
import Button from "@mui/material/Button"
import Card from "@mui/material/Card"
import Grid from "@mui/material/Grid"
import TextField from "@mui/material/TextField"
import Typography from "@mui/material/Typography"
import Stack from "@mui/material/Stack"
import Rating from "@mui/material/Rating"
import StarIcon from '@mui/icons-material/Star';

import { motion } from "framer-motion"

import { useParams, useNavigate } from "react-router-dom"

import { useGetSingleReviewQuery, usePatchReviewMutation } from "../../../redux/api"

const EditReviews = () => {
    const [title, setTitle] = useState("");
    const [content, setContent] = useState("");
    const [rating, setRating] = useState(0);

    const { id } = useParams();
    const navigate = useNavigate();

    const { data: reviewData, error: reviewError, isLoading: reviewIsLoading } = useGetSingleReviewQuery(id);

    const [patchReview, { data, error, isLoading }] = usePatchReviewMutation();

    if (error) {
        return <div>Error</div>
    }
    if (isLoading) {
        return <div> </div>
    }

    const handleSubmit = async (event) => {
        try {
            event.preventDefault();
            const result = await patchReview({ id, title, content, rating: Number(rating) })
            console.log(result)
            navigate("/account");
        } catch (error) {
            console.error(error)
        }
    }

    const populateForm = (event) => {
        event.preventDefault();
        setTitle(reviewData.title);
        setContent(reviewData.content);
        setRating(reviewData.rating);
    }

    return reviewData && (
        <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.5, ease: "easeIn" }}>
            <Grid container>
                <Grid item xs={2}>

                </Grid>

                <Grid item xs={8}>
                    <form onSubmit={handleSubmit}>
                        <Card elevation={10} sx={{ backgroundColor: "#D9E4DD", p: 5, mb: 10 }}>
                            <Stack direction="column">
                                <Typography variant="h4" sx={{ color: "#205375", p: 1, textAlign: "center" }}>
                                    Edit the Review
                                </Typography>
                                <Typography textAlign="center" sx={{mb: 1.5}}>
                                    <button onClick={populateForm} className="blue-button">
                                        Populate Form
                                    </button>
                                </Typography>
                            </Stack>
                            {/* <-----------------TITLE TEXTFIELD------------------> */}
                            <Stack direction="column">
                                <TextField
                                    label={"Edit Title"}
                                    value={title}
                                    onChange={(event) => setTitle(event.target.value)}
                                    size="small"
                                    sx={{ m: 1, backgroundColor: "white" }}
                                />
                                {/* <-----------------CONTENT TEXTFIELD-------------------> */}
                                <TextField
                                    label={"Edit Content"}
                                    value={content}
                                    onChange={(event) => setContent(event.target.value)}
                                    size="small"
                                    sx={{ m: 1, backgroundColor: "white" }}
                                    multiline
                                />
                                {/* <-----------------RATING STARS-------------------> */}
                                <Typography sx={{ color: "#205375" }}>
                                    Add Your Rating for this Equipment:
                                </Typography>
                                <TextField
                                    label={"Edit Rating"}
                                    type="number"
                                    value={rating}
                                    onChange={(event) => setRating(event.target.value)}
                                    size="small"
                                    sx={{ m: 1, backgroundColor: "white" }}
                                    helperText={
                                        rating > 5 || rating < 0
                                            ? <Alert severity="error">The item's rating must be on a scale of 1- 5</Alert>
                                            : null
                                    }
                                />
                            </Stack>
                            <Stack direction="column">
                                <Typography textAlign="center" sx={{mt: 1}}>
                                    <button
                                        type="submit"
                                        className="blue-button">
                                        Update
                                    </button>
                                </Typography>
                                <Typography textAlign="center">
                                    <button className="admin-button" onClick={() => navigate("/account")} style={{ width: 100 }}>
                                        Cancel
                                    </button>
                                </Typography>
                            </Stack>
                        </Card>
                    </form>
                </Grid>

                <Grid item xs={2}>

                </Grid>
            </Grid>
        </motion.div>
    )
}
export default EditReviews