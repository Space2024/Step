// eslint-disable-next-line no-unused-vars
import React, { useState,useEffect,useRef } from 'react';
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import Select from "react-select";
import axios from 'axios';
import QRCode from "react-qr-code";
import logo from "../assets/logo.png"
import logo1 from "../assets/logo1.png"

const App = () => {

  const [step, setStep] = useState(1);
  const [formData, setFormData] = useState({
    customerName: '',
    email: '',
    dateOfBirth: '',
    GSTN: '',
    mobileNo: '',
    //panCard: '',
    //aadharNo: '',
    doorNo: '',
    street: '',
    area: '',
    taluk: '',
    city: '',
    pinCode: '',
    state:'',
    MaritalStatus:'',
    weddingDate: '',
    SpouseName:'',
    SpouseBirthday: '',
    FirstChildName:'',
    FirstChildBirthday:'',
    SecondChildName:'',
    SecondChildBirthday:'',
    FestivalCelebrate:'',
    CustomerType:'',
    purchase_with_sktm:'No',
    chit_with_sktm:'No',
    enterotp:'',   
  });


  const handleChange = (e) => {
    const { name, value } = e.target;
    let updatedValue = value;

    // Check if the input field is one of the fields requiring capitalization
    if (['customerName', 'street', 'spouseName', 'firstChildName', 'secondChildName'].includes(name)) {
        // Capitalize the first letter of the input value
        updatedValue = value.charAt(0).toUpperCase() + value.slice(1);
    }

    // Convert the input value to uppercase if it's the PAN card field
    const uppercaseValue = name === 'panCard' ? value.toUpperCase() : updatedValue;

    setFormData({
        ...formData,
        [name]: uppercaseValue
    });
};


  const validateFields = () => {
    let isValid = true;
    const newErrors = {};

    const fieldsToValidate = ['customerName', 'email', 'dateOfBirth', 'mobileNo', 'CustomerType',];

    switch (true) {
        // Check if any of the required fields are empty
        case fieldsToValidate.some((field) => !formData[field].trim()):
            fieldsToValidate.forEach((field) => {
                if (!formData[field].trim()) {
                    isValid = false;
                    newErrors.field = 'All Field is Required';
                }
            });
            break;
        // Validate mobile number format
        case !/^\d{10}$/.test(formData.mobileNo):
            isValid = false;
            setMobileNo(true);
            break;

            case ! /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email):
              isValid = false;
              setEmailData(true);
              console.log(emailData)
              break;
        // Validate Aadhar number format
        // case !/^\d{12}$/.test(formData.aadharNo):
        //     isValid = false;
        //     setaadharNo(true);
        //     break;
        // Validate PAN card format
        // case !/^[A-Z]{5}\d{4}[A-Z]$/.test(formData.panCard):
        //     isValid = false;
        //     setPanCard(true);
        //     break;
        default:
            break;
    }

    // Set the errors state based on validation results
    setErrors(newErrors);

    return isValid;
};

