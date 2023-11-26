import Card from "@mui/material/Card";
import Typography from "@mui/material/Typography";
import Stack from "@mui/material/Stack";

import { useGetEquipmentQuery } from "../redux/api"

const Equipment = () => {
    const { data, error, isLoading } = useGetEquipmentQuery();
    if (isLoading) { return <div> Please Wait.. Still Loading</div> }
    if (error) { return <div> Sorry! There's a problem loading the equipment. </div> }
    console.log(data);


    return (
        <>
            {data && data.map((equipment) => (
                <Card key={equipment.id}>
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
                    </Stack>
                </Card>

            ))
            }

        </>
    )
}

export default Equipment