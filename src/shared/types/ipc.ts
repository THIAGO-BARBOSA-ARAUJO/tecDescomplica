export interface Student {
    _id: string;
    _rev?: string;
    name: string | undefined;
    registration: number | undefined;
    cpf: string;
    rg: string;
    dateBirth: string | undefined;
    sexo: string;
    email: string;
    nameMother: string;
    profession: string;
    maritalStatus: string;
    financialSituation: string;
    Course: string;
    telephone: number;
    startCourse: string;
    street: string;
    number: number;
    complement: string;
    neighborhood: string;
    state: string;
    cep: number;
}

export interface NewStudent {
    name: string;
    registration: number;
    cpf: string;
    rg: string;
    dateBirth: string;
    sexo: string;
    email: string;
    nameMother: string;
    profession: string;
    maritalStatus: string;
    financialSituation: string;
    Course: string;
    telephone: number;
    startCourse: string;
    street: string;
    number: number;
    complement: string;
    neighborhood: string;
    state: string;
    cep: number;
}