import React from 'react';
import MatchCard from '../Components/MatchCard.js';

class MatchContainer extends React.Component{

    renderMatches = () => {
        return this.props.matches.map((el) => <MatchCard key={el.id} match={el} clickHandler={this.props.clickHandler} deleteHandler={this.props.deleteHandler} />)
    }

    render(){ 
        // console.log(this.props.matches)
        if(!this.props.matches){
            return <h1>Matches are Loading...</h1>
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


