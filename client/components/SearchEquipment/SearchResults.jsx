import Button from "@mui/material/Button";
import Card from "@mui/material/Card";
import Typography from "@mui/material/Typography";
import Stack from "@mui/material/Stack";

const SearchResults = ({ results }) => {
    return (
        <>
            <Stack direction="row">
                {results.map((equipment) => (
                    <Card key={equipment.id} sx={{ p: 5 }}>
                        <Stack direction="column">
                            <Typography variant="h6" sx={{ textAlign: "center", mb: 2 }}>
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
                    </Card>
                ))
                }
            </Stack>
        </>
    )
}

export default SearchResults;