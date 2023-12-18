import React, { useEffect } from 'react';
import { Typography } from 'antd';
import { NavLink } from 'react-router-dom';
import styles from './AuthForm.module.scss';
// import { useHistory } from 'react-router-dom';

const { Title, Paragraph } = Typography;

export const MailConfirmation: React.FC = () => {
	// const history = useHistory();

	useEffect(() => {
		const confirmationTimeout = setTimeout(() => {
			redirectToHome();
		}, 3000);

		return () => clearTimeout(confirmationTimeout);
	}, []);

	const redirectToHome = () => {
		// history.push('/');
	};

	return (
		<div className={styles.container_mail_confirmation}>
			<div>
				<Title level={2}>Вход</Title>
				<Paragraph key="1">Войдите по ссылке из почты.</Paragraph>
				<Paragraph key="2">Мы отправили ссылку для входа</Paragraph>
				<img src="/Mail-rafiki_1.png" alt="Mail-rafiki" key="3" />
				<Paragraph key="4">
					Если письмо не пришло, свяжитесь с нами через почту {''}
					<a href="mailto:support@gmail.com">support@gmail.com</a>
				</Paragraph>
				<NavLink to={'/'} key="5">
					На главную
				</NavLink>
			</div>
		</div>
	);
};
