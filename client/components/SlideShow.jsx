import ArrowCircleLeftIcon from '@mui/icons-material/ArrowCircleLeft';
import ArrowCircleRightIcon from '@mui/icons-material/ArrowCircleRight';

import Button from "@mui/material/Button"
import Box from "@mui/material/Box"
import Grid from "@mui/material/Grid"
import Stack from "@mui/material/Stack";

import { useRef, useState } from "react";

const SlideShow = ({ content }) => {
    const [scrollItem, setscrollItem] = useState(0);

    const ref = useRef();

    const handleScroll = (movementAmount) => {
        const newscrollItem = scrollItem + movementAmount;
        setscrollItem(newscrollItem);
        ref.current.scrollLeft = newscrollItem;
    };
    return (
        <>
            <Grid container>
                <Grid item xs={1}>
                    <Button
                        onClick={() => handleScroll(-500)}>
                        <ArrowCircleLeftIcon sx={{ color: "#088395", minWidth: 70, minHeight: 35 }}/>
                    </Button>
                </Grid>
                <Grid item xs={10}>
                    <div
                        ref={ref}
                        style={{ overflowX: "scroll", scrollBehavior: "smooth" }}>
                        <Box sx={{ width: "1800px" }}>
                            <Stack direction="row">
                                {content}
                            </Stack>
                        </Box>
                    </div>
                </Grid>
                <Grid item xs={1}>
                    <Button
                        onClick={() => handleScroll(500)}>
                        <ArrowCircleRightIcon sx={{ color: "#088395", minWidth: 70, minHeight: 35 }}/>
                    </Button>
                </Grid>
            </Grid>
        </>
    )
}
export default SlideShow
