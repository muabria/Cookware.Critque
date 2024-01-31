import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import Typography from '@mui/material/Typography';
import { useMediaQuery, useTheme } from "@mui/material";

import Carousel from "react-multi-carousel";
import "react-multi-carousel/lib/styles.css";

import { motion } from 'framer-motion';

import { Link } from 'react-router-dom';

import { useGetReviewsQuery } from '../../redux/api';

import EquipmentName from './EquipmentName';

const MapAllReviews = () => {
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
                    <Card
                        key={review.id}
                        elevation={10}
                        className="all-card"
                        sx={{ mb: 10 }}>
                        <Typography
                            variant="h5"
                            sx={{ m: 1, textAlign: "center", color: "#205375", fontWeight: "bold" }}>
                            {review.title}
                        </Typography>
                        <Typography
                            variant="h6"
                            sx={{ color: "#205375", mx: 3 }}>
                            {review.content}
                        </Typography>
                        <EquipmentName equipmentId={review.equipmentId} />
                        <CardContent>
                            <Link to={`/review/${review.id}`} >
                                <button className='see-all-button'>
                                    See Full Review
                                </button>
                            </Link>
                        </CardContent>
                    </Card>
                ))}
            </Carousel>
        </motion.div>
    );
}
export default MapAllReviews

