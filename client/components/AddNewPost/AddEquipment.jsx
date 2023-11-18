import { useState } from "react";

import Box from '@mui/material/Box';
import Slider from '@mui/material/Slider';
import Button from "@mui/material/Button"
import Card from "@mui/material/Card"
import TextField from "@mui/material/TextField";
import Typography from "@mui/material/Typography";
import Stack from "@mui/material/Stack";
import ArrowForwardIosTwoToneIcon from '@mui/icons-material/ArrowForwardIosTwoTone';

const AddEquipment = () => {
    const [equipment, setEquipment] = useState("");
    const [description, setDescription] = useState("");
    const [image, setImage] = useState("");
    const [category, setCategory] = useState("");
    const [brand, setBrand] = useState("");
    const [purchaseLink, setPurchaseLink] = useState("");
    const [priceRating, setPriceRating] = useState(0);
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
console.log(priceRating);
    function ratingValue(value) {
        return `${value}`;
    }
    //<----------------------SUBMIT FORM---------------------->
    const handleSubmit = async (event) => {
        //TO DO
    }

    return (
        <>
            <Card sx={{ p: 5, maxWidth: 500 }}>
                <Typography variant="h4" sx={{ textAlign: "center", p: 1 }}>
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
                        <TextField
                            label="Description"
                            value={description}
                            onChange={(event) => setTitle(event.target.value)}
                            size="small"
                            variant="filled"
                            sx={{ m: 1 }}
                        />
                        <TextField
                            label="Image URL"
                            value={image}
                            onChange={(event) => setContent(event.target.value)}
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
                            onChange={(event) => setContent(event.target.value)}
                            size="small"
                            variant="filled"
                            sx={{ m: 1 }}
                            multiline
                        />
                        <TextField
                            label="Link to Seller"
                            value={purchaseLink}
                            onChange={(event) => setContent(event.target.value)}
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
        </>
    )
}
export default AddEquipment