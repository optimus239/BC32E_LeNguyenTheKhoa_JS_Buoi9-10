var mangNhanVien = [];
document.querySelector("#tbTKNV").style.display = "block";
document.querySelector("#tbTen").style.display = "block";
document.querySelector("#tbEmail").style.display = "block";
document.querySelector("#tbMatKhau").style.display = "block";
document.querySelector("#tbNgay").style.display = "block";
document.querySelector("#tbLuongCB").style.display = "block";
document.querySelector("#tbChucVu").style.display = "block";
document.querySelector("#tbGiolam").style.display = "block";
document.querySelector("#btnThemNV").onclick = function () {
  var nhanVien = new NhanVien();
  nhanVien.taiKhoan = document.querySelector("#tknv").value;
  nhanVien.hoTen = document.querySelector("#name").value;
  nhanVien.email = document.querySelector("#email").value;
  nhanVien.matKhau = document.querySelector("#password").value;
  nhanVien.ngayLam = document.querySelector("#datepicker").value;
  nhanVien.luongCoBan = Number(document.querySelector("#luongCB").value);
  nhanVien.chucVu = document.querySelector("#chucvu").value;
  nhanVien.gioLamTrongThang = document.querySelector("#gioLam").value;

  var valid = true;
  valid &=
    kiemTraRong(nhanVien.taiKhoan, "#tbTKNV", "Tài khoản") &
    kiemTraRong(nhanVien.hoTen, "#tbTen", "Họ và tên") &
    kiemTraRong(nhanVien.email, "#tbEmail", "Email") &
    kiemTraRong(nhanVien.matKhau, "#tbMatKhau", "Mật khẩu") &
    kiemTraRongLuong(nhanVien.luongCoBan, "#tbLuongCB", "Lương cơ bản") &
    kiemTraRong(nhanVien.gioLamTrongThang, "#tbGiolam", "Giờ làm") &
    kiemTraDoDai(
      nhanVien.taiKhoan,
      "#error_min_max_taiKhoan",
      "Tài khoản",
      4,
      6
    ) &
    kiemTraTatCaKyTu(nhanVien.hoTen, "#error_letter_hoTen", "Họ và tên") &
    kiemTraEmail(nhanVien.email, "#error_checkEmail", "Email") &
    kiemTraMatKhau(nhanVien.matKhau, "#error_checkMatKhau", "Mật khẩu") &
    kiemTraNgayLam(nhanVien.ngayLam, "#tbNgay", "Ngày làm") &
    kiemTraChucVu(nhanVien.chucVu, "#tbChucVu") &
    kiemTraGioLam(nhanVien.gioLamTrongThang, "#error_checkGioLam", 80, 200);
  if (!valid) {
    return;
  }
  mangNhanVien.push(nhanVien);
  renderTableNhanVien(mangNhanVien);
  luuLocalStorage();
  lamMoiForm();
};

