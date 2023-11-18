import { TextField, Button, Grid, Typography, Card, Fab, Stack } from '@mui/material';
import SearchIcon from '@mui/icons-material/Search';
import { useState } from 'react';
import { useGetS, useGetSingleEquipmentQuery } from '../../redux/api';
import SearchResults from './SearchResults';

const SearchBar = ({ onSubmit }) => {
    const { data, error, isLoading } = useGetSingleEquipmentQuery();
    const [searchEquipment, setSearchEquipment] = useState("");
    const [showResult, setShowResult] = useState(false);

    if (isLoading) {
        return <div> Loading... </div>;
    }
    if (error) {
        return <div>Error:{error.message}</div>;
    } else {
        // console.log(searchEquipment);
        // console.log(data);
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