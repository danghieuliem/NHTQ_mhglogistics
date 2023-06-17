import clsx from 'clsx';
import React, { FC } from 'react';

type TProps = {
	title: string;
	onClick?: (data?: any) => void | Promise<any>;
	btnClass?: string;
	btnTextClass?: string;
	showLoading?: boolean;
	disabled?: boolean;
};

export const Button: FC<TProps> = ({
	onClick,
	title,
	btnClass,
	btnTextClass,
	showLoading = false,
	disabled = false
}) => {
	const [loading, setLoading] = React.useState(false);
	const _onPress = async () => {
		if (onClick) {
			if (showLoading) {
				try {
					setLoading(true);
					await onClick();
				} catch (error) {
				} finally {
					setLoading(false);
				}
			} else {
				onClick();
			}
		}
	};

	return (
		<div
			className={clsx(
				'bg-gray relative min-w-[80px] rounded-[4px] px-2 py-1 mx-1 cursor-pointer text-center inline-flex items-center justify-center shadow-xl hover:shadow-none hover:translate-y-1 transition-all duration-500',
				btnClass
			)}
			onClick={!loading && !disabled ? _onPress : undefined}
		>
			{loading && (
				<i
					className={clsx(
						'fa-spin fas fa-circle-notch text-white mr-2 text-lg'
					)}
				></i>
			)}
			<span className={clsx(btnTextClass, 'text-white text-sm')}>{title}</span>
			{(loading || disabled) && (
				<div className="absolute top-0 left-0 right-0 bottom-0 bg-[rgba(255,255,255,.4)] cursor-not-allowed" />
			)}
		</div>
	);
};
