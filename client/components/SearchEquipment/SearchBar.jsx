import Button from "@mui/material/Button";
import Grid from "@mui/material/Grid";
import TextField from "@mui/material/TextField";
import SearchIcon from '@mui/icons-material/Search';

import { useState } from 'react';
import { useGetSingleEquipmentQuery } from '../../redux/api';

import SearchResults from './SearchResults';

const SearchBar = ({ onSubmit }) => {
    const { data, error, isLoading } = useGetSingleEquipmentQuery();
    const [searchEquipment, setSearchEquipment] = useState("");
    const [showResult, setShowResult] = useState(false);

    if(!data){
        return <div> Oops, our own web equipment is broken. We should have the issue resolved soon! </div>
    }
    if (isLoading) {
        return <div> Loading... </div>;
    }
    if (error) {
        return <div>Error:{error.message}</div>;
    }

    const filteredEquipment = () => data.filter((equipment) =>
        equipment.name.toLowerCase().includes(searchEquipment.toLowerCase())
    );
    const filteredSearch = filteredEquipment(searchEquipment)
    console.log(filteredEquipment(searchEquipment));

    return (
        <>
            {/*----------------------------------TEXT FIELD-------------------------------- */}
            <Grid container>
                <Grid xs={12}>
                    <TextField
                        type="text"
                        label="Equipment Name"
                        size="small"
                        value={searchEquipment}
                        onChange={(event) => setSearchEquipment(event.target.value)}
                        sx={{
                            backgroundColor: 'white',
                        }}
                    />
                    {/*----------------------------------SUBMIT BUTTON-------------------------------- */}
                    <Button
                        onClick={() => onSubmit(searchEquipment && setShowResult(true) )}
                        sx={{ color: "#5C7658", backgroundColor: "transparent", mx: 1, mb: 5 }}>
                        <SearchIcon />
                    </Button>
                </Grid>
                {showResult &&
                    <SearchResults results={filteredSearch} />}
            </Grid>
        </>
    );
};
export default SearchBar;