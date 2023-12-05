import Card from "@mui/material/Card";
import Typography from "@mui/material/Typography";
import Stack from "@mui/material/Stack";

import { Link, useParams } from "react-router-dom";

import { useGetSingleEquipmentQuery } from "../../redux/api"
import { useGetReviewByEquipmentQuery } from "../../redux/api";
import UpdateEquipmentForm from "../EditForms.jsx/EditEquipment";
import  Button  from "@mui/material/Button";

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
    console.log(data);
    console.log(reviewData);
    console.log(reviewError);
    return (
        <>
            <Typography>
                {data.name}
            </Typography>
            <Link to={`/edit_equipment/${data.id}`} >
                <Button> Update Equipment </Button>
            </Link>
            {reviewData && reviewData.map((review) => (
                <Typography>
                    {review.title}
                </Typography>
            ))}

        </>
    )
}

export default AllReviewsForEquipment