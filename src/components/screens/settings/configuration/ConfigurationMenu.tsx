import { Affix } from 'antd';
import React, { FC } from 'react';
import { Link } from 'rc-scroll-anim';
import { Button } from '~/components';
import clsx from 'clsx';
import { IconButton } from '~/components/globals/button/IconButton';

type TProps = {
	active: number;
	handleActive: (val: number) => void;
	handleSubmit: () => void;
};

export const ConfigurationMenu: FC<TProps> = ({
	handleActive,
	active,
	handleSubmit
}) => {
	return (
		<Affix offsetTop={70}>
			<div>
				<div className="bg-white rounded-3xl p-4 xl:block hidden">
					<ul>
						<li>
							<Link
								onFocus={() => handleActive(0)}
								offsetTop={100}
								to="general"
								className={clsx(
									'cursor-pointer px-2 py-[2px] text-[#0000005a] text-sm block',
									active === 0 &&
										'border-l-2 border-orange !text-black font-medium'
								)}
							>
								Cấu hình chung
							</Link>
						</li>
						<li>
							<Link
								onFocus={() => handleActive(1)}
								offsetTop={230}
								to="social-network"
								className={clsx(
									'cursor-pointer px-2 py-[2px] text-[#0000005a] text-sm block',
									active === 1 &&
										'border-l-2 border-orange !text-black font-medium'
								)}
							>
								Cấu hình tài khoản MXH
							</Link>
						</li>
						<li>
							<Link
								onFocus={() => handleActive(2)}
								offsetTop={80}
								to="rate-rose"
								className={clsx(
									'cursor-pointer px-2 py-[2px] text-[#0000005a] text-sm block',
									active === 2 &&
										'border-l-2 border-orange !text-black font-medium'
								)}
							>
								Cấu hình tỉ giá - hoa hồng
							</Link>
						</li>
						<li>
							<Link
								onFocus={() => handleActive(3)}
								offsetTop={90}
								to="notification"
								className={clsx(
									'cursor-pointer px-2 py-[2px] text-[#0000005a] text-sm block',
									active === 3 &&
										'border-l-2 border-orange !text-black font-medium'
								)}
							>
								Cấu hình thông báo
							</Link>
						</li>
						<li>
							<Link
								onFocus={() => handleActive(4)}
								offsetTop={90}
								to="footer"
								className={clsx(
									'cursor-pointer px-2 py-[2px] text-[#0000005a] text-sm block',
									active === 4 &&
										'border-l-2 border-orange !text-black font-medium'
								)}
							>
								Cấu hình Footer
							</Link>
						</li>
						<li>
							<Link
								onFocus={() => handleActive(5)}
								offsetTop={90}
								to="seo"
								className={clsx(
									'cursor-pointer px-2 py-[2px] text-[#0000005a] text-sm block',
									active === 5 &&
										'border-l-2 border-orange !text-black font-medium'
								)}
							>
								Cấu hình SEO trang chủ và mặc định
							</Link>
						</li>
					</ul>
				</div>
				<IconButton
					onClick={handleSubmit}
					icon="fas fa-edit mr-2"
					title="Cập nhật"
					btnClass="mt-4"
					showLoading
					toolip=""
				/>
			</div>
		</Affix>
	);
};
