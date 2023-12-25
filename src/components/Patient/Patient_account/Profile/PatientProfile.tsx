import { ChangeEvent, useState } from 'react';
import styles from './PatientProfile.module.scss';
import { useAppDispatch, useAppSelector } from '../../../../store/hooks';
import { IUserEdit } from '../../../../interfaces/IUserEdit';
import { usePostEditUserName } from '../../../../features/queryHooks/queryHooks';
import { message } from 'antd';
import { updateUser } from '../../../../features/user/userSlice';

function PatientProfile() {
	const [active, setActive] = useState(false);
	const goToEdit = () => {
		if (active === false) {
			setActive(true);
		} else {
			setActive(false);
		}
	};

	const userInfo = useAppSelector((state) => state.users.userInfo);
	const [email, setEmail] = useState(userInfo?.email);
	const [password, setPassword] = useState('');
	const [currentPassword, setCurrentPassword] = useState('');
	const [phone, setPhone] = useState(userInfo?.phone);
	const [name, setName] = useState(userInfo?.patient?.name);
	const [user, setUser] = useState<IUserEdit>({
		email: '',
		password: '',
		phone: '',
		name: '',
		сurrentPassword: '',
	});
	const onChangeHandlerName = (e: ChangeEvent<HTMLInputElement>) => {
		setName(e.target.value);
	};
	const onChangeHandlerMail = (e: ChangeEvent<HTMLInputElement>) => {
		setEmail(e.target.value);
	};
	const onChangeHandlerPassword = (e: ChangeEvent<HTMLInputElement>) => {
		setPassword(e.target.value);
	};
	const onChangeHandlerCurrentPassword = (e: ChangeEvent<HTMLInputElement>) => {
		setCurrentPassword(e.target.value);
	};
	const onChangeHandlerPhone = (e: ChangeEvent<HTMLInputElement>) => {
		setPhone(e.target.value);
	};
	const { mutate: postName } = usePostEditUserName();
	const dispatch = useAppDispatch();
	const postChanges = () => {
		user.email = email;
		user.name = name;
		user.password = password;
		user.сurrentPassword = currentPassword;
		user.phone = phone;
		setUser(user);
		dispatch(updateUser(user));
		message.success('Ваши изменения приняты');
		if (name) {
			postName({ name: name, userId: userInfo?.patient?.id });
		}
	};
	return (
		<div className={styles.edit_container}>
			{active ? (
				<>
					<div className={styles.btn_flex}>
						<button onClick={postChanges} className={styles.btn_confirm}>
							Применить
						</button>
						<button onClick={goToEdit} className={styles.btn_cancel}>
							Отменить изменения
						</button>
					</div>

					<div className={styles.input_container}>
						<div className={styles.input_block_top}>
							<label>ФИО</label>
							<input onChange={onChangeHandlerName} type="text" value={name} />
						</div>
						<div className={styles.input_block_top}>
							<label>Телефон</label>
							<input
								onChange={onChangeHandlerPhone}
								type="text"
								value={phone}
							/>
						</div>
					</div>
					<div className={styles.input_container}>
						<div className={styles.input_block_small}>
							<label>Почта</label>
							<input onChange={onChangeHandlerMail} type="text" value={email} />
						</div>
						<div className={styles.flex_input}>
							<div className={styles.input_block_small}>
								<label>Текущий пароль</label>
								<input
									onChange={onChangeHandlerCurrentPassword}
									value={currentPassword}
									type="text"
								/>
							</div>
							<div className={styles.input_block_small}>
								<label>Новый пароль</label>
								<input
									onChange={onChangeHandlerPassword}
									value={password}
									type="text"
								/>
							</div>
						</div>
					</div>
				</>
			) : (
				<>
					<button onClick={goToEdit} className={styles.btn_edit}>
						Редактировать
					</button>
					<div className={styles.input_container}>
						<div className={styles.input_block_top}>
							{' '}
							<label>ФИО</label>
							<input type="text" disabled value={name} />
						</div>
						<div className={styles.input_block_top}>
							<label>Телефон</label>
							<input type="text" disabled value={phone} />
						</div>
					</div>
					<div className={styles.input_container}>
						<div className={styles.input_block_small}>
							<label>Почта</label>
							<input type="text" disabled value={email} />
						</div>
						<div className={styles.flex_input}>
							<div className={styles.input_block_small}>
								<label>Текущий пароль</label>
								<input disabled type="text" value={currentPassword} />
							</div>
							<div className={styles.input_block_small}>
								<label>Новый пароль</label>
								<input disabled type="text" value={password} />
							</div>
						</div>
					</div>
				</>
			)}
		</div>
	);
}
export default PatientProfile;
