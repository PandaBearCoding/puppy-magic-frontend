import React from 'react';
import DogCard from '../Components/DogCard.js';

class DogContainer extends React.Component {

    state = {
        token: {token_type: "Bearer", expires_in: 3600, access_token: "eyJ0eXAiOiJKV1QiLCJhbGciOiJSUzI1NiJ9.eyJhdWQiOiJuSDVyaGVZelZpRlFlM1JXcFFZV0IwZ3oyRnR4M2tPSEwyMDhXZlJGU0diUHUzUGY5NCIsImp0aSI6ImJlNTFlZDZlNmEzMjhjODE0Y2ViMWZiMTJkZjE4NmE0MGYzN2UxMzAxMWQ5NzBhZjk5NDJhMGQzYjE4YTQ0ZGVlZmM2MTBlN2M4ZjEyNjBjIiwiaWF0IjoxNjA2ODQzMDc5LCJuYmYiOjE2MDY4NDMwNzksImV4cCI6MTYwNjg0NjY3OSwic3ViIjoiIiwic2NvcGVzIjpbXX0.cGuMJhJKYpibsJOL96B1IheIebeNKUYdlQExyE2MONrNjcHIzO9bSFbZvpdeQ_cyZ0xrYceeyH7OW_FDjKHWMsb0iJfFMeaUrJrTOg2tEgtAVMW3uXlNkAfu5kxWD01izIj5WZhjY-7XYIyYr1gZtYE0A9yXkg8wxVPJ61cWgiSeMelJFKGbksovsPk6qQVxEITsum0VNI0aC94KL15OlAMV7hazNWsZuOOkMpmcmNPhmF0Gi9jHrJa0e7ixpiFNjfxKhJ632P5Az5ahlYyaoZv_CcvZwR1JIe5zOVnt2lpDqtsj35agajy7J1Gd8iufBM8Pnz2mjk_FUvZ6VnRgaw"},
        dogApi: [],
        index: 0,
        distance: 100, 
        location: 11222
        // distance: this.props.user.distance, 
        // location: this.props.user.postcode
    }

    // 1st Fetch: POST request for API to generate a new token for us
    // 2nd Fetch: GET all dogs from API
    componentDidMount () {
     
        // fetch("https://api.petfinder.com/v2/oauth2/token", {
        // method: "POST",
	    // body: "grant_type=client_credentials&client_id=" + key + "&client_secret=" + secret,
	    // headers: {
        //     "content-type": "application/x-www-form-urlencoded"
	    // }
        // })
        // .then(response => response.json())
        // .then(data => this.setState({token: data}))

        fetch(`https://api.petfinder.com/v2/animals?type=dog&distance=${this.state.distance}&location=${this.state.location}`, {
            headers: {
                "authorization": this.state.token.token_type + " " + this.state.token.access_token,
                "content-type": "application/x-www-form-urlencoded"
            }
        })
        .then(response => response.json())
        .then(dogs => this.setState({dogApi: dogs.animals}))
        .catch(error => console.log("Oh no, something went wrong.", error))
    }

    incrementIndex = () => {
        this.setState(prevState => ({ index: prevState.index + 1}))
    }

    renderDogs = () => {
        let currentDog = this.state.dogApi[this.state.index]
        return (<DogCard key={currentDog.name} dog={currentDog} dogSwipeHandler={this.props.dogSwipeHandler} matchClickHandler={this.props.matchClickHandler} incrementIndex={this.incrementIndex} />)
    }

    render(){
        // console.log("To Get Token", this.state.token)
        // console.log("Dogs from API", this.state.dogApi)
        return(
        <>
            {this.state.dogApi.length > 0 ? 
            <div>
                <h1>{this.renderDogs()}</h1>
            </div>
            : 
            <h1>Loading Dogs...</h1>
            }
        </>
        )
    }
}

export default DogContainer;
