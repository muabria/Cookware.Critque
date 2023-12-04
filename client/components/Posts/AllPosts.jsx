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
                    <Box sx={{ mx: 10, mb: 1 }}>
                        <SearchBar />
                    </Box>
                    <Box sx={{ mx: 5 }}>
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
                                                        variant="h5"
                                                        sx={{ textAlign: "center", color: "#205375", backgroundColor: "#EACD65" }}>
                                                        {review.title}
                                                    </Typography>
                                                    <Box sx={{ p: 1 }}>
                                                        <Typography variant="h6" sx={{ color: "#205375" }}>
                                                            {review.content}
                                                        </Typography>
                                                    </Box>
                                                    <CardActions disableSpacing>
                                                        <Link to={`/review/${review.id}`} >
                                                            <Button sx={{ mx: 3 }}>
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
                    <Box sx={{ mx: 5 }}>
                        <div className="carousel">
                            <motion.div className="inner-carousel" drag="x" dragConstraints={{ right: 0, left: -3000 }}>
                                <Stack direction="row">
                                    {data && data.map((review) => (
                                        <Grid container key={review.id}>
                                            <Grid item xs={8}>
                                                <Card key={review.id}
                                                    sx={{
                                                        backgroundColor: "#F9FBE7",
                                                        border: "solid #D29D2B 5px",
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
                                                            <Button sx={{ m: 1 }}>
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