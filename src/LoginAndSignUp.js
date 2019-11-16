import React from 'react';
import * as firebase from 'firebase'
import toastr from 'reactjs-toastr';
import 'reactjs-toastr/lib/toast.css';

export default class LoginAndSignUp extends React.Component {

	constructor(props) {
		super(props);
		this.state = {
			isLogIn : false,
			question : [],
			answers : [],
      isSignUp : false
		}
    // this.login = this.login.bind(this)
    // this.signup = this.signup.bind(this)
	}


	signInStatus(){
     firebase.auth().onAuthStateChanged(function(user) {
         if (user) {
           // User is signed in.
           // var displayName = user.displayName;
           // var uid = user.uid;
           // var providerData = user.providerData;
           // ...
           this.setState({
             isLogIn : true
           })
            var email = user.email
           localStorage.setItem('email',email);
           
           this.props.history.push("/home")

         } else {

           this.setState({
             isLogIn : false
           })
           console.log("LOG OUT");
           // User is signed out.
           // ...
         }
				 localStorage.setItem('loginStatus', this.state.isLogIn);
       }.bind(this));
   }


	 signup(){
    	var email = this.refs.email.value
    	var password = this.refs.pass.value
    	firebase.auth().createUserWithEmailAndPassword(email, password).then(function(response){
    		console.log("response",response);
        this.props.history.push("/home")
    		this.signInStatus()
    	}).catch(function(error) {
    // Handle Errors here.
    // var errorCode = error.code;
    var errorMessage = error.message;
    toastr.error('Error Message',errorMessage , {displayDuration:3000})
    // ...
    });
}

login(){
	var email = this.refs.email.value
	var password = this.refs.pass.value
  console.log("login response????");
	firebase.auth().signInWithEmailAndPassword(email, password).then(function(response){
		console.log("login response",response);
    this.props.history.push("/home")
		this.signInStatus()
	}).catch(function(error) {
		// Handle Errors here.
    // var errorCode = error.code;
     console.log("login error..",error.message)
		var errorMessage = error.message;
    toastr.error('Error Message',errorMessage,{displayDuration:3000})
		// ...
	});
}

handleSubmit(){
  console.log("call");
  if(this.state.isSignUp){
    this.signup()
  } else {
    console.log("call login.");
    this.login()
  }
}

logout(){
	 firebase.auth().signOut();
	 this.signInStatus()
}


componentDidMount(){
  this.signInStatus()
}


enableSignUp(){
  this.setState({
    isSignUp : true
  })
}

enableSignIn(){
  this.setState({
    isSignUp : false
  })
}


	render(){

		return(
      < div className="container marn45" >
 <div className="row">
   <div className="col-sm-6 col-md-4 col-md-offset-4">
     <div className="panel panel-default">
       <div className="panel-heading">
         <strong> Sign in to continue</strong>
       </div>
       <div className="panel-body">
         <form role="form" onSubmit={(e) => {this.handleSubmit(); e.preventDefault();}}>
           <fieldset>
             <div className="row">
               <div className="center-block">
                 <img className="profile-img"
                   src="https://lh5.googleusercontent.com/-b0-k99FZlyE/AAAAAAAAAAI/AAAAAAAAAAA/eu7opA4byxI/photo.jpg?sz=120" alt="" />
               </div>
             </div>
             <div className="row">
               <div className="col-sm-12 col-md-10  col-md-offset-1 ">
                 <div className="form-group">
                   <div className="input-group">
                     <span className="input-group-addon">
                       <i className="glyphicon glyphicon-user"></i>
                     </span>
                     <input className="form-control" ref="email" placeholder="Email" name="loginname" type="text" autoFocus />
                   </div>
                 </div>
                 <div className="form-group">
                   <div className="input-group">
                     <span className="input-group-addon">
                       <i className="glyphicon glyphicon-lock"></i>
                     </span>
                     <input className="form-control" ref="pass" placeholder="Password" name="password" type="password"  />
                   </div>
                 </div>
                 <div className="form-group">
                  {this.state.isSignUp ? <input type="submit" className="btn btn-lg btn-primary btn-block" value="Sign up" /> : <input type="submit" className="btn btn-lg btn-primary btn-block" value="Login" /> }
                 </div>
               </div>
             </div>
           </fieldset>
         </form>
       </div>
       <div className="panel-footer ">
        { this.state.isSignUp ? <span>If alread sign up! <a onClick={this.enableSignIn.bind(this)}> Login Here </a> </span> : <span> Dont have an account! <a onClick={this.enableSignUp.bind(this)}> Sign Up Here </a> </span> }

       </div>
             </div>
   </div>
 </div>
</div>
		)

	}

}
