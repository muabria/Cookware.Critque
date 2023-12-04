import Accordion from "@mui/material/Accordion"
import AccordionSummary from "@mui/material/AccordionSummary";
import AccordionDetails from "@mui/material/AccordionDetails";
import Card from "@mui/material/Card";
import Typography from "@mui/material/Typography";
import Stack from "@mui/material/Stack";
import Grid from "@mui/material/Grid";
import Button from "@mui/material/Button";
import Box from "@mui/material/Box";
import ArrowDropDownCircleIcon from '@mui/icons-material/ArrowDropDownCircle';

import { useMediaQuery, useTheme } from "@mui/material";

import { Link } from "react-router-dom";

import { useGetEquipmentQuery } from "../../redux/api"

const MapAllEquipment = () => {
    const theme = useTheme();
    const isMobile = useMediaQuery(theme.breakpoints.down("md"));

    const { data, error, isLoading } = useGetEquipmentQuery();
    if (isLoading) {
        return <div> Please Wait.. Still Loading</div>
    }
    if (error) {
        return <div> Sorry! There's a problem loading the equipment. </div>
    }
    console.log(data);


    return (
        <>
            {isMobile ?
                <div>
                    <Accordion sx={{ backgroundColor: "#D9E4DD" }}>
                        <AccordionSummary sx={{ pb: 2, mt: 10 }}>
                            <Typography 
                            variant="h6"
                            sx={{ color: "#205375" }}>
                                See All Equipment <ArrowDropDownCircleIcon sx={{ color: "#205375", mt: 2 }}/>
                            </Typography>
                        </AccordionSummary>
                        <Grid container >
                            {data && data.map((equipment) => (
                                <Stack direction="row" key={equipment.id}>
                                    <Card sx={{ m: 2,  color: "#205375", border: "solid #D29D2B 2px" }} key={equipment.id}>
                                        <Stack direction="column">
                                            <Typography
                                            variant="h6"
                                            sx={{ textAlign: "center", color: "#205375", backgroundColor: "#EACD65" }}>
                                                {equipment.name}
                                            </Typography>
                                            <Typography
                                             sx={{ textAlign: "center" }}>
                                                from {equipment.brand}
                                            </Typography>
                                            <Typography sx={{ px: 2 }}>
                                                {equipment.description}
                                            </Typography>
                                            <Link to={`/equipment/${equipment.id}`}>
                                                <Button>
                                                    See the {equipment.name}'s Reviews
                                                </Button>
                                            </Link>
                                        </Stack>
                                    </Card>
                                </Stack>
                            ))}
                        </Grid>
                    </Accordion>
                </div>
                ://is NOT mobile..
                <div>
                    <Grid container >
                        {data && data.map((equipment) => (
                            <Stack direction="row" key={equipment.id}>
                                <Card sx={{ p: 2, m: 2 }} key={equipment.id}>
                                    <Stack direction="column">
                                        <Typography>
                                            {equipment.name}
                                        </Typography>
                                        <Typography>
                                            {equipment.brand}
                                        </Typography>
                                        <Typography>
                                            {equipment.description}
                                        </Typography>
                                        <Link to={`/equipment/${equipment.id}`}>
                                            <Button>
                                                See the {equipment.name}'s Reviews
                                            </Button>
                                        </Link>
                                    </Stack>
                                </Card>
                            </Stack>
                        ))}
                    </Grid>
                </div>}
        </>
    )
}

export default MapAllEquipment