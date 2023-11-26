import Card from "@mui/material/Card";
import Typography from "@mui/material/Typography";

import { useGetEquipmentQuery } from "../../redux/api";
import { useGetSingleCategoryQuery } from "../../redux/api";

import { useParams } from "react-router";

const CategoryPage = () => {

    const { id } = useParams();

    const { data, error, isLoading } = useGetSingleCategoryQuery(id);
    const { data: equipmentData, error: equipmentError, isLoading: equipmetLoading } = useGetEquipmentQuery();

    if (!data) {
        return <div>Error 404: Data not found. Maybe it's hiding in the pantry...</div>
    }
    if (isLoading) {
        return <div> Loading... </div>;
    }
    if (error) {
        return <div>Sorry! Something went wrong loading the categories.</div>;
    }
    console.log(data);
    console.log(equipmentData);

    return (
        <>
            <Typography sx={{ textAlign: "center" }}>
                {data.category}
            </Typography>
            {equipmentData && equipmentData.filter( (equipment) => equipment.categoryId === data.id ).map((equipment) => (
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

export default CategoryPage