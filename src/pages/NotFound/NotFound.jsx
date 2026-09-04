import { Link } from 'react-router-dom';
import './NotFound.css';

export default function NotFound() {
    return (
        <div className="not-found">
            <span className="not-found__code">404</span>
            <h2>You've driven off the map</h2>
            <p>The page you're looking for doesn't exist or has moved.</p>
            <Link to="/" className="btn btn-primary">
                Back to Home
            </Link>
        </div>
    );
}