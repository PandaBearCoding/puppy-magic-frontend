import React from 'react';

class UserCard extends React.Component {

    state = {
        clicked: false,
        username: this.props.user.username, 
        name: this.props.user.name, 
        profile_picture: this.props.user.profile_picture, 
        postcode: this.props.user.postcode,
        age: this.props.user.age,
        phone_number: this.props.user.phone_number,
        email: this.props.user.email,
        description: this.props.user.description,
        housing_type: this.props.user.housing_type,
        has_yard: this.props.user.has_yard,
        near_park: this.props.user.near_park,
        distance: this.props.user.distance
    }

    updateClickHandler = (e) => {
        this.setState({clicked: true})
    }

    changeHandler = (e) => {
        this.setState({[e.target.name]: e.target.value})
    }

    localUpdateHandler = (e) => {
        e.preventDefault()
        this.props.updateHandler(this.props.user.id, this.state.username, this.state.name, this.state.profile_picture, this.state.postcode, this.state.age, this.state.phone_number, this.state.email, this.state.description, this.state.housing_type, this.state.has_yard, this.state.near_park, this.state.distance)
        this.setState(previousState => ({
            clicked: !previousState.clicked
        }))
    }

    localDeleteHandler = (e) => {
        this.props.deleteHandler(this.props.user.id)
    }

    render(){
        let { username, name, profile_picture, postcode, age, phone_number, email, description, housing_type, has_yard, near_park, distance } = this.props.user
        return(
            <div>
            {this.state.clicked ? (
                <form onSubmit={this.localUpdateHandler}>
                    <input name="name" type="text" value={this.state.name} onChange={this.changeHandler} />
                    <input name="username" type= "text" value={this.state.username} onChange={this.changeHandler} />
                    <input name="profile_picture" type= "text" value={this.state.profile_picture} onChange={this.changeHandler} />
                    <input name="postcode" type= "text" value={this.state.postcode} onChange={this.changeHandler} />
                    <input name="age" type= "text" value={this.state.age} onChange={this.changeHandler} />
                    <input name="phone_number" type= "text" value={this.state.phone_number} onChange={this.changeHandler} />
                    <input name="email" type= "text" value={this.state.email} onChange={this.changeHandler} />
                    <input name="description" type= "text" value={this.state.description} onChange={this.changeHandler} />
                    <input name="housing_type" type= "text" value={this.state.housing_type} onChange={this.changeHandler} />
                    <input name="has_yard" type= "text" value={this.state.has_yard} onChange={this.changeHandler} />
                    <input name="near_park" type= "text" value={this.state.near_park} onChange={this.changeHandler} />
                    <input name="distance" type="text" placeholder="desired dog's distance from you (mi)" value={this.state.distance} onChange={this.changeHandler} />
                    <button type="submit">Update Profile</button>
                </form>
            ) :
            null
            }
                <h1>{name}</h1>
                <h3>{username}</h3>
                <img className="profileImage" alt="" src={profile_picture}/>
                <p> Postal Code: {postcode}</p>
                <p> Age: {age}</p>
                <p>Phone Number: {phone_number}</p>
                <p>Email: {email}</p>
                <p>Summary: {description}</p>
                <p>Housing Type: {housing_type}</p>
                <p>Do You Have A Yard?: {has_yard}</p>
                <p>Do You Live Near A Park?: {near_park}</p>
                <p>Desired Dog's Distance From You (mi): {distance}</p>
                <button>View My Matches</button>
                <button onClick={this.updateClickHandler}>Edit Profile</button>
                <button onClick={this.localDeleteHandler}>Delete Profile</button>
            </div>
        )
    }
}

export default UserCard;
   