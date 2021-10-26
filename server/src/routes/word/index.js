const express = require('express')
const WordRouter = express.Router()

const Word = require('../../models/Word')

WordRouter.route('/(:word)?').get( async(req, res) => {
    let words = []
    const { word } = req.params
    console.log(word)
    
    if(word !== "undefined" && word !== undefined) {          // 사용자로부터 쿼리가 존재하는 경우
        // 데이터베이스에서 쿼리로 단어를 검색
        // db.collection.find({ r_word: word })// 쿼리로 DB 검색
        console.log(word)
       words = await  Word.find( {r_word: word} )
       
           
        
    } else {        // 쿼리가 없는 경우
        
        words = await Word.find()
        
    }
    res.json( {status:200, words})
})

module.exports = WordRouter