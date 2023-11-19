import { Refine } from '@pankod/refine-core';
import {
	notificationProvider,
	Layout,
	ReadyPage,
	ErrorComponent,
} from '@pankod/refine-antd';

import dataProvider from '@pankod/refine-simple-rest';
import routerProvider from '@pankod/refine-react-router-v6';
import { PostList } from './Post/PostList';
import { PostShow } from './Post/PostShow';
import { PostEdit } from './Post/PostEdit';
import { PostCreate } from './Post/PostCreate';
import { PsychologistsList } from './Psychologists/PsychologistsList';
import { PsychologistsShow } from './Psychologists/PsychologistsShow';
import { PsychologistsCreate } from './Psychologists/PsychologistsCreate';
import { PsychologistsEdit } from './Psychologists/PsychologistsEdit';

export const AdminPanel = () => {
	return (
		<Refine
			dataProvider={dataProvider('https://api.fake-rest.refine.dev')}
			notificationProvider={notificationProvider}
			Layout={Layout}
			ReadyPage={ReadyPage}
			catchAll={<ErrorComponent />}
			routerProvider={routerProvider}
			resources={[
				{
					name: 'posts',
					list: PostList,
					show: PostShow,
					edit: PostEdit,
					create: PostCreate,
					canDelete: true,
				},
				{
					name: 'users',
					list: PsychologistsList,
					show: PsychologistsShow,
					edit: PsychologistsEdit,
					create: PsychologistsCreate,
					canDelete: true,
				},
			]}
		/>
	);
};
