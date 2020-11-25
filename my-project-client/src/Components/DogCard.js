import React from 'react';
import TinderCard from 'react-tinder-card';

class DogCard extends React.Component {

    state = {
        showImage1: true,
        // direction: ""
    }

    // swiped = (e) => {

    //     this.setState((prevState) => {
    //         return {
    //             direction: !prevState.direction
    //         }
    //     })

    //     let target = e.currentTarget.textContent 
    //     this.props.dogClickHandler(this.props.dog, target)
    //     this.props.matchClickHandler(target)
    //     this.props.incrementIndex()
    //     console.log("Bye felicia!")
    // }

    photoClickHandler = (e) => {
        this.setState((prevState) => {
            return {
                showImage1: !prevState.showImage1
            }
        })
    }

    localClickHandler = (e) => {
        let target = e.currentTarget.textContent 
        this.props.dogClickHandler(this.props.dog, target)
        this.props.matchClickHandler(target)
        this.props.incrementIndex()
        // console.log("clicked", e.currentTarget.textContent) 
    }

    render(){
        // console.log("FROM DOG CARD", this.props.dog)
        return(
            <div className="tinderCardContainer">
                <TinderCard>
                    <div className="dogTinderCard">
                        <h1>{this.props.dog.name}</h1>
                        <img className="dogCardImage" onClick={this.photoClickHandler} alt="" src={
                            this.state.showImage1
                            ?
                            this.props.dog.photos[0].full
                            : 
                            this.props.dog.photos[1].full
                            }
                        />
                        <p>Age: {this.props.dog.age}</p>
                        <p>Gender: {this.props.dog.gender}</p>
                        <p>Size: {this.props.dog.size}</p>
                        <p>Primary Breed: {this.props.dog.breeds.primary}</p>
                        <p>Location: {this.props.dog.contact.address.postcode}</p>
                        <p>Distance From You (mi): {this.props.dog.distance}</p>
                        <p>Abbreviated Description: {this.props.dog.description}</p>
                        {this.props.dog.environment.cats === true ? <p>Good With Cats: Yes</p>: <p>Good With Cats: No</p>}
                        {this.props.dog.environment.dogs === true ? <p>Good With Dogs: Yes</p>: <p>Good With Dogs: No</p>}
                        {this.props.dog.environment.children === true ? <p>Good With Children: Yes</p>: <p>Good With Children: No</p>}
                        {this.props.dog.attributes.house_trained === true ? <p>House Trained: Yes</p>: <p>House Trained: No</p>}
                        {this.props.dog.attributes.spayed_neutered === true ? <p>Spayed/Neutered: Yes</p>: <p>Spayed/Neutered: No</p>}
                        {this.props.dog.attributes.special_needs === true ? <p>Special Needs: Yes</p>: <p>Special Needs: No</p>}
                        <p>Shelter Contact Information: {this.props.dog.contact.email}</p>
                        <button onClick={this.localClickHandler}>Swipe Left</button>
                        <button onClick={this.localClickHandler}>Swipe Right</button>
                    </div>
                </TinderCard>
            </div>
        )
    }
} 

export default DogCard;
