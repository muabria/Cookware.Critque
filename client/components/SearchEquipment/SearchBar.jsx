import Button from "@mui/material/Button";
import Grid from "@mui/material/Grid";
import TextField from "@mui/material/TextField";
import SearchIcon from '@mui/icons-material/Search';
import Stack from '@mui/material/Stack';

import { useState } from 'react';
import { useGetSingleEquipmentQuery } from "../../redux/api";

import SearchResults from './SearchResults';
import LoadingMessage from "../ErrorMessages/LoadingMessage";

const SearchBar = ({ onSubmit }) => {
    const { data, error, isLoading } = useGetSingleEquipmentQuery();
    const [searchEquipment, setSearchEquipment] = useState("");
    const [showResult, setShowResult] = useState(false);

    if (!data) {
        return <div> Oops, our own web equipment is broken. We should have the issue resolved soon! </div>
    }
    if (isLoading) {
        return <div><LoadingMessage /></div>;
    }
    if (error) {
        return <div>Oops! Something went wrong loading the data.</div>;
    }

    const filteredEquipment = () => data.filter((equipment) =>
        equipment.name.toLowerCase().includes(searchEquipment.toLowerCase())
    );
    const filteredSearch = filteredEquipment(searchEquipment)
    console.log(filteredEquipment(searchEquipment));

    return (
        <>
            {/*----------------------------------TEXT FIELD-------------------------------- */}
            <Stack direction="row">
                <TextField
                    type="text"
                    label="Search Equipment By Name"
                    fullWidth
                    value={searchEquipment}
                    onChange={(event) => {
                        // Check if the entered value is longer than the limit
                        if (event.target.value.length > 24) {
                            // Alert the user
                            alert("Too many characters. Maximum 24 characters allowed.");
                        } else {
                            setSearchEquipment(event.target.value);
                        }
                    }}
                    sx={{
                        backgroundColor: 'white',
                    }}
                    // Set the maximum length to 24
                    maxLength={24}
                />
                {/*----------------------------------SUBMIT BUTTON-------------------------------- */}
                <Button
                    onClick={() => setShowResult(true)}
                    sx={{
                        mx: .5,
                        boxShadow: 3,
                        color: "#3C1B1F",
                        backgroundColor: "#89c7c3",
                    }}>
                    <SearchIcon />
                </Button>
            </Stack>

            {showResult &&
                <SearchResults results={filteredSearch} />}
        </>
    );
};
export default SearchBar;