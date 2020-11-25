import React from 'react';
import DogCard from '../Components/DogCard.js';

class DogContainer extends React.Component {

    state = {
        token: {token_type: "Bearer", expires_in: 3600, access_token: "eyJ0eXAiOiJKV1QiLCJhbGciOiJSUzI1NiJ9.eyJhdWQiOiJuSDVyaGVZelZpRlFlM1JXcFFZV0IwZ3oyRnR4M2tPSEwyMDhXZlJGU0diUHUzUGY5NCIsImp0aSI6IjU0YjczMDY0OTZlYzkyNGE5MTkzZjIwOGNkYTI3OTY3YTcwNzFmNWRlMWJlOWYxMzQ3MmUxNWU4ZTRmYzU2OWY2YWY0YmUzMTcwOWIwMTY3IiwiaWF0IjoxNjA2Mjc0NDMzLCJuYmYiOjE2MDYyNzQ0MzMsImV4cCI6MTYwNjI3ODAzMiwic3ViIjoiIiwic2NvcGVzIjpbXX0.NYeIJBPAbrXur_iZQ85DIy7NKMQYsyo9OINkw7pPhp0zOKqsmsjc05MSwyLvpm7tU5E4_qPfUkiWJSEd4bODJ08A8C9BK0OZWQUYQQoZ6nesk_JcSIrOUPPFAYhJl_vxCaulNFWhLD6KRPguEyPvyEF7bmTucJRn67numS1_AsU9xMcktsdyJvgbhW5xIJ5GzZGxisub_acDVgKF_AnVPJJII9LCTGRpJ05meuwIaJwmrZuXWuXFP4o7dOkPIcEayLmM6vWmhAHDwP3XCVY9NLq8piplfH7KkBN2KGoPELWiG6WVftTfMJOxwuE2zLTGq3wQwRmumbPwQjyJ9QvuWA"},
        dogApi: [],
        index: 0,
        // userApi: [] 
    }

    // 1st Fetch: POST request for API to generate a new token for us
    // 2nd Fetch: GET all dogs from API
    componentDidMount () {
        // let key = 
        // let secret = 
        // fetch("https://api.petfinder.com/v2/oauth2/token", {
        // method: "POST",
	    // body: "grant_type=client_credentials&client_id=" + key + "&client_secret=" + secret,
	    // headers: {
        //     "content-type": "application/x-www-form-urlencoded"
	    // }
        // })
        // .then(response => response.json())
        // .then(data => this.setState({token: data}))

        fetch(`https://api.petfinder.com/v2/animals?type=dog&good_with_dogs=1&good_with_cats=0&good_with_children=0&distance=10&location=11222`, {
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
        console.log("INDEX", this.state.index)
        // console.log("To Get Token", this.state.token)
        // console.log("Dogs from API", this.state.dogApi.animals)
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
