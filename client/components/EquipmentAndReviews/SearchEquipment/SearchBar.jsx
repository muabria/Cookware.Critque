import TextField from "@mui/material/TextField";
import SearchIcon from '@mui/icons-material/Search';
import Stack from '@mui/material/Stack';

import { useState } from 'react';
import { useGetEquipmentQuery } from "../../../redux/api";

import SearchResults from './SearchResults';

const SearchBar = ({ onSubmit }) => {
    const [searchEquipment, setSearchEquipment] = useState("");
    const [showResult, setShowResult] = useState(false);

    const { data, error, isLoading } = useGetEquipmentQuery();
    if (isLoading) {
        return <div> </div>;
    }
    if (error) {
        return <div>Oops! Something went wrong loading the data.</div>;
    }
console.log("Data:" + data)
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
                        if (showResult === true) {
                            setShowResult(false);
                        }
                        setSearchEquipment(event.target.value)
                    }}
                    sx={{
                        border: "solid 2px",
                        borderRadius: "7px",
                        borderColor: "#163c3a",
                        background: "white"
                    }} />
                {/*----------------------------------SUBMIT BUTTON-------------------------------- */}
                <button
                    className="search-button"
                    onClick={() => setShowResult(true)} >
                    <SearchIcon />
                </button>
            </Stack>
            {showResult &&
                <SearchResults results={filteredSearch} />}
        </>
    );
};
export default SearchBar;