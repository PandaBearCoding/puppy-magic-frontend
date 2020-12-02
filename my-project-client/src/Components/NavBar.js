import React from 'react';
import {MenuItems} from './MenuItems';
import {NavLink} from 'react-router-dom';

class NavBar extends React.Component{

    render(){
        return(
            <nav>
                <div className="puppyMagicIcon">
                    <div className="navBarContainer">
                        <div className="navItems">
                            <ul>
                                {/* <NavLink to={{pathname: "/puppymagic"}}>
                                    Home
                                </NavLink>
                                <NavLink to="/users/65">
                                    Profile
                                </NavLink>
                                <NavLink to="//puppymagic/welcome">
                                    Sign Out
                                </NavLink> */}
                                {MenuItems.map((item, index) => {
                                    return (
                                        <li className= "navBarLis" key={index}>
                                            <a className={item.cName} href={item.url}>
                                                {item.title}
                                            </a>
                                        </li>
                                    )
                                })}
                            </ul>
                        </div>
                    </div>
                </div>
            </nav>
        )
    }
}

export default NavBar;