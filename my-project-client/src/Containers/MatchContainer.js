import React from 'react';
import MatchCard from '../Components/MatchCard.js';

class MatchContainer extends React.Component{

    renderMatches = () => {
        return this.props.matches.map((el) => <MatchCard key={el.id} match={el} clickHandler={this.props.clickHandler} matchDeleteHandler={this.props.matchDeleteHandler} />)
    }

    render(){ 
        if(!this.props.matches){
            return <h1>Matches are loading...</h1>
        }
        return(
            <div className="matchCard" >
                <h1>My Matches</h1>
                {this.renderMatches()}
            </div>
        )   
    }
}

export default MatchContainer;


