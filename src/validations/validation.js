import Joi from "@hapi/joi";


const validateUserLogin = user =>{
    const loginSchema = Joi.object({
        email: Joi.string().email().required(),
        password: Joi.string().required()
    })

    return loginSchema.validate(user)
}

const validateUserSignup = (user) =>{
    const signupSchema = Joi.object({
        first_name: Joi.string().required().max(50),
        last_name: Joi.string().required().max(50),
        email: Joi.string().email().required().max(60).regex(/^([a-zA-Z0-9_\.\-])+\@(([a-zA-Z0-9\-])+\.)+([a-zA-Z0-9]{2,4})+$/),
        password: Joi.string().required().max(15),
        role: Joi.string().valid('caterer').valid('customer').valid('admin').optional()
    }).options({
        abortEarly: false
      });
    return signupSchema.validate(user)
}

export{
    validateUserSignup,
    validateUserLogin
}