import Card from '@mui/material/Card';
import Grid from "@mui/material/Grid"
import Typography from '@mui/material/Typography';
import CardHeader from '@mui/material/CardHeader';
import CardContent from '@mui/material/CardContent';
import Stack from "@mui/material/Stack";
import Rating from "@mui/material/Rating";
import CardMedia from '@mui/material/CardMedia';

import { useParams } from 'react-router';

import { useGetSingleReviewQuery} from '../../redux/api';
import RenderComments from './RenderComments';

const PostsWithComments = () => {
    const { id } = useParams();
    const { data, error, isLoading } = useGetSingleReviewQuery(id);
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
                                {data.name}
                            </Typography>
                            <Rating
                                readOnly="true"
                                value={data.rating}
                                sx={{ alignContent: "center", m: 1 }}
                            />
                            </Stack>
                            {/* </Card> */}
                            <Card key={data.id}>
                                <CardHeader
                                    title={data.title}
                                    sx={{ color: "#205375", textAlign: "center", m: 1 }}
                                />
                                <CardContent>
                                    <Stack direction="column">
                                        <Typography sx={{ color: "#205375", textAlign: "center", m: 1 }}>
                                            {data.content}
                                        </Typography>
                                    </Stack>
                                </CardContent>
                            </Card>
                        </Grid>
                        <Grid item xs={6}>
                            <RenderComments reviewId={data.id} />
                        </Grid>
            </Grid>
        </>
    )
}

export default PostsWithComments