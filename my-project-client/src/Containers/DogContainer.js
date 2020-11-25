import React from 'react';
import DogCard from '../Components/DogCard.js';

class DogContainer extends React.Component {

    state = {
        token: {token_type: "Bearer", expires_in: 3600, access_token: "eyJ0eXAiOiJKV1QiLCJhbGciOiJSUzI1NiJ9.eyJhdWQiOiJuSDVyaGVZelZpRlFlM1JXcFFZV0IwZ3oyRnR4M2tPSEwyMDhXZlJGU0diUHUzUGY5NCIsImp0aSI6IjkwN2JiOTgxYjUyZThlNDhiZWRhMDYxNTBjYzAwM2QxNjA4OGRmNzk1Y2E0YzNkNTAwMTUyNWQ0OTRkN2NhNGViMjJlOTYyMDk1MzU3NTZhIiwiaWF0IjoxNjA2MzI3NDgxLCJuYmYiOjE2MDYzMjc0ODEsImV4cCI6MTYwNjMzMTA4MSwic3ViIjoiIiwic2NvcGVzIjpbXX0.DUaxVaCe9fFYwBWX2OxyO5LhfWVu-vWNtEEIlMQi_WZ-TS5I61ZXWdWqUPejl6mvpPNrraP5umiuVypg1CwAsNW4Ponnf6SRkwuiueB4yLD5sz9EQjaAJ1jEuORaHmmbJYy1OFkQ4KlVYEK9kb6geNnFTEXejnTsOe5cK5c-LBT46CG9Jy2J6CuRqvLkj6KmrOnctOJLXLTKOqP24rTqvtFjzNMufpsJy8kaTbPk6--nI4XmYkWgU5DcVUSMKaWFpbTGR7XKOsrXt5hInr4QJHst0v-vbIDv8McX5nyYKlx3_h5KjhYpx8zpgQETkwIrwCfOzwagooE2u7OzZ9QCjg"},
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
