import Joi from "joi"

const studentSchema = Joi.object({
    name: Joi.string().min(3).max(50).required(),
    registration: Joi.number().required(),
    cpf: Joi.number().required(),
    rg: Joi.number().required(),
    email: Joi.string().email().required(),
    nameMother: Joi.allow(),
    profession: Joi.allow(),
    maritalStatus: Joi.allow(),
    financialSituation: Joi.string().required(),
    telephone: Joi.allow(),
    street: Joi.allow(),
    number: Joi.allow(),
    complement: Joi.allow(),
    neighborhood: Joi.allow(),
    state: Joi.allow(),
    cep: Joi.allow(),
    dateBirth: Joi.allow(),
    startCourse: Joi.allow(),
    Course: Joi.string().required(),
    sexo: Joi.string().required(),
});

export default studentSchema