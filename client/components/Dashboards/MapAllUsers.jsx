import Alert from "@mui/material/Alert";
import Button from "@mui/material/Button";
import Card from "@mui/material/Card";
import Grid from "@mui/material/Grid"
import Stack from "@mui/material/Stack"
import Typography from '@mui/material/Typography';
import PreviewIcon from '@mui/icons-material/Preview';
import Switch from '@mui/material/Switch'
import DeleteForeverSharpIcon from '@mui/icons-material/DeleteForeverSharp';

import { useState } from 'react';

import { useDeleteUserMutation } from "../../redux/api";
import { useGetAllUsersQuery, usePatchToggleAdminMutation } from '../../redux/api';

// const showAdminAlert = () => {
//     return (
//         <Alert severity="warning">
//             <Stack direction="column">
//                 Are you sure you want to delete user?
//                 <Button
//                     onClick={(console.log("Delete"))}
//                     variant="outlined"
//                     color="error"
//                     sx={{ m: 1 }}>
//                     Yes, delete this user
//                 </Button>
//                 <Button
//                     variant="outlined"
//                     onClick={() => setAlert(false)}
//                     sx={{ m: 1 }}>
//                     No, keep this user active
//                 </Button>
//             </Stack>
//         </Alert>
//     )
// }

const MapAllUsers = () => {
    const [alert, setAlert] = useState(false);
    const [adminAlert, setAdminAlert] = useState(false);

    const [deleteUser, { isLoading: deleteIsLoading, Error: deleteError, data: deleteData }] = useDeleteUserMutation();
    const { data, error, isLoading } = useGetAllUsersQuery();
    const [patchToggleAdmin, { error: adminError, isLoading: adminIsLoading, data: adminData }] = usePatchToggleAdminMutation();

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
                    All Users:
                </Typography>
                {data && data.map((user) => (
                    <Card key={user.id} sx={{ m: 1, p: 2 }}>
                        <Grid container>
                            <Grid item xs={8}>
                                <Typography>
                                    username: {user.username}
                                </Typography>
                                <Typography>
                                    email: {user.email}
                                </Typography>
                                <Typography>
                                    admin: {user.isAdmin.toString()}
                                </Typography>
                            <Stack direction="row">
                                <Typography>Regular</Typography>
                                <Switch 
                                    defaultChecked={user.isAdmin}
                                    onChange={async () => {
                                        console.log("toggle admin");
                                        console.log(user)
                                        const response = await patchToggleAdmin({id: user.id, isAdmin: !user.isAdmin});
                                        console.log(response)
                    
                                    }}
                                    //pass value or checked to adminToggle
                                />
                                <Typography>Admin</Typography>
                            </Stack>
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
                        </Grid>
                        {/* {adminAlert &&
                            <Alert severity="info">
                                <Stack direction="column">
                                    <Typography>
                                        Are you sure you want to promote this user to admin status?
                                    </Typography>
                                    <Button
                                        onClick={() => patchToggleAdmin(true)}
                                        variant="outlined"
                                        color="success"
                                        sx={{ m: 1 }}>
                                        Make this user an admin
                                    </Button>
                                    <Button
                                        variant="outlined"
                                        onClick={() => {
                                            patchToggleAdmin(false)
                                            setAdminAlert(false)
                                        }}
                                        sx={{ m: 1 }}>
                                        Make this user regular
                                    </Button>
                                </Stack>
                            </Alert>
                        } */}
                        {alert &&
                            <Alert severity="warning">
                                <Stack direction="column">
                                    Are you sure you want to delete user?
                                    <Button
                                        onClick={(console.log("Delete"))}
                                        variant="outlined"
                                        color="error"
                                        sx={{ m: 1 }}>
                                        Yes, delete this user
                                    </Button>
                                    <Button
                                        variant="outlined"
                                        onClick={() => setAlert(false)}
                                        sx={{ m: 1 }}>
                                        No, keep this user active
                                    </Button>
                                </Stack>
                            </Alert>
                        }
                    </Card>
                ))}

            </Card>

        </>
    )
}

export default MapAllUsers