import Button from "@mui/material/Button"
import Card from '@mui/material/Card';
import Grid from "@mui/material/Grid"
import Typography from '@mui/material/Typography';
import CardContent from '@mui/material/CardContent';
import Stack from "@mui/material/Stack";
import Rating from "@mui/material/Rating";
import RateReviewIcon from '@mui/icons-material/RateReview';

import { motion } from "framer-motion";

import { useMediaQuery, useTheme } from "@mui/material";

import { useState } from "react";
import { useParams } from 'react-router';

import { useGetSingleReviewQuery, useGetEquipmentQuery } from '../../redux/api';
import { useGetCommentsQuery } from '../../redux/api';

import CommentForm from "./CommentForm";
import LoadingMessage from "../ErrorMessages/LoadingMessage";

const PostsWithComments = () => {
    const [addComment, setAddComment] = useState(false);

    const theme = useTheme();
    const isMobile = useMediaQuery(theme.breakpoints.down("md"));

    const { id } = useParams();
    const { data, error, isLoading } = useGetSingleReviewQuery(id);
    const { data: commentData, error: commentError, isLoading: commentLoading } = useGetCommentsQuery();
    const { data: equipmentData, error: equipmentError, isLoading: equipmentLoading } = useGetEquipmentQuery();

    if (isLoading) {
        return <div><LoadingMessage/></div>
    }
    if (error) {
        return <div> Sorry! There's a problem loading the reviews. </div>
    }

    const currentEquipment = equipmentData.find((equipment) => {return equipment.id === data.equipmentId})

    return (
        <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.5, ease: "easeIn" }}>
            {isMobile ?
                <div>
                    <Grid container>
                        <Grid item xs={12}>
                            <Typography variant="h3" sx={{p: 2.5, color: "#589D96"}}>
                                {currentEquipment.name}
                            </Typography>
                            <Card key={data.id}>
                                <Stack direction="column">
                                    <Typography variant="h4" sx={{ color: "#205375", textAlign: "center", m: 1 }}>
                                        {data.title}
                                    </Typography>
                                    <Rating
                                        readOnly={true}
                                        value={data.rating}
                                        sx={{ alignContent: "center", m: 1 }}
                                    />
                                </Stack>
                                <CardContent>
                                    <Stack direction="column">
                                        <Typography sx={{ color: "#205375", m: 1 }}>
                                            {data.content}
                                        </Typography>
                                    </Stack>
                                </CardContent>
                            </Card>
                        </Grid>
                        <Grid item xs={12}>
                            <Card sx={{ backgroundColor: "#b6d6d4", p: 2 }}>
                                <Typography variant="h5" sx={{ textAlign: "center", color: "#205375" }}>
                                    Comments:
                                </Typography>
                                <Button
                                    sx={{ ml: 11, color: "#205375", backgroundColor: "transparent", my: 1 }}
                                    onClick={() => setAddComment(true)}>
                                    <RateReviewIcon />
                                    Add a Comment
                                </Button>
                                {addComment && <CommentForm />}
                                {commentData && commentData.filter(comment => comment.postId === data.id).map((comment) => (
                                    <Card key={comment.id} sx={{ p: 2 }}>
                                        <Typography>
                                            {comment.content}
                                        </Typography>
                                    </Card>
                                ))}
                            </Card>
                        </Grid>
                    </Grid>
                </div>
                : //is NOT mobile...
                <div>
                    <Grid container>
                        <Grid item xs={6}>
                            <Card 
                            key={data.id}
                            sx={{ 
                                mx: 2
                            }}>
                                <Stack direction="row">
                                    <Typography variant="h4" sx={{ color: "#205375", textAlign: "center", m: 1 }}>
                                        {data.title}
                                    </Typography>
                                    <Rating
                                        readOnly={true}
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
                            <Typography variant="h3" sx={{p: 2.5, color: "#589D96"}}>
                                {currentEquipment.name}
                            </Typography>
                        </Grid>

                        <Grid item xs={6}>
                            <Card sx={{ 
                                mx: 2, 
                                backgroundColor: "#b6d6d4", p: 
                                2 }}>
                                <Typography variant="h5" sx={{ textAlign: "center", color: "#205375" }}>
                                    Comments:
                                </Typography>
                                <Button
                                sx={{ 
                                    ml: 67,
                                    color: "#205375" 
                                }}
                                    onClick={() => setAddComment(true)}>
                                    <RateReviewIcon /> Add a Comment
                                </Button>
                                {addComment && <CommentForm />}
                                {commentData && commentData.filter(comment => comment.postId === data.id).map((comment) => (
                                    <Card key={comment.id} sx={{ p: 2 }}>
                                        <Typography>
                                            {comment.content}
                                        </Typography>
                                    </Card>
                                ))}
                            </Card>
                        </Grid>
                    </Grid>
                </div>}
        </motion.div>
    )
}

export default PostsWithComments