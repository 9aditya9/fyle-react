import React from 'react';
import { Link } from 'react-router-dom'
function Header() {
	return (
		<>
			<nav className="navbar navbar-expand-lg navbar-light bg-light" style={{ backgroundColor: 'aliceblue' }}>
				<div className="container-fluid" style={{ display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
					<Link to="/" style={{ color: 'rgb(157, 5, 212)' }} className="navbar-brand nav-title mb-2 mb-lg-0" >Home</Link>
					<div style={{color: 'rgb(157, 5, 212)', marginLeft: '20px', marginRight: '20px', fontSize: '25px'}}>FYLE TASK</div>
					<Link to="/favorites" style={{ color: 'rgb(157, 5, 212)' }} className="navbar-brand nav-title mb-2 mb-lg-0" >Favorites</Link>
				</div>
			</nav>
		</>
	);
}

export default Header;