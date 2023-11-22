import Card from '@mui/material/Card';
import Typography from '@mui/material/Typography';

import {useGetCommentsQuery} from '../../redux/api';

const RenderComments = ({reviewId}) => {
    const {data, error} = useGetCommentsQuery();
    if (error) { return <div> {error.message} </div> }
    console.log(data);

    return (
        <>
            {data && data.filter(item => item.id === reviewId).map((comment) => (
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