import Card from "@mui/material/Card";
import Typography from "@mui/material/Typography";
const SearchResults = ({ results }) => {
    return (
        <>
            {results.map((equipment) => (
                <Card key={equipment.id}>
                    <Typography>
                        {equipment.name}
                    </Typography>
                </Card>
            ))
            }
        </>
    )
}

export default SearchResults;