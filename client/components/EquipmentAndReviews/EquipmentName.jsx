import Typography from "@mui/material/Typography";

import { useGetEquipmentQuery } from "../../redux/api";

const EquipmentName = ({ equipmentId }) => {
    const { data, isLoading } = useGetEquipmentQuery();

    if (isLoading) {
        return <div></div>
    }
    
    console.log("EquipmentName", data);

    const currentEquipment = data && data.find((equipment) => { return equipment.id === equipmentId });

    return (
        <Typography align='center' sx={{ color: '#8F8F8F' }}>
            {currentEquipment.name}
        </Typography>
    )
}

export default EquipmentName