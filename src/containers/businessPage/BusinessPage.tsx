import styles from './BusinessPage.module.scss';
import { Typography, Button, Card } from 'antd';

const { Title, Paragraph } = Typography;

export const BusinessPage = () => {
	return (
		<div className={styles.businesspage}>
			<div className={styles.businesspage_container}>
				<div className={styles.businesspage_container_text}>
					<Title level={1} className={styles.businesspage_title}>
						Поддержите каждого человека в своей команде
					</Title>
					<Paragraph className={styles.businesspage_paragraph}>
						Запустите программу психологической поддержки сотрудников
					</Paragraph>
					<Button
						type="primary"
						size="large"
						className={styles.businesspage_button}
					>
						Оставить заявку
					</Button>
				</div>

				<div>
					<img
						className={styles.businesspage_img}
						src="/Screenshot_6.png"
						alt="girl"
					/>
				</div>
			</div>
			<div className={styles.stress_statistic_container}>
				<Title level={2} className={styles.stress_statistics_title}>
					83% сотрудников страдают от стресса, связанного с работой
				</Title>
				<Paragraph className={styles.stress_statistic_paragraph}>
					по данным{' '}
					<a href="https://www.stress.org/42-worrying-workplace-stress-statistics">
						American Institute of Stress
					</a>
				</Paragraph>
				<div className={styles.stress_statistic_img_container}>
					<img
						className={styles.stress_statistic_img}
						src="/Screenshot_9.png"
						alt="girl"
					/>
				</div>
			</div>

			<div className={styles.plusses_container}>
				<Card className={styles.plusses_card}>
					<Title level={4}>Оценочный тест на выгорание</Title>
					<Paragraph>
						Разработать опросник для оценки уровня выгорания сотрудников.
					</Paragraph>
				</Card>

				<Card className={styles.plusses_card}>
					<Title level={4}>Предоставление консультаций</Title>
					<Paragraph>
						Доступ к консультациям от психологов или специалистов по управлению
						стрессом.
					</Paragraph>
				</Card>

				<Card className={styles.plusses_card}>
					<Title level={4}>Ресурсы для руководителей</Title>
					<Paragraph>
						Обучение руководителей по управлению стрессом, мотивации сотрудников
						и созданию поддерживающей среды в организации.
					</Paragraph>
				</Card>

				<Card className={styles.plusses_card}>
					<Title level={4}>Мониторинг состояния сотрудников</Title>
					<Paragraph>
						Отслеживание общего психологического состояния, мотивации и
						ментального здоровья.
					</Paragraph>
				</Card>
			</div>

			<div className={styles.ask_container}>
				<Title level={2} className={styles.ask_title}>
					Оставьте заявку, и мы предложим подходящий вариант, как усилить ваших
					сотрудников
				</Title>
				<Button type="primary" className={styles.ask_button}>
					Оставить заявку
				</Button>
			</div>
		</div>
	);
};
