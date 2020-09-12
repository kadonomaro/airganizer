export default function localizationFilter(value) {
	return dictionary[value] || value;
}

const dictionary = {
	'The email address is already in use by another account.': 'Адрес электронной почты уже используется другой учетной записью.'
}
