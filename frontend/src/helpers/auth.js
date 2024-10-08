// helpers/auth.js
export const isAuthenticated = () => {
    if (typeof window == 'undefined') {
        return false;
    }

    if (localStorage.getItem('token')) {
        return JSON.parse(localStorage.getItem('token'));
    } else {
        return false;
    }
};
