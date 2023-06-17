import { Modal } from "antd";
import { FC, Fragment } from "react";
import { TForm } from "~/types/table";
import { TrackingDetail } from "../../user/tracking";

const button = `px-[20px] py-[10px] bg-[#f37021] text-[#fff] uppercase hover:bg-[#c7ae8d] hover:text-[#333] transition-all`;

type TProps = TForm<any> & {
	data: any
};

export const TrackingForm: FC<TProps> = ({ visible, data, onCancel}) => {
	
	return (
		<Modal visible={visible} width={"70vw"} style={{top: 100}} footer={false}>
			<Fragment>
				<h1 className="titlePageUser !mb-0 !text-center">Tracking mã vận đơn</h1>
				<div className="px-4 tracking border-t border-b border-[#ebebeb]">
					<div>
						<TrackingDetail data={data} />
					</div>
				</div>
				<div className="text-right p-4">
					<button className={button} onClick={() => onCancel()}>Đóng</button>
				</div>
			</Fragment>
		</Modal>
	);
};
