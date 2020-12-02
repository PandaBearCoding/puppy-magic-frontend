import React from 'react';
import DogCard from '../Components/DogCard.js';
import NavBar from '../Components/NavBar.js';
import WelcomeContainer from './WelcomeContainer.js';
import { Route, Switch } from 'react-router-dom';

class DogContainer extends React.Component {

    state = {
        token: {token_type: "Bearer", expires_in: 3600, access_token: "eyJ0eXAiOiJKV1QiLCJhbGciOiJSUzI1NiJ9.eyJhdWQiOiJuSDVyaGVZelZpRlFlM1JXcFFZV0IwZ3oyRnR4M2tPSEwyMDhXZlJGU0diUHUzUGY5NCIsImp0aSI6ImZkYmY0NWNkNjJiYWZiYzBmNWEyZDllNDI1NGVlMWE1MTVjYzcxNDM5ZGMwZmQ0OTE4NjkwZDExMDcyMjQ3OTI2ODRhMDYyMTIwNWM5MmI2IiwiaWF0IjoxNjA2ODgzNzEyLCJuYmYiOjE2MDY4ODM3MTIsImV4cCI6MTYwNjg4NzMxMiwic3ViIjoiIiwic2NvcGVzIjpbXX0.pg2SQANuyDUeS40N23ox6909mqoeQOMuU75uOC0SwiDxbc5D3Rh87fZ_t2IUeN3XR-CkHPpquxg_pY2KX5STWxeSebUkq0wtjNFWWd0H1s8fBR0N6BBKbeHOqqOGWq2G5bbiJD150K3Kg3Upeqb6TbhgcRHmgAZ9aO7xPwvoSVjHh0BwWGL-cU_f6XcjJUhlWVNj-32ea15VYOqQWYm3tq7O2TmQof1aE3kuP0HmsogJHg978Xv8vCSl8-Eolem2aVPSfM6JJtROrM0M1ftGZ8I2jzy-nNRzxh3kqAVHTrhc4tedI-EOFWJmSDDRRPNJFeoqx867vfBcTaeJjENmwQ"},
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
