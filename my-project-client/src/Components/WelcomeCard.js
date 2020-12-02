import React from 'react';

class WelcomeCard extends React.Component {

    render(){
        console.log(this.props.dog)
        return(
                <div className="welcomeDogCard">
                    <h1 className="welcomeCardName">{this.props.dog.name}</h1>
                    <img className= "welcomeCardImage" alt="" src={
                        this.props.dog.primary_photo_cropped != null
                        ?
                        this.props.dog.primary_photo_cropped.full
                        : 
                        "https://i.pinimg.com/originals/6f/1e/8b/6f1e8b15a860d0083116f8bd9e2778d6.png"
                        }
                    />
                    <p className="matchDogandWelcomeCardPs">For More Info: <a className="matchDogAndWelcomeCardATags" href={this.props.dog.url}> PetFinder Profile </a></p>
                </div>
        )
    }
}

export default WelcomeCard;
