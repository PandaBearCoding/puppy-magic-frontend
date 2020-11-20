import React from 'react'
import {MenuItems} from './MenuItems'

class NavBar extends React.Component{

    render(){
        return(
            <nav className="navbaritems">
                <div className="menuIcons"></div>
                <h1 className="puppyMagic">Puppy Magic</h1>
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
            </nav>
        )
    }
}

export default NavBar;