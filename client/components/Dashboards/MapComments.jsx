import Alert from "@mui/material/Alert";
import Button from "@mui/material/Button";
import Card from "@mui/material/Card";
import Grid from "@mui/material/Grid"
import Typography from '@mui/material/Typography';
import PreviewIcon from '@mui/icons-material/Preview';
import DeleteForeverSharpIcon from '@mui/icons-material/DeleteForeverSharp';

import { useState } from 'react';
import { useGetCommentByUserQuery } from '../../redux/api';

const MapComments = () => {
    const [alert, setAlert] = useState(false);

    const { data, error, isLoading } = useGetCommentByUserQuery();

    if (!data) {
        return <div> Oops, our own web equipment is broken. We should have the issue resolved soon! </div>
    }
    if (isLoading) {
        return <div> Loading... </div>;
    }
    if (error) {
        return <div>Error:{error.message}</div>;
    }
    console.log(data);

    return (
        <>
            <Card sx={{ backgroundColor: "#D3E0E2", m: 1 }}>
                <Typography variant="h5" sx={{ textAlign: "center" }}>
                    My Comments:
                </Typography>
                {data && data.map((comment) => (
                    <Card key={comment.id} sx={{ m: 1, p: 2 }}>
                        <Grid container>
                            <Grid item xs={8}>
                                <Typography>
                                    {comment.content}
                                </Typography>
                            </Grid>
                            <Grid item={4}>
                                <Button
                                    variant="outlined"
                                    sx={{ m: 1 }}>
                                    <PreviewIcon />
                                </Button>
                                <Button
                                    onClick={() => setAlert(true)}
                                    variant="outlined"
                                    color="error"
                                    sx={{ m: 1 }}>
                                    <DeleteForeverSharpIcon />
                                </Button>
                            </Grid>
                            {alert && <Alert severity="warning">
                                Are you sure you want to delete this post? Once you do it's gone forever.
                                <Button
                                    onClick={console.log("Delete")}
                                    variant="outlined"
                                    color="error" 
                                    sx={{ m: 1 }}>
                                    Yes, delete this review
                                </Button>
                                <Button
                                    variant="outlined"
                                    onClick={() => setAlert(false)}
                                    sx={{ m: 1 }}>
                                    No, keep this review
                                </Button>
                            </Alert>
                            }
                        </Grid>
                    </Card>
                ))}
            </Card>

        </>
    )
}

export default MapComments