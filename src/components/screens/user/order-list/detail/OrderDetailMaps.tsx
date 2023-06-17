import React, { useState, useEffect, useCallback } from 'react';
import {
	withScriptjs,
	withGoogleMap,
	GoogleMap,
	Marker,
	InfoWindow,
	Polyline
} from 'react-google-maps';
import InfoBox from 'react-google-maps/lib/components/addons/InfoBox';
import { _format } from '~/utils';

const MyMap = withScriptjs(
	withGoogleMap(() => {
		const [newOffset, setOffset] = useState<string | number>(0);
		useEffect(() => {
			let count = 0;
			let infinite = setInterval(() => {
				count = (count + 1) % 200;
				setOffset(count / 2 + '%');
			}, 20);
			return () => clearInterval(infinite);
		}, []);

		let iconMarker = new (window as any).google.maps.MarkerImage(
			'https://www.pngrepo.com/download/298733/warehouse.png',
			null,
			null,
			null,
			new (window as any).google.maps.Size(32, 32)
		);

		const [location1Popover, setLocation1Popover] = useState(false);
		const [location2Popover, setLocation2Popover] = useState(false);
		const handleLocation1Popover = useCallback(
			() => setLocation1Popover(!location1Popover),
			[location1Popover]
		);
		const handleLocation2Popover = useCallback(
			() => setLocation2Popover(!location2Popover),
			[location2Popover]
		);

		return (
			<GoogleMap defaultZoom={8} defaultCenter={{ lat: -34.397, lng: 150.644 }}>
				<Marker
					position={{ lat: -34.397, lng: 150.644 }}
					icon={iconMarker}
					onClick={handleLocation1Popover}
				>
					<InfoBox options={{ closeBoxURL: `` }}>
						<div
							style={{
								width: 24,
								height: 24,
								borderRadius: 1000,
								backgroundColor: '#ff0000',
								background: 'radial-gradient(red, #fff)',
								fontSize: '16px',
								textAlign: 'center',
								color: '#fff',
								lineHeight: '24px'
							}}
						>
							0
						</div>
					</InfoBox>
					{location1Popover && (
						<InfoWindow onCloseClick={handleLocation1Popover}>
							<div>
								<div className="font-bold text-base text-[#000]">Đông Hưng</div>
								<div className="text-sm">Các mã vận đơn hiện có: 5</div>
							</div>
						</InfoWindow>
					)}
				</Marker>
				<Marker
					position={{ lat: -35.397, lng: 149.644 }}
					icon={iconMarker}
					onClick={handleLocation2Popover}
				>
					<InfoBox options={{ closeBoxURL: `` }}>
						<div
							style={{
								width: 24,
								height: 24,
								borderRadius: 1000,
								backgroundColor: '#ff0000',
								background: 'radial-gradient(red, #fff)',
								fontSize: '16px',
								textAlign: 'center',
								color: '#fff',
								lineHeight: '24px'
							}}
						>
							0
						</div>
					</InfoBox>
					{location2Popover && (
						<InfoWindow onCloseClick={handleLocation2Popover}>
							<div>
								<div className="font-bold text-base text-[#000]">Hà Nội</div>
								<div className="text-sm">Các mã vận đơn hiện có: 5</div>
							</div>
						</InfoWindow>
					)}
				</Marker>
				<Polyline
					path={[
						{ lat: -34.397, lng: 150.644 },
						{ lat: -35.397, lng: 149.644 }
					]}
					options={{
						strokeColor: '#742708',
						strokeOpacity: 1,
						strokeWeight: 4,
						icons: [
							{
								icon: {
									path: (window as any).google.maps.SymbolPath.CIRCLE,
									scale: 6,
									strokeColor: '#ff0000'
								},
								offset: newOffset
							}
						]
					}}
				/>
			</GoogleMap>
		);
	})
);

export const OrderDetailMaps: React.FC<any> = ({ data }) => {
	return (
		<div className="relative tableBox">
			<MyMap
				googleMapURL="https://maps.googleapis.com/maps/api/js?v=3.exp&libraries=geometry,drawing,places"
				loadingElement={<div style={{ height: `100%` }} />}
				containerElement={<div style={{ height: `500px` }} />}
				mapElement={<div style={{ height: `100%`, borderRadius: `10px` }} />}
			/>
			<div className="absolute p-6 bg-[#f8f0e8cc] rounded-3xl left-20 right-20 top-10">
				{data?.SmallPackages.length > 0 && (
					<div className="flex items-end justify-between">
						<div className="text-lg text-[#000]">
							Mã vận đơn:{' '}
							<span className="font-bold">
								{data?.SmallPackages?.[0]?.OrderTransactionCode}
							</span>
						</div>
						<div className="text-base font-semibold text-warning">
							{data?.SmallPackages?.[0]?.StatusName}
						</div>
					</div>
				)}
				<div className="flex items-end justify-between mt-1">
					<div className="text-lg text-[#000]">
						{/* Mã vận đơn:{' '}
						<span className="font-bold">
							{' '}
							{data?.SmallPackages?.[0]?.OrderTransactionCode}
						</span> */}
					</div>
					<div className="text-base font-semibold text-warning">
						{data?.StatusName}
					</div>
				</div>
				<div className="flex items-end justify-between mt-1">
					<div className="text-xl text-[#000] font-semibold">
						{data?.FromPlaceName}{' '}
						<i className="far fa-long-arrow-alt-right"></i>{' '}
						{data?.ReceivePlaceName}
					</div>
					<div className="text-xl text-[#000] font-semibold">
						{_format.getShortVNDate(data?.Created)}
					</div>
				</div>
			</div>
		</div>
	);
};
