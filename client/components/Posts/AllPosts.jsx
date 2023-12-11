import Box from '@mui/material/Box';
import Card from '@mui/material/Card';
import CardHeader from '@mui/material/CardHeader';
import CardContent from '@mui/material/CardContent';
import CardActions from '@mui/material/CardActions';
import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';
import Grid from "@mui/material/Grid";
import { useMediaQuery, useTheme } from "@mui/material";

import { motion } from 'framer-motion';

import { Link } from 'react-router-dom';

import { useGetReviewsQuery } from '../../redux/api';

import SearchBar from '../SearchEquipment/SearchBar';
import LoadingMessage from '../ErrorMessages/LoadingMessage';
import SlideShow from '../SlideShow';
import EquipmentName from './EquipmentName';
import MapAllEquipment from '../EquipmentsWithReviews/MapAllEquipment';

const AllPosts = () => {
    const theme = useTheme();
    const isMobile = useMediaQuery(theme.breakpoints.down("md"));

    const { data, error, isLoading } = useGetReviewsQuery()
    //const { data: equipmentData, error: equipmentError, isLoading: equipmentLoading } = useGetEquipmentQuery();
    
    if (isLoading) {
        return <div><LoadingMessage /></div>
    }
    if (error) {
        return <div> Sorry! There's a problem loading the reviews. </div>
    }

    // const findEquipment = (post) => {
    //     let currentEquipment;
    //     currentEquipment = equipmentData.find((equipment) => {
    //         return equipment.id === post.equipmentId
    //     })
    //     return <Typography align='center' sx={{color: '#8F8F8F'}}>{currentEquipment.name}</Typography>
    // }

    return (
        <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.5, ease: "easeIn" }}>
            <Box sx={{ maxHeight: "60px", mb: 3 }}>
                <Typography variant="h4" sx={{ textAlign: "center", color: "#205375", mt: 10 }}>
                    Explore Trusted Critiques Made from Real Users
                </Typography>
            </Box>
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
            {isMobile
                ?
                <div>
                    <Box sx={{ mx: 2 }}>
                        <SlideShow
                            content={
                                <>
                                    {data && data.map((review) => (
                                        <Card key={review.id}
                                            sx={{
                                                boxShadow: 3,
                                                backgroundColor: "#F9FBE7",
                                                border: "solid #D29D2B 2px",
                                                borderRadius: "10px",
                                                minWidth: 200,
                                                maxHeight: 300,
                                                m: 1,
                                            }}>
                                            <CardHeader sx={{ textAlign: "center", color: "#205375", backgroundColor: "#EACD65" }}
                                                title={review.title} />
                                            <CardContent>
                                                <Typography variant="h6" sx={{ color: "#205375" }}>
                                                    {review.content}
                                                </Typography>
                                            </CardContent>
                                            <CardActions>
                                                <Link to={`/review/${review.id}`} >
                                                    <Button
                                                        sx={{
                                                            my: 1,
                                                            boxShadow: 3,
                                                            color: "#3C1B1F",
                                                            backgroundColor: "#EACD65",
                                                            border: "solid #D29D2B 2px"
                                                        }}>
                                                        See the Full Review
                                                    </Button>
                                                </Link>
                                            </CardActions>
                                        </Card>
                                    ))
                                    }
                                </>
                            }
                        />
                    </Box>
                </div>
                :// is NOT mobile...
                <div>
                    <SlideShow
                        content={
                            <>
                                {data && data.map((review) => (
                                    <Grid container key={review.id} >
                                        <Grid item xs={8}>
                                            <Card key={review.id}
                                                sx={{
                                                    boxShadow: 3,
                                                    backgroundColor: "#F9FBE7",
                                                    border: "solid #D29D2B 2px",
                                                    borderRadius: "10px",
                                                    minWidth: 300,
                                                    minHeight: 300,
                                                    m: 5,
                                                }}>
                                                <CardHeader sx={{ textAlign: "center", color: "#205375", backgroundColor: "#EACD65" }}
                                                    title={review.title}
                                                // subheader="TO DO"
                                                />
                                                <CardContent>
                                                    <Typography variant="h6" sx={{ color: "#205375" }}>
                                                        {review.content}
                                                    </Typography>
                                                </CardContent>
                                                <CardActions disableSpacing>
                                                    {/* <IconButton aria-label="add to favorites">
                                                    <FavoriteIcon />
                                                </IconButton>
                                                <IconButton aria-label="share">
                                                    <ShareIcon />
                                                </IconButton> */}
                                                    <Link to={`/review/${review.id}`} >
                                                        <Button
                                                            sx={{
                                                                my: 2,
                                                                mx: 6,
                                                                boxShadow: 3,
                                                                color: "#3C1B1F",
                                                                backgroundColor: "#EACD65",
                                                                border: "solid #D29D2B 2px"
                                                            }}>
                                                            See the Full Review
                                                        </Button>
                                                    </Link>
                                                </CardActions>
                                                <EquipmentName equipmentId={review.equipmentId} />
                                                {/* {findEquipment(review.id)} */}
                                            </Card>
                                        </Grid>
                                    </Grid>
                                ))
                                }
                            </>
                        }
                    />
                </div>}
            </motion.div>
    );
}
export default AllPosts 