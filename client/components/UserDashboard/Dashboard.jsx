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

const Dashboard = () => {
    const { data, error } = useGetUserQuery()
    if (!data) {
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
                    <Stack direction="column">
                        <Typography variant="h6" sx={{ my: 5 }}>
                            <ManageAccountsIcon /> 
                            Account Information
                        </Typography>
                        <Typography variant="h6" sx={{ my: 5 }}>
                            <LogoutSharpIcon /> Logout
                        </Typography>
                    </Stack>
                </Grid>
                <Grid item xs={10}>
                    <Stack direction="row">
                        <Avatar sx={{ mx: 3 }} />
                        <Typography variant="h4">
                            Hello, {data.username}
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

export default Dashboard