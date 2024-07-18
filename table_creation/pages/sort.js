import * as React from 'react';
import { useTheme } from '@mui/material/styles';
import OutlinedInput from '@mui/material/OutlinedInput';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select from '@mui/material/Select';
// import { sort } from 'fast-sort';
// import Button from '@mui/material/Button';


const ITEM_HEIGHT = 48;
const ITEM_PADDING_TOP = 8;
const MenuProps = {
    PaperProps: {
        style: {
            maxHeight: ITEM_HEIGHT * 4.5 + ITEM_PADDING_TOP,
            width: 250,
        },
    },
};

const vals = [
    'Id',
    'Name',
    'Role',
    'Years',
    'Salary'
];

function getStyles(val, sortval, theme) {
    return {
        fontWeight:
            sortval.indexOf(val) === -1
                ? theme.typography.fontWeightRegular
                : theme.typography.fontWeightMedium,
    };
}

export default function MultipleSelect({ rows, setRows, sortval, setSortval }) {
    const theme = useTheme();

    const handleChange = (event) => {
        const {
            target: { value },
        } = event;
        setSortval(
            // On autofill we get a stringified value.
            typeof value === 'string' ? value.split(',') : value,
        );
    };

    // const handleClick = () => {
    //     const sorted = sort(rows).asc(sortval);
    //     setRows(sorted);
    // }

    return (
        <div>
            <FormControl sx={{ m: 1, width: 300 }}>
                <InputLabel id="demo-multiple-name-label" sx={{ color: 'black' }}>Select</InputLabel>
                <Select
                    labelId="demo-multiple-name-label"
                    id="demo-multiple-name"
                    multiple
                    value={sortval}
                    onChange={handleChange}
                    input={<OutlinedInput label="Name" />}
                    MenuProps={MenuProps}
                    style={{backgroundColor:"white", borderRadius:"10px"}}
                >
                    {vals.map((val) => (
                        <MenuItem
                            key={val}
                            value={val}
                            style={getStyles(val, sortval, theme)}
                        >
                            {val}
                        </MenuItem>
                    ))}
                </Select>
            </FormControl>
            {/* <Button onClick={handleClick}>
                Confirm
            </Button> */}
        </div>
    );
}
