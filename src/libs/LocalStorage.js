export class LocalStorage {
	constructor(name) {
		this.name = name;
	}

	load() {
		if (!localStorage.getItem(this.name)) {
			return [];
		}
		return JSON.parse(localStorage.getItem(this.name));
	}

	save(data) {
		const dataArr = this.load() || [];
		dataArr.push(data);
		localStorage.setItem(this.name, JSON.stringify(dataArr));
	}

	clear() {
		localStorage.removeItem(this.name);
	}
}
