import { useState } from "react";

import { usePostReviewMutation } from "../../redux/api";
import { useGetEquipmentQuery } from "../../redux/api";
import { useNavigate } from "react-router-dom";

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

import Carousel from "react-multi-carousel";
import "react-multi-carousel/lib/styles.css";


const MobileNewPost = () => {
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
    const [postReview, { isLoading: isMutationLoading, isError: isMutationError, data: mutationData }] = usePostReviewMutation(); //include error handling

    const navigate = useNavigate();

    if (isLoading) {
        return <div> </div>
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
            console.log(result);
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
                                    <Avatar
                                        sx={{
                                            color: "#205375",
                                            boxShadow: "2px 2px 2px #2c2604",
                                            backgroundImage: "radial-gradient(circle, #fce600, #f9dc00, #f5d200, #f1c802, #edbe05, #e1b306, #d4a807, #c89d08, #b28e08, #9c7f07, #887007, #746107)"
                                        }}>
                                        1
                                    </Avatar>
                                    <Typography
                                        variant="h8"
                                        sx={{ color: "#205375", fontFamily: "arial", p: 1 }}>
                                        Click on the Equipment You're Reviewing:
                                    </Typography>
                                </Stack>
                                {/* <--------------MAPP EQUIPMENT---------------> */}
                                <Carousel
                                    responsive={responsive}
                                    swipeable={true}
                                    draggable={true}
                                    showDots={true}>
                                    {data && data.map((equipment) => (
                                        <Card
                                            key={equipment.id}
                                            elevation={10}
                                            className="select-equipment"
                                            onClick={() => {
                                                setEquipment(equipment.id),
                                                    setSelect(equipment.id)
                                            }}
                                            sx={{
                                                mt: 1,
                                                mb: 5,
                                                mx: 8,
                                                width: 150, minHeight: 150,
                                                border: select === equipment.id ? "solid #64CCC5 10px" : "solid #D29D2B 5px",
                                                borderRadius: 100
                                            }}>
                                            <Box>
                                                <Typography
                                                    sx={{ color: "#205375", mx: 2, mt: 2, fontSize: "12px", textAlign: "center", fontWeight: "bold" }}>
                                                    {equipment.name}
                                                </Typography>
                                                <Typography sx={{ color: "#205375", m: 1, fontSize: "10px", textAlign: "center" }}>
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
                                </Carousel>
                                <Button
                                    className="critique-button"
                                    onClick={() => handelAnimation()}
                                    sx={{ borderRadius: "50px", textTransform: "none", backgroundColor: "#088395", color: "white", m: 2, p: 1 }}>
                                    Next
                                </Button>
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
                <Grid item xs={1}>

                </Grid>
            </Grid>
        </>
    )
}
export default MobileNewPost