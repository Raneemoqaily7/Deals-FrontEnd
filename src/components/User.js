import React from 'react';
import { useState, useEffect, useCallback, useMemo } from 'react'
import axios from "axios";
import { AgGridReact } from 'ag-grid-react';
import DropdownRenderer_User from "./DropDownRender_User"
// import 'ag-grid-community/dist/styles/ag-theme-bootstrap.css';
import 'ag-grid-community/styles/ag-grid.css';
import 'ag-grid-community/styles/ag-theme-alpine.css';

import NewUser from "./NewUser"
import AdminHome from './AdminHome';
import { useTranslation } from "react-i18next";
function UserList() {
  const [users, setUsers] = useState([]);
  const [token, setToken] = useState('');
  const [status, setStatus] = useState('');
  const [selectdsUsers, setselectdsUsers] = useState([]);
  const [isAddUserOpen, setIsAddUserOpen] = useState(false);
  const [showModal, setShowModal] = useState(false);
  const handleClose = () => setShowModal(false);
  const handleShow = () => setShowModal(true);
  const [t] = useTranslation();




  const [columnDefs, setColumnDefs] = useState([
    {
      field: 'username',
      
      minWidth: 190,
      checkboxSelection: true,
      headerCheckboxSelection: true,
      headerName: t('username'),
    },
    { field: 'email' },
    { field: 'phone' },
    { field: 'gender' },
    { field: 'Date_Of_Birth' },
    { field: 'last_login' },
    
    
    {
      headerName: 'Status',
      field: 'status',
      cellRendererFramework: DropdownRenderer_User,
      cellRendererParams: {
        values: ['Active', 'In_Active', "Deleted", 'Expired'],
        onValueChange: (newValue) => {
          setStatus(newValue)
        },
      },
    }
    // ,
    // { field: 'date_joined' },
    // { field: 'Update_DateTime_UTC' }
    // ,{ field: 'last_login' },
    // { field: 'Server_DateTime' }

  ]);
  let gridApi;


  const onGridReady = useCallback((params) => {

    gridApi = params.api
    axios.get('http://127.0.0.1:8000/api/user_list/')
      .then((response) => {
        return response.data
      })
      .then(data => {
        setUsers(data)
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
    setselectdsUsers(selectedData)
  }
  const gridOptions = {
    rowSelection: 'multiple',
    onSelectionChanged: onSelectionChanged
  };
  const handleDelete = (e) => {
    let ids = []
    selectdsUsers.map(user => {
      ids.push(user.id)
    })
    const body = {
      data: {
        "users_id": ids,
      }
    }
    const config = {
      headers: { Authorization: `Token ${token}` }
    };
    axios.delete('http://127.0.0.1:8000/api/delete_user/', body)
      .then(() => {
        const result = users.filter(item => !selectdsUsers.includes(item));
        setUsers(result)
        alert("deleted successfully!!")
      })



  }


  return (
    <div className="container">
      <AdminHome />
      <div className="ag-theme-bootstrap" style={{ height: '400px', width: '100%' }}>

        <button onClick={handleDelete}>{t("delete")}</button>
        <button onClick={handleShow}>{t("adduser")}</button>
        <NewUser showModal={showModal} handleClose={handleClose} setUsers={setUsers} />
        <AgGridReact rowData={users} columnDefs={columnDefs} defaultColDef={defaultColDef} pagination={true} paginationPageSize={10} gridOptions={gridOptions} onGridReady={onGridReady} />
      </div>
    </div>




  );
}

export default UserList;
