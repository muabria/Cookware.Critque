import Button from "@mui/material/Button";
import Avatar from "@mui/material/Avatar";
import Typography from "@mui/material/Typography";
import Stack from "@mui/material/Stack";

import { Link } from "react-router-dom";

const SearchResults = ({ results }) => {
    return (
        <>
        {results.length === 0 && 
        <Typography sx={{py: 2}}>Whoops! Ingredient not found.</Typography>}
            <Stack direction="row">
                {results.map((equipment) => (
                    <Avatar key={equipment.id}
                        sx={{
                            backgroundColor: "white",
                            border: "solid #D29D2B 5px",
                            p: 5,
                            minWidth: 200,
                            minHeight: 200
                        }}>
                        <Stack direction="column">
                            <Typography variant="h6" sx={{ color: "#205375", textAlign: "center", mb: 2 }}>
                                {equipment.name}
                            </Typography>
                            <img
                                src={equipment.image}
                                alt={`${equipment.name} image`}
                                width="200"
                                height="150" />
                            <Link to={`/equipment/${equipment.id}`} >
                                <Button sx={{ textTransform: "none", }}>
                                    See the {equipment.name}'s Review
                                </Button>
                            </Link>
                        </Stack>
                    </Avatar>
                ))
                }
            </Stack>
        </>
    )
}

export default SearchResults;