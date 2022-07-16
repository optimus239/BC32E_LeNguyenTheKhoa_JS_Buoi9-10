function kiemTraRong(value, selectorError, name) {
  if (value.trim() !== "") {
    document.querySelector(selectorError).innerHTML = "";
    return true;
  }
  document.querySelector(selectorError).innerHTML =
    name + " không được để trống";
  return false;
}

function kiemTraRongLuong(value, selectorError, name) {
  if (value !== 0) {
    document.querySelector(selectorError).innerHTML = "";
    return true;
  }
  document.querySelector(selectorError).innerHTML =
    name + " không được để trống";
  return false;
}

function kiemTraDoDai(value, selectorError, name, minLength, maxLength) {
  var lengthValue = value.length;
  if (lengthValue < minLength || lengthValue > maxLength) {
    document.querySelector(selectorError).innerHTML =
      name + " từ " + minLength + " đến " + maxLength + " ký tự";
    return false;
  }
  document.querySelector(selectorError).innerHTML = "";
  return true;
}

function kiemTraTatCaKyTu(value, selectorError, name) {
  var regexLetter =
    /^[a-zA-ZÀÁÂÃÈÉÊÌÍÒÓÔÕÙÚĂĐĨŨƠàáâãèéêìíòóôõùúăđĩũơƯĂẠẢẤẦẨẪẬẮẰẲẴẶẸẺẼỀỀỂẾưăạảấầẩẫậắằẳẵặẹẻẽềềểếỄỆỈỊỌỎỐỒỔỖỘỚỜỞỠỢỤỦỨỪễệỉịọỏốồổỗộớờởỡợụủứừỬỮỰỲỴÝỶỸửữựỳỵỷỹ\s\W|_]+$/;
  if (regexLetter.test(value)) {
    document.querySelector(selectorError).innerHTML = "";
    return true;
  }
  document.querySelector(selectorError).innerHTML = name + " tất cả là chữ !";
  return false;
}

function kiemTraEmail(value, selectorError, name) {
  var regexEmail = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;
  if (regexEmail.test(value)) {
    document.querySelector(selectorError).innerHTML = "";
    return true;
  }
  document.querySelector(selectorError).innerHTML =
    name + " không đúng định dạng !";
  return false;
}

function kiemTraMatKhau(value, selectorError, name) {
  var regexMatKhau =
    /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[^a-zA-Z0-9])(?!.*\s).{0,}$/;
  if (regexMatKhau.test(value)) {
    document.querySelector(selectorError).innerHTML = "";
    return true;
  }
  document.querySelector(selectorError).innerHTML =
    name + " chứa ít nhất 1 ký tự số, 1 ký tự in hoa, 1 ký tự đặc biệt";
  return false;
}

function kiemTraChucVu(value, selectorError) {
  if (value === "Chọn chức vụ" || value === "") {
    document.querySelector(selectorError).innerHTML =
      "Chọn chức vụ cho nhân viên !";
    return false;
  } else if (
    value === "Sếp" ||
    value === "Trưởng phòng" ||
    value === "Nhân viên"
  ) {
    document.querySelector(selectorError).innerHTML = "";
    return true;
  }
}

function kiemTraGioLam(value, selectorError, minTime, maxTime) {
  if (value < minTime || value > maxTime) {
    document.querySelector(selectorError).innerHTML =
      "Giờ làm thấp nhất từ " + minTime + " đến " + maxTime;
    return false;
  }
  document.querySelector(selectorError).innerHTML = "";
  return true;
}

function kiemTraNgayLam(value, selectorError, name) {
  var regexDay = /^(0?[1-9]|1[0-2])\/(0?[1-9]|1\d|2\d|3[01])\/(19|20)\d{2}$/;
  if (regexDay.test(value)) {
    document.querySelector(selectorError).innerHTML = "";
    return true;
  }
  document.querySelector(selectorError).innerHTML =
    name + " không được để trống hoặc nhập sai !";
  return false;
}
