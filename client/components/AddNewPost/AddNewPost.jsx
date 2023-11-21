import { useState } from "react";

import { usePostReviewMutation } from "../../redux/api";
import { useGetEquipmentQuery } from "../../redux/api";

import Button from "@mui/material/Button"
import Card from "@mui/material/Card"
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

    console.log(equipment);
    console.log(title);
    console.log(content);
    console.log(rating);

    return (
        <>
            <Card sx={{ p: 5, maxWidth: 500 }}>

                <Typography variant="h4" sx={{ textAlign: "center", p: 1 }}>
                    Make a Kitchen Equipment Critique:
                </Typography>

                <form onSubmit={handleSubmit}>

                    <Stack direction="column">
                        {/* <---------------------------SELECT EQUIPMENT-----------------------------> */}
                        {data && data.map((equipment) => (
                            <Card key={equipment.id}
                                sx={{ m: 1, p: 1, maxWidth: 200 }}>
                                <Stack direction="row">
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
                                </Stack>
                            </Card>
                        ))
                        }
                        {/* <---------------------------TITLE TEXTFIELD-----------------------------> */}
                        <TextField
                            label="Title"
                            value={title}
                            onChange={(event) => setTitle(event.target.value)}
                            size="small"
                            variant="filled"
                            sx={{ m: 1 }}
                        />
                        {/* <---------------------------CONTENT TEXTFIELD-----------------------------> */}
                        <TextField
                            label="Content"
                            value={content}
                            onChange={(event) => setContent(event.target.value)}
                            size="small"
                            variant="filled"
                            sx={{ m: 1 }}
                            multiline
                        />
                        {/* <---------------------------RATING STARS-----------------------------> */}
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
        </>
    )
}
export default AddPostContent