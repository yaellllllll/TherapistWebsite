import React, { useState } from 'react';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';
import backgroundImage from '../../images/2.jpg';


interface RegistrationFormData {
    name: string;
    id: string;
    phone: string;
}

interface RegistrationFormData2 {
    date: Date | null;
    time: string;
    treatmentType: string;
}

const FormPage: React.FC = () => {
    const [patientData, setPatientData] = useState<RegistrationFormData>({
        name: '',
        id: '',
        phone: '',
    });

    const [treatData, setTreatData] = useState<RegistrationFormData2>({
        date: null,
        time: '',
        treatmentType: ''
    });

    const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        const combinedData = { ...patientData, ...treatData };
        alert(JSON.stringify(combinedData)); // Debugging: alert to show combined data
        try {
            const response = await fetch('http://localhost:5000/patient', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(combinedData),
            });

            if (!response.ok) {
                throw new Error('Failed to submit form');
            }

            // Handle success
            console.log('Form submitted successfully!');
        } catch (error) {
            // Handle error
            console.error('Error submitting form:', error);
        }
    };

    const handleDateChange = (date: Date | null) => {
        setTreatData({ ...treatData, date });
    };

    const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
        const { name, value } = e.target;
        setPatientData({ ...patientData, [name]: value });
    };

    const handleInputChange2 = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
        const { name, value } = e.target;
        setTreatData({ ...treatData, [name]: value });
    };

    


 
    return (
        <form onSubmit={handleSubmit} style={{ maxWidth: '400px', margin: '0 auto' }}>
            <h2>טופס הרשמה</h2>

            <div style={{ marginBottom: '10px' }}>
                <label>שם</label>
                <input
                    type="text"
                    name="name"
                    value={patientData.name}
                    onChange={handleInputChange}
                    required
                    style={{ width: '100%', padding: '8px', margin: '4px 0' }}
                />
            </div>

            <div style={{ marginBottom: '10px' }}>
                <label>ת"ז</label>
                <input
                    type="text"
                    name="id"
                    value={patientData.id}
                    onChange={handleInputChange}
                    required
                    style={{ width: '100%', padding: '8px', margin: '4px 0' }}
                />
            </div>

            <div style={{ marginBottom: '10px' }}>
                <label>טלפון</label>
                <input
                    type="text"
                    name="phone"
                    value={patientData.phone}
                    onChange={handleInputChange}
                    required
                    style={{ width: '100%', padding: '8px', margin: '4px 0' }}
                />
            </div>

            <div style={{ marginBottom: '10px' }}>
                <label>תאריך</label>
                <DatePicker
                    selected={treatData.date}
                    onChange={handleDateChange}
                    dateFormat="dd/MM/yyyy"
                    placeholderText="בחר תאריך"
                    withPortal
                />
            </div>

            <div style={{ marginBottom: '10px' }}>
                <label>שעה</label>
                <input
                    type="text"
                    name="time"
                    value={treatData.time}
                    onChange={handleInputChange2}
                    required
                    pattern="\d{4}"
                    placeholder="HHMM"
                    style={{ width: '100%', padding: '8px', margin: '4px 0' }}
                />
            </div>

            <div style={{ marginBottom: '10px' }}>
                <label>סוג הטיפול</label>
                <select
                    name="treatmentType"
                    value={treatData.treatmentType}
                    onChange={handleInputChange2}
                    required
                    style={{ width: '100%', padding: '8px', margin: '4px 0' }}
                >
                    <option value="">בחר סוג טיפול</option>
                    <option value="1">טיפול 1</option>
                    <option value="2">טיפול 2</option>
                    <option value="3">טיפול 3</option>
                </select>
            </div>

            <button type="submit" style={{ padding: '10px 20px', fontSize: '16px' }}>
                שלח
            </button>

        </form>
    );
};


export default FormPage;



