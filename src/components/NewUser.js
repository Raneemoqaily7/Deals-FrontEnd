// import React, { useState } from 'react';
// import { Button, Modal } from 'react-bootstrap';
// import axios from "axios";
// import { useNavigate } from 'react-router-dom';
// function NewUser({ showModal, handleClose, setUsers }) {
//     const navigate = useNavigate()
//     const [username, setUsername] = useState('');
//     const [status, setStatus] = useState('Active');
//     const [email, setEmail] = useState('');
//     // const [phone, setPhone] = useState(null);
//     const [gender, setGender] = useState("");
//     const [Date_Of_Birth, setDate_Of_Birth] = useState(null);
//     const [user_image, setUserImage] = useState(null)
//     const [phone, setPhone] = useState('');
//     const [emailError, setEmailError] = useState('');
//     const [phoneError, setPhoneError] = useState('');
//     const [password, setPassword] = useState('');
//     const [password2, setPassword2] = useState('');
//     const [userNameError, setuserNameError] = useState('');
//     const [passwordVisible, setPasswordVisible] = useState(false);

//     // REGEX Validation for Email
//     const EmailValidation = (email) => {

//         // Regular expression for email validation
//         const rgx = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
//         return rgx.test(email);
//     };
//     // REGEX Validation for Phone

//     const PhoneValidation = (phone) => {
//         // Regular expression for phone validation
//         const rgx = /^\+962\d{8}$/;
//         return rgx.test(phone);
//     }




//     const handleSubmit = async (event) => {
//         event.preventDefault();
      
//         if (!EmailValidation(email)) {
//           setEmailError('Please enter a valid email address.');
//           return;
//         } else {
//           setEmailError(null);
//         }
      
//         if (!PhoneValidation(phone)) {
//           setPhoneError('Please enter a valid phone number.');
//           return;
//         } else {
//           setPhoneError(null);
//         }
      
//         const userData = {
//           username,
//           status,
//           password,
//           password2,
//           email,
//           phone,
//           gender,
//           Date_Of_Birth,
//           user_image,
//         };
//         console.log(userData, "USER DATA")
//         axios.post('http://127.0.0.1:8000/api/register/',userData ).then((response)=>{console.log(response,"response in REG")}).catch((error)=>{console.log(error, "ERROR IN REG")})  
        
        
        
//         // try {
//         //   const response = await axios.post('http://127.0.0.1:8000/api/register/',userData );
//         //   console.log(response.data);
//         //   axios.get('http://127.0.0.1:8000/api/user_list/')
//         //     .then((response) => {
//         //       setUsers(response.data);
//         //       console.log(response.data); // Debug: Check the user list response data
//         //       handleClose();
//         //     })
//         //     .catch((error) => {
//         //       console.error(error);
//         //     });
//         // } catch (error) {
//         //   console.error(error);
//         //   if (error && error.response) {
//         //     if (
//         //       error.response.data &&
//         //       error.response.data.email &&
//         //       error.response.data.email[0] === "account with this email already exists."
//         //     ) {
//         //       setEmailError(error.response.data.email);
//         //     } else if (
//         //       error.response.data &&
//         //       error.response.data.phone &&
//         //       error.response.data.phone[0] === "account with this phone no. already exists."
//         //     ) {
//         //       setPhoneError(error.response.data.phone);
//         //     } else if (
//         //       error.response.data &&
//         //       error.response.data.username &&
//         //       error.response.data.username[0] === "account with this username already exists."
//         //     ) {
//         //       setuserNameError(error.response.data.username);
//         //     }
//         //   }
//         // }
//       };
      

