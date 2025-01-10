import ObjectList from '../FindObjects/ObjectList';
import './UserActions.css'
import { IoHome } from "react-icons/io5";

const UserActions =()=>{
    return(
        <div className="container-action">
            <h2 className="bookings-action">My bookings</h2>
            <div className="bookings-card-action">
                <div className="main-info-action">
                    <div className="part1-action">
                        <button className='icon-button-action'><IoHome className='icon-action' />
                        </button>
                        <div className="name-action">Booking name</div>
                    </div>
                    <div className="part2-action">
                        <div className="button-action">View Object</div>
                    </div>
                    
                </div>
                <div className="footer-action">
                    <div className="block-action">
                        <div className="info-action">
                        Date In
                        </div>
                        <div className="value-action">Jan 06 2025</div>
                    </div>
                    <div className="block-action">
                        <div className="info-action">
                        Date out
                        </div>
                        <div className="value-action">Jan 16 2025</div>
                    </div>
                    <div className="block-action">
                        <div className="info-action">
                        Price
                        </div>
                        <div className="value-action">360$</div>
                    </div>
                </div>
            </div>
            <div className="user-listings">
            {/* <ObjectList objects={objects} /> */}
            
            </div>
        </div>
    )
}
export default UserActions