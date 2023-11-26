import Box from '@mui/material/Box';
import Card from '@mui/material/Card';
import CardHeader from '@mui/material/CardHeader';
import CardMedia from '@mui/material/CardMedia';
import CardContent from '@mui/material/CardContent';
import CardActions from '@mui/material/CardActions';
import Grid from '@mui/material/Grid';
import Stack from '@mui/material/Stack';
import IconButton from '@mui/material/IconButton';
import Typography from '@mui/material/Typography';
import FavoriteIcon from '@mui/icons-material/Favorite';
import ShareIcon from '@mui/icons-material/Share';
import MoreVertIcon from '@mui/icons-material/MoreVert';
import Button from '@mui/material/Button';

import { motion } from 'framer-motion';
import { useGetReviewsQuery } from '../redux/api';
import SearchBar from './SearchEquipment/SearchBar';

const AllPost = () => {
    const { data } = useGetReviewsQuery()
    console.log(data);

    return (
        <>
            <Box sx={{ maxHeight: "60px", backgroundColor: "#E7B10A", border: "solid #D29D2B 5px", borderRadius: "50px", mb: 3 }}>
                <Typography variant="h3" sx={{ textAlign: "center", color: "#205375" }}>
                    Explore Trusted Critiques Made from Real Users
                </Typography>
            </Box>
            <Box sx={{ mx: 10, mb: 1 }}>
                <SearchBar />
            </Box>
            <Box sx={{ mx: 5 }}>
                <div className="carousel">
                    <motion.div className="inner-carousel" drag="x" dragConstraints={{ right: 0, left: -300 }}>
                        <Stack direction="row">
                            {data && data.map((review) => (
                                <Grid container>
                                    <Grid xs={8}>
                                        <Card key={review.id}
                                            sx={{
                                                backgroundColor:"#F9FBE7",
                                                border: "solid #D29D2B 5px",
                                                borderRadius: 100,
                                                minWidth: 300,
                                                minHeight: 300,
                                                m: 5,
                                                p: 5,
                                            }}>
                                            <CardHeader sx={{ textAlign: "center", color: "#205375" }}
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
                                                <Typography variant="body2" sx={{ color: "#205375" }}>
                                                    {review.content}
                                                </Typography>
                                            </CardContent>
                                            <CardActions disableSpacing>
                                                <IconButton aria-label="add to favorites">
                                                    <FavoriteIcon />
                                                </IconButton>
                                                <IconButton aria-label="share">
                                                    <ShareIcon />
                                                </IconButton>
                                                <Button>See more</Button>
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
        </>
    );
}
export default AllPost