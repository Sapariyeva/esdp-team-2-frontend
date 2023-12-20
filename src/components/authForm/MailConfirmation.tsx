import { Typography } from 'antd';
import styles from './AuthForm.module.scss';
import { useAppSelector } from '../../store/hooks';
import { RootState } from '../../store';

const { Title, Paragraph } = Typography;

export const MailConfirmation: React.FC = () => {
	const email = useAppSelector(
		(state: RootState) => state.users.userInfo?.email
	);

	return (
		<div className={styles.container_mail_confirmation}>
			<div className={styles.block_mail_confirmation}>
				<Title level={2}>Вход</Title>
				<Paragraph key="1">Войдите по ссылке из почты.</Paragraph>
				<Paragraph key="2">Мы отправили ссылку для входа {email}</Paragraph>
				<img src="/Mail-rafiki_1.png" alt="Mail-rafiki" key="3" />
				<Paragraph key="4">
					Если письмо не пришло, свяжитесь с нами через почту {''}
					<a href="mailto:support@gmail.com">support@gmail.com</a>
				</Paragraph>
			</div>
		</div>
	);
};
