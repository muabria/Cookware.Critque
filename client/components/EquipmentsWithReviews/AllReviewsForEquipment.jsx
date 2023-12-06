import Card from "@mui/material/Card";
import Typography from "@mui/material/Typography";
import Stack from "@mui/material/Stack";
import Rating from "@mui/material/Rating";

import { motion } from "framer-motion";

import { Link, useParams } from "react-router-dom";

import { useGetSingleEquipmentQuery } from "../../redux/api"
import { useGetReviewByEquipmentQuery } from "../../redux/api";
import { useGetUserQuery } from "../../redux/api";
import { useMemo } from "react";
import Button from "@mui/material/Button";
import LoadingMessage from "../ErrorMessages/LoadingMessage";


const AllReviewsForEquipment = () => {
    const { id } = useParams();
    const { data, error, isLoading } = useGetSingleEquipmentQuery(id);
    const { data: userData, error: userError, isLoading: userIsLoading } = useGetUserQuery();
    const { data: reviewData, error: reviewError, isLoading: reviewIsLoading } = useGetReviewByEquipmentQuery(id);
    
    const avgRating = useMemo(() => {
        if (!reviewData) return 0;
        let sum = 0;
        for (let i = 0; i < reviewData.length; i++) {
            sum = sum + reviewData[i].rating;
        };
        return sum / (reviewData.length);
    }, [reviewData])

    if (isLoading) {
        return <div><LoadingMessage/></div>
    }
    if (error) {
        return <div> Sorry! There's a problem loading the equipment. </div>
    }

    console.log("data" + data);
    console.log("reviewData:", reviewData);

    return (
        <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.5, ease: "easeIn" }}>
            <Typography variant="h2">
                {data.name}
            </Typography>

            <Rating
                readOnly={true}
                value={avgRating}
                sx={{ alignContent: "center", m: 1 }}
            />
            <Stack direction="row">
                <Card>
                    <Stack direction="column">
                        <img
                            src={data.image}
                            alt={data.name}
                            width="250" />
                        <Stack direction="row">
                            <Typography>
                                Brand: {data.brand}
                            </Typography>
                            <Typography>
                                Price: ${data.priceRating}
                            </Typography>
                        </Stack>
                        <Typography>
                            <a href={data.purchaseLink} target="_blank">Buy it here</a>
                        </Typography>
                        <Typography>
                            Description: {data.description}
                        </Typography>
                    </Stack>
                </Card>
                {reviewData && reviewData.map((review) => (
                    <Card key={review.id}>
                        <Stack direction="column">
                            <Typography variant="h5">
                                {review.title}
                            </Typography>

                            <Rating
                                readOnly={true}
                                value={review.rating}
                                size="small"
                                sx={{ alignContent: "center", m: 1 }}
                            />
                            <Typography>
                                {review.content}
                            </Typography>
                        </Stack>
                    </Card>
                ))}
            </Stack>
            {!userData || userData.isAdmin === false
                ? //If not admin.... 
                <div>
                </div>
                : //If admin...
                <div>
                    <Link to={`/edit_equipment/${data.id}`} >
                        <Button> Update Equipment </Button>
                    </Link>
                </div>
            }
            {reviewData && reviewData.map((review) => (
                <Typography>
                    {review.title}
                </Typography>
            ))}
        </motion.div>
    )
}

export default AllReviewsForEquipment