const handleNext = () => {
    setErrors({});
    setMobileNo(false);
    setaadharNo(false);
    setPanCard(false);
    setPincode(false);
    setEmailData(false)

    if (!validateFields()) {
        // If fields are not valid, don't submit
        return;
        
    }
    
else
    if (step === 2 && !/^\d{6}$/.test(formData.pinCode)) {
        // If on the first step and pincode is invalid, set error
        setPincode(true)
        return;
    }

    setStep(step + 1);
};


  const handlePrev = () => {
    setStep(step - 1);
  };

  const [dateOfBirth, setDateOfBirth] = useState(null); // Initialize with null or any default date
  const [weddingDate, setWeddingDate] = useState(null);
  const [SpouseBirthday, setSpouseBirthday] = useState(null);
  const [FirstChildBirthday, setFirstChildBirthday] = useState(null);
  const [SecondChildBirthday, setSecondChildBirthday] = useState(null);
  const [isSuccess, setIsSuccess] = useState(false); // State variable to track success message
  // const [CHITwithSKTM, setCHITwithSKTM] = useState(false);
  const [MaritalStatus, setmaritalStatus] = useState(false); //
  const [State, setState] = useState({});
  const [City, setCity] = useState({});
  const [Taluk, setTaluk] = useState({});
  const [Area, setArea] = useState({});
  const [errors, setErrors] = useState({});
  const [mobileNo, setMobileNo] = useState(false);
  const [aadharNo, setaadharNo] = useState(false);
  const [panCard, setPanCard] = useState(false);
  const [pincode, setPincode] = useState(false);
  const [showmodal, setShowModal] = useState(false);
  const [popup, setPopup] = useState(false);
  const [otp, setOtp] = useState(false);
  const [showpopup, setShowPopup] = useState(false);
  const [qrmobile, setQRMobile] = useState(null);
  const [purchaseChecked, setPurchaseChecked] = useState(false);
  const [chitChecked, setChitChecked] = useState(false);
  const [emailData,setEmailData]=useState(false);
  const inputRef = {
    customerName:useRef(null),
    email: useRef(null),
    dateOfBirth:useRef(null),
    mobileNo: useRef(null),
    doorNo: useRef(null),
    street: useRef(null),
    area: useRef(null),
    taluk: useRef(null),
    city: useRef(null),
    pinCode: useRef(null),
    state:useRef(null),
    MaritalStatus:useRef(null),
    weddingDate: useRef(null),
    SpouseName:useRef(null),
    SpouseBirthday: useRef(null),
    FirstChildName:useRef(null),
    FirstChildBirthday:useRef(null),
    SecondChildName:useRef(null),
    SecondChildBirthday:useRef(null),
    FestivalCelebrate:useRef(null),
    CustomerType:useRef(null)
  }
  const [screenWidth, setScreenWidth] = useState(window.innerWidth);

  useEffect(() => {
    const handleResize = () => {
      setScreenWidth(window.innerWidth);
    };

    window.addEventListener('resize', handleResize);

    // Cleanup the event listener
    return () => {
      window.removeEventListener('resize', handleResize);
    };
  }, [])

  
  const handledatechange = (date) => {
    setDateOfBirth(date);
    if (date) {
      const formattedDate = `${date.getFullYear()}-${(date.getMonth() + 1).toString().padStart(2, '0')}-${date.getDate().toString().padStart(2, '0')}`;
      setFormData({ ...formData, dateOfBirth: formattedDate });
    }
  };
  
  const handledate1change = (date) => {
    setWeddingDate(date);
    if (date) {
      const formattedDate = `${date.getFullYear()}-${(date.getMonth() + 1).toString().padStart(2, '0')}-${date.getDate().toString().padStart(2, '0')}`;
      setFormData({ ...formData, weddingDate: formattedDate });
    }
  };
  
  const handledate2change = (date) => {
    setSpouseBirthday(date);
    if (date) {
      const formattedDate = `${date.getFullYear()}-${(date.getMonth() + 1).toString().padStart(2, '0')}-${date.getDate().toString().padStart(2, '0')}`;
      setFormData({ ...formData, SpouseBirthday: formattedDate });
    }
  };
  
  const handledate3change = (date) => {
    setFirstChildBirthday(date);
    if (date) {
      const formattedDate = `${date.getFullYear()}-${(date.getMonth() + 1).toString().padStart(2, '0')}-${date.getDate().toString().padStart(2, '0')}`;
      setFormData({ ...formData, FirstChildBirthday: formattedDate });
    }
  };
  
  const handledate4change = (date) => {
    setSecondChildBirthday(date);
    if (date) {
      const formattedDate = `${date.getFullYear()}-${(date.getMonth() + 1).toString().padStart(2, '0')}-${date.getDate().toString().padStart(2, '0')}`;
      setFormData({ ...formData, SecondChildBirthday: formattedDate });
    }
  };
  
  const options = [
    { value: "single", label: "Single" },
    { value: "married", label: "Married" }
  ];

  const options1 = [
    { value: "NewCustomer", label: "New Customer" },
    { value: "ExistingCustomer", label: "Existing Customer" },
  ];

  // const options2 = [
  //   { value: "Yes", label: "Yes",},
  //   { value: "No", label: "No" },
  // ];

  const options3 = [
    { value: "Pongal/Sankrati", label: "Pongal/Sankrati" },
    { value: "Diwali", label: "Diwali" },
    { value: "Christmas", label: "Christmas" },
    { value: "RamadanEid", label: "Ramadan/Eid" },
    { value: "Onam", label: "Onam" },
  ];


  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      console.log(formData)
      const res = await axios.post('http://localhost:3000/customer', formData);
      console.log(res.data);
      setIsSuccess(true);

      if (res.status === 200) {
        setIsSuccess(true); // Set isSuccess to true if the request is successful
        setTimeout(() => {
          setIsSuccess(false); // Hide the success message after a certain time (optional)
        }, 5000); // Adjust the timeout duration as needed
  
        // Reload the page after a successful submission
      //  setTimeout(() => {
       // window.location.reload();
    //  },5000);
    }

    // Clear date pickers after successful submission
    setDateOfBirth(null);
    setWeddingDate(null);
    setSpouseBirthday(null);
    setFirstChildBirthday(null);
    setSecondChildBirthday(null);
    setState(null);
    setArea(null);
    setCity(null);
    setTaluk(null);


      // Clear the input fields after a successful submission
      setFormData({
        customerName: '',
        email: '',
        dateOfBirth: '',
        GSTN: '',
        mobileNo: '',
       // panCard: '',
       // aadharNo: '',
        doorNo: '',
        street: '',
        area: '',
        taluk: '',
        city: '',
        pinCode: '',
        state: '',
        MaritalStatus: '',
        weddingDate: '',
        SpouseName: '',
        SpouseBirthday: '',
        FirstChildName: '',
        FirstChildBirthday: '',
        SecondChildName: '',
        SecondChildBirthday: '',
        FestivalCelebrate: '',
        CustomerType: '',
       // CHITwithSKTM: '',
       // MonthlyAmount: '',
      
      });

      setShowModal(true)


    } catch (error) {
      console.error('Error submitting form:', error); // Handle errors
    }
  };
  
  const renderButtons = () => {
    return (
      <div className="flex justify-between">
        {step > 1 && (
      <button
        type="button"
        onClick={handlePrev}
        className="px-6 py-2 mt-4 mr-4 text-sm font-medium leading-5 text-center text-white transition-colors duration-150 bg-blue-600 border border-transparent rounded-lg hover:bg-gray-700 focus:outline-none"
      >
        Previous
      </button>
    )}
    {step < 3 && (
      <button
        type="button"
        onClick={handleNext}
        className="px-6 py-2 mt-4 text-sm font-medium leading-5 text-center text-white transition-colors duration-150 bg-blue-600 border border-transparent rounded-lg hover:bg-green-700 focus:outline-none"
      >
        Next
      </button>
    )}
    {step === 3 && (
      <button
        type="button"
        onClick={handleSubmit}
        className="px-6 py-2 mt-4 ml-4 text-sm font-medium leading-5 text-center text-white transition-colors duration-150 bg-green-600 border border-transparent rounded-lg hover:bg-green-700 focus:outline-none"
      >
        Submit
      </button>
    )}
    {showmodal && (
                <div className="fixed inset-0 flex items-center justify-center z-10">
                    <div className="absolute inset-0 bg-gray-900 opacity-50"></div>
                    <div className="relative bg-white rounded-lg p-8 max-w-md">
                    <h2 className="block text-left text-l font-semibold mb-4">Please Your Confirmation</h2>                       
            <input
                name='otp'
                id='otp'
                type="text"
                value={formData.enterotp}
                onChange={handleChange}
                placeholder="Referral Code..."
                className="border border-gray-300 rounded-lg px-3 py-2 w-full focus:outline-none focus:border-blue-500"
            />
            <button onClick={handleVerify} className="bg-violet-500 text-white font-bold py-2 px-4 rounded-lg mt-2 ">Verify</button>
            {popup &&<div className="text-green-500 font-semi-bold"style={{ fontSize: '12px' }}>Refferal Code Verified Successfully</div>}
            {otp &&<div className="text-red-500 font-semi-bold"style={{ fontSize: '12px' }}>Invalid Refferal Code</div>}
                  </div>
                </div>
            )}       
        {showpopup && (
      <div className="fixed inset-0 flex items-center justify-center z-10">
      <div className="absolute inset-0 bg-gray-900 opacity-50"></div>
      <div className="relative bg-white rounded-lg p-8 max-w-md">
        <h2 className="block text-left text-l font-semibold mb-4">Your Registration is successful, Thank You</h2>
        {/* Display QR Code */}
        <div style={{ background: 'white', padding: '16px' }}>
          <QRCode value={qrmobile} />
        </div>
      </div>
    </div>
    )} 
  </div>
    );
  };

  const handleVerify = async () => {
    try {
      const response = await axios.get(`http://localhost:3000/verify_otp/${formData.otp}`);
    console.log(response)
      if (response.status === 200) {
        // OTP verification successful
        setQRMobile(response.data.mobileNo)
        setPopup(true);
        console.log(formData)
        setShowPopup(true);
        setOtp(false);
       // setTimeout(() => {
       // window.location.reload();
     // },5000);

      }

    } catch (error) {
      // Handle network errors or server-side errors
      setOtp(true);
      setPopup(false);
      console.error('Error verifying OTP:', error);
    }
  };
  
  
