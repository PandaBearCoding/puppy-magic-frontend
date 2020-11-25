import React from 'react';
import './App.css';
import DogContainer from './Containers/DogContainer.js';
import UserContainer from './Containers/UserContainer.js';
import MatchContainer from './Containers/MatchContainer.js';
import LogIn from './Components/LogIn.js';
import NavBar from './Components/NavBar.js';

// Bug 1: need page refresh to update state of user object (with matches inside)

class App extends React.Component {

  state={
    user: {},
    // matches: [],
    dogApi: []
  }

  componentDidMount(){
    fetch("http://localhost:4000/api/v1/users/52")
    .then(resp => resp.json())
    .then(user => (this.setState({user: user, matches: user.matches})))
    .catch(console.log)
  }
  
    // How to pass dog to MatchContainer PART 1
      // grabs dog obj from API, POSTs it to the DB and sets state
  dogClickHandler = (dog, target) => {
    if (target === "Swipe Right"){
      // console.log("DOG OBJ FROM API INSIDE FIRST FETCH", dog)
      let newDog = {name: dog.name, profile_picture: dog.photos[0].full, age: dog.age, postcode: dog.contact.address.postcode, description: dog.description, organization: dog.contact.email, breed: dog.breeds.primary, size: dog.size, gender: dog.gender, good_with_cats: dog.environment.cats, good_with_dogs: dog.environment.dogs, good_with_children: dog.environment.children, house_trained: dog.attributes.house_trained, spayed_neutered: dog.attributes.spayed_neutered, special_needs: dog.attributes.special_needs, profile_picture_two: dog.photos[1].full, distance: dog.distance}
      // console.log("NEW DOG IN DB", newDog)
      // console.log("USER", this.state.user)
      fetch("http://localhost:4000/api/v1/dogs", {
        method: "POST",
        headers: {
          "content-type": "application/json",
          "accepts": "application/json"
        },
        body: JSON.stringify({dog: newDog, user: this.state.user})
      })
      .then(resp => resp.json())
      .then(dog => {
        let newDogArray = [dog, ...this.state.dogApi]
        this.setState({
          dogApi: [newDogArray]
        })
      })
       }else{
      console.log("Not a match")
    }
  }

  matchDeleteHandler = (matchObj) => {
    let relationship = this.state.user.matches.find(md => md.user_id === this.state.user.id && md.dog_id && matchObj.id) 
    // console.log("deleted dog", matchObj)
    // console.log("relationship", relationship)
    fetch(`http://localhost:4000/api/v1/users/51/matches/${relationship.id}`, {
      method: "DELETE"
    })
    .then(response => response.json())
    .then(response => {
    let newMatchArray = this.state.user.matched_dogs.filter(match_dog => match_dog.id !== matchObj.id)
    let newRelationshipArray = this.state.user.matches.filter(match => match.id !== matchObj.id)
    this.setState({user: {...this.state.user, matched_dogs: newMatchArray, matches: newRelationshipArray}})
    })
  }

  render(){
    console.log("STATE", this.state)
    // console.log("User State", this.state.user)
    // console.log("match IDs", this.state.user.matches)
    // console.log("Dog State", this.state.dogApi)
    return(
      <div className="App">
        <NavBar />
        <LogIn />
        <DogContainer dogClickHandler={this.dogClickHandler} matchClickHandler={this.matchClickHandler} />
        <UserContainer />
        <MatchContainer matches={this.state.user.matched_dogs} matchDeleteHandler={this.matchDeleteHandler} />
      </div>
    )
  }
}

export default App;

  // bug - dogs get added to my matches but need a page refresh to show
  // bug - delete handler doesn't delete specified dog - it deletes dog at top?