import React from 'react';
import { NavLink } from 'react-router-dom';

class SignUp extends React.Component {
    state = {
        name: "",
        username: "",
        password: "",
        profile_picture: "",
        postcode: "",
        age: "",
        phone_number: "",
        email: "",
        description: "",
        houseing_type: "",
        has_yard: "", 
        near_park: "",
        distance: ""
    }


    localSubmitHandler = (e) => {
        e.preventDefault()
        this.props.newUserSubmitHandler(this.state)
        this.setState({name: "", username: "", password: "", profile_picture: "", postcode: "", age: "", phone_number: "", email: "", description: "", houseing_type: "", has_yard: "", near_park: "", distance: ""})
    }

    changeHandler = (e) => {
        this.setState({[e.target.name]: e.target.value})
    }

    render(){
        return(
            <div className="signUp">
                <img className="signUpLogInLogo" alt="" src={"https://scontent-lga3-1.xx.fbcdn.net/v/t1.0-9/38635108_434429280387102_6961077985977827328_n.jpg?_nc_cat=101&ccb=2&_nc_sid=09cbfe&_nc_ohc=5M-8VLbqwecAX9Zilnn&_nc_ht=scontent-lga3-1.xx&oh=c0ff82be91a9b842ba58588e6c62ae92&oe=5FEA5BEE"}/>
                <form className="logInAndSignUpForm" onSubmit={this.localSubmitHandler}>
                    <input name="name" type="text" placeholder="name" value={this.state.name} onChange={this.changeHandler} />
                    <input name="username" type="text" placeholder="username" value={this.state.username} onChange={this.changeHandler} />
                    <input name="password" type="text" placeholder="password" value={this.state.password} onChange={this.changeHandler} />
                    <input name="profile_picture" type="text" placeholder="profile picture" value={this.state.profile_picture} onChange={this.changeHandler} />
                    <input name="postcode" type= "text" placeholder="postcode" value={this.state.postcode} onChange={this.changeHandler} />
                    <input name="age" type="number" placeholder="age" value={this.state.age} onChange={this.changeHandler} />
                    <input name="phone_number" type="text" placeholder="phone number" value={this.state.phone_number} onChange={this.changeHandler} />
                    <input name="email" type="text" placeholder="email" value={this.state.email} onChange={this.changeHandler} />
                    <input name="description" type="text" placeholder="describe yourself" value={this.state.description} onChange={this.changeHandler} />
                    <input name="housing_type" type="text" placeholder="housing type" value={this.state.housing_type} onChange={this.changeHandler} />
                    <input name="has_yard" type="text" placeholder="have a yard?" value={this.state.has_yard} onChange={this.changeHandler} />
                    <input name="near_park" type="text" placeholder="near a park?" value={this.state.near_park} onChange={this.changeHandler} />
                    <input name="distance" type="text" placeholder="dog's distance (mi)" value={this.state.distance} onChange={this.changeHandler} />
                    <NavLink to="/puppymagic">
                        <button className="formbutton">Create Profile</button>
                    </NavLink>
                </form>
            </div>
        )
    }

}

export default SignUp;