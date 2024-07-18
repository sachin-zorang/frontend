import React, { useEffect } from 'react';
import { useState } from 'react';
import Button from '@mui/material/Button';


export default function Entry({ rows, setRows, setOpen, createData, nrows, setNrows }) {
    ///
    const [id, setId] = useState("");
    const [name, setName] = useState("");
    const [role, setRole] = useState("");
    const [years, setYears] = useState();
    const [salary, setSalary] = useState();

    const handleClick = () => {
        rows = [...nrows, createData(id, name, role, years, salary)];
        setRows(rows);
        setNrows(rows);
        setOpen(false);
        console.log(rows);
        console.log(nrows)
    }

    return (
        <div>
            <div>
                <div>Id: </div>
                <input
                    type="number"
                    className="input"
                    value={id}
                    onChange={(e) => {
                        const value = e.target.value;
                        const parsedValue = value === "" ? 0 : parseFloat(value);
                        setId(parsedValue);
                        console.log(id)
                    }}
                />
            </div>
            <div>
                <div>Name: </div>
                <input
                    type="text"
                    className="input"
                    value={name}
                    onChange={(e) => {
                        setName(e.target.value)
                        console.log(name)
                    }}
                />
            </div>
            <div>
                <div>Role: </div>
                <input
                    type="text"
                    className="input"
                    value={role}
                    onChange={(e) => {
                        setRole(e.target.value)
                        console.log(role)
                    }}
                />
            </div>
            <div>
                <div>Years: </div>
                <input
                    type="number"
                    className="input"
                    value={years}
                    onChange={(e) => {
                        const value = e.target.value;
                        const parsedValue = value === "" ? 0 : parseFloat(value);
                        setYears(parsedValue)
                        console.log(years)
                    }}
                />
            </div>
            <div>
                <div>Salary: </div>
                <input
                    type="number"
                    className="input"
                    value={salary}
                    onChange={(e) => {
                        const value = e.target.value;
                        const parsedValue = value === "" ? 0 : parseFloat(value);
                        setSalary(parsedValue);
                        console.log(salary);
                    }}
                />
            </div>
            <Button variant='contained' onClick={handleClick} style={{marginTop:"10px"}}>
                Confirm
            </Button>

        </div>
    )
}

