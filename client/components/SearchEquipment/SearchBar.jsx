import Button from "@mui/material/Button";
import Grid from "@mui/material/Grid";
import TextField from "@mui/material/TextField";
import SearchIcon from '@mui/icons-material/Search';
import Stack from '@mui/material/Stack';

import { useState } from 'react';
import { useGetSingleEquipmentQuery } from '../../redux/api';

import SearchResults from './SearchResults';

const SearchBar = ({ onSubmit }) => {
    const { data, error, isLoading } = useGetSingleEquipmentQuery();
    const [searchEquipment, setSearchEquipment] = useState("");
    const [showResult, setShowResult] = useState(false);

    if (!data) {
        return <div> Oops, our own web equipment is broken. We should have the issue resolved soon! </div>
    }
    if (isLoading) {
        return <div> Loading... </div>;
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
                    size="small"
                    fullWidth
                    value={searchEquipment}
                    onChange={(event) => {
                        if (showResult === true) {
                            setShowResult(false);
                        }
                        setSearchEquipment(event.target.value)
                    }}
                    sx={{
                        backgroundColor: 'white',
                    }}
                />
                {/*----------------------------------SUBMIT BUTTON-------------------------------- */}
                <Button
                    onClick={() => setShowResult(true)}
                    sx={{ color: "#5C7658", backgroundColor: "transparent", mx: 1, mb: 5 }}>
                    <SearchIcon />
                </Button>
                </Stack>

                {showResult &&
                    <SearchResults results={filteredSearch} />}
        </>
    );
};
export default SearchBar;