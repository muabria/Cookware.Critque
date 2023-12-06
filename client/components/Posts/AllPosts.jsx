import Box from '@mui/material/Box';
import Card from '@mui/material/Card';
import CardHeader from '@mui/material/CardHeader';
import CardContent from '@mui/material/CardContent';
import CardActions from '@mui/material/CardActions';
import Grid from '@mui/material/Grid';
import Stack from '@mui/material/Stack';
import IconButton from '@mui/material/IconButton';
import Typography from '@mui/material/Typography';
import FavoriteIcon from '@mui/icons-material/Favorite';
import ShareIcon from '@mui/icons-material/Share';
import Button from '@mui/material/Button';

import { motion } from 'framer-motion';

import { Link } from 'react-router-dom';

import { useGetReviewsQuery } from '../../redux/api';

import SearchBar from '../SearchEquipment/SearchBar';
import LoadingMessage from '../ErrorMessages/LoadingMessage';

const AllPosts = () => {
    const { data, error, isLoading } = useGetReviewsQuery()

    if (isLoading) {
        return <div><LoadingMessage/></div>
    }
    if (error) {
        return <div> Sorry! There's a problem loading the reviews. </div>
    }

    return (
        <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.5, ease: "easeIn" }}>
            <Box sx={{ maxHeight: "60px", mb: 3 }}>
                <Typography variant="h3" sx={{ textAlign: "center", color: "#205375" }}>
                    Explore Trusted Critiques Made from Real Users
                </Typography>
            </Box>
            <Box sx={{ mx: 10, mb: 1 }}>
                <SearchBar />
            </Box>
            <Box sx={{ mx: 5 }}>
                <div className="carousel">
                    <motion.div className="inner-carousel" drag="x" dragConstraints={{ right: 0, left: -2800 }}>
                        <Stack direction="row">
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
                                            {/* <CardMedia
                                                component=" "
                                                height="194"
                                                image=""
                                                alt="Equipment Picture"
                                            /> */}
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
                                                            ml: 8,
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
                                    </Grid>
                                </Grid>
                            ))
                            }
                        </Stack>
                    </motion.div>
                </div>
            </Box>
        </motion.div>
    );
}
export default AllPosts 