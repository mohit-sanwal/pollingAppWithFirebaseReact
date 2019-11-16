import React from 'react';
import * as firebase from 'firebase'

export default class Header extends React.Component {

	constructor(props) {
		super(props);
		this.state = {
		}
	}


  logout(){
     firebase.auth().signOut();
     this.props.goTo.push("/")
     localStorage.removeItem('loginStatus');
     localStorage.removeItem('email');
  }

	render(){

		return(
			<div>
      <div className="top-bar">
      <div className="container">
        <div className="row d-flex align-items-center">
          <div className="col-md-6 d-md-block d-none">
            <p>welcome to polling app - {localStorage.getItem('email')} </p>
          </div>
          <div className="col-md-6">
            <div className="d-flex justify-content-md-end justify-content-between">
              <div className="login" ><a  className="signup-btn" onClick={this.logout.bind(this)}><i className="fa fa-user"></i><span className="d-none d-md-inline-block">Log out</span></a></div>
            </div>
          </div>
        </div>
      </div>
    </div>
			</div>
		)

	}

}
