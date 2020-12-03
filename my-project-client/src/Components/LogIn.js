import React from 'react';
import { NavLink } from 'react-router-dom';
class LogIn extends React.Component {

    changeHandler = (e) => {
        this.setState({ [e.target.name]: e.target.value })
    }

    render(){
        return (
            <div className="logIn">
                <img className="signUpLogInLogo" alt="" src={"https://scontent-lga3-1.xx.fbcdn.net/v/t1.0-9/38635108_434429280387102_6961077985977827328_n.jpg?_nc_cat=101&ccb=2&_nc_sid=09cbfe&_nc_ohc=5M-8VLbqwecAX9Zilnn&_nc_ht=scontent-lga3-1.xx&oh=c0ff82be91a9b842ba58588e6c62ae92&oe=5FEA5BEE"}/>
                <div>
                    <form className="logInAndSignUpForm">
                        <div className="logInInput">
                            <input type="username" name="username" placeholder="Username" onChange={this.changeHandler} />
                            <input type="password" name="password" placeholder="Password" onChange={this.changeHandler} />
                            <NavLink to="/puppymagic">
                                <button className="formbutton" type="submit">Log In</button>
                            </NavLink>
                        </div>
                    </form>
                </div>
            </div>
        );
    }

}

export default LogIn;