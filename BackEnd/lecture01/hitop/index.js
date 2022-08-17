const express = require('express');
const app = express();
const path = require('path');
const ejs = require('ejs');
const cors = require('cors');
const axios = require('axios');

const corsOption = {
  origin: 'http://127.0.0.1:5502',
  credentials: true,
}; //5502가 어디서 나온건지. 클라이언트쪽 포트번호?

app.set('view engine', 'ejs');
app.use(cors());
app.use(express.static(path.join(__dirname, '/public'))); //정적 파일 css, js,images등을 서비스 해주는 경로 잡아주기...
app.use(express.json()); // json을 리턴하려면
app.get('/', (req, res) => {
  //res.json({ name: '장성호' });
  //res.send(`<h1>안녕하세요 html로 응답을 합니다.</h1>`);
  //res.sendFile(path.join(__dirname,"/views/index.html"));
  res.render('index'); // 랜더를 꼭한다.
});
app.get('/index', (req, res) => {
  res.render('index');
});
app.get('/introduce', (req, res) => {
  res.render('introduce', { mainTitle: '회사소개', title: 'company' });
});
app.get('/greeting', (req, res) => {
  res.render('greeting', { title: '인사말', mainTitle: 'company' });
});
app.get('/list', (req, res) => {
  //res.send('list 입니당'); html 또는 텍스트를 보낼수 있음
  //res.header('Access-Control-Allow-Origin', '*');
  // 허용여부 결정 : *, "http://127.0.0.1:5502"
  res.json([
    { title: '타이틀 01', contents: '내용1입니다.' },
    { title: '타이틀 02', contents: '내용2입니다.' },
    { title: '타이틀 03', contents: '내용3입니다.' },
    { title: '타이틀 04', contents: '내용4입니다.' },
    { title: '타이틀 05', contents: '내용5입니다.' },
  ]);
});
app.get('/naver', (req, res) => {
  //여기서 naver에 검색을 요청해서
  // 결과를
  //promise
  console.log(req.query);
  const queryTxt = encodeURIComponent(req.query.movieTitle);
  axios({
    url: `https://openapi.naver.com/v1/search/movie.json?query=${queryTxt}`,
    headers: {
      'X-Naver-Client-Id': '1bj5lUJ102ROHYMrRXwl',
      'X-Naver-Client-Secret': '9qpiOmtN8U', //axios 는 promise 기반
    },
  }).then(function (response) {
    console.log(response.data);
  });
  //res.json();
});
//오류페이지들 ... > 이거는 제일 마지막에 써야한다
//404 Routing 오류
app.use((req, res, next) => {
  res.status(404).render('404');
});
app.use((err, req, res, next) => {
  res.status(500).render('error', { msg: 'An unknwon error occurred' });
});

app.listen(8099, () => {
  console.log(`8099에서 서버 대기중`);
});
