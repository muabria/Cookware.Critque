import Card from '@mui/material/Card';
import Typography from '@mui/material/Typography';

import {useGetCommentsQuery} from '../../redux/api';

const RenderComments = ({reviewId}) => {
    const {data, error, isLoading} = useGetCommentsQuery();

    if (isLoading) { 
        return <div> Please Wait.. Still Loading</div> 
    }
    if (error) { 
        return <div> There's a problem loading the comments. </div> 
    }
    console.log(data);

    return (
        <>
            {data && data.filter(item => item.id === reviewId).map((comment) => (
                <Card key={comment.id} sx={{ p:2 }}>
                    <Typography>
                        {comment.content}
                    </Typography>
                </Card>
            ))}
        </>
    )
}

export default RenderComments