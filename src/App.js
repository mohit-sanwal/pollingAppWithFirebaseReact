import React, { Component } from 'react';
import logo from './logo.svg';
import './App.css';
import * as firebase from 'firebase'
import Header from './Header'

import toastr from 'reactjs-toastr';
import 'reactjs-toastr/lib/toast.css';

class App extends Component {

  constructor(){
    super();
    this.state = {
      speed : 10,
      isLogIn : false,
      question : [],
      answers : [],
      options : [],
      isEditAns : false,
      ansValue : '',
      showQuestion : false,
      showAnswer : false,
      createPoll : true,
      existPoll : false,
      stats : false,
      isNewCreate : false
    }
  }

  componentDidMount() {
    // const rootRef = firebase.database().ref().child('speed');
    // console.log("speedRef",rootRef);
    // rootRef.on('value',snap => {
    //   console.log("snap",snap);
    //   this.setState({
    //     speed : snap.val()
    //   })
    // })
    this.signInStatus()
    alert("component ...")
    var loginS = localStorage.getItem('loginStatus')
    console.log("login status..",localStorage.getItem('loginStatus'))
    
  }


  componentWillMount(){
     this.firebaseRef = firebase.database().ref().child('question');
     this.firebaseAnsRef = firebase.database().ref().child('answers');
     this.firebaseOptionsRef = firebase.database().ref().child('options');
     var ques = []
     this.firebaseRef.once('value',snap=>{
       console.log("snap value",snap);
       snap.forEach(data =>{
         console.log("data..",data.val());
         var q = {
           text : data.val().text
         }
         ques.push(q)
         console.log("question..",ques);
         this.setState({
           question : ques
         })
       })

     })

     var ans = []
     this.firebaseAnsRef.once('value',snap=>{
       console.log("snap value",snap);
       snap.forEach(data =>{
         console.log("data..",data.val());
         var a = {
           text : data.val().text
         }
         ans.push(a)
         console.log("question..",ans);
         this.setState({
           answers : ans
         })
       })

     })


     var opn = []
     this.firebaseOptionsRef.once('value',snap=>{
       console.log("snap value",snap);
       snap.forEach(data =>{
         console.log("data..",data.val());
         var a = {
            x :  data.val().x,
           count : data.val().count
         }
         ans.push(a)
         console.log("question..",opn);
         this.setState({
          options : opn
         })
       })

     })
  }

  handleQueston(){

    if(this.refs.ques.value || this.state.question[0]){
      var q = {
        text : this.refs.ques.value
      }
      this.firebaseRef.push(q)
      this.setState({
        question : this.state.question.concat(q),
        showAnswer : true,
        showQuestion : false
      })
    } else {
      toastr.error('Error Message','Please enter question', {displayDuration:3000})
    }


  }


  handleAnswer(){
    if(this.refs.ans.value || this.state.answers[0] ){
      var a = {
        text : this.refs.ans.value
      }
      this.firebaseAnsRef.push(a)
      this.setState({
        answers : this.state.answers.concat(a)
      })
      this.refs.ans.value = ' '
    } else {
      toastr.error('Error Message','Please enter options for poll', {displayDuration:3000})
    }

  }


  handleChange(index){
    if(!this.state.answered){
      this.setState({
        stats : true,
        answered :  true
      })
      toastr.success('Success Message','successfully answered', {displayDuration:3000})
    } else{
      toastr.error('Error Message','Already answered', {displayDuration:3000})
    }
   }

  editAnswers(index,value){
      this.setState({
        isEditAns : true,
        ansValue : value,
        ansIndex : index
      })
   console.log("index",index);
  }



  onQuestionChange(){
    var val = this.refs.editQues.value
    console.log('edit option..',val);
    var oldQues = []
    for(var i=0;i<this.state.question.length;i++){
      if(i == 0){
        var a = {
          text : this.refs.editQues.value
        }
        oldQues[i] = a
      } else {
        oldQues[i] = this.state.question[i]
      }
    }

    this.setState({
      question : oldQues
    })

    this.firebaseRef.remove()
    for(var i=0;i<oldQues.length;i++){
      this.firebaseRef.push(oldQues[i])
    }

    this.refs.editQues.value = ''
    console.log("old ansarray",oldQues);

  }

