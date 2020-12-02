import React from 'react';
import { NavLink } from 'react-router-dom';

class MatchCard extends React.Component{
    // state = {
    //     goToShow: false
    // }

    // photoClickHandler = (e) => {
    //     this.setState((prevState) => {
    //         return {
    //             goToShow: !prevState.goToShow
    //         }
    //     })
    // }

    localDeleteHandler = (e) => {
        this.props.matchDeleteHandler(this.props.match)
    }
    
    render(){
        let { name, profile_picture } = this.props.match
        return(
            <div className="matchCard" >
                <h1 className="matchAndDogCardName">{name}</h1>
                <NavLink to={`/matches/${this.props.match.id}`}>
                <img className= "dogAndMatchCardImage" alt="" src={
                            profile_picture != null
                            ?
                            profile_picture
                            : 
                            "https://i.pinimg.com/originals/6f/1e/8b/6f1e8b15a860d0083116f8bd9e2778d6.png"
                            }
                />
                </NavLink>
                <p className="matchDogandWelcomeCardPs">For More Info: <a className="matchDogAndWelcomeCardATags" href={this.props.match.url}> PetFinder Profile </a></p>
                <br></br>
                <div>
                    <button className="matchCardDeleteButton" onClick={this.localDeleteHandler}>❌</button>
                </div>
            </div>
        )
    }
}

export default MatchCard;


