import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import Card from "@mui/material/Card";
import Grid from "@mui/material/Grid"
import Stack from "@mui/material/Stack";
import Typography from "@mui/material/Typography";
import ArrowCircleLeftIcon from '@mui/icons-material/ArrowCircleLeft';
import ArrowCircleRightIcon from '@mui/icons-material/ArrowCircleRight';
import { useMediaQuery, useTheme } from "@mui/material";
import { AspectRatio } from "@mui/joy";

import { useGetEquipmentQuery } from "../../redux/api";
import { useGetSingleCategoryQuery } from "../../redux/api";

import { useState, useRef } from "react";
import { Link } from "react-router-dom";

import { motion } from 'framer-motion';

import { useParams } from "react-router";

import LoadingMessage from "../ErrorMessages/LoadingMessage"
import SlideShow from "../SlideShow";

const CategoryPage = () => {
    const [scrollItem, setscrollItem] = useState(0);
    const ref = useRef();

    const { id } = useParams();

    const theme = useTheme();
    const isMobile = useMediaQuery(theme.breakpoints.down("md"));

    const { data, error, isLoading } = useGetSingleCategoryQuery(id);
    const { data: equipmentData, error: equipmentError, isLoading: equipmetLoading } = useGetEquipmentQuery();

    if (isLoading) {
        return <div><LoadingMessage /></div>;
    }
    if (error) {
        return <div>Sorry! Something went wrong loading the categories.</div>;
    }

    const handleScroll = (movementAmount) => {
        const newscrollItem = scrollItem + movementAmount;
        setscrollItem(newscrollItem);
        ref.current.scrollLeft = newscrollItem;
    };

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
                    <Button
                        sx={{ ml: 3, mr: 10 }}
                        onClick={() => handleScroll(-250)}>
                        <ArrowCircleLeftIcon />
                    </Button>
                    <Button
                        sx={{ mr: 3, ml: 10 }}
                        onClick={() => handleScroll(250)}>
                        <ArrowCircleRightIcon />
                    </Button>

                    <div
                        ref={ref}
                        style={{ overflowX: "scroll", scrollBehavior: "smooth" }}>
                        <Box sx={{ width: "80px" }}>
                            <Stack direction="row">
                                {equipmentData && equipmentData.filter((equipment) => equipment.categoryId === data.id).map((equipment) => (
                                    <Card key={equipment.id}
                                        sx={{
                                            backgroundColor: "#F9FBE7",
                                            border: "solid #D29D2B 5px",
                                            borderRadius: "10px",
                                            minWidth: 200,
                                            minHeight: 200,
                                            maxWidth: 200,
                                            maxHeight: 200,
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
                            </Stack>
                        </Box>
                    </div>
                </div>
                ://is NOT mobile...
                <div>
                    <Typography variant="h3" sx={{ color: "#205375", textAlign: "center", mb: 2 }}>
                        All {data.category} Kitchen Equipment
                    </Typography>
                    <SlideShow
                        content={
                            <>
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
                                            <Typography variant="h6" sx={{ color: "#205375", fontSize: "12px", textAlign: "center" }}>
                                                {equipment.name}
                                            </Typography>
                                            <Typography variant="h6" sx={{ color: "#205375", fontSize: "11px", textAlign: "center" }}>
                                                {equipment.brand}
                                            </Typography>
                                            <Box sx={{maxHeight: 200}}>
                                                <AspectRatio objectFit="contain">
                                                    <img
                                                        src={equipment.image}
                                                        alt={`${equipment.name} image`}
                                                        width="100"
                                                        height="100"
                                                    />
                                                </AspectRatio>
                                            </Box>
                                            <Link to={`/equipment/${equipment.id}`} >
                                                <Button
                                                    sx={{
                                                        mt: 2,
                                                        mx: 4,
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
                        }
                    />
                </div>}
        </motion.div>
    )
}

export default CategoryPage