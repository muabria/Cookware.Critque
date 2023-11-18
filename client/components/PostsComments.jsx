import Card from '@mui/material/Card';
import Typography from '@mui/material/Typography';

import { useGetReviewsQuery } from '../redux/api';

const PostsComments = () => {
    const { data, error, isLoading } = useGetReviewsQuery();
    if (isLoading) { return <div> Please Wait.. Still Loading</div> }
    if (error) { return <div> {error.message} </div> }
    console.log(data);

    //need to only show reviews for current equipment
    return (
        <>
            {data && data.filter().map((review) => (
                <>
                    <Card key={review.id}>
                        <Typography>
                            {review.title}
                        </Typography>
                    </Card>
                    {data.comments.map((comment) => (
                        <Card key={comment.id}>
                            <Typography>
                                {comment.content}
                            </Typography>
                        </Card>
                    ))}
                </>
            ))}
        </>
    )
}