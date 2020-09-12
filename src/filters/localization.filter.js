export default function localizationFilter(value) {
	return dictionary[value] || value;
}

const dictionary = {
	'auth/wrong-password' : 'Неверный пароль',
	'auth/too-many-requests': 'Слишком много неудачных попыток входа. Пожалуйста, попробуйте позже',
	'auth/user-not-found': 'Пользователь с таким адресом электронной почты не найден',
	'auth/email-already-in-use' : 'Адрес электронной почты уже используется другим пользователем'
}
