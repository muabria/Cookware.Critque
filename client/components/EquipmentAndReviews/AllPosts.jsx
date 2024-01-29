import Box from '@mui/material/Box';
import Card from '@mui/material/Card';
import CardHeader from '@mui/material/CardHeader';
import CardContent from '@mui/material/CardContent';
import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';
import { useMediaQuery, useTheme } from "@mui/material";

import Carousel from "react-multi-carousel";
import "react-multi-carousel/lib/styles.css";

import { motion } from 'framer-motion';

import { Link } from 'react-router-dom';

import { useGetReviewsQuery } from '../../redux/api';

import SearchBar from './SearchEquipment/SearchBar';
import EquipmentName from './EquipmentName';
import MapAllEquipment from "./MapAllEquipment";

const AllPosts = () => {
    const theme = useTheme();
    const isMobile = useMediaQuery(theme.breakpoints.down("md"));

    const { data, error, isLoading } = useGetReviewsQuery()

    if (isLoading) {
        return <div> </div>
    }
    if (error) {
        return <div> Sorry! There's a problem loading the reviews. </div>
    }

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
    return (
        <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.5, ease: "easeIn" }}>
            {isMobile
                ?
                <div>
                    <Box sx={{ mx: 1, mb: 1 }}>
                        <SearchBar />
                    </Box>
                </div>
                ://is NOT mobile...
                <div>
                    <Box sx={{ mx: 10, mb: 1 }}>
                        <SearchBar />
                    </Box>
                </div>}
            <Card sx={{ p: 1, m: 5, border: 1, borderColor: "#205375" }}>
                <MapAllEquipment />
            </Card>
            <Card sx={{ p: 1, m: 5, border: 1, borderColor: "#205375" }}>
                <Typography
                    variant="h4"
                    sx={{ textAlign: "center", color: "#205375", mt: 1 }}>
                    All Reviews from Users
                </Typography>
                <Carousel
                    responsive={responsive}
                    swipeable={true}
                    draggable={true}
                    showDots={true}>
                    {data && data.map((review) => (
                        <Card key={review.id}
                            sx={{
                                boxShadow: 3,
                                backgroundColor: "#F9FBE7",
                                border: "solid #D29D2B 2px",
                                borderRadius: "10px",
                                width: 300,
                                minHeight: 300,
                                mx: 1,
                                my: 5
                            }}>
                            <CardHeader sx={{ textAlign: "center", color: "#205375", backgroundColor: "#EACD65" }}
                                title={review.title} />
                            <CardContent>
                                <Typography variant="h6" sx={{ color: "#205375" }}>
                                    {review.content}
                                </Typography>
                                <EquipmentName equipmentId={review.equipmentId} />
                            </CardContent>
                            <Typography sx={{ textAlign: "center" }}>
                                <Link to={`/review/${review.id}`} >
                                    <Button
                                        sx={{
                                            textTransform: "none",
                                            my: 1,
                                            boxShadow: 3,
                                            color: "#3C1B1F",
                                            backgroundColor: "#EACD65",
                                            border: "solid #D29D2B 2px"
                                        }}>
                                        See the Full Review
                                    </Button>
                                </Link>
                            </Typography>
                        </Card>
                    ))}
                </Carousel>
            </Card>
        </motion.div>
    );
}
export default AllPosts

