import React from 'react';
import './App.scss';
import { Routes, Route } from 'react-router-dom';
import { Provider } from 'react-redux';
import { configureStore } from '@reduxjs/toolkit';
import userSlice from './redux/features/userSlice';
import AllWorkshops from './components/AllWorkshops/AllWorkshops';
import FormPage from './components/FormPage/FormPage';
import UpdateClientDetails from './components/UpdateClientDetails/UpdateClientDetails';
import ListOfClients from './components/ListOfClients/ListOfClients';
import OpenPage from './components/OpenPage/OpenPage';
import TreatPage from './components/TreatPage/TreatPage';
import PersonalArea from './components/PersonalArea/PersonalArea';
// import GetTreatDetails from './components/GetTreatDetails/GetTreatDetails';

function App() {
    const myStore = configureStore({
        reducer: {
            user: userSlice
        }
    });

    return (
        <Provider store={myStore}>
            <Routes>
                <Route path="/" element={<OpenPage />} />
                <Route path="/AllWorkshops" element={<AllWorkshops />} />
                <Route path="/PersonalArea" element={<PersonalArea />} />
                <Route path="/FormPage" element={<FormPage />} />
                <Route path="/UpdateClientDetails" element={<UpdateClientDetails />} />
                <Route path="/ListOfClients" element={<ListOfClients />} />
                <Route path="/OpenPage" element={<OpenPage />} />
                <Route path="/TreatPage" element={<TreatPage />} />
                {/* <Route path="/GetTreatDetails" element={<GetTreatDetails />} /> */}
            </Routes>
        </Provider>
    );
}

export default App;
