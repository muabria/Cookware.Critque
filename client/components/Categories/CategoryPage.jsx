import Button from "@mui/material/Button";
import Card from "@mui/material/Card";
import Stack from "@mui/material/Stack";
import Typography from "@mui/material/Typography";
import { useMediaQuery, useTheme } from "@mui/material";

import { useGetEquipmentQuery } from "../../redux/api";
import { useGetSingleCategoryQuery } from "../../redux/api";

import { Link } from "react-router-dom";

import { motion } from 'framer-motion';

import { useParams } from "react-router";


import LoadingMessage from "../ErrorMessages/LoadingMessage"

const CategoryPage = () => {

    const { id } = useParams();

    const theme = useTheme();
    const isMobile = useMediaQuery(theme.breakpoints.down("md"));

    const { data, error, isLoading } = useGetSingleCategoryQuery(id);
    const { data: equipmentData, error: equipmentError, isLoading: equipmetLoading } = useGetEquipmentQuery();

    if (!data) {
        return <div>Error 404: Data not found. Maybe it's hiding in the pantry...</div>
    }
    if (isLoading) {
        return <div><LoadingMessage/></div>;
    }
    if (error) {
        return <div>Sorry! Something went wrong loading the categories.</div>;
    }

    return (
        <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.5, ease: "easeIn" }}>
            {isMobile ?
                <div>
                    <Typography variant="h3" sx={{ color: "#205375", textAlign: "center", mb: 2 }}>
                        All {data.category} Kitchen Equipment
                    </Typography>
                    <div className="carousel">
                        <motion.div className="inner-carousel" drag="x" dragConstraints={{ right: 0, left: -300 }}>
                            {equipmentData && equipmentData.filter((equipment) => equipment.categoryId === data.id).map((equipment) => (
                                <Card key={equipment.id}
                                    sx={{
                                        backgroundColor: "#F9FBE7",
                                        border: "solid #D29D2B 5px",
                                        borderRadius: "10px",
                                        minWidth: 220,
                                        minHeight: 220,
                                        maxWidth: 220,
                                        maxHeight: 220,
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
                                        </Link>
                                    </Stack>
                                </Card>
                            ))}
                        </motion.div>
                    </div>
                </div>
                ://is NOT mobile...
                <div>
                    <Typography variant="h3" sx={{ color: "#205375", textAlign: "center", mb: 2 }}>
                        All {data.category} Kitchen Equipment
                    </Typography>
                    <div className="carousel">
                        <motion.div className="inner-carousel" drag="x" dragConstraints={{ right: 0, left: -300 }}>
                            {equipmentData && equipmentData.filter((equipment) => equipment.categoryId === data.id).map((equipment) => (
                                <Card key={equipment.id}
                                    sx={{
                                        backgroundColor: "#F9FBE7",
                                        border: "solid #D29D2B 5px",
                                        borderRadius: "10px",
                                        minWidth: 200,
                                        minHeight: 200,
                                        m: 5,
                                        p: 5,
                                    }}>
                                    <Stack direction="column">
                                        <Typography variant="h5" sx={{ color: "#205375", textAlign: "center", mb: 2 }}>
                                            {equipment.name}
                                        </Typography>
                                        <Typography variant="h6" sx={{ color: "#205375", textAlign: "center", mb: 2 }}>
                                            {equipment.brand}
                                        </Typography>
                                        <img
                                            src={equipment.image}
                                            alt={`${equipment.name} image`}
                                            width="200"
                                            height="200"
                                        />
                                        <Link to={`/equipment/${equipment.id}`} >
                                            <Button
                                                sx={{
                                                    my: 2,
                                                    ml: 8,
                                                    boxShadow: 3,
                                                    color: "#3C1B1F",
                                                    backgroundColor: "#EACD65",
                                                    border: "solid #D29D2B 2px"
                                                }}>
                                                See the {equipment.name}'s Reviews
                                            </Button>
                                        </Link>
                                    </Stack>
                                </Card>
                            ))}
                        </motion.div>
                    </div>
                </div>}
        </motion.div>
    )
}

export default CategoryPage