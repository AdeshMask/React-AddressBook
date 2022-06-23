import React, { Component} from 'react'
import './Home.css'
import {Link, withRouter} from 'react-router-dom'
import Logo from '../../Assests/icon/icons8-address-book-2-48.png'
import BookServices from '../../Service/BookService'
import IconButton from '@mui/material/IconButton';
import DeleteIcon from '@mui/icons-material/Delete';
import EditIcon from '@mui/icons-material/Edit';
import Button from '@mui/material/Button';


class Home extends Component {
    /*============================================================================================ */
    constructor(props) {
        super(props);
        this.state = {
            addressbook: [],
        };
    }

    componentDidMount() {
        this.fetchData();
        console.log(this.props)
    }

	fetchData() {
        BookServices.getAll().then((response) => {
            this.setState({ addressbook: response.data.data });
        });
    }
    
    delete = (personId) => {
        let id = parseInt(personId)
        BookServices.deletePerson(id);
        window.location.reload();
    };

    update = (id) => {
        this.props.history.push(`AddressBookForm/${id}`);
        console.log(id);
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
                        <Link to="/form">
                            <Button variant="contained" size="large">Add User</Button></Link>
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
                            {this.state.addressbook.map((book,index) => (
                                <tr key={`${index}`}>                             
                                    <td>{book.fullName}</td>
                                    <td>{book.phoneNumber}</td>
					            	<td>{book.address}</td>
						            <td>{book.city}</td>
                                    <td>{book.state}</td>
                                    <td>{book.zip}</td>
                                    <td>
                                        <IconButton aria-label="delete" size="small" onClick={() => this.delete(book.id)}>
                                            <DeleteIcon/></IconButton>
                                        <IconButton aria-label="delete" size="large" onClick={() => this.update(book.id)} > 
                                            <EditIcon/></IconButton>
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