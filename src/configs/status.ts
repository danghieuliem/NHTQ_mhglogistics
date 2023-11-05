// Trạng thái đơn hàng mua hộ
export const enum EOrderStatus {
  TatCa = -1,
  DonHuy = 0,
  ChoBaoGia = 1,
  DonMoi = 2,
  DaCoc = 3,
  DaMuaHang = 4,
  ShopPhatHang = 5,
  VeTQ = 6,
  DangVeVN = 7,
  VeVN = 8,
  DaThanhToan = 9,
  HoanThanh = 10,
  KhieuNai = 11,
}

export const orderStatus = [
  {
    id: EOrderStatus.TatCa,
    name: 'Tất cả',
    color: '',
    value: null,
  },
  {
    id: EOrderStatus.DonHuy,
    name: 'Đã huỷ',
    color: '#000',
    value: null,
  },
  {
    id: EOrderStatus.ChoBaoGia,
    name: 'Chờ báo giá',
    color: 'purple',
    value: null,
  },
  {
    id: EOrderStatus.DonMoi,
    name: 'Đơn mới',
    color: '#f00',
    value: null,
  },
  {
    id: EOrderStatus.DaCoc,
    name: 'Đã cọc',
    color: '#ffa500',
    value: null,
  },
  {
    id: EOrderStatus.DaMuaHang,
    name: 'Đã mua hàng',
    color: '#00808',
    value: null,
  },
  {
    id: EOrderStatus.ShopPhatHang,
    name: 'Shop phát hàng',
    color: '#F04438',
    value: null,
  },
  {
    id: EOrderStatus.VeTQ,
    name: 'Về kho TQ',
    color: '#f57c00',
    value: null,
  },
  {
    id: EOrderStatus.DangVeVN,
    name: 'Đang về VN',
    color: '#FDB022',
    value: null,
  },
  {
    id: EOrderStatus.VeVN,
    name: 'Về kho VN',
    color: '#c71585',
    value: null,
  },
  {
    id: EOrderStatus.DaThanhToan,
    name: 'Đã thanh toán',
    color: '#096dd9',
    value: null,
  },
  {
    id: EOrderStatus.HoanThanh,
    name: 'Hoàn thành',
    color: '#008000',
    value: null,
  },
  {
    id: EOrderStatus.KhieuNai,
    name: 'Khiếu nại',
    color: '#601010',
    value: null,
  },
]

// Trạng thái đơn hàng ký gửi
export const enum ETransportationOrder {
  TatCa = -1,
  Huy = 0,
  ChoDuyet = 1,
  DonMoi = 2,
  VeKhoTQ = 3,
  DangVeVN = 4,
  VeKhoVN = 5,
  DaThanhToan = 6,
  DaHoanThanh = 7,
  DaKhieuNai = 8,
}

export const transportationStatus = [
  {
    id: ETransportationOrder.TatCa,
    name: 'Tất cả',
    color: '',
    value: null,
  },
  {
    id: ETransportationOrder.Huy,
    name: 'Đã huỷ',
    color: '#000',
    value: null,
  },
  {
    id: ETransportationOrder.ChoDuyet,
    name: 'Chờ duyệt',
    color: 'magenta',
    value: null,
  },
  {
    id: ETransportationOrder.DonMoi,
    name: 'Đơn mới',
    color: '#f00',
    value: null,
  },
  {
    id: ETransportationOrder.VeKhoTQ,
    name: 'Về kho TQ',
    color: '#f57c00',
    value: null,
  },
  {
    id: ETransportationOrder.DangVeVN,
    name: 'Đang về VN',
    color: '#FDB022',
    value: null,
  },
  {
    id: ETransportationOrder.VeKhoVN,
    name: 'Về kho VN',
    color: '#c71585',
    value: null,
  },
  {
    id: ETransportationOrder.DaThanhToan,
    name: 'Đã thanh toán',
    color: '#096dd9',
    value: null,
  },
  {
    id: ETransportationOrder.DaHoanThanh,
    name: 'Hoàn thành',
    color: '#008000',
    value: null,
  },
  {
    id: ETransportationOrder.DaKhieuNai,
    name: 'Khiếu nại',
    color: '#601010',
    value: null,
  },
]

