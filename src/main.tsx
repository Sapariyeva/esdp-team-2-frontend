import ReactDOM from 'react-dom/client';
import App from './App.tsx';
import { Provider } from 'react-redux';
import { store, persistor } from './store';
import { PersistGate } from 'redux-persist/integration/react';
import { ConfigProvider } from 'antd';

ReactDOM.createRoot(document.getElementById('root')!).render(
	<Provider store={store}>
		<PersistGate loading={null} persistor={persistor}>
			<ConfigProvider
				theme={{
					token: {
						colorPrimary: '#834eeb',
						borderRadius: 8,
						colorBgContainer: '#ffffff',
					},
					components: {
						Button: {
							colorPrimary: '#834eeb',
							algorithm: true,
						},
						Input: {
							colorPrimary: '#88ff00',
							algorithm: true,
						},
					},
				}}
			>
				<App />
			</ConfigProvider>
		</PersistGate>
	</Provider>
);
