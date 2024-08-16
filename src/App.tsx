import './App.css';
import { IdleTimerProvider } from './auth/components/IdleTimerProvider';
import { AppRouter } from './router/AppRouter';

function App() {
  return (
    <IdleTimerProvider timeout={15 * 60 * 1000}> {/* 15 minutos de inactividad */}
      <AppRouter />
    </IdleTimerProvider>
  );
}

export default App;
