import React, { useState } from 'react'
import { useForm } from 'react-hook-form'
import '../App.css'
import{AiOutlineEyeInvisible,  AiOutlineEye} from 'react-icons/ai'
// import { toast } from 'react-toastify'
import toast from 'react-hot-toast'
import axios from 'axios'

const SignupForm = ({setSignup}) => {

    const[showPassword, setShowPassword] = useState(false);
    const[showConfirmPassword, setShowConfirmPassword] = useState(false);


    const {
        register,
        handleSubmit,
        reset,
        formState: { errors }
    }   = useForm()



    const submitForm = async (data) => {
        console.log("data from signup", data);
    
        // Check if password and confirm password match
        if (data.confirmPassword !== data.password) {
            toast.error("Password Not matched");
            return;
        }
    
        try {
            // Create a new FormData object
            const formData = new FormData();
    
            // Append form fields to the FormData object
            formData.append('hospitalName', data.hospitalName);
            formData.append('email', data.email);
            formData.append('address', data.address);
            formData.append('phoneNumber', data.phoneNumber);
            formData.append('city', data.city);
            formData.append('registrationNumber', data.registrationNumber);
            formData.append('state', data.state);
            formData.append('wardNumber', data.wardNumber);
            formData.append('pincode', data.pincode);
            formData.append('registrationDate', data.registrationDate);
            formData.append('password', data.password);
            formData.append('confirmPassword', data.confirmPassword);
            formData.append('ambulanceNumber', data.ambulanceNumber);
            formData.append('registrationCertificate', data.registrationCertificate);
    
            // // Append the file (registrationCertificate)
            // if (data.registrationCertificate[0]) {
            //     formData.append('registrationCertificate', data.registrationCertificate[0]);
            // }
    
            // Make the API call with FormData
            const response = await axios.post('http://localhost:8080/api/v1/signup', formData, {
                headers: {
                    'Content-Type': 'multipart/form-data',  // This is important for file uploads
                },
            });
    
            console.log(response.data);  // Log the API response
    
            // Show success message
            toast.success("Signup successful! Please Login");
            setSignup(false)
    
        } catch (error) {
            console.error('Error during signup:', error);
            toast.error("Signup failed. Please try again.");
        }
    
        // Reset form fields
        // reset();
    };
    

  return (
    <>
    <form 
    onSubmit={handleSubmit(submitForm)}
    className="mt-16 grid grid-cols-2 gap-6 gap-y-10">
                            <div>
                                {/* <label className="block text-gray-600">Hospital Name</label> */}
                                <input type="text"
                                name='hospitalName'
                                id='hospitalName'
                                {...register("hospitalName", {required:true})}
                                placeholder='Hospital Name'  className="hospitalname w-full border-b-2 border-gray-300 focus:outline-none focus:border-gray-500"/>
                                {
                                    errors.hospitalName && (
                                        <span className='text-red-500'>Hospital Name is Required</span>
                                    )
                                }
                            </div>
                            <div>
                                {/* <label className="block text-gray-600">Email ID</label> */}
                                <input type="email"
                                id='email'
                                name='email'
                                {...register("email", {required:true})}
                                placeholder='Email Id' className="w-full border-b-2 border-gray-300 focus:outline-none focus:border-gray-500"/>
                                {
                                    errors.email && (
                                        <span className='text-red-500'>Email is Required</span>
                                    )
                                }
                            </div>
                            <div>
                                {/* <label className="block text-gray-600">Address</label> */}
                                <input type="text"
                                name='address'
                                id='address'
                                {...register("address", {required:true})}
                                placeholder='Address' className="w-full border-b-2 border-gray-300 focus:outline-none focus:border-gray-500"/>
                                {
                                    errors.address && (
                                        <span className='text-red-500'>Address is Required</span>

                                    )
                                }
                            </div>
                            <div>
                                {/* <label className="block text-gray-600">Phone Number</label> */}
                                <input type="tel"
                                id='phoneNumber'
                                name='phoneNumber'
                                {...register("phoneNumber", {required:true})}
                                placeholder='Phone Number' className="w-full border-b-2 border-gray-300 focus:outline-none focus:border-gray-500"/>
                                {
                                    errors.phoneNumber && (
                                        <span className='text-red-500'>Phone Number is Required</span>
                                    )
                                }
                            </div>
                            <div>
                                {/* <label className="block text-gray-600">City</label> */}
                                <input type="text"
                                id='city'
                                name='city'
                                {...register("city", {required:true})}
                                placeholder='City' className="w-full border-b-2 border-gray-300 focus:outline-none focus:border-gray-500"/>
                                {
                                    errors.city && (
                                        <span className='text-red-500'>City is Required</span>
                                    )
                                }
                            </div>
                            <div>
                                {/* <label className="block text-gray-600">Hospital Registration Number</label> */}
                                <input type="text" 
                                name='registrationNumber'
                                id='registrationNumber'
                                {...register("registrationNumber", {required:true})}
                                placeholder='Hospital Registration Number' className="w-full border-b-2 border-gray-300 focus:outline-none focus:border-gray-500"/>
                                {
                                    errors.registrationNumber && (
                                        <span className='text-red-500'>Hospital Registration Number is Required</span>
                                    )
                                }
                                
                            </div>
                            <div>
                                {/* <label className="block text-gray-600">State</label> */}
                                <input type="text"
                                name='state'
                                id='state'
                                {...register("state", {required:true})}
                                placeholder='State' className="w-full border-b-2 border-gray-300 focus:outline-none focus:border-gray-500"/>
                                {
                                    errors.state && (
                                        <span className='text-red-500'>State is Required</span>
                                    )
                                }    
                            </div>
                            <div>
                                {/* <label className="block text-gray-600">Emergency-Ward Number</label> */}
                                <input type="text"
                                name='wardNumber'
                                id='wardNumber'
                                {...register("wardNumber",  {required:true})}
                                placeholder='Emergency-Ward Number' className="w-full border-b-2 border-gray-300 focus:outline-none focus:border-gray-500"/>
                                {
                                    errors.wardNumber && (
                                        <span className='text-red-500'>Emergency-Ward Number is Required</span>
                                    )
                                }
                            </div>
                            <div>
                                {/* <label className="block text-gray-600">Pincode</label> */}
                                <input type="Number" 
                                id='pincode'
                                name='pincode'
                                {...register("pincode", {required:true})}
                                placeholder='Pincode' className="w-full border-b-2 border-gray-300 focus:outline-none focus:border-gray-500"/>
                                {
                                    errors.pincode && (
                                        <span className='text-red-500'>Pincode is Required</span>

                                    )
                                }
                            </div>
                            <div className='flex flex-col gap-y-3'>
                                {/* <label className="block text-gray-600">Registration certificate Upload</label> */}
                                <input type="file" id='registrationCertificate' className=" hidden  w-full border-b-2 border-gray-300 focus:outline-none focus:border-gray-500"/>
                                <input type="text" placeholder='Registration Certificate Upload'  className="w-full border-b-2 border-gray-300 focus:outline-none focus:border-gray-500"/>

                                <button className=" px-4 w-fit rounded-lg bg-gray-800 text-white py-2 mt-1">Choose</button>
                            </div>
                            <div>
                                <label className="block text-gray-600">Hospital Registration Date</label>
                                <input type="date"
                                id='registrationDate'
                                name='registrationDate'
                                {...register("registrationDate", {required:true})}
                                className="w-full border-b-2 border-gray-300 focus:outline-none focus:border-gray-500"/>
                                {
                                    errors.registrationDate && (
                                        <span className='text-red-500'>Registration Date is Required</span>
                                    )
                                }
                            </div>
                            <div className='relative'>
                                {/* <label className="block text-gray-600">Create Password</label> */}
                                <input type={showPassword ? "text" : "password"} 
                                name='password'
                                id='password'
                                {...register("password", {required:true})}
                                placeholder='Create Password' className="w-full border-b-2 border-gray-300 focus:outline-none focus:border-gray-500"/>
                                {
                                    errors.password && (
                                        <span className='text-red-500'>Password is Required</span>
                                    )
                                }

                                <span
                                    className='absolute right-0 top-0 cursor-pointer'
                                    onClick={()=>setShowPassword(prev=> !prev)}>
                                    {showPassword ? 

                                    (<AiOutlineEyeInvisible fontSize={24} fill='#AFB2BF' />):
                                    
                                    (<AiOutlineEye fontSize={24} fill='#AFB2BF'/>)}
                                    </span>
                                
                            </div>
                            <div>
                                {/* <label className="block text-gray-600">Number Of Ambulance available</label> */}
                                <input type="number" 
                                id='ambulanceNumber'
                                name='ambulanceNumber'
                                {...register("ambulanceNumber" , {required:true})}
                                placeholder='Number of Ambulance available' className="w-full border-b-2 border-gray-300 focus:outline-none focus:border-gray-500"/>
                                {
                                    errors.ambulanceNumber && (
                                        <span className='text-red-500'>Number of Ambulance available is Required</span>

                                    )
                                }
                            </div>
                            <div className='relative'>
                                {/* <label className="block text-gray-600">Confirm Password</label> */}
                                <input type={showConfirmPassword ? "text" : "password"}  
                                name='confirmPassword'
                                id='confirmPassword'
                                {...register("confirmPassword", {required:true})}
                                placeholder='Confirm Password' className="w-full border-b-2 border-gray-300 focus:outline-none focus:border-gray-500"/>
                                {
                                    errors.confirmPassword && (
                                        <span className='text-red-500'>Confirm Password is Required</span>
                                    )
                                }

                                <span
                                    className='absolute right-0 top-0 cursor-pointer'
                                    onClick={()=>setShowConfirmPassword(prev=> !prev)}>
                                    {showConfirmPassword ? 

                                    (<AiOutlineEyeInvisible fontSize={24} fill='#AFB2BF' />):
                                    
                                    (<AiOutlineEye fontSize={24} fill='#AFB2BF'/>)}
                                    </span>
                                
                            </div>

                            <div className="mt-4 translate-x-[80%] ">
                          <button
                          type='submit'
                          className="px-9 rounded-2xl bg-gray-800   text-white py-2 text-lg">Sign Up</button>
                      </div>

                        </form>
    </>    

)
}

export default SignupForm