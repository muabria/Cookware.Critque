import ArrowCircleLeftIcon from '@mui/icons-material/ArrowCircleLeft';
import ArrowCircleRightIcon from '@mui/icons-material/ArrowCircleRight';

import Button from "@mui/material/Button"
import Box from "@mui/material/Box"
import Grid from "@mui/material/Grid"
import Stack from "@mui/material/Stack";
import { useRef, useState } from "react";
import { useMediaQuery, useTheme } from "@mui/material";

const SlideShow = ({ content }) => {
    const [scrollItem, setscrollItem] = useState(0);

    const theme = useTheme();
    const isMobile = useMediaQuery(theme.breakpoints.down("md"));

    const ref = useRef();

    const handleScroll = (movementAmount) => {
        const newscrollItem = scrollItem + movementAmount;
        setscrollItem(newscrollItem);
        ref.current.scrollLeft = newscrollItem;
    };
    return (
        <>
            {isMobile
                ?
                <div>
                    <Button
                        onClick={() => handleScroll(-200)}>
                        <ArrowCircleLeftIcon sx={{ mr: 5, color: "#088395", minWidth: 70, minHeight: 35 }} />
                    </Button>
                    <Button
                        onClick={() => handleScroll(200)}>
                        <ArrowCircleRightIcon sx={{ ml: 5, color: "#088395", minWidth: 70, minHeight: 35 }} />
                    </Button>
    
                    <div
                        ref={ref}
                        style={{ overflowX: "scroll", scrollBehavior: "smooth" }}>
                        <Box sx={{ width: "200px" }}>
                            <Stack direction="row">
                                {content}
                            </Stack>
                        </Box>
                    </div>
                </div>
                : <div>
                    <Grid container>
                        <Grid item xs={1}>
                            <Button
                                onClick={() => handleScroll(-500)}>
                                <ArrowCircleLeftIcon sx={{ color: "#088395", minWidth: 70, minHeight: 35 }} />
                            </Button>
                        </Grid>
                        <Grid item xs={10}>
                            <div
                                ref={ref}
                                style={{ overflowX: "scroll", scrollBehavior: "smooth" }}>
                                <Box sx={{ width: "90vw" }}>
                                    <Stack direction="row">
                                        {content}
                                    </Stack>
                                </Box>
                            </div>
                        </Grid>
                        <Grid item xs={1}>
                            <Button
                                onClick={() => handleScroll(500)}>
                                <ArrowCircleRightIcon sx={{ color: "#088395", minWidth: 70, minHeight: 35 }} />
                            </Button>
                        </Grid>
                    </Grid>
                </div>
            }

        </>
    )
}
export default SlideShow
