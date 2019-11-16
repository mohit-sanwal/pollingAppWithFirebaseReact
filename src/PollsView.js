import React from 'react';
import * as firebase from 'firebase'
import Header from './Header'

export default class PollsView extends React.Component {

	constructor(props) {
		super(props);
		this.state = {
      question : [],
      answers : [],
      stats : false
		}
    this.handleChange = this.handleChange.bind(this)
	}

  goToStats(){
    this.props.history.push("/stats")
  }


  componentWillMount(){
     this.firebaseRef = firebase.database().ref().child('question');
     this.firebaseAnsRef = firebase.database().ref().child('answers');
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
  }

  handleChange(index){
    this.setState({
      stats : true
    })
  }

	removeQuestion(){
		this.firebaseRef.remove()
		this.firebaseAnsRef.remove()
		this.props.history.push('/home/'+true)
	}

	render(){


		return(
			<div>
      <Header goTo ={this.props.history}/>
       {this.state.question[0] ? <p>  {this.state.question[0].text}</p> : '' }
      { this.state.answers.length>0 ? <div> { this.state.answers.map((a,index)=>{
         console.log("a ..",a);
         return (<div><input type="text" ref="editAns" onClick={this.handleChange.bind(this)} key={index} value={a.text} name="show answer" />
           </div>)
       }) } </div> : ""}


       {this.state.stats ? <a onClick={this.goToStats.bind(this)}> go to stats </a> : "" }

			</div>
		)

	}

}
