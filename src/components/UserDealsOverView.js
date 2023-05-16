import React from 'react';
import { useState, useEffect, useCallback, useMemo } from 'react'
import axios from "axios";
import { AgGridReact } from 'ag-grid-react';
import 'ag-grid-community/styles/ag-grid.css';
import 'ag-grid-community/styles/ag-theme-alpine.css';
import { useCookies } from "react-cookie";
import { useTranslation } from "react-i18next";



import NewDeal from './NewDeal';
import UserHome from './UserHome';
function UserDealView() {
    const [cookie, setCookie, removeCookie] = useCookies();
    const [deals, setDeals] = useState([]);
    const [t, i18n] = useTranslation();
    
    

    function ButtonRenderer(props) {
        const [user, setUser] = useState(cookie.user);
        function handleClick(e) {
            const claimed_deal_before = cookie.user.claimed_deal
            console.log(claimed_deal_before, "claimed_deal_before")
            const claimed_deal_after = claimed_deal_before.concat(props.data)
            console.log(claimed_deal_after, "claimed_deal_after")
            axios.patch(`http://127.0.0.1:8000/api/update_deals/${cookie.user.username}`, {
                "claimed_deal": claimed_deal_after
            })
                .then((response) => {
                    alert("Deal Claimed Succesfully ")
                    
                    console.log(JSON.stringify(response.data), "SSSSSSSSSSSSSSss");
                   
                    setCookie("user", response.data, { path: '/' });
                    setUser(response.data)
                    
                })
                .catch((error) => {
                    console.log(error);
                });



        }
        function test() {
            console.log(props.data, "IS CLAIMED DEAL ALREADY")
            console.log(cookie.user.claimed_deal ,"claimed deals")
            console.log(props.data ,"prooops")
            console.log(cookie.user.claimed_deal.includes(props.data) ,"condition")
            console.log(cookie.user.claimed_deal.find(item => item.id === props.data.id),"condition2")
        }

        return (
            <div>


                {user.claimed_deal.find(item => item.id === props.data.id)? <button onClick={test}>{t("claimed")}</button>
                    : <button onClick={handleClick}>{t("claim")}</button>
                }
            </div>
        );
    }


    const [columnDefs, setColumnDefs] = useState([
        {
            field: 'name',
            minWidth: 190,
            checkboxSelection: true,
            headerCheckboxSelection: true,
        },
        { field: 'amount' },
        { field: 'currency' },
        { field: 'DateTime_UTC' },
        { field: 'Server_DateTime' },
        { field: 'Description' },
        { headerName: 'Action', cellRendererFramework: ButtonRenderer },

    ]);
    let gridApi;


    const onGridReady = useCallback((params) => {

        gridApi = params.api
        // console.log(params.api,"paraaaams")
        axios.get('http://127.0.0.1:8000/api/deal_list/')
            .then((response) => {

                const res = response.data.filter((item) => item.status === "Active")
                return res
            })
            .then(data => {
                setDeals(data)
            })
            .catch(error => console.error(error));
    }, [])

    const defaultColDef = useMemo(() => {
        return {
            sortable: true,
            filter: true,

            resizable: true,
            floatingFilter: true,

        };
    }, []);

    const onSelectionChanged = () => {
        const selectedNodes = gridApi.getSelectedNodes();
        const selectedData = selectedNodes.map(node => node.data)
        // setselectdsUsers(selectedData)
    }
    const gridOptions = {
        rowSelection: 'multiple',
        onSelectionChanged: onSelectionChanged
    };

    return (

        <div className="container">
            <UserHome />
            <div className="ag-theme-bootstrap" style={{ height: '400px', width: '100%' }}>
                <AgGridReact rowData={deals} columnDefs={columnDefs} defaultColDef={defaultColDef} pagination={true} paginationPageSize={10} gridOptions={gridOptions} onGridReady={onGridReady} />
            </div>
        </div>




    );
}

export default UserDealView;
