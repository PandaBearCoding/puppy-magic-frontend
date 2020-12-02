import React from 'react';
import TinderCard from 'react-tinder-card';

class DogCard extends React.Component {

    state = {
        direction: ""
    }

        localSwipeHandler = (direction) => {
            if(this.props.dog.primary_photo_cropped != null) {
                this.props.dogSwipeHandler(this.props.dog, direction)
                this.props.incrementIndex()  
            }else{
                this.props.dog.primary_photo_cropped = "https://i.pinimg.com/originals/6f/1e/8b/6f1e8b15a860d0083116f8bd9e2778d6.png"
                this.props.dogSwipeHandler(this.props.dog, direction)
                this.props.incrementIndex()
            }
        }

    // localClickHandler = (e) => {
    //     if(this.props.dog.primary_photo_cropped != null){
    //         let target = e.currentTarget.textContent 
    //         this.props.dogClickHandler(this.props.dog, target)
    //         // this.props.matchClickHandler(target)
    //         this.props.incrementIndex()
    //         // console.log("clicked", e.currentTarget.textContent) 
    //     }else{
    //         this.props.dog.primary_photo_cropped = "https://i.pinimg.com/originals/6f/1e/8b/6f1e8b15a860d0083116f8bd9e2778d6.png"
    //         let target = e.currentTarget.textContent 
    //         this.props.dogClickHandler(this.props.dog, target)
    //         // this.props.matchClickHandler(target)
    //         this.props.incrementIndex()
    //         // console.log("clicked", e.currentTarget.textContent) 
    //     }
    // }

    render(){
        // console.log("FROM DOG CARD", this.props.dog)
        return(
            <div className="tinderCardContainer">
                <TinderCard className="dogTinderCard"
                preventSwipe={["up", "down"]}
                onSwipe={(direction) => this.localSwipeHandler(direction)}
                >
                    <div>
                        <h1 className="dogAndMatchCardName">{this.props.dog.name}</h1>
                        {/* <img className="dogCardImage" onClick={this.photoClickHandler} alt="Sorry, No Image Was Provided For This Pup" src={
                            this.state.showImage1
                            ?
                            this.props.dog.photos[0].full
                            : 
                            this.props.dog.photos[1].full
                            } 
                        /> */}
                        <img className= "dogAndMatchCardImage" alt="" src={
                            this.props.dog.primary_photo_cropped != null
                            ?
                            this.props.dog.primary_photo_cropped.full
                            : 
                            "https://i.pinimg.com/originals/6f/1e/8b/6f1e8b15a860d0083116f8bd9e2778d6.png"
                            }
                        />
                        <p className="dogCardPs">Age: <span className="dogCardSpans">{this.props.dog.age}</span></p>
                        <p className="dogCardPs">Gender: <span className="dogCardSpans">{this.props.dog.gender}</span></p>
                        <p className="dogCardPs">Size: <span className="dogCardSpans">{this.props.dog.size}</span></p>
                        <p className="dogCardPs">Primary Breed: <span className="dogCardSpans">{this.props.dog.breeds.primary}</span></p>
                        <p className="dogCardPs">Location: <span className="dogCardSpans">{this.props.dog.contact.address.postcode}</span></p>
                        <p className="dogCardPs">Distance From You (mi): <span className="dogCardSpans">{this.props.dog.distance}</span></p>
                        <p className="dogCardPs">Abbreviated Description: <span className="dogCardSpans">{this.props.dog.description}</span></p>
                        {this.props.dog.environment.cats === true ? <p className="dogCardPs">Good With Cats: <span className="dogCardSpans">Yes</span></p>: <p className="dogCardPs">Good With Cats: <span className="dogCardSpans">No</span></p>}
                        {this.props.dog.environment.dogs === true ? <p className="dogCardPs">Good With Dogs: <span className="dogCardSpans">Yes</span></p>: <p className="dogCardPs">Good With Dogs: <span className="dogCardSpans">No</span></p>}
                        {this.props.dog.environment.children === true ? <p className="dogCardPs">Good With Children: <span className="dogCardSpans">Yes</span></p>: <p className="dogCardPs">Good With Children: <span className="dogCardSpans">No</span></p>}
                        {this.props.dog.attributes.house_trained === true ? <p className="dogCardPs">House Trained: <span className="dogCardSpans">Yes</span></p>: <p className="dogCardPs">House Trained: <span className="dogCardSpans">No</span></p>}
                        {this.props.dog.attributes.spayed_neutered === true ? <p className="dogCardPs">Spayed/Neutered: <span className="dogCardSpans">Yes</span></p>: <p className="dogCardPs">Spayed/Neutered: <span className="dogCardSpans">No</span></p>}
                        {this.props.dog.attributes.special_needs === true ? <p className="dogCardPs">Special Needs: <span className="dogCardSpans">Yes</span></p>: <p className="dogCardPs">Special Needs: <span className="dogCardSpans">No</span></p>}
                        <p className="dogCardPs">Shelter Contact Information: <span className="dogCardSpans">{this.props.dog.contact.email}</span></p>
                        <p className="dogCardPs">PetFinder Link: <span className="dogCardSpans">{this.props.dog.url}</span></p>
                        {/* <button onClick={this.localClickHandler}>Swipe Left</button>
                        <button onClick={this.localClickHandler}>Swipe Right</button> */}
                    </div>
                </TinderCard>
            </div>
        )
    }
} 

export default DogCard;
