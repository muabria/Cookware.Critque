import Button from "@mui/material/Button"
import Grid from "@mui/material/Grid"
import Stack from "@mui/material/Stack"

import SearchBar from "./SearchBar"

const SearchCard = () => {
    return (
        <>
            <Grid container>
                <Grid xs={6}>
                    <Stack direction="column">
                        <Button sx={{ color: "#5C7658", backgroundColor: "#EFB495", mx: 1 }}>
                            Explore New Equipment
                        </Button>
                        <SearchBar />
                    </Stack>
                </Grid>
            </Grid>
        </>
    )
}

export default SearchCard
