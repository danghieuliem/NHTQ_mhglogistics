import {InputNumber, Tooltip} from "antd";
import Link from "next/link";
import React from "react";
import {ActionButton} from "~/components";
import {_format} from "~/utils";

type TProps = {
	orderTempData: TUserCartOrderTemp;
	index: number;
	deleteProduct: () => void;
	updateProduct: (quantity: number, brand: string) => void;
	isLoading: boolean;
};

export const OrderTempItem: React.FC<TProps> = ({index, orderTempData, updateProduct, deleteProduct, isLoading}) => {
	const [quantity, setQuantity] = React.useState(orderTempData?.Quantity);
	const [brand, setBrand] = React.useState(orderTempData?.Brand);
	const [priceCNY, setPriceCNY] = React.useState(() => {
		if (orderTempData?.PricePromotion !== 0) {
			return orderTempData?.PriceOrigin > orderTempData?.PricePromotion
				? _format.getVND(orderTempData?.PricePromotion, " ")
				: _format.getVND(orderTempData?.PriceOrigin, " ");
		}

		return _format.getVND(orderTempData?.PriceOrigin, " ");
	});

	const handleQuantity = (val: number) => {
		if (!val) {
			setQuantity(1);
		} else {
			setQuantity(val);
		}
	};

	function onChangeOrderBrand(e: React.ChangeEvent<HTMLInputElement>) {
		setBrand(e.target.value);
	}

	return (
		<div
			key={orderTempData.Id}
			className="orderProductItem border"
			style={{
				opacity: isLoading ? "0.4" : "1",
				pointerEvents: isLoading ? "none" : "all",
			}}
		>
			<div className="flex flex-wrap  lg:justify-between">
				<div className="flex w-full items-center mb-5 justify-between px-3 borderBottom">
					<Tooltip title="Link đến sản phẩm">
						<a href={orderTempData?.LinkOrigin} target="_blank" className="mainTitle">
							{orderTempData?.TitleOrigin}
						</a>
					</Tooltip>
					<div className="xl:block">
						<ActionButton
							iconContainerClassName="border-none"
							title="Cập nhật"
							icon={isLoading ? "fas fa-sync fa-spin" : "fas fa-sync-alt"}
							onClick={() => updateProduct(quantity, brand)}
						/>
						<ActionButton
							iconContainerClassName="border-none"
							title="Xóa sản phẩm này!"
							icon="fas fa-trash-alt"
							onClick={deleteProduct}
						/>
					</div>
				</div>
				<div className="flex xl:w-7/12 items-center">
					<div className="flex">
						<div className="self-stretch flex items-center">
							<div className="w-[20px] h-[20px] text-center rounded-[5px] border border-[#0c5963] flex items-center justify-center">
								{++index}
							</div>
						</div>
						<div className="w-[75px] h-[75px] border border-[#6969691a] ml-4 rounded-xl overflow-hidden">
							<Link href={orderTempData?.LinkOrigin}>
								<a target="_blank">
									<img src={_format.parseImageURL(orderTempData?.ImageOrigin)} width="100%" height="100%" />
								</a>
							</Link>
						</div>
					</div>
					<div className="ml-2">
						<div className="flex flex-wrap items-end">
							<span className="text-sm mr-4 text-[#484747] font-semibold">* Thuộc tính:</span>
							<span>{orderTempData?.Property}</span>
						</div>
						<div className="flex flex-wrap items-end">
							<span className="text-sm mr-4 text-[#484747] font-semibold">* Ghi chú:</span>
							<input
								type="text"
								className="border-b !rounded-none border-[#0000003a] text-[#000] bg-[transparent] max-w-[140px] outline-0"
								value={brand ?? ""}
								onChange={(e) => onChangeOrderBrand(e)}
							/>
						</div>
					</div>
				</div>
				<div className="xl:w-5/12">
					<div className="grid grid-cols-1 xl:!grid-cols-2">
						<div className="col-span-1 lg:!col-span-1 xl:block flex justify-between ml-2 mb-2 xl:mb-0">
							<div className="text-[10px] py-[2px] uppercase font-bold">Số lượng (cái)</div>
							<div className="text-sm text-center">
								<InputNumber
									size="middle"
									min={1}
									max={100000}
									value={quantity}
									onChange={handleQuantity}
									// style={{height: "30px"}}
								/>
							</div>
						</div>
						<div className="col-span-1 lg:!col-span-1 xl:block flex justify-between ml-2 mb-2 xl:mb-0">
							<div className="text-[10px] py-[2px] uppercase font-bold">Đơn giá (¥)</div>
							<div className="text-orange">
								<div className="text-sm text-center">
									<InputNumber size="middle" disabled={true} value={priceCNY} />
								</div>
							</div>
						</div>
						<div className="col-span-1 lg:!col-span-1 xl:block flex justify-between ml-2 mb-2 xl:mb-0">
							<div className="text-[10px] py-[2px] uppercase font-bold">Đơn giá (VNĐ)</div>
							<div className="text-orange">
								<div className="text-sm text-center">
									<InputNumber
										size="middle"
										value={_format.getVND(orderTempData?.UPriceBuyVN, "")}
										disabled={true}
										// onChange={handleChangePriceCNY}
									/>
								</div>
							</div>
						</div>
						<div className="col-span-1 lg:!col-span-1 xl:block flex justify-between ml-2 mb-2 xl:mb-0">
							<div className="text-[10px] py-[2px] uppercase font-bold">Thành tiền (VNĐ)</div>
							<div className="text-sm text-center">
								<InputNumber size="middle" value={_format.getVND(orderTempData?.EPriceBuyVN, "")} disabled={true} />
							</div>
						</div>
					</div>
				</div>
			</div>
		</div>
	);
};

