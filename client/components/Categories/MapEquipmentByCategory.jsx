
import { useGetEquipmentQuery } from "../../redux/api";
import Card from "@mui/material/Card";
import Typography from "@mui/material/Typography";

const MapEquipmentByCategory = ({ categoryId }) => {

    const { data, error, isLoading } = useGetEquipmentQuery();

    if (isLoading) {
        return <div> Please Wait.. Still Loading</div>
    }
    if (error) {
        return <div> Sorry! There's a problem loading the reviews. </div>
    }
    console.log("equipment", data);

    return (
        <>
            {data && data.filter(category => category.id === categoryId).map((equipment) => (
                <Card key={equipment.id}>
                    <Typography>
                        {equipment.name}
                    </Typography>
                    <Typography>
                        {equipment.brand}
                    </Typography>
                    <img src={equipment.image}
                        alt={equipment.name}
                    />
                </Card>
            ))}
        </>
    )
}

export default MapEquipmentByCategory