export class LocalStorage {
	constructor(key) {
		this.key = key;
	}

	load() {
		if (!localStorage.getItem(key)) {
			return [];
		}
		return JSON.parse(localStorage.getItem(key) || '{}');
	}

	save(data) {
		localStorage.setItem(key, JSON.stringify(data));
	}

	clear() {
		localStorage.removeItem(key);
	}
}
