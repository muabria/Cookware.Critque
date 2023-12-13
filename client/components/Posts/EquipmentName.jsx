import Typography from "@mui/material/Typography";
import { useGetEquipmentQuery } from "../../redux/api";

const EquipmentName = ({equipmentId}) => {
    const {data, error, isLoading} = useGetEquipmentQuery();
    if (!data) {
        return <div> </div>
    }
    console.log(data);
    const currentEquipment = data.find((equipment) => {return equipment.id === equipmentId});
    //return <Typography>Placeholder</Typography>
    return (<Typography align='center' sx={{color: '#8F8F8F'}}>
        {currentEquipment.name}
        </Typography>)
 }

export default EquipmentName