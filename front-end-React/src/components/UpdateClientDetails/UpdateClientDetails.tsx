import React, { useState } from 'react';

const UpdateClientDetails = () => {
  const [id, setId] = useState('');
  const [name, setName] = useState('');
  const [phone, setPhone] = useState('');

  const handleSubmit = (event: React.FormEvent) => {
    event.preventDefault();
    // כאן תוכל להוסיף את הקוד לעדכון פרטי הלקוח
    alert(`Updating client:
      ID: ${id}
      Name: ${name}
      Phone: ${phone}`);
    fetch('http://localhost:5000/patient/update', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ id, name, phone }),
    });
  };

  return (
    <div>
      <h1>Update Client Details</h1>
      <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', width: '300px', margin: 'auto' }}>
        <label htmlFor="id">
          ID
          <input
            type="text"
            id="id"
            value={id}
            onChange={(e) => setId(e.target.value)}
            style={{ marginBottom: '12px', padding: '8px', fontSize: '16px' }}
          />
        </label>
        <label htmlFor="name">
          Name
          <input
            type="text"
            id="name"
            value={name}
            onChange={(e) => setName(e.target.value)}
            style={{ marginBottom: '12px', padding: '8px', fontSize: '16px' }}
          />
        </label>
        <label htmlFor="phone">
          Phone
          <input
            type="text"
            id="phone"
            value={phone}
            onChange={(e) => setPhone(e.target.value)}
            style={{ marginBottom: '12px', padding: '8px', fontSize: '16px' }}
          />
        </label>
        <button
          type="submit"
          style={{ padding: '10px', backgroundColor: '#007bff', color: '#fff', border: 'none', borderRadius: '4px', fontSize: '16px' }}
        >
          Update
        </button>
      </form>
    </div>
  );
};

export default UpdateClientDetails;
