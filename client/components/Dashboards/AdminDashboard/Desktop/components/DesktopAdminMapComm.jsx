import Alert from "@mui/material/Alert";
import Button from "@mui/material/Button";
import Card from "@mui/material/Card";
import Grid from "@mui/material/Grid"
import Rating from "@mui/material/Rating"
import Stack from '@mui/material/Stack';
import Typography from '@mui/material/Typography';
import PreviewIcon from '@mui/icons-material/Preview';
import DeleteForeverSharpIcon from '@mui/icons-material/DeleteForeverSharp';

import { Link } from "react-router-dom";
import { useState } from "react";
import { useGetCommentsQuery, useDeleteUsersCommentMutation } from "../../../../../redux/api";

const DesktopAdminMapComm = () => {
    const [alert, setAlert] = useState(false);

    const { data, error, isLoading } = useGetCommentsQuery();
    const [deleteComment] = useDeleteUsersCommentMutation();

    if (isLoading) {
        return <div> </div>;
    }
    if (error) {
        return <div>Error:{error.message}</div>;
    }

    return (
        <div>
            <Card elevation={10} sx={{ backgroundColor: "#D3E0E2", m: 1 }}>
                <Typography variant="h5" sx={{ textAlign: "center", color: "#205375" }}>
                    All Comments:
                </Typography>
                {data && data.map((comment) => (
                    <Card
                        key={review.id}
                        sx={{ m: 1, p: 2 }}
                        elevation={10}>
                        <Grid container>
                            <Grid item xs={8}>
                                <Typography>
                                    {comment.content}
                                </Typography>
                            </Grid>
                            <Grid item xs={4}>
                                <Link to={`/review/${comment.postId}`}>
                                    <Button
                                        variant="outlined"
                                        sx={{ m: 1 }}>
                                        <PreviewIcon />
                                    </Button>
                                </Link>
                                <Button
                                    onClick={() => setAlert(comment.id)}
                                    variant="outlined"
                                    color="error"
                                    sx={{ textTransform: "none", m: 1 }}>
                                    <DeleteForeverSharpIcon />
                                </Button>
                            </Grid>
                        </Grid>
                        {alert === comment.id && <Alert severity="warning">
                            <Stack direction="column">
                                Are you sure you want to delete this comment? Once you do, it's gone forever.
                                <Button
                                    onClick={() => deleteComment(comment.id)}
                                    variant="outlined"
                                    color="error"
                                    sx={{ textTransform: "none", m: 1 }}>
                                    Yes, delete this review.
                                </Button>
                                <Button
                                    variant="outlined"
                                    onClick={() => setAlert(false)}
                                    sx={{ textTransform: "none", m: 1 }}>
                                    No, keep this review.
                                </Button>
                            </Stack>
                        </Alert>
                        }
                    </Card>
                ))}
            </Card>
        </div>
    )
}

export default DesktopAdminMapComm