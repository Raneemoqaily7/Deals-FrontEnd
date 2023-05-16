import React, { useState, useEffect } from 'react';
import { Card } from 'react-bootstrap';
import axios from 'axios';
import { useCookies } from "react-cookie";
import UserHome from './UserHome';
import i18n from 'i18next';
import { useTranslation } from "react-i18next";

function UserProfile(props) {
    const [cookie, setCookie] = useCookies();
    const [selectedFile, setSelectedFile] = useState(null);
    const [image, setUserImage] = useState(null);
    const [t, i18n] = useTranslation();

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
        maxWidth: '500px',
        margin: '0 auto',
        marginTop: '20px',
        boxShadow: '0 4px 8px 0 rgba(0, 0, 0, 0.2)',
    };


    const imageStyle = {
        height: '400px',
        maxWidth: '500px',
        objectFit: 'cover',
    };

    const nameStyle = {
        fontSize: '25px',
        fontWeight: 'bold',
        marginBottom: '10px',
        textAlign: 'center',
    };

    const textStyle = {
        fontSize: '21px',
        marginBottom: '20px',
        textAlign: 'center',
        fontFamily: "Courier New, monospace",
        fontweight: "bold",
            fontsize: "24px",
};


const buttonStyle = {
    display: 'block',
    margin: '0 auto',
    marginBottom: '10px',
    marginRight:"10px",
    backgroundColor: 'dark',
};







return (
    <div>
        <UserHome />
        <Card style={cardStyle}>




            <Card.Img variant="top" src={formData.user_image} style={imageStyle} />
            <Card.Body>
                <Card.Title style={nameStyle}>{formData.username}</Card.Title>
                <Card.Text style={textStyle}>{formData.email}</Card.Text>
                <Card.Text style={textStyle}>{formData.gender} </Card.Text>
                <Card.Text style={textStyle}>{formData.Date_Of_Birth} </Card.Text>
                <Card.Text style={textStyle}>{formData.phone} </Card.Text>
                <Card.Text style={textStyle}>{formData.claimed_deal.length} {t("deal")}</Card.Text>
                <Card.Text style={textStyle}>{amount} {t("amount")}</Card.Text>
            </Card.Body>
            <div style={{ display: 'flex', alignItems: 'center' }}>  
            <label className="form-label " htmlFor="userImage"></label>
             <input
                type="file"
                id="userImage"
                name="userImage"
                accept="image/*"
                onChange={handleFileChange}
                

                style={buttonStyle}
            />
                <button onClick={handleUpload} style={buttonStyle} marginLeft="10px">{t("uploadImage")}</button>
                </div>

        </Card>
    </div>
);


}

export default UserProfile;








