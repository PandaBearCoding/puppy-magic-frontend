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
        let { name, profile_picture, profile_picture_two } = this.props.match
       
        return(
            <div className="matchCard" >
                <h1>{name}</h1>
                {/* <img className="dogCardImage" onClick={this.photoClickHandler} alt="" src={
                            this.state.showImage1
                            ?
                            profile_picture
                            : 
                            profile_picture_two
                            }
                        /> */}
                <img className="dogCardImage" alt="" src={profile_picture}/>
                <button onClick={this.localDeleteHandler}>❌</button>
            </div>
        )
    }
}

export default MatchCard;