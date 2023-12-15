import styles from './Alert.module.scss';
import info_svg from '../../../../public/info-circle.svg';
type Props = {
	message: string;
};

const Alert = ({ message }: Props) => {
	return (
		<div className={styles.popup}>
			<img src={info_svg} alt="info" />
			<h3>{message}</h3>
		</div>
	);
};

export default Alert;
