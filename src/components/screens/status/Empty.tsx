import { Empty as Emp, EmptyProps } from 'antd';
import React from 'react';

export const Empty: React.FC<EmptyProps> = (props) => {
	return (
		<div className="bg-white overflow-hidden rounded-xl h-[calc(100vh-54px-12px-45px-8px-32px-32px)] flex items-center justify-center">
			<Emp {...props} />
		</div>
	);
};
