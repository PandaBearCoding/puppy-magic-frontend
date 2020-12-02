import React from 'react';
import './App.css';
// import Welcome from './Components/Welcome.js';
import DogContainer from './Containers/DogContainer.js';
import UserContainer from './Containers/UserContainer.js';
import MatchContainer from './Containers/MatchContainer.js';
import LogIn from './Components/LogIn.js';
import { Route, Switch } from 'react-router-dom';

class App extends React.Component {

  state={
    user: {}
  }

  componentDidMount(){
    fetch("http://localhost:4000/api/v1/users/61")
    .then(resp => resp.json())
    .then(user => (this.setState({user: user})))
    .catch(console.log)
  }

  dogSwipeHandler = (dog, direction) => {
    if (direction === "right"){
      // console.log("DOG OBJ FROM API INSIDE FIRST FETCH", dog)
      // console.log("DIRECITON", direction)
      let newDog = {name: dog.name, profile_picture: dog.primary_photo_cropped.full, age: dog.age, postcode: dog.contact.address.postcode, description: dog.description, organization: dog.contact.email, breed: dog.breeds.primary, size: dog.size, gender: dog.gender, good_with_cats: dog.environment.cats, good_with_dogs: dog.environment.dogs, good_with_children: dog.environment.children, house_trained: dog.attributes.house_trained, spayed_neutered: dog.attributes.spayed_neutered, special_needs: dog.attributes.special_needs, distance: dog.distance}
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
        console.log(dog)
        let newDogArray = [dog, ...this.state.user.matched_dogs]
        this.setState({
          user: {...this.state.user, matched_dogs: newDogArray}
        })
        let newMatchArray = [dog.matches, ...this.state.user.matches]
        this.setState({
          user: {...this.state.user, matches: newMatchArray}
        })
      })
       }else{
      console.log("Not a match")
    }
  }
  
  // dogClickHandler = (dog, target) => {
  //   if (target === "Swipe Right"){
  //     // console.log("DOG OBJ FROM API INSIDE FIRST FETCH", dog)
  //     let newDog = {name: dog.name, profile_picture: dog.primary_photo_cropped.full, age: dog.age, postcode: dog.contact.address.postcode, description: dog.description, organization: dog.contact.email, breed: dog.breeds.primary, size: dog.size, gender: dog.gender, good_with_cats: dog.environment.cats, good_with_dogs: dog.environment.dogs, good_with_children: dog.environment.children, house_trained: dog.attributes.house_trained, spayed_neutered: dog.attributes.spayed_neutered, special_needs: dog.attributes.special_needs, distance: dog.distance}
  //     // console.log("NEW DOG IN DB", newDog)
  //     // console.log("USER", this.state.user)
  //     fetch("http://localhost:4000/api/v1/dogs", {
  //       method: "POST",
  //       headers: {
  //         "content-type": "application/json",
  //         "accepts": "application/json"
  //       },
  //       body: JSON.stringify({dog: newDog, user: this.state.user})
  //     })
  //     .then(resp => resp.json())
  //     .then(dog => {
  //       console.log(dog)
  //       let newDogArray = [dog, ...this.state.user.matched_dogs]
  //       this.setState({
  //         user: {...this.state.user, matched_dogs: newDogArray}
  //       })
  //       let newMatchArray = [dog.matches, ...this.state.user.matches]
  //       this.setState({
  //         user: {...this.state.user, matches: newMatchArray}
  //       })
  //     })
  //      }else{
  //     console.log("Not a match")
  //   }
  // }

  matchDeleteHandler = (matchObj) => {
    // console.log("Dog To Delete", matchObj.id)
    let relationship = this.state.user.matches.find(match => match.id && match.user_id === this.state.user.id && match.dog_id === matchObj.id)
    // console.log("Relationship", relationship)
    fetch(`http://localhost:4000/api/v1/users/${this.state.user.id}/matches/${relationship.id}`, {
      method: "DELETE"
    })
    .then(response => response.json())
    .then(response => {
      let newMatchedDogsArray = this.state.user.matched_dogs.filter(matchedDog => matchedDog.id !== matchObj.id)
      let newMatchesArray = this.state.user.matches.filter(match => match.id !== relationship.id)
      this.setState({user: {...this.state.user, matched_dogs: newMatchedDogsArray, matches: newMatchesArray}})
    })
  }

  render(){
    // console.log("Matches in State", this.state.user.matches)
    // console.log("Matched Dogs in State", this.state.user.matched_dogs)
    console.log(this.state.user)
    return(
        <div className="App">
          <Switch>
          <Route path="/puppymagic" render={() => <DogContainer dogSwipeHandler={this.dogSwipeHandler} matchClickHandler={this.matchClickHandler} user={this.state.user} />} /> 
            {/* <Route exact path="/" component={Welcome} /> */}
            <Route LogIn path="/login" component={LogIn} />
            <Route path="/users" component={UserContainer} /> 
            <Route path="/matches" render={() => <MatchContainer matches={this.state.user.matched_dogs} matchDeleteHandler={this.matchDeleteHandler} />} />
          </Switch>

          {/* <LogIn /> */}
          {/* <DogContainer dogSwipeHandler={this.dogSwipeHandler} matchClickHandler={this.matchClickHandler} user={this.state.user}/> */}
          {/* <UserContainer /> */}
          {/* <MatchContainer matches={this.state.user.matched_dogs} matchDeleteHandler={this.matchDeleteHandler} /> */}
        </div>
    )
  }
}

export default App;

