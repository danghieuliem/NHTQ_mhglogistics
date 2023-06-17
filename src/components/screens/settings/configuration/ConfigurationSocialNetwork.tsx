import {Modal, Tooltip} from "antd";
import React, {FC} from "react";
import {Control} from "react-hook-form";
import {FormInput} from "~/components";

type TProps<T extends object = object> = {
	control: Control<T, object>;
	data: T;
};

export const ConfigurationSocialNetwork: FC<TProps<TConfig2>> = ({control, data}) => {
	return (
		<React.Fragment>
			<div className="grid grid-cols-2 gap-4 px-6 mt-4">
				<div className="col-span-1">
					<FormInput control={control} name="Facebook" label="Facebook" placeholder="#" required={false} />
				</div>
				<div className="col-span-1 relative">
					<FormInput
						control={control}
						name="FacebookFanpage"
						label="Facebook FanPage"
						placeholder="Trong tab iframe chỉ lấy src"
						required={false}
					/>
					<span className="absolute top-0 right-0 cursor-pointer">
						<Tooltip title="Hướng dẫn!">
							<i
								className="fas fa-question-circle"
								onClick={() =>
									Modal.info({
										title: "Hướng dẫn lấy link fanpage",
										content: (
											<div>
												<div className="py-1">
													<a
														className="!text-blue"
														href="https://developers.facebook.com/docs/plugins/page-plugin"
														target="_blank"
													>
														Bước 1: Đường dẫn lấy link fanpage
													</a>
												</div>
												<div className="py-1">Bước 2: Nhập địa chỉ và chọn "Get Code"</div>
												<div className="py-1">Bước 3: Chọn tab "Iframe" và copy src</div>
												<div className="pt-2 text-red font-[10px]">NOTE: Chỉ copy src</div>
											</div>
										),
									})
								}
							></i>
						</Tooltip>
					</span>
				</div>
				<div className="col-span-1">
					<FormInput control={control} name="Twitter" label="Twitter" placeholder="#" required={false} />
				</div>
				<div className="col-span-1">
					<FormInput control={control} name="Instagram" label="Instagram" placeholder="#" required={false} />
				</div>
				<div className="col-span-1">
					<FormInput control={control} name="Youtube" label="Link Youtube" placeholder="#" required={false} />
				</div>
				<div className="col-span-1 relative">
					<FormInput
						control={control}
						name="GoogleMapLink"
						label="Đường dẫn Google Map"
						placeholder="Trong tab 'Embed a map' chỉ lấy src"
						required={false}
					/>
					<span className="absolute top-0 right-0 cursor-pointer">
						<Tooltip title="Hướng dẫn!">
							<i
								className="fas fa-question-circle"
								onClick={() =>
									Modal.info({
										title: "Hướng dẫn lấy link google map.",
										content: (
											<div>
												<div className="py-1">
													<a className="!text-blue" href="https://www.google.com/maps" target="_blank">
														Bước 1: Đường dẫn lấy google map
													</a>
												</div>
												<div className="py-1">Bước 2: Nhập địa chỉ và chọn share</div>
												<div className="py-1">Bước 3: Chọn tab 'Embed a map' và copy src</div>
												<div className="pt-2 text-red font-[10px]">NOTE: Chỉ copy src</div>
											</div>
										),
									})
								}
							></i>
						</Tooltip>
					</span>
				</div>
				<div className="col-span-1">
					<FormInput control={control} name="ZaloLink" label="Liên hệ Zalo" placeholder="#" required={false} />
				</div>
				<div className="col-span-1">
					<FormInput control={control} name="WechatLink" label="Liên hệ wechat" placeholder="#" required={false} />
				</div>
				<div className="col-span-1">
					<FormInput control={control} name="Skype" label="Liên hệ skype" placeholder="#" required={false} />
				</div>
				<div className="col-span-1">
					<FormInput control={control} name="Pinterest" label="Đường dẫn Pinterest" placeholder="#" required={false} />
				</div>
			</div>
		</React.Fragment>
	);
};
