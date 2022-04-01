import { LanguageProvider } from './context/LanguageProvider';
import './global.scss';
import Routes from './routes';

function App() {
    return (
        <div className="app">
            <LanguageProvider>
                <Routes />
            </LanguageProvider>
        </div>
    );
}

export default App;
