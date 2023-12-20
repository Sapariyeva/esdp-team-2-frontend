import React, { useEffect } from 'react';
import { Result, Typography } from 'antd';
import { NavLink, useNavigate } from 'react-router-dom';

const { Title, Paragraph } = Typography;

export const ActivePage: React.FC = () => {
	const navigate = useNavigate();
	useEffect(() => {
		const confirmationTimeout = setTimeout(() => {
			redirectToHome();
		}, 10000);

		return () => clearTimeout(confirmationTimeout);
	}, []);

	const redirectToHome = () => {
		navigate('/');
	};

	return (
		<>
			<Result
				status="success"
				title={<Title level={2}>Вход</Title>}
				subTitle={
					<>
						<Paragraph key="1">
							Ваша почта успешно подтверждена. Спасибо за подтверждение!
						</Paragraph>
						<NavLink to={'/'} key="5">
							На главную
						</NavLink>
					</>
				}
			/>
		</>
	);
};
