import React, {useState, useEffect} from 'react'
import './Form.css'
import { Link, useParams } from 'react-router-dom';
import BookServices from '../../Service/BookService' 

const Form = (props) =>{

/*=================================================================================================== */
let startValue = {
    fullName: "",
    phoneNumber: "",
    address: "",
    city: "",
    state: "",
    zip: "",
    isUpdate: false,
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
               fullName: obj.fullName,
               phoneNumber: obj.phoneNumber,
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
        fullName: formValue.fullName,
        phoneNumber: formValue.phoneNumber,
        address: formValue.address,
        city: formValue.city,
        state: formValue.state,
        zip: formValue.zip
    };

    BookServices.addPerson(object);
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
       
  <div className="form-content">
      <div className="form-head">
          <span> PERSON ADDRESS FORM </span>
      </div>
      
      <form className="form" action="#" onSubmit={save}>
          <label className="label text" htmlFor="name">Full Name</label>
          <div className="row-content">
              <input className="input" type="text" id="fullName" name="fullName" placeholder="Enter Name" 
              onChange={onNameChange} value={formValue.fullName} required/>
              <error-output className="fullname-error" htmlFor="name"></error-output>
          </div>

          <label className="label text" htmlFor="phone">Phone Number</label>
          <div className="row-content">
              <input className="input" type="number" id="phoneNumber" name="phoneNumber" placeholder="Enter Phone Number" 
              onChange={onNameChange} value={formValue.phoneNumber} required/>
              <error-output className="phone-error" htmlFor="number"></error-output>
          </div>

          <label className="label text" htmlFor="address">Address</label>
          <div className="row-content">
              <textarea className="input" name="address" id="address" rows="4" placeholder="Enter Address" 
              onChange={onNameChange} value={formValue.address} ></textarea>
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
                          <option value="Jaipur">Nagpur</option>
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
                      onChange={onNameChange} value={formValue.zip} required/>
                      <error-output className="zip-error" htmlFor="number"></error-output>
                  </div>
              </div>
          </div>
          <div className="buttonParent">
              <div className="add-reset">
                  <button type="submit" className="button addButton" id="addButton">{formValue.isUpdate ? 'Update' : 'Submit'}</button>
                  <Link to="/home" >
                  <button type="submit" className="button addButton" id="addButton">Home</button></Link>
                  <button type="reset" className="resetButton button" id="resetButton" onClick={onReset}>Reset</button>
              </div>
          </div>
      </form>
  </div>
    </div>
  )
}

export default Form;