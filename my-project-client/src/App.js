import React from 'react';
import './App.css';
import DogContainer from './Containers/DogContainer.js';
import UserContainer from './Containers/UserContainer.js';
import MatchContainer from './Containers/MatchContainer.js';
import LogIn from './Components/LogIn.js';
import SignUp from './Components/SignUp.js';
import NavBar from './Components/NavBar.js';

class App extends React.Component {
// App will hold list of dog objects that were swiped right on to pass it down to the MatchContainer
  state={
    userApi: [],
    match: [], 
    user: {},
    dogApi: [],
    dog: {},
  }

  componentDidMount(){
    fetch("http://localhost:4000/api/v1/users/21")
    .then(resp => resp.json())
    .then(matches => (this.setState({user: matches})))
    .catch(console.log)
  }
  
    // How to pass dog to MatchContainer PART 1
  dogClickHandler = (dog, target) => {
    if (target === "Swipe Right"){
      let newDog = {name: dog.name, profile_picture: dog.photos[0].full, age: dog.age, postcode: dog.contact.address.postcode, description: dog.description, organization: dog.contact.email, breed: dog.breeds.primary, color: dog.colors.primary, coat_length: dog.coat, size: dog.size, gender: dog.gender, distance: dog.distance, good_with_cats: dog.environment.cats, good_with_dogs: dog.environment.dogs, good_with_children: dog.environment.children, house_trained: dog.attributes.house_trained, spayed_neutered: dog.attributes.spayed_neutered, special_needs: dog.attributes.special_needs}
      // console.log(newDog)
      fetch("http://localhost:4000/api/v1/dogs", {
        method: "POST",
        headers: {
          "content-type": "application/json",
          "accepts": "application/json"
        },
        body: JSON.stringify(newDog)
      })
      .then(resp => resp.json())
      .then(dog => (
       this.setState({dog: dog})
      ))
       }else{
      console.log("Not a match")
    }
  }


    // How to pass dog to MatchContainer PART 2
      // This fetch should only run once we have response from server in PART 1
      // This should not don't run until promise of dog fetch is resolved
  matchClickHandler = (target) => {
    return fetch("http://localhost:4000/api/v1/dogs").then(response => {
      console.log(this.state.dog.id)
      if (target === "Swipe Right"){
        fetch("http://localhost:4000/api/v1/users/21/matches", {
          method: "POST",
          headers: {
            "content-type": "application/json",
            "accepts": "application/json"
          },
          body: JSON.stringify({ user_id: 21, dog_id: this.state.dog.id })
        })
        .then(resp => resp.json())
        .then(match => (
          this.setState({ 
            user: match
          })))
        }else{
          console.log("Not a match!")
        }
    })
   
  }

  newUserSubmitHandler = (newUser) => {
    fetch('http://localhost:4000/api/v1/users', {
        method: "POST", 
        headers: {
            "content-type": "application/json",
            accepts: "application/json"
        },
        body: JSON.stringify(newUser)
      })
      .then(response => response.json())
      .then(user => this.setState({userApi: [ user,...this.state.userApi ]}))
      .catch(console.log)
    }

    // deleting but not updating the DOM right away - same problem on my Mod4 proj
  deleteHandler = (matchObj) => {
    let relationship = this.state.user.matches.find(md => md.user_id === this.state.user.id && md.dog_id && matchObj.id) 
    fetch(`http://localhost:4000/api/v1/users/21/matches/${relationship.id}`, {
      method: "DELETE"
    })
    .then(response => response.json())
    .then(response => {
    let newMatchArray = this.state.user.matches.filter(match => match.id !== relationship.id)
    this.setState({user: {...this.state.user, matches: newMatchArray}})
    })
  }

  render(){
    // console.log(this.state.dog)
    // console.log(this.state.dog.id)
    return(
      <div className="App">
        <NavBar />
        <LogIn />
        <SignUp newUserSubmitHandler={this.newUserSubmitHandler}/>
        <DogContainer dogClickHandler={this.dogClickHandler} matchClickHandler={this.matchClickHandler} />
        <UserContainer deleteHandler={this.deleteHandler} />
        <MatchContainer dogs={this.state.match} />
      </div>
    )
  }
}

export default App;
