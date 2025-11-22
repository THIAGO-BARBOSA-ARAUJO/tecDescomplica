import Joi from "joi"

const studentSchema = Joi.object({
    name: Joi.string().alphanum().min(3).max(50).required(),
    registration: Joi.allow(),
    cpf: Joi.allow(),
    rg: Joi.allow(),
    email: Joi.allow(),
    nameMother: Joi.allow(),
    profession: Joi.allow(),
    maritalStatus: Joi.allow(),
    financialSituation: Joi.allow(),
    telephone: Joi.allow(),
    street: Joi.allow(),
    number: Joi.allow(),
    complement: Joi.allow(),
    neighborhood: Joi.allow(),
    state: Joi.allow(),
    cep: Joi.allow(),
    dateBirth: Joi.allow(),
    startCourse: Joi.allow(),
    Course: Joi.allow(),
    sexo: Joi.allow(),
});

export default studentSchema