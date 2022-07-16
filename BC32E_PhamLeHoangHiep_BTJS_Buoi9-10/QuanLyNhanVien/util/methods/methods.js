function checkSpace(value, Error, name) {
    if (value.trim() !== '') {
        document.querySelector(Error).innerHTML = '';
        return true;
    }
    document.querySelector(Error).innerHTML = name + ' không được bỏ trống!';
    return false;
};

function checkAllLetter(value, Error, name) {
    var regexLetter = /^[A-Z a-z]+$/;
    if (regexLetter.test(value)) {
        document.querySelector(Error).innerHTML = '';
        return true;
    }
    document.querySelector(Error).innerHTML = name + ' tất cả là chữ!';
    return false;
};

function checkMail(value, Error, name) {
    var later = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\ [[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;;
    if (value.match(later)) {
        document.querySelector(Error).innerHTML = '';
        return true;
    }
    document.querySelector(Error).innerHTML = name + ' phải đúng dịnh dạng email!';
    return false;
};

function checkLength(value, Error, name, minLength, maxLength) {
    var lengthValue = value.length;
    if (lengthValue > maxLength || lengthValue < minLength) {
        document.querySelector(Error).innerHTML = name + ' từ ' + minLength + ' đến ' + maxLength;
        return false;
    }
    document.querySelector(Error).innerHTML = '';
    return true;
};

function checkDate(value, Error, name) {
    var regexDate = /^(0\[1-9]|1\[0-2\])\/(0\[1-9]|1\d|2\\d|3\[01])\/(19|20)\d{2}$/;
    if (regexDate.test(value)) {
        document.querySelector(Error).innerHTML = '';
        return true;
    }
    document.querySelector(Error).innerHTML = name + ' không đúng định dạng!';
    return false;
};

function checkClass(value, Error, name) {
    if (value === 'Sếp' || value === 'Trưởng phòng' || value === 'Nhân viên') {
        document.querySelector(Error).innerHTML = '';
        return true;
    }
    document.querySelector(Error).innerHTML = 'Vui lòng chọn ' + name;
};

function checkPass(value, Error, name) {
    var later = /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[^a-zA-Z0-9])(?!.*\s).{0,}$/;
    if (value.match(later)) {
        document.querySelector(Error).innerHTML = '';
        return true;
    }
    document.querySelector(Error).innerHTML = name + ' phải có ký tự đặc biệt, số và chữ cái viết Hoa!';
    return false;
};

function checkNumber(value, Error, name) {
    var regexNumber = /^[0-9]+$/;
    if (regexNumber.test(value)) {
        document.querySelector(Error).innerHTML = '';
        return true;
    }
    document.querySelector(Error).innerHTML = name + ' tất cả là số!';
    return false;
};

function checkMaxMin(value, Error, name, minValue, maxValue) {
    value = Number(value);
    if (value > maxValue || value < minValue) {
        document.querySelector(Error).innerHTML = name + ' từ ' + minValue + ' đến ' + maxValue;
        return false;
    }
    document.querySelector(Error).innerHTML = '';
    return true;
};