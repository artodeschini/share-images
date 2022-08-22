const service = require('../service/UserService');

class UserController {

    async create(req, res) {
        try {
            const check = service.create(req.body); 
            if (check) {
                res.status(201)
                res.json({});
            } else {
                res.status(400)
                res.json({});
            }
           
        } catch (error) {
            console.log(error);
            res.status(500);
            res.json({});
        }
        
    }
}

module.exports = new UserController();