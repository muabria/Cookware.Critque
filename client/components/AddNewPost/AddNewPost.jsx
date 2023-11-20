import { useState } from "react";

import Box from '@mui/material/Box';
import Slider from '@mui/material/Slider';
import Button from "@mui/material/Button"
import Card from "@mui/material/Card"
import TextField from "@mui/material/TextField";
import Typography from "@mui/material/Typography";
import Stack from "@mui/material/Stack";
import ArrowForwardIosTwoToneIcon from '@mui/icons-material/ArrowForwardIosTwoTone';
import MapCategories from "../SearchEquipment/MapCategories";

import AddPostForm from "./AddPostForm";

import { motion, useAnimationControls } from "framer-motion";

import { useGetCategoriesQuery } from "../../redux/api";
import { usePostEquipmentMutation } from "../../redux/api";

const AddNewPost = () => {
    const [equipment, setEquipment] = useState("");
    const [description, setDescription] = useState("");
    const [image, setImage] = useState("");
    const [category, setCategory] = useState("");
    const [brand, setBrand] = useState("");
    const [purchaseLink, setPurchaseLink] = useState("");
    const [priceRating, setPriceRating] = useState(0);

    const { data, error, isLoading } = useGetCategoriesQuery();

    //<----------------------ANIMATIONS---------------------->
    const controls = useAnimationControls();
    const variants = {
        visible: { opacity: 1 },
        hidden: { opacity: 0 },
    }
    //<----------------------RATING---------------------->
    const rating = [
        { value: 0, label: '$10' },
        { value: 20, label: '$20' },
        { value: 40, label: '$40' },
        { value: 60, label: '$60' },
        { value: 80, label: '$80' },
        { value: 100, label: '$100' },
        { value: 150, label: '$150' },
    ];
    function ratingValue(value) {
        return `${value}`;
    }
    //<----------------------SUBMIT FORM---------------------->
    const [newEquipmentInfo] = usePostEquipmentMutation();

    const handleSubmit = async (event) => {
        try {
            event.preventDefault();
            const result = await newEquipmentInfo({ name, description, image, category, priceRating, brand, purchaseLink })
            console.log(result)
            controls.start("visible")
        } catch (error) {
            console.error(error)
        }
    }
    console.log(category)
    return (
        <>
            <Stack direction="row">
                    <Card sx={{ p: 5, mx: 2, maxWidth: 650 }}>
                        <Typography variant="h4" sx={{ textAlign: "center", p: 1 }}>
                            Step 1:
                        </Typography>
                        <Typography variant="h5" sx={{ textAlign: "center", p: 1 }}>
                            What equipment are you critiquing?
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
                                <Typography>
                                    Category:
                                </Typography>
                                <Stack direction="row">
                                    {data && data.map((category) => (
                                        <Box key={category.id}>
                                            <Button
                                                onClick={() => setCategory(category.id)}
                                                sx={{ mx: 1, backgroundColor: "#9BCDD2" }}>
                                                {category.category}
                                            </Button>
                                        </Box>
                                    ))
                                    }
                                </Stack>
                                <TextField
                                    label="Description"
                                    value={description}
                                    onChange={(event) => setDescription(event.target.value)}
                                    size="small"
                                    variant="filled"
                                    sx={{ m: 1 }}
                                />
                                <TextField
                                    label="Image URL"
                                    value={image}
                                    onChange={(event) => setImage(event.target.value)}
                                    size="small"
                                    variant="filled"
                                    sx={{ m: 1 }}
                                    multiline
                                />
                                <Typography>
                                    Price:
                                </Typography>
                                <Box sx={{ textAlign: "center" }}>
                                    <Slider
                                        aria-label="Custom marks"
                                        defaultValue={priceRating}
                                        onChange={(event) => setPriceRating(event.target.value)}
                                        getAriaValueText={ratingValue}
                                        step={5}
                                        valueLabelDisplay="auto"
                                        marks={rating}
                                    />
                                </Box>
                                <TextField
                                    label="Brand Name"
                                    value={brand}
                                    onChange={(event) => setBrand(event.target.value)}
                                    size="small"
                                    variant="filled"
                                    sx={{ m: 1 }}
                                    multiline
                                />
                                <TextField
                                    label="Link to Seller"
                                    value={purchaseLink}
                                    onChange={(event) => setPurchaseLink(event.target.value)}
                                    size="small"
                                    variant="filled"
                                    sx={{ m: 1 }}
                                    multiline
                                />

                                {/* <---------------------------SUBMIT BUTTON-----------------------------> */}
                                <Button type="submit" sx={{ backgroundColor: "#088395", color: "white", m: 2, p: 1 }}>
                                    <Typography variant="h6">
                                        Next
                                    </Typography>
                                    <ArrowForwardIosTwoToneIcon />
                                    <ArrowForwardIosTwoToneIcon />
                                    <ArrowForwardIosTwoToneIcon />
                                </Button>
                            </Stack>
                        </form>
                    </Card>
                {/* <---------------------------POST CARD-----------------------------> */}
                <motion.div
                    variants={variants}
                    initial="hidden"
                    animate={controls}>
                    <AddPostForm />
                </motion.div>
            </Stack>
        </>
    )
}
export default AddNewPost