import Card from '@mui/material/Card';
import Typography from '@mui/material/Typography';

import { useReviewByEquipmentQuery } from '../redux/api';

const PostsComments = () => {
    const { data, error, isLoading } = useReviewByEquipmentQuery();
    if (isLoading) { return <div> Please Wait.. Still Loading</div> }
    if (error) { return <div> {error.message} </div> }
    console.log(data);

    return (
        <>
            {data && data.map((review) => (
                <>
                    <Card key={review.id}>
                        <Typography>
                            {review.title}
                        </Typography>
                    </Card>
                </>
            ))}
        </>
    )
}

export default PostsComments