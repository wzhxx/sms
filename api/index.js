//引入express模块
const express = require("express")
    //定义路由级中间件
const router = express.Router()
    //引入数据模型模块
const Student = require("../models/student")
const Teacher = require("../models/teacher")

// 查询所有学生
router.get("/student", (req, res) => {
    Student.find({})
        .sort({ update_at: -1 })
        .then(students => {
            res.json(students);
        })
        .catch(err => {
            console.log(2);
            res.json(err);
        })
})


// 添加一个学生
router.post("/addStudent", (req, res) => {
    //使用Student model上的create方法储存数据
    req.body.time = new Date().getTime()
    Student.create(req.body, (err, student) => {
        if (err) {
            res.json(err);
        } else {
            res.json(student);
        }
    })
})

// 删除一个学生
router.post("/delStudent", (req, res) => {
    //使用Student model上的create方法储存数据

    Student.remove({ _id: req.body.id }, (err, result) => {
        console.log(result)
    })
})

// 修改一个学生
router.post("/editStudent", (req, res) => {
    console.log(req.body)

    Student.update({ _id: req.body._id }, req.body, (err, student) => {
        if (err) {
            res.json(err);
        } else {
            res.json(student);
        }
    })
})




// 查询所有学生
router.get("/teacher", (req, res) => {
    Teacher.find({})
        .sort({ update_at: -1 })
        .then(teachers => {
            res.json(teachers);
        })
        .catch(err => {
            console.log(2);
            res.json(err);
        })
})


// 添加一个学生
router.post("/addTeacher", (req, res) => {
    //使用Student model上的create方法储存数据
    req.body.time = new Date().getTime()
    Teacher.create(req.body, (err, teacher) => {
        if (err) {
            res.json(err);
        } else {
            res.json(teacher);
        }
    })
})

// 删除一个学生
router.post("/delTeacher", (req, res) => {
    //使用Student model上的create方法储存数据

    Teacher.remove({ _id: req.body.id }, (err, result) => {
        console.log(result)
    })
})

// 修改一个学生
router.post("/editTeacher", (req, res) => {
    console.log(req.body)

    Teacher.update({ _id: req.body._id }, req.body, (err, teacher) => {
        if (err) {
            res.json(err);
        } else {
            res.json(teacher);
        }
    })
})

module.exports = router;