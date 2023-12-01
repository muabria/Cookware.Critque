import { useState } from "react"

import Box from "@mui/material/Box"
import Button from "@mui/material/Button"
import Card from "@mui/material/Card"
import TextField from "@mui/material/TextField"
import Typography from "@mui/material/Typography"
import Stack from "@mui/material/Stack"
import Rating from "@mui/material/Rating"

import { useParams } from "react-router-dom"

import { useGetSingleReviewQuery, usePatchReviewMutation } from "../../redux/api"

const EditReviews = () => {
    const [title, setTitle] = useState("");
    const [content, setContent] = useState("");
    const [rating, setRating] = useState(null);

    const {id} = useParams();

    const { data: reviewData, error: reviewError, isLoading: reviewIsLoading } = useGetSingleReviewQuery(id);

    const [ patchReview, { data, error, isLoading }] = usePatchReviewMutation(id);

    console.log(reviewData);

    return (
        <>
            <Card sx={{ backgroundColor: "#D9E4DD", p: 5 }}>
                <Stack direction="row">
                    <Typography variant="h5" sx={{ color: "#205375", p: 1 }}>
                        Edit the review
                    </Typography>
                </Stack>
                {/* <-----------------TITLE TEXTFIELD------------------> */}
                <Stack direction="column">
                    <TextField
                        label={reviewData.title}
                        value={title}
                        onChange={(event) => setTitle(event.target.value)}
                        size="small"
                        sx={{ m: 1, backgroundColor: "white" }}
                    />
                    {/* <-----------------CONTENT TEXTFIELD-------------------> */}
                    <TextField
                        label={reviewData.content}
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
                    <Stack direction="row">
                        <Rating
                            name="Equipment Rating"
                            value={rating}
                            precision={1}
                            getLabelText={getLabelText}
                            onChange={(event) => setRating(event.target.value)}
                            emptyIcon={<StarIcon style={{ opacity: 0.55 }} fontSize="inherit" />}
                        />
                        {/* <-----------------RENDED RATING TEXT-------------------> */}
                        {rating !== null && (
                            <Box sx={{ mx: 2 }}>
                                <Typography> {starLabels[hover !== -1 ? hover : rating]} </Typography>
                            </Box>
                        )}
                    </Stack>
                </Stack>
                <Button type="submit" sx={{ backgroundColor: "#088395", color: "white", m: 2, p: 1 }}>
                    Create Your Critique!
                </Button>
            </Card>
        </>
    )
}
export default EditReviews