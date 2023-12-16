import { CloseCircleFilled } from '@ant-design/icons';
import { InputNumber } from 'antd';

interface ClearableInputNumberProps {
	value?: number | undefined;
	onChange: (value?: number) => void;
	placeholder?: string;
}

const ClearableInputNumber: React.FC<ClearableInputNumberProps> = ({
	value,
	onChange,
	placeholder,
}) => {
	const handleClear = () => {
		onChange(undefined);
	};

	return (
		<div style={{ position: 'relative' }}>
			<InputNumber
				min={0}
				style={{ width: '250px' }}
				placeholder={placeholder}
				value={value}
				onChange={(newValue) => onChange(newValue as number)}
			/>
			{value !== undefined && (
				<CloseCircleFilled
					onClick={handleClear}
					style={{
						position: 'absolute',
						right: '25px',
						top: '50%',
						transform: 'translateY(-50%)',
						cursor: 'pointer',
					}}
				/>
			)}
		</div>
	);
};

export default ClearableInputNumber;
