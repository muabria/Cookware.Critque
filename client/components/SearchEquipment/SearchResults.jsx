import Button from "@mui/material/Button";
import Avatar from "@mui/material/Avatar";
import Typography from "@mui/material/Typography";
import Stack from "@mui/material/Stack";

const SearchResults = ({ results }) => {
    return (
        <>
            <Stack direction="row">
                {results.map((equipment) => (
                    <Avatar key={equipment.id} 
                    sx={{ backgroundColor: "white", 
                    border: "solid #D29D2B 5px", 
                    p: 5, 
                    minWidth: 200,  
                    minHeight: 200 }}>
                        <Stack direction="column">
                            <Typography variant="h6" sx={{ color: "#205375", textAlign: "center", mb: 2 }}>
                                {equipment.name}
                            </Typography>
                            <img
                                src={equipment.image}
                                alt={`${equipment.name} image`}
                                width="200"
                                height="150" />
                            <Button>
                                See the {equipment.name}'s Review
                            </Button>
                        </Stack>
                    </Avatar>
                ))
                }
            </Stack>
        </>
    )
}

export default SearchResults;