
import { Link } from 'react-router';

const Logo = () => {
    return (
        <div>
            <Link to="/" className="flex text-center items-center space-x-2">
                <img
                    src="https://www.bnpa.bd/image_file/Whats-App-Image-2026-04-11-at-2-30-32-PM.jpg" 
                    alt="BNPA Logo"
                    className="h-16  object-contain"
                />
            </Link>
        </div>
    );
};

export default Logo;