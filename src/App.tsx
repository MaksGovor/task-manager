import React from 'react';
import './App.css';
import MainPage from 'Pages';
import { OpenAPI as CoreOpenAPi } from 'clients/CoreService';
import { QueryClient, QueryClientProvider } from 'react-query';

CoreOpenAPi.BASE = process.env.REACT_APP_CORE_URL as string;

function App() {
	const queryClient = new QueryClient();

	return (
		<div className='App'>
			<QueryClientProvider client={queryClient}>
				<MainPage></MainPage>
			</QueryClientProvider>
		</div>
	);
}

export default App;