// Trạng thái thanh toán hộ
export const enum EPayHelp {
  TatCa = -1,
  DonHuy = 0,
  ChoDuyet = 1,
  DaDuyet = 2,
  DaThanhToan = 3,
  DaHoanThanh = 4,
}

export const payHelpStatus = [
  {
    id: EPayHelp.TatCa,
    name: 'Tất cả',
    color: '#000',
    value: null,
  },
  {
    id: EPayHelp.DonHuy,
    name: 'Đã huỷ',
    color: '#000',
    value: null,
  },
  {
    id: EPayHelp.ChoDuyet,
    name: 'Chờ duyệt',
    color: 'magenta',
    value: null,
  },
  {
    id: EPayHelp.DaDuyet,
    name: 'Đã duyệt',
    color: '#008080',
    value: null,
  },
  {
    id: EPayHelp.DaThanhToan,
    name: 'Đã thanh toán',
    color: '#096dd9',
    value: null,
  },
  {
    id: EPayHelp.DaHoanThanh,
    name: 'Hoàn thành',
    color: '#008000',
    value: null,
  },
]

// Trạng thái mã vận đơn
export const enum ESmallPackage {
  TatCa = -1,
  DaHuy = 0,
  MoiTao = 1,
  VeKhoTQ = 2,
  XuatKhoTQ = 3,
  VeKhoVN = 4,
  DaGiao = 5,
}

export const smallPackageStatus = [
  {
    id: ESmallPackage.TatCa,
    name: 'Tất cả',
    color: '#000',
    value: null,
  },
  {
    id: ESmallPackage.DaHuy,
    name: 'Đã huỷ',
    color: '#000',
    value: null,
  },
  {
    id: ESmallPackage.MoiTao,
    name: 'Mới tạo',
    color: '#f00',
    value: null,
  },
  {
    id: ESmallPackage.VeKhoTQ,
    name: 'Về kho TQ',
    color: '#f57c00',
    value: null,
  },
  {
    id: ESmallPackage.XuatKhoTQ,
    name: 'Xuất kho TQ',
    color: '#53389E',
    value: null,
  },
  {
    id: ESmallPackage.VeKhoVN,
    name: 'Về kho VN',
    color: '#c71585',
    value: null,
  },
  {
    id: ESmallPackage.DaGiao,
    name: 'Đã giao',
    color: '#008000',
    value: null,
  },
]

// Trạng thái bao hàng
export const enum EBigPackge {
  TatCa = -1,
  DaHuy = 0,
  MoiTao = 1,
  XuatKhoTQ = 2,
  TrongKhoVN = 3,
}

export const bigPackageStatus = [
  {
    id: EBigPackge.TatCa,
    name: 'Tất cả',
    color: '#000',
    value: null,
  },
  {
    id: EBigPackge.DaHuy,
    name: 'Đã huỷ',
    color: '#000',
    value: null,
  },
  {
    id: EBigPackge.MoiTao,
    name: 'Mới tạo',
    color: '#f00',
    value: null,
  },
  {
    id: EBigPackge.XuatKhoTQ,
    name: 'Xuất kho TQ',
    color: '#53389E',
    value: null,
  },
  {
    id: EBigPackge.TrongKhoVN,
    name: 'Trong kho VN',
    color: '#c71585',
    value: null,
  },
]

// Trạng thái khiếu nại
export const enum EComplain {
  TatCa = -1,
  DaHuy = 0,
  MoiTao = 1,
  DaXacNhan = 2,
  DangXuLy = 3,
  HoanThanh = 4,
}

export const complainStatus = [
  {
    id: EComplain.TatCa,
    name: 'Tất cả',
    color: '#000',
    value: null,
  },
  {
    id: EComplain.DaHuy,
    name: 'Đã huỷ',
    color: '#000',
    value: null,
  },
  {
    id: EComplain.MoiTao,
    name: 'Mới tạo',
    color: '#f00',
    value: null,
  },
  {
    id: EComplain.DaXacNhan,
    name: 'Đã xác nhận',
    color: '#f57c00',
    value: null,
  },
  {
    id: EComplain.DangXuLy,
    name: 'Đang xử lý',
    color: '#3538CD',
    value: null,
  },
  {
    id: EComplain.HoanThanh,
    name: 'Hoàn thành',
    color: '#008000',
    value: null,
  },
]
