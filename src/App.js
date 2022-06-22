import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import Form from './Components/Address-Book-Form/AddressBookForm';
import Home from './Components/Address-Book-Home/AddressBookHome';
import Header from './Header';

function App() {
  return (
    <div className="App">
      <Header/>
        <Router>
          <Switch>
            <Route path="/home"><Home /></Route>
            <Route path="/form"><Form /></Route>
            <Route exact path="/AddressBookForm/:id"><Form /></Route>
          </Switch>
        </Router>
    </div>
  );
}

export default App;
