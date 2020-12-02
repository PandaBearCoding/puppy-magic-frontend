import React from 'react';
import WelcomeCard from '../Components/WelcomeCard.js';
import { Route } from 'react-router-dom';
import { NavLink } from 'react-router-dom'; 



class WelcomeContainer extends React.Component {

    renderWelcomeDogs = () => {
        let lastThreeDogs = this.props.dogApi.slice(Math.max(this.props.dogApi.length -3, 0))
        return lastThreeDogs.map((el) => <WelcomeCard key={el.id} dog={el} />)
    }
    
    render(){
        return(
            <Route path="/puppymagic/welcome" render={() => {
                return(
                    <div>
                        <h1 className="welcomeH1">Welcome to Puppy Magic!</h1>
                            <NavLink to="/login">
                                <button className="welcomeButtons">LogIn</button>
                            </NavLink>
                            <NavLink to="/users/signup">
                                <button className="welcomeButtons">SignUp</button>
                            </NavLink>
                            <br></br><br></br><br></br><br></br><br></br><br></br><br></br><br></br><br></br><br></br>
                            <img className="welcomeImage" alt="" src={"https://scontent-lga3-1.xx.fbcdn.net/v/t1.0-9/38635108_434429280387102_6961077985977827328_n.jpg?_nc_cat=101&ccb=2&_nc_sid=09cbfe&_nc_ohc=5M-8VLbqwecAX9Zilnn&_nc_ht=scontent-lga3-1.xx&oh=c0ff82be91a9b842ba58588e6c62ae92&oe=5FEA5BEE"}/> 
                            <br></br><br></br><br></br><br></br>
                            <div>
                                <p className="welcomePs">Want to adopt a dog but don't know where to look?</p>
                                <br></br><br></br><br></br>
                                <p className="welcomePs">We're here to help! Puppy Magic will allow you to swipe through available dogs in your area based upon your personal preferences - like the ones below!</p>
                                <br></br><br></br><br></br>
                                <p className="welcomePs">When you find your dream companion, you will match with them to save their information and then contact their shelter to schedule a visit.</p>
                                <br></br><br></br><br></br>
                                <p className="welcomePs">Life's better with a dog... or two... or three!</p>
                            </div>
                        <br></br><br></br><br></br><br></br><br></br><br></br><br></br><br></br><br></br><br></br><br></br><br></br><br></br><br></br>
                        <div>
                            {this.props.dogApi.length > 0 ?
                            <div>
                                <div>{this.renderWelcomeDogs()}</div>
                            </div>
                            : 
                            <h1>Loading Dogs...</h1>
                            }
                        </div>
                    </div>
                )
            }}/>
        )
    }
}

export default WelcomeContainer;