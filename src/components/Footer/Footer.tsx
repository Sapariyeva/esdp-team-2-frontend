import styles from './Footer.module.scss';
import { Row, Col } from 'antd';

export const FooterMenu = () => {
	return (
		<div className={styles.footer_container}>
			<Row gutter={16} justify="space-around">
				<Col span={6}>
					<h2>PRODUCT</h2>
					<ul>
						<li>о Гамма</li>
						<li>Kак подобрать</li>
						<li>Kак работает</li>
						<li>Kак мы подбираем</li>
					</ul>
				</Col>
				<Col span={6}>
					<h2>ДЛЯ БИЗНЕСА</h2>
					<ul>
						<li>Сервисы</li>
						<li>Продукты</li>
						<li>Решения</li>
						<li>Кейсы</li>
					</ul>
				</Col>
				<Col span={6}>
					<h2>ДЛЯ ТЕБЯ</h2>
					<ul>
						<li>Личные услуги</li>
						<li>Отзывы клиентов</li>
					</ul>
				</Col>
				<Col span={6}>
					<h2>КОНТАКТЫ</h2>
					<ul>
						<li>Адрес</li>
						<li>Телефон</li>
						<li>Email</li>
						<li>Форма обратной связи</li>
					</ul>
				</Col>
			</Row>
		</div>
	);
};
