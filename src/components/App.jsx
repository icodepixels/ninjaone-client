import AppContent from '@/components/AppContent';
import store from '@/store/store';
import { Provider } from 'react-redux';

function App() {
  return (
    <Provider store={store}>
      <AppContent />
    </Provider>
  );
}

export default App;
