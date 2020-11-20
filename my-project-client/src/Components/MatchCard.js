import React from 'react'

class MatchCard extends React.Component{

    localDeleteHandler = (e) => {
        this.props.deleteHandler(this.props.match)
    }
    
    render(){
        let { name, profile_picture } = this.props.match
       
        return(
            <div className="matchCard" >
                <h1>{name}</h1>
                <div><img className="dogCardImage" alt="" src={profile_picture} /> </div>
                <button onClick={this.localDeleteHandler}>❌</button>
            </div>
        )
    }
}

export default MatchCard;