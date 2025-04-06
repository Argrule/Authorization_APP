import { useNavigate } from 'react-router-dom';
import './NavBar.css';

const NavBar = () => {
    const navigate = useNavigate();

    const navItems = [
        { id: 1, name: 'Config', path: '/' },
        { id: 2, name: 'Login', path: '/log' },
        { id: 3, name: 'Register', path: '/register' },
        { id: 4, name: 'Settings', path: '/settings' },
    ];

    const handleNavClick = (path) => {
        navigate(path);
    };

    return (
        <nav className="navbar">
            {navItems.map((item) => (
                <div
                    key={item.id}
                    className={`nav-item ${location.pathname === item.path ? 'active' : ''}`}
                    onClick={() => handleNavClick(item.path)}
                >
                    <span>{item.name}</span>
                </div>
            ))}
        </nav>
    );
};

export default NavBar;