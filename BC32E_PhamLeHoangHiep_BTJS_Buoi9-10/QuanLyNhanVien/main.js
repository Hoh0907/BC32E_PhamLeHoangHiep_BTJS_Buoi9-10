var list = [];
document.querySelector('#btnThemNV').onclick = function() {
    var nV = new NhanVien();
    nV.taiKhoan = document.querySelector('#tknv').value;
    nV.hoTen = document.querySelector('#name').value;
    nV.mail = document.querySelector('#email').value;
    nV.password = document.querySelector('#password').value;
    nV.ngayLam = document.querySelector('#datepicker').value;
    nV.luongCoBan = document.querySelector('#luongCB').value;
    nV.chucVu = document.querySelector('#chucvu').value;
    nV.gioLam = document.querySelector('#gioLam').value;
    var valid = true;
    valid = checkSpace(nV.taiKhoan, '#error_space_taiKhoan', 'Tài khoản nhân viên') &
        checkSpace(nV.hoTen, '#error_space_hoTen', 'Họ tên') &
        checkSpace(nV.mail, '#error_space_email', 'Email') &
        checkSpace(nV.password, '#error_space_password', 'Mật khẩu') &
        checkSpace(nV.luongCoBan, '#error_space_luong', 'Lương') &
        checkSpace(nV.gioLam, '#error_space_gioLam', 'Giờ làm');

    valid &= checkNumber(nV.taiKhoan, '#error_required_taiKhoan', 'Tài khoản') &
        checkNumber(nV.luongCoBan, '#error_required_luong', 'Lương') &
        checkNumber(nV.gioLam, '#error_required_gioLam', 'Giờ làm');
    valid &= checkAllLetter(nV.hoTen, '#error_required_hoTen', 'Họ tên');
    valid &= checkLength(nV.taiKhoan, '#error_length_taiKhoan', 'Tài khoản', 4, 6) &
        checkLength(nV.password, '#error_length_password', 'Mật khẩu', 6, 10);
    valid &= checkMaxMin(nV.luongCoBan, '#error_maxMin_luong', 'Lương', 1e6, 2e7) &
        checkMaxMin(nV.gioLam, '#error_maxMin_gioLam', 'Giờ làm', 80, 200);
    valid &= checkPass(nV.password, '#error_required_password', 'Mật khẩu');
    valid &= checkMail(nV.mail, '#error_required_email', 'Email');
    valid &= checkClass(nV.chucVu, '#error_space_chucVu', 'Chức vụ');
    if (!valid) {
        return;
    }
    list.push(nV);
    renderTableNhanVien(list);
    saveLocalStorage();
}

function renderTableNhanVien(arrNhanVien) {
    var html = '';
    for (var i = 0; i < arrNhanVien.length; i++) {
        var nVien = arrNhanVien[i];
        nVien.tinhLuong = function() {
            var luong = this.luongCoBan;
            var chucVu = this.chucVu;
            var tongLuong = 0;
            if (chucVu === 'Sếp') {
                tongLuong = luong * 3;
            } else if (chucVu === 'Trưởng phòng') {
                tongLuong = luong * 2;
            } else {
                tongLuong = luong * 1;
            }
            tongLuong = tongLuong.toLocaleString();
            return tongLuong;
        };

        nVien.xepLoai = function() {
            var gioLam = this.gioLam;
            var loai = ' ';
            if (gioLam >= 192) {
                loai = 'Excellent';
            } else if (gioLam >= 176) {
                loai = 'Good';
            } else if (gioLam >= 160) {
                loai = 'Rather';
            } else {
                loai = 'Medium';
            }
            return loai;
        };
        html += `
        <tr>
        <td>${nVien.taiKhoan}</td>
        <td>${nVien.hoTen}</td>
        <td>${nVien.mail}</td>        
        <td>${moment(nVien.ngayLam).format('MM-DD-YYYY')}</td>
        <td>${nVien.chucVu}</td>
        <td>${nVien.tinhLuong()}</td>
        <td>${nVien.xepLoai()}</td>
        <td>
        <button data-toggle="modal" data-target="#myModal" class="btn btn-primary" onclick="edit('${nVien.taiKhoan}')">Sửa</button>
        <button class="btn btn-danger" onclick="deleteNv('${nVien.taiKhoan}')">Xóa</button>
        </td>
        </tr>
        `;
    };
    document.querySelector('#tableDanhSach').innerHTML = html;
    return html;
}


