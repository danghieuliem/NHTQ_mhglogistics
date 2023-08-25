import React from 'react';
import Lottie from 'react-lottie';
import * as notFound from '~/assets/json/mvd-notfound.json';

export const MvdNotFound = () => {
	const defaultOptions = {
		loop: true,
		autoplay: true,
		animationData: notFound,
		rendererSettings: {
			preserveAspectRatio: 'xMidYMid slice'
		}
	};

	return (
		<div className='w-[40vw] m-auto h-[100vh] flex flex-col items-center justify-center'>
			<Lottie options={defaultOptions} width={'100%'} height={"400px"} />
      <h1
        className='text-center font-bold text-lg text-red w-full'
      >Mã vận đơn không tồn tại!</h1>
		</div>
	);
};
