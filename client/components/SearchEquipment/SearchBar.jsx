import { TextField, Button, Typography, Card, Fab, Stack } from '@mui/material';
import SearchIcon from '@mui/icons-material/Search';
import { useState } from 'react';
import { useGetEquipmentQuery } from '../../redux/api';

const SearchBar = ({ onSubmit }) => {
    const { data, error, isLoading } = useGetEquipmentQuery();
    const [searchEquipment, setSearchEquipment] = useState('');

    if (isLoading) {
        return <div> Loading... </div>;
    }
    if (error) {
        return <div>Error: {error.message}</div>;
    }
    console.log(data);

    return (
        <>
            {/*----------------------------------TEXT FIELD-------------------------------- */}
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
            {/*----------------------------------SUBMIT BUTTON-------------------------------- */}
            <Button
                onClick={() => onSubmit(searchEquipment)}
                sx={{ color: "#5C7658", backgroundColor: "transparent", mx: 1 }}>
                <SearchIcon />
            </Button>
        </>
    );
};
export default SearchBar;