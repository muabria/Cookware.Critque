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

import { useGetReviewsQuery } from './redux/api';

const AllPost = () => {
    const { data } = useGetReviewsQuery()
    console.log(data);

    return (
        <>
            <Box sx={{ mx: 5}}>
                <Stack direction="row">
                    {data && data.map((review) => (
                        <Grid container>
                            <Grid xs={8}>
                                <Card key={review.id}>
                                    <CardHeader
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
                                        <Typography variant="body2" color="text.secondary">
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
            </Box>
        </>
    );
}
export default AllPost