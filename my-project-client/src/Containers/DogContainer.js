import React from 'react';
import DogCard from '../Components/DogCard.js';
import NavBar from '../Components/NavBar.js';
import Welcome from '../Components/Welcome.js';
import { Route, Switch } from 'react-router-dom';

class DogContainer extends React.Component {

    state = {
        token: {token_type: "Bearer", expires_in: 3600, access_token: "eyJ0eXAiOiJKV1QiLCJhbGciOiJSUzI1NiJ9.eyJhdWQiOiJuSDVyaGVZelZpRlFlM1JXcFFZV0IwZ3oyRnR4M2tPSEwyMDhXZlJGU0diUHUzUGY5NCIsImp0aSI6ImE3ZjkzMzU5YzVjY2NiYzEwMWQzNjU1Yzg1MDM1NzYwYTkyY2NjNzQ4MWFmOWIwN2VmODhmZjljZjI5NTAxOTY1NzkzMGIzMmNkYmNkNWNhIiwiaWF0IjoxNjA2ODc5Njc4LCJuYmYiOjE2MDY4Nzk2NzgsImV4cCI6MTYwNjg4MzI3OCwic3ViIjoiIiwic2NvcGVzIjpbXX0.fhJr4Lx8NhMAOdWasKKdQai3bkIQ4fh4DhPbtCLKKWs8-YQX8bXM9A7VC6KgIfer7ywlQxu0QeUpxHEtHof7TyfaLZjTldY32rQQsDSXogfHEjQOgHlP7ZI83YG3lbCBgfpnVaK8EelqnpOXAZZ3I8FKblNqGWG0dGWNB1fzu_F_UI-SDX6NFQ_g_bvxjhyRURf7zpgmCwKTi7fAoKZLZbnPf6pncflEpu1sFShzstoo1ONGHxvv8F0oo40pVPWKRjJWDQTLuTSNmqTjk14vBKmamjVAtxSNnGvzrE1zzGecLR2YfmG5K10RsweDSkwzJjX76ZsRkgqn3XwkPDbotw"},
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

    renderDogsForWelcome = () => {
        return this.state.dogApi.map((el) => <Welcome key={el.id} dog={el} />)
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
                                <Welcome dog={this.renderDogsForWelcome()} />
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
