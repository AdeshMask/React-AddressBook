import React from 'react'
import './Form.css'
import {Link} from 'react-router-dom'

function Form() {
  return (
    <div>
       
  <div class="form-content">
      <div class="form-head">
          <span> PERSON ADDRESS FORM </span>
      </div>
      
      <form class="form" action="#" onsubmit="save(); false">
          <label class="label text" for="name">Full Name</label>
          <div class="row-content">
              <input class="input" type="text" id="fullName" name="fullName" placeholder="Enter Name" required/>
              <error-output class="fullname-error" for="name"></error-output>
          </div>

          <label class="label text" for="phone">Phone Number</label>
          <div class="row-content">
              <input class="input" type="number" id="phoneNumber" name="phoneNumber" placeholder="Enter Phone Number" required/>
              <error-output class="phone-error" for="number"></error-output>
          </div>

          <label class="label text" for="address">Address</label>
          <div class="row-content">
              <textarea class="input" name="address" id="address" rows="4" placeholder="Enter Address"></textarea>
  
          </div>

          <div class="row">
              <div class="input-content">
                  <label class="label text" for="city">City</label>
                  <div class="row-content">
                      <select class="input" name="city" id="city">
                          <option value="">City</option>
                          <option value="Mumbai">Mumbai</option>
                          <option value="Patna">Pune</option>
                          <option value="Chennai">Chennai</option>
                          <option value="Kolkata">Kolkata</option>
                          <option value="Jaipur">Nagpur</option>
                      </select>
                  </div>
              </div>
              <div class="input-content">
                  <label class="label text" for="state">State</label>
                  <div class="row-content">
                      <select class="input" name="state" id="state">
                          <option value="">State</option>
                          <option value="Rajasthan">Rajasthan</option>
                          <option value="Maharashtra">Maharashtra</option>
                          <option value="West Bengal">West Bengal</option>
                          <option value="Bihar">Bihar</option>
                          <option value="Tamil Nadu">Tamil Nadu</option>
                      </select>
                  </div>
              </div>
              <div class="input-content">
                  <label class="label text" for="zip">ZipCode</label>
                  <div class="row-content">
                      <input class="input" type="number" id="zip" name="zip" placeholder="Enter Zip Code" required/>
                      <error-output class="zip-error" for="number"></error-output>
                  </div>
              </div>
          </div>
          <div class="buttonParent">
              <div class="add-reset">
                  <button type="submit" class="button addButton" id="addButton">Add</button>
                  <Link to="/home" >
                  <button type="submit" class="button addButton" id="addButton">Home</button></Link>
                  <button type="reset" class="resetButton button" id="resetButton">Reset</button>
              </div>
          </div>
      </form>
  </div>
    </div>
  )
}

export default Form