function edit(taiKhoanNhanVienClick) {
    var indexFind = list.findIndex(nv => nv.taiKhoan === taiKhoanNhanVienClick);
    var nhanVienEdit = list[indexFind];
    document.querySelector('#tknv').disabled = true;
    document.querySelector('#tknv').value = nhanVienEdit.taiKhoan;
    document.querySelector('#name').value = nhanVienEdit.hoTen;
    document.querySelector('#email').value = nhanVienEdit.mail;
    document.querySelector('#password').value = nhanVienEdit.password;
    document.querySelector('#datepicker').value = nhanVienEdit.ngayLam;
    document.querySelector('#luongCB').value = nhanVienEdit.luongCoBan;
    document.querySelector('#chucvu').value = nhanVienEdit.chucVu;
    document.querySelector('#gioLam').value = nhanVienEdit.gioLam;
};

document.querySelector('#btnCapNhat').onclick = function() {
    var nV = new NhanVien();
    nV.taiKhoan = document.querySelector('#tknv').value;
    nV.hoTen = document.querySelector('#name').value;
    nV.mail = document.querySelector('#email').value;
    nV.password = document.querySelector('#password').value;
    nV.ngayLam = document.querySelector('#datepicker').value;
    nV.luongCoBan = document.querySelector('#luongCB').value;
    nV.chucVu = document.querySelector('#chucvu').value;
    nV.gioLam = document.querySelector('#gioLam').value;

    var valid = true;
    valid = checkSpace(nV.taiKhoan, '#error_space_taiKhoan', 'Tài khoản nhân viên') &
        checkSpace(nV.hoTen, '#error_space_hoTen', 'Họ tên') &
        checkSpace(nV.mail, '#error_space_email', 'Email') &
        checkSpace(nV.password, '#error_space_password', 'Mật khẩu') &
        checkSpace(nV.luongCoBan, '#error_space_luong', 'Lương') &
        checkSpace(nV.gioLam, '#error_space_gioLam', 'Giờ làm') &
        checkSpace(nV.ngayLam, '#error_space_ngayLam', 'Ngày');
    valid &= checkNumber(nV.taiKhoan, '#error_required_taiKhoan', 'Tài khoản') &
        checkNumber(nV.luongCoBan, '#error_required_luong', 'Lương') &
        checkNumber(nV.gioLam, '#error_required_gioLam', 'Giờ làm');
    valid &= checkAllLetter(nV.hoTen, '#error_required_hoTen', 'Họ tên');
    valid &= checkLength(nV.taiKhoan, '#error_length_taiKhoan', 'Tài khoản', 4, 6) &
        checkLength(nV.password, '#error_length_password', 'Mật khẩu', 6, 10);
    valid &= checkMaxMin(nV.luongCoBan, '#error_maxMin_luong', 'Lương', 1e6, 2e7) &
        checkMaxMin(nV.gioLam, '#error_maxMin_gioLam', 'Giờ làm', 80, 200);
    valid &= checkPass(nV.password, '#error_required_password', 'Mật khẩu');
    valid &= checkMail(nV.mail, '#error_required_email', 'Email');
    valid &= checkClass(nV.chucVu, '#error_space_chucVu', 'Chức vụ');
    // valid &= checkDate(nhanVien.ngayLam,'#error_space_ngayLam','Ngày');
    if (!valid) {
        return;
    }

    var indexEdit = list.findIndex(nv => nv.taiKhoan === nV.taiKhoan);
    list[indexEdit].taiKhoan = nV.taiKhoan;
    list[indexEdit].hoTen = nV.hoTen;
    list[indexEdit].mail = nV.mail;
    list[indexEdit].password = nV.password;
    list[indexEdit].ngayLam = nV.ngayLam;
    list[indexEdit].luongCoBan = nV.luongCoBan;
    list[indexEdit].chucVu = nV.chucVu;
    list[indexEdit].gioLam = nV.gioLam;
    renderTableNhanVien(list);
    document.querySelector('#tknv').disabled = false;
    saveLocalStorage();

};


function deleteNv(taiKhoanNhanVienClick2) {
    var indexDel = list.findIndex(nV => nV.taiKhoan === taiKhoanNhanVienClick2);
    if (indexDel !== -1) {
        list.splice(indexDel, 1);
    }
    renderTableNhanVien(list);
};

document.querySelector('#btnTimNV').onclick = function() {
    var search = document.querySelector('#searchName').value;
    var searchNhanVien = list.filter(value => {
        return value.xepLoai().toUpperCase().includes(search.toUpperCase())
    });
    renderTableNhanVien(searchNhanVien);
};

function saveLocalStorage() {
    var saveList = JSON.stringify(list);
    localStorage.setItem('listNhanVien', saveList);
};

function pickLocalStorage() {
    if (localStorage.getItem('listNhanVien')) {
        var saveList = localStorage.getItem('listNhanVien');
        list = JSON.parse(saveList);
        renderTableNhanVien(list);
    }
};
window.onload = function() {
    pickLocalStorage();
};