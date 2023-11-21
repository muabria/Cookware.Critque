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
                <Box key={category.id} sx={{ m: 5 }}>
                    <Avatar sx={{ p: 5 }} >
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
