import Button from "@mui/material/Button"
import Grid from "@mui/material/Grid"
import Stack from "@mui/material/Stack"

import SearchBar from "./SearchBar"

const SearchCard = () => {
    return (
        <>
            <Grid container>
                <Grid xs={4}>
                    <Stack direction="column">
                        <Button sx={{ color: "#205375", backgroundColor: "#D3CEDF", mx: 1 }}>
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
