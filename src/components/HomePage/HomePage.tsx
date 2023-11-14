import { articles } from '../../mocks/HomePage';
import styles from './HomePage.module.scss';
import { Layout, Typography, Button, Card, Tooltip } from 'antd';

const { Content } = Layout;
const { Title, Paragraph } = Typography;

export const HomePage = () => {
	return (
		<Layout>
			<Content className={styles.homepage}>
				<div className={styles.homepage_container}>
					<div className={styles.homepage_container_text}>
						<Title level={1} className={styles.homepage_title}>
							Подберем психолога под ваш запрос
						</Title>
						<Paragraph className={styles.homepage_paragraph}>
							Поможем быстро найти подходящего специалиста
						</Paragraph>
						<Button
							type="primary"
							size="large"
							className={styles.homepage_button}
						>
							Подобрать психолога
						</Button>
					</div>

					<div>
						<img
							className={styles.homepage_img}
							src="/Screenshot_7.png"
							alt="girl"
						/>
					</div>
				</div>
				<Title className={styles.articles_title}>
					Полезные статьи о терапии
				</Title>
				<div className={styles.articles_container}>
					{articles.map((article, index) => (
						<Card
							key={index}
							hoverable
							style={{ width: 420, margin: 16 }}
							cover={
								<div
									style={{
										display: 'flex',
										justifyContent: 'center',
										alignItems: 'center',
										height: '100%',
									}}
								>
									<img
										alt={article.title}
										src={article.image}
										style={{ maxWidth: '90%' }}
									/>
								</div>
							}
						>
							<Card.Meta
								title={
									<Tooltip
										title={article.title}
										style={{
											lineHeight: 1.5,
											maxHeight: 'none',
											overflow: 'visible',
										}}
									>
										{article.title}
									</Tooltip>
								}
								description={article.content}
							/>
						</Card>
					))}
				</div>
				<div className={styles.ask_container}>
					<Title className={styles.ask_title}>
						Реши свой вопрос в один клик
					</Title>
					<Button type="primary" className={styles.ask_button}>
						Спросить
					</Button>
				</div>
			</Content>
		</Layout>
	);
};
