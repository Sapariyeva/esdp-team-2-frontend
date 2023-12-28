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
					},
					components: {
						Button: {
							colorPrimary: '#834eeb',
							algorithm: true,
						},
						Input: {
							colorPrimary: '#8031b7',
							algorithm: true,
						},

						Table: {
							headerBg: '#FFF',
							headerColor: '#9F9F9F',
							fontFamily: 'Montserrat',
							fontWeightStrong: 400,
							borderRadius: 10,
						},
						Slider: {
							colorBgBase: 'transparent',
						},
						Tooltip: {
							colorBgBase: '#9F9F9F !important',
						},
					},
				}}
			>
				<App />
			</ConfigProvider>
		</PersistGate>
	</Provider>
);
