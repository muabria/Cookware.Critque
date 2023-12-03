import { useState } from "react"

import Box from "@mui/material/Box"
import Button from "@mui/material/Button"
import Card from "@mui/material/Card"
import Grid from "@mui/material/Grid"
import TextField from "@mui/material/TextField"
import Typography from "@mui/material/Typography"
import Stack from "@mui/material/Stack"
import Rating from "@mui/material/Rating"
import StarIcon from '@mui/icons-material/Star';

import { useParams } from "react-router-dom"

import { useGetSingleReviewQuery, usePatchReviewMutation } from "../../redux/api"

const EditReviews = () => {
    const [title, setTitle] = useState("");
    const [content, setContent] = useState("");
    const [rating, setRating] = useState(0);

    const { id } = useParams();

    const { data: reviewData, error: reviewError, isLoading: reviewIsLoading } = useGetSingleReviewQuery(id);

    const [patchReview, { data, error, isLoading }] = usePatchReviewMutation(id);
    if (error) {
        return <div>Error</div>
    }
    if (isLoading) {
        return <div>is loading..</div>
    }
    console.log(reviewData);

    const handleSubmit = async (event) => {
        try {
            event.preventDefault();
            const result = await patchReview({ id: reviewData.id, title, content, rating: Number(rating) })
            console.log(result)
        } catch (error) {
            console.error(error)
        }
    }

    return reviewData && (
        <>
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
                                />
                            </Stack>
                            <Button type="submit" sx={{ backgroundColor: "#088395", color: "white", m: 2, p: 1 }}>
                                Create Your Critique!
                            </Button>
                        </Card>
                    </form>
                </Grid>

                <Grid item xs={2}>

                </Grid>
            </Grid>
        </>
    )
}
export default EditReviews