//     return (
//         <Modal show={showModal} onHide={handleClose}>
//             <Modal.Header closeButton>
//                 <Modal.Title>Add User</Modal.Title>
//             </Modal.Header>
//             <Modal.Body>
//                 <form onSubmit={handleSubmit}>
//                     <div className="form-group">
//                         <label htmlFor="username">Username:</label>
//                         <input
//                             type="text"
//                             id="username"
//                             value={username}
//                             onChange={(event) => setUsername(event.target.value)}
//                             className="form-control"
//                             required
//                         />
//                         {userNameError && <div className="error">{userNameError}</div>}
//                     </div>
//                     <div className="form-group">
//                         <label htmlFor="email">Email:</label>
//                         <input
//                             type="email"
//                             id="email"
//                             value={email}
//                             onChange={(event) => setEmail(event.target.value)}
//                             className="form-control"
//                             required
//                         />
//                         {emailError && <div className="error">{emailError}</div>}
//                     </div>
//                     <div className="form-group mb-4">
//                         <label htmlFor="password">Password:</label>
//                         <div className="input-group">
//                             <input
//                                 type={passwordVisible ? "text" : "password"}
//                                 id="password"
//                                 value={password}
//                                 onChange={(event) => {
//                                     setPassword(event.target.value)
//                                     setPassword2(event.target.value)
//                                 }}
//                                 className="form-control"
//                                 placeholder="Password"
//                                 required
//                             />
//                             <div className="input-group-append">
//                                 <Button
//                                     variant="outline-secondary"
//                                     onClick={() => setPasswordVisible(!passwordVisible)}
//                                 >
//                                     {passwordVisible ? "Hide" : "Show"}
//                                 </Button>
//                             </div>
//                         </div>
//                     </div>
//                     <div className="form-group">
//                         <label htmlFor="phone">Phone:</label>
//                         <input
//                             type="text"
//                             id="phone"
//                             value={phone}
//                             onChange={(event) => setPhone(event.target.value)}
//                             className="form-control"
//                             placeholder="+962XXXXXXXX"
//                             required
//                         />
//                         {phoneError && <div className="error">{phoneError}</div>}
//                     </div>
//                     <div className="form-group">
//                         <label htmlFor="gender">Gender:</label>
//                         <select
//                             id="gender"
//                             value={gender}
//                             onChange={(event) => setGender(event.target.value)}
//                             className="form-control"
//                         >
//                             <option value="">Select Gender</option>
//                             <option value="MALE">Male</option>
//                             <option value="FEMALE">Female</option>
//                         </select>
//                     </div>
//                     <div className="form-group">
//                         <label htmlFor="Date_Of_Birth">Date of Birth:</label>
//                         <input
//                             type="date"
//                             id="Date_Of_Birth"
//                             value={Date_Of_Birth}
//                             onChange={(event) => setDate_Of_Birth(event.target.value)}
//                             className="form-control"
//                         />
//                     </div>
//                     <div className="form-group">
//                         <label htmlFor="userImage">User Image:</label>
//                         <input
//                             type="file"
//                             id="user_image"
//                             onChange={(event) => setUserImage(event.target.files[0])}
//                             className="form-control"
//                         />
//                     </div>
//                     <div className="form-group">
//                         <label htmlFor="status">Status:</label>
//                         <select
//                             id="status"
//                             value={status}
//                             onChange={(event) => setStatus(event.target.value)}
//                             className="form-control"
//                         >
//                             <option value="Active">Active</option>
//                             <option value="In_Active">In active</option>
//                             <option value="Deleted">Deleted</option>
//                             <option value="Expired">Expired</option>
//                         </select>
//                     </div>
//                     <Button variant="primary" type="submit">
//                         Add User
//                     </Button>
//                 </form>
//             </Modal.Body>
//         </Modal>
//     );
// }






// export default NewUser;




import React, { useState } from "react";
import 'bootstrap/dist/css/bootstrap.min.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faEye, faEyeSlash } from '@fortawesome/free-solid-svg-icons';
import { useNavigate } from "react-router-dom";
import { Button, Modal } from 'react-bootstrap';

import axios from "axios"
 function NewUser({ showModal, handleClose, setUsers }) {

    const navigate = useNavigate();

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
                 axios.get('http://127.0.0.1:8000/api/user_list/')
                    .then((response) => {
                      setUsers(response.data)
                        //  navigate("/")
                         handleClose();
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
            })

    };

    const handleFileChange = (event) => {
        setSelectedFile(event.target.files[0]);
    };

    const handleUpload = () => {
        const formData = new FormData();
        formData.append('user_image', selectedFile);

        axios.post('http://127.0.0.1:8000/api/upload_image/', formData)
            .then((response) => {
                console.log(response.data);
            })
            .catch((error) => {
                // Handle upload error
                console.error(error);
            });
    };

    return (
    
                <Modal show={showModal} onHide={handleClose}>
                    <Modal.Header closeButton>
                        <Modal.Title>Add User</Modal.Title>
                    </Modal.Header>
                    <Modal.Body>
        <div className="container-fluid py-2 h-100 gradient-custom">
            <div className="row d-flex justify-content-center align-items-center h-100">
                <div className="col-12 col-md-8 col-lg-6 col-xl-5">
                    <div className="card-body p-5 text-center">

                        <form className="mb-md-5 mt-md-1 pb-5 login-form" onSubmit={handleSubmit}>
                            <h2 className="fw-bold mb-4 text-uppercase text-warning">Add New User</h2>

                            <div className="form-group mb-4">
                                <input
                                    type="text"
                                    id="username"
                                    name="username"
                                    value={formData.username}
                                    onChange={handleChange}
                                    className="form-control form-control-lg"
                                    placeholder="Username"
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
                                    placeholder="Email"
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
                                        placeholder="Password"
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
                                    placeholder="Confirm Password"
                                    required
                                />
                            </div>
                            {formData.password !== formData.password2 && (
                                <div className="error">Passwords don't match</div>
                            )}

                            <div className="form-group mb-4">
                                <input
                                    type="tel"
                                    id="phone"
                                    name="phone"
                                    value={formData.phone}
                                    onChange={handleChange}
                                    className="form-control form-control-lg"
                                    placeholder="Phone"
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
                                    <option value={null}>Select Gender</option>
                                    <option value="MALE">Male</option>
                                    <option value="FEMALE">Female</option>
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
                                <button onClick={handleUpload} className="btn btn-secondary mt-3">Upload</button>
                            </div>

                            <div className="form-group mb-4">
                                <input type="submit" value="New User" className="btn btn-warning btn-lg" />
                            </div>
                        </form>

                    </div>
                </div>
            </div>
        </div>
        </Modal.Body>
      </Modal>
    );
}
export default NewUser;

