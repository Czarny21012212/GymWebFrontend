import { useEffect, useState } from "react";
import './YourPass.css'
import logo from '../Image/Logo.png'
import download from '../Image/download.png'
import delete1 from '../Image/delete.png'
import close from '../Image/close.png'

const YourPass = () =>{

    const [yourPass, setYourPass] = useState([]);

    useEffect(() => {
        fetch("/api/show", {
            method: "GET",
            headers: {"ContentType" : "application/json"}
        })
        .then(response => response.json())
        .then(data => setYourPass(data))
    },[])

    let deleteId = 0;

    if(Array.isArray(yourPass) && yourPass.length > 0) {
        deleteId = yourPass[0].id;
        console.log(deleteId)
    }

    const deactivate = () => {
        fetch(`/api/delete/${deleteId}`, { 
            method: "POST",
            headers: { "Content-Type": "application/json" },
        })
        .then(response => response.json())
        .then(data => console.log(data))
    }

    const checkTypeOfPass = (type) =>{
        switch(type){
            case "Basic":
                return <p className="type-Basic">Basic</p>;
                break;
            case "Premium":
                return <p className="type-Premium">Basic</p>;
                break;
            case "Pro":
                return <p className="type-Pro">Basic</p>;
                break;
        }
    }

    useEffect(() => {
        localStorage.setItem('data', yourPass.length)
    })

    const[checkQr, setCheckQr] = useState(false)

    const QrZoom = () =>  {
        setCheckQr((prevCheckQr) => !prevCheckQr)

       if(checkQr){
             return showQr()
       }
    }

    const showQr = () => {
        return(
            <div className="qr-zoom">          
                <img className="qr"src="https://upload.wikimedia.org/wikipedia/commons/thumb/d/d0/QR_code_for_mobile_English_Wikipedia.svg/800px-QR_code_for_mobile_English_Wikipedia.svg.png"></img>
                <img className="close" onClick={QrZoom} src={close}></img>
            </div>
        )
    }

    return ( 
    
        <div className="pass-all">
             <QrZoom></QrZoom>
           {yourPass.map((pass, index) => (
                     <div className="pass-all-items" key={index}>
                        <div className="pass-top">
                            <div className="pass-t-img">
                                <img src={logo}></img>
                            </div>
                            <div className="pass-t-h2">
                                <h2>Your Pass</h2>
                            </div>
                        </div>

                        <div className="pass-center">
                            <div className="pass-c-left">
                                <div className="pass-box">
                                    <div className="pass-box-items">
                                        <div className="pass-b-section-1">
                                            <h2>Information about pass</h2>
                                            <p>20.12.2025</p>
                                        </div>

                                        <div className="Effect-Line"></div>

                                        <div className="pass-b-section-2">
                                            <div className="div1">
                                                <p>Type of pass: </p>
                                                {pass.typeOfPass}
                                            </div>
                                            <div className="div2">
                                                <p>Numbers of days: </p>
                                                <p>{pass.numberOfDay}</p>
                                            </div>
                                        </div>

                                        <div className="Effect-Line"></div>

                                        <div className="pass-b-section-3">
                                            <div>
                                                <p>Our gym is located at:</p>
                                                <p>WELL FITNESS</p>
                                                <p>123 King’s Road, London, SW1A 1AA, United Kingdom</p>
                                            </div>
                                            <img src={logo}></img>

                                        </div>

                                        <div className="Effect-Line"></div>

                                        <div className="pass-b-section-4">
                                            <div>
                                                <p>If you purchase a pass at our gym, you acknowledge and accept responsibility for any consequences resulting from improper conduct while using the facilities.</p>
                                            </div>


                                        </div>

                                        <div className="Effect-Line"></div>

                                        <div className="pass-b-section-5">
                                            <div className="s5-left">
                                                <img onClick={QrZoom} src="https://upload.wikimedia.org/wikipedia/commons/thumb/d/d0/QR_code_for_mobile_English_Wikipedia.svg/800px-QR_code_for_mobile_English_Wikipedia.svg.png"></img>
                                            </div>
                                            <div className="s5-right">
                                                    <p className="s5-main-p">Price:</p>
                                                <div>
                                                    <p>BRUTTO:</p>
                                                    <p className="s5-price">{(pass.price * 0.08 + pass.price + "zł" )}</p>
                                                </div>
                                                <div>
                                                    <p>VAT PL 8%:</p>
                                                    <p className="s5-price">{pass.price * 0.08}zł</p>
                                                </div>

                                                <div>
                                                    <p>NETTO PL:</p>
                                                    <p className="s5-price">{pass.price}zł</p>
                                                </div>
                                            </div>



                                        </div>
                                    </div>
                                </div>
                            </div>
                            <div className="pass-c-right">


                            <div className="pass-box">
                                    <div className="pass-box-items">
                                        <div className="pass-b-section-1">
                                            <h2>Information about you</h2>
                                            <p>20.12.2025</p>
                                        </div>

                                        <div className="Effect-Line"></div>

                                        <div className="r-pass-b-section-2">
                                           <div className="sc2-left">
                                                <div>
                                                    <p>First Name: </p>
                                                    <p className="special">{pass.firstName}</p>
                                                </div>
                                                <div className="div">
                                                    <p>Last Name: </p>
                                                    <p className="special">{pass.lastName}</p>
                                                </div>
                                                <div className="div">
                                                    <p>Age: </p>
                                                    <p className="special">{pass.age}</p>
                                                </div>
                                                <div className="div">
                                                    <p>Pesel: </p>
                                                    <p className="special">{pass.pesel}</p>
                                                </div>
                                                <div className="div">
                                                    <p>Gender: </p>
                                                    <p className="special">{pass.gender}</p>
                                                </div>
                                           </div>

                                           <div className="sc2-right">
                                                <div>
                                                    <img src={pass.profileImg}></img>
                                                </div>

                                           </div>

                                        </div>

                                        <div className="Effect-Line"></div>

                                        <div className="r-pass-b-section-3">
                                            <div>
                                                <p>Contact</p>
                                            </div>
                                            <div className="div">
                                                <p>Phone: </p>
                                                <p>{pass.phone}</p>
                                            </div>
                                            <div className="div">
                                                <p>Email: </p>
                                                <p>{pass.email}</p>
                                            </div>
                                        </div>

                                        <div className="Effect-Line"></div>

                                        <div className="pass-b-section-4">
                                            <div>
                                                <p>This data is exclusive to us. If you have any concerns about your data privacy, please refrain from purchasing this pass.</p>
                                            </div>


                                        </div>

                                        <div className="Effect-Line"></div>

                                        <div className="pass-b-section-5">

                                            <div>
                                                <p>If you will do in our gym think whihe you dot'n should to do your pass will be cancel for ever</p>
                                            </div>  


                                        </div>
                                    </div>
                                </div>


                            </div>
                        </div>

                        <div className="pass-bottom">
                            
                            <div className="Download">
                                <img src={download}></img>

                                <input
                                type="submit"
                                value="Download"
                                ></input>
                            </div>


                            <div className="Deactivate">
                                <img src={delete1}></img>

                                <input
                                type="submit"
                                value="Deactivate"
                                onClick={() => deactivate()}
                                ></input>
                            </div>
                            
                        </div>
                    </div>
            ))}  
        </div>
     );
}
 
export default YourPass;