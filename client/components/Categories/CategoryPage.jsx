import Button from "@mui/material/Button";
import Card from "@mui/material/Card";
import Stack from "@mui/material/Stack";
import Typography from "@mui/material/Typography";

import { useGetEquipmentQuery } from "../../redux/api";
import { useGetSingleCategoryQuery } from "../../redux/api";

import { Link } from "react-router-dom";

import { motion } from 'framer-motion';

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
            <Typography variant="h3" sx={{ color: "#205375", textAlign: "center", mb: 2 }}>
                All {data.category} Kitchen Equipment
            </Typography>
            <div className="carousel">
                <motion.div className="inner-carousel" drag="x" dragConstraints={{ right: 0, left: -300 }}>
                    {equipmentData && equipmentData.filter((equipment) => equipment.categoryId === data.id).map((equipment) => (
                        <Card key={equipment.id}
                            sx={{
                                backgroundColor: "#F9FBE7",
                                border: "solid #D29D2B 5px",
                                borderRadius: "10px",
                                minWidth: 200,
                                minHeight: 200,
                                m: 5,
                                p: 5,
                            }}>
                            <Stack direction="column">
                                <Typography variant="h5" sx={{ color: "#205375", textAlign: "center", mb: 2 }}>
                                    {equipment.name}
                                </Typography>
                                <Typography variant="h6" sx={{ color: "#205375", textAlign: "center", mb: 2 }}>
                                    {equipment.brand}
                                </Typography>
                                <img
                                    src={equipment.image}
                                    alt={`${equipment.name} image`}
                                    width="200"
                                    height="200"
                                />
                                <Link to={`/equipment/${equipment.id}`} >
                                    <Button sx={{ m: 1 }}>
                                        See the {equipment.name}'s Reviews
                                    </Button>
                                </Link>
                            </Stack>
                        </Card>
                    ))}
                </motion.div>

            </div>
        </>
    )
}

export default CategoryPage