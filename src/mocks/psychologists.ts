import { ICertificate } from '../interfaces/IPsychologistForm';
import { IPsychologist } from '../interfaces/IPsychologist';

const randomNumber: (max: number) => () => number = (max) => {
	return (): number => {
		return Math.floor(Math.random() * max);
	};
};

const createArrayCertificates: (length: number) => () => ICertificate[] = (
	length
) => {
	const certificates: string[] = [
		'sertifikat-na-shlangi-sobstvennoe-proizvodstvo-2020-1.jpg',
		'sertifikat-na-shlangi-sobstvennoe-proizvodstvo-2020-2.jpg',
		'sertifikat-dilera-masterflex-1-1.jpg',
		'sertifikat-predstavitelstva-espiroflex-russian-hoses-2019-1-1.jpg',
		'sertifikat-sootvetstviya-espiroflex-2018-1.jpg',
	];

	const getRandomIndexCertificate: () => number = randomNumber(
		certificates.length
	);

	let counterCertificate: number = 1;
	let counterPsychologist: number = 1;

	return (): ICertificate[] => {
		const psychologistId: number = counterPsychologist++;
		const getLengthArray: () => number = randomNumber(length);

		return new Array<null>(getLengthArray() + 1).fill(null).map(() => {
			return {
				id: counterCertificate++,
				sertificate: certificates[getRandomIndexCertificate()],
				psychologistId,
			};
		});
	};
};

const getCertificates: () => ICertificate[] = createArrayCertificates(3);

const psychologists: IPsychologist[] = [
	{
		id: 1,
		fullName: 'Алексей Иванов',
		format: 'online',
		cost: 23750,
		gender: 'male',
		video: 'https://www.youtube.com/watch?v=tkvtGusJt6E',
		photo: 'crop-6125cd2b3eb69.jpeg',
		experienceYears: 7,
		description: 'Специализируется на работе с детьми и подростками.',
		education: 'Доктор психологии, Университет ABC',
		isPublish: false,
		city: {
			id: 1,
			name: 'Алматы',
		},
		certificates: getCertificates(),
	},
	{
		id: 2,
		fullName: 'Елена Петрова',
		format: 'offline',
		cost: 33250,
		gender: 'female',
		video: 'https://www.youtube.com/watch?v=-qbP6H2CfD8',
		photo: 'crop-5d77dd48a332d.png',
		experienceYears: 10,
		description: 'Помогает клиентам развивать навыки управления стрессом.',
		education: 'Магистр клинической психологии, Институт XYZ',
		isPublish: true,
		city: {
			id: 2,
			name: 'Астана',
		},
		certificates: getCertificates(),
	},
	{
		id: 3,
		fullName: 'Игорь Смирнов',
		format: 'online',
		cost: 28500,
		gender: 'male',
		video: 'https://www.youtube.com/watch?v=cKEBuv9bH2g',
		photo: 'crop-5d77dc467ff0a.png',
		experienceYears: 8,
		description: 'Эксперт по психологии межличностных отношений.',
		education: 'Доктор философии в психологии, Университет DEF',
		isPublish: true,
		city: {
			id: 3,
			name: 'Караганда',
		},
		certificates: getCertificates(),
	},
	{
		id: 4,
		fullName: 'Мария Соколова',
		format: 'online',
		cost: 26125,
		gender: 'female',
		video: 'https://www.youtube.com/watch?v=s05aHA45Uq4',
		photo: 'crop-5d77ddbceec5a.png',
		experienceYears: 6,
		description: 'Специализируется на психологии семейных отношений.',
		education: 'Бакалавр психологии, Университет GHI',
		isPublish: false,
		city: {
			id: 1,
			name: 'Алматы',
		},
		certificates: getCertificates(),
	},
	{
		id: 5,
		fullName: 'Андрей Козлов',
		format: 'offline',
		cost: 35625,
		gender: 'male',
		video: 'https://www.youtube.com/watch?v=ntV05Gn81Wg',
		photo: 'crop-5d78f6ca08254.png',
		experienceYears: 12,
		description: 'Специализируется на психотерапии зависимостей.',
		education: 'Доктор наук по клинической психологии, Университет JKL',
		isPublish: true,
		city: {
			id: 1,
			name: 'Алматы',
		},
		certificates: getCertificates(),
	},
	{
		id: 6,
		fullName: 'Евгения Новикова',
		format: 'offline',
		cost: 30875,
		gender: 'female',
		video: 'https://www.youtube.com/watch?v=DaABXksQiMk',
		photo: 'crop-5d77df5d587f3.png',
		experienceYears: 9,
		description: 'Эксперт по психологии развития личности.',
		education: 'Магистр психологии, Университет MNO',
		isPublish: true,
		city: {
			id: 1,
			name: 'Алматы',
		},
		certificates: getCertificates(),
	},
	{
		id: 7,
		fullName: 'Павел Сидоров',
		format: 'online',
		cost: 28500,
		gender: 'male',
		video: 'https://www.youtube.com/watch?v=pNK4P8PMkeg',
		photo: 'crop-61261b3f9f557.jpeg',
		experienceYears: 11,
		description: 'Специализируется на психотерапии тревожных расстройств.',
		education: 'Доктор психологии, Университет PQR',
		isPublish: true,
		city: {
			id: 1,
			name: 'Кокшетау',
		},
		certificates: getCertificates(),
	},
	{
		id: 8,
		fullName: 'Ольга Кузнецова',
		format: 'offline',
		cost: 38000,
		gender: 'female',
		video: 'https://www.youtube.com/watch?v=jL6QG2UQUu8',
		photo: 'crop-5d78ec309414c.png',
		experienceYears: 15,
		description: 'Эксперт по психологии собственной ценности и самооценки.',
		education: 'Доктор философии в психологии, Университет STU',
		isPublish: false,
		city: {
			id: 4,
			name: 'Кокшетау',
		},
		certificates: getCertificates(),
	},
	{
		id: 9,
		fullName: 'Дмитрий Морозов',
		format: 'online',
		cost: 26125,
		gender: 'male',
		video: 'https://www.youtube.com/watch?v=0jegjTh87Mc',
		photo: 'crop-5d3f40006e44e.jpeg',
		experienceYears: 7,
		description: 'Специализируется на психологии развития детей с ОВЗ.',
		education: 'Бакалавр специальной психологии, Университет VWX',
		isPublish: true,
		city: {
			id: 4,
			name: 'Кокшетау',
		},
		certificates: getCertificates(),
	},
	{
		id: 10,
		fullName: 'Анна Королева',
		format: 'offline',
		cost: 33250,
		gender: 'female',
		video: 'https://www.youtube.com/watch?v=iFe6h9LOlig',
		photo: 'crop-6125d17a6ff37.jpeg',
		experienceYears: 10,
		description: 'Эксперт по психологии семейной гармонии.',
		education: 'Магистр психологии, Университет YZ',
		isPublish: true,
		city: {
			id: 2,
			name: 'Астана',
		},
		certificates: getCertificates(),
	},
];

const psychologistsMock = {
	api: {
		psychologists: 'https://pervaya.kz/storage/doctors/',
		certificates: 'https://promshlangi.kz/wp-content/uploads/2020/09/',
	},
	psychologists,
};

export default psychologistsMock;
