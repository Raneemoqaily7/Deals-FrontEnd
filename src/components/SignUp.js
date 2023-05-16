import React, { useState, useTransition } from "react";
import 'bootstrap/dist/css/bootstrap.min.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faEye, faEyeSlash } from '@fortawesome/free-solid-svg-icons';
import { useNavigate } from "react-router-dom";
import { useTranslation } from "react-i18next";
import axios from "axios";

function SignUp() {
    const [t] = useTranslation();
    const navigate = useNavigate();
    const [isLoading, setIsLoading] = useState(false); 
    const [selectedFile, setSelectedFile] = useState(null);

    const [formData, setFormData] = useState({
        username: "",
        email: "",
        phone: "",
        password: "",
        password2: "",
        gender: null,
        Date_Of_Birth: null,
        status: 'Active',
        user_image: null
    });
    const [emailError, setEmailError] = useState('');
    const [phoneError, setPhoneError] = useState('');
    const [passwordVisible, setPasswordVisible] = useState(false);
    const [userNameError, setuserNameError] = useState('');
    const EmailValidation = (email) => {

        // Regular expression for email validation
        const rgx = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        return rgx.test(email);
    };
    // REGEX Validation for Phone

    const PhoneValidation = (phone) => {
        // Regular expression for phone validation
        const rgx = /^\+962\d{8}$/;
        return rgx.test(phone);
    }


    const handleChange = (e) => {
        const { name, value } = e.target;


        setFormData((prevState) => ({
            ...prevState,
            [name]: value
        }));

        console.log(formData, "Form Data")
    };



    const handleSubmit = (e) => {
        setIsLoading(true)
        e.preventDefault();
        // Perform form submission logic here
        console.log(formData);
        if (!EmailValidation(formData.email)) {
            setEmailError('Please enter a valid email address.');
            return;
        } else {
            setEmailError(null);
        }


        if (!PhoneValidation(formData.phone)) {
            setPhoneError('Please enter a valid phone number.');
            return;
        } else {
            setPhoneError(null);
        }



 

        axios.post('http://127.0.0.1:8000/api/register/', formData)
            .then((result) => {
                console.log(result, "Result")
                console.log(formData, "formData")
                 axios.get(`http://127.0.0.1:8000/api/user_list/${formData.username}`)
                    .then((response) => {
                        console.log(response.data, "NEW USER CREATED")
                        handleUpload(response.data.id)
                         navigate("/")
                    })

                    .catch(error => console.error(error));
 
            }).catch((error) => {
                console.log(error, "ERROR")
                if (error && error.response) {

                    if (error.response.data && error.response.data.email && error.response.data.email[0] === "account with this email already exists.") {
                        setEmailError(error.response.data.email)
                    } else if (error.response.data && error.response.data.phone && error.response.data.phone[0] === "account with this phone no. already exists.") {
                        setPhoneError(error.response.data.phone)

                    }
                    else if (error.response.data && error.response.data.username && error.response.data.username[0] === "account with this username already exists.") {
                        setuserNameError(error.response.data.username)

                    }
                }
                
                return;
            }).finally(() => {
                setIsLoading(false); // Set isLoading to false regardless of success or error
            });

    };

    const handleFileChange = (event) => {
        setSelectedFile(event.target.files[0]);
    };
 
    const handleUpload = (id) => {
        const newForm = new FormData();
        newForm.append('user_image', selectedFile);

         
        axios.post(`http://127.0.0.1:8000/api/upload_image/${id}`, newForm)
            .then((response) => {
                console.log(response)
                let user_image = `http://127.0.0.1:8000${response.data.user_image}`;
                console.log(user_image, "USER IMAGE ")
              


            })
            .catch((error) => {
                console.error(error);
            });

    };

    return (
        <div className="container-fluid py-2 h-100 gradient-custom">
            <div className="row d-flex justify-content-center align-items-center h-100">
                <div className="col-12 col-md-8 col-lg-6 col-xl-5">
                    <div className="card-body p-5 text-center">

                        <form className="mb-md-5 mt-md-1 pb-5 login-form" onSubmit={handleSubmit}>
                            <h2 className="text-uppercase text-warning">{t("title")}</h2>

                            <div className="form-group mb-4">
                                <input
                                    type="text"
                                    id="username"
                                    name="username"
                                    value={formData.username}
                                    onChange={handleChange}
                                    className="form-control form-control-lg"
                                    placeholder={t("username")}
                                    required
                                />
                                {userNameError && <div className="error">{userNameError}</div>}
                            </div>

                            <div className="form-group mb-4">
                                <input
                                    type="email"
                                    id="email"
                                    name="email"
                                    value={formData.email}
                                    onChange={handleChange}
                                    className="form-control form-control-lg"
                                    placeholder={t("email")}
                                    required
                                />
                                {emailError && <div className="error">{emailError}</div>}
                            </div>
                            <div className="form-group mb-4">
                                <div className="input-group">
                                    <input
                                        type={passwordVisible ? "text" : "password"}
                                        id="password"
                                        name="password"
                                        value={formData.password}
                                        onChange={handleChange}
                                        className="form-control form-control-lg"
                                        placeholder={t("password")}
                                        required
                                    />

                                </div>
                            </div>
                            <div className="form-group mb-4">
                                <input
                                    type="password"
                                    id="password2"
                                    name="password2"
                                    value={formData.password2}
                                    onChange={handleChange}
                                    className="form-control form-control-lg"
                                    placeholder={t("confirmPassword")}
                                    required
                                />
                            </div>
                            {formData.password !== formData.password2 && (
                                <div className="error">{t("passwordnotmatch")}</div>
                            )}

                            <div className="form-group mb-4">
                                <input
                                    type="tel"
                                    id="phone"
                                    name="phone"
                                    value={formData.phone}
                                    onChange={handleChange}
                                    className="form-control form-control-lg"
                                    placeholder={t("phone")}
                                    required
                                />
                                {phoneError && <div className="error">{phoneError}</div>}
                            </div>

                            <div className="form-group mb-4">
                                <select
                                    id="gender"
                                    name="gender"
                                    value={formData.gender}
                                    onChange={handleChange}
                                    className="form-control form-control-lg"
                                    required
                                >
                                    <option value={null}>{t("choosegender")}</option>
                                    <option value="MALE">{t("male")}</option>
                                    <option value="FEMALE">{t("female")}</option>
                                </select>
                            </div>

                            <div className="form-group mb-4">
                                <input
                                    type="date"
                                    id="Date_Of_Birth"
                                    name="Date_Of_Birth"
                                    value={formData.Date_Of_Birth}
                                    onChange={handleChange}
                                    className="form-control form-control-lg"
                                    
                                />
                            </div>

                            <div className="form-group mb-4">
                                <input
                                    type="file"
                                    id="user_image"
                                    name="user_image"
                                    accept="image/*"
                                    onChange={handleFileChange}
                                    className="form-control form-control-lg"
                                   
                                />
                                {/* <button onClick={handleUpload} className="btn btn-secondary mt-3">Upload</button> */}
                            </div>
                            {isLoading && (
                                <div className="spinner-border text-warning" role="status">
                                    <span className="visually-hidden">{t("loading")}...</span>
                                </div>
                            )}
                            <div className="form-group mb-4">
                                <input type="submit" value={t("submit")} className="btn btn-warning btn-lg"  disabled={isLoading}/>
                            </div>
                        </form>

                    </div>
                </div>
            </div>
        </div>
    );
}
export default SignUp;

