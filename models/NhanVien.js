function NhanVien() {
  this.taiKhoan = "";
  this.hoTen = "";
  this.email = "";
  this.matKhau = "";
  this.ngayLam = "";
  this.luongCoBan = "";
  this.chucVu = "";
  this.gioLamTrongThang = "";
  this.loaiNhanVien = "";
  this.tinhTongLuong = function () {
    var tongluong = 0;
    if (this.chucVu === "Sếp") {
      tongluong = this.luongCoBan * 3;
    } else if (this.chucVu === "Trưởng phòng") {
      tongluong = this.luongCoBan * 2;
    } else if (this.chucVu === "Nhân viên") {
      tongluong = this.luongCoBan;
    }
    return tongluong;
  };
  this.xepLoai = function () {
    var xepLoai = "";
    if (this.gioLamTrongThang >= 192) {
      xepLoai = "Nhân viên xuất sắc";
    } else if (this.gioLamTrongThang >= 176) {
      xepLoai = "Nhân viên giỏi";
    } else if (this.gioLamTrongThang >= 160) {
      xepLoai = "Nhân viên khá";
    } else if (this.gioLamTrongThang < 160) {
      xepLoai = "Nhân viên trung bình";
    }
    return xepLoai;
  };
}
