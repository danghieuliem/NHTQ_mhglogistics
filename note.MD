# KÝ HIỆU - VIẾT TẮT

- bắt buộc có
  ✅: đã xong
  📌: để đó, từ từ làm 🙂🙂
  pro

# NOTEs:

- Tiền hoa hồng = Tiền mua thật + Phí ship TQ - Tổng tiền mua thật - Phí ship TQ thật

## BUG:

- Tính sai đơn vị, tổng tiền ✅
- Username chưa đúng với user đang đăng nhập ✅
- phân quyền user đang lấy được thông tin sản phẩm mà chỉ admin thấy đc do lưu url sau khi login -> check xem thằng đăng nhập sau có phân quyền để truy cập không -> đá về home

## FIX FEATURE:

- update UI phí kiểm đếm: sort tăng, giảm ID ✅
- update tỉ giá trên header tùy theo tỉ giá của user đang login ✅
- giao diện login ✅
- add loading animation cho infinity scroll ✅
- bỏ bộ lọc theo giờ:

  - pages: /notification ✅

- lấy kiện xuấy kho:

  - khi change user thì ẩn hết các kiện, mỗi lần chỉ xuất kiện cho 1 user ✅
  - không truyền param => lấy hết ✅
  - filter: username(\*), mã đơn hàng or lấy hết ✅

- user/withdrawal-vnd:

  - đổi status khi xóa trạng lịch sử rút tiền thành 3 ✅
  - chuyển param to formbody ✅

- Tỉ giá / Số dư chưa update realtime ✅
- Disabled button khi login ✅

- Thay đổi /settings:

  - Bỏ footer tag ✅
  - bỏ "về chúng tôi" trong cấu hình chung tag ✅
  - đổi tên "trang chủ" -> cấu hình SEO tag ✅
  - tỷ giá và hoa hồng bắt buộc toàn bộ ✅
  - hiển thị thông báo khi cập nhật cấu hình ✅

- Cấu hình:

  - Phí TQ-VN: filter đang không realtime, phải đổi tab thì mới show kq filter ✅

- order-list page:

  - cập nhật mới xong tiền bị âm ✅
  - show số tiền đã cọc ✅
  - show Số tiền cần thanh toán, click thanh toán -> confirm cái đã ✅
  - mã đơn hàng chưa tự fill giá trị mặc dù ✅

- refetch lại số dư khi thanh toán đơn hàng ✅ -> dùng client-query

- thanh toán:

  - khi thanh toán xong, thành công -> số tiền đã trả bằng với số dư của user10 đó ✅

- chi tiết xuất kho:

  - giao diện giống như bên thằng order-list
  - xuất kho: sau khi lấy kiện, value UserName bị reset nhưng lable không bị reset ✅
  - hàng ở kho TQ thì vào kho VN vẫn thấy ✅

- Thanh toán:

  - bỏ nhập số tiền cần thanh toán -> lấy mặc định theo số tiền đã có hiện ✅

