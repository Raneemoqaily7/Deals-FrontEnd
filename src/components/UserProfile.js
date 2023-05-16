import React, { useState, useEffect } from 'react';
import { Card } from 'react-bootstrap';
import axios from 'axios';
import { useCookies } from "react-cookie";
import UserHome from './UserHome';

function UserProfile(props) {
    const [cookie, setCookie] = useCookies();
    const [selectedFile, setSelectedFile] = useState(null);
    const [image, setUserImage] = useState(null);

    const [formData, setFormData] = useState({
        username: "",
        status: "",
        email: "",
        phone: "",
        gender: null,
        Date_Of_Birth: null,
        user_image: null,
        claimed_deal: [],
    });
    const [amount, setAmount] = useState(0)
    useEffect(() => {

        setFormData(cookie.user)
        let totalAmount = cookie.user.claimed_deal.reduce((sum, element) => sum + parseInt(element.amount), 0);
        setAmount(totalAmount)

    }, [])
    const handleFileChange = (event) => {
        setSelectedFile(event.target.files[0]);
    };

    const handleUpload = () => {
        const newForm = new FormData();
        newForm.append('user_image', selectedFile);

        console.log(cookie.user, "cookieuser")
        axios.post(`http://127.0.0.1:8000/api/upload_image/${cookie.user.id}`, newForm)
            .then((response) => {
                let user_image = `http://127.0.0.1:8000${response.data.user_image}`;
                console.log(user_image, "USER IMAGE ")
                const updatedFormData = { ...formData, user_image: user_image };
                console.log(updatedFormData, "UPDATED FORM DATA")
                setFormData(updatedFormData);
                console.log(updatedFormData, "UPDATED FORM DATA2")
                const updatedUser = { ...cookie.user, user_image: user_image };
                setCookie("user", updatedUser, { path: "/" });
 
                setUserImage(user_image);


            })
            .catch((error) => {
                console.error(error);
            });

    };
    const cardStyle = {
        maxWidth: '300px',
        margin: '0 auto',
        marginTop: '20px',
        boxShadow: '0 4px 8px 0 rgba(0, 0, 0, 0.2)',
    };

    const imageStyle = {
        height: '300px',
        maxWidth: '300px',
        objectFit: 'cover',
    };

    const nameStyle = {
        fontSize: '20px',
        fontWeight: 'bold',
        marginBottom: '10px',
        textAlign: 'center',

    };

    const textStyle = {
        fontSize: '16px',
        marginBottom: '20px',
        textAlign: 'center',
    };



    return (
        <div>
            <UserHome />
            <Card style={cardStyle}>

                <label className="form-label" htmlFor="userImage">User Image</label>
                <input
                    type="file"
                    id="userImage"
                    name="userImage"
                    accept="image/*"
                    onChange={handleFileChange}
                />
                <button onClick={handleUpload}>Upload</button>

                <Card.Img variant="top" src={formData.user_image} style={imageStyle} />
                <Card.Body>
                    <Card.Title style={nameStyle}>{formData.username}</Card.Title>
                    <Card.Text style={textStyle}>{formData.email}</Card.Text>
                    <Card.Text style={textStyle}>{formData.gender} </Card.Text>
                    <Card.Text style={textStyle}>{formData.Date_Of_Birth} </Card.Text>
                    <Card.Text style={textStyle}>{formData.phone} </Card.Text>
                    <Card.Text style={textStyle}>{formData.claimed_deal.length} Deals</Card.Text>
                    <Card.Text style={textStyle}>{amount} Amount</Card.Text>
                </Card.Body>
            </Card>
        </div>
    );


}

export default UserProfile;
