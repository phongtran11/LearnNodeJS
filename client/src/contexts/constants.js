export const apiUrl =
    process.env.NODE_ENV !== 'production'
        ? 'http://localhost:5000/api'
        : 'https://dry-cove-51775.herokuapp.com/api';

export const localStorageToken = 'learnIt';
