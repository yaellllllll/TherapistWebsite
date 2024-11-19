const crypto = require('crypto');
const fs = require('fs');
const pool = require('../DB');
const { logIn } = require('../controllers/patientController');

const algorithm = 'aes-256-cbc';
const key = crypto.randomBytes(32); // 32 bytes for aes-256
const generateIV = () => crypto.randomBytes(16); // 16 bytes for IV

function encrypt(text) {
    const iv = generateIV();
    const cipher = crypto.createCipheriv(algorithm, key, iv);
    let encrypted = cipher.update(text, 'utf8', 'hex');
    encrypted += cipher.final('hex');
    return iv.toString('hex') + ':' + encrypted; // Prepend IV to the encrypted text
}

function decrypt(text) {
    const parts = text.split(':');
    const iv = Buffer.from(parts.shift(), 'hex');
    const encryptedText = parts.join(':');
    const decipher = crypto.createDecipheriv(algorithm, key, iv);
    let decrypted = decipher.update(encryptedText, 'hex', 'utf8');
    decrypted += decipher.final('utf8');
    return decrypted;
}

function logError(error) {
    const errorMessage = `${new Date().toISOString()} - ${error.message}\n`;
    fs.appendFile('LoggerErrors.log', errorMessage, (err) => {
        if (err) console.error('Error writing to log file:', err);
    });
}

async function createPatient(id, name, phone) {
    const encryptedId = encrypt(id.toString());
    const sql = 'INSERT INTO registration.patients (ID, Name, phoneNumber) VALUES (?, ?, ?)';
    try {
        const [result] = await pool.execute(sql, [encryptedId, name, phone]);
        console.log('Data inserted successfully:', result);
        return { message: 'Data received and logged successfully' };
    } catch (error) {
        console.error('Error inserting data:', error);
        logError(error);
        throw new Error('Error inserting data');
    }
}

async function createTreat(date, time, treatmentType, id) {
    const encryptedId = encrypt(id.toString());
    const sql = 'INSERT INTO registration.treatments (Date, Time, TreatmentType, PatientID) VALUES (?, ?, ?, ?)';
    try {
        const [result] = await pool.execute(sql, [date, time, treatmentType, encryptedId]);
        console.log('Data inserted successfully:', result);
        return { message: 'Data received and logged successfully' };
    } catch (error) {
        console.error('Error inserting data:', error);
        logError(error);
        throw new Error('Error inserting data');
    }
}

async function getPatients() {
    const sql = 'SELECT * FROM registration.patients';
    try {
        const [rows, fields] = await pool.query(sql);
        const decryptedRows = rows.map(row => {
            try {
                return {
                    ...row,
                    ID: decrypt(row.ID)
                };
            } catch (error) {
                console.error('Error decrypting row:', error);
                logError(error);
                return {
                    ...row,
                    ID: 'Decryption error'
                };
            }
        });
        console.log(decryptedRows);
        return decryptedRows;
    } catch (error) {
        console.error('Error fetching patients:', error);
        logError(error);
        throw error;
    }
}

async function updateClientDetailsM(id, name, phoneNumber) {
    const encryptedId = encrypt(id.toString());
    const sql = 'UPDATE registration.patients SET Name = ?, phoneNumber = ? WHERE ID = ?';
    try {
        const [result] = await pool.execute(sql, [name, phoneNumber, encryptedId]);
        console.log('Client updated successfully:', result);
        return { message: 'Client updated successfully' };
    } catch (error) {
        console.error('Error updating client:', error);
        logError(error);
        throw new Error('Error updating client');
    }
}

async function deleteP(id) {
    const encryptedId = encrypt(id.toString());
    const sql = 'DELETE FROM registration.patients WHERE ID = ?';
    try {
        const [result] = await pool.execute(sql, [encryptedId]);
        console.log('Client deleted successfully:', result);
        return result;
    } catch (error) {
        console.error('Error deleting client:', error);
        logError(error);
        throw new Error('Error deleting client');
    }
}

async function logInM(id, name) {
    const encryptedId = encrypt(id.toString());
    console.log(encryptedId)
    const encryptedId2 = encrypt(id.toString());
    console.log(encryptedId2)
}

module.exports = { createPatient, getPatients, createTreat, updateClientDetailsM, deleteP, logInM };
