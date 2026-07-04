import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { useMutation } from '@tanstack/react-query';
import routes from '../routes';
import { useNavigate } from 'react-router-dom';
import Button from '../components/Button';
import { logOut } from '../api/auth/api';
import { useGetUserId } from '@/api/auth/QueryHooks/useGetUserId';
const About = () => {
    const navigate = useNavigate();
    const { data, error, isLoading } = useGetUserId();
    const logOutMutation = useMutation({
        mutationFn: logOut,
        onSuccess: () => {
            localStorage.removeItem('accessToken');
            localStorage.removeItem('submittedFromHomePersistData');
            navigate(routes.AUTH);
        },
        onError: (error) => {
            console.error('Log out failed:', error.message);
        },
    });
    return (_jsxs("div", { children: [_jsx("p", { children: isLoading ? 'Loading...' : 'Loaded!' }), _jsx("p", { children: error ? error.message : 'No error' }), _jsx("p", { children: data?.userId ? `Your user ID is: ${data.userId}` : 'No user ID found.' }), _jsx(Button, { disabled: false, onClick: () => logOutMutation.mutate(), children: "Log Out" })] }));
};
export default About;
