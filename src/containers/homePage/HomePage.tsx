import ViewedPsychologists from '../psychologists/viewed_psychologists/ViewedPsychologists.tsx';
import { articles } from '../../mocks/articles.ts';
import { ArticleCard } from '../../components/article/articleCard/ArticleCard.tsx';
import styles from './HomePage.module.scss';
import { Typography, Button } from 'antd';

const { Title, Paragraph } = Typography;

export const HomePage = () => {
	const lastThreeArticles = articles.slice(-3);
	return (
		<div className={styles.homepage}>
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
			<Title level={2} className={styles.articles_title}>
				Полезные статьи о терапии
			</Title>
			<div className={styles.articles_container}>
				{lastThreeArticles.map((article, index) => (
					<ArticleCard key={index} article={article} />
				))}
			</div>
			<div className={styles.ask_container}>
				<Title level={2} className={styles.ask_title}>
					Реши свой вопрос в один клик
				</Title>
				<Button type="primary" className={styles.ask_button}>
					Спросить
				</Button>
			</div>
			<ViewedPsychologists />
		</div>
	);
};
