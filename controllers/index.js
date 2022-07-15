var mangNhanVien = [];
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
    kiemTraRong(nhanVien.taiKhoan, "#error_taiKhoan", "Tài khoản") &
    kiemTraRong(nhanVien.hoTen, "#error_hoTen", "Họ và tên") &
    kiemTraRong(nhanVien.email, "#error_email", "Email") &
    kiemTraRong(nhanVien.matKhau, "#error_matKhau", "Mật khẩu") &
    // kiemTraRong2(nhanVien.ngayLam, "error_ngayLam", "Ngày làm") &
    kiemTraRongLuong(nhanVien.luongCoBan, "#error_luongCoBan", "Lương cơ bản") &
    kiemTraRong(nhanVien.gioLamTrongThang, "#error_gioLam", "Giờ làm") &
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
    kiemTraChucVu(nhanVien.chucVu, "#error_checkChucVu") &
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
  document.querySelector("#password").disabled = true;
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
    kiemTraRong(nhanVien.taiKhoan, "#error_taiKhoan", "Tài khoản") &
    kiemTraRong(nhanVien.hoTen, "#error_hoTen", "Họ và tên") &
    kiemTraRong(nhanVien.email, "#error_email", "Email") &
    kiemTraRong(nhanVien.matKhau, "#error_matKhau", "Mật khẩu") &
    kiemTraRong(nhanVien.ngayLam, "#error_ngayLam", "Ngày làm") &
    kiemTraRong(nhanVien.luongCoBan, "#error_luongCoBan", "Lương cơ bản") &
    kiemTraRong(nhanVien.gioLamTrongThang, "#error_gioLam", "Giờ làm");
  if (!valid) {
    return;
  }

  renderTableNhanVien(mangNhanVien);
  document.querySelector("#tknv").disabled = false;
  document.querySelector("#password").disabled = false;
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