// type TProps = {
// 	orderTempData: TUserCartOrderTemp;
// 	index: number;
// };

// export const OrderTempItem: React.FC<TProps> = ({orderTempData, index}) => {
// 	const [quantity, setQuantity] = React.useState(orderTempData?.Quantity);
// 	const [brand, setBrand] = React.useState(orderTempData?.Brand);

// 	const [priceCNY, setPriceCNY] = React.useState(() => {
// 		if (orderTempData?.PricePromotion !== 0) {
// 			return orderTempData?.PriceOrigin > orderTempData?.PricePromotion
// 				? _format.getVND(orderTempData?.PricePromotion, " ")
// 				: _format.getVND(orderTempData?.PriceOrigin, " ");
// 		}

// 		return _format.getVND(orderTempData?.PriceOrigin, " ");
// 	});

// 	const handleQuantity = (val: number) => {
// 		if (!val) {
// 			setQuantity(1);
// 		} else {
// 			setQuantity(val);
// 		}
// 	};

// 	function onChangeOrderBrand(e: React.ChangeEvent<HTMLInputElement>) {
// 		setBrand(e.target.value);
// 	}

// 	return (
// 		<div
// 			key={orderTempData.Id}
// 			className="orderProductItem border"
// 			// style={{
// 			// 	opacity: isLoading ? "0.4" : "1",
// 			// 	pointerEvents: isLoading ? "none" : "all",
// 			// }}
// 		>
// 			<div className="flex flex-wrap  lg:justify-between">
// 				<div className="flex w-full items-center mb-5 justify-between px-3 borderBottom">
// 					<Tooltip title="Link đến sản phẩm">
// 						<a href={orderTempData?.LinkOrigin} target="_blank" className="mainTitle">
// 							{orderTempData?.TitleOrigin}
// 						</a>
// 					</Tooltip>
// 					<div className="xl:block">
// 						{/* <ActionButton
// 							iconContainerClassName="border-none"
// 							title="Cập nhật"
// 							icon={isLoading ? "fas fa-sync fa-spin" : "fas fa-sync-alt"}
// 							onClick={() => updateProduct(quantity, brand)}
// 						/>
// 						<ActionButton
// 							iconContainerClassName="border-none"
// 							title="Xóa sản phẩm này!"
// 							icon="fas fa-trash-alt"
// 							onClick={deleteProduct}
// 						/> */}
// 					</div>
// 				</div>
// 				<div className="flex xl:w-7/12 items-center">
// 					<div className="flex">
// 						<div className="self-stretch flex items-center">
// 							<div className="w-[20px] h-[20px] text-center rounded-[5px] border border-[#0c5963] flex items-center justify-center">
// 								{++index}
// 							</div>
// 						</div>
// 						<div className="w-[75px] h-[75px] border border-[#6969691a] ml-4 rounded-xl overflow-hidden">
// 							<Link href={orderTempData?.LinkOrigin}>
// 								<a target="_blank">
// 									<img src={_format.parseImageURL(orderTempData?.ImageOrigin)} width="100%" height="100%" />
// 								</a>
// 							</Link>
// 						</div>
// 					</div>
// 					<div className="ml-2">
// 						<div className="flex flex-wrap items-end">
// 							<span className="text-sm mr-4 text-[#484747] font-semibold">* Thuộc tính:</span>
// 							<span>{orderTempData?.Property}</span>
// 						</div>
// 						<div className="flex flex-wrap items-end">
// 							<span className="text-sm mr-4 text-[#484747] font-semibold">* Ghi chú:</span>
// 							<input
// 								type="text"
// 								className="border-b !rounded-none border-[#0000003a] text-[#000] bg-[transparent] max-w-[140px] outline-0"
// 								value={brand ?? ""}
// 								onChange={(e) => onChangeOrderBrand(e)}
// 							/>
// 						</div>
// 					</div>
// 				</div>
// 				<div className="xl:w-5/12">
// 					<div className="grid grid-cols-1 xl:!grid-cols-2">
// 						<div className="col-span-1 lg:!col-span-1 xl:block flex justify-between ml-2 mb-2 xl:mb-0">
// 							<div className="text-[10px] py-[2px] uppercase font-bold">Số lượng (cái)</div>
// 							<div className="text-sm text-center">
// 								<InputNumber size="middle" min={1} max={100000} value={quantity} onChange={handleQuantity} />
// 							</div>
// 						</div>
// 						<div className="col-span-1 lg:!col-span-1 xl:block flex justify-between ml-2 mb-2 xl:mb-0">
// 							<div className="text-[10px] py-[2px] uppercase font-bold">Đơn giá (¥)</div>
// 							<div className="text-orange">
// 								<div className="text-sm text-center">
// 									<InputNumber size="middle" disabled={true} value={priceCNY} />
// 								</div>
// 							</div>
// 						</div>
// 						<div className="col-span-1 lg:!col-span-1 xl:block flex justify-between ml-2 mb-2 xl:mb-0">
// 							<div className="text-[10px] py-[2px] uppercase font-bold">Đơn giá (VNĐ)</div>
// 							<div className="text-orange">
// 								<div className="text-sm text-center">
// 									<InputNumber
// 										size="middle"
// 										value={_format.getVND(orderTempData?.UPriceBuyVN, "")}
// 										disabled={true}
// 										// onChange={handleChangePriceCNY}
// 									/>
// 								</div>
// 							</div>
// 						</div>
// 						<div className="col-span-1 lg:!col-span-1 xl:block flex justify-between ml-2 mb-2 xl:mb-0">
// 							<div className="text-[10px] py-[2px] uppercase font-bold">Thành tiền (VNĐ)</div>
// 							<div className="text-sm text-center">
// 								<InputNumber size="middle" value={_format.getVND(orderTempData?.EPriceBuyVN, "")} disabled={true} />
// 							</div>
// 						</div>
// 					</div>
// 				</div>
// 			</div>
// 		</div>
// 	);
// };
