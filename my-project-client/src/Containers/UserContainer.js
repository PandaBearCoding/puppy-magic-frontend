import React from 'react';
import UserCard from '../Components/UserCard.js';
import MatchContainer from './MatchContainer.js';


class UserContainer extends React.Component {

    state = {
        userApi: []
    }

    componentDidMount(){
        fetch("http://localhost:4000/api/v1/users/")
        .then(resp => resp.json())
        .then(api => this.setState({userApi: api}))
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
        // iterate through matched_dogs to pass down to MatchContainer via matches key
        let iterate = this.state.userApi.map((el) => el.matched_dogs)
        return iterate[0]
    }

    matchIdArray = () => {
        let needMatchId = this.state.userApi.map((el) => el.matches)
        return needMatchId[0]
    }

    render(){
        let matchHelper = this.matchArray()
        let matchIdHelper = this.matchIdArray()
        return(
            <div>
                {this.renderUsers()}
                <MatchContainer matches={matchHelper} matchesId ={matchIdHelper} deleteHandler={this.props.deleteHandler} />
            </div>
        )
    }
}

export default UserContainer;