function renderTableNhanVien(arrNhanVien) {
  var html = "";
  for (var i = 0; i < arrNhanVien.length; i++) {
    {
      var nhanVien = arrNhanVien[i];
      nhanVien.tinhTongLuong = function () {
        var tongluong = 0;
        if (this.chucVu === "Sếp") {
          tongluong = this.luongCoBan * 3;
        } else if (this.chucVu === "Trưởng phòng") {
          tongluong = this.luongCoBan * 2;
        } else if (this.chucVu === "Nhân viên") {
          tongluong = this.luongCoBan;
        }
        return Intl.NumberFormat("vn-VN").format(tongluong);
      };
      nhanVien.xepLoai = function () {
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
    html += `
      <tr>
        <td>${nhanVien.taiKhoan}</td>
        <td>${nhanVien.hoTen}</td>
        <td>${nhanVien.email}</td>
        <td>${nhanVien.ngayLam}</td>
        <td>${nhanVien.chucVu}</td>
        <td>${nhanVien.tinhTongLuong()}</td>
        <td>${nhanVien.xepLoai()}</td>
        <td>
        <button class="btn btn-primary px-4 mb-2" data-toggle="modal" data-target="#myModal" onclick="chinhSuaNhanVien('${
          nhanVien.taiKhoan
        }')">Edit</button>
        <button class="btn btn-danger" onclick="xoaNhanVien('${
          nhanVien.taiKhoan
        }')">Delete</button>
        </td>
      </tr>
      `;
  }

  document.querySelector("#tableDanhSach").innerHTML = html;
  return html;
}

function xoaNhanVien(taiKhoanNhanVienClick) {
  // var iDel = -1;
  // for (var i = 0; i < mangNhanVien.length; i++) {
  //   var nhanVien = mangNhanVien[i];
  //   if (nhanVien.taiKhoan === taiKhoanNhanVienClick) {
  //     iDel = i;
  //     break;
  //   }
  // }
  var iDel = mangNhanVien.findIndex(function (nhanVien) {
    return nhanVien.taiKhoan === taiKhoanNhanVienClick;
  });
  mangNhanVien.splice(iDel, 1);
  renderTableNhanVien(mangNhanVien);
}

function chinhSuaNhanVien(taiKhoanNhanVienClick) {
  var iEdit = mangNhanVien.findIndex(
    (nhanVien) => nhanVien.taiKhoan === taiKhoanNhanVienClick
  );
  var nvEdit = mangNhanVien[iEdit];
  console.log("nvEdit", nvEdit);

  document.querySelector("#tknv").disabled = true;
  document.querySelector("#tknv").value = nvEdit.taiKhoan;
  document.querySelector("#name").value = nvEdit.hoTen;
  document.querySelector("#email").value = nvEdit.email;
  document.querySelector("#password").value = nvEdit.matKhau;
  document.querySelector("#datepicker").value = nvEdit.ngayLam;
  document.querySelector("#luongCB").value = nvEdit.luongCoBan;
  document.querySelector("#chucvu").value = nvEdit.chucVu;
  document.querySelector("#gioLam").value = nvEdit.gioLamTrongThang;
}

document.querySelector("#btnCapNhat").onclick = function () {
  var nhanVien = new NhanVien();
  nhanVien.taiKhoan = document.querySelector("#tknv").value;
  nhanVien.hoTen = document.querySelector("#name").value;
  nhanVien.email = document.querySelector("#email").value;
  nhanVien.matKhau = document.querySelector("#password").value;
  nhanVien.ngayLam = document.querySelector("#datepicker").value;
  nhanVien.luongCoBan = Number(document.querySelector("#luongCB").value);
  nhanVien.chucVu = document.querySelector("#chucvu").value;
  nhanVien.gioLamTrongThang = document.querySelector("#gioLam").value;

  var iEdit = mangNhanVien.findIndex((nv) => nv.taiKhoan === nhanVien.taiKhoan);
  mangNhanVien[iEdit].hoTen = nhanVien.hoTen;
  mangNhanVien[iEdit].email = nhanVien.email;
  mangNhanVien[iEdit].ngayLam = nhanVien.ngayLam;
  mangNhanVien[iEdit].luongCoBan = nhanVien.luongCoBan;
  mangNhanVien[iEdit].chucVu = nhanVien.chucVu;
  mangNhanVien[iEdit].gioLamTrongThang = nhanVien.gioLamTrongThang;

  var valid = true;
  valid &=
    kiemTraRong(nhanVien.taiKhoan, "#tbTKNV", "Tài khoản") &
    kiemTraRong(nhanVien.hoTen, "#tbTen", "Họ và tên") &
    kiemTraRong(nhanVien.email, "#tbEmail", "Email") &
    kiemTraRong(nhanVien.matKhau, "#tbMatKhau", "Mật khẩu") &
    kiemTraRongLuong(nhanVien.luongCoBan, "#tbLuongCB", "Lương cơ bản") &
    kiemTraRong(nhanVien.gioLamTrongThang, "#tbGiolam", "Giờ làm") &
    kiemTraTatCaKyTu(nhanVien.hoTen, "#error_letter_hoTen", "Họ và tên") &
    kiemTraEmail(nhanVien.email, "#error_checkEmail", "Email") &
    kiemTraMatKhau(nhanVien.matKhau, "#error_checkMatKhau", "Mật khẩu") &
    kiemTraNgayLam(nhanVien.ngayLam, "#tbNgay", "Ngày làm") &
    kiemTraChucVu(nhanVien.chucVu, "#tbChucVu") &
    kiemTraGioLam(nhanVien.gioLamTrongThang, "#error_checkGioLam", 80, 200);
  if (!valid) {
    return;
  }

  renderTableNhanVien(mangNhanVien);
  document.querySelector("#tknv").disabled = false;
  luuLocalStorage();
  lamMoiForm();
};

function luuLocalStorage() {
  var sMangNhanVien = JSON.stringify(mangNhanVien);
  localStorage.setItem("mangNhanVien", sMangNhanVien);
}

function layLocalStorage() {
  if (localStorage.getItem("mangNhanVien")) {
    var sMangNhanVien = localStorage.getItem("mangNhanVien");
    mangNhanVien = JSON.parse(sMangNhanVien);
  }
  renderTableNhanVien(mangNhanVien);
}

window.onload = function () {
  layLocalStorage();
};

function lamMoiForm() {
  document.querySelector("#tknv").value = "";
  document.querySelector("#password").value = "";
  document.querySelector("#tknv").value = "";
  document.querySelector("#name").value = "";
  document.querySelector("#email").value = "";
  document.querySelector("#password").value = "";
  document.querySelector("#datepicker").value = "";
  document.querySelector("#luongCB").value = "";
  document.querySelector("#chucvu").value = "";
  document.querySelector("#gioLam").value = "";
}

document.querySelector("#btnTimNV").onclick = function () {
  var timKiem = document.querySelector("#searchName").value;
  var mangXepLoai = [];
  var html = "";
  document.querySelector("#tableDanhSach").style.display = "none";
  for (var i = 0; i < mangNhanVien.length; i++) {
    var loaiNhanVien = mangNhanVien[i].xepLoai();
    if (loaiNhanVien === timKiem) {
      var timKiemNhanVien = {
        taiKhoan: mangNhanVien[i].taiKhoan,
        hoTen: mangNhanVien[i].hoTen,
        email: mangNhanVien[i].email,
        ngayLam: mangNhanVien[i].ngayLam,
        chucVu: mangNhanVien[i].chucVu,
        tongluong: mangNhanVien[i].tinhTongLuong(),
        xepLoai: mangNhanVien[i].xepLoai(),
      };
      mangXepLoai.push(timKiemNhanVien);

      html += `
        <tr>
          <td>${timKiemNhanVien.taiKhoan}</td>
          <td>${timKiemNhanVien.hoTen}</td>
          <td>${timKiemNhanVien.email}</td>
          <td>${timKiemNhanVien.ngayLam}</td>
          <td>${timKiemNhanVien.chucVu}</td>
          <td>${timKiemNhanVien.tongluong}</td>
          <td>${timKiemNhanVien.xepLoai}</td>
          <td>
          <button class="btn btn-primary px-4 mb-2" data-toggle="modal" data-target="#myModal" onclick="chinhSuaNhanVien('${timKiemNhanVien.taiKhoan}')">Edit</button>
          <button class="btn btn-danger" onclick="xoaNhanVien('${timKiemNhanVien.taiKhoan}')">Delete</button>
          </td>
        </tr>
        `;
      document.querySelector("#tableDanhSachTimKiem").innerHTML = html;
      document.querySelector("#tableDanhSachTimKiem").style.display =
        "table-row-group";
    } else if (timKiem === "Xếp loại nhân viên") {
      document.querySelector("#tableDanhSachTimKiem").style.display = "none";
      document.querySelector("#tableDanhSach").style.display =
        "table-row-group";
    }
  }
};

document.querySelector("#btnDong").onclick = function () {
  document.querySelector("#tknv").disabled = false;
  lamMoiForm();
};
//   var trNhanVien = document.createElement("tr");
//   document.querySelector("#tableDanhSach").appendChild(trNhanVien);
//   var tdtaiKhoan = document.createElement("td");
//   tdtaiKhoan.innerHTML = nhanVien.taiKhoan;
//   var tdhoTen = document.createElement("td");
//   tdhoTen.innerHTML = nhanVien.hoTen;
//   var tdemail = document.createElement("td");
//   tdemail.innerHTML = nhanVien.email;
//   var tdngayLam = document.createElement("td");
//   tdngayLam.innerHTML = nhanVien.ngayLam;
//   var tdchucVu = document.createElement("td");
//   tdchucVu.innerHTML = nhanVien.chucVu;
//   var tdtongLuong = document.createElement("td");
//   tdtongLuong.innerHTML = nhanVien.tinhTongLuong();
//   var tdxepLoai = document.createElement("td");
//   tdxepLoai.innerHTML = nhanVien.xepLoai();
//   //btnXoa
//   var tdChucNang = document.createElement("td");
//   var btnXoa = document.createElement("button");
//   btnXoa.innerHTML = "Xóa";
//   btnXoa.className = "btn btn-danger";
//   btnXoa.onclick = function () {
//     var trNV = btnXoa.closest("tr");
//     trNV.remove();
//   };
//   tdChucNang.append(btnXoa);

//   trNhanVien.appendChild(tdtaiKhoan);
//   trNhanVien.appendChild(tdhoTen);
//   trNhanVien.appendChild(tdemail);
//   trNhanVien.appendChild(tdngayLam);
//   trNhanVien.appendChild(tdchucVu);
//   trNhanVien.appendChild(tdtongLuong);
//   trNhanVien.appendChild(tdxepLoai);
//   trNhanVien.appendChild(tdChucNang);
// };
