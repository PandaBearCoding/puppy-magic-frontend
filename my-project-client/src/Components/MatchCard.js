import React from 'react';

class MatchCard extends React.Component{
    // state = {
    //     showImage1: true
    // }

    // photoClickHandler = (e) => {
    //     this.setState((prevState) => {
    //         return {
    //             showImage1: !prevState.showImage1
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
                <h1>{name}</h1>
                <img className= "dogCardImage" alt="" src={
                            profile_picture != null
                            ?
                            profile_picture
                            : 
                            "https://i.pinimg.com/originals/6f/1e/8b/6f1e8b15a860d0083116f8bd9e2778d6.png"
                            }
                />
                <button onClick={this.localDeleteHandler}>❌</button>
            </div>
        )
    }
}

export default MatchCard;