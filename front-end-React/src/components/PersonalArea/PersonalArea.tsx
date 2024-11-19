import React, { useState } from 'react';
import Modal from 'react-modal';
import { useNavigate } from 'react-router-dom';
import backgroundImage from '../../images/2.jpg';


// Styles for the button, similar to the previous component
const buttonStyle: React.CSSProperties = {
    padding: '10px 20px',
    backgroundColor: 'green',
    border: 'none',
    borderRadius: '5px',
    color: 'white',
    cursor: 'pointer',
    fontSize: '16px',
    transition: 'background-color 0.3s ease',
    outline: 'none'
};

// Styles for the form in the modal
const formStyle: React.CSSProperties = {
    display: 'flex',
    flexDirection: 'column',
    padding: '20px',
    gap: '10px'
};

const PersonalArea: React.FC = () => {
    const [modalIsOpen, setModalIsOpen] = useState<boolean>(false);
    const [formData, setFormData] = useState<{ name: string; id: string }>({ name: '', id: '' });

    const handleOpenModal = () => setModalIsOpen(true);
    const handleCloseModal = () => setModalIsOpen(false);

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const { name, value } = e.target;
        setFormData({ ...formData, [name]: value });
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        const id=formData.id;
        try {
            const response = await fetch(`http://localhost:5000/patient/${id}`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(formData),
            });

            if (!response.ok) {
                throw new Error('Failed to submit form');
            }

            // Handle success
            console.log('Form submitted successfully!');
            handleCloseModal(); // Close modal on success
        } catch (error) {
            // Handle error
            console.error('Error submitting form:', error);
        }
    };

    return (
        <div style={{
            backgroundImage: `url(${backgroundImage})`,
            backgroundSize: 'cover',
            height: '100vh',
            color: 'white',
            display: 'flex',
            flexDirection: 'column',
            justifyContent: 'space-between'
        }}>
            <div style={{ padding: '20px', textAlign: 'center' }}>
                <h1>שלום לך</h1>
                <button style={buttonStyle} onClick={handleOpenModal}>
                    להתחברות
                </button>

                <Modal
                    isOpen={modalIsOpen}
                    onRequestClose={handleCloseModal}
                    contentLabel="Login Modal"
                    style={{
                        overlay: {
                            backgroundColor: 'rgba(0, 0, 0, 0.75)',
                        },
                        content: {
                            color: 'lightsteelblue',
                            maxWidth: '400px',
                            margin: 'auto',
                            padding: '20px'
                        }
                    }}
                >
                    <h2>התחברות</h2>
                    <form onSubmit={handleSubmit} style={formStyle}>
                        <label>
                            שם
                            <input
                                type="text"
                                name="name"
                                value={formData.name}
                                onChange={handleChange}
                                required
                                style={{ padding: '8px', borderRadius: '4px', border: '1px solid #ccc' }}
                            />
                        </label>
                        <label>
                            תעודת זהות
                            <input
                                type="text"
                                name="id"
                                value={formData.id}
                                onChange={handleChange}
                                required
                                style={{ padding: '8px', borderRadius: '4px', border: '1px solid #ccc' }}
                            />
                        </label>
                        <button type="submit" style={buttonStyle}>
                            שלח
                        </button>
                        <button type="button" onClick={handleCloseModal} style={{ ...buttonStyle, backgroundColor: 'red' }}>
                            סגור
                        </button>
                    </form>
                </Modal>
            </div>
        </div>
    );
};

export default PersonalArea;
