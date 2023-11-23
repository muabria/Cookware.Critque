import Card from "@mui/material/Card";
import CommentIcon from '@mui/icons-material/Comment';
import Typography from "@mui/material/Typography"

const MapComments = () => {
    return (
        <>
            <Card sx={{ m:1 }}>
            <Typography sx={{ textAlign: "center" }}>
                    My Comments:
                </Typography>
                <CommentIcon />
            </Card>
        </>
    )
}

export default MapComments