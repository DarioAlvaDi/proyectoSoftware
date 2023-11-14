const express = require('express');
const router = express.Router();

router.get('/', (req, res) => {
   res.send('Hello World');
});

router.get('/login', (req, res) => {
   console.log(req.query);
   res.send('Login');
})

router.get('/signup', (req, res) => {
   console.log(req.body);
   res.send('sing');
})



module.exports = router;