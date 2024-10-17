import React, { useState } from 'react';
import { AiOutlineEyeInvisible, AiOutlineEye } from 'react-icons/ai';
import { useForm } from 'react-hook-form';
import { useNavigate } from 'react-router-dom'; // Import useNavigate
import axios from 'axios'; // To send API requests
import Webcapture from './Webcapture';
import toast from 'react-hot-toast';

const LoginForm = () => {
    const [camCapture, setCamCapture] = useState(false);
    const [capturedImage, setCapturedImage] = useState(null); // State to hold captured image
    const navigate = useNavigate(); // useNavigate for navigation

    const {
        register,
        handleSubmit,
        reset,
        formState: { errors },
    } = useForm();

    const [showPassword, setShowPassword] = useState(false);

    // Backend Login Submission with Image
    const submitLogin = async (data) => {
        if (!capturedImage) {
            // If the photo is not captured yet, open camera
            setCamCapture(true);
        } else {
            // Form submission logic with captured image
            const formData = new FormData();
            formData.append('hospitalName', data.hospitalName);
            formData.append('email', data.email);
            formData.append('password', data.password);
            formData.append('accessCode', data.accessCode);
            formData.append('image', capturedImage); // Include captured image
            console.log("form data",...formData)


            try {
                // Call backend API to submit login details
                const response = await axios.post('http://localhost:8080/api/v1/login', formData);

                console.log("response in login ", response);

                    if (!response.data.success) {
                        throw new Error(response.data.message)
                    }

                    toast.success("Login Successful")
                    console.log('Login successful');
                    // On successful login, navigate to /dashboard
                    navigate('/dashboard');
            } catch (error) {
                toast.error("Error during Login")
                console.error('Error during login:', error.message);
            }

            // Reset form after submission
            reset();
        }
    };

    const handleImageCapture = (image) => {
        setCapturedImage(image);
        setCamCapture(false);
        // Once image is captured, automatically submit the form
        handleSubmit(submitLogin)();
    };

    return (
        <>
            {camCapture ? (
                <div className="flex flex-col gap-20 items-center">
                    <div className="w-96 p-8 mt-14 border rounded-lg shadow-lg">
                        <Webcapture onCapture={handleImageCapture} />
                    </div>
                </div>
            ) : (
                <div className="flex flex-col gap-20 items-center">
                    <div className="w-96 p-8 mt-14 border rounded-lg shadow-lg">
                        <h2 className="text-2xl font-semibold text-center mb-2">
                            Welcome to Sicu-aura
                        </h2>
                        <p className="text-gray-400 text-center mb-6">
                            Your one stop safety solutions using innovative technology
                        </p>
                        <form className="flex flex-col gap-y-10" onSubmit={handleSubmit(submitLogin)}>
                            <div>
                                <input
                                    placeholder="Hospital Name"
                                    name="hospitalName"
                                    id="hospitalName"
                                    {...register("hospitalName", { required: true })}
                                    className="hospitalname w-full border-b-2 border-gray-300 focus:outline-none focus:border-black"
                                    type="text"
                                />
                                {errors.hospitalName && <span>Hospital Name is required</span>}
                            </div>
                            <div>
                                <input
                                    name="email"
                                    id="email"
                                    {...register("email", { required: true })}
                                    placeholder="Email Id"
                                    className="w-full border-b-2 border-gray-300 focus:outline-none focus:border-black"
                                    type="email"
                                />
                                {errors.email && <span>Email is required</span>}
                            </div>
                            <div className="relative">
                                <input
                                    placeholder="Password"
                                    name="password"
                                    id="password"
                                    {...register("password", { required: true })}
                                    type={showPassword ? 'text' : 'password'}
                                    className="w-full border-b-2 border-gray-300 focus:outline-none focus:border-black"
                                />
                                {errors.password && <span>Password is required</span>}
                                <span
                                    className="absolute right-0 top-0 cursor-pointer"
                                    onClick={() => setShowPassword((prev) => !prev)}
                                >
                                    {showPassword ? (
                                        <AiOutlineEyeInvisible fontSize={24} fill="#AFB2BF" />
                                    ) : (
                                        <AiOutlineEye fontSize={24} fill="#AFB2BF" />
                                    )}
                                </span>
                            </div>
                            <div>
                                <input
                                    name="accessCode"
                                    id="accessCode"
                                    {...register("accessCode", { required: true })}
                                    placeholder="Special Access Code"
                                    className="w-full border-b-2 border-gray-300 focus:outline-none focus:border-black"
                                    type="text"
                                />
                                {errors.accessCode && <span>Access Code is required</span>}
                            </div>
                            <button className="w-full bg-black text-white py-2 rounded" type="submit">
                                Login
                            </button>
                        </form>
                    </div>
                </div>
            )}
        </>
    );
};

export default LoginForm;
