import Card from '@mui/material/Card';
import Typography from '@mui/material/Typography';

import { useGetCommentsQuery } from '../../redux/api';

const RenderComments = ({ reviewId }) => {
    const { data, error, isLoading } = useGetCommentsQuery();

    if (isLoading) {
        return <div> Please Wait.. Still Loading</div>
    }
    if (error) {
        return <div> There's a problem loading the comments. </div>
    }
    console.log(data);

    return (
        <>
            <Card sx={{ backgroundColor: "#8da6a9", p: 2 }}>
                <Typography variant="h5" sx={{ textAlign:"center", color: "#205375"}}>
                    Comments:
                </Typography>
                {data && data.filter(item => item.id === reviewId).map((comment) => (
                    <Card key={comment.id} sx={{ p: 2 }}>
                        <Typography>
                            {comment.content}
                        </Typography>
                    </Card>
                ))}
            </Card>
        </>
    )
}

export default RenderComments