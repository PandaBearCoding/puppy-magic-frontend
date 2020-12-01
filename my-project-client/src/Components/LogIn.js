import React from 'react';

class LogIn extends React.Component {

    changeHandler = (e) => {
        this.setState({ [e.target.name]: e.target.value })
    }

    render(){
        return (
            <div>
                <h1>Log In</h1>
                <div className="logInPage">
                    <form className="logInForm">
                        <div className="logInInput">
                            <input type="username" name="username" placeholder="Username" onChange={this.changeHandler} />
                            <input type="password" name="password" placeholder="Password" onChange={this.changeHandler} />
                            <button className="loginbutton" type="submit">Log In</button>
                            <button className="loginbutton" type="submit">Sign Up</button>
                        </div>
                    </form>
                </div>
            </div>
        );
    }

}

export default LogIn;