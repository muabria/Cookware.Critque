import Card from "@mui/material/Card";
import Typography from "@mui/material/Typography";
import Stack from "@mui/material/Stack";
import Grid from "@mui/material/Grid";
import Button from "@mui/material/Button";
import Box from "@mui/material/Box";
import AspectRatio from '@mui/joy/AspectRatio';


import { useMediaQuery, useTheme } from "@mui/material";

import { Link } from "react-router-dom";

import { useGetEquipmentQuery } from "../../redux/api"
import LoadingMessage from "../ErrorMessages/LoadingMessage";
import SlideShow from "../SlideShow";

const MapAllEquipment = () => {
    const theme = useTheme();
    const isMobile = useMediaQuery(theme.breakpoints.down("md"));

    const { data, error, isLoading } = useGetEquipmentQuery();
    if (isLoading) {
        return <div><LoadingMessage /></div>
    }
    if (error) {
        return <div> Sorry! There's a problem loading the equipment. </div>
    }
    console.log(data);


    return (
        <>
            {isMobile ?
                <div>
                    <Typography
                        variant="h4"
                        sx={{ textAlign: "center", color: "#205375", mt: 10 }}>
                        See All Equipment
                    </Typography>
                    <Box sx={{m: 2.5}}>
                        <SlideShow
                            content={
                                <>
                                    {data && data.map((equipment) => (
                                        <Stack direction="row" key={equipment.id}>
                                            <Card sx={{ m: 0.5, color: "#205375", border: "solid #D29D2B 2px", minWidth: "200px", borderRadius: "10px" }} key={equipment.id}>
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
                                                    <Box sx={{ px: 5 }}>
                                                        <img
                                                            src={equipment.image}
                                                            alt={equipment.name}
                                                            width="100"
                                                            height="100" />
                                                    </Box>
                                                    <Link to={`/equipment/${equipment.id}`}>
                                                        <Button
                                                            sx={{
                                                                my: 2,
                                                                mx: 2,
                                                                boxShadow: 3,
                                                                color: "#3C1B1F",
                                                                backgroundColor: "#EACD65",
                                                                border: "solid #D29D2B 2px"
                                                            }}>
                                                            See All Reviews
                                                        </Button>
                                                    </Link>
                                                </Stack>
                                            </Card>
                                        </Stack>
                                    ))}
                                </>
                            }
                        />
                    </Box>
                </div>
                ://is NOT mobile..
                <div>
                    <Typography
                        variant="h4"
                        sx={{ textAlign: "center", color: "#205375", mt: 10 }}>
                        See All Equipment
                    </Typography>

                    <Grid container >
                        <SlideShow
                            content={
                                <>
                                    {data && data.map((equipment) => (
                                        <Card
                                            key={equipment.id}
                                            sx={{
                                                maxWidth: 300,
                                                minWidth: 300,
                                                maxHeight: 300,
                                                minHeight: 300,
                                                m: 2,
                                                color: "#205375",
                                                border: "solid #D29D2B 2px",
                                                borderRadius: "10px"
                                            }}>
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
                                                <Box sx={{ m: 2, maxHeight: 200 }}>
                                                    <AspectRatio objectFit="contain">
                                                        <img
                                                            src={equipment.image}
                                                            alt={`${equipment.name} image`}
                                                            width="130"
                                                            height="130"
                                                        />
                                                    </AspectRatio>
                                                </Box>
                                                <Link to={`/equipment/${equipment.id}`}>
                                                    <Button
                                                        sx={{
                                                            my: 2,
                                                            mx: 9,
                                                            boxShadow: 3,
                                                            color: "#3C1B1F",
                                                            backgroundColor: "#EACD65",
                                                            border: "solid #D29D2B 2px"
                                                        }}>
                                                        See All Reviews
                                                    </Button>
                                                </Link>
                                            </Stack>
                                        </Card>
                                    ))}
                                </>
                            } />
                    </Grid>
                </div>}
        </>
    )
}

export default MapAllEquipment