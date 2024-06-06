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
        <Typography variant="h6" align='center' sx={{ color: '#489995' }}>
            {currentEquipment.name}
        </Typography>
    )
}

export default EquipmentName