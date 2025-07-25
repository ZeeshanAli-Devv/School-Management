import moment from "moment"

const getSession = ()=>{
    const currentYear = moment().year()
    const nextYear = moment().add(1, "year").year()
    const session = `${currentYear}-${nextYear.toString().slice(2)}`
    return session
}

export default getSession