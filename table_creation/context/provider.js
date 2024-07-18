import React, { useState } from 'react';
import { TableContext } from './create';
import CustomizedTables from '../pages/index';
import MultipleSelect from '../pages/sort';

const Provider = () => {
    const [sortval, setSortval] = useState([]);

    return (
        <div>
            <TableContext.Provider value={{ sortval, setSortval }}>
                <CustomizedTables />
                <MultipleSelect />  
            </TableContext.Provider>
        </div>
    )
}

export default Provider;
