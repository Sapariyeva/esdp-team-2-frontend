import { Show, Typography } from '@pankod/refine-antd';
import { useShow } from '@pankod/refine-core';

const { Title, Text } = Typography;
export const PsychologistsShow: React.FC = () => {
	const { queryResult } = useShow();
	const { data, isLoading } = queryResult;
	const record = data?.data;
	const formatBirthday = (birthday: string) => {
		if (birthday) {
			const date = new Date(birthday);
			const year = date.getFullYear().toString().slice(-2);
			const month = `0${date.getMonth() + 1}`.slice(-2);
			const day = `0${date.getDate()}`.slice(-2);
			const hours = `0${date.getHours()}`.slice(-2);
			const minutes = `0${date.getMinutes()}`.slice(-2);
			const seconds = `0${date.getSeconds()}`.slice(-2);

			return `${year}-${month}-${day} ${hours}:${minutes}:${seconds}`;
		}

		return '';
	};
	return (
		<Show isLoading={isLoading}>
			<Title level={5}>First name</Title>
			<Text>{record?.firstName}</Text>

			<Title level={5}>LastName name</Title>
			<Text>{record?.lastName}</Text>

			<Title level={5}>Birthday</Title>
			<Text>{formatBirthday(record?.birthday)}</Text>

			<Title level={5}>Skills</Title>
			<ul>
				{record?.skills.map((skill: string, index: number) => (
					<li key={index}>{skill}</li>
				))}
			</ul>
		</Show>
	);
};
