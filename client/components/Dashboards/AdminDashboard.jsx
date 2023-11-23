import Button from "@mui/material/Button"
import Card from "@mui/material/Card";
import Stack from '@mui/material/Stack'
import Typography from "@mui/material/Typography";
import Grid from "@mui/material/Grid";
import Avatar from '@mui/material/Avatar';

import { Link } from "react-router-dom"; 

import { useGetAllUsersQuery } from "../../redux/api"


const AdminDashboard = () => {
    console.log("This is the admin dashboard")
    const { data, error, isLoading} = useGetAllUsersQuery();
    console.log(data);
    console.log(error);
    if (!data) {
        return <div>No data</div>
    }
    if(isLoading) {
        return <div>Loading...</div>
    }
    if (error) {
        return <div> Error: {error.message} </div>;
    } else
        console.log(data);
    return (
        <>
        <Grid container spacing={1}>
                <Grid item xs={2}>
                 
                </Grid>
                <Grid item xs={10}>
                    <Stack direction="row">
                        <Avatar sx={{ mx: 3 }} />
                        <Typography variant="h4">
                            Hello Admin!
                        </Typography>
                    </Stack>
                    <Card sx={{ backgroundColor: "#D3E0E2" }}>
                        <Link to="/new_review">
                            <Button sx={{ backgroundColor: "#088395", color: "white", m: 2 }}>
                                Make a new Critique
                            </Button>
                        </Link>
                        <Stack direction="row">
                            <Grid item xs={6}>
                            </Grid>
                            <Grid item xs={6}>
                            </Grid>
                        </Stack>
                    </Card>
                </Grid>
            </Grid>
        </>
    )
}
export default AdminDashboard