const express = require('express')
const WordRouter = express.Router()

const Word = require('../../models/Word')

WordRouter.route('/(:word)?').get( async(req, res) => {
    let words = []
    const { word } = req.params
    const queries = word.split(',')
    console.log(queries)
    
    if(word !== "undefined" && word !== undefined) {          // 사용자로부터 쿼리가 존재하는 경우
        //console.log(queries)

        // 데이터베이스에서 쿼리로 단어를 검색
        // db.collection.find({ r_word: word })// 쿼리로 DB 검색
        //console.log(word)
       
       try {
           console.log('단어쿼리...')
        //    words = await Word.find( {r_des: {$in: [
        //        {$regex: "법규"},
        //        {$regex: "계속"}
        //    ]} })

        //     // words = await  Word.find( {r_word: word} )
        //     //words = await Word.find( {r_word: { $regex: `^${word}`}} )  // 데이터베이스에서 검색어로 시작하는 모든 document 추출.
        //     //words = await Word.find( {r_word: { $regex: `${word}$`}} )  // 데이터베이스에서 검색어로 끝나는 모든 document 추출.
        //     //words = await Word.find( { r_des: { $regex: `${word}`}})        // 설명 부분에서 검색어가 포함된 도큐먼트 검색.
            words = await Word.find( {
                $or: [
                    {r_word: {$regex: `${word}`}},
                    {r_des: {$regex: `${word}` }}
                ]
            }).sort({"_id": -1})        // -1: 최신순(내림차순), 1: 과거순(오름차순)
            .limit(6)       //
        } catch(e) {
        console.log(e)          // 에러발생시 서버에 에러 로그 기록.
    }
       
           
        
    } else {        // 쿼리가 없는 경우
        console.log(word)
        console.log(`word database: ${Word}`)
        
        try {
            words = await Word.find()
        } catch(e) {
            console.log(e)          // 에러발생시 서버에 에러 로그 기록.
        }
        
        
    }
    res.json( {status:200, words})
})

module.exports = WordRouter