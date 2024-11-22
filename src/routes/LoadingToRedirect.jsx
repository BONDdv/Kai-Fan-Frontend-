import React, { useEffect, useState } from 'react';
import { Navigate } from 'react-router-dom';
import foodImage from '../assets/food-image.png'; 

const LoadingToRedirect = () => {
    const [redirect, setRedirect] = useState(false);

    useEffect(() => {
        
        const timeout = setTimeout(() => {
            setRedirect(true);
        }, 30000);

        
        return () => clearTimeout(timeout);
    }, []);

    
    if (redirect) {
        return <Navigate to="/" />;
    }

    return (
        <div className="flex justify-center items-center min-h-screen bg-gray-100">
            <img
                src={foodImage}
                alt="Loading food"
                className="w-64 h-64 animate-spin-slow"
            />
        </div>
    );
};

export default LoadingToRedirect;
