import React, { Component } from 'react'

export class Header extends Component {
  render() {
    return (
      <div>
          <header class="header-content header">
		    <div class="logo-content">
			    <img src="../assets/icon/icons8-address-book-2-48.png" alt="" />
			    <div>
				    <span class="address-text">Address</span><br />
				    <span class="address-text address-book">Book</span>
			    </div>
		    </div>
            <div>
                <span class="head-text"></span>
            </div>
            </header>
        </div>
    )
  }
}

export default Header