import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';

interface Client {
  ID: number;
  Name: string;
  image: string;
  phoneNumber: string;
}

const defaultImage = 'https://www.medica.co.il/wp-content/uploads/2023/05/user.jpg';

const ListOfClients = () => {
  const [clients, setClients] = useState<Client[]>([]);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchClients = async () => {
      try {
        const response = await fetch('http://localhost:5000/patient');
        const data: Client[] = await response.json();
        setClients(data);
      } catch (error) {
        console.error('Error fetching clients:', error);
      }
    };

    fetchClients();
  }, []);


  const handleDelete = async (id: number) => {
    if (window.confirm(`Are you sure you want to delete client with ID: ${id}?`)) {
        try {
            const response = await fetch(`http://localhost:5000/patient/${id}`, { 
                method: 'DELETE' 
            });
            if (!response.ok) {
                throw new Error(`HTTP error! Status: ${response.status}`);
            }
            setClients(clients.filter(client => client.ID !== id));
            console.log('Client deleted successfully');
        } catch (error) {
            console.error('Error deleting client:', error);
        }
    }
};


  return (
    <div>
      <h1>List of Clients</h1>
      <div style={{ display: 'flex', flexWrap: 'wrap' }}>
        {clients.map(client => (
          <div
            key={client.ID}
            style={{
              border: '1px solid #ddd',
              borderRadius: '8px',
              padding: '16px',
              margin: '16px',
              width: '200px',
              textAlign: 'center',
            }}
          >
            <h2>{client.Name}</h2>
            <img
              src={client.image || defaultImage}
              alt={client.Name}
              style={{ width: '100%', height: 'auto', borderRadius: '50%' }}
            />
            <p>ID: {client.ID}</p>
            <p>Phone: {client.phoneNumber}</p>
            <div style={{ marginTop: '8px' }}>
              <button
                onClick={() => navigate('/UpdateClientDetails')}
                style={{ marginRight: '8px' }}
              >
                Update Details
              </button>
              <button
                onClick={() => handleDelete(client.ID)}
              >
                Delete Client
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default ListOfClients;