//   const handleChange1 = (selectedOption) => {
//     setFormData({ ...formData, CHITwithSKTM: selectedOption.value });
//     if (selectedOption.value==='Yes') {
//       setCHITwithSKTM(true);
//   }
//   if (selectedOption.value==='No') {
//     setCHITwithSKTM(false);
//   }
// };

const handleChange2 = (selectedOption) => {
  setFormData({ ...formData, MaritalStatus: selectedOption.value });
  if (selectedOption.value==='single') {
    setmaritalStatus(false);
}
else {
  setmaritalStatus(true);
}
};

// Function to handle changes in the Purchase checkbox
const handlePurchaseChange = () => {
  // Toggle the state
  const updatedPurchaseChecked = !purchaseChecked;
  // Update the formData state with the new value of purchaseChecked
  setPurchaseChecked(updatedPurchaseChecked);
  // Update the formData state with the corresponding value of purchase_with_sktm
  setFormData({ ...formData, purchase_with_sktm: updatedPurchaseChecked ? 'yes' : 'no' });
};


// Function to handle changes in the Chit checkbox
const handleChitChange = () => {
 // Toggle the state
 const updatedchitChecked = !chitChecked;
 // Update the formData state with the new value of purchaseChecked
 setChitChecked(updatedchitChecked);
 // Update the formData state with the corresponding value of purchase_with_sktm
 setFormData({ ...formData, chit_with_sktm: updatedchitChecked ? 'yes' : 'no' });
};

const handleKeypress = (e, nextRef) => {
  if (e.key === 'Enter') {
    e.preventDefault();
    nextRef.current.focus();
  }
};


