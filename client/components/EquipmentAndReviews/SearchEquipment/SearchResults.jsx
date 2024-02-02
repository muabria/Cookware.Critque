import Button from "@mui/material/Button";
import Card from "@mui/material/Card";
import Typography from "@mui/material/Typography";
import Stack from "@mui/material/Stack";
import AspectRatio from '@mui/joy/AspectRatio';

import { Link } from "react-router-dom";

const SearchResults = ({ results }) => {
    return (
        <>
            {results.length === 0 &&
                <Typography sx={{ py: 2 }}>
                    Sorry, there is no equipment with that name.
                </Typography>}
            <Stack direction="row">
                {results.map((equipment) => (
                    <Card
                        elevation={10}
                        sx={{ p: 5, my: 3 }}
                        className="all-card">
                        <Stack direction="column">
                            <Typography
                                variant="h4"
                                sx={{ color: "#205375", textAlign: "center", mb: 2 }}>
                                {equipment.name}
                            </Typography>
                            <AspectRatio objectFit="contain">
                                <img
                                    src={equipment.image}
                                    alt={`${equipment.name} image`} />
                            </AspectRatio>
                            <Link to={`/equipment/${equipment.id}`} >
                                <button className="see-all-button">
                                    See Review
                                </button>
                            </Link>
                        </Stack>
                    </Card>
                ))
                }
            </Stack>
        </>
    )
}

export default SearchResults;