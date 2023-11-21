import Card from "@mui/material/Card";
import Typography from "@mui/material/Typography";

import { useGetEquipmentQuery } from "../redux/api"

const Equipment = () => {
    const { data, error, isLoading } = useGetEquipmentQuery();
    if (isLoading) { return <div> Please Wait.. Still Loading</div> }
    if (error) { return <div> {error.message} </div> }
    console.log(data);


    return (
        <>
            {data && data.map((equipment) => (
                <Card key={equipment.id}>
                    <Typography>
                        {equipment.name}
                    </Typography>
                </Card>
            ))
            }

        </>
    )
}

export default Equipment