import './NavBars.css'
const NavBars = () =>{
    return(
        <div className='mainContainer'>
            <div className="menu">
            <ul className='menuList'>
                <li ><a href="">MyLogoandSiteName</a></li>
                <li ><a href="">Home</a></li>
                <li ><a href="">MyLogoandSiteName</a></li>
                <li ><a href="">Book places</a></li>
                <li ><a href="">Contact</a></li>
                <ul className="listUser">
                <li className='signIn'><a href="">Sign In</a></li>
                <li><a href="">Sign Up</a></li>
            </ul>
            </ul>
            
             </div>
        </div>
    )
}
export default NavBars