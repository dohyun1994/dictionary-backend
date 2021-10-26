const express = require('express')
const DicRouter = express.Router()
const Dic = require("../models/Word")


DicRouter.get('/', async (req, res) => {
    const kor_dic_db = await Dic.find()
    console.log(kor_dic_db)
    res.json({status: 200, kor_dic_db})
})

DicRouter.get('/:id', (req, res) => {
    Dic.findById(req.params.id, (err, dic) => {
        if(err) throw err;
        res.json( {status: 200, dic} )
    })
})

DicRouter.post('/', (req, res) => {
    Dic.findOne({ name: req.body.name, done: false }, async (err, dic) => { // 중복체크 
        if(err) throw err; 
        if(!dic){ // 데이터베이스에서 해당 할일을 조회하지 못한 경우
            const newDic = new Dic(req.body); 
            await newDic.save().then( () => { 
                res.json({ status: 201, msg: 'new dic created in db !', newDic}) 
            }) 
            
        }else{ // 생성하려는 할일과 같은 이름이고 아직 끝내지 않은 할일이 이미 데이터베이스에 존재하는 경우 
            const msg = 'this dic already exists in db !' 
            console.log(msg) 
            res.json({ status: 204, msg}) 
        } 
    }) 
})

DicRouter.put('/:id', (req, res) => {
    Dic.findByIdAndUpdate(req.params.id, req.body, {new: true}, (err, dic) => {
        if(err) throw err;
        res.json( {status: 204, msg: `dic ${req.params.id} updated in db !`, dic})
    })
})

DicRouter.delete('/:id', (req, res) => { 

    Dic.findByIdAndRemove(req.params.id, (err, dic) => {
        if(err) throw err;
        res.json( {status: 204, msg: `dic ${req.params.id} removed in db !`})
    }) 
})


module.exports = DicRouter;

// /api/dic