import React from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { Link } from 'react-router-dom'
import { logout } from '../../../reducers/userReducer'
import MyButton from '../MyButton/MyButton'
import сlasses from './Navbar.module.css'

const Navbar = () => {
	const isAuth = useSelector(state => state.user.isAuth)
	const dispatch = useDispatch()
	return (
		<div className={сlasses.navbar}>
			<div className={сlasses.navbar__logo}></div>
			{isAuth
				?
				<div className={сlasses.navbar__links}>
					<div className={сlasses.navbar__link} onClick={() => dispatch(logout())}>Logout</ div >
				</div>
				:
				<div className={сlasses.navbar__links}>
					<Link to="/login" className={сlasses.navbar__link}>Login</ Link>
					<Link to="/registration" className={сlasses.navbar__link}>Registration</Link >
				</div>
			}


		</div>
	)
}

export default Navbar