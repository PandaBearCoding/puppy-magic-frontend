import React from 'react';
import MatchCard from '../Components/MatchCard.js';
import NavBar from '../Components/NavBar.js';
import { Route, Switch } from 'react-router-dom'


class MatchContainer extends React.Component{

    renderMatches = () => {
        return this.props.matches.map((el) => <MatchCard key={el.id} match={el} clickHandler={this.props.clickHandler} matchDeleteHandler={this.props.matchDeleteHandler} />)
    }

    render(){ 
        let userId = this.props.user.id
        if(!this.props.matches){
            return <h1>Matches are loading...</h1>
        }
        return(
            <div>
                <NavBar />
                <Switch>
                    <Route path="/matches/:id" render={({match}) => {
                        let id = parseInt(match.params.id)
                        let foundMatch = this.props.matches.find((match) => match.id === id)
                        console.log("Found Match: ", foundMatch)
                        return <MatchCard match={foundMatch} clickHandler={this.props.clickHandler} matchDeleteHandler={this.props.matchDeleteHandler}/>    
                    }} />
                    <Route path="/matches" render={() => {
                        return(
                            <div className="matchCard" >
                                <h1 className="matchCardH1">My Matches</h1>
                                {this.renderMatches()}
                            </div>
                        )
                    }} />
                </Switch>
            </div>
        )
    }
}

export default MatchContainer;


