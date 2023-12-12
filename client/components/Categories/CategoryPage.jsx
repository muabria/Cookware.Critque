import Button from "@mui/material/Button";
import Card from "@mui/material/Card";
import Stack from "@mui/material/Stack";
import Typography from "@mui/material/Typography";
import Carousel from "react-multi-carousel";
import "react-multi-carousel/lib/styles.css";

import { useGetEquipmentQuery } from "../../redux/api";
import { useGetSingleCategoryQuery } from "../../redux/api";

import { Link } from "react-router-dom";

import { motion } from 'framer-motion';

import { useParams } from "react-router";

import LoadingMessage from "../ErrorMessages/LoadingMessage"

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
    const { data: equipmentData, error: equipmentError, isLoading: equipmetLoading } = useGetEquipmentQuery();

    if (isLoading) {
        return <div><LoadingMessage /></div>;
    }
    if (error) {
        return <div>Sorry! Something went wrong loading the categories.</div>;
    }

    return (
        <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.5, ease: "easeIn" }}>
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
                        sx={{
                            backgroundColor: "#F9FBE7",
                            border: "solid #D29D2B 5px",
                            borderRadius: "10px",
                            width: 300,
                            minHeight: 300,
                            m: 1,
                            p: 1,
                        }}>
                        <Stack direction="column">
                            <Typography sx={{ color: "#205375", fontSize: "12px", textAlign: "center" }}>
                                {equipment.name}
                            </Typography>
                            <Typography variant="h6" sx={{ color: "#205375", fontSize: "11px", textAlign: "center" }}>
                                {equipment.brand}
                            </Typography>
                            <img
                                src={equipment.image}
                                alt={`${equipment.name} image`}
                                width="100"
                                height="100"
                            />
                            <Link to={`/equipment/${equipment.id}`} >
                                <Typography sx={{ textAlign: "center" }}>
                                    <Button
                                        sx={{
                                            textTransform: "none",
                                            mt: 2,
                                            ml: 3,
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
        </motion.div>
    )
}

export default CategoryPage