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

import { useMediaQuery, useTheme } from '@mui/material';

import { motion } from 'framer-motion';

import { Link } from 'react-router-dom';

import { useGetReviewsQuery } from '../../redux/api';

import SearchBar from '../SearchEquipment/SearchBar';

const AllPosts = () => {

    const theme = useTheme();
    const isMobile = useMediaQuery(theme.breakpoints.down("md"));

    const { data, error, isLoading } = useGetReviewsQuery()
    console.log(data);

    if (isLoading) {
        return <div> Please Wait.. Still Loading</div>
    }
    if (error) {
        return <div> Sorry! There's a problem loading the reviews. </div>
    }

    return (
        <>
            {isMobile ?
                <div>
                    <Box sx={{ maxHeight: "60px", mb: 3 }}>
                        <Typography
                            sx={{ textAlign: "center", color: "#205375" }}>
                            Explore Trusted Critiques Made from Real Users
                        </Typography>
                    </Box>
                    <Box sx={{ mb: 1 }}>
                        <SearchBar />
                    </Box>
                    <Box sx={{ mx: 5 }}>
                    <Typography
                        variant="h6"
                        sx={{
                            textAlign: "center",
                            color: "#205375",
                            my: 1,
                        }}>
                        See All Reviews
                    </Typography>
                        <div className="carousel">
                            <motion.div className="inner-carousel" drag="x" dragConstraints={{ right: 0, left: -1500 }}>
                                <Stack direction="row">
                                    {data && data.map((review) => (
                                        <Grid container key={review.id}>
                                            <Grid item xs={8}>
                                                <Card key={review.id}
                                                    sx={{
                                                        border: "solid #D29D2B 2px",
                                                        borderRadius: "10px",
                                                        minWidth: 200,
                                                        minHeight: 200,
                                                        m: 2
                                                    }}>
                                                    <Typography
                                                        variant="h6"
                                                        sx={{ textAlign: "center", color: "#205375", backgroundColor: "#EACD65" }}>
                                                        {review.title}
                                                    </Typography>
                                                    <Box sx={{ p: 1 }}>
                                                        <Typography variant="h8" sx={{ color: "#205375", fontFamily: "arial" }}>
                                                            {review.content}
                                                        </Typography>
                                                    </Box>
                                                    <CardActions disableSpacing>
                                                        <Link to={`/review/${review.id}`} >
                                                            <Button sx={{
                                                                mx: 3,
                                                                boxShadow: 3,
                                                                color: "#3C1B1F",
                                                                backgroundColor: "#EACD65",
                                                                border: "solid #D29D2B 2px"
                                                            }}>
                                                                Full Review
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
                </div>

                : //is NOT mobile...
                <div>
                    <Box sx={{ maxHeight: "60px", mb: 3 }}>
                        <Typography variant="h3" sx={{ textAlign: "center", color: "#205375" }}>
                            Explore Trusted Critiques Made from Real Users
                        </Typography>
                    </Box>
                    <Box sx={{ mx: 10, mb: 1 }}>
                        <SearchBar />
                    </Box>
                    <Typography
                        variant="h4"
                        sx={{
                            textAlign: "center",
                            color: "#205375",
                            my: 2,
                        }}>
                        See All Reviews
                    </Typography>
                    <Box sx={{ mx: 5 }}>
                        <div className="carousel">
                            <motion.div className="inner-carousel" drag="x" dragConstraints={{ right: 0, left: -3000 }}>
                                <Stack direction="row">
                                    {data && data.map((review) => (
                                        <Grid container key={review.id}>
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
                                                        title={review.title}>
                                                    </CardHeader>
                                                    <CardContent>
                                                        <Typography variant="h6" sx={{ color: "#205375" }}>
                                                            {review.content}
                                                        </Typography>
                                                    </CardContent>
                                                    <CardActions disableSpacing>
                                                        <Link to={`/review/${review.id}`} >
                                                            <Button sx={{
                                                                mt: 2,
                                                                ml: 7,
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
                </div>}

        </>
    );
}
export default AllPosts