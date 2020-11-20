import React from 'react';
// import TinderCard from 'react-tinder-card'

class DogCard extends React.Component {

    localClickHandler = (e) => {
        let target = e.currentTarget.textContent 
        this.props.dogClickHandler(this.props.dog, target)
        this.props.matchClickHandler(target)
        // console.log("clicked", e.currentTarget.textContent) 
    }


// oneDogAtATime = () => {
    // for (this.props.dog) {
    //     console.log("hello")
    // }
// }

    render(){
        // console.log(this.props.dog)
        return(
            <div>
               <h1>{this.props.dog.name}</h1>
                <img className="dogCardImage" alt="" src={this.props.dog.photos[0].full}/>
                <p>Age: {this.props.dog.age}</p>
                <p>Gender: {this.props.dog.gender}</p>
                <p>Size: {this.props.dog.size}</p>
                <p>Primary Breed: {this.props.dog.breeds.primary}</p>
                <p>Coat Length: {this.props.dog.coat}</p>
                <p>Primary Color: {this.props.dog.colors.primary}</p>
                <p>Location: {this.props.dog.contact.address.postcode}</p>
                <p>Distance From You (mi): {this.props.dog.distance}</p>
                <p>Abbreviated Description: {this.props.dog.description}</p>
                <p>Shelter Contact Information: {this.props.dog.contact.email}</p>
                {this.props.dog.environment.cats === true ? <p>Good With Cats: Yes</p>: <p>Good With Cats: No</p>}
                {this.props.dog.environment.dogs === true ? <p>Good With Dogs: Yes</p>: <p>Good With Dogs: No</p>}
                {this.props.dog.environment.children === true ? <p>Good With Children: Yes</p>: <p>Good With Children: No</p>}
                {this.props.dog.attributes.house_trained === true ? <p>House Trained: Yes</p>: <p>House Trained: No</p>}
                {/* {this.props.dog.attributes.shots_current === true ? <p>Up-To-Date on Vaccination: Yes</p>: <p>Up-To-Date on Vaccination: No</p>} */}
                {this.props.dog.attributes.spayed_neutered === true ? <p>Spayed/Neutered: Yes</p>: <p>Spayed/Neutered: No</p>}
                {this.props.dog.attributes.special_needs === true ? <p>Special Needs: Yes</p>: <p>Special Needs: No</p>}
                <button onClick={this.localClickHandler}>Swipe Left</button>
                <button onClick={this.localClickHandler}>Swipe Right</button>
            </div>
        )
    }
} 

export default DogCard;

// to see once, something must persist 
// for dogs in BE --> POST in DogContainer 
// need to remember dog 
// in match model, POST info 


// anything I want to render from the API --> put in dog Model 



// if dog has video, display video
// <video width="320" height="240" controls>
// <source src={this.props.dog} type="video/mp4"/>
// </video>