import Alert from "@mui/material/Alert"
import Accordion from "@mui/material/Accordion";
import AccordionSummary from "@mui/material/AccordionSummary";
import AccordionDetails from "@mui/material/AccordionDetails";
import Box from "@mui/material/Box"
import Button from "@mui/material/Button"
import Card from "@mui/material/Card";
import Grid from "@mui/material/Grid";
import Typography from "@mui/material/Typography";
import Stack from "@mui/material/Stack";
import DeleteForeverSharpIcon from '@mui/icons-material/DeleteForeverSharp';
import ExpandCircleDownIcon from '@mui/icons-material/ExpandCircleDown';
import ArrowCircleLeftIcon from '@mui/icons-material/ArrowCircleLeft';
import ArrowCircleRightIcon from '@mui/icons-material/ArrowCircleRight';
import { useMediaQuery, useTheme } from '@mui/material';

import { useRef, useState } from "react";

import { useGetEquipmentQuery } from "../../redux/api";
import { useDeleteEquipmentMutation } from "../../redux/api";

import { motion } from "framer-motion";

import LoadingMessage from "../ErrorMessages/LoadingMessage";
import SlideShow from "../SlideShow";

const AdminMapEquipment = () => {

    const [alert, setAlert] = useState(null);
    const [deleteEquipment, { isLoading: deleteIsLoading, Error: deleteError, data: deleteData }] = useDeleteEquipmentMutation();
    const [scrollItem, setscrollItem] = useState(0);

    const ref = useRef();

    const theme = useTheme();
    const isMobile = useMediaQuery(theme.breakpoints.down("md"));

    const { data, error, isLoading } = useGetEquipmentQuery();
    if (!data) {
        return <div> </div>
    }

    if (error) {
        return <div> Sorry! There's a problem loading the equipment. </div>
    }

    const handleScroll = (movementAmount) => {
        const newscrollItem = scrollItem + movementAmount;
        setscrollItem(newscrollItem);
        ref.current.scrollLeft = newscrollItem;
    };

    return (
        <>
            {isMobile ?
                <div>
                    <Accordion sx={{ m: 2, backgroundColor: "#D9E4DD" }}>
                        <AccordionSummary>
                            <Typography variant="h5" sx={{ m: 2, color: "#205375", textAlign: "center" }}>
                                All Equipment <ExpandCircleDownIcon sx={{ color: "#205375" }} />
                            </Typography>
                        </AccordionSummary>
                        <AccordionDetails>
                            {data && data.map((equipment) => (
                                <Card
                                    key={equipment.id}
                                    sx={{ p: 2, m: 2 }}>
                                    <Typography variant="h6" sx={{ textAlign: "center", color: "#205375" }}>
                                        {equipment.name}
                                    </Typography>
                                    <Typography sx={{ textAlign: "center", color: "#205375" }}>
                                        {equipment.brand}
                                    </Typography>
                                    <Accordion>
                                        <AccordionSummary>
                                            {equipment.name} description
                                        </AccordionSummary>
                                        <AccordionDetails>
                                            <Typography>
                                                {equipment.description}
                                            </Typography>
                                        </AccordionDetails>
                                    </Accordion>
                                    <Button
                                        onClick={() => setAlert(equipment.id)}
                                        color="error"
                                        sx={{ m: 1 }}>
                                        <DeleteForeverSharpIcon />
                                    </Button>
                                    {alert === equipment.id  && <Alert severity="warning">
                                        Are you sure you want to delete this Equipment? Once you do it's gone forever.
                                        <Button
                                            onClick={() => deleteEquipment(equipment.id)}
                                            variant="outlined"
                                            color="error"
                                            sx={{ textTransform: "none",  m: 1 }}>
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
                                </Card>
                            ))}
                        </AccordionDetails>
                    </Accordion>
                </div>
                ://is NOT mobile...
                <div>
                    <Box sx={{ m: 2, backgroundColor: "#89c7c3", borderRadius: "10px" }}>
                        <Typography variant="h5" sx={{ m: 2, color: "#205375" }}>
                            All Equipment:
                        </Typography>
                        <SlideShow
                            content={
                                <>
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
                                                {alert === equipment.id  && <Alert severity="warning">
                                                    Are you sure you want to delete this equipment? Once you do it's gone forever.
                                                    <Button
                                                        onClick={() => deleteEquipment(equipment.id)}
                                                        variant="outlined"
                                                        color="error"
                                                        sx={{  textTransform: "none", m: 1 }}>
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
                                </>
                            }
                        />
                    </Box>
                </div>}
        </>
    )
}

export default AdminMapEquipment