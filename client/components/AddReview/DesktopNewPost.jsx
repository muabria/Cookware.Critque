import { useState } from "react";

import { usePostReviewMutation } from "../../redux/api";
import { useGetEquipmentQuery } from "../../redux/api";
import { useGetUserQuery } from "../../redux/api";

import { motion, useAnimationControls } from "framer-motion";

import Alert from "@mui/material/Alert";
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
import { useMediaQuery, useTheme, createTheme } from "@mui/material";
import AspectRatio from '@mui/joy/AspectRatio';

import Carousel from "react-multi-carousel";
import "react-multi-carousel/lib/styles.css";

import MobileNewPost from "./MobileNewPost";

import { useNavigate } from "react-router-dom";

const DesktopAddNewPost = () => {
    //<-----------------TEXTFIELD STATE------------------->
    const [title, setTitle] = useState("");
    const [content, setContent] = useState("");
    const [equipment, setEquipment] = useState("");
    const [rating, setRating] = useState(null);
    const [select, setSelect] = useState(false)

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
    const [postReview, { data: mutationData, isError: isMutationError, isLoading: isMutationLoading, }] = usePostReviewMutation(); //include error handling
    const { data: userData, error: userError, isLoading: userIsLoading } = useGetUserQuery();
    const navigate = useNavigate();
    const theme = useTheme();
    const isMobile = useMediaQuery(theme.breakpoints.down("md"));

    if (isLoading) {
        return null;
    }
    if (error) {
        return <div> Sorry! There's a problem loading the equipment. </div>
    }
    if (isMutationError) {
        return (
            <div>
                <Alert severity="error">
                    Whoops! Something went wrong posting the review.
                </Alert>
            </div>
        )
    }
    const responsive = {
        superLargeDesktop: {
            breakpoint: { max: 4000, min: 3000 },
            items: 3
        },
        desktop: {
            breakpoint: { max: 3000, min: 1024 },
            items: 2
        },
        tablet: {
            breakpoint: { max: 1024, min: 464 },
            items: 1
        },
        mobile: {
            breakpoint: { max: 464, min: 0 },
            items: 1
        }
    };

    //<-----------------SUBMIT FORM HELPER FUNCTION------------------->
    const handleSubmit = async (event) => {
        if (!rating) {
            event.preventDefault();
            alert("Please add a rating.");
            return
        }
        try {
            event.preventDefault();
            const result = await postReview({ equipmentId: Number(equipment), title, content, rating: Number(rating) })
            console.log(result)
            navigate("/");
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
    return (
        <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.5, ease: "easeIn" }}>
            <Grid container>
                <Grid item xs={2}>
                </Grid>
                <Grid item xs={8}>
                    <Box sx={{ backgroundColor: "#89c7c3" }}>
                        <Typography
                            variant="h4"
                            sx={{ color: "#205375", textAlign: "center", p: 1 }}>
                            Make a Kitchen Equipment Critique:
                        </Typography>
                    </Box>
                    <form onSubmit={handleSubmit}>
                        <Stack direction="column">
                            {/* <-----------------SELECT EQUIPMENT-------------------> */}
                            <Card sx={{ backgroundColor: "#D9E4DD", p: 5, mb: 3 }}>
                                <Stack direction="row">
                                    <Avatar
                                        sx={{
                                            color: "#205375",
                                            boxShadow: "2px 2px 2px #2c2604",
                                            backgroundImage: "radial-gradient(circle, #fce600, #f9dc00, #f5d200, #f1c802, #edbe05, #e1b306, #d4a807, #c89d08, #b28e08, #9c7f07, #887007, #746107)"
                                        }}>
                                        1
                                    </Avatar>
                                    <Typography v
                                        variant="h5"
                                        sx={{ color: "#205375", p: 1 }}>
                                        Click on the Equipment You're Reviewing:
                                    </Typography>
                                </Stack>
                                {/* <--------------MAP EQUIPMENT---------------> */}
                                <Carousel
                                    responsive={responsive}
                                    swipeable={true}
                                    draggable={true}
                                    showDots={true}>
                                    {data && data.map((equipment) => (
                                        <motion.div
                                            whileTap={{ scale: 1.1 }}>
                                            <Card
                                                key={equipment.id}
                                                elevation={10}
                                                className="select-equipment"
                                                onClick={() => {
                                                    setEquipment(equipment.id),
                                                        setSelect(equipment.id)
                                                }}
                                                sx={{
                                                    m: 3,
                                                    minWidth: 350, maxWidth: 350,
                                                    border: select === equipment.id ? "solid #64CCC5 10px" : "solid #D29D2B 5px",
                                                    borderRadius: 100,
                                                }}>
                                                <Box sx={{ pt: 5, px: 2 }}>
                                                    <Typography
                                                        variant="h5"
                                                        sx={{ color: "#205375", m: 2, textAlign: "center", fontWeight: "bold" }}>
                                                        {equipment.name}
                                                    </Typography>
                                                    <Typography sx={{ color: "#205375", m: 1, textAlign: "center" }}>
                                                        by {equipment.brand}
                                                    </Typography>
                                                </Box>
                                                <Box textAlign="center">
                                                    <AspectRatio objectFit="contain">
                                                        <img
                                                            src={equipment.image}
                                                            alt={`${equipment.name} image`}
                                                            width="200"
                                                            height="200" />
                                                    </AspectRatio>
                                                </Box>
                                            </Card>
                                        </motion.div>
                                    ))}
                                </Carousel>
                                <button
                                    className="critique-button"
                                    onClick={() => handelAnimation()}>
                                    Next
                                </button>
                            </Card>
                            {/* <---------------------------SECOND CARD-----------------------------> */}
                            <motion.div
                                variants={variants}
                                initial="hidden"
                                animate={controls}>
                                <Card sx={{ backgroundColor: "#D9E4DD", p: 5 }}>
                                    <Stack direction="row">
                                        <Avatar
                                            sx={{
                                                color: "#205375",
                                                boxShadow: "2px 2px 2px #2c2604",
                                                backgroundImage: "radial-gradient(circle, #fce600, #f9dc00, #f5d200, #f1c802, #edbe05, #e1b306, #d4a807, #c89d08, #b28e08, #9c7f07, #887007, #746107)"
                                            }}>
                                            2
                                        </Avatar>
                                        <Typography variant="h5" sx={{ color: "#205375", p: 1 }}>
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
                                            required={true}
                                            sx={{ m: 1, backgroundColor: "white" }}
                                        />
                                        {/* <-----------------CONTENT TEXTFIELD-------------------> */}
                                        <TextField
                                            label="Add Your Critique's Content"
                                            value={content}
                                            onChange={(event) => setContent(event.target.value)}
                                            size="small"
                                            required={true}
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
                                    <button
                                        type="submit"
                                        className="critique-button">
                                        Submit Critique!
                                    </button>
                                </Card>
                            </motion.div>
                            {/* <-----------------SUBMIT BUTTON-------------------> */}
                        </Stack>
                    </form>
                </Grid>
                <Grid item xs={2}>
                </Grid>
            </Grid>
        </motion.div>
    )
}
export default DesktopAddNewPost