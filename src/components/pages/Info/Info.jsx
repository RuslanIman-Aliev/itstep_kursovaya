import './Info.css'
import imageContainer from '../../../img/MainImages/mainlocation.jpg'
import { CiForkAndKnife } from "react-icons/ci";
import { MdOutlineTimer } from "react-icons/md";
import { IoShieldCheckmark } from "react-icons/io5";
import { AiFillThunderbolt } from "react-icons/ai";
import { BsSun } from "react-icons/bs";

const Info = () => {
return(
<div className="mainItem">
    <div className="container-double">
        <div className="part1">
            <img src={imageContainer} alt="" className='image-info' />
            <i ><BsSun className='sun'/></i> 
        </div>
        <div className="part2">
        <h2>The Best Holidays Start <br /> Here!</h2>
        <p className="greytext">Discover your perfect stay with us! Whether you're looking for hotels, apartments, or other accommodations, we have the best deals to suit your style and budget.</p>
        <div className="container-groups">
            <div className="group">
                <button className='icon1-btn'><i className='icon1'><CiForkAndKnife /></i></button>
                <p className="header-groups">Quality Food </p>
                <p className="header-texts">Departure defective arranging <br /> rapturous did. Conduct denied <br /> adding worthy little.</p>
            </div>
            <div className="group">
                <button className='icon2-btn'><i className='icon2'><MdOutlineTimer /></i></button>
                <p className="header-groups">Quick Services</p>
                <p className="header-texts">Supposing so be resolving breakfast <br /> am or perfectly.</p>
            </div>
            <div className="group">
                <button className='icon3-btn'><i className='icon3'><IoShieldCheckmark /></i></button>
                <p className="header-groups">High Security</p>
                <p className="header-texts">Arranging rapturous did believe him <br /> all had supported.</p>
            </div>
            <div className="group">
                <button className='icon4-btn'><i className='icon4'><AiFillThunderbolt /></i></button>
                <p className="header-groups">24 Hours Alert</p>
                <p className="header-texts">Rapturous did believe him all had <br /> supported.</p>
            </div>
        </div>
        </div>
    </div>
</div>
)
}
export default Info