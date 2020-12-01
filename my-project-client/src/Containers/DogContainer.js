import React from 'react';
import DogCard from '../Components/DogCard.js';

class DogContainer extends React.Component {

    state = {
        token: {token_type: "Bearer", expires_in: 3600, access_token: "eyJ0eXAiOiJKV1QiLCJhbGciOiJSUzI1NiJ9.eyJhdWQiOiJuSDVyaGVZelZpRlFlM1JXcFFZV0IwZ3oyRnR4M2tPSEwyMDhXZlJGU0diUHUzUGY5NCIsImp0aSI6IjA5NTViMDI4MWNkNjZhMzI1YjY2Nzg2NGY0ODU0YmM1MjJhMjdlYmQ4MmJhMzc1NmNlMWI2Yzk1MjgxN2ViODZhMWUwY2EwMGFmNjg5ZjI3IiwiaWF0IjoxNjA2ODM5NDE1LCJuYmYiOjE2MDY4Mzk0MTUsImV4cCI6MTYwNjg0MzAxNSwic3ViIjoiIiwic2NvcGVzIjpbXX0.nF7WKS-UXCgPbi_fysF0xx8RtXfUlM1r02x6_nx053GnpRLUIRB8VRvc0GWU5UsqzlAza2ZinGc5B-NQeFKpW5DOiw4M3g1upYrH3jn2EN2DgY9R-dPSxHsYZ_GXP4IVlPtBIzOdUjyGjLibrP6Nceybxk-DJTtwOqH1iakLeKXBgO1dchp7j7rAnqDpdj8KyI1kXFQsP80Gk3BHwe490g_rIsN9wW7VpzRuWMIh1gRPj00M_soD82d5BLd4vrQGjjEJZBkByxSbYHdxu6Hu-pA5CcSIlpVMrsYfrPAcAdWAv_f6tY1IBuuU98IY3kcI12-aajeiJm-yidftimxrOQ"},
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
        console.log("USER PROPS", this.props.user)
        // console.log("user LOCATION in props", this.props.user.postcode)
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
