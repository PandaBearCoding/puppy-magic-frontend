import React from 'react';
import DogCard from '../Components/DogCard.js';
import NavBar from '../Components/NavBar.js';
import WelcomeContainer from './WelcomeContainer.js';
import { Route, Switch } from 'react-router-dom';

class DogContainer extends React.Component {

    state = {
        token: {token_type: "Bearer", expires_in: 3600, access_token: "eyJ0eXAiOiJKV1QiLCJhbGciOiJSUzI1NiJ9.eyJhdWQiOiJuSDVyaGVZelZpRlFlM1JXcFFZV0IwZ3oyRnR4M2tPSEwyMDhXZlJGU0diUHUzUGY5NCIsImp0aSI6IjU4OTZjZWY0MGUxZmZhNTZjMGFhZGNiMDRkYjY4MTRjOTFiMWVhYTkxNWM4MzBiZGQ4Yjc0YzE2MTI5ZDIzOWZkOGQzYzhiZWQ4ZjU4M2JlIiwiaWF0IjoxNjA2OTQ3OTI4LCJuYmYiOjE2MDY5NDc5MjgsImV4cCI6MTYwNjk1MTUyOCwic3ViIjoiIiwic2NvcGVzIjpbXX0.PlGWxyqp-F-ko1OWpSQcNFnVZ01jGekNNcD0PNMT8OHA1gmlhR8hootagGQ1kD2jGQgILjvRrdM2KsPUjqky1wnzHwlZI0OycMAupJo-q0z6CiZegH9LN6sspGLtkruWfM7NplDWGVHTWLqSTIquTJ4QNN8FqYkELkf-TNi0D-yG5tT0OkQT7xF_wKdIJdNxhQdsCvtk9Hh75Zh5TcGqIU3zvN_C6AQf6stXPSGlEh8gE0Y-LyEAqKQPgUKX8-cGcCl_upahkgqM2XBDn13-pCIsiX3UQBquUjkCcM5fyd8zY88DvoRKGxOH3mewUttWC6jkWUSmZLrv_HrsiYCakA"},
        dogApi: [],
        index: 0,
        distance: 100, 
        postcode: 11222,
    }

    // componentDidUpdate() {
    //     console.log("Current Props", this.props.user)
    // }

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

        // console.log("CDM", this.props.user.distance)
        // console.log("CDM", this.props.user.postcode)
        
        fetch(`https://api.petfinder.com/v2/animals?type=dog&distance=${this.state.distance}&location=${this.state.postcode}`, {
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
        // console.log("User Props in render of DogContainer: ", this.props.user)
        // console.log("To Get Token: ", this.state.token)
        // console.log("Dogs from API: ", this.state.dogApi)
        return(
            <Switch>
                <Route path="/puppymagic/welcome" render={() => {
                    return(
                        <div className="welcome">
                            {this.state.dogApi.length > 0 ?
                            <div>
                                <WelcomeContainer dogApi={this.state.dogApi} />
                            </div>
                            :
                            <h1>Loading Dogs...</h1>
                            }
                        </div>
                    )
                }} />
                <Route path="/puppymagic" render={() => {
                    return(
                        <div>
                            <NavBar />
                            {this.state.dogApi.length > 0 ?
                            <div>
                                <div>{this.renderDogs()}</div>
                            </div>
                            : 
                            <h1>Loading Dogs...</h1>
                            }
                        </div>
                    )
                }}/>
            </Switch>
             
   
        )
    }
}

export default DogContainer;
