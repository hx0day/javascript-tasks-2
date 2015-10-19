'use strict';

var phoneBook = {}; // Здесь вы храните записи как хотите

function isValidName(name) {
    return /^[a-zа-яё]+$/i.test(name);
}

function isValidPhone(phone) {
    return /^(\+?(\d{1,3})|(\d{1,2}))\s?(\(?\d{3}\)|\d{3})[\s|-]?\d{3}[\s|-]?\d{1}[\s|-]?\d{3}/
        .test(phone);
}

function isValidEmail(email) {
    return /^[0-9A-z\-_]+@[0-9A-zА-яё\-_]+(\.[0-9A-zА-яё\-_]+)+/i.test(email);
}
/*
 Функция добавления записи в телефонную книгу.
 На вход может прийти что угодно, будьте осторожны.
 */
module.exports.add = function add(name, phone, email) {
    if (isValidName(name) && isValidPhone(phone) && isValidEmail(email)) {
        var key = name + phone + email;
        phoneBook[key] = {
            name: name,
            phone: phone,
            email: email
        };
        var result = 'add ' + name + ', ' + phone + ', ' + email;
        console.log(result);
    }
};

/*
 Функция поиска записи в телефонную книгу.
 Поиск ведется по всем полям.
 */
module.exports.find = function find(query) {
    var keys = Object.keys(phoneBook);
    keys.forEach(function (key) {
        if (key.indexOf(query) >= 0) {
            var result = 'find ' + phoneBook[key].name + ', ' + phoneBook[key].phone +
                ', ' + phoneBook[key].email;
            console.log(result);
        }
    });
};

/*
 Функция удаления записи в телефонной книге.
 */
module.exports.remove = function remove(query) {
    var keys = Object.keys(phoneBook);
    keys.forEach(function (key) {
        if (key.indexOf(query) >= 0) {
            var result = 'del ' + phoneBook[key].name + ', ' + phoneBook[key].phone +
                ', ' +
                phoneBook[key].email;
            console.log(result);
            delete phoneBook[key];
        }
    });
};

/*
 Функция импорта записей из файла (задача со звёздочкой!).
 */
module.exports.importFromCsv = function importFromCsv(filename) {
    var data = require('fs')
        .readFileSync(filename, 'utf-8');
    var pattern = /\r\n|\r|\n/g;
    var new_pattern = data.replace(pattern, '\n');
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

    var keys = Object.keys(phoneBook);

    keys.forEach(function (key) {

        lengthPhone = phoneBook[key].phone.length;
        lengthName = phoneBook[key].name.length;
        lengthEmail = phoneBook[key].email.length;
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
    });

    maxLengthTable = (maxLengthPhone + maxLengthName + maxLengthEmail + 10);
    if (lengthTable < maxLengthTable) {
        lengthTable = maxLengthTable;
    }
    console.log('-'.repeat(lengthTable));
    console.log('| Имя ' + ' '.repeat(collSpaceName) + '| Телефон ' + ' '.repeat(collSpacePhone) +
        '| email ' + ' '.repeat(collSpaceEmail) + '|');
    console.log('-'.repeat(lengthTable));

    keys.forEach(function (key) {
        collSpacePhone = maxLengthPhone - phoneBook[key].phone.length;
        collSpaceName = maxLengthName - phoneBook[key].name.length;
        collSpaceEmail = maxLengthEmail - phoneBook[key].email.length;
        console.log('| ' + phoneBook[key].name + ' '.repeat(collSpaceName) + ' | ' +
            phoneBook[key].phone + ' '.repeat(collSpacePhone) + ' | ' + phoneBook[
                key].email +
            ' '.repeat(collSpaceEmail) + ' |');
    });
    console.log('-'.repeat(lengthTable));
};

String.prototype.repeat = String.prototype.repeat || function (n) {
    return new Array(n + 1)
        .join(this);
};
