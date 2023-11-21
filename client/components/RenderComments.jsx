import Card from '@mui/material/Card';
import Typography from '@mui/material/Typography';

import {useCommentsByReviewQuery} from '../redux/api';
import { useParams } from 'react-router';

const RenderComments = ({reviewId}) => {
    const {reviewId} = useParams();
    const {data, error} = useCommentsByReviewQuery(reviewId);
    if (error) { return <div> {error.message} </div> }
    console.log(data);

    return (
        <>
            {data && data.map((comment) => (
                <Card key={comment.id}>
                    <Typography>
                        {comment.content}
                    </Typography>
                </Card>
            ))}
        </>
    )
}

export default RenderComments