import {Menu} from "antd";
import Link from "next/link";
import React from "react";

type TProps = {
	data: {
		target?: "_blank" | "_parent" | "_self" | "_top";
		rel?: string;
		onClick: () => void;
		title: string;
		isHidden?: boolean;
	}[];
};

const Index: React.FC<TProps> = ({data}) => {
	return (
		<Menu>
			{data.map(({title, onClick, isHidden, ...props}) => {
				return (
					isHidden && (
						<Menu.Item key={title}>
							<a onClick={() => onClick()} {...props}>
								{title}
							</a>
						</Menu.Item>
					)
				);
			})}
		</Menu>
	);
};

export default Index;
