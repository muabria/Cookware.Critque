import { useState } from "react";
import { useParams } from "react-router-dom";

import Accordion from "@mui/material/Accordion";
import AccordionDetails from "@mui/material/AccordionDetails";
import AccordionSummary from '@mui/material/AccordionSummary';
import Box from '@mui/material/Box';
import Slider from '@mui/material/Slider';
import Button from "@mui/material/Button"
import Card from "@mui/material/Card"
import TextField from "@mui/material/TextField";
import Typography from "@mui/material/Typography";
import Stack from "@mui/material/Stack";
import ExpandCircleDownIcon from '@mui/icons-material/ExpandCircleDown';

import { useGetCategoriesQuery } from "../../redux/api";
import { usePatchEquipmentMutation } from "../../redux/api";


const EditEquipment = () => {
  const { id } = useParams();
  const [name, setName] = useState("");
  const [description, setDescription] = useState("");
  const [image, setImage] = useState("");
  const [category, setCategory] = useState("");
  const [brand, setBrand] = useState("");
  const [purchaseLink, setPurchaseLink] = useState("");
  const [priceRating, setPriceRating] = useState(0);

  const [patchEquipment, { isLoading: isMutationLoading, isError: isMutationError, data: mutationData }] = usePatchEquipmentMutation(id);

  const { data, error, isLoading } = useGetCategoriesQuery();

  if (!data) {
    return <div>No data</div>
  }
  if (isLoading) {
    return <div>Loading...</div>
  }
  if (error) {
    return <div> Error: {error.message} </div>;
  } else
    // console.log(data);
    console.log(category);
  //<----------------------RATING---------------------->
  const rating = [
    { value: 0, label: '$10' },
    { value: 20, label: '$20' },
    { value: 40, label: '$40' },
    { value: 60, label: '$60' },
    { value: 80, label: '$80' },
    { value: 100, label: '$100' },
    { value: 150, label: '$150' },
  ];
  function ratingValue(value) {
    return `${value}`;
  }
  //<----------------------SUBMIT FORM---------------------->

  const handleSubmit = async (event) => {
    try {
      event.preventDefault();
      const result = await patchEquipment({
        id,
        equipment: { name, description, image, categoryId: category, priceRating: Number(priceRating), brand, purchaseLink }
      })
      console.log(result)
    } catch (error) {
      console.error(error)
    }
  }
  console.log(category)
  return (
    <>
      <Accordion sx={{ m: 2 }}>
        <AccordionSummary>
          <Typography variant="h5" sx={{ textAlign: "center", p: 1 }}>
            Edit Current Equipment <ExpandCircleDownIcon />
          </Typography>
        </AccordionSummary>
        <Card sx={{ px: 10, py: 2 }}>
          <Stack direction="row">
            <form onSubmit={handleSubmit}>
              <Stack direction="column">
                <TextField
                  label="Edit Equipment Name"
                  value={name}
                  onChange={(event) => setName(event.target.value)}
                  size="small"
                  variant="filled"
                  sx={{ m: 1 }}
                />
                <Typography>
                  Select Category:
                </Typography>
                <Stack direction="row">
                  {data && data.map((category) => (
                    <Box key={category.id}>
                      <Button
                        onClick={() => setCategory(category.id)}
                        sx={{ mx: 1, backgroundColor: "#9BCDD2" }}>
                        {category.category}
                      </Button>
                    </Box>
                  ))
                  }
                </Stack>
                <TextField
                  label="Edit Description"
                  value={description}
                  onChange={(event) => setDescription(event.target.value)}
                  size="small"
                  variant="filled"
                  sx={{ m: 1 }}
                />
                <TextField
                  label="Edit Image URL"
                  value={image}
                  onChange={(event) => setImage(event.target.value)}
                  size="small"
                  variant="filled"
                  sx={{ m: 1 }}
                  multiline
                />
                <Typography>
                  Price Rating:
                </Typography>
                <Box sx={{ textAlign: "center" }}>
                  <Slider
                    aria-label="Custom marks"
                    defaultValue={priceRating}
                    onChange={(event) => setPriceRating(event.target.value)}
                    getAriaValueText={ratingValue}
                    step={5}
                    valueLabelDisplay="auto"
                    marks={rating}
                  />
                </Box>
                <TextField
                  label="Edit Brand Name"
                  value={brand}
                  onChange={(event) => setBrand(event.target.value)}
                  size="small"
                  variant="filled"
                  sx={{ m: 1 }}
                  multiline
                />
                <TextField
                  label="Edit Link to Seller"
                  value={purchaseLink}
                  onChange={(event) => setPurchaseLink(event.target.value)}
                  size="small"
                  variant="filled"
                  sx={{ m: 1 }}
                  multiline
                />

                {/* <---------------------------SUBMIT BUTTON-----------------------------> */}
                <Button type="submit" sx={{ backgroundColor: "#088395", color: "white", m: 2, p: 1 }}>
                  <Typography variant="h6">
                    Submit Equipment
                  </Typography>
                </Button>
              </Stack>
            </form>
          </Stack>
        </Card>
      </Accordion>
    </>
  )
}

export default EditEquipment








// const UpdateEquipmentForm = ({ id, equipment }) => {
//   const [name, setName] = useState("");
//   const [description, setDescription] = useState("");
//   const [image, setImage] = useState("");
//   const [categoryId, setCategoryId] = useState("");
//   const [brand, setBrand] = useState("");
//   const [purchaseLink, setPurchaseLink] = useState("");
//   const [priceRating, setPriceRating] = useState("");

//   const handleSubmit = async (event) => {
//     event.preventDefault();

//     const formData = new FormData();
//     formData.append('name', name);
//     formData.append('description', description);
//     formData.append('image', image);
//     formData.append('categoryId', categoryId);
//     formData.append('brand', brand);
//     formData.append('purchaseLink', purchaseLink);
//     formData.append('priceRating', priceRating);

//     const response = await fetch(`/api/equipment/${id}`, {
//       method: 'PATCH',
//       body: formData,
//     });

//     if (response.ok) {
//       // Equipment updated successfully
//       const updatedEquipment = await response.json();
//       console.log('Equipment updated successfully:', updatedEquipment);
//     } else {
//       // Error updating equipment
//       console.error('Error updating equipment:', response.status);
//     }
//   };

