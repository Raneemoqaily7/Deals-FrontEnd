import React, { useState, useEffect } from "react";
import axios from "axios";
import { AgGridReact } from 'ag-grid-react';
import AdminHome from "./AdminHome";

import { useTranslation } from "react-i18next";



export default function ClaimedDeals() {
    const [user, setUser] = useState({username:""})
    const [inputValue, setInputValue] = useState('');
    const [deals, setClaimedDeals] = useState([])
    const [t] = useTranslation();
    const columnDefs = [
        { field: 'name' },
        { field: 'amount' },
        { field: 'currency' },
        { field: 'DateTime_UTC' },
        { field: 'Server_DateTime' },
        { field: 'Description' },
        { field: 'status' }
    ]
    const handleChange = (event) => {
        setInputValue(event.target.value);
        axios.get(`http://127.0.0.1:8000/api/user_list_id/${event.target.value}`)
            .then((response) => {
                 setClaimedDeals(response.data.claimed_deal)
                 setUser(response.data)
             })

            .catch((error) => {
                setClaimedDeals([])
               
                console.log(error);
            });
    };



    return (


        <div className="container">
            <AdminHome />
            <div className="ag-theme-bootstrap" style={{ height: '400px', width: '100%' }}>
                <div>
                <h3> {t("userid")}:</h3>
                    <input
                    style={{  width: '50%' }}
                        type="text"
                        value={inputValue}
                        placeholder="Search for users claimed deals by user id"
                        onChange={handleChange}
                    />
                 </div>
                 
                 <br></br>
                 <div>
                    <h3>{t("username")}:{user.username}</h3>
                   
                 </div>
                <AgGridReact rowData={deals} columnDefs={columnDefs} pagination={true} paginationPageSize={10} />
            </div>
        </div>
    )
}