- role:

  # admin

  - firstPage: "/dashboard"
  - {"AvatarIMG":"http://nhaphangv2.monamedia.net/Upload/84ca452b-0a8c-4949-85b2-135181de0ffc-myphuc.jpg","UserName":"admin","FirstName":"Họ","LastName":"Tên","FullName":"admin","Phone":"012345678","Email":"admin@gmail.com","Address":"Tân hải","Status":1,"StatusName":"Đã kích hoạt","Birthday":"2009-06-11T13:39:51+07:00","IsAdmin":true,"Password":"7C222FB2927D828AF22F592134E8932480637C0D","IsCheckOTP":true,"IsLoginFaceBook":false,"IsLoginGoogle":false,"IsResetPassword":false,"ConfirmPassWord":"7C222FB2927D828AF22F592134E8932480637C0D","NewPassWord":null,"ConfirmNewPassWord":null,"Gender":0,"UserGroupId":1,"UserGroupName":"Admin","LevelId":1,"Wallet":687839834,"SaleId":null,"DatHangId":null,"WalletCNY":0,"WarehouseFrom":0,"WarehouseTo":0,"Currency":3850,"FeeBuyPro":null,"FeeTQVNPerWeight":null,"Deposit":null,"ShippingType":0,"SumAmount":0,"TotalMainOrder":0,"TotalTransportationOrder":0,"TotalPayHelp":0,"RowNumber":0,"Id":1,"Created":"2022-01-25T16:25:27.8467459+07:00","CreatedBy":"admin","Updated":"2022-10-05T13:34:29.0455871+07:00","UpdatedBy":"admin","Deleted":false,"Active":true}

  # quản lý: quanly

  - firstPage: "/dashboard"
  - {"AvatarIMG":"http://nhaphangv2.monamedia.net/Upload/fcf0ff2d-05ff-4efc-bccd-ae5ee5bb216c-av2.jpg","UserName":"quanly","FirstName":"Họ Admin 2","LastName":"Tên Admin 2","FullName":"quanly","Phone":"0123456792","Email":"admin2@gmail.com","Address":"quanly","Status":1,"StatusName":"Đã kích hoạt","Birthday":null,"IsAdmin":true,"Password":"7C222FB2927D828AF22F592134E8932480637C0D","IsCheckOTP":true,"IsLoginFaceBook":false,"IsLoginGoogle":false,"IsResetPassword":false,"ConfirmPassWord":"7C222FB2927D828AF22F592134E8932480637C0D","NewPassWord":null,"ConfirmNewPassWord":null,"Gender":0,"UserGroupId":3,"UserGroupName":"Quản lý","LevelId":1,"Wallet":0,"SaleId":null,"DatHangId":null,"WalletCNY":0,"WarehouseFrom":0,"WarehouseTo":0,"Currency":null,"FeeBuyPro":0,"FeeTQVNPerWeight":null,"Deposit":null,"ShippingType":0,"SumAmount":0,"TotalMainOrder":0,"TotalTransportationOrder":0,"TotalPayHelp":0,"RowNumber":0,"Id":20,"Created":"2022-01-25T16:25:27.8467459+07:00","CreatedBy":"admin","Updated":"2022-10-04T17:47:48.8311328+07:00","UpdatedBy":"admin","Deleted":false,"Active":true}
  - chặn API: cài đặt

  # saler: saler

  - firstPage: "/client/client-list"
  - {"AvatarIMG":null,"UserName":"saler","FirstName":null,"LastName":null,"FullName":"saler","Phone":"091243453","Email":"phuc@gmail.com","Address":"131242","Status":1,"StatusName":"Đã kích hoạt","Birthday":"2000-02-24T11:51:24+07:00","IsAdmin":false,"Password":"7C222FB2927D828AF22F592134E8932480637C0D","IsCheckOTP":true,"IsLoginFaceBook":false,"IsLoginGoogle":false,"IsResetPassword":false,"ConfirmPassWord":"7C222FB2927D828AF22F592134E8932480637C0D","NewPassWord":null,"ConfirmNewPassWord":null,"Gender":0,"UserGroupId":7,"UserGroupName":"Saler","LevelId":4,"Wallet":0,"SaleId":0,"DatHangId":0,"WalletCNY":0,"WarehouseFrom":0,"WarehouseTo":0,"Currency":0,"FeeBuyPro":0,"FeeTQVNPerWeight":"0.0","Deposit":0,"ShippingType":0,"SumAmount":0,"TotalMainOrder":0,"TotalTransportationOrder":0,"TotalPayHelp":0,"RowNumber":0,"Id":2,"Created":"2022-02-28T11:53:12.0568338+07:00","CreatedBy":"admin","Updated":"2022-10-04T17:48:57.2101609+07:00","UpdatedBy":"admin","Deleted":false,"Active":true}
  - sidebar:
    - danh sách khách hàng
    - thêm khách hàng
    - đơn hàng: ...
    - tạo đơn mua hộ khác
  - Chặn API: /catalogue/get-user-group-catalogue
  - data thêm mới user: data: {"Gender":0,"LevelId":1,"UserGroup":{"UserIds":[],"UserInGroups":[],"PermitObjectPermissions":[],"Code":"USER","Name":"User","Description":"User","RowNumber":0,"Id":2,"Created":"2022-02-14T14:45:56.2333227+07:00","CreatedBy":"admin","Updated":"2022-09-22T14:37:02.7833277+07:00","UpdatedBy":"admin","Deleted":false,"Active":true},"UserGroupId":2,"Status":1,"IsAdmin":false,"DatHangId":0,"SaleId":0,"Deposit":0,"FeeTQVNPerWeight":0,"FeeBuyPro":0,"Currency":0,"IsLocked":false,"FullName":"user30","Phone":"0965005747","Birthday":"2022-10-06T16:30:50+07:00","UserName":"user30","Email":"user30@gmail.com","Password":"user30","ConfirmPassWord":"user30"}

  # đặt hàng: dathang

  - firstPage: "/employee/bonus-management"
  - {"AvatarIMG":null,"UserName":"dathang","FirstName":null,"LastName":null,"FullName":"dathang","Phone":"0902971858","Email":"lethimyphuc@gmail.com","Address":"số 1 ba vì","Status":1,"StatusName":"Đã kích hoạt","Birthday":"2022-06-01T17:53:02+07:00","IsAdmin":false,"Password":"7C222FB2927D828AF22F592134E8932480637C0D","IsCheckOTP":true,"IsLoginFaceBook":false,"IsLoginGoogle":false,"IsResetPassword":false,"ConfirmPassWord":"7C222FB2927D828AF22F592134E8932480637C0D","NewPassWord":null,"ConfirmNewPassWord":null,"Gender":1,"UserGroupId":4,"UserGroupName":"Đặt hàng","LevelId":3,"Wallet":0,"SaleId":2,"DatHangId":33,"WalletCNY":0,"WarehouseFrom":0,"WarehouseTo":0,"Currency":0,"FeeBuyPro":0,"FeeTQVNPerWeight":"0.0","Deposit":0,"ShippingType":0,"SumAmount":0,"TotalMainOrder":0,"TotalTransportationOrder":0,"TotalPayHelp":0,"RowNumber":0,"Id":33,"Created":"2022-06-21T17:54:07.9481448+07:00","CreatedBy":"admin","Updated":"2022-10-04T17:50:48.6433479+07:00","UpdatedBy":"admin","Deleted":false,"Active":true}

  # khotq: khotq

  - firstPage: "/warehouse/check-warehouse-china"
  - {"AvatarIMG":null,"UserName":"khotq","FirstName":null,"LastName":null,"FullName":"china warehouse","Phone":"0902971864","Email":"chinawarehouse@gmail.com","Address":"â","Status":1,"StatusName":"Đã kích hoạt","Birthday":"2022-02-07T14:04:45+07:00","IsAdmin":false,"Password":"7C222FB2927D828AF22F592134E8932480637C0D","IsCheckOTP":true,"IsLoginFaceBook":false,"IsLoginGoogle":false,"IsResetPassword":false,"ConfirmPassWord":"7C222FB2927D828AF22F592134E8932480637C0D","NewPassWord":null,"ConfirmNewPassWord":null,"Gender":1,"UserGroupId":5,"UserGroupName":"Kho TQ","LevelId":1,"Wallet":0,"SaleId":0,"DatHangId":0,"WalletCNY":0,"WarehouseFrom":0,"WarehouseTo":0,"Currency":0,"FeeBuyPro":0,"FeeTQVNPerWeight":"0.0","Deposit":0,"ShippingType":0,"SumAmount":0,"TotalMainOrder":0,"TotalTransportationOrder":0,"TotalPayHelp":0,"RowNumber":0,"Id":41,"Created":"2022-07-01T14:05:32.2596856+07:00","CreatedBy":"admin","Updated":"2022-10-04T17:46:31.400867+07:00","UpdatedBy":"admin","Deleted":false,"Active":true}

  # khovn: khovn

  - firstPage: "/warehouse/check-warehouse-vietnam"
  - {"AvatarIMG":"","UserName":"khovn","FirstName":null,"LastName":null,"FullName":"kho viet nam","Phone":"0902973432","Email":"vietnamwarehouse@gmail.com","Address":"Hồ Chí Minh","Status":1,"StatusName":"Đã kích hoạt","Birthday":"2022-07-11T14:07:31+07:00","IsAdmin":false,"Password":"7C222FB2927D828AF22F592134E8932480637C0D","IsCheckOTP":true,"IsLoginFaceBook":false,"IsLoginGoogle":false,"IsResetPassword":false,"ConfirmPassWord":"7C222FB2927D828AF22F592134E8932480637C0D","NewPassWord":null,"ConfirmNewPassWord":null,"Gender":0,"UserGroupId":6,"UserGroupName":"Kho VN","LevelId":1,"Wallet":0,"SaleId":0,"DatHangId":0,"WalletCNY":0,"WarehouseFrom":0,"WarehouseTo":0,"Currency":0,"FeeBuyPro":0,"FeeTQVNPerWeight":"0.0","Deposit":0,"ShippingType":0,"SumAmount":0,"TotalMainOrder":0,"TotalTransportationOrder":0,"TotalPayHelp":0,"RowNumber":0,"Id":42,"Created":"2022-07-01T14:08:15.7969303+07:00","CreatedBy":"admin","Updated":"2022-10-04T17:46:13.398276+07:00","UpdatedBy":"admin","Deleted":false,"Active":true}

  # ketoan: ketoan

  - firstPage: "/deposit/deposit-list"
  - {"AvatarIMG":null,"UserName":"ketoan","FirstName":null,"LastName":null,"FullName":"ketoan","Phone":"0977352618","Email":"lephamhuyhoang@gmail.com","Address":"00","Status":1,"StatusName":"Đã kích hoạt","Birthday":"1999-05-30T00:00:00+07:00","IsAdmin":false,"Password":"7C222FB2927D828AF22F592134E8932480637C0D","IsCheckOTP":true,"IsLoginFaceBook":false,"IsLoginGoogle":false,"IsResetPassword":false,"ConfirmPassWord":"7C222FB2927D828AF22F592134E8932480637C0D","NewPassWord":null,"ConfirmNewPassWord":null,"Gender":1,"UserGroupId":8,"UserGroupName":"Kế toán","LevelId":1,"Wallet":0,"SaleId":4,"DatHangId":25,"WalletCNY":0,"WarehouseFrom":0,"WarehouseTo":0,"Currency":0,"FeeBuyPro":0,"FeeTQVNPerWeight":"0.0","Deposit":0,"ShippingType":0,"SumAmount":0,"TotalMainOrder":0,"TotalTransportationOrder":0,"TotalPayHelp":0,"RowNumber":0,"Id":28,"Created":"2022-06-03T11:25:00.3081571+07:00","CreatedBy":"admin","Updated":"2022-10-04T17:49:31.7044174+07:00","UpdatedBy":"admin","Deleted":false,"Active":true}

  # user20: nguoidung

  - firstPage: ""
  - {"AvatarIMG":"","UserName":"user20","FirstName":null,"LastName":null,"FullName":"user20","Phone":"012335679","Email":"user20@gmail.com","Address":null,"Status":1,"StatusName":"Đã kích hoạt","Birthday":"2022-10-06T15:16:30+07:00","IsAdmin":false,"Password":"7C222FB2927D828AF22F592134E8932480637C0D","IsCheckOTP":true,"IsLoginFaceBook":false,"IsLoginGoogle":false,"IsResetPassword":false,"ConfirmPassWord":"7C222FB2927D828AF22F592134E8932480637C0D","NewPassWord":null,"ConfirmNewPassWord":null,"Gender":0,"UserGroupId":2,"UserGroupName":"User","LevelId":1,"Wallet":0,"SaleId":0,"DatHangId":0,"WalletCNY":0,"WarehouseFrom":0,"WarehouseTo":0,"Currency":0,"FeeBuyPro":0,"FeeTQVNPerWeight":"0.0","Deposit":0,"ShippingType":0,"SumAmount":0,"TotalMainOrder":0,"TotalTransportationOrder":0,"TotalPayHelp":0,"RowNumber":0,"Id":74,"Created":"2022-10-05T15:17:26.1465725+07:00","CreatedBy":"admin","Updated":null,"UpdatedBy":null,"Deleted":false,"Active":true}

## NEW FEATURE:

- Thông báo trên header (bộ lọc, infinity scroll, chọn 1 hoặc nhiều thông báo) ✅
- Thay đổi UI trang login ✅
- Dynamic data at homepage

## UPDATE / ADD NEW STATE FOR FEATURE:

## API:

- Chưa có API:
  - đăng ký
  - khôi phục mật khẩu

## Token expired

eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJodHRwOi8vc2NoZW1hcy5taWNyb3NvZnQuY29tL3dzLzIwMDgvMDYvaWRlbnRpdHkvY2xhaW1zL3VzZXJkYXRhIjoie1wiVXNlcklkXCI6MSxcIlVzZXJHcm91cElkXCI6MSxcIlVzZXJOYW1lXCI6XCJhZG1pblwiLFwiSXNDaGVja09UUFwiOnRydWUsXCJSb2xlc1wiOm51bGwsXCJJc0NvbmZpcm1PVFBcIjpmYWxzZX0iLCJuYmYiOjE2NzU3NTczMzQsImV4cCI6MTY3NTg2ODkzNCwiaWF0IjoxNjc1NzU3MzM0fQ.BiYZnHsJE_0tGaSbO43n5D_BhZRl4dt4zEYSRRJ7Mf8
