import ReactDOM from 'react-dom/client';
import App from './App.tsx';
import { Provider } from 'react-redux';
import { store, persistor } from './store';
import { PersistGate } from 'redux-persist/integration/react';
import { ConfigProvider } from 'antd';
import LocaleProvider from 'antd/es/locale';
import ruRU from 'antd/lib/locale/ru_RU'; // Import the Russian locale for Ant Design

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
						Layout: {
							bodyBg: '#ffffff !important',
							borderRadius: 9,
						},
						Table: {
							colorBgContainer: '#fafaff',
							headerBg: '#a48ce7',
							headerColor: '#f9f8f9',
							rowHoverBg: '#f7f6f9',
						},
					},
				}}
			>
				<LocaleProvider locale={ruRU}>
					<App />
				</LocaleProvider>
			</ConfigProvider>
		</PersistGate>
	</Provider>
);
