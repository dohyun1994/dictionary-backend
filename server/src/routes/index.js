const express = require('express') 
const router = express.Router() 
// const dic = require('./dic')         
const word = require('./word')

// router.use('/dics', dic)      // api/kor_dic_db/ 

router.use('/words', word)           // api/word
module.exports = router
