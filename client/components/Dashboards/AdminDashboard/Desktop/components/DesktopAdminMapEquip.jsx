import Alert from "@mui/material/Alert"
import Accordion from "@mui/material/Accordion";
import AccordionSummary from "@mui/material/AccordionSummary";
import AccordionDetails from "@mui/material/AccordionDetails";
import Box from "@mui/material/Box"
import Button from "@mui/material/Button"
import Card from "@mui/material/Card";
import Typography from "@mui/material/Typography";
import Stack from "@mui/material/Stack";
import DeleteForeverSharpIcon from '@mui/icons-material/DeleteForeverSharp';
import ExpandCircleDownIcon from '@mui/icons-material/ExpandCircleDown';

import Carousel from "react-multi-carousel";
import "react-multi-carousel/lib/styles.css";

import { useState } from "react";

import { useGetEquipmentQuery, useDeleteEquipmentMutation } from "../../../../../redux/api";

const DesktopAdminMapEquip = () => {

    const [alert, setAlert] = useState(null);
    const [deleteEquipment, { isLoading: deleteIsLoading, Error: deleteError, data: deleteData }] = useDeleteEquipmentMutation();

    const responsive = {
        superLargeDesktop: {
            breakpoint: { max: 4000, min: 3000 },
            items: 5
        },
        desktop: {
            breakpoint: { max: 3000, min: 1024 },
            items: 3
        },
        tablet: {
            breakpoint: { max: 1024, min: 464 },
            items: 2
        },
        mobile: {
            breakpoint: { max: 464, min: 0 },
            items: 1
        }
    };

    const { data, error, isLoading } = useGetEquipmentQuery();
    if (isLoading) {
        return <div> </div>
    }
    if (error) {
        return <div>{error}</div>
    }
    return (
        <div>
            <Box sx={{ m: 2, backgroundColor: "#89c7c3", borderRadius: "10px" }}>
                <Typography variant="h5" sx={{ m: 2, color: "#205375" }}>
                    All Equipment:
                </Typography>
                <Carousel
                    responsive={responsive}
                    swipeable={true}
                    draggable={true}
                    showDots={true}>
                    {data && data.map((equipment) => (
                        <Card
                            key={equipment.id}
                            sx={{ p: 2, m: 2, minWidth: 300, maxWidth: 300 }}>
                            <Stack direction="column">
                                <Typography variant="h6" sx={{ textAlign: "center", color: "#205375" }}>
                                    {equipment.name}
                                </Typography>
                                <Typography sx={{ textAlign: "center", color: "#205375" }}>
                                    {equipment.brand}
                                </Typography>
                                <Accordion>
                                    <AccordionSummary>
                                        <Typography sx={{ color: "#205375" }}>
                                            {equipment.name} description
                                        </Typography>
                                    </AccordionSummary>
                                    <AccordionDetails>
                                        <Typography sx={{ color: "#205375" }}>
                                            {equipment.description}
                                        </Typography>
                                    </AccordionDetails>
                                </Accordion>
                                <Button
                                    onClick={() => setAlert(equipment.id)}
                                    color="error"
                                    sx={{ textTransform: "none", m: 1 }}>
                                    <DeleteForeverSharpIcon />
                                </Button>
                                {alert === equipment.id && <Alert severity="warning">
                                    Are you sure you want to delete this equipment? Once you do it's gone forever.
                                    <Button
                                        onClick={() => deleteEquipment(equipment.id)}
                                        variant="outlined"
                                        color="error"
                                        sx={{ textTransform: "none", m: 1 }}>
                                        Yes, delete this equipment.
                                    </Button>
                                    <Button
                                        variant="outlined"
                                        onClick={() => setAlert(null)}
                                        sx={{ textTransform: "none", m: 1 }}>
                                        No, keep this equipment.
                                    </Button>
                                </Alert>
                                }
                            </Stack>
                        </Card>
                    ))}
                </Carousel>
            </Box>
        </div>
    )
}

export default DesktopAdminMapEquip