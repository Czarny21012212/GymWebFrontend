import { useEffect, useRef, useState } from "react";
import logo from '../Image/Logo.png'
import close from '../Image/close-black.png'
import './BuyPass.css'
import { da } from "date-fns/locale";

const BuyPass = () => {

   // useRef to get the data
   const dataPassRef = useRef({
    firstName: "",
    lastName: "",
    age: "",
    pesel: "",
    gender: "men",
    profileImg: "",
    email: "",
    phone: "",
    typeOfPass: "",
    price: "",
    numberOfDay: ""
   })


   // Define type of pass
   // I HAVE TO IMPROVE THIS(SHIT)
    const showMenuTrueF = (typeOfPass) => {
        setShowMenuTrue((prevShowMenutrue) => !prevShowMenutrue)
        setTypeOfPass(typeOfPass);
        dataPassRef.current.typeOfPass = typeOfPass
        setSaveData1(true)
        setSaveData2(false)
        setSaveData3(false)
        dataPassRef.current.numberOfDay = 0;
        dataPassRef.current.price = 0;
        setPrice(0)
   }
    
   // Fetch
   const submitData = () => {
    console.log(dataPassRef.current)
    fetch("/api/activatePass", {
        method: "POST",
        headers: {"Content-Type" : "application/json"},
        body: JSON.stringify(dataPassRef.current)
        
    })
        .then(response => {
            console.log(response);
            return response.json();
        })
        .then(data => console.log(data))
        .catch((error) => console.error("Error:", error));
   
   }

   const[saveData1, setSaveData1] = useState(true)
   const[saveData2, setSaveData2] = useState(false)
   const[saveData3, setSaveData3] = useState(false)
   const[saveData4, setSaveData4] = useState(false)
   const[showMenutrue, setShowMenuTrue] = useState(false)
   const[typeOfPass, setTypeOfPass] = useState(null)

   //useState to save the error message(validation)
   const[messageError, setMessageError] = useState({
    firstName: "",
    lastName: "",
    age: "",
    pesel: "",
    email: "",
    phone: "",
    numberOfDay: "",
    profileImg: "",
    cardNumber: "",
    cvv:""
   })

   //useRef to save the correct of logins(validation)
   const correctData = useRef({
    correctData_1: false,
    correctData_2: false,
    correctData_3: false,
    correctData_4: false
   })

   const [triggerSubmit, setTriggerSubmit] = useState(false);
   const [triggerSubmit2, setTriggerSubmit2] = useState(false);
   const [triggerSubmit3, setTriggerSubmit3] = useState(false);
   const [triggerSubmit4, setTriggerSubmit4] = useState(false);

   useEffect(() => {
    if (correctData.current.correctData_1 && triggerSubmit) {
        setSaveData1(false)
        setSaveData2(true)
        setTriggerSubmit(false); 
    }
    }, [correctData.current.correctData_1, triggerSubmit]);

    useEffect(() =>{
        if(correctData.current.correctData_2 && triggerSubmit2){
            setSaveData2(false)
            setSaveData3(true)
            setTriggerSubmit2(false);
        }
    },[correctData.current.correctData_2, triggerSubmit2])

    useEffect(() =>{
        if(correctData.current.correctData_3 && triggerSubmit3){
            setSaveData3(false)
            setSaveData4(true)
            setTriggerSubmit3(false);
            
        }
    },[correctData.current.correctData_3, triggerSubmit3])

    useEffect(() =>{
        if(correctData.current.correctData_4 && triggerSubmit4){
            setSaveData4(false)
            setTriggerSubmit4(false);
            setShowMenuTrue((prevShowMenutrue) => !prevShowMenutrue)
            submitData();
        }
    },[correctData.current.correctData_4, triggerSubmit4])

   const checkdata_1 = () => {

        //take the value of the data
        const data = {
            firstName:  dataPassRef.current.firstName,
            lastName: dataPassRef.current.lastName,
            age: dataPassRef.current.age,
            pesel: dataPassRef.current.pesel
        }

        //case to check the word to send to dataBase(Validation) 
        switch(true){
            case data.firstName.length === 0:
                updateFirstNameError("First name is required");
                correctData.current.correctData_1 = false;
                break;
            case data.firstName.length > 20:
                updateFirstNameError("Your name is too long");
                correctData.current.correctData_1 = false;
                break;
            case data.firstName.length < 2:
                updateFirstNameError("Your name is too short");
                correctData.current.correctData_1 = false;
                break;
            case parseInt(data.firstName) == Number(data.firstName):
                updateFirstNameError("Your name has a number");
                correctData.current.correctData_1 = false;
                break;
            case data.lastName.length === 0:
                updateLastNameError("Last name is required");
                correctData.current.correctData_1 = false;
                break;
            case data.lastName.length > 30:
                updateLastNameError("Your last name is too long");
                correctData.current.correctData_1 = false;
                break;
            case data.lastName.length < 2:
                updateLastNameError("Your last name is too short");
                correctData.current.correctData_1 = false;
                break;
            case data.age.length === 0:
                updateAgeError("Age is required");
                correctData.current.correctData_1 = false;
                break;
            case !Number.isInteger(Number(data.age)) || Number(data.age) <= 0 || Number(data.age) > 120:
                updateAgeError("Invalid age");
                correctData.current.correctData_1 = false;
                break;
            case data.pesel.length === 0:
                updatePeselError("PESEL is required");
                correctData.current.correctData_1 = false;
                break;
            default:
                updateFirstNameError("");
                updateLastNameError("");
                updateAgeError("");
                updatePeselError("");
                correctData.current.correctData_1 = true;
                break;
        }
        //function to rename the Error-Message login 1
        function updateFirstNameError(value){ 
            setMessageError((prev) => ({...prev, firstName: value}))
        }

        function updateLastNameError(value){ 
            setMessageError((prev) => ({...prev, lastName: value}))
        }

        function updateAgeError(value){ 
            setMessageError((prev) => ({...prev, age: value}))
        }

        function updatePeselError(value){ 
            setMessageError((prev) => ({...prev, pesel: value}))
        }
    }

    //function to check the data from login 2
    const checkdata_2 = () => {
        //take the data from the user
        const data = {
            email: dataPassRef.current.email,
            phone: dataPassRef.current.phone
        }

        //case to check the word to send to dataBase(Validation)
        switch(true){
            case data.email.length === 0:
                updateEmailError("Email is required");
                correctData.current.correctData_2 = false;
                break;
            case !data.email.includes("@") || !data.email.includes("."):
                updateEmailError("Invalid email");
                correctData.current.correctData_2 = false;
                break;
            case data.phone.length === 0:
                updatePhoneError("Phone is required");
                correctData.current.correctData_2 = false;
                break;
            case !Number.isInteger(Number(data.phone)) || data.phone.length != 9:
                updatePhoneError("Invalid phone number");
                correctData.current.correctData_2 = false;
                break;
            default:
                console.log("Data is valid");
                updateEmailError("");
                updatePhoneError("");
                correctData.current.correctData_2 = true;
                break;    
        }

        //function to rename the Error-Message login 2
        function updateEmailError(value){
            setMessageError((prev) => ({...prev, email: value}))
        }
        function updatePhoneError(value){
            setMessageError((prev) => ({...prev, phone: value}))
        }
    }

    const checkdata_3 = () => {
        const data = {
            numberOfDay: dataPassRef.current.numberOfDay,
            profileImg: dataPassRef.current.profileImg
        }

        switch(true){
            case data.numberOfDay.length === 0:
                updateNumberOfDayError("Number of days is required");
                correctData.current.correctData_3 = false;
                break;
            case !Number.isInteger(Number(data.numberOfDay)) || Number(data.numberOfDay) <= 0:
                updateNumberOfDayError("Invalid number of days");
                correctData.current.correctData_3 = false;
                break;
            case data.profileImg.length === 0:
                updateProfileImgError("Profile image is required");
                correctData.current.correctData_3 = false;
                break;
            default:
                updateNumberOfDayError("");
                updateProfileImgError("");
                correctData.current.correctData_3 = true;
                break;    
        }

        function updateNumberOfDayError(value){
            setMessageError((prev) => ({...prev, numberOfDay: value}))
        }
        function updateProfileImgError(value){
            setMessageError((prev) => ({...prev, profileImg: value}))
        }

    }

    const checkdata_4 = () => {
        const data = {
            CardNumber: dataPayMetod.current.CardNumber,
            CVV: dataPayMetod.current.CVV
        }

        switch (true) {
            case !/^\d{13,19}$/.test(data.CardNumber):
                updateCardNumberError("Invalid card number. It should contain 13-19 digits.");
                correctData.current.correctData_4 = false
                break;
            case !/^\d{3,4}$/.test(data.CVV):
                updateCvvError("Invalid CVV. It should be 3 or 4 digits.");
                correctData.current.correctData_4 = false
                break;
            default:
                correctData.current.correctData_4 = true
                updateCardNumberError("")
                setMessageError("")

        }

        function updateCardNumberError(value){
            setMessageError((prev) => ({...prev, cardNumber: value}))
        }
        function updateCvvError(value){
            setMessageError((prev) => ({...prev, cvv: value}))
        }
    }

    //this functions is to save the data to the object(dataPassRef) and next to database
    const SaveTheData_1 = () => {
        checkdata_1()
        setTriggerSubmit(true);
    };  
    const SaveTheData_2 = () => {
        checkdata_2()
        setTriggerSubmit2(true);
    };
    const SaveTheData_3 = () => {
        checkdata_3()
        setTriggerSubmit3(true);
    }
    const SaveTheData_4 = () => {
        checkdata_4()
        setTriggerSubmit4(true);
    }

    const[price, setPrice ] = useState(0);

   const calculatePrice = () => {
        const price = {
            basic: 19.99,
            Standard: 39.99,
            Premium: 59.99
        }
        dataPassRef.current.price = price[typeOfPass] / 30 * dataPassRef.current.numberOfDay;

        setPrice(dataPassRef.current.price.toFixed(2))

   }

    // functions to save the data from user login 1
    const handledataChange = (e) => {

        //check if the name is age or pesel
        if([e.target.name] == "age" || [e.target.name] == "pesel" || [e.target.name] == "numberOfDay"){
            //parseInt to change the string to number
            dataPassRef.current[e.target.name] = parseInt((e.target.value))
            //if the name is numberOfDay calculate the price(optimalization)
           if([e.target.name] == "numberOfDay") calculatePrice();
        }else{
            //if the name is not age or pesel save as string
            dataPassRef.current[e.target.name] = (e.target.value)
        } 
    } 

    const dataPayMetod = useRef({
        CardNumber: "",
        ExpiryDate: "",
        CVV: "",
    })

    const handlePayMetod = (e) => {
        if(e.target.name === "CardNumber" || e.target.name === "CVV"){
            dataPayMetod.current[e.target.name] = parseInt(e.target.value)
        }else{
            dataPayMetod.current[e.target.name] = e.target.value
        }
    }

   const ShowMenu = () =>{

        return(
            <div className="menu-all">
                <div className="menu-Logo">
                    <img src={logo}></img>
                </div>
                <div className="menu-Close">
                    <img src={close} onClick={showMenuTrueF}></img>
                </div>
                <div className="menu-typeOfPass">
                    <p>{typeOfPass}</p>
                </div>
                <div className="menu-map">
                    <div className="menu-section">
                        <div className="menu-line-on"></div>
                        <p>Personal data</p>
                    </div>
                    <div className="menu-section">
                        <div className="menu-line-off"></div>
                        <p>Contact data</p>
                    </div>
                    <div className="menu-section">
                        <div className="menu-line-off"></div>
                        <p>Pass data</p>
                    </div>
                    <div className="menu-section">
                        <div className="menu-line-off"></div>
                        <p>Pay</p>
                    </div>
                </div>

                {saveData1 && 
                <div className="menu-section-1">
                    <h1>Write your personal data</h1>
                    
                        <div className="input-box">
                            <p>{messageError.firstName}</p>
                            <input placeholder="First Name" defaultValue={dataPassRef.current.firstName} name="firstName" onChange={handledataChange} type="text" className={messageError.firstName ? "input-error" : "input"}></input>

                        </div>
                        <div className="input-box">
                            <p>{messageError.lastName}</p>
                            <input placeholder="Last Name" defaultValue={dataPassRef.current.lastName} name="lastName" onChange={handledataChange}  type="text" className={messageError.lastName ? "input-error" : "input" }></input></div>
                        <div className="input-box">
                            <p>{messageError.age}</p>
                            <input placeholder="Age" defaultValue={dataPassRef.current.age} name="age" onChange={handledataChange} type="text" className={messageError.age ? "input-error" : "input" }></input></div>
                        <div className="input-box">
                            <p>{messageError.pesel}</p>
                            <input placeholder="Pesel" defaultValue={dataPassRef.current.pesel} name="pesel" onChange={handledataChange} type="text" className={messageError.pesel ? "input-error" : "input" }></input></div>
                        <div>
                        <div className="input-box">
                            <select name="Gender" onChange={handledataChange}>
                                <option>Men</option>
                                <option>Women</option>
                            </select>
                        </div>
                        </div>
                        <div className="checkbox-box">
                            <input type="checkbox" value="agree"></input>
                            <label>I agree to allow WELL FITNESS to process and view my data.</label>
                        </div>

                        <div className="menu-button">
                           <button className="submit" onClick={(e) => {e.preventDefault(); SaveTheData_1();}}>Next</button>
                        </div>
                    
                </div> }

                {saveData2 && 
                <div>
                    <div className="menu-section-2">
                        <h1>Write your contact data</h1>
                        
                            <div className="input-box">
                                <p>{messageError.email}</p>
                                <input placeholder="Email" name="email" onChange={handledataChange}  defaultValue={dataPassRef.current.email} type="text" className={messageError.email ? "input-error" : "input" }></input>
                            </div>
                            <div className="input-box">
                                <p>{messageError.phone}</p>
                                <input placeholder="Phone" name="phone" onChange={handledataChange} defaultValue={dataPassRef.current.phone} type="text" className={messageError.phone ? "input-error" : "input" }></input></div>
                            <div className="menu-button">
                                <button className="submit" onClick={(e) => {e.preventDefault(); SaveTheData_2(); }} >Next</button>
                            </div>
                    </div>
                </div>
                }
                {saveData3 && !saveData4 &&
                    <div>
                    <div className="menu-section-2">
                        <h1>Write your pass information</h1>
                        <div className="input-box">
                            <h1>{price} $</h1>
                        </div>                        
                            <div className="input-box">
                                <p>{messageError.numberOfDay}</p>
                                <input placeholder="length of the pass (in days)"  defaultValue={dataPassRef.current.numberOfDay} name="numberOfDay" onChange={handledataChange} type="text" className={messageError.numberOfDay ? "input-error" : "input" }></input>
                            </div>
                            <div className="input-box">
                                <p>{messageError.profileImg}</p>
                                <input placeholder="Profil Img" name="profileImg" defaultValue={dataPassRef.current.profileImg} onChange={handledataChange} type="text" className={messageError.profileImg ? "input-error" : "input" }></input></div>
                            <div className="menu-button">
                                <button className="submit" onClick={(e) => {e.preventDefault(); SaveTheData_3(); }} >Next</button>
                            </div>
                    </div>
                </div>
                }
                {saveData4 && (
                    <div>
                        <div className="menu-section-2">
                        <h1>Payment Details</h1>
                        <div className="input-box">
                            <h1>{price} $</h1>
                        </div>

                        <div className="input-box">
                            <p>{messageError.cardNumber}</p>
                            <input
                            placeholder="Card Number"
                            name="CardNumber"
                            type="text"
                            defaultValue={dataPayMetod.current.CardNumber}
                            onChange={handlePayMetod}
                            className={messageError.cardNumber ? "input-error" : "input"}
                            />
                        </div>

                        <div className="input-box">
                            <p>{messageError.expiryDate}</p>
                            <input
                            placeholder="Expiry Date (MM/YY)"
                            name="expiryDate"
                            type="text"
                            onChange={handlePayMetod}
                            className={messageError.expiryDate ? "input-error" : "input"}
                            />
                        </div>

                        <div className="input-box">
                            <p>{messageError.cvv}</p>
                            <input
                            placeholder="CVV"
                            name="CVV"
                            type="text"
                            onChange={handlePayMetod}
                            defaultValue={dataPayMetod.current.CVV}
                            className={messageError.cvv ? "input-error" : "input"}
                            />
                        </div>

                        <div className="menu-button">
                            <button className="submit" onClick={SaveTheData_4}>
                            Pay Now
                            </button>
                        </div>
                        </div>
                    </div>
                )}
            </div>
        );
   }

    return ( 
       <div className="buyPass-all">
        {showMenutrue && <ShowMenu/>}
            <div className="buyPass-items">
                <div className="div-h1">
                    <h2><span>Flexible</span> Gym Membership Plans</h2>
                    
                </div>
                <div className="buy-boxs">
                    {/* Plan podstawowy */}
                    <div className="Buy-box">
                        <h2>Basic Membership</h2>
                        <p className="price">$19.99<span>/month</span></p>
                        <ul>
                            <li>Access to gym during off-peak hours</li>
                            <li>Basic equipment</li>
                            <li>Locker room access</li>
                            <li>Free water refill</li>
                            
                        </ul>
                        <div className="button-div">
                            <button className="buy-btn" onClick={() => showMenuTrueF("basic")} >GET STARTED</button>
                        </div>
                    </div>

                    {/* Plan średni */}
                    <div className="Buy-box">
                        <h2>Standard Membership</h2>
                        <p className="price">$39.99<span>/month</span></p>
                        <ul>
                            <li>Access to gym during peak hours</li>
                            <li>Full equipment access</li>
                            <li>Group classes (yoga, cycling, etc.)</li>
                            <li>Personal training discounts</li>
                            <li>Free fitness assessment</li>
                        </ul>
                        <div className="button-div">
                            <button className="buy-btn"  onClick={() => showMenuTrueF("Standard")}>GET STARTED</button>
                        </div>
                    </div>

                    {/* Plan premium */}
                    <div className="Buy-box">
                        <h2>Premium Membership</h2>
                        <p className="price">$59.99<span>/month</span></p>
                        <ul>
                            <li>24/7 gym access</li>
                            <li>Full equipment access</li>
                            <li>Unlimited group classes</li>
                            <li>Personal training included</li>
                            <li>Free towel service</li>
                            <li>Exclusive events and workshops</li>
                        </ul>
                        <div className="button-div">
                            <button className="buy-btn"  onClick={() => showMenuTrueF("Premium")}>GET STARTED</button>
                        </div>
                    </div>
                </div>
                </div>

       </div>
     );
};

export default BuyPass;