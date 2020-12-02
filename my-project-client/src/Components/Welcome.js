import React from 'react';
import { NavLink } from 'react-router-dom'; 

class Welcome extends React.Component {
    render(){
        console.log("Render dogs for welcome: ", this.props.dog)
        return(
            <div className="welcomeCard">
                <div>
                    <h1 className="welcomeH1">Welcome to Puppy Magic!</h1>
                    <NavLink to="/login">
                        <button className="welcomeButtons">LogIn</button>
                    </NavLink>
                    <NavLink to="/users/signup">
                        <button className="welcomeButtons">SignUp</button>
                    </NavLink>
                    <br></br>
                    <br></br>
                    <br></br>
                    <br></br>
                    <br></br>
                    <p className="welcomePs">Want to adopt a dog but don't know where to look?</p>
                    <br></br>
                    <p className="welcomePs">We're here to help! Puppy Magic will allow you to swipe through available dogs in your area based upon your personal preferences - like the ones below!</p>
                    <br></br>
                    <p className="welcomePs">When you find your dream companion, you will match with them to save their information and then contact their shelter to schedule a visit.</p>
                    <br></br>
                    <p className="welcomePs">Life's better with a dog... or two... or three!</p>
                </div>

                <div className="matchDog" >
                    <h1 className="dogAndMatchCardName">{this.props.dog.name}</h1>
                    <img className= "dogAndMatchCardImage" alt="" src={
                        this.props.dog.profile_picture != null
                        ?
                        this.props.dog.profile_picture
                        : 
                        "https://i.pinimg.com/originals/6f/1e/8b/6f1e8b15a860d0083116f8bd9e2778d6.png"
                        }
                    />
                </div>
            </div>
        )
    }
}


export default Welcome;



//     <div id="carouselExampleCaptions" class="carousel slide" data-ride="carousel">
//         <ol class="carousel-indicators">
//             <li data-target="#carouselExampleCaptions" data-slide-to="0" class="active"></li>
//             <li data-target="#carouselExampleCaptions" data-slide-to="1"></li>
//             <li data-target="#carouselExampleCaptions" data-slide-to="2"></li>
//         </ol>
//     </div>

//     <div class="carousel-inner w-80 h-80 mb-5">
//         {}
//   <% Club.all.sample(1).each do |club| %>
//     <div class="carousel-item active" data-interval= "100 ">
//       <img src=<%= club.club_image%> class="d-block w-100 h-100" alt="...">
//       <div class="carousel-caption d-none d-md-block">
//         <h1 class="display-4">If you like <%= club.genre %>, join <%= club.name %></h1>
//       </div>
//     </div>
//     <% end%>
   
//   <% Club.all.sample(2).each do |club| %>
//     <div class="carousel-item " >
//       <img src=<%= club.club_image%> class="d-block w-100" alt="...">
//       <div class="carousel-caption d-none d-md-block">
//         <h1 class="display-4">If you like <%= club.genre %>, join <%= club.name %></h1>
//       </div>
//     </div>
//     <% end%>
//    </div>
//    <a class="left carousel-control" href="#carousel-example-generic" data-slide="prev">
//     <span class="glyphicon glyphicon-chevron-left"></span>
//   </a>
//   <a class="right carousel-control" href="#carousel-example-generic" data-slide="next">
//     <span class="glyphicon glyphicon-chevron-right"></span>
//   </a>
// </div>