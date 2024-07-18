import React, { useState } from 'react';
import MultipleSelect from './sort';


const Navbar = ({ rows, setRows, setSearch, sortval, setSortval }) => {

    const handleSearch = (event) => {
        setSearch(event.target.value);
    };

    return (
        <div style={{ display: "flex", background: "#6B569A", marginBottom: "10px" }}>

            <div style={{marginRight:"20px"}}>
                <MultipleSelect rows={rows} setRows={setRows} sortval={sortval} setSortval={setSortval}/>
            </div>

            <div>
                <label htmlFor="search">
                    <input style={{marginTop:"10px",height:"54px", width:"270px", borderRadius:"10px"}} placeholder='Search by Name/Role' id="search" type="text" onChange={handleSearch} />
                </label>
            </div>
        </div>
    )
}

export default Navbar
