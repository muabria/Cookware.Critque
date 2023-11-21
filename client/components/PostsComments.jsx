import Card from '@mui/material/Card';
import Typography from '@mui/material/Typography';
import CardHeader from '@mui/material/CardHeader';
import CardContent from '@mui/material/CardContent';
import Stack from "@mui/material/Stack";
import Rating from "@mui/material/Rating";

import { useParams } from 'react-router';
import {useState} from 'react';

import { useReviewByEquipmentQuery } from '../redux/api';
import RenderComments from './RenderComments'

const PostsComments = () => {
    const { id } = useParams();
    const { data, error, isLoading } = useReviewByEquipmentQuery(id);
    if (isLoading) { return <div> Please Wait.. Still Loading</div> }
    if (error) { return <div> {error.message} </div> }
    console.log(data);
    const [reviewId, setReviewId] = useState(null);

    return (
        <>
            {data && data.map((review) => (
                <>
                    <Card key={review.id}>
                        <CardHeader
                            title={review.title}
                        />
                        <CardContent>
                            <Typography>
                                {review.content}
                            </Typography>

                            {/* Change to stop responding to hover */}
                            <Stack direction="row">
                                <Rating
                                    value={review.rating}
                                />
                            </Stack>
                        </CardContent>
                    </Card>
                    {setReviewId(review.id)}
                    <RenderComments reviewId={reviewId} />
                </>
            ))}
        </>
    )
}

export default PostsComments