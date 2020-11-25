import jsonResponse from '../helpers/jsonResponse';

class registerMiddleware {
    static signUp (req, res, next) {
        const { firstName, lastName, category, email, password } = req.body;

        if(!firstName || !lastName || !category || !email || !password){
           return jsonResponse.error(res, 'error', 401, 'all input values are required')
        }

        if(!(/[\w]+@[a-zA-Z]+\.[a-zA-Z]{2}/.test(email))){
          return jsonResponse.error(res, 'error', 401, 'invalid email format')
        }
        
        next();
    }
} 

export default registerMiddleware;