import React from 'react';
import DogCard from '../Components/DogCard.js';

class DogContainer extends React.Component {

    state = {
        token: {token_type: "Bearer", expires_in: 3600, access_token: "eyJ0eXAiOiJKV1QiLCJhbGciOiJSUzI1NiJ9.eyJhdWQiOiJuSDVyaGVZelZpRlFlM1JXcFFZV0IwZ3oyRnR4M2tPSEwyMDhXZlJGU0diUHUzUGY5NCIsImp0aSI6IjZkMjc0ZTk4NTJkMDg0OTIxOGY4NzQ3Nzk4NzkxOTkxZmM5MmM3ZGZiNjU1NDgwNWE0NjM5NzY4MjU5MjdmMzZjMWM0MmYyNDBiN2RmMWNjIiwiaWF0IjoxNjA2NzY4ODI0LCJuYmYiOjE2MDY3Njg4MjQsImV4cCI6MTYwNjc3MjQyNCwic3ViIjoiIiwic2NvcGVzIjpbXX0.CCf58ZbOwXdcWNC5yKnydp0y2wKkCekpj4tICEcWqr5swbFeHqzme17saXyeS4pZv6wOTsWOw4axgORVgLihU0xMOoAA-PKdGv0vDb3MChx0fniP3dU00p-ASZvOHh9BFn2q0u8_r2MHdvIcLdtJLLyV2fy1e0uG5lW0rTkSbqBYxMimYTO7oOM7tvQyRmsfvifa_2JwJveL96kXpeZi_wgNeS59nZTjj2lbM7WFkiypp3rKHyIw57CaQ2t-C40Ap-2YMXc4VsmsyYeBTvPyXbzA6d10n3BZmTC4thv1XUFVHyy3UueAA5Agh6u2TWVEAAuEP2fLVZyTS3246RqEFg"},
        dogApi: [],
        index: 0,
        // userApi: [] 
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

        fetch("https://api.petfinder.com/v2/animals?type=dog&distance=50&location=11222", {
        // fetch(`https://api.petfinder.com/v2/animals?type=dog&distance=${this.props.user.distance_pref[0].distance}&location=${this.props.user.location_pref[0].postcode}`, {
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
        // console.log("Inside renderDogs Func", currentDog)
        return (<DogCard key={currentDog.name} dog={currentDog} dogClickHandler={this.props.dogClickHandler} matchClickHandler={this.props.matchClickHandler} incrementIndex={this.incrementIndex} />)
    }

    render(){
        // console.log("To Get Token", this.state.token)
        // console.log("INDEX", this.state.index)
        // console.log("Location Pref", this.props.user.location_pref[0].postcode)
        // console.log("Distance Pref", this.props.user.distance_pref[0].distance)
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
