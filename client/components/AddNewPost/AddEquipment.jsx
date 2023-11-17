import { useState } from "react";

import Button from "@mui/material/Button"
import Card from "@mui/material/Card"
import TextField from "@mui/material/TextField";
import Typography from "@mui/material/Typography";
import Stack from "@mui/material/Stack";

const AddEquipment = () => {
    const [equipment, setEquipment] = useState("");
    const [description, setDescription] = useState("");
    const [image, setImage] = useState("");
    const [category, setCategory] = useState("");
    const [brand, setBrand] = useState("");
    const [purchaseLink, setPurchaseLink] = useState("");
    const [priceRating, setPriceRating] = useState(null);

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
                            Create Your Critique!
                        </Button>
                    </Stack>
                </form>
            </Card>
        </>
    )
}
export default AddEquipment