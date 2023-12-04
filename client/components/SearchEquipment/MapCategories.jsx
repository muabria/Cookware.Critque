import Avatar from "@mui/material/Avatar";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import Card from "@mui/material/Card"
import Typography from "@mui/material/Typography";

import { useMediaQuery, useTheme } from "@mui/material";
import { Link } from "react-router-dom";

import { useGetCategoriesQuery } from "../../redux/api"

const MapCategories = () => {

    const theme = useTheme();
    const isMobile = useMediaQuery(theme.breakpoints.down("md"));

    const { data, error, isLoading } = useGetCategoriesQuery();
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

    return (
        <>
            {isMobile ?
                <>
                    {data && data.map((category) => (
                        <Box key={category.id} sx={{ m: .15 }}>
                            <Link to={`/category/${category.id}`}
                                style={{ textDecoration: "none" }}>
                                <Card sx={{ 
                                    boxShadow: 3,
                                    color: "#3C1B1F", 
                                    backgroundColor: "#E7B10A", 
                                    border: "solid #D29D2B 2px", }} >
                                    <Typography sx={{ fontSize: "10px" }}>
                                        {category.category}
                                    </Typography>
                                </Card>
                            </Link>
                        </Box>
                    ))
                    }
                </>
                : //is NOT mobile...
                <>
                    {data && data.map((category) => (
                        <Box key={category.id} sx={{ m: 2 }}>
                            <Link to={`/category/${category.id}`}
                                style={{ textDecoration: "none" }}>
                                <Avatar
                                    sx={{
                                        boxShadow: 3,
                                        p: 3,
                                        color: "#3C1B1F",
                                        backgroundColor: "#E7B10A",
                                        border: "solid #D29D2B 2px"
                                    }}>
                                    <Typography sx={{ fontSize: "13px" }}>
                                        {category.category}
                                    </Typography>
                                </Avatar>
                            </Link>
                        </Box>
                    ))
                    }
                </>
            }

        </>
    )
}

export default MapCategories
