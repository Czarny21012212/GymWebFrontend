import YourPass from './ShowYourPass/YourPass.js'
import BuyPass from './BuyPass/BuyPass.js'
import Logo from './Image/Logo.png'
import Gym from './Image/gymEmoij.png'
import section_1_Gym from './Image/section1-gym.webp'
import section_1_Gym_2 from './Image/section1-gym-2.webp'
import kfd from './Image/company/kfd.png'
import believe from './Image/company/Believe.webp'
import nutritional from './Image/company/nutritional.jpg'
import pharmacy from './Image/company/pharmacy.jpg'
import plug from './Image/company/plug.jpg'
import protein from './Image/company/protein.jpg'
import supplement from './Image/company/supplement.jpg'
import './Home.css'
import { useEffect, useState } from 'react'

const Home = () => {

    const[data, setData] = useState([])
    
    useEffect(() => {
            fetch("/api/show", {
                method: "GET",
                headers: {"ContentType" : "application/json"}
            })
            .then(response => response.json())
            .then(data => setData(data))
        },[])
    
        useEffect(() => {
            localStorage.setItem('data', data.length)
        }, [])



    return ( 
        <div className='all'>
            <div className='all-items'>
                <div className='navbar'>
                    <div className='navbar-items'>
                            <div className='navbar-left'>
                                <img src={Logo}></img>
                                <ul>
                                    <li>Home</li>
                                    <li>Information</li>
                                    <li>Opening hours</li>
                                    <li>Contact</li>
                                </ul>
                            </div>  
                        <div className='navbar-right'>
                            <div>
                                <img src={Gym}></img>
                                <input
                                type='submit'
                                value="Buy Pass"
                                ></input>
                            </div>
                        </div>
                    </div>
                </div>
                <div className='section-1'>
                    <div className='setcion-1-items'>
                        <div className='section-1-left'>
                            <h1>Unleash Your <span>Power</span></h1>
                            <p>Welcome to the ultimate training ground where strength meets determination. Whether you're here to lift, run, or transform, our gym is built to push your limits and elevate your fitness journey. Let's get stronger together!</p>
                            <input value="Read More" type='submit'></input>
                        </div>

                        <div className='section-1-right'>
                            <img src={section_1_Gym} className='photo1'></img>
                            <img src={section_1_Gym_2} className='photo2'></img>
                        </div>
                        
                    </div>
                </div>
                <div className='section-2'>
                   <div className='section-2-items'>
                        <h2>We <span>Cooperate</span> With</h2>
                        <div className='section-2-logoOfCompany'>
                        <div className="logo-track">
                            <img src={kfd}></img>
                            <img src={believe}></img>
                            <img src={nutritional}></img>
                            <img src={pharmacy}></img>
                            <img src={plug}></img>
                            <img src={protein}></img>
                            <img src={supplement}></img>
                            </div>
                        </div>
                   </div>
                </div>
                <div className='section-3'>
                    <div className='section-3-items'>
                        {data.length != 0 ? <YourPass></YourPass> : <BuyPass></BuyPass>}
                    </div>
                </div>
            </div>
        </div> 
    );
}
 
export default Home;