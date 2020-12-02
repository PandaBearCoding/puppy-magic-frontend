import React from 'react'
import {MenuItems} from './MenuItems'

class NavBar extends React.Component{

    render(){
        return(
            <nav>
                <div className="puppyMagicIcon">
                    <div className="navBarContainer">
                        <div className="navItems">
                            <ul>
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