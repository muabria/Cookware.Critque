import Box from '@mui/material/Box';
import Button from '@mui/material/Button';

import { useGetCategoriesQuery } from "../../redux/api"
import { Avatar, Typography } from '@mui/material';

const MapCategories = () => {
    const { data, error, isLoading } = useGetCategoriesQuery();
    if (!data) {
        return <div>Error 404: Data not found. Maybe it's hiding in the pantry...</div>
    }
    if (isLoading) {
        return <div> Loading... </div>;
    }
    if (error) {
        return <div>Error:{error.message}</div>;
    }
    console.log(data);

    return (
        <>
            {data && data.map((category) => (
                <Box key={category.id} sx={{ m: 2 }}>
                    <Avatar sx={{ p: 5, color:"#3C1B1F", backgroundColor: "#E7B10A", border: "solid #D29D2B 5px", }} >
                        <Typography> 
                            {category.category}
                        </Typography>
                    </Avatar>
                </Box>
            ))
            }
        </>
    )
}

export default MapCategories