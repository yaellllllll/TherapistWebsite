
import React, { useEffect, useState } from 'react';
import axios from 'axios';
import 'bootstrap/dist/css/bootstrap.min.css';
import './AllWorkshops.scss'; // Custom styles

type User = {
  id: number;
  name: string;
};

const AllWorkshops: React.FC = () => {
  const [users, setUsers] = useState<User[]>([]);

  useEffect(() => {
    axios.get('https://jsonplaceholder.typicode.com/users') // Example API
      .then(response => setUsers(response.data))
      .catch(error => console.error('Error fetching data:', error));
  }, []);

  return (
    <div className="container mt-4">
      <div className="row">
        {users.map(user => (
          <div className="col-lg-3 col-md-4 col-sm-6 mb-4" key={user.id}>
            <div className="card shadow-sm h-100">
              <div className="card-body d-flex flex-column justify-content-center">
                <h5 className="card-title text-center">{user.name}</h5>
                <button className="btn btn-primary mt-2 align-self-center">אני רוצה להירשם</button>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default AllWorkshops;

