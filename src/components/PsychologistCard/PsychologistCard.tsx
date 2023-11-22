import React from 'react';
import { Card } from 'antd';
import { IPsychologist } from '../../interfaces/IPsychologist';
import { HeartOutlined } from '@ant-design/icons';
import { useNavigate } from 'react-router-dom';

const { Meta } = Card;

interface PsychologistCardProps {
	psychologist: IPsychologist;
}

export const PsychologistCard: React.FC<PsychologistCardProps> = ({
	psychologist,
}) => {
	const navigate = useNavigate();
	const {
		fullName,
		education,
		description,
		city,
		cost,
		photo,
		experienceYears,
		format,
	} = psychologist;

	return (
		<Card
			hoverable
			onClick={() => navigate('/psychologists/catalog/:id')}
			style={{ width: 300, position: 'relative', cursor: 'pointer' }}
			cover={
				<div style={{ position: 'relative', width: '100%', height: 200 }}>
					<div style={{ position: 'absolute', top: 9, right: 14 }}>
						<span style={{ fontSize: '21px' }}>
							<HeartOutlined />
						</span>
					</div>
					<img
						alt={fullName}
						src={photo}
						style={{ width: '100%', height: '100%', objectFit: 'cover' }}
					/>
				</div>
			}
		>
			<Meta
				title={fullName}
				description={
					<>
						<p>{`Образование: ${education}`}</p>
						<p>{`Опыт: ${experienceYears} лет`}</p>
						<p>{`Формат: ${format}`}</p>
						<p>{`Стоимость: ${cost} тг`}</p>
						<p>{`Город: ${city.name}`}</p>
						<p>{`О себе: ${description}`}</p>
					</>
				}
			/>
		</Card>
	);
};
