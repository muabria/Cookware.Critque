import Card from '@mui/material/Card';
import Grid from "@mui/material/Grid"
import Typography from '@mui/material/Typography';
import CardHeader from '@mui/material/CardHeader';
import CardContent from '@mui/material/CardContent';
import Stack from "@mui/material/Stack";
import Rating from "@mui/material/Rating";
import CardMedia from '@mui/material/CardMedia';

import { useParams } from 'react-router';

import { useReviewByEquipmentQuery } from '../../redux/api';
import RenderComments from './RenderComments';

const PostsComments = () => {
    const { id } = useParams();
    const { data, error, isLoading } = useReviewByEquipmentQuery(id);
    if (isLoading) {
        return <div> Please Wait.. Still Loading</div>
    }
    if (error) {
        return <div> Sorry! There's a problem loading the reviews. </div>
    }
    console.log(data);

    return (
        <>
            <Grid container>

                {data && data.map((review) =>
                (
                    <>
                        {/* Would be nice to include equipment image */}
                        {/* <Card>
                    <CardMedia 
                         component="img"
                         height="194"
                         image=""
                         alt=""
                    /> */}
                        <Grid item xs={6}>
                            <Stack direction="row">
                            <Typography variant="h2" sx={{ color: "#205375", textAlign: "center", m: 1 }}>
                                {review.equipment.name}
                            </Typography>
                            <Rating
                                readOnly="true"
                                value={review.rating}
                                sx={{ alignContent: "center", m: 1 }}
                            />
                            </Stack>
                            {/* </Card> */}
                            <Card key={review.id}>
                                <CardHeader
                                    title={review.title}
                                    sx={{ color: "#205375", textAlign: "center", m: 1 }}
                                />
                                <CardContent>
                                    <Stack direction="column">
                                        <Typography sx={{ color: "#205375", textAlign: "center", m: 1 }}>
                                            {review.content}
                                        </Typography>
                                    </Stack>
                                </CardContent>
                            </Card>
                        </Grid>
                        <Grid item xs={6}>
                            <RenderComments reviewId={review.id} />
                        </Grid>
                    </>
                ))}
            </Grid>
        </>
    )
}

export default PostsComments