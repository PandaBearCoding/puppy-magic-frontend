import React from 'react';
import DogCard from '../Components/DogCard.js';
import NavBar from '../Components/NavBar.js';

class DogContainer extends React.Component {

    state = {
        token: {token_type: "Bearer", expires_in: 3600, access_token: "eyJ0eXAiOiJKV1QiLCJhbGciOiJSUzI1NiJ9.eyJhdWQiOiJuSDVyaGVZelZpRlFlM1JXcFFZV0IwZ3oyRnR4M2tPSEwyMDhXZlJGU0diUHUzUGY5NCIsImp0aSI6IjcyNTk1M2RiMThlZGQ5YTNhYzJjMzM1YTFlMGJkYWE4YzlmMzVjZDQwZmM5NDk1ZmJjMWFkMWQyZjc5MTlhZmU0N2Q3ZjdmOGI3NWQ4Mjc1IiwiaWF0IjoxNjA2ODcyMjA1LCJuYmYiOjE2MDY4NzIyMDUsImV4cCI6MTYwNjg3NTgwNSwic3ViIjoiIiwic2NvcGVzIjpbXX0.h4e7aTm1NkdpHyNlvqkXWCUuHEdHXwzXKhnRr7bDEi5kQ0xxRowRBcAGIaWzbwTk4CwBsR5QzeyY8WbQvWCKn_rppdTC4NGT4zs6h_rWJ9VVYHm4Bef7UbmAdhlBan0vQMREZw8vKHVewjmOHu188aFJngJapcbe5sD-CbMJgvH1EhDNcZMyK1A8FiHWfLGCAPSN0rvjcl1cFCNEXc9P0u-dq_GLi1FghX6EjW0SxeQQAt6S0X-kQtwLGOs1KkuLld3aZUt5OMai9XXgkXU3mp38wxLM9BLsZ2TBKTjbD7fmO7UrHmloMbr3kSMjxU3mcz1VqxPr7DhJX03_3yVgsw"},
        dogApi: [],
        index: 0,
        distance: 100, 
        location: 11222
        // distance: this.props.user.distance, 
        // location: this.props.user.postcode
    }

    // 1st Fetch: POST request for API to generate a new token for us
    // 2nd Fetch: GET all dogs from API
    componentDidMount() {

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
        // console.log(this.props.user)
        // console.log("To Get Token", this.state.token)
        // console.log("Dogs from API", this.state.dogApi)
        return(
        <>
        <NavBar />
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
