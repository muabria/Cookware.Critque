import Button from "@mui/material/Button"
import Card from '@mui/material/Card';
import Grid from "@mui/material/Grid"
import Typography from '@mui/material/Typography';
import CardHeader from '@mui/material/CardHeader';
import CardContent from '@mui/material/CardContent';
import Stack from "@mui/material/Stack";
import Rating from "@mui/material/Rating";

import { useState } from "react";
import { useParams } from 'react-router';

import { useGetSingleReviewQuery } from '../../redux/api';
import { useGetCommentsQuery } from '../../redux/api';

import CommentForm from "./CommentForm";

const PostsWithComments = () => {
    const [addComment, setAddComment] = useState(false);

    const { id } = useParams();
    const { data, error, isLoading } = useGetSingleReviewQuery(id);
    const { data: commentData, error: commentError, isLoading: commentLoading } = useGetCommentsQuery();

    if (isLoading) {
        return <div> Please Wait.. Still Loading</div>
    }
    if (error) {
        return <div> Sorry! There's a problem loading the reviews. </div>
    }
    console.log(data);
    console.log(commentData);

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
                    <Card key={data.id}>
                        <Stack direction="row">
                            <Typography variant="h2" sx={{ color: "#205375", textAlign: "center", m: 1 }}>
                                {data.title}
                            </Typography>
                            <Rating
                                readOnly="true"
                                value={data.rating}
                                sx={{ alignContent: "center", m: 1 }}
                            />
                        </Stack>
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
                    <Card sx={{ backgroundColor: "#8da6a9", p: 2 }}>
                        <Typography variant="h5" sx={{ textAlign: "center", color: "#205375" }}>
                            Comments:
                        </Typography>
                        {commentData && commentData.filter(comment => comment.postId === data.id).map((comment) => (
                            <Card key={comment.id} sx={{ p: 2 }}>
                                <Typography>
                                    {comment.content}
                                </Typography>
                            </Card>
                        ))}
                    </Card>
                    <Button
                        onClick={() => setAddComment(true)}>
                        Add a Comment
                    </Button>
                    {addComment && <CommentForm />}

                </Grid>
            </Grid>
        </>
    )
}

export default PostsWithComments