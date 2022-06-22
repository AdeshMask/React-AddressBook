import React, { Component} from 'react'
import './Home.css'
import {Link, withRouter} from 'react-router-dom'
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
    delete = (personId) => {
        let id = parseInt(personId)
        BookServices.deletePerson(id);
        window.location.reload();
    };

    update = (personId) => {
        this.props.history.push(`Form/${personId}`);
        console.log(personId);
     };
    /*============================================================================================ */
    render() {
  return (
    <div>    
    <div className="main-content">
        <div className="header-content">
            <div className="person-detail-text">
                Person Details
            </div>
            <Link to="/form" className="add-button">
                <img src={Logo} alt="Add User Logo"/>Add User</Link>
        </div>
    
    <table id="table-display" className="table">
        <tr>
            
            <th>Name</th>
            <th>Contact</th>
            <th>Address</th>
            <th>City</th>
            <th>State</th>
            <th>Zip</th>
            <th>Action</th>
        </tr>
        <tbody>
                    {this.state.addressbook && this.state.addressbook.map((book,index) => (
                        <tr key={`${index}`}>                             
                            <td>{book.fullName}</td>
                            <td>{book.phoneNumber}</td>
                            
							<td>{book.address}</td>
							<td>{book.city}</td>
                            <td>{book.state}</td>
                            <td>{book.zip}</td>
                            <td>
                            <img src={Delete} alt="delete" onClick={() => this.delete(book.id)}/>
                            <img src={Edit} alt="edit" onClick={() => this.update(book.id)} />
                            </td>
                        </tr>
                    ))}
                </tbody>      
            </table>
        </div>
    </div>
  )}
}
export default withRouter(Home);