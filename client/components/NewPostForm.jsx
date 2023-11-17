import { useState } from "react";

import { Link } from "react-router-dom"
import { usePostEquipmentMutation } from "../redux/api";

import { usePostReviewMutation } from "../redux/api";

import Button from "@mui/material/Button"
import Card from "@mui/material/Card"
import TextField from "@mui/material/TextField";
import Typography from "@mui/material/Typography";
import Stack from "@mui/material/Stack";
import Rating from "@mui/material/Rating";
import Box from '@mui/material/Box';
import StarIcon from '@mui/icons-material/Star';
import SearchBar from "./SearchEquipment/SearchBar";

const NewPostForm = () => {

    //<-----------------TEXTFIELD STATE ------------------->
    const [title, setTitle] = useState("");
    const [content, setContent] = useState("");
    const [equipment, setEquipment] = useState("");

    const handleSubmit = async (event) => {
        // event.preventDefault();
        // register({ username, password, name, location }), 
        // // console.log(token)
    }

    //<-----------------STAR RATING STATE ------------------->
    const [rating, setRating] = useState("");
    const [hover, setHover] = useState(-1);
    //<---------------------------STAR TEXT LABELS ----------------------------->
    function getLabelText(value) {
        return `${rating} Star${rating !== 1 ? 's' : ''}, ${labels[value]}`;
    }
    //<---------------------------STAR TEXT LABELS ----------------------------->
    const labels = {
        1: `Useless: Just doesn't cut it`,
        2: `Poor: Not exactly what I whisked for`,
        3: `Ok: Decent when everything else is dirty`,
        4: `Good: A-peeling and good in a kitchen`,
        5: `Excellent: Truely egg-ceptional!`,
    };

    return (
        <>
            <Card sx={{ p: 5, maxWidth: 500 }}>
                <Typography variant="h4" sx={{ textAlign: "center", p: 1 }}>
                    Make a Kitchen Equipment Critique:
                </Typography>

                <form onSubmit={handleSubmit}>
                    <Stack direction="column">
                        <TextField
                            label="Equipment Name"
                            value={equipment}
                            onChange={(event) => setEquipment(event.target.value)}
                            size="small"
                            variant="filled"
                            sx={{ m: 1 }}
                        />
                        <TextField
                            label="Title"
                            value={title}
                            onChange={(event) => setTitle(event.target.value)}
                            size="small"
                            variant="filled"
                            sx={{ m: 1 }}
                        />
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
                                name="hover-feedback"
                                value={rating}
                                precision={1}
                                getLabelText={getLabelText}
                                onChange={(event, newValue) => {
                                    setRating(newValue);
                                }}
                                onChangeActive={(event, newHover) => {
                                    setHover(newHover);
                                }}
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
export default NewPostForm