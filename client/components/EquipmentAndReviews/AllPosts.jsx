import Box from '@mui/material/Box';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import Typography from '@mui/material/Typography';
import { useMediaQuery, useTheme } from "@mui/material";

import { motion } from 'framer-motion';

import { useGetReviewsQuery } from '../../redux/api';

import SearchBar from './SearchEquipment/SearchBar';
import MapAllEquipment from "./MapAllEquipment";
import MapAllReviews from './MapAllRevies';

const AllPosts = () => {
    const theme = useTheme();
    const isMobile = useMediaQuery(theme.breakpoints.down("md"));

    const { data, error, isLoading } = useGetReviewsQuery()

    if (isLoading) {
        return <div> </div>
    }
    if (error) {
        return <div> Sorry! There's a problem loading the reviews. </div>
    }

    return (
        <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.5, ease: "easeIn" }}>
            {isMobile
                ?
                <div>
                    <Box sx={{ mx: 1, mb: 1 }}>
                        <SearchBar />
                    </Box>
                </div>
                ://is NOT mobile...
                <div>
                    <Box sx={{ mx: 10, mb: 1 }}>
                        <SearchBar />
                    </Box>
                </div>}
            <Card
                elevation={10}
                className="posts-card">
                <MapAllEquipment />
            </Card>
            <Card 
             elevation={10}
             className="posts-card">
              <MapAllReviews />
            </Card>
        </motion.div>
    );
}
export default AllPosts

