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
			if (value) {
				await database.ref('users/' + userId).child('days').child(day).update(value);
			} else {
				await database.ref('users/' + userId).child('days').child(day).remove();
			}

		} catch (error) {
			console.error(error);
		}
	}
}
