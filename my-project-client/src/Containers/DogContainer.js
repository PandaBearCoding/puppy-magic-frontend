import React from 'react';
import DogCard from '../Components/DogCard.js';

class DogContainer extends React.Component {

    state = {
        token: {token_type: "Bearer", expires_in: 3600, access_token: "eyJ0eXAiOiJKV1QiLCJhbGciOiJSUzI1NiJ9.eyJhdWQiOiJuSDVyaGVZelZpRlFlM1JXcFFZV0IwZ3oyRnR4M2tPSEwyMDhXZlJGU0diUHUzUGY5NCIsImp0aSI6IjQ2NjdlMmVkZDhhNjliOGI5YTk4YzE2MGMxNGYzZmJjMzMwYWQwZTU4NjZlYTRjMmNkNWRmZjdlMjFhMDgxODgxZGI5OGNiMzYxOTdjYmY4IiwiaWF0IjoxNjA2NzcyNDc5LCJuYmYiOjE2MDY3NzI0NzksImV4cCI6MTYwNjc3NjA3OSwic3ViIjoiIiwic2NvcGVzIjpbXX0.olPYPPXs_GNvvOct_0c4twbzR2rExL0vnNa5nWcs6oGwXEdvx_d2V0kj53GToxuCqXptakqCB93ypabCNR93v_38l6kxtyEJKsFifNs-IXzytyF29gVtOl2B6d-BeQ59TR9cW3c4kA7e_ElkYx3YT0SxPrxAZdHZIOhZHnxwPjA6FE8pV0pKmUHTkl8fl2t8MYE4t1o_1P8c_U3yzrT53zwkODtWmLQ_DzKNFJmTCeym4ePsCqk9GvA6DQG5pDL7asgFRy9RreVhvbneVX_Whyw_rPvBvqOY-8iHse9ORJh_Z25xIKrixWNb7bEJy7lcQOCoj-_x8PIzyZwXjRrkOw"},
        dogApi: [],
        index: 0,
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
        return (<DogCard key={currentDog.name} dog={currentDog} dogClickHandler={this.props.dogClickHandler} matchClickHandler={this.props.matchClickHandler} incrementIndex={this.incrementIndex} />)
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