  onTodoChange(){
    var val = this.refs.editAns.value
    console.log('edit option..',val);
    var oldAns = []
    for(var i=0;i<this.state.answers.length;i++){
      if(i == this.state.ansIndex){
        var a = {
          text : this.refs.editAns.value
        }

        oldAns[i] = a
      } else {
        oldAns[i] = this.state.answers[i]
      }
    }

    this.setState({
      answers : oldAns
    })

    this.firebaseAnsRef.remove()
    for(var i=0;i<oldAns.length;i++){
      this.firebaseAnsRef.push(oldAns[i])
    }
    console.log("old ansarray",oldAns);
    this.refs.editAns.value = ''
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
        } else {

          this.setState({
            isLogIn : false
          })
          console.log("LOG OUT");
          // User is signed out.
          // ...
        }
      }.bind(this));
  }





 goToPolls(){
   this.props.history.push("/polls")
  console.log("props..",this.props);
 }

 createPoll(){
     // this.firebaseAnsRef.remove()
     // this.firebaseRef.remove()
 }

 showQuestion(){
   console.log("test...");
    this.setState({
      showQuestion : true,
      createPoll : false,
      showAnswer : false
    })
 }

 existingPoll(){
    this.setState({
      existPoll : true
    })
 }



 goToStats(){
   this.props.history.push("/stats")
 }


 removeQuestion(){
   this.firebaseRef.remove()
   this.firebaseAnsRef.remove()
    this.setState({
      showQuestion : true,
      existPoll : false,
      isNewCreate : true
    })
   this.props.history.push('/home')
 }


  render() {

    console.log("check___",localStorage.getItem('loginStatus') == false)

    if(localStorage.getItem('loginStatus') == false){
      this.props.history.push('/') 
      toastr.error('Error Message','You are not log in please login first', {displayDuration:3000})
    }

    console.log("props....",this.props.match.params.status);
    if(this.state.question[0]){
      console.log(this.state.question[0].text);
    }

    if(this.state.answers.length>0){
      const answ = this.state.answers
         console.log("show ans...",answ);
      var showA = answ.map((a,index)=>{
        console.log("a ..",a);
        return (<div><input type="text"   key={index} value={a.text} name="show answer" />
          <button onClick={()=>this.editAnswers(index,a.text)} data-toggle="modal" data-target="#myModal"> edit</button></div>)
      })

    }


    return (
      <div className="App">
        {localStorage.getItem('loginStatus') ? <Header goTo ={this.props.history}/> : ''}

       {this.state.question[0] && this.state.answers.length>0 && !this.state.isNewCreate ? <button className="btn btn-success" onClick={this.existingPoll.bind(this)}> Existing poll</button> : ''}


      {!this.state.question[0] && !this.state.answers.length>0 && this.state.createPoll ? <div className="hide">
          <button className="btn btn-success" onClick={this.showQuestion.bind(this)}>Create poll</button>
        </div> : ''}

      { !this.state.existPoll ? <button className="btn btn-success" onClick={this.removeQuestion.bind(this)}> Create New poll </button> : " " }

      {this.state.existPoll ? <div><p>{this.state.question[0].text}</p><a  data-toggle="modal" data-target="#QModal"> edit </a>
      <div> { this.state.answers.map((a,index)=>{
         console.log("a ..",a);
         return (<div><input type="text" onClick={this.handleChange.bind(this)}  key={index} value={a.text} name="show answer" />
           <a onClick={()=>this.editAnswers(index,a.text)} data-toggle="modal" data-target="#myModal"> edit</a></div>)
       }) } </div> </div> : ""}

       {this.state.stats ? <a onClick={this.goToStats.bind(this)}> go to stats </a> : "" }

      { this.state.showQuestion ? <div>
       <p> Question Title </p>
      <input type="text" ref="ques" placeholder="What do you want to ask" name="question" required />
       <button onClick={this.handleQueston.bind(this)}> Next </button>

       {this.state.question[0] ? <h1 className="hide"> show question : {this.state.question[0].text}  </h1> : '' }
      </div> : ''}

         <br/>
        {this.state.showAnswer ? <div>

          <button onClick={this.showQuestion.bind(this)}> back </button>
           <input type="text" ref="ans" placeholder="Enter Answer"  name="answer" required />
          { this.state.answers.length<4 ? <button onClick={this.handleAnswer.bind(this)}> + </button> : '' }
          <br/>
          {showA}
        </div> : ''}

         { this.state.answers.length > 0 && this.state.showAnswer  ? <div>
            <button onClick={this.goToPolls.bind(this)}> create poll </button>
         </div> : '' }


         <div className="modal fade" id="myModal" role="dialog">
    <div className="modal-dialog">


      <div className="modal-content">
        <div className="modal-header">
          <button type="button" className="close" data-dismiss="modal">&times;</button>
          <h4 className="modal-title">Edit options</h4>
        </div>
        <div className="modal-body">
          <p><input type="text" ref="editAns"  placeholder="enter option here"  name="answer" required /></p>
        </div>
        <div className="modal-footer">
          <button type="button" className="btn btn-default" onClick={this.onTodoChange.bind(this)} data-dismiss="modal">edit</button>
        </div>
      </div>

    </div>
  </div>



  <div className="modal fade" id="QModal" role="dialog">
<div className="modal-dialog">


<div className="modal-content">
 <div className="modal-header">
   <button type="button" className="close" data-dismiss="modal">&times;</button>
   <h4 className="modal-title">Edit questions</h4>
 </div>
 <div className="modal-body">
   <p><input type="text" ref="editQues"  placeholder="enter question here"  name="question" required /></p>
 </div>
 <div className="modal-footer">
   <button type="button" className="btn btn-default" onClick={this.onQuestionChange.bind(this)} data-dismiss="modal">edit</button>
 </div>
</div>

</div>
</div>


      </div>
    );
  }
}

export default App;
