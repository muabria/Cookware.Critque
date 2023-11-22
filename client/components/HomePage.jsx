
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import Stack from "@mui/material/Stack";
import Grid from "@mui/material/Grid";
import  Typography from "@mui/material/Typography";

import { Link } from "react-router-dom";

import AllPost from "./AllPosts"
import MapCategories from "./SearchEquipment/MapCategories"
import SearchBar from "./SearchEquipment/SearchBar";
import background from "./images/kitchenEquipmentBackground.png"

const HomePage = () => {
    return (
        <>
            <div style={{ backgroundImage: `url(${background})`, backgroundSize: "contain", backgroundRepeat: "no-repeat" }}>
                <Box sx={{ minHeight: 900, my: 2 }}>
                    <Grid container>
                        <Grid item xs={2}>
                        </Grid>
                        <Grid item xs={10} sx={{ mb: 40 }}>
                            <Stack direction="row">
                                <MapCategories />
                            </Stack>
                        </Grid>
                    </Grid>
                    {/* <------------BUTTON-----------> */}

                    <Grid container>
                        <Grid item xs={7}>
                        </Grid>
                        <Grid item xs={5}>
                            <Stack direction="row">
                                <Link to="/posts">
                                    <Button sx={{ color: "#FAF3F0", backgroundColor: "#D988B9", border: "solid #B0578D 5px", borderRadius: "100px", p: 5 }}>
                                        <Typography variant="h6">
                                            Explore New Additions to Your Kitchen!
                                        </Typography>
                                    </Button>
                                </Link>
                            </Stack>
                        </Grid>
                    </Grid>

                </Box>
            </div>
            <SearchBar />
            <AllPost />
        </>
    )
}

export default HomePage