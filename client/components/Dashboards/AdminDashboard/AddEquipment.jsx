import { useState } from "react";

import Accordion from "@mui/material/Accordion";
import AccordionSummary from '@mui/material/AccordionSummary';
import Box from '@mui/material/Box';
import Slider from '@mui/material/Slider';
import Button from "@mui/material/Button"
import Card from "@mui/material/Card"
import TextField from "@mui/material/TextField";
import Typography from "@mui/material/Typography";
import Stack from "@mui/material/Stack";
import ExpandCircleDownIcon from '@mui/icons-material/ExpandCircleDown';
import { useMediaQuery, useTheme } from '@mui/material';

import { useGetCategoriesQuery } from "../../../redux/api";
import { usePostEquipmentMutation } from "../../../redux/api";

const AddEquipment = () => {
    const [equipment, setEquipment] = useState("");
    const [description, setDescription] = useState("");
    const [image, setImage] = useState("");
    const [category, setCategory] = useState("");
    const [brand, setBrand] = useState("");
    const [purchaseLink, setPurchaseLink] = useState("");
    const [priceRating, setPriceRating] = useState(0);
    const [select, setSelect] = useState(null)

    const [newEquipmentInfo, { isLoading: isMutationLoading, isError: isMutationError, data: mutationData }] = usePostEquipmentMutation();

    const theme = useTheme();
    const isMobile = useMediaQuery(theme.breakpoints.down("md"));

    const { data, error, isLoading } = useGetCategoriesQuery();
    if (!data) {
        return <div>No data</div>
    }
    if (isLoading) {
        return <div> </div>
    }
    if (error) {
        return <div> Error: {error.message} </div>;
    } else
        // console.log(data);
        console.log(category);
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
    // const myJSON = JSON.stringify(obj/string?);
    // console.log(myJSON);

    const handleSubmit = async (event) => {
        try {
            if (!category) {
                event.preventDefault();
                alert("Please select a category.");
                return
            }
            else if (priceRating === 0) {
                event.preventDefault();
                alert("Please select a price.");
                return
            }
            event.preventDefault();
            const result = await newEquipmentInfo({ name, description, image, categoryId: category, priceRating: Number(priceRating), brand, purchaseLink })
            console.log(result)
        } catch (error) {
            console.error(error)
        }
    }
    console.log(category)
    return (
        <>
            <Accordion sx={{ m: 2, backgroundColor: "#D9E4DD" }}>
                <AccordionSummary>
                    <Typography variant="h5" sx={{ textAlign: "center", color: "#205375", p: 1 }}>
                        Add New Equipment <ExpandCircleDownIcon sx={{ color: "#205375" }} />
                    </Typography>
                </AccordionSummary>
                <Card sx={{ px: 5, py: 2 }}>
                    <Stack direction="row">
                        <form onSubmit={handleSubmit}>
                            <Stack direction="column">
                                <TextField
                                    label="Equipment Name"
                                    value={equipment}
                                    onChange={(event) => setEquipment(event.target.value)}
                                    size="small"
                                    required={true}
                                    variant="filled"
                                    sx={{ m: 1 }}
                                />
                                <Typography sx={{ color: "#205375" }}>
                                    Select Category:
                                </Typography>

                                {isMobile
                                    ? <div>
                                        <Stack direction="column">
                                            {data && data.map((category) => (
                                                <Box key={category.id}>
                                                    <Button
                                                        onClick={() => setCategory(category.id)}
                                                        sx={{
                                                            border: select === category.id ? "solid #64CCC5 5px" : "solid #D29D2B 2px",
                                                            textTransform: "none",
                                                            m: 1,
                                                            backgroundColor: "#9BCDD2"
                                                        }}>
                                                        {category.category}
                                                    </Button>
                                                </Box>
                                            ))}
                                        </Stack>
                                    </div>
                                    ://is NOT mobile...
                                    <div>
                                        <Stack direction="row">
                                            {data && data.map((category) => (
                                                <Box key={category.id}>
                                                    <Button
                                                        onClick={() => setCategory(category.id)}
                                                        sx={{
                                                            border: select === category.id ? "solid #64CCC5 5px" : "solid #D29D2B 2px",
                                                            textTransform: "none",
                                                            mx: 1,
                                                            backgroundColor: "#9BCDD2"
                                                        }}>
                                                        {category.category}
                                                    </Button>
                                                </Box>
                                            ))}
                                        </Stack>
                                    </div>}
                                <TextField
                                    label="Description"
                                    value={description}
                                    onChange={(event) => setDescription(event.target.value)}
                                    size="small"
                                    required={true}
                                    variant="filled"
                                    sx={{ m: 1 }}
                                />
                                <TextField
                                    label="Image URL"
                                    value={image}
                                    onChange={(event) => setImage(event.target.value)}
                                    size="small"
                                    type="url"
                                    required={true}
                                    variant="filled"
                                    sx={{ m: 1 }}
                                    multiline
                                />
                                <Typography sx={{ color: "#205375" }}>
                                    Price Rating:
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
                                    required={true}
                                    variant="filled"
                                    sx={{ m: 1 }}
                                    multiline
                                />
                                <TextField
                                    label="Link to Seller"
                                    value={purchaseLink}
                                    onChange={(event) => setPurchaseLink(event.target.value)}
                                    size="small"
                                    type="url"
                                    required={true}
                                    variant="filled"
                                    sx={{ m: 1 }}
                                    multiline
                                />
                                <TextField
                                    label="Image URL"
                                    value={image}
                                    onChange={(event) => setImage(event.target.value)}
                                    size="small"
                                    type="url"
                                    required={true}
                                    variant="filled"
                                    sx={{ m: 1 }}
                                    multiline
                                />

                                {/* <---------------------------SUBMIT BUTTON-----------------------------> */}
                                <Button type="submit" sx={{ backgroundColor: "#088395", color: "white", m: 2, p: 1 }}>
                                    <Typography variant="h6">
                                        Submit Equipment
                                    </Typography>
                                </Button>
                            </Stack>
                        </form>
                    </Stack>
                </Card>
            </Accordion>
        </>
    )
}

export default AddEquipment