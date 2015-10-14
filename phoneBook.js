'use strict';

var phoneBook = []; // Здесь вы храните записи как хотите

module.exports.isValidName = function isValidName(name) {
    return (name.split(' ')
        .length == 1 && /\s*[a-zA-Zа-яА-Я]+\s*/.test(name));
};

module.exports.isValidPhone = function isValidPhone(phone) {
    var regString = '^(([\\+]?)?([\\d]{0,3})|([\\d]{1,2}))[\\s]?(\\(?([\\d]{3}\\))|';
    regString += '[\\d]{3})[\\s|-]?[\\d]{3}[\\s|-]?[\\d]{1}[\\s|-]?[\\d]{3}';
    var reg = new RegExp(regString);
    return reg.test(phone);
};

module.exports.isValidEmail = function isValidEmail(email) {
    return /^[0-9A-zА-я\-_]{1,}@[0-9A-zА-я\-_]{1,}(\.[0-9A-zА-я\-_]{1,}){1,}/.test(email);
};
/*
 Функция добавления записи в телефонную книгу.
 На вход может прийти что угодно, будьте осторожны.
 */
module.exports.add = function add(name, phone, email) {
    if (this.isValidName(name) && this.isValidPhone(phone) && this.isValidEmail(email)) {
        phoneBook.push({
            name: name,
            phone: phone,
            email: email,
            key: name + phone + email
        });
        var result = 'add ' + name + ', ' + phone + ', ' + email + '\n';
        console.log(result);
    }
};

/*
 Функция поиска записи в телефонную книгу.
 Поиск ведется по всем полям.
 */
module.exports.find = function find(query) {
    for (var index in phoneBook) {
        if (phoneBook[index].key.indexOf(query) >= 0) {
            var result = 'find ' + phoneBook[index].name + ', ' + phoneBook[index].phone + ', ' +
                phoneBook[index].email + '\n';
            console.log(result);
        }
    }
};

/*
 Функция удаления записи в телефонной книге.
 */
module.exports.remove = function remove(query) {
    for (var index in phoneBook) {
        if (phoneBook[index].key.indexOf(query) >= 0) {
            var result = 'del ' + phoneBook[index].name + ', ' + phoneBook[index].phone + ', ' +
                phoneBook[index].email + '\n';
            console.log(result);
            delete phoneBook[index];
        }
    }
};

/*
 Функция импорта записей из файла (задача со звёздочкой!).
 */


module.exports.importFromCsv = function importFromCsv(filename) {
    var data = require('fs')
        .readFileSync(filename, 'utf-8');
    var contactAll = data.split('\n');
    for (var i = 0; i < contactAll.length - 1; i++) {
        this.add.apply(this, contactAll[i].split(';'));
    }
};

/*
 Функция вывода всех телефонов в виде ASCII (задача со звёздочкой!).
 */
module.exports.showTable = function showTable() {
    var maxLengthPhone = 7;
    var collSpacePhone = 0;
    var maxLengthName = 3;
    var collSpaceName = 0;
    var maxLengthEmail = 5;
    var collSpaceEmail = 0;
    var lengthTable = 25;
    var lengthPhone;
    var lengthName;
    var lengthEmail;
    var maxLengthTable;
    var index;

    for (index in phoneBook) {
        lengthPhone = phoneBook[index].phone.length;
        lengthName = phoneBook[index].name.length;
        lengthEmail = phoneBook[index].email.length;
        if (maxLengthPhone < lengthPhone) {
            maxLengthPhone = lengthPhone;
            collSpacePhone = maxLengthPhone - 7;
        }
        if (maxLengthName < lengthName) {
            maxLengthName = lengthName;
            collSpaceName = maxLengthName - 3;
        }
        if (maxLengthEmail < lengthEmail) {
            maxLengthEmail = lengthEmail;
            collSpaceEmail = maxLengthEmail - 5;

        }
    }

    maxLengthTable = (maxLengthPhone + maxLengthName + maxLengthEmail + 10);
    if (lengthTable < maxLengthTable) {
        lengthTable = maxLengthTable;
    }
    console.log('-'.repeat(lengthTable));
    console.log('| Имя ' + ' '.repeat(collSpaceName) + '| Телефон ' + ' '.repeat(collSpacePhone) +
        '| email ' + ' '.repeat(collSpaceEmail) + '|');
    console.log('-'.repeat(lengthTable));

    for (index in phoneBook) {
        collSpacePhone = maxLengthPhone - phoneBook[index].phone.length;
        collSpaceName = maxLengthName - phoneBook[index].name.length;
        collSpaceEmail = maxLengthEmail - phoneBook[index].email.length;
        console.log('| ' + phoneBook[index].name + ' '.repeat(collSpaceName) + ' | ' +
            phoneBook[index].phone + ' '.repeat(collSpacePhone) + ' | ' + phoneBook[index].email +
            ' '.repeat(collSpaceEmail) + ' |');
    }
    console.log('-'.repeat(lengthTable));
};

String.prototype.repeat = function (n) {
    return new Array(n + 1)
        .join(this);
};
