import Button from "@mui/material/Button"
import Card from "@mui/material/Card";
import Stack from '@mui/material/Stack'
import Typography from "@mui/material/Typography";
import Grid from "@mui/material/Grid";
import Avatar from '@mui/material/Avatar';

import ManageAccountsIcon from '@mui/icons-material/ManageAccounts';
import LogoutSharpIcon from '@mui/icons-material/LogoutSharp';
import MapPosts from "./MapPosts";
import MapComments from "./MapComments";

import { Link } from "react-router-dom";

import { useGetUserQuery } from "../../redux/api";

const UserDashboard = () => {
    const { data, error, isLoading } = useGetUserQuery()
    if (!data) {
        return <div>No data</div>
    }
    if (isLoading) {
        return <div>Loading...</div>
    }
    if (error) {
        return <div> Oops! Something went wrong loading the data. </div>;
    } else
        console.log(data);
        //Patch user
    return (
        <>
            <Grid container spacing={1}>
                <Grid item xs={2}>
                    <Stack direction="column">
                        <Typography sx={{ 
                            my: 5,
                            fontSize: {
                                xs: "11px",
                                sm: "12px",
                                md: "16px",
                                lg: "16px",
                            }}}>
                            <ManageAccountsIcon /> 
                            Account Information
                        </Typography>
                        <Typography sx={{ 
                            my: 5,
                            fontSize: {
                                xs: "11px",
                                sm: "12px",
                                md: "16px",
                                lg: "16px",
                            } }}>
                            <LogoutSharpIcon /> Logout
                        </Typography>
                    </Stack>

                </Grid>
                <Grid item xs={10}>
                    <Stack direction="row">
                        <Avatar sx={{ mx: 3 }} />
                        <Typography sx={{
                             fontSize: {
                                xs: "16px",
                                sm: "18px",
                                md: "20px",
                                lg: "24px",
                            }
                        }}>
                            Hello, {data.username}
                        </Typography>
                    </Stack>
                    <Card sx={{ backgroundColor: "#8da6a9", minHeight: 500 }}>
                        <Link to="/new_review">
                            <Button sx={{ backgroundColor: "#088395", color: "white", m: 2 }}>
                                Make a new Critique
                            </Button>
                        </Link>
                        <Stack direction="row">
                            <Grid item xs={6}>
                                <MapPosts />
                            </Grid>
                            <Grid item xs={6}>
                                <MapComments />
                            </Grid>
                        </Stack>
                    </Card>
                </Grid>
            </Grid>
        </>
    )
}

export default UserDashboard