import React from 'react';
import './App.css';
import DogContainer from './Containers/DogContainer.js';
import UserContainer from './Containers/UserContainer.js';
import MatchContainer from './Containers/MatchContainer.js';
import LogIn from './Components/LogIn.js';
import NavBar from './Components/NavBar.js';

class App extends React.Component {
// App will hold list of dog objects that were swiped right on to pass it down to the MatchContainer
  state={
    // user: {},
    dogApi: [],
    matchApi: []
  }

    // loads  single user that has matches array
    // keeping track of single user's matches in state
  // componentDidMount(){
  //   fetch("http://localhost:4000/api/v1/users/51")
  //   .then(resp => resp.json())
  //   .then(user => (this.setState({user: user})))
  //   .catch(console.log)
  // }
  
    // How to pass dog to MatchContainer PART 1
      // grabs dog obj from API, POSTs it to the DB and sets state
  dogClickHandler = (dog, target) => {
    if (target === "Swipe Right"){
      console.log("DOG OBJ INSIDE FIRST FETCH", dog)
      let newDog = {name: dog.name, profile_picture: dog.photos[0].full, age: dog.age, postcode: dog.contact.address.postcode, description: dog.description, organization: dog.contact.email, breed: dog.breeds.primary, size: dog.size, gender: dog.gender, good_with_cats: dog.environment.cats, good_with_dogs: dog.environment.dogs, good_with_children: dog.environment.children, house_trained: dog.attributes.house_trained, spayed_neutered: dog.attributes.spayed_neutered, special_needs: dog.attributes.special_needs, profile_picture_two: dog.photos[1].full, distance: dog.distance}
      console.log("NEW DOG", newDog)
      // fetch("http://localhost:4000/api/v1/dogs", {
      //   method: "POST",
      //   headers: {
      //     "content-type": "application/json",
      //     "accepts": "application/json"
      //   },
      //   body: JSON.stringify(newDog)
      // })
      // .then(resp => resp.json())
      // // .then(dog => (
      // //  this.setState({dogApi: dog})
      // // ))
      // .then(dog => {
      //   let newDogArray = [dog, ...this.state.dogApi]
      //   this.setState({
      //     dogApi: [newDogArray]
      //   })
      // })
       }else{
      console.log("Not a match")
    }
  }
  
// Problem 1: first fetch isn't setting state with dog obj in my db that has an id for the second fetch to use
    // How to pass dog to MatchContainer PART 2
      // This fetch should only run once we have response from server in PART 1
      // This should not don't run until promise of dog fetch is resolved
        // Takes dog id from the newly created dog in my db and POSTs a match with the user (join)
  matchClickHandler = (target) => {
    return fetch("http://localhost:4000/api/v1/dogs").then(response => {
      if (target === "Swipe Right"){
        let newDog = this.state.dogApi.id
        console.log("INSIDE OF 2ND FETCH", newDog)
        // fetch("http://localhost:4000/api/v1/users/51/matches", {
        //   method: "POST",
        //   headers: {
        //     "content-type": "application/json",
        //     "accepts": "application/json"
        //   },
        //   body: JSON.stringify({ user_id: 51, dog_id: newDog })
        // })
        // .then(resp => resp.json())
        // // .then(match => (
        // //   this.setState({ 
        // //     matchApi: match
        // //   })))
        //   .then(match => {
        //     let newMatchArray = [match, ...this.state.matchApi]
        //     this.setState({
        //       matchApi: [newMatchArray]
        //     })
        //   })
        }else{
          console.log("Not a match!")
        }
    })
  }

  // matchDeleteHandler = (matchObj) => {
  //   let relationship = this.state.user.matches.find(md => md.user_id === this.state.user.id && md.dog_id && matchObj.id) 
  //   fetch(`http://localhost:4000/api/v1/users/51/matches/${relationship.id}`, {
  //     method: "DELETE"
  //   })
  //   .then(response => response.json())
  //   .then(response => {
  //   let newMatchArray = this.state.user.matches.filter(match => match.id !== relationship.id)
  //   this.setState({user: {...this.state.user, matchApi: newMatchArray}})
  //   })
  // }

  render(){
    console.log("State", this.state.dogApi)

    return(
      <div className="App">
        <NavBar />
        <LogIn />
        <DogContainer dogClickHandler={this.dogClickHandler} matchClickHandler={this.matchClickHandler} />
        <UserContainer />
        {/* matchDeleteHandler={this.matchDeleteHandler}  */}
        <MatchContainer matches={this.state.matchApi} />
        {/* // the match container should map over this to create matchCards  */}
        {/* // instead it's mapping over "matches" created in the userContainer */}
      </div>
    )
  }
}

export default App;
