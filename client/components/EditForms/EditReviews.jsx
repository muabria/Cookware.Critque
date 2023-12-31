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

import { useGetSingleReviewQuery, usePatchReviewMutation } from "../../redux/api"
import LoadingMessage from "../ErrorMessages/LoadingMessage"

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
        return <div><LoadingMessage/></div>
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
                        <Card sx={{ backgroundColor: "#D9E4DD", p: 5 }}>
                            <Stack direction="row">
                                <Typography variant="h5" sx={{ color: "#205375", p: 1 }}>
                                    Edit the review
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
                            <Button type="submit" sx={{ textTransform: "none", backgroundColor: "#088395", color: "white", m: 2, p: 1 }}>
                                Save Changes
                            </Button>
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