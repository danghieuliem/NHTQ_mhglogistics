import { Collapse } from 'antd';
import React, { FC } from 'react';

type TProps = {
	visible: boolean;
	width?: number;
	// style?: React.CSSProperties;
};
const { Panel } = Collapse;
const Index: FC<TProps> = ({ children }) => {
	return (
		<Collapse
			defaultActiveKey={['1']}
			expandIconPosition={'right'}
			ghost={false}
		>
			<Panel header="" key="1">
				{children}
			</Panel>
		</Collapse>
	);
};

Index.defaultProps = {
	width: 768
};

export default Index;
