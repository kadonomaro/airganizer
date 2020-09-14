import { database } from '../main';

export class Database {

	async load(userId) {
		try {
			const response = await database.ref('users/' + userId).child('days').once('value');
			return response.val();
		} catch (error) {
			console.error(error);
		}
	}

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
