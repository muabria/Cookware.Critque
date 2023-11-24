import Card from '@mui/material/Card';
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
    if (isLoading) { return <div> Please Wait.. Still Loading</div> }
    if (error) { return <div> Sorry! There's a problem loading the reviews. </div> }
    console.log(data);

    return (
        <>
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
                    <Typography variant="h2">
                        {review.equipment.name}
                    </Typography>
                {/* </Card> */}
                    <Card key={review.id}>
                        <CardHeader
                            title={review.title}
                        />
                        <CardContent>
                            <Stack direction="column">
                                <Typography>
                                    {review.content}
                                </Typography>
                                <Rating
                                    readOnly="true"
                                    value={review.rating}
                                />
                            </Stack>
                        </CardContent>
                    </Card>
                    <RenderComments reviewId={review.id} />
                </>
            ))}
        </>
    )
}

export default PostsComments