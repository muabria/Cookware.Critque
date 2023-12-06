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
import LoadingMessage from "../ErrorMessages/LoadingMessage";

const MobileNewPost = () => {
    //<-----------------TEXTFIELD STATE------------------->
    const [title, setTitle] = useState("");
    const [content, setContent] = useState("");
    const [equipment, setEquipment] = useState("");
    const [rating, setRating] = useState(null);

    //<-----------------STAR RATING STATE ------------------->
    const [hover, setHover] = useState(-1);

    function getLabelText(value) {
        return `${rating} Star${rating !== 1 ? 's' : ''}, ${starLabels[value]}`;
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

    const { data, error, isLoading } = useGetEquipmentQuery();
    const [postReview, { isLoading: isMutationLoading, isError: isMutationError, data: mutationData }] = usePostReviewMutation(); //include error handling

    if (isLoading) {
        return <div><LoadingMessage/></div>
    }
    if (error) {
        return <div> Sorry! There's a problem loading the equipment. </div>
    }
    if (isMutationError) {
        return <div>Whoops! Something went wrong posting the review.</div>
    }

    //<-----------------SUBMIT FORM HELPER FUNCTION------------------->
    const handleSubmit = async (event) => {
        try {
            event.preventDefault();
            const result = await postReview({ equipmentId: Number(equipment), title, content, rating: Number(rating) })
            console.log(result)
        } catch (error) {
            console.error(error)
        }
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
                <Grid item xs={1}>
                </Grid>
                <Grid item xs={10}>
                    <Box sx={{ backgroundColor: "#89c7c3" }}>
                        <Typography
                            variant="h6"
                            sx={{ color: "#205375", textAlign: "center", p: 1 }}>
                            Make a Kitchen Equipment Critique:
                        </Typography>
                    </Box>
                    <form onSubmit={handleSubmit}>
                        <Stack direction="column">
                            {/* <-----------------SELECT EQUIPMENT-------------------> */}
                            <Card sx={{ backgroundColor: "#D9E4DD", p: 1, mb: 3 }}>
                                <Stack direction="row">
                                    <Avatar sx={{ color: "#205375", backgroundColor: "#E7B10A", border: "solid #D29D2B 2px" }}>
                                        1
                                    </Avatar>
                                    <Typography
                                        variant="h8"
                                        sx={{ color: "#205375", fontFamily: "arial", p: 1 }}>
                                        Click on the Equipment You're Reviewing:
                                    </Typography>
                                </Stack>
                                {/* <--------------MAPP EQUIPMENT---------------> */}
                                <div className="carousel">
                                    <motion.div className="inner-carousel" drag="x" dragConstraints={{ right: 0, left: -1700 }}>
                                        <Stack direction="row">
                                            {data && data.map((equipment) => (
                                                <Card
                                                    key={equipment.id}
                                                    className="select-equipment"
                                                    onClick={() => setEquipment(equipment.id)}
                                                    sx={{ m: 1, minWidth: 150, maxWidth: 150, minHeight: 150, maxHeight: 150,border: "solid #D29D2B 5px", borderRadius: 100 }}>
                                                    <Box sx={{ backgroundColor: "#EACD65" }}>
                                                        <Typography
                                                            sx={{ color: "#205375", mx: 2, mt: 2,fontSize:"12px", textAlign: "center" }}>
                                                            {equipment.name}
                                                        </Typography>
                                                        <Typography sx={{ color: "#205375", m: 1, fontSize:"10px", textAlign: "center" }}>
                                                            by {equipment.brand}
                                                        </Typography>
                                                    </Box>
                                                    <Box textAlign="center">
                                                        <img
                                                            src={equipment.image}
                                                            alt={`${equipment.name} image`}
                                                            width="75"
                                                            height="75" />
                                                    </Box>
                                                </Card>
                                            ))
                                            }
                                        </Stack>
                                    </motion.div>
                                </div>
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
                                        <Avatar sx={{ color: "#205375", backgroundColor: "#E7B10A", border: "solid #D29D2B 2px" }}>
                                            2
                                        </Avatar>
                                        <Typography 
                                         variant="h8"
                                         sx={{ color: "#205375", fontFamily: "arial", p: 1 }}>
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
                                        <Typography sx={{ color: "#205375" }}>
                                            Add Your Rating:
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
                <Grid item xs={1}>

                </Grid>
            </Grid>
        </>
    )
}
export default MobileNewPost