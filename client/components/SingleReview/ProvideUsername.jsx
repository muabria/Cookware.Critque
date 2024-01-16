import Typography from "@mui/material/Typography";
import { useGetAllUsersValidationQuery } from "../../redux/api";

const ProvideUsername = ({userId}) => {
    const {data, error, isLoading} = useGetAllUsersValidationQuery();
    if (!data) {
        return <div> </div>
    }
    console.log(data);
    const author = data.find((user) => {return user.id === userId});
    //return <Typography>Placeholder</Typography>
    return (<Typography align='right' sx={{color: '#8F8F8F'}}>
        {author.username}
        </Typography>)
 }

export default ProvideUsername