import * as React from 'react';
// normally this is going to implement a similar pattern
// learn more here: https://kcd.im/auth


// make a new auth context with default value
const AuthContext = React.createContext({
    user: {username: 'jakiechan', tagline: '', bio: ''},
});

AuthContext.displayName = 'AuthContext'

const AuthProvider = ({user, ...props}: Record<string, any>) => (
    <AuthContext.Provider value={user} {...props} />
);

// this function just consumers auth context and returns it
function useAuth() {
    return React.useContext(AuthContext);
}

export {AuthProvider, useAuth}

