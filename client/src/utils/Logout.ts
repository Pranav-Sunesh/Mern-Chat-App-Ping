

export const logout = (navigate: any, removeCookie: any): void =>{
    removeCookie("token", {path: '/'});
    navigate('/login');
} 