import { database } from '../main';

export class Database {

	async fill(userId, days) {
		try {
			await database.ref('users/' + userId).child('days').update(days);
		} catch (error) {
			console.error(error);
		}
	}

	async update(userId, day, value) {
		try {
			await database.ref('users/' + userId).child('days').child(day).update(value || {});
		} catch (error) {
			console.error(error);
		}
	}
}
