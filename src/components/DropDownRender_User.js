import React, { useState } from 'react';
import PropTypes from 'prop-types';
import axios from 'axios';
function DropdownRenderer_User(props) {
    const { value, values, onValueChange } = props;
    const [selectedValue, setSelectedValue] = useState(value);
    const user = props.data

    const handleChange = (event) => {
         const selectedValue = event.target.value;
         setSelectedValue(selectedValue);
        onValueChange(selectedValue);
        // send API to backend to update deal
        axios.patch(`http://127.0.0.1:8000/api/update_user_status/${user.id}`, {
            "status": selectedValue
        })
            .then((response) => {
                 console.log(JSON.stringify(response.data), "SSSSSSSSSSSSSSss");
            })
            .catch((error) => {
                console.log(error);
            });



    };

    return (
        <select value={selectedValue} onChange={handleChange}>
            {values.map((value) => (
                <option key={value} value={value}>
                    {value}
                </option>
            ))}
        </select>
    );
}

DropdownRenderer_User.propTypes = {
    value: PropTypes.string,
    values: PropTypes.array,
    onValueChange: PropTypes.func,
};

export default DropdownRenderer_User;