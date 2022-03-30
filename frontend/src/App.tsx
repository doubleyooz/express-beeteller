import { AuthProvider } from './context/AuthProvider';
import { LanguageProvider } from './context/LanguageProvider';
import './global.scss';
import Routes from './routes';

function App() {
    return (
        <div className="app">
            <AuthProvider>
                <LanguageProvider>
                    <Routes />
                </LanguageProvider>
                
            </AuthProvider>
        </div>
    );
}

export default App;
