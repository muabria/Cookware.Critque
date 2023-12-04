import Card from "@mui/material/Card";
import Typography from "@mui/material/Typography";
import Stack from "@mui/material/Stack";
import Rating from "@mui/material/Rating";

import { useParams } from "react-router-dom";

import { useGetSingleEquipmentQuery } from "../../redux/api"
import { useGetReviewByEquipmentQuery } from "../../redux/api";

const AllReviewsForEquipment = () => {
    const { id } = useParams();
    const { data, error, isLoading } = useGetSingleEquipmentQuery(id);
    const { data: reviewData, error: reviewError, isLoading: reviewIsLoading } = useGetReviewByEquipmentQuery(id);


    if (isLoading) {
        return <div> Please Wait.. Still Loading</div>
    }
    if (error) {
        return <div> Sorry! There's a problem loading the equipment. </div>
    }
    //const ratings = reviewData.map(item => item.rating);

    // let sum = 0;
    // for (let i=0; i < reviewData.length; i++) {
    //     sum = sum + reviewData[i].rating;
    // };
    // let avgRating = sum/(reviewData.length);

    console.log(data);
    console.log("reviewData:", reviewData);
    //console.log("ratings", ratings)
    console.log(reviewError);
    return (
        <>
            <Typography variant="h2">
                {data.name}
            </Typography>
            {/* <Rating
                readOnly="true"
                //value={avgRating}
                sx={{ alignContent: "center", m: 1 }}
            /> */}
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
                    <Card>
                        <Stack direction="column">
                            <Typography variant="h5">
                                {review.title}
                            </Typography>
                            <Rating
                                readOnly="true"
                                value={review.rating}
                                sx={{ alignContent: "center", m: 1 }}
                            />
                            <Typography>
                                {review.content}
                            </Typography>
                        </Stack>
                    </Card>
                ))}
            </Stack>
        </>
    )
}

export default AllReviewsForEquipment