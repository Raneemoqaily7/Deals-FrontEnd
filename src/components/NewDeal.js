import React, { useState } from 'react';
import { Button, Modal } from 'react-bootstrap';
import axios from "axios";

function NewDeal({ showModal, handleClose, setDeals }) {
    const [name, setname] = useState('');
    const [status, setStatus] = useState('Active');
    const [Description, setdescription] = useState('');
    // const [phone, setPhone] = useState(null);
    const [amount, setamount] = useState(null);
    const [currency, setcurrency] = useState(null);



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

                        {/* {descriptionError && <div className="error">{descriptionError}</div>} */}

                    </label>
                    {/* <br />
                    <label>
                        Phone:
                        <input type="text" value={phone} onChange={handlePhoneChange} placeholder='+962XXXXXXXXX' />
                            {phoneError && <div className="error">{phoneError}</div>} 
                    </label> */}
                    <br />
                    <label>
                        amount:
                        <input type="amount" value={amount} onChange={(event) => setamount(event.target.value)} />

                        {/* {descriptionError && <div className="error">{descriptionError}</div>} */}

                    </label>
                    <br />
                    <label>
                        currency:
                        <input type="currency" value={currency} onChange={(event) => setcurrency(event.target.value)} />

                        {/* {descriptionError && <div className="error">{descriptionError}</div>} */}

                    </label>
                    {/* <label>
                        Date of Birth:
                        <input type="date" value={currency} onChange={(event) => setcurrency(event.target.value)}/>
                    </label>
                    <br /> */}
                    {/* <label>
                        User Image:
                        <input type="file" onChange={(event) => setUserImage(event.target.files[0])} />
                    </label> */}
                    <br />
                    <Button variant="primary" type="submit">Add deal</Button>
                </form>
            </Modal.Body>
        </Modal>
    );
}
export default NewDeal;