useEffect(() => {
  const fetchData = async () => {
    try {
      const result = await axios.get(`https://api.postalpincode.in/pincode/${formData.pinCode}`);
      console.log('Result:', result.data);
      if (result.data && Array.isArray(result.data) && result.data.length > 0 && result.data[0].PostOffice) {
        const postOffices = result.data[0].PostOffice;
        console.log('Post Offices:', postOffices);
        if (postOffices.length > 0) {
          // Update the state, district, division, and name fields in the form data
          setFormData(prevState => ({
            ...prevState,
            state: postOffices[0].State,
            city: postOffices[0].District,
            taluk: postOffices[0].Division,
            area: postOffices[0].Name
          }));
        } else {
          console.error('Data not found or invalid:', postOffices);
        }
      } else {
        console.error('Waiting For response data:', result.data);
      }
    } catch (error) {
      console.error('Error fetching data:', error);
    }
  };

  // Call the fetchData function immediately inside the useEffect hook
  fetchData();
}, [formData.pinCode]);


  return (
    <div className="flex items-center min-h-screen bg-gray-50">
    <div className="flex-1 h-full max-w-4xl mx-auto bg-white rounded-lg shadow-xl">
      <div className="flex flex-col md:flex-row">
        <div className="h-32 md:h-auto md:w-1/2">
          <img
          className={screenWidth >= 500 ? "object-cover w-full h-full" : "object-cover w-full h-full"}
            src={screenWidth >= 500 ? logo : logo1}
            alt="img"
          />
        </div>
        <div className="flex items-center justify-center p-6 sm:p-12 md:w-1/2">
          <div className="w-full">
            <h3 className="mb-4 text-xl font-bold text-blue-600">Customer Connect</h3>

            <div className="form-header flex gap-3 mb-4 text-xs text-center">
        <span className={`stepIndicator flex-1 pb-8 relative ${step >= 1 ? 'text-yellow-500' : 'text-gray-400'}`}>Profile</span>
        <span className={`stepIndicator flex-1 pb-8 relative ${step >= 2 ? 'text-violet-500' : 'text-gray-400'}`}>Address</span>
        <span className={`stepIndicator flex-1 pb-8 relative ${step >= 3 ? 'text-rose-500' : 'text-gray-400'}`}>Personalized</span>
      </div>

            <form onSubmit={handleSubmit}>
              {step === 1 && (
                <div className="grid gap-4 gap-y-2 text-sm grid-cols-1 md:grid-cols-2">
              <div className="md:col-span-2">
              <label htmlFor="customerName" className="block text-left after:content-['*'] after:ml-0.5 after:text-red-500 block text-sm font-medium text-slate-700">Customer Name</label>
              <input
              type="text"
              name="customerName"
              id="customerName"
              value={formData.customerName}
              onChange={handleChange}
              onKeyDown={(e) => handleKeypress(e, inputRef.email)} // Pass the reference to the next input field to handleKeypress function
              ref={inputRef.customerName}
              className="h-10 border mt-1 rounded px-4 w-full bg-gray-50"
              />
              {errors.customerName && <div className="text-red-500">{errors.customerName}</div>}
              </div>

                  <div className="md:col-span-2">
                    <label htmlFor="email" className="block text-left after:content-['*'] after:ml-0.5 after:text-red-500 block text-sm font-medium text-slate-700">Email</label>
                    <input
                      type="email"
                      name="email"
                      id="email"
                      value={formData.email}
                      onChange={handleChange}
                      onKeyDown={(e) => handleKeypress(e, inputRef.dateOfBirth)} // Pass the reference to the next input field to handleKeypress function
                      ref={inputRef.email}
                      className="h-10 border mt-1 rounded px-4 w-full bg-gray-50"
                    />
                    {errors.email && <div className="text-red-500">{errors.email}</div>}
                  </div>

                  <div className="md:col-span-1 flex flex-col">
                  <label htmlFor="dateOfBirth" className="block text-left after:content-['*'] after:ml-0.5 after:text-red-500 block text-sm font-medium text-slate-700">Date Of Birth</label>
                  <DatePicker
                    selected={dateOfBirth}
                    onChange={handledatechange}
                    onKeyDown={(e) => handleKeypress(e, inputRef.mobileNo)} // Pass the reference to the next input field to handleKeypress function
                    ref={inputRef.dateOfBirth}
                    dateFormat="dd/MM/yyyy" // Set the date format as "dd/mm/yyyy"
                    className="h-10 border mt-1 rounded px-4 w-full bg-gray-50" 
                    placeholderText="Select Date" // Placeholder text when no date is selected
                    />
                    {errors.dateOfBirth && <div className="text-red-500">{errors.dateOfBirth}</div>}
                  </div>

                  {/* <div className="md:col-span-1">
                    <label htmlFor="aadharNo" className="block text-left after:content-['*'] after:ml-0.5 after:text-red-500 block text-sm font-medium text-slate-700">Aadhar Number</label>
                    <input
                      type="text"
                      name="aadharNo"
                      id="aadharNo"
                      value={formData.aadharNo}
                      onChange={handleChange}
                      maxLength={12}
                      className="h-10 border mt-1 rounded px-4 w-full bg-gray-50"
                    />
                    {errors.aadharNo && <div className="text-red-500">{errors.aadharNo}</div>}
                  </div> */}

                  <div className="md:col-span-1">
                    <label htmlFor="mobileNo" className="block text-left after:content-['*'] after:ml-0.5 after:text-red-500 block text-sm font-medium text-slate-700">Mobile Number</label>
                    <input
                      type="text"
                      name="mobileNo"
                      id="mobileNo"
                      value={formData.mobileNo}
                      onChange={handleChange}
                      onKeyDown={(e) => handleKeypress(e, inputRef.CustomerType)} // Pass the reference to the next input field to handleKeypress function
                      ref={inputRef.mobileNo}
                      maxLength={10}
                      className="h-10 border mt-1 rounded px-4 w-full bg-gray-50"
                    />
                    {errors.mobileNo && <div className="text-red-500">{errors.mobileNo}</div>}
                  </div>

                  <div className="md:col-span-2">
                  <label htmlFor="CustomerType" className="block text-left after:content-['*'] after:ml-0.5 after:text-red-500 block text-sm font-medium text-slate-700">Customer Type</label>
                  <Select
                  options={options1}
                  value={options1.find(option => option.value === formData.CustomerType)}
                  isSearchable={false}
                  onChange={(selectedOption) => handleChange({ target: { name: "CustomerType", value: selectedOption.value } })}
                  onKeyDown={(e) => handleKeypress(e, inputRef.CustomerType)} // Pass the reference to the next input field to handleKeypress function
                  ref={inputRef.CustomerType}
                  className="select-container h-10 border mt-1 rounded  px-0 w-full bg-gray-50 " // Add a custom class for styling
                  classNamePrefix="select" // Prefix for inner components' class names
                  />
                  </div>

  {/* Checkboxes */}
      {/* Purchase checkbox */}
      {formData.CustomerType==="NewCustomer"?(   <>
      <label className="flex items-center">
        <input 
          type="checkbox" 
          checked={purchaseChecked} // Set the checked state
          onChange={handlePurchaseChange} // Handle the change event
          className="form-checkbox h-5 w-5 text-green-500" // Customize checkbox appearance
          disabled 
        /> 
        <span className="ml-2">Purchase With SKTM</span>
      </label>

      {/* Chit checkbox */}
      <label className="flex items-center ">
        <input 
          type="checkbox" 
          checked={chitChecked} // Set the checked state
          onChange={handleChitChange} // Handle the change event
          className="form-checkbox h-5 w-5 text-green-500 " // Customize checkbox appearance
          disabled 
        /> 
        <span className="ml-2">Chit With SKTM</span>
      </label>
      </>):(
      <>
      <label className="flex items-center">
        <input 
          type="checkbox" 
          checked={purchaseChecked} // Set the checked state
          onChange={handlePurchaseChange} // Handle the change event
          className="form-checkbox h-5 w-5 text-green-500" // Customize checkbox appearance
        /> 
        <span className="ml-2">Purchase With SKTM</span>
      </label>

      {/* Chit checkbox */}
      <label className="flex items-center ">
        <input 
          type="checkbox" 
          checked={chitChecked} // Set the checked state
          onChange={handleChitChange} // Handle the change event
          className="form-checkbox h-5 w-5 text-green-500 " // Customize checkbox appearance
        /> 
        <span className="ml-2">Chit With SKTM</span>
      </label>
      </>
      )}

     {/* Hidden inputs to submit data */}
    <input type="hidden" name="purchase_with_sktm" value={purchaseChecked ? 'yes' : 'no'} />
      <input type="hidden" name="chit_with_sktm" value={chitChecked ? 'yes' : 'no'} />

                  {/* <div className="md:col-span-1" > */}
                  {/* <label htmlFor="panCard" className="block text-left after:content-['*'] after:ml-0.5 after:text-red-500 block text-sm font-medium text-slate-700">PAN Card</label> */}
                    {/* <input
                      type="text"
                      name="panCard"
                      id="panCard"
                      value={formData.panCard}
                      onChange={handleChange}
                      maxLength={10}
                      className="h-10 border mt-1 rounded px-4 w-full bg-gray-50 "
                    />
                    {errors.panCard && <div className="text-red-500">{errors.panCard}</div>}
                  </div> */}
                </div>
              )}
                  {Object.keys(errors).length > 0 && (
                  <div className="message-box error">
                  {Object.keys(errors).map((field) => (
                  <p key={field} className="message error-message text-red-500 font-semibold"style={{ fontSize: '12px' }}>
                  {errors.field}
                  </p>
                  ))}
                  </div>
                  )}
              {mobileNo && <div className="text-red-500 font-bold" style={{ fontSize: '12px' }}>Mobile No Must Be 10-digits</div>}
              {panCard && <div className="text-red-500 font-bold" style={{ fontSize: '12px' }}>PAN Card must have 5 letters followed by 4 numbers and 1 letter</div>}
              {aadharNo && <div className="text-red-500 font-bold" style={{ fontSize: '12px' }}>Aadhar No Must Be 12-digits</div>}
              {emailData && <div className="text-red-500 font-bold" style={{ fontSize: '12px' }}>Invalid Email</div>}

{step === 2 && (
  <>
    <div className="grid gap-4 gap-y-2 text-sm grid-cols-1 md:grid-cols-2">
      <div className="md:col-span-1">
        <label htmlFor="doorNo" className="block text-left after:content-['*'] after:ml-0.5 after:text-red-500 block text-sm font-medium text-slate-700">Door Number</label>
        <input
          type="text"
          name="doorNo"
          id="doorNo"
          value={formData.doorNo}
          onChange={handleChange}
          onKeyDown={(e) => handleKeypress(e, inputRef.street)} // Pass the reference to the next input field to handleKeypress function
          ref={inputRef.doorNo}
          maxLength={6}
          className="h-10 border mt-1 rounded px-4 w-full bg-gray-50"
        />
      </div>

      <div className="md:col-span-1">
        <label htmlFor="street" className="block text-left after:content-['*'] after:ml-0.5 after:text-red-500 block text-sm font-medium text-slate-700">Street</label>
        <input
          type="text"
          name="street"
          id="street"
          value={formData.street}
          onChange={handleChange}
          onKeyDown={(e) => handleKeypress(e, inputRef.pinCode)} // Pass the reference to the next input field to handleKeypress function
          ref={inputRef.street}
          className="h-10 border mt-1 rounded px-4 w-full bg-gray-50"
        />
      </div>

      <div className="md:col-span-1">
        <label htmlFor="pinCode" className="block text-left after:content-['*'] after:ml-0.5 after:text-red-500 block text-sm font-medium text-slate-700">Pin Code</label>
        <input
          type="text"
          name="pinCode"
          id="pinCode"
          value={formData.pinCode}
          onChange={handleChange}
          onKeyDown={(e) => handleKeypress(e, inputRef.area)} // Pass the reference to the next input field to handleKeypress function
          ref={inputRef.pinCode}
          maxLength={6}
          className="h-10 border mt-1 rounded px-4 w-full bg-gray-50"
        />
      </div>

      <div className="md:col-span-1">
        <label htmlFor="area" className="block text-left">Area</label>
        <input
          type="text"
          name="area"
          id="area"
          value={formData.area||Area.area}
          onChange={handleChange}
          onKeyDown={(e) => handleKeypress(e, inputRef.taluk)} // Pass the reference to the next input field to handleKeypress function
          ref={inputRef.area}
          className="h-10 border mt-1 rounded px-4 w-full bg-gray-50"
        />
      </div>

      <div className="md:col-span-1">
        <label htmlFor="taluk" className="block text-left">Taluk</label>
        <input
          type="text"
          name="taluk"
          id="taluk"
          value={formData.taluk||Taluk.taluk}
          onChange={handleChange}
          onKeyDown={(e) => handleKeypress(e, inputRef.city)} // Pass the reference to the next input field to handleKeypress function
          ref={inputRef.taluk}
          className="h-10 border mt-1 rounded px-4 w-full bg-gray-50"
        />
      </div>

      <div className="md:col-span-1">
        <label htmlFor="city" className="block text-left">City</label>
        <input
          type="text"
          name="city"
          id="city"
          value={formData.city||City.city}
          onChange={handleChange}
          onKeyDown={(e) => handleKeypress(e, inputRef.state)} // Pass the reference to the next input field to handleKeypress function
          ref={inputRef.city}
          className="h-10 border mt-1 rounded px-4 w-full bg-gray-50"
        />
      </div>

      <div className="md:col-span-1">
        <label htmlFor="state" className="block text-left">State</label>
        <input
          type="text"
          name="state"
          id="state"
          value={formData.state||State.state}
          onChange={handleChange}
          // onKeyDown={(e) => handleKeypress(e, inputRef.handleNext)} // Pass the reference to the next input field to handleKeypress function
          ref={inputRef.state}
          className="h-10 border mt-1 rounded px-4 w-full bg-gray-50"
        />
      </div>
    </div>
  </>
)}
                  {pincode && <div className="text-red-500 font-bold" style={{ fontSize: '12px' }}>Pincode must be a 6-digit number</div>}

                {step === 3 && (
                  <div className="grid gap-4 gap-y-2 text-sm grid-cols-1 md:grid-cols-2">
                  <div className="md:col-span-1">
                  <label htmlFor="MaritalStatus" className="block text-left after:content-['*'] after:ml-0.5 after:text-red-500 block text-sm font-medium text-slate-700">Marital Status</label>
                  <Select
                  options={options}
                  value={options.find(option => option.value === formData.MaritalStatus)}
                  isSearchable={false}
                  onChange={(selectedOption) => handleChange2(selectedOption)}
                  onKeyDown={(e) => handleKeypress(e, inputRef.dateOfBirth)} // Pass the reference to the next input field to handleKeypress function
                  ref={inputRef.email}
                  className="select-container h-10 border mt-1 rounded  px-0 w-full bg-gray-50 " // Add a custom class for styling
                  classNamePrefix="select" // Prefix for inner components' class names
                  />
                  </div>


                  <div className="md:col-span-1 flex flex-col">
                  <label htmlFor="weddingDate" className="block text-left">Wedding Date</label>
                  {MaritalStatus ?(
                  <DatePicker
                    selected={weddingDate}
                    onChange={handledate1change}
                    onKeyDown={(e) => handleKeypress(e, inputRef.dateOfBirth)} // Pass the reference to the next input field to handleKeypress function
                    ref={inputRef.email}
                    dateFormat="dd/MM/yyyy" // Set the date format as "dd/mm/yyyy"
                    className="h-10 border mt-1 rounded px-4 w-full bg-gray-50"
                    placeholderText="Select Date" // Placeholder text when no date is selected
                    />):( 
                    <DatePicker
                      selected={weddingDate}
                      onChange={handledate1change}
                      dateFormat="dd/MM/yyyy" // Set the date format as "dd/mm/yyyy"
                      className="h-10 border mt-1 rounded px-4 w-full bg-gray-200 focus:outline-none
                      disabled:bg-slate-50 disabled:text-slate-500 disabled:border-slate-200 disabled:shadow-none
                      invalid:border-pink-500 invalid:text-pink-600
                      focus:invalid:border-pink-500 focus:invalid:ring-pink-500"
                      placeholderText="Select Date" 
                      readOnly
                      />)}
                  </div>

                  <div className="md:col-span-1">
                    <label htmlFor="SpouseName" className="block text-left">Spouse Name</label>
                    {MaritalStatus ?(
                    <input
                      type="text"
                      name="SpouseName"
                      id="SpouseName"
                      value={formData.SpouseName}
                      onChange={handleChange}
                      onKeyDown={(e) => handleKeypress(e, inputRef.dateOfBirth)} // Pass the reference to the next input field to handleKeypress function
                      ref={inputRef.email}
                      className="h-10 border mt-1 rounded px-4 w-full bg-gray-50"                                       
                    />):(
                    <input
                      type="text"
                      name="SpouseName"
                      id="SpouseName"
                      value={formData.SpouseName}
                      onChange={handleChange}
                      className="h-10 border mt-1 rounded px-4 w-full bg-gray-200 focus:outline-none
                      disabled:bg-slate-50 disabled:text-slate-500 disabled:border-slate-200 disabled:shadow-none
                      invalid:border-pink-500 invalid:text-pink-600
                      focus:invalid:border-pink-500 focus:invalid:ring-pink-500"
                      readOnly
                      />)}
                  </div>

                  <div className="md:col-span-1 flex flex-col">
                  <label htmlFor="SpouseBirthday" className="block text-left">Spouse Birthday</label>
                  {MaritalStatus ?(
                  <DatePicker
                    selected={SpouseBirthday}
                    onChange={(sod)=>handledate2change(sod)}
                    onKeyDown={(e) => handleKeypress(e, inputRef.dateOfBirth)} // Pass the reference to the next input field to handleKeypress function
                    ref={inputRef.email}
                    dateFormat="dd/MM/yyyy" // Set the date format as "dd/mm/yyyy"
                    className="h-10 border mt-1 rounded px-4 w-full bg-gray-50"
                    placeholderText="Select Date" // Placeholder text when no date is selected
                    />):(
                    <DatePicker
                      selected={SpouseBirthday}
                      onChange={(sod)=>handledate2change(sod)}
                      dateFormat="dd/MM/yyyy" // Set the date format as "dd/mm/yyyy"
                      className="h-10 border mt-1 rounded px-4 w-full bg-gray-200 focus:outline-none
                      disabled:bg-slate-50 disabled:text-slate-500 disabled:border-slate-200 disabled:shadow-none
                      invalid:border-pink-500 invalid:text-pink-600
                      focus:invalid:border-pink-500 focus:invalid:ring-pink-500"
                      placeholderText="Select Date" 
                      readOnly
                      />)}
                  </div>

                  <div className="md:col-span-1">
                    <label htmlFor="FirstChildName" className="block text-left">First Child Name</label>
                    {MaritalStatus ?(
                    <input
                      type="text"
                      name="FirstChildName"
                      id="FirstChildName"
                      value={formData.FirstChildName}
                      onChange={handleChange}
                      onKeyDown={(e) => handleKeypress(e, inputRef.dateOfBirth)} // Pass the reference to the next input field to handleKeypress function
                      ref={inputRef.email}
                      className="h-10 border mt-1 rounded px-4 w-full bg-gray-50"
                    />):(
                    <input
                      type="text"
                      name="FirstChildName"
                      id="FirstChildName"
                      value={formData.FirstChildName}
                      onChange={handleChange}
                      className="h-10 border mt-1 rounded px-4 w-full bg-gray-200 focus:outline-none
                      disabled:bg-slate-50 disabled:text-slate-500 disabled:border-slate-200 disabled:shadow-none
                      invalid:border-pink-500 invalid:text-pink-600
                      focus:invalid:border-pink-500 focus:invalid:ring-pink-500"
                      readOnly
                      />)}
                  </div>

                  <div className="md:col-span-1 flex flex-col">
                  <label htmlFor="FirstChildBirthday" className="block text-left">First Child Birthday</label>
                  {MaritalStatus ?(
                  <DatePicker
                    selected={FirstChildBirthday}
                    onChange={handledate3change}
                    onKeyDown={(e) => handleKeypress(e, inputRef.dateOfBirth)} // Pass the reference to the next input field to handleKeypress function
                    ref={inputRef.email}
                    dateFormat="dd/MM/yyyy" // Set the date format as "dd/mm/yyyy"
                    className="h-10 border mt-1 rounded px-4 w-full bg-gray-50"
                    placeholderText="Select Date" // Placeholder text when no date is selected
                    />):(
                    <DatePicker
                      selected={FirstChildBirthday}
                      onChange={handledate3change}
                      dateFormat="dd/MM/yyyy" // Set the date format as "dd/mm/yyyy"
                      className="h-10 border mt-1 rounded px-4 w-full bg-gray-200 focus:outline-none
                      disabled:bg-slate-50 disabled:text-slate-500 disabled:border-slate-200 disabled:shadow-none
                      invalid:border-pink-500 invalid:text-pink-600
                      focus:invalid:border-pink-500 focus:invalid:ring-pink-500"
                      placeholderText="Select Date"
                      readOnly
                    />)}
                  </div>

                  <div className="md:col-span-1">
                    <label htmlFor="SecondChildName" className="block text-left">Second Child Name</label>
                    {MaritalStatus ?(
                    <input
                      type="text"
                      name="SecondChildName"
                      id="SecondChildName"
                      value={formData.SecondChildName}
                      onChange={handleChange}
                      onKeyDown={(e) => handleKeypress(e, inputRef.dateOfBirth)} // Pass the reference to the next input field to handleKeypress function
                      ref={inputRef.email}
                      className="h-10 border mt-1 rounded px-4 w-full bg-gray-50"
                    />):(
                    <input
                      type="text"
                      name="SecondChildName"
                      id="SecondChildName"
                      value={formData.SecondChildName}
                      onChange={handleChange}
                      className="h-10 border mt-1 rounded px-4 w-full bg-gray-200 focus:outline-none
                      disabled:bg-slate-50 disabled:text-slate-500 disabled:border-slate-200 disabled:shadow-none
                      invalid:border-pink-500 invalid:text-pink-600
                      focus:invalid:border-pink-500 focus:invalid:ring-pink-500"
                      readOnly
                      />)}
                  </div>

                  <div className="md:col-span-1 flex flex-col">
                  <label htmlFor="SecondChildBirthday" className="block text-left">Second Child Birthday</label>
                  {MaritalStatus ?(
                  <DatePicker
                    selected={SecondChildBirthday}
                    onChange={handledate4change}
                    onKeyDown={(e) => handleKeypress(e, inputRef.dateOfBirth)} // Pass the reference to the next input field to handleKeypress function
                    ref={inputRef.email}
                    dateFormat="dd/MM/yyyy" // Set the date format as "dd/mm/yyyy"
                    className="h-10 border mt-1 rounded px-4 w-full bg-gray-50"
                    placeholderText="Select Date" // Placeholder text when no date is selected
                    />):(
                    <DatePicker
                      selected={SecondChildBirthday}
                      onChange={handledate4change}
                      dateFormat="dd/MM/yyyy" // Set the date format as "dd/mm/yyyy"
                      className="h-10 border mt-1 rounded px-4 w-full bg-gray-200 focus:outline-none
                      disabled:bg-slate-50 disabled:text-slate-500 disabled:border-slate-200 disabled:shadow-none
                      invalid:border-pink-500 invalid:text-pink-600
                      focus:invalid:border-pink-500 focus:invalid:ring-pink-500"
                      placeholderText="Select Date"
                      readOnly
                      />)}
                  </div>

                  <div className="md:col-span-1">
                  <label htmlFor="FestivalCelebrate" className="block text-left after:content-['*'] after:ml-0.5 after:text-red-500 block text-sm font-medium text-slate-700">Festival Celebrate</label>
                  <Select
                  options={options3}
                  value={options3.find(option => option.value === formData.FestivalCelebrate)}
                  isSearchable={false}
                  onChange={(selectedOption) => handleChange({ target: { name: "FestivalCelebrate", value: selectedOption.value } })}
                  onKeyDown={(e) => handleKeypress(e, inputRef.dateOfBirth)} // Pass the reference to the next input field to handleKeypress function
                  ref={inputRef.email}
                  className="select-container h-10 border mt-1 rounded  px-0 w-full bg-gray-50 " // Add a custom class for styling
                  classNamePrefix="select" // Prefix for inner components' class names
                  />
                  </div>

                  {/* <div className="md:col-span-1">
                  <label htmlFor="CHITwithSKTM" className="block text-left after:content-['*'] after:ml-0.5 after:text-red-500 block text-sm font-medium text-slate-700">CHIT with SKTM</label>
                  <Select
                  options={options2}
                  value={options2.find(option => option.value === formData.CHITwithSKTM)}
                  onChange={(selectedOption) => handleChange1(selectedOption)}
                  className="select-container h-10 border mt-1 rounded  px-0 w-full bg-gray-50 " // Add a custom class for styling
                  classNamePrefix="select" // Prefix for inner components' class names
                  />
                  </div> */}

                  {/* <div className="md:col-span-1">
                    <label htmlFor="MonthlyAmount" className="block text-left">Monthly Amount</label>
                    {CHITwithSKTM ? (
                    <input
                      type="text"
                      name="MonthlyAmount"
                      id="MonthlyAmount"
                      value={formData.MonthlyAmount}
                      onChange={handleChange}
                      maxLength={6}
                      className="h-10 border mt-1 rounded px-4 w-full bg-gray-50"
                    />):(<input
                      type="text"
                      name="MonthlyAmount"
                      id="MonthlyAmount"
                      value={formData.MonthlyAmount}
                      onChange={handleChange}
                      className="h-10 border mt-1 rounded px-4 w-full bg-gray-200 focus:outline-none
                      disabled:bg-slate-50 disabled:text-slate-500 disabled:border-slate-200 disabled:shadow-none
                      invalid:border-pink-500 invalid:text-pink-600
                      focus:invalid:border-pink-500 focus:invalid:ring-pink-500"
                      readOnly
                    />)}
                  </div> */}
                  </div>
                )}
                  <div>
                  {renderButtons()}
                  </div>
              </form>
              {isSuccess && (
        <div className="success-message font-semibold text-teal-600"style={{ fontSize: '12px' }}>Thanks For Your Response</div>
      )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default App;