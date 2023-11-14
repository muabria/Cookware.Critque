import { TextField, Button, Typography, Card, Fab, Stack } from '@mui/material';
import SearchIcon from '@mui/icons-material/Search';
import { useState } from 'react';
//import { use???Query } from '???';

const SearchBar = ({ onSubmit }) => {
    //data
    //   const { data, error, isLoading } = use???Query();
    const [searchEquipment, setSearchEquipment] = useState('');

    // if (isLoading) {
    //     return <div> Loading... </div>;
    // }
    // if (error) {
    //     return <div>Error: {error.message}</div>;
    // }

    return (
        <>
            {/*-----------------------------------------TEXT FIELD--------------------------------------- */}
            <TextField
                type="text"
                label="Find Equipment by Name"
                size="small"
                value={searchEquipment}
                onChange={(event) => setSearchEquipment(event.target.value)}
                sx={{
                    backgroundColor: 'white',
                }}
            />
            {/*-----------------------------------------SUBMIT BUTTON--------------------------------------- */}
            <Button
                onClick={() => onSubmit(searchEquipment)}
                sx={{ color: "#5C7658", backgroundColor: "#EE8972", mx: 1 }}>
                <SearchIcon />
            </Button>
        </>
    );
};
export default SearchBar;