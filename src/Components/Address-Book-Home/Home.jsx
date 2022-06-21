import React, { Component} from 'react'
import './Home.css'
import {Link} from 'react-router-dom'
import Logo from '../../Assests/icons/add-24px.svg'
import Delete from '../../Assests/icons/delete-black-18dp.svg'
import Edit from '../../Assests/icons/create-black-18dp.svg'
import BookServices from '../../Service/BookService'


class Home extends Component {
    /*============================================================================================ */
    constructor(props) {
        super(props);
        this.state = {
            addressbook: [],
        };
    }
	fetchData() {
        BookServices.getAll().then((response) => {
            this.setState({ addressbook: response.data.data });
        });
    }
    componentDidMount() {
        this.fetchData();
        console.log(this.props)
    }
    

    /*============================================================================================ */
    render() {
  return (
    <div>    
    <div class="main-content">
        <div class="header-content">
            <div class="person-detail-text">
                Person Details
            </div>
            <Link to="/form" class="add-button">
                <img src={Logo} alt="Add User Logo"/>Add User</Link>
        </div>
    
    <table id="table-display" class="table">
        <tr>
            <th>Profile</th>
            <th>Full Name</th>
            <th>Phone Number</th>
            <th>Address</th>
            <th>City</th>
            <th>State</th>
            <th>Zip</th>
            <th>Action</th>
        </tr>
        <tbody>
                    {this.state.addressbook.map((addressbooks,index) => (
                        <tr key={`${index}`}>                             
                            <td>
                                <img src="" alt="ProfilePic" srcSet="" /></td>
                            <td>{addressbooks.fullName}</td>
                            <td>{addressbooks.phoneNumber}</td>
                            
							<td>{addressbooks.address}</td>
							<td>{addressbooks.city}</td>
                            <td>{addressbooks.state}</td>
                            <td>{addressbooks.zip}</td>
                            <td>
                            <img src={Delete} alt="delete" onClick=""/>
                            
                            <img src={Edit} alt="edit" onClick="" />
                            </td>
                        </tr>
                    ))}
                </tbody>
        
    </table>
    </div>
    </div>
  )
}
}
export default Home;