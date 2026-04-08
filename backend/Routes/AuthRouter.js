const { signup , login } = require('../Controllers/AuthController');
const { signupValidation , loginValidation } = require('../Middlewares/AuthValidation');

const router =  require('express').Router();

router.post('/login' , loginValidation , login);

router.post('/signup' , signupValidation , signup);  // this will make sure that once the validation is done then only signup logic works .

module.exports = router;

