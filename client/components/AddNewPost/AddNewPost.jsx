import { useState } from "react";

import { usePostReviewMutation } from "../../redux/api";
import { useGetEquipmentQuery } from "../../redux/api";

import { motion, useAnimationControls } from "framer-motion";

import Avatar from "@mui/material/Avatar";
import Button from "@mui/material/Button"
import Card from "@mui/material/Card"
import Grid from "@mui/material/Grid"
import TextField from "@mui/material/TextField";
import Typography from "@mui/material/Typography";
import Stack from "@mui/material/Stack";
import Rating from "@mui/material/Rating";
import Box from '@mui/material/Box';
import StarIcon from '@mui/icons-material/Star';
import ArrowForwardIosIcon from '@mui/icons-material/ArrowForwardIos';

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
    //<----------------------ANIMATIONS---------------------->
    const controls = useAnimationControls();
    const variants = {
        visible: { opacity: 1 },
        hidden: { opacity: 0 },
    }

    const handelAnimation = async (event) => {
        controls.start("visible")
    }
    //<-----------------STAR RATING STATE ------------------->
    const [hover, setHover] = useState(-1);

    function getLabelText(value) {
        return `${rating} Star${rating !== 1 ? 's' : ''}, ${starLabels[value]}`;
    }
    const starLabels = {
        1: `Useless: Just doesn't cut it`,
        2: `Poor: Not exactly what I whisked for`,
        3: `Ok: Decent when everything else is dirty`,
        4: `Good: A-peeling and good in a kitchen`,
        5: `Excellent: Truely egg-ceptional!`,
    };
    console.log(equipment);
    return (
        <>
            <Grid container>
                <Grid item xs={2}>

                </Grid>

                <Grid item xs={8}>
                    <Box sx={{ backgroundColor: "#89c7c3" }}>
                        <Typography variant="h4" sx={{ textAlign: "center", p: 1 }}>
                            Make a Kitchen Equipment Critique:
                        </Typography>
                    </Box>

                    <form onSubmit={handleSubmit}>
                        <Stack direction="column">
                            {/* <-----------------SELECT EQUIPMENT-------------------> */}
                            <Card sx={{ backgroundColor: "#D9E4DD", p: 5, mb: 3 }}>
                                <Stack direction="row">
                                    <Avatar sx={{ color: "#3C1B1F", backgroundColor: "#E7B10A", border: "solid #D29D2B 5px" }}>
                                        1
                                    </Avatar>
                                    <Typography variant="h5" sx={{ p: 1 }}>
                                        Click on the Equipment You're Reviewing:
                                    </Typography>
                                </Stack>
                                {/* <--------------MAPP EQUIPMENT---------------> */}
                                <Stack direction="row">
                                    {data && data.map((equipment) => (
                                        <Card
                                            key={equipment.id}
                                            className="select-equipment"
                                            onClick={() => setEquipment(equipment.id)}
                                            sx={{ m: 1, minWidth: 300, maxWidth: 300 }}>
                                            <Box sx={{ backgroundColor: "#EACD65" }}>
                                                <Typography variant="h5" sx={{ m: 1, textAlign: "center" }}>
                                                    {equipment.name}
                                                </Typography>
                                                <Typography sx={{ m: 1, textAlign: "center" }}>
                                                    by {equipment.brand}
                                                </Typography>
                                            </Box>
                                            <Box textAlign="center">
                                                <img
                                                    src={equipment.image}
                                                    alt={`${equipment.name} image`}
                                                    width="200"
                                                    height="200" />
                                            </Box>
                                        </Card>
                                    ))
                                    }
                                </Stack>
                                <Button
                                    onClick={() => handelAnimation()}
                                    sx={{ backgroundColor: "#088395", color: "white", m: 2, p: 1 }}>
                                    Next <ArrowForwardIosIcon /><ArrowForwardIosIcon /><ArrowForwardIosIcon />
                                </Button>
                            </Card>


                            {/* <---------------------------SECOND CARD-----------------------------> */}

                            <motion.div
                                variants={variants}
                                initial="hidden"
                                animate={controls}>
                                <Card sx={{ backgroundColor: "#D9E4DD", p: 5 }}>
                                    <Stack direction="row">
                                        <Avatar sx={{ color: "#3C1B1F", backgroundColor: "#E7B10A", border: "solid #D29D2B 5px" }}>
                                            2
                                        </Avatar>
                                        <Typography variant="h5" sx={{ p: 1 }}>
                                            Write Your Critique:
                                        </Typography>
                                    </Stack>
                                    {/* <-----------------TITLE TEXTFIELD------------------> */}
                                    <Stack direction="column">
                                        <TextField
                                            label="Add Your Critique's Title"
                                            value={title}
                                            onChange={(event) => setTitle(event.target.value)}
                                            size="small"
                                            sx={{ m: 1, backgroundColor: "white" }}
                                        />
                                        {/* <-----------------CONTENT TEXTFIELD-------------------> */}
                                        <TextField
                                            label="Add Your Critique's Content"
                                            value={content}
                                            onChange={(event) => setContent(event.target.value)}
                                            size="small"
                                            sx={{ m: 1, backgroundColor: "white" }}
                                            multiline
                                        />
                                        {/* <-----------------RATING STARS-------------------> */}
                                        <Typography>
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
                            </motion.div>

                            {/* <-----------------SUBMIT BUTTON-------------------> */}
                        </Stack>
                    </form>

                </Grid>
                <Grid item xs={2}>

                </Grid>
            </Grid>
        </>
    )
}
export default AddPostContent