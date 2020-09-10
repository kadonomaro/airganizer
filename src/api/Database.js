import { database } from '../main';

export class Database {

	async fill(userId, days) {
		await database
			.ref('users/' + userId)
			.child('days')
			.update(days);
	}

	async update(userId, day, value) {
		await database
			.ref('users/' + userId)
			.child('days')
			.child(day)
			.update(value);
	}
}
