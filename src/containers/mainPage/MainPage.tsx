import AboutContent from '../../components/mainPage/aboutContent/AboutContent';
import BreathBlock from '../../components/mainPage/breathBlock/BreathBlock';
import FeelingsBlock from '../../components/mainPage/feelingsBlock/FeelingsBlock';
import './MainPage.scss';
export const MainPage = () => {
	return (
		<div className="main-page">
			<AboutContent />
			<BreathBlock />
			<FeelingsBlock />
		</div>
	);
};
