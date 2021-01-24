function isMobile(width = 1023) {
		if (window.matchMedia(`(min-width: ${width}px)`)) {
				return (/Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent));
		}
		return false;
}

export { isMobile }
