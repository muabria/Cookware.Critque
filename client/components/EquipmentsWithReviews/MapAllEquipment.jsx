import Card from "@mui/material/Card";
import Typography from "@mui/material/Typography";
import Stack from "@mui/material/Stack";
import Button from "@mui/material/Button";
import Box from "@mui/material/Box";
import AspectRatio from '@mui/joy/AspectRatio';


import Carousel from "react-multi-carousel";
import "react-multi-carousel/lib/styles.css";

import { Link } from "react-router-dom";

import { useGetEquipmentQuery } from "../../redux/api"
import LoadingMessage from "../ErrorMessages/LoadingMessage";

const MapAllEquipment = () => {

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
        return <div><LoadingMessage /></div>
    }
    if (error) {
        return <div> Sorry! There's a problem loading the equipment. </div>
    }
    console.log(data);

    return (
        <>
            <Typography
                variant="h4"
                sx={{ textAlign: "center", color: "#205375", mt: 1 }}>
                See All Equipment
            </Typography>
            <Carousel
                responsive={responsive}
                swipeable={true}
                draggable={true}
                showDots={true}>
                {data && data.map((equipment) => (
                    <Card
                        key={equipment.id}
                        sx={{
                            width: 300,
                            minHeight: 300,
                            my: 5,
                            mx: 2,
                            color: "#205375",
                            backgroundColor: "#F9FBE7",
                            border: "solid #D29D2B 2px"
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
                            <Box sx={{ m: 2 }}>
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
                                <Typography sx={{ textAlign: "center" }}>
                                    <Button
                                        sx={{
                                            textTransform: "none",
                                            my: 2,
                                            boxShadow: 3,
                                            color: "#3C1B1F",
                                            backgroundColor: "#EACD65",
                                            border: "solid #D29D2B 2px"
                                        }}>
                                        See All Reviews
                                    </Button>
                                </Typography>
                            </Link>
                        </Stack>
                    </Card>
                ))}
            </Carousel>
        </>
    )
}

export default MapAllEquipment