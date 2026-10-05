const READY_EVENT = 'site:ready';

export const markSiteReady = () => {
	document.documentElement.dataset.ready = 'true';
	window.dispatchEvent(new Event(READY_EVENT));
};

export const onSiteReady = (callback: () => void) => {
	if (document.documentElement.dataset.ready === 'true') {
		callback();
		return () => undefined;
	}
	window.addEventListener(READY_EVENT, callback, { once: true });
	return () => window.removeEventListener(READY_EVENT, callback);
};
