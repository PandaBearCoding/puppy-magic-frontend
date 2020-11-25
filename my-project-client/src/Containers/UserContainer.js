import React from 'react';
import UserCard from '../Components/UserCard.js';
import SignUp from '../Components/SignUp.js';
import MatchContainer from './MatchContainer.js';


class UserContainer extends React.Component {

    state = {
        userApi: [],
        dog: [],
        user: {}
    }

    componentDidMount(){
        fetch("http://localhost:4000/api/v1/users/")
        .then(resp => resp.json())
        .then(api => this.setState({userApi: api}))
        .catch(console.log)
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

    updateSubmitHandler = (id, username, name, profile_picture, postcode, age, phone_number, email, 
            description, housing_type, has_yard, near_park, lifestyle ) => {

        let updateUser = { 
            username: username,
            name: name, 
            profile_picture: profile_picture, 
            postcode: postcode,
            age: age, 
            phone_number: phone_number,
            email: email,
            description: description,
            housing_type: housing_type,
            has_yard: has_yard,
            near_park: near_park,
            lifestyle: lifestyle
        }
        fetch(`http://localhost:4000/api/v1/users/${id}`, {
            method: "PATCH", 
            headers: {
                "content-type": "application/json",
                accepts: "application/json"
            },
            body: JSON.stringify(updateUser)
        })
        .then(response => response.json())
        .then(user => {
            let newArray = [...this.state.userApi]
            let foundObject = newArray.find(el => el.id === user.id)
             newArray[newArray.indexOf(foundObject)] = user
                this.setState({userApi: newArray})
        })
        .catch(console.log)
    }

    deleteHandler = (userId) => {
        fetch(`http://localhost:4000/api/v1/users/${userId}`, {
             method: "DELETE"
        })
        
        .then(response => response.json())
        .then((response) => {
            let newArray = this.state.userApi.filter(user => user.id !== userId)
            this.setState({userApi: newArray})
        })
    }

    renderUsers = () => {
        return this.state.userApi.map((el) => <UserCard key={el.id} user={el} updateHandler={this.updateSubmitHandler} deleteHandler={this.deleteHandler} />)
    }

    matchArray = () => {
        // matched_dogs is a method I created in my BE to get the actual dog objects that belong to the match via the dog's id
        // iterate through matched_dogs of first user to pass down to MatchContainer via matches key
        let iterate = this.state.userApi.map((el) => el.matched_dogs)
        return iterate[0]
    }

    matchIdArray = () => {
        // matches is the join w/ ids that is attached to each user
        // this method gets the dog's ID for POST-ing/DELETING purposes later on
        let needMatchId = this.state.userApi.map((el) => el.matches)
        return needMatchId[0]
    }

    render(){
        let matchHelper = this.matchArray()
        let matchIdHelper = this.matchIdArray()
        return(
            <div>
                <SignUp newUserSubmitHandler={this.newUserSubmitHandler} />
                {this.renderUsers()}
                <MatchContainer matches={matchHelper} matchesId ={matchIdHelper} matchDeleteHandler={this.props.matchDeleteHandler} />
            </div>
        )
    }
}

export default UserContainer;