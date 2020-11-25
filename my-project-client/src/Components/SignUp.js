import React from 'react'

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
        lifestyle: ""
    }


    localSubmitHandler = (e) => {
        e.preventDefault()
        this.props.newUserSubmitHandler(this.state)
        this.setState({name: "", username: "", password: "", profile_picture: "", postcode: "", age: "", phone_number: "", email: "", description: "", houseing_type: "", has_yard: "", near_park: "", lifestyle: ""})
    }

    changeHandler = (e) => {
        this.setState({[e.target.name]: e.target.value})
    }

    render(){
        return(
            <div>
                <h1>Sign Up</h1>
                <form className="createuserform" onSubmit={this.localSubmitHandler}>
                    <input name="name" type="text" placeholder="name" value={this.state.name} onChange={this.changeHandler} />
                    <input name="username" type="text" placeholder="username" value={this.state.username} onChange={this.changeHandler} />
                    <input name="password" type="text" placeholder="password" value={this.state.password} onChange={this.changeHandler} />
                    <input name="profile_picture" type="text" placeholder="profile picture" value={this.state.profile_picture} onChange={this.changeHandler} />
                    <input name="postcode" type= "text" placeholder="postcode" value={this.state.postcode} onChange={this.changeHandler} />
                    <input name="age" type="number" placeholder="age" value={this.state.age} onChange={this.changeHandler} />
                    <input name="phone_number" type="text" placeholder="phone number" value={this.state.phone_number} onChange={this.changeHandler} />
                    <input name="email" type="text" placeholder="email" value={this.state.email} onChange={this.changeHandler} />
                    <input name="description" type="text" placeholder="description" value={this.state.description} onChange={this.changeHandler} />
                    <input name="housing_type" type="text" placeholder="housing type" value={this.state.housing_type} onChange={this.changeHandler} />
                    <input name="has_yard" type="text" placeholder="have a yard?" value={this.state.has_yard} onChange={this.changeHandler} />
                    <input name="near_park" type="text" placeholder="near a park?" value={this.state.near_park} onChange={this.changeHandler} />
                    {/* <input name="lifestyle" type= "text" value={this.state.lifestyle} onChange={this.changeHandler} /> */}
                    <label>
                        Activity Level:
                        <select value={this.state.lifestyle} onChange={this.changeHandler}>
                            <option value="Sedentary">Sedentary</option>
                            <option value="Moderate">Moderate</option>
                            <option value="Active">Active</option>
                        </select>
                    </label> 
                    <button className="formbutton">Create Profile</button>
                </form>
            </div>
        )
    }

}

export default SignUp;