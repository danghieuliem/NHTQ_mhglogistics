import React from 'react';
import Lottie from 'react-lottie';
import * as notFound from '~/assets/json/404.json';

const styles = `bg-white h-[80vh] w-[90vw] flex items-center justify-center fixed top-[50%] left-[50%] translate-x-[-50%] translate-y-[-50%]`

export const NotFound = () => {
	const defaultOptions = {
		loop: true,
		autoplay: true,
		animationData: notFound,
		rendererSettings: {
			preserveAspectRatio: 'xMidYMid slice'
		}
	};

	return (
		<div className={styles}>
			<Lottie options={defaultOptions} width={'auto'} height={450} />
		</div>
	);
};
