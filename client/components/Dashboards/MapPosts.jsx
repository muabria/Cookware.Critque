import Card from "@mui/material/Card";
import Typography from "@mui/material/Typography"
import AssignmentIcon from '@mui/icons-material/Assignment';

const MapPosts = () => {
    return (
        <>
            <Card sx={{ m: 1 }}>
                <Typography sx={{ textAlign: "center" }}>
                    My Posts:
                </Typography>
                <AssignmentIcon />
            </Card>
        </>
    )
}

export default MapPosts