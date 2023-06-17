import { useEffect } from 'react';
type ThandleList = {
	keyList: string[];
	cb: Function;
}[];

export const usePressKeyboard = (
	handleList: ThandleList,
	{
		isCheckBubble = true,
		enabled = true,
		depd = []
	}: {
		isCheckBubble?: boolean;
		enabled?: boolean;
		depd?: Array<string | number>;
	}
) => {
	const dependencies = [isCheckBubble, enabled, ...depd];
	useEffect(() => {
		const isKeyPress = {};
		if (!enabled) return;
		function checkKeyPress(event) {
			let isExcecuted = true;
			if (isCheckBubble) {
				isExcecuted = checkIsBubbleFromInput(event);
			}
			if (!isExcecuted) return;
			isKeyPress[event.key] = true;
			handleList.forEach((handleItem) => {
				const { keyList, cb } = handleItem;
				const isRunCallback = keyList.every((key) => isKeyPress[key] === true);
				if (isRunCallback) cb();
			});
		}

		function removeKeyPress(event) {
			isKeyPress[event.key] = false;
		}

		document.addEventListener('keydown', checkKeyPress);
		document.addEventListener('keyup', removeKeyPress);
		return () => {
			document.removeEventListener('keydown', checkKeyPress);
			document.removeEventListener('keyup', removeKeyPress);
		};
	}, dependencies);
};

const checkIsBubbleFromInput = (event) => {
	let paths = event?.path;
	// console.log({ paths });

	if (!paths) return true; // cái này trường hợp dùng với chrome dev tool, Firefox thì sẽ không chặn lại khi đang focus vô thẻ input, update sau
	const _isExcecuted = paths?.every((path) => {
		return path.tagName !== 'INPUT' && path.tagName !== 'AREA';
	});
	return _isExcecuted;
};
