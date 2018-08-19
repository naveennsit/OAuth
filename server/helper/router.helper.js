var validator = require('validator');

module.exports = {
    validateSinUpRequest: () => {
        return (req, res, next) => {
            if(!(req.body.email) || validator.isEmpty(req.body.email)){
                return res.status(400).json({message:"Email is required"});
            }
            if(!(req.body.password) || validator.isEmpty(req.body.password)){
                return res.status(400).json({message:"Password is required"});
            }
            const isEmailValid = validator.isEmail(req.body.email);

            if (!isEmailValid) {
                return res.status(400).json("email is not valid");
            }
            next();
        }
    },

}