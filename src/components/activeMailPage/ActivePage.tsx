import React, { useEffect } from 'react';
import { Result, Typography } from 'antd';
import { NavLink, useNavigate } from 'react-router-dom';
import styles from './ActiveMailPage.module.scss';
import { useAppDispatch, useAppSelector } from '../../store/hooks';
import { activateEmail } from '../../features/user/userSlice';
import { RootState } from '../../store';

const { Title, Paragraph } = Typography;

export const ActivePage: React.FC = () => {
	const navigate = useNavigate();
	const dispatch = useAppDispatch();
	const id = useAppSelector((state: RootState) => state.users.userInfo?.id);

	useEffect(() => {
		dispatch(activateEmail(id!));

		const confirmationTimeout = setTimeout(() => {
			redirectToHome();
		}, 10000);

		return () => clearTimeout(confirmationTimeout);
	}, [id]);

	const redirectToHome = () => {
		navigate('/');
	};

	return (
		<div className={styles.container_active_page}>
			<Result
				status="success"
				title={
					<Title className={styles.title_active_page} level={2}>
						Вход
					</Title>
				}
				subTitle={
					<>
						<Paragraph className={styles.paragraph_active_page} key="1">
							Ваша почта успешно подтверждена. Спасибо за подтверждение!
						</Paragraph>
						<NavLink className={styles.button_active_page} to={'/'} key="5">
							На главную
						</NavLink>
					</>
				}
			/>
		</div>
	);
};
