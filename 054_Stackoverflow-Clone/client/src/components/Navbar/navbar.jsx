import React,{useEffect} from "react"
import {Link} from 'react-router-dom'
import logo from '../../assets/logo.png'
import search from '../../assets/search.svg'
import Avatar from '../Avatar/Avatar'
import './Navbar.css'
import {useSelector,useDispatch} from 'react-redux'
import { setCurrentUser } from "../../actions/currentuser"


const Navbar = () => {
    const dispatch =useDispatch()
    var User = useSelector((state)=>(state.currentUserReducer))

    useEffect(()=>{
        dispatch(setCurrentUser(JSON.parse(localStorage.getItem('Profile'))))
    },[dispatch])

    return(
        <nav className="main-nav">
            <div className='navbar' >
                <Link to='/' className="nav-logo">
                    <img src={logo} alt="logo" />
                </Link>
                <Link to='/' className='nav-item nav-btn'>About</Link>
                <Link to='/' className='nav-item nav-btn'>Products</Link>
                <Link to='/' className='nav-item nav-btn'>For Teams</Link>
                <form>
                    <input type="text" placeholder="Search"></input>
                    <img src={search} alt="search" className="icon" width="16"/>
                </form>
                { User === null ?
                    <Link to='/Auth' className='nav-item nav-links'>Log in</Link> :
                    <>
                        <Link to="/User"><Avatar>{User.result.name.charAt(0).toUpperCase()}</Avatar></Link>
                        <button className="nav-item nav-links">Log Out</button>

                    </>
                }
            </div>
        </nav>
        

    )
}

export default Navbar