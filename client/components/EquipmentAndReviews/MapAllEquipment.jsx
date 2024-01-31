import Card from "@mui/material/Card";
import { CardContent } from "@mui/joy";
import Typography from "@mui/material/Typography";
import Stack from "@mui/material/Stack";
import Box from "@mui/material/Box";
import AspectRatio from '@mui/joy/AspectRatio';

import Carousel from "react-multi-carousel";
import "react-multi-carousel/lib/styles.css";

import { Link } from "react-router-dom";

import { useGetEquipmentQuery } from "../../redux/api"

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
        return <div> </div>
    }
    if (error) {
        return <div> Sorry! There's a problem loading the equipment. </div>
    }
    console.log(data);

    return (
        <>
            <Typography
                variant="h3"
                sx={{ textAlign: "center", color: "#205375", mt: 1, fontWeight: "bold", mb: 3 }}>
                See All Equipment
            </Typography>
            <Carousel
                responsive={responsive}
                swipeable={true}
                draggable={true}
                showDots={true}>
                {data && data.map((equipment) => (
                    <Card
                        className="all-card"
                        elevation={10}
                        key={equipment.id}
                        sx={{ mb: 5, minHeight: 380 }}>
                        <Stack direction="column">
                            <Typography
                                variant="h5"
                                sx={{ m: 1, textAlign: "center", color: "#205375", fontWeight: "bold" }}>
                                {equipment.name}
                            </Typography>
                            <Typography
                                sx={{ textAlign: "center", color: "#205375" }}>
                                from {equipment.brand}
                            </Typography>
                            <Box sx={{ m: 2 }}>
                                <AspectRatio
                                    objectFit="contain">
                                    <img
                                        src={equipment.image}
                                        alt={`${equipment.name} image`}
                                        width="130"
                                        height="130"
                                    />
                                </AspectRatio>
                            </Box>
                            <CardContent>
                                <Link to={`/equipment/${equipment.id}`}>
                                    <button className="see-all-button">
                                        See All Reviews
                                    </button>
                                </Link>
                            </CardContent>
                        </Stack>
                    </Card>
                ))}
            </Carousel>
        </>
    )
}

export default MapAllEquipment