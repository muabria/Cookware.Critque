import Button from "@mui/material/Button"
import Card from "@mui/material/Card";
import Stack from '@mui/material/Stack'
import Typography from "@mui/material/Typography";
import Grid from "@mui/material/Grid";
import Avatar from '@mui/material/Avatar';

import { useGetAllUsersQuery } from "../../redux/api"
import MapAllUsers from "./MapAllUsers";
import AddEquipment from "./AddEquipment";
import MapPostsAdmin from "./MapPostsAdmin";
import AdminMapEquipment from "./AdminMapEquipment";

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
        return <div> Oops! Something went wrong loading the data. </div>;
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
                    <Card sx={{ backgroundColor: "#8da6a9", minHeight: 500 }}>
                        <AddEquipment/>
                        <AdminMapEquipment/>
                        <Stack direction="row">
                            <Grid item xs={6}>
                                <MapAllUsers/>
                            </Grid>
                            <Grid item xs={6}>
                       <MapPostsAdmin/>    
                            </Grid>
                        </Stack>
                    </Card>
                </Grid>
            </Grid>
        </>
    )
}
export default AdminDashboard