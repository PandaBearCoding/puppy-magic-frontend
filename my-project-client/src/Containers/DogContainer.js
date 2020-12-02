import React from 'react';
import DogCard from '../Components/DogCard.js';
import NavBar from '../Components/NavBar.js';
import WelcomeContainer from './WelcomeContainer.js';
import { Route, Switch } from 'react-router-dom';

class DogContainer extends React.Component {

    state = {
        token: {token_type: "Bearer", expires_in: 3600, access_token: "eyJ0eXAiOiJKV1QiLCJhbGciOiJSUzI1NiJ9.eyJhdWQiOiJuSDVyaGVZelZpRlFlM1JXcFFZV0IwZ3oyRnR4M2tPSEwyMDhXZlJGU0diUHUzUGY5NCIsImp0aSI6IjFhYzFmOTk2NjNmOTBjNzY1YTE0ZTU3NWVkMzY4OWQ4MGEzNWI4OGQ4NWFlNWQ0Yjg0YzY1ZDNiMmU0NGJhMDAwY2ZlZDA5ZmE5ZTBiZWIzIiwiaWF0IjoxNjA2OTI4NjI5LCJuYmYiOjE2MDY5Mjg2MjksImV4cCI6MTYwNjkzMjIyOSwic3ViIjoiIiwic2NvcGVzIjpbXX0.Exk95eV7UjE6hEvWTRTr92tnP--EdLFo0ESjw5u-5OTd7LaMFwblKuBCAmg-Q7JAurOKCzYuUmsNmGrgtnuTpwKYHE-YYZ0O0e1q7H2slCV8fQ3pc-uWpxFf634kSLx1zHIn43QP9jE5G8frq2LNNXUptmKKm0dKdRif6eqzD7OJ9YUcUUL923n0sUOg510xxUx5AdGH2HbVwWeAbixIdf8AbyRz1bu6N7wDfoZ80NCs45lSdYQ1NZKFSVeuJFTFcAfh_yGQ-P63WB3kPZERODmYWO3k5zs9ILQb7KYIz6hSAfi37oF8FHSzVMH0uyMU7lWgH4uQqgVC-bEkZspMtg"},
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

        console.log("CDM", this.props.user.distance)
        console.log("CDM", this.props.user.postcode)
        
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
