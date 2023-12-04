import Card from "@mui/material/Card";
import Typography from "@mui/material/Typography";
import Stack from "@mui/material/Stack";

import { useParams } from "react-router-dom";

import { useGetSingleEquipmentQuery } from "../../redux/api"
import { useGetReviewByEquipmentQuery } from "../../redux/api";

const AllReviewsForEquipment = () => {
    const { id } = useParams();
    const { data, error, isLoading } = useGetSingleEquipmentQuery(id);
    const { data: reviewData, error: reviewError, isLoading: reviewIsLoading } = useGetReviewByEquipmentQuery(id);

    const avgRating = () => {
        
    }

    if (isLoading) {
        return <div> Please Wait.. Still Loading</div>
    }
    if (error) {
        return <div> Sorry! There's a problem loading the equipment. </div>
    }
    console.log(data);
    console.log(reviewData);
    console.log(reviewError);
    return (
        <>
            <Typography variant="h2">
                {data.name}
            </Typography>
            <Rating
                readOnly="true"
                value={data.rating}
                sx={{ alignContent: "center", m: 1 }}
            />
            <Card>
                <Stack direction="row">
                    <img src={data.image} alt={data.name} />
                    <Stack direction="column">
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
                        {data.description}
                    </Typography>
                </Stack>
            </Card>
            {reviewData && reviewData.map((review) => (
                <Card>
                    <Stack direction="row">
                        <Typography variant="h4">
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

        </>
    )
}

export default AllReviewsForEquipment