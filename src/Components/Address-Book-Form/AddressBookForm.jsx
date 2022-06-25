import React, {useState, useEffect} from 'react'
import './Form.css'
import { Link, useParams } from 'react-router-dom';
import BookServices from '../../Service/BookService'
import Button from '@mui/material/Button';
import Box from '@mui/material/Box';
import Logo from '../../Assests/icon/icons8-address-book-2-48.png'



const Form = (props) =>{

/*=================================================================================================== */
let startValue = {
    name: "",
    contact: "",
    address: "",
    // city: "",
    // state: "",
    zip: "",
    // isUpdate: false,
    nameError:'',
    contactError:'',
    addressError:'',
    zipError:'',
}
const [formValue, setForm] = useState(startValue)

const onReset = () => {
    setForm({
        ...startValue, id: formValue.id, isUpdate: formValue.isUpdate 
    });
};

const onNameChange = (event) => {
    setForm({ ...formValue, [event.target.name]: event.target.value });
    console.log('value for', event.target.name, event.target.value);
}

const nameCheck = (event) => {
    console.log('value is', event.target.value);
    const nameRegex = RegExp("^[A-Z]{1}[a-zA-Z\s]{2,}$");
    // setForm({name: event.target.value });
    setForm({ ...formValue, [event.target.name]: event.target.value });
    if(nameRegex.test(event.target.value)){
        setForm({nameError:''})
        console.log(event.target.value)
        setForm({ ...formValue, [event.target.name]: event.target.value });
    }
    else setForm({nameError:'Incorrect name'})
   
}


  const checkcontact = (event) => {
    console.log('value is', event.target.value);
    const nameRegex = RegExp("^[0-9]{2}\\s{0,1}[0-9]{10}$");
    setForm({contact: event.target.value});
    if(nameRegex.test(event.target.value)){
        setForm({contactError:''})
    }
    else setForm({contactError:'Enter valid number'})
    
  }

  const checkAddress = (event) => {
    console.log('value is', event.target.value);
    const nameRegex = RegExp("^[a-zA-Z0-9-, ]+$");
    setForm({address: event.target.value});
    if(nameRegex.test(event.target.value)){
        setForm({addressError:''})
    }
    else setForm({addressError:'Enter Valid Address'})
    setForm({ ...formValue, [event.target.name]: event.target.value });
  }

  const checkZip = (event) => {
    console.log('value is', event.target.value);
    const nameRegex = RegExp("^[1-9]{1}[0-9]{5}$");
    setForm({zip: event.target.value});
    if(nameRegex.test(event.target.value)){
        setForm({zipError:''})
    }
    else setForm({zipError:'Enter Valid zip'})
    setForm({ ...formValue, [event.target.name]: event.target.value });
  }



const params = useParams();
    useEffect (() => {
        console.log(params.id)
        if (params.id){
            getPersonId(params.id)
            console.log(params.id)
        }
    },[params.id]);

const getPersonId = (employeeId) => {
    console.log("Data Found")
    BookServices.getPersonById(employeeId).then((data)=>{
        let obj = data.data.data;
        console.log(obj);
        setData(obj);
        });
    };
        
    const setData = (obj) => {
            console.log()
             setForm({
               ...formValue,
               ...obj,
               id: obj.id,
               name: obj.name,
               contact: obj.contact,
               address: obj.address,
               city: obj.city,
               state: obj.state,
               zip: obj.zip,
               isUpdate :true,
             });
           };

const save = async (event) => {
    event.preventDefault();
    
    let object = {
        id: formValue.id,
        name: formValue.name,
        contact: formValue.contact,
        address: formValue.address,
        city: formValue.city,
        state: formValue.state,
        zip: formValue.zip
    };

    if(formValue.isUpdate) {
        BookServices.updatePerson(params.id,object)
        .then((data) => {
            var value = window.confirm(data);
            if(value === true){
                alert("update successfull!");
                this.props.history.push("");
              }else{
                  window.location.reload();
              }
        });
    } else {
        BookServices.addPerson(object).then((response) => {
            console.log(response);
            alert("Data Added!!")
          })          
    }    
    // window.location.reload(); 
}
/*=================================================================================================== */

    return (
        
            <div>
                <div className="home-button">
                <Link to="/home">
                <Button variant="contained" size="large">Home</Button></Link>
                </div>
                <Box sx={{ '& button': { m: 1 } }}>
                <div className="form-content">
                    <div className="form-head">
                        <span> PERSON ADDRESS FORM </span>
                    </div>
                <form className="form" action="#" onSubmit={save}>
                    <label className="label text" htmlFor="name">Full Name</label>
                    <div className="row-content">
                        <input className="input" type="text" id="name" name="name" placeholder="Enter Name" 
                            onChange={nameCheck} value={formValue.name}/>
                        <span className="error-output">{formValue.nameError}</span>
                    </div>

                    <label className="label text" htmlFor="phone">Phone Number</label>
                    <div className="row-content">
                        <input className="input" type="number" id="contact" name="contact" placeholder="Enter Phone Number" 
                            onChange={checkcontact} value={formValue.contact} required/>
                         <span className="error-output">{formValue.contactError}</span>
                    </div>

                    <label className="label text" htmlFor="address">Address</label>
                    <div className="row-content">
                        <textarea className="input" name="address" id="address" rows="4" placeholder="Enter Address" 
                            onChange={checkAddress} value={formValue.address} ></textarea>
                             <span className="error-output">{formValue.addressError}</span>
                    </div>

                    <div className="row">
                        <div className="input-content">
                            <label className="label text" htmlFor="city">City</label>
                                <div className="row-content">
                                    <select className="input" name="city" id="city" value={formValue.city} onChange={onNameChange} >
                                    <option value="">City</option>
                                    <option value="Mumbai">Mumbai</option>
                                    <option value="Solapur">Solapur</option>
                                    <option value="Pune">Pune</option>
                                    <option value="Chennai">Chennai</option>
                                    <option value="Kolkata">Kolkata</option>
                                    <option value="Jaipur">Jaipur</option>
                                    </select>
                                </div>
                        </div>
                    <div className="input-content">
                    <label className="label text" htmlFor="state">State</label>
                    <div className="row-content">
                        <select className="input" name="state" id="state" onChange={onNameChange} value={formValue.state}>
                            <option value="">State</option>
                            <option value="Rajasthan">Rajasthan</option>
                            <option value="Maharashtra">Maharashtra</option>
                            <option value="West Bengal">West Bengal</option>
                            <option value="Bihar">Bihar</option>
                            <option value="Tamil Nadu">Tamil Nadu</option>
                        </select>
                    </div>
                </div>
                <div className="input-content">
                    <label className="label text" htmlFor="zip">ZipCode</label>
                    <div className="row-content">
                        <input className="input" type="number" id="zip" name="zip" placeholder="Enter Zip Code" 
                            onChange={checkZip} value={formValue.zip} required/>
                         <span className="error-output">{formValue.zipError}</span>
                    </div>
              </div>
          </div>
          <div className="buttonParent">
              <div className="add-reset">
                  <Button variant="contained" size="large" type="submit" id="addButton">{formValue.isUpdate ? 'Update' : 'Submit'}</Button>
                  <Button variant="contained" size="large" type="reset" id="resetButton" onClick={onReset}>Reset</Button>
              </div>
          </div>
      </form>
  </div>
  </Box>
</div>

)}

export default Form;