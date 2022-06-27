import React, {useState, useEffect} from 'react'
import './Form.css'
import { Link, useParams } from 'react-router-dom';
import BookServices from '../../Service/BookService'
import Button from '@mui/material/Button';
import Box from '@mui/material/Box';
import Logo from '../../Assests/icon/icons8-address-book-2-48.png'



const Form = (props) =>{

    let initialValue = {
        name: '',
        address: '',
        city: 'Select City',
        state: 'Select State',
        contact: '',
        zip: '',
        isUpdate: false,
        // error: {
        //     name: ' ',
        //     address: ' ',
        //     city: ' ',
        //     state: ' ',
        //     contact: ' ',
        //     zip: ' '
        // }
        
    }
    let initialError = {
        name: '',
        address: '',
        city: '',
        state: '',
        contact: '',
        zip: '',
    }

    const [formValue, setForm] = useState(initialValue);
    const [formError, setFormError] = useState(initialError);
    const params = useParams();

    const validateData = () => {
        let error = formError;
        if (!formValue.name.match('^[A-Z]{1}[a-zA-Z\\s]{2,}$')) {
            error.name = "Invalid NAME";
        }
        else {
            error.name = "";
        }
    
        if (!formValue.address.match('^[a-zA-Z0-9-, ]+$')){
            error.address = "Invalid ADDRESS";
        }
        else {
            error.address = "";
        }
    
        if (!formValue.contact.match('^[0-9]{2}\\s{0,1}[0-9]{10}$')) {
            error.contact = "Invalid PHONE NUMBER"
        }
        else {
            error.contact = "";
        }
    
        if (!formValue.zip.match('^[1-9]{1}[0-9]{5}$')) {
            error.zip = "Invalid ZIP CODE";
        }
        else {
            error.zip = "";
        }
    
        setFormError(error);
    }

    useEffect(() => {
        validateData();
    });
    const getContactByID = (id) => {
        BookServices.getAll(id).then((response) => {
            let obj = response.data.data;
            setData(obj);
        }).catch((error) => {
            alert(error);
        })
    }

    const setData = (obj) => {
        setForm({
            ...formValue,
            ...obj,
            isUpdate: true,
            name: obj.name,
            address: obj.address,
            city: obj.city,
            state: obj.state,
            contact: obj.phone,
            zip: obj.zip
        })
    }

    useEffect(() => {
        if (params.id) {
            getContactByID(params.id);
        }
    }, []);

    const changeValue = async (event) => {
        setForm({...formValue, [event.target.name]: event.target.value})
    }

    const save = (event) => {
        event.preventDefault();
        let object ={
            name:formValue.name,
            address: formValue.address,
            city: formValue.city,
            state: formValue.state,
            phone: formValue.contact,
            zip: formValue.zip,
        }
        if (formValue.isUpdate) {
            BookServices.updatePerson(params.id, object).then((response) => {
                props.history.push('');
            }).catch((error) => {
                alert(error);
            })
        }
        else {
            BookServices.addPerson(object).then((response) => {
                props.history.push('');
            }).catch((error) => {
                alert(error);
            })
        }
    }

    const reset = () => {
        setForm({...initialValue, id: formValue.id, isUpdate: formValue.isUpdate});
    }

    return (
        <>
            <header className="header-content header">
                <div className="logo-content">
                    <img src={Logo} alt="logo"/>
                    <div>
                        <span className="addressBook-text">Address</span><br/>
                        <span className="addressBook-text addressBook-book">Book</span>
                    </div>
                </div>
            </header>
            <div className="form-content">
                <form action="#" className="form" onSubmit={save}>
                    <div className="form_header">
                        <div className="form_header_text">Person Address Form</div>
                        <Link to="/home">
                        <Button variant="contained" size="large">Home</Button></Link>
                        
                    </div>

                    <div className="form_content">
                        <div className="row_content">
                            <label htmlFor="name" className="label text">Full Name</label>
                            <br/>
                            <input type="text" className="input" id="name" name="name" placeholder="Full Name"
                                     value={formValue.name} onChange={changeValue} autoComplete="off" required/>
                            <div className="error">{formError.name}</div>
                        </div>
                        <div className="row_content">
                            <label htmlFor="contact" className="label text">Phone Number</label>
                            <br/>
                            <input type="tel" className="input" id="contact" name="contact" placeholder="Phone Number"
                                   value={formValue.contact} onChange={changeValue}  autoComplete="off"/>
                           <div className="error">{formError.contact}</div>
                        </div>
                        <div className="row_content">
                            <label htmlFor="address" className="label text">Address</label>
                            <br/>
                            <textarea name="address" id="address" placeholder="Address" autoComplete="off"
                                      value={formValue.address} onChange={changeValue} required></textarea>
                            <div className="error">{formError.address}</div>
                        </div>
                        <div className="row_content">
                            <div className="column_constrains">
                                <div className="column_content">
                                    <label htmlFor="city" className="label text">City</label>
                                    <br/>
                                        <select name="city" id="city" value={formValue.city} onChange={changeValue}>
                                            <option selected disabled hidden value="Select City">Select City</option>
                                            <option value="Kurnool">Kurnool</option>
                                            <option value="Bangalore">Bangalore</option>
                                            <option value="Chennai">Chennai</option>
                                            <option value="Delhi">Delhi</option>
                                            <option value="Mumbai">Mumbai</option>
                                            <option value="Hyderabad">Hyderabad</option>
                                        </select>
                                </div>
                                <div className="column_content">
                                    <label htmlFor="state" className="label text">State</label>
                                    <br/>
                                        <select name="state" id="state" value={formValue.state} onChange={changeValue}>
                                            <option selected disabled hidden value="Select State">Select State</option>
                                            <option value="Andhra Pradesh">Andhra Pradesh</option>
                                            <option value="Delhi">Delhi</option>
                                            <option value="Karnataka">Karnataka</option>
                                            <option value="Telangana">Telangana</option>
                                            <option value="Maharashtra">Maharashtra</option>
                                            <option value="Tamil Nadu">Tamil Nadu</option>
                                        </select>
                                </div>
                                <div className="column_content">
                                    <label htmlFor="zip" className="label text">Zip code</label>
                                    <br/>
                                    <input type="text" className="input zip" id="zip" name="zip"
                                           value={formValue.zip} onChange={changeValue} autoComplete="off" placeholder="Zip Code"/>
                                    <div className="error">{formError.zip}</div>
                                </div>
                            </div>
                        </div>
                        <div className="button_content">
                            <button type="submit" className="button button_submit" id="submitButton">{formValue.isUpdate ? 'Update' : 'Submit'}</button>
                            <button type="reset" className="button button_reset" id="resetButton" onClick={reset}>Reset</button>
                        </div>
                    </div>
                </form>
            </div>
        </>
    );
}
export default Form;