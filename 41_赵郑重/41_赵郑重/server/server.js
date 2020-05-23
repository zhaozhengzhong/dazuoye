"use strict";
const express = require('express');
const app = express();

const bodyParser = require('body-parser');
app.use(bodyParser.json());

const USERS = [
    { id: '01', userName: 'admin', password: '123456' },
    { id: '02', userName: 'aaa', password: '456789' }
];
const sb = [
    { id: '01', userName: 'aaa', password: '123456' },
    { id: '02', userName: 'bbb', password: '456789' }
];

app.all('*', function (req, res, next) {
    // 设置请求头为允许跨域
    res.header('Access-Control-Allow-Origin', '*');
    // 设置服务器支持的所有头信息字段
    res.header('Access-Control-Allow-Headers', 'Content-Type, Content-Length, Authorization, Accept, X-Requested-With , yourHeaderFeild, sessionToken');
    // 设置服务器支持的所有跨域请求的方法
    res.header('Access-Control-Allow-Methods', 'PUT, POST, GET, DELETE, OPTIONS');
    if (req.method.toLowerCase() == 'options') {
        res.send(200);  // 让options尝试请求快速结束
    } else {
        next();
    }
});


app.get('/hello', function (req, resp) {
    resp.send('哈哈哈');
    resp.end();
});

app.get('/users', function (req, resp) {
    resp.send(USERS);
    resp.end();
});
app.get('/sbs', function (req, resp) {
    resp.send(sb);
    resp.end();
});

app.get('/users/:id', function (req, resp) {
    console.log(req.params);
    const id = req.params.id;
    for (let user of USERS) {
        if (user.id === id) {
            resp.send([user]);
            break;
        }
    }
    resp.end();
});

app.get('/sbs/:id', function (req, resp) {
    console.log(req.params);
    const id = req.params.id;
    for (let user of sb) {
        if (user.id === id) {
            resp.send([user]);
            break;
        }
    }
    resp.end();
});

app.post('/user', function (req, resp) {
    USERS.push(req.body);
    resp.send({ succ: true });
    resp.end();
});
app.post('/sb', function (req, resp) {
    USERS.push(req.body);
    resp.send({ succ: true });
    resp.end();
});
app.put('/user', function (req, resp) {
    console.log('hahaha');
    let founded = false;
    for (let user of USERS) {
        if (user.id === req.body.id) {
            user.userName = req.body.userName;
            user.password = req.body.password;
            founded = true;
            break;
        }
    }

    if (founded) {
        resp.send({ succ: true });
    } else {
        resp.send({ succ: false, msg: '没有找到用户!' });
    }
    resp.end();
});
app.put('/sb', function (req, resp) {
    console.log('hahaha');
    let founded = false;
    for (let user of sb) {
        if (user.id === req.body.id) {
            user.userName = req.body.userName;
            user.password = req.body.password;
            founded = true;
            break;
        }
    }

    if (founded) {
        resp.send({ succ: true });
    } else {
        resp.send({ succ: false, msg: '没有找到用户!' });
    }
    resp.end();
});


app.delete('/user/:id', function (req, resp) {
    console.log('hehehe')
    let founded = false;
    let index = 0;
    for (let user of USERS) {

        if (user.id === req.params.id) {
            USERS.splice(index, 1);
            founded = true;
            break;
        }
        index++;
    }

    if (founded) {
        console.log('555555');
        resp.send({ succ: true });
    } else {
        console.log('没有找到用户');
        resp.send({ succ: false, msg: '没有找到用户!' });
    }
    resp.end();
});
app.delete('/sb/:id', function (req, resp) {
    console.log('hehehe')
    let founded = false;
    let index = 0;
    for (let user of sb) {

        if (user.id === req.params.id) {
            sb.splice(index, 1);
            founded = true;
            break;
        }
        index++;
    }

    if (founded) {
        console.log('555555');
        resp.send({ succ: true });
    } else {
        console.log('没有找到用户');
        resp.send({ succ: false, msg: '没有找到用户!' });
    }
    resp.end();
});

app.listen(8080, function () {
    console.log('服务器在8080端口启动！');
});
