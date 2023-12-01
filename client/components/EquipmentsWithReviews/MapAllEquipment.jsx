import Card from "@mui/material/Card";
import Typography from "@mui/material/Typography";
import Stack from "@mui/material/Stack";
import Grid from "@mui/material/Grid";
import Button from "@mui/material/Button";
import Box from "@mui/material/Box";
import { Link } from "react-router-dom";

import { useGetEquipmentQuery } from "../../redux/api"

const MapAllEquipment = () => {
    const { data, error, isLoading } = useGetEquipmentQuery();
    if (isLoading) {
        return <div> Please Wait.. Still Loading</div>
    }
    if (error) {
        return <div> Sorry! There's a problem loading the equipment. </div>
    }
    console.log(data);


    return (
        <>
            <Grid container >
                {data && data.map((equipment) => (
                    <Stack direction="row">

                        <Card sx={{ p: 2, m: 2 }} key={equipment.id}>
                            <Stack direction="column">
                                <Typography>
                                    {equipment.name}
                                </Typography>
                                <Typography>
                                    {equipment.brand}
                                </Typography>
                                <Typography>
                                    {equipment.description}
                                </Typography>
                                <Link to={`/equipment/${equipment.id}`}> 
                                <Button>
                                    See the {equipment.name}'s Reviews
                                </Button>
                                </Link>
                            </Stack>
                        </Card>

                    </Stack>
                ))
                }

            </Grid>
        </>
    )
}

export default MapAllEquipment