import Joi from 'joi'

const profileSchema = Joi.object({
    Username: Joi.string(),
    FullName: Joi.string(),
    Email: Joi.string(),
    Gender: Joi.string(),
    Bio: Joi.string(),
    BirthDate: Joi.string(),
    BirthPlace: Joi.string(),
    CurrentAdd: Joi.string(),
    Phone: Joi.string(),
})

export default profileSchema