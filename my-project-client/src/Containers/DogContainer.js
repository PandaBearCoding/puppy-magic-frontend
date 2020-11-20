import React from 'react';
import DogCard from '../Components/DogCard.js';

class DogContainer extends React.Component {

    state = {
        token: {token_type: "Bearer", expires_in: 3600, access_token: "eyJ0eXAiOiJKV1QiLCJhbGciOiJSUzI1NiJ9.eyJhdWQiOiJuSDVyaGVZelZpRlFlM1JXcFFZV0IwZ3oyRnR4M2tPSEwyMDhXZlJGU0diUHUzUGY5NCIsImp0aSI6ImFjMTA3ZjcyMDM4NjU2ODgwN2M0YTA2MWUwM2VhYTc0MmY2ZmFlZDA0YjdjN2VlNDJmNTBhODllZTQwNzE4MWU5Yzk3ZGVlYjllMWYwMjNlIiwiaWF0IjoxNjA1OTA3MzE1LCJuYmYiOjE2MDU5MDczMTUsImV4cCI6MTYwNTkxMDkxNSwic3ViIjoiIiwic2NvcGVzIjpbXX0.xpBeSqbGjO581vSrm6qasLtxhNoGVqR_jf64tmvw5EnenRaTxozQspQiyZTNrM9V_wvbbkmocpfQqFTPC03AWNYJUtEb7eES1MIhegfSF0otmnRUmZK5GOEktSHYbszJx2K0nkOXnqQGNEUhBjoaf3qdAl0yfOjftGgkZQRvRaXsj6RXjr4dkMpXwH3mqoTYZZidDmFIOOv5lQ5zYB7Dr_jC9tL4ZqXNv3_MfMwis3HksDdQsBOt94ui16BQ_pn7RjCBtzkaBeO-eMhl9a4RqxRj-5-9Cdj0lrXhHYjQqJFXI7UQKntmC2guXtUjB37MpCFbhDCIkfp49q3wt4L-dg"},
        dogApi: []
    }

    // 1st Fetch: POST request for API to generate a new token for us
    // 2nd Fetch: GET all dogs from API
    componentDidMount () {
        // let key = "nH5rheYzViFQe3RWpQYWB0gz2Ftx3kOHL208WfRFSGbPu3Pf94"
        // let secret = "1u6CdRSjjCa2Xz7rv2M009bvpCSERZxpv0dG7Ylg"
        // fetch("https://api.petfinder.com/v2/oauth2/token", {
        // method: "POST",
	    // body: "grant_type=client_credentials&client_id=" + key + "&client_secret=" + secret,
	    // headers: {
        //     "content-type": "application/x-www-form-urlencoded"
	    // }
        // })
        // .then(response => response.json())
        // .then(data => this.setState({token: data}))

        fetch("", {
            headers: {
                "authorization": this.state.token.token_type + " " + this.state.token.access_token,
                "content-type": "application/x-www-form-urlencoded"
            }
        })
        .then(response => response.json())
        // .then(console.log)
        .then(dogs => this.setState({dogApi: dogs.animals}))
        .catch(error => console.log("Oh no, something went wrong.", error))
    }

    // request to actually get all the dogs - uses the token we recieved above for auth/access
    // grabDogs = () => {
    //     fetch("https://api.petfinder.com/v2/animals?type=dog&good_with_dogs=1&good_with_cats=0&good_with_children=0&distance=10&location=11222", {
    //         headers: {
    //             "authorization": data.token_type + " " + data.access_token,
    //             "content-type": "application/x-www-form-urlencoded"
    //         }
    //     })
    //     .then(response => response.json())
    //     // .then(data => console.log("Dogs from API", data))
    //     .then(dogs => this.setState({dogApi: dogs}))
    //     .catch(error => console.log("Oh no, something went wrong.", error))
    // }

    renderDogs = () => {
        // console.log("INSIDE", this.state.dogApi[0])
        return this.state.dogApi.map((el) => <DogCard key={el.id} dog={el} dogClickHandler={this.props.dogClickHandler} matchClickHandler={this.props.matchClickHandler} />)
    }


    render(){
        // console.log("To Get Token", this.state.token)
        // console.log("Dogs from API", this.state.dogApi.animals)
        return(
            <div>
                {/* {this.state.dogApi === [] || this.state.dogApi === undefined ? <h1>LOADING</h1> : this.renderDogs()} */}
                {this.renderDogs()}
            </div>
        )
    }
}

export default DogContainer;


  // environment has good_with as a attribute that accepts a string (cat, dog, children)
    // the API has good_with_cats/good_with_dogs/good_with_children that accepts a 1 or 0 value - 1 for true, 0 for false 
    // how can I conditionally say [good_with = cat] == [good_with_cats=1]

    // default
    // pull user data, initiate another fetch call with the user's info interpolated into the URL
    // string array -- shove in new features if they have mopre than 1

    // start w/ one environment then have multiple

