import Button from "@mui/material/Button";
import Card from "@mui/material/Card";
import Stack from "@mui/material/Stack";
import Typography from "@mui/material/Typography";
import { AspectRatio } from "@mui/joy";
import Carousel from "react-multi-carousel";
import "react-multi-carousel/lib/styles.css";

import { useGetEquipmentQuery } from "../../redux/api";
import { useGetSingleCategoryQuery } from "../../redux/api";

import { Link } from "react-router-dom";

import { motion } from 'framer-motion';

import { useParams } from "react-router";

const CategoryPage = () => {
    const { id } = useParams();
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
    const { data, error, isLoading } = useGetSingleCategoryQuery(id);
    const { data: equipmentData } = useGetEquipmentQuery();

    if (isLoading) {
        return <div> </div>;
    }
    if (error) {
        return <div>Sorry! Something went wrong loading the categories.</div>;
    }
    return (
        <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.5, ease: "easeIn" }}>
            <Card
                elevation={10}
                sx={{ m: 3, p: 3 }}>
                <Typography variant="h3" sx={{ color: "#205375", textAlign: "center", mb: 2 }}>
                    All {data.category} Kitchen Equipment
                </Typography>
                <Carousel
                    responsive={responsive}
                    swipeable={true}
                    draggable={true}
                    showDots={true}>
                    {equipmentData && equipmentData.filter((equipment) => equipment.categoryId === data.id).map((equipment) => (
                        <Card key={equipment.id}
                            sx={{ mb: 10 }}
                            elevation={10}
                            className="all-card"
                        >
                            <Stack direction="column">
                                <Typography sx={{ color: "#205375", fontSize: "30px", textAlign: "center", fontWeight: "bold" }}>
                                    {equipment.name}
                                </Typography>
                                <Typography variant="h6" sx={{ color: "#205375", fontSize: "16px", textAlign: "center" }}>
                                    {equipment.brand}
                                </Typography>
                                <AspectRatio objectFit="contain">
                                    <img
                                        src={equipment.image}
                                        alt={`${equipment.name} image`}
                                        width="100"
                                        height="100"
                                    />
                                </AspectRatio>
                                <Link to={`/equipment/${equipment.id}`} >
                                    <Typography sx={{ textAlign: "center" }}>
                                        <button
                                            className="see-all-button">
                                            See All Reviews
                                        </button>
                                    </Typography>
                                </Link>
                            </Stack>
                        </Card>
                    ))}
                </Carousel>
            </Card>
        </motion.div>
    )
}

export default CategoryPage