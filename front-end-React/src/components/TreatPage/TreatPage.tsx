import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';


const TreatPage = () => {
    const [selectedImage, setSelectedImage] = useState(null);
    const navigate = useNavigate();

    const images = [
        'https://www.silvaisrael.co.il/wp-content/uploads/2023/02/%D7%94%D7%A2%D7%A6%D7%9E%D7%94-%D7%90%D7%99%D7%A9%D7%99%D7%AA.jpg',
        'https://sigalkassif.co.il/wp-content/uploads/2021/07/218422086_4155453021191036_2617671337949033402_n-300x200.jpg',
        'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRGYjDCBPNle9cvtFuaCx5Ba48VKGSUJVUXdA&s'
    ];

    const handleImageClick = (index:any) => {
        setSelectedImage(index);
    };

    return (
        <div style={{ textAlign: 'center', margin: '20px' }}>
            <h1>בחירת סוג טיפול</h1>
            <div style={{ display: 'flex', justifyContent: 'center' }}>
                {images.map((image, index) => (
                    <div key={index} style={{ position: 'relative', margin: '10px' }}>
                        <img
                            src={image}
                            alt={`Treatment ${index + 1}`}
                            onClick={() => handleImageClick(index)}
                            style={{
                                width: '200px',
                                height: '200px',
                                cursor: 'pointer',
                                border: selectedImage === index ? '5px solid green' : 'none'
                            }}
                        />
                        {selectedImage === index && (
                            <div
                                style={{
                                    position: 'absolute',
                                    top: '10px',
                                    right: '10px',
                                    backgroundColor: 'green',
                                    color: 'white',
                                    borderRadius: '50%',
                                    width: '30px',
                                    height: '30px',
                                    display: 'flex',
                                    alignItems: 'center',
                                    justifyContent: 'center',
                                    fontSize: '20px'
                                }}
                            >
                                ✔
                            </div>
                        )}
                    </div>
                ))}
            </div>
            <button style={{ marginTop: '20px', padding: '10px 20px', fontSize: '16px' }} onClick={() => navigate('/FormPage')}>
                מעבר למילוי לפרטים
            </button>
        </div>
    );
};

export default TreatPage;

