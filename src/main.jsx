import ReactDOM from 'react-dom/client';
import { QueryClient, QueryClientProvider } from 'react-query';
import { BrowserRouter } from 'react-router-dom';
import App from './App';
import { BlogContextProvider } from './reducers/BlogContext';
import { NotificationContextProvider } from './reducers/NotificationContext';
import { UserContextProvider } from './reducers/UserContext';

const queryClient = new QueryClient();

ReactDOM.createRoot(document.getElementById('root')).render(
  <QueryClientProvider client={queryClient}>
    <UserContextProvider>
      <BlogContextProvider>
        <NotificationContextProvider>
          <BrowserRouter>
            <App />
          </BrowserRouter>
        </NotificationContextProvider>
      </BlogContextProvider>
    </UserContextProvider>
  </QueryClientProvider>
);
