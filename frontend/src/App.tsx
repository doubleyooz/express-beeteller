import { AuthProvider } from './context/AuthProvider';
import './global.scss';
import Routes from './routes';

function App() {
    return (
        <div className="app">
            <AuthProvider>
                <Routes />
            </AuthProvider>
        </div>
    );
}

export default App;
