import React, { useState } from 'react';
import { Button, Modal } from 'react-bootstrap';
import axios from "axios";

import { useTranslation } from "react-i18next";

function NewDeal({ showModal, handleClose, setDeals }) {
    const [name, setname] = useState('');
    const [status, setStatus] = useState('Active');
    const [Description, setdescription] = useState('');
    // const [phone, setPhone] = useState(null);
    const [amount, setamount] = useState(null);
    const [currency, setcurrency] = useState(null);
    const [t] = useTranslation();



    const handleSubmit = async (event) => {
        event.preventDefault();










        const dealData = {
            name,
            Description,
            status,

            amount,
            currency,

        };


        axios.post('http://127.0.0.1:8000/api/add_deal/', dealData)
            .then((result) => {
                axios.get('http://127.0.0.1:8000/api/deal_list/')
                    .then((response) => {
                        setDeals(response.data)
                        alert("Added successfully!!")
                    })

                    .catch(error => console.error(error));
                console.log(result, "result")

            }).catch((error) => {

                console.log(error)
            })




    };

    return (
        <Modal show={showModal} onHide={handleClose}>
            <Modal.Header closeButton>
                {/* <Modal.Title>Add Deal</Modal.Title> */}
            </Modal.Header>
            <Modal.Body>
                <form onSubmit={handleSubmit}>
                    <label>
                        name:
                        <input type="text" value={name} onChange={(event) => setname(event.target.value)} />
                    </label>
                    <br />
                    <label>
                        Status:
                        <select value={status} onChange={(event) => setStatus(event.target.value)}>
                            <option value="Active">Active</option>
                            <option value="In_Active">In active</option>
                            <option value="Deleted">Deleted</option>
                            <option value="Expired">Expired</option>
                        </select>
                    </label>
                    <br />
                    <label>
                        Description:
                        <input type="Description" value={Description} onChange={(event) => setdescription(event.target.value)} />


                    </label>
                  
                    <br />
                    <label>
                        amount:
                        <input type="amount" value={amount} onChange={(event) => setamount(event.target.value)} />

                       

                    </label>
                    <br />
                    <label>
                        currency:
                        <input type="currency" value={currency} onChange={(event) => setcurrency(event.target.value)} />

                        

                    </label>
                  
                    <br />
                    <Button variant="primary" type="submit">{t("adddeal")}</Button>
                </form>
            </Modal.Body>
        </Modal>
    );
}
export default NewDeal;