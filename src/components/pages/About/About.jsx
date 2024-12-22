import NavBars from '../../layouts/NavBars/NavBars';
import Search from '../../layouts/Search/Search';
import './About.css'

const About = () => {
  
  return (

    <div className="div-container">

      <NavBars />
      <div className="main-info">
        <h3 className='phrase'>Feel at home, wherever you go </h3>
        <p className='text'>Here, you can discover the perfect place that suits your style and needs—where comfort meets convenience.</p>
        <div className="availability-container">
          <h2 className='check-availability-text'>Check Availability</h2>
          <Search/>
        </div>
      </div>
    </div>
  )
}
export default About