// import React from 'react';
// import { useState, useEffect, useCallback, useMemo } from 'react'
// import axios from "axios";
// import { AgGridReact } from 'ag-grid-react';
// import 'ag-grid-community/styles/ag-grid.css';
// import 'ag-grid-community/styles/ag-theme-alpine.css';
// import DropdownRenderer from './DropDownRenderer';

// import NewDeal from './NewDeal';
// import AdminHome from './AdminHome';
// function DealList() {
//     const [deals, setDeals] = useState([]);
//     const [token, setToken] = useState('');
//     const [selectdsUsers, setselectdsUsers] = useState([]);
//     const [showModal, setShowModal] = useState(false);
//     const handleClose = () => setShowModal(false);
//     const handleShow = () => setShowModal(true);
//     const [status, setstatus] = useState("");
//     const [columnDefs, setColumnDefs] = useState([
//         {
//             field: 'name',
//             minWidth: 190,
//             checkboxSelection: true,
//             headerCheckboxSelection: true,
//         },
//         { field: 'amount' },
//         { field: 'currency' },
//         { field: 'DateTime_UTC' },
//         { field: 'Server_DateTime' },
//         { field: 'Description' },
//          {
//             headerName: 'Status',
//             field: 'status',
//             cellRendererFramework: DropdownRenderer,
//             cellRendererParams: {
//                 values: ['Active', 'In_Active', "Deleted", 'Expired'],
//                 onValueChange: (newValue) => {
//                     setstatus(newValue)
//                 },
//             },
//         },
//     ]);
//     let gridApi;


//     const onGridReady = useCallback((params) => {

//         gridApi = params.api
//         // console.log(params.api,"paraaaams")
//         axios.get('http://127.0.0.1:8000/api/deal_list/')
//             .then((response) => {
//                 return response.data
//             })
//             .then(data => {
//                 setDeals(data)
//             })
//             .catch(error => console.error(error));
//     }, [])

//     const defaultColDef = useMemo(() => {
//         return {
//             sortable: true,
//             filter: true,
//             resizable: true,
//             floatingFilter: true,

//         };
//     }, []);

//     const onSelectionChanged = () => {
//         const selectedNodes = gridApi.getSelectedNodes();
//         const selectedData = selectedNodes.map(node => node.data)
//         setselectdsUsers(selectedData)
//     }
//     const gridOptions = {
//         rowSelection: 'multiple',
//         onSelectionChanged: onSelectionChanged
//     };

//     return (

//         <div className="container">
//             <AdminHome /> 
//             <div className="ag-theme-bootstrap" style={{ height: '400px', width: '100%' }}>


//                 <NewDeal showModal={showModal} handleClose={handleClose} setDeals={setDeals} />

//                 <AgGridReact rowData={deals} columnDefs={columnDefs} defaultColDef={defaultColDef} pagination={true} paginationPageSize={10} gridOptions={gridOptions} onGridReady={onGridReady} />
//                 <button onClick={handleShow}>Add Deal</button>
//             </div>
//         </div>




//     );
// }

// export default DealList;



import React from 'react';
import { useState, useEffect, useCallback, useMemo } from 'react'
import axios from "axios";
import { AgGridReact } from 'ag-grid-react';
import 'ag-grid-community/styles/ag-grid.css';
import 'ag-grid-community/styles/ag-theme-alpine.css';
import DropdownRenderer from './DropDownRenderer';

import NewDeal from './NewDeal';
import AdminHome from './AdminHome';

function DealList() {
  const [deals, setDeals] = useState([]);
  const [token, setToken] = useState('');
  const [selectdsUsers, setselectdsUsers] = useState([]);
  const [showModal, setShowModal] = useState(false);
  const handleClose = () => setShowModal(false);
  const handleShow = () => setShowModal(true);
  const [status, setstatus] = useState("");
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
    {
      headerName: 'Status',
      field: 'status',
      cellRendererFramework: DropdownRenderer,
      cellRendererParams: {
        values: ['Active', 'In_Active', "Deleted", 'Expired'],
        onValueChange: (newValue) => {
          setstatus(newValue)
        },
      },
    },
  ]);
  let gridApi;

  const onGridReady = useCallback((params) => {
    gridApi = params.api;
    axios.get('http://127.0.0.1:8000/api/deal_list/')
      .then((response) => {
        return response.data;
      })
      .then(data => {
        setDeals(data);
      })
      .catch(error => console.error(error));
  }, []);

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
    const selectedData = selectedNodes.map(node => node.data);
    setselectdsUsers(selectedData);
  };

  const gridOptions = {
    rowSelection: 'multiple',
    onSelectionChanged: onSelectionChanged
  };

  return (
    <div className="container">
      <AdminHome />
      <div className="grid-container">
        <NewDeal showModal={showModal} handleClose={handleClose} setDeals={setDeals} />
        <div className="button-container">
          <button onClick={handleShow}>Add Deal</button>
        </div>
        <div className="ag-theme-bootstrap" style={{ height: '400px', width: '100%' }}>
          <AgGridReact rowData={deals} columnDefs={columnDefs} defaultColDef={defaultColDef} pagination={true} paginationPageSize={10} gridOptions={gridOptions} onGridReady={onGridReady} />
        </div>
      </div>
    </div>
  );
}

export default DealList;
