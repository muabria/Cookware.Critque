import { useState } from "react";

import { usePostReviewMutation } from "../../redux/api";
import { useGetEquipmentQuery } from "../../redux/api";

import Button from "@mui/material/Button"
import Card from "@mui/material/Card"
import Grid from "@mui/material/Grid"
import TextField from "@mui/material/TextField";
import Typography from "@mui/material/Typography";
import Stack from "@mui/material/Stack";
import Rating from "@mui/material/Rating";
import Box from '@mui/material/Box';
import StarIcon from '@mui/icons-material/Star';

const AddPostContent = () => {

    const { data, error, isLoading } = useGetEquipmentQuery();
    const [postReview, { isLoading: isMutationLoading, isError: isMutationError, data: mutationData }] = usePostReviewMutation();

    //<-----------------TEXTFIELD STATE------------------->
    const [title, setTitle] = useState("");
    const [content, setContent] = useState("");
    const [equipment, setEquipment] = useState("");
    const [rating, setRating] = useState(null);

    //<-----------------SUBMIT FORM HELPER FUNCTION------------------->
    const handleSubmit = async (event) => {
        try {
            event.preventDefault();
            const result = await postReview({ equipmentId: equipment, title, content, rating: Number(rating) })
            console.log(result)
        } catch (error) {
            console.error(error)
        }
    }
    //<-----------------STAR RATING STATE ------------------->
    const [hover, setHover] = useState(-1);

    function getLabelText(value) {
        return `${rating} Star${rating !== 1 ? 's' : ''}, ${labels[value]}`;
    }

    const labels = {
        1: `Useless: Just doesn't cut it`,
        2: `Poor: Not exactly what I whisked for`,
        3: `Ok: Decent when everything else is dirty`,
        4: `Good: A-peeling and good in a kitchen`,
        5: `Excellent: Truely egg-ceptional!`,
    };

    return (
        <>
            <Grid container>
                <Grid item xs={3}>

                </Grid>

                <Grid item xs={6}>
                <Box sx={{ backgroundColor: "#89c7c3" }}>
                            <Typography variant="h4" sx={{ textAlign: "center", p: 1 }}>
                                Make a Kitchen Equipment Critique:
                            </Typography>
                        </Box>
                    <Card sx={{ backgroundColor: "#D9E4DD", p: 5 }}>
    
                        <form onSubmit={handleSubmit}>

                            <Stack direction="column">
                                {/* <---------------------------SELECT EQUIPMENT-----------------------------> */}
                                <Stack direction="row">
                                    {data && data.map((equipment) => (
                                        <Card key={equipment.id}
                                            sx={{  m: 1, p: 1, maxWidth: 200 }}>
                                            <Typography variant="h6" sx={{ m: 1 }}>
                                                {equipment.name}
                                            </Typography>
                                            <img
                                                src={equipment.image}
                                                alt={`${equipment.name} image`}
                                                width="50"
                                                height="50" />
                                            <Button
                                                onClick={() => setEquipment(equipment.id)}
                                                sx={{ m: 1 }}>
                                                Select
                                            </Button>
                                        </Card>
                                    ))
                                    }
                                </Stack>
                                {/* <---------------------------TITLE TEXTFIELD-----------------------------> */}
                                <TextField
                                    label="Title"
                                    value={title}
                                    onChange={(event) => setTitle(event.target.value)}
                                    size="small"
                                    sx={{ m: 1, backgroundColor: "white" }}
                                />
                                {/* <---------------------------CONTENT TEXTFIELD-----------------------------> */}
                                <TextField
                                    label="Content"
                                    value={content}
                                    onChange={(event) => setContent(event.target.value)}
                                    size="small"
                                    sx={{ m: 1, backgroundColor: "white" }}
                                    multiline
                                />
                                {/* <---------------------------RATING STARS-----------------------------> */}
                                <Typography>
                                    Rate this Equipment:
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
                                    {/* <---------------------------RENDED RATING TEXT-----------------------------> */}
                                    {rating !== null && (
                                        <Box sx={{ mx: 2 }}>
                                            <Typography>
                                                {labels[hover !== -1 ? hover : rating]}
                                            </Typography>
                                        </Box>
                                    )}
                                </Stack>
                                {/* <---------------------------SUBMIT BUTTON-----------------------------> */}
                                <Button type="submit" sx={{ backgroundColor: "#088395", color: "white", m: 2, p: 1 }}>
                                    Create Your Critique!
                                </Button>
                            </Stack>
                        </form>
                    </Card>
                </Grid>
                <Grid item xs={3}>

                </Grid>
            </Grid>
        </>
    )
}
export default AddPostContent