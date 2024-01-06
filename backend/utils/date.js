
export const addDays = ({ year, month, date }, daysToBeAdd) => {
    const DOJ =new Date(`${year}-${month}-${date}T00:00:00.000Z`)
    const DOE =new Date(`${year}-${month}-${date}T00:00:00.000Z`)
    DOE.setDate(DOE.getDate() + daysToBeAdd)
    return { DOJ, DOE }
}

export const convertStringToDate = (dateStr) => {
    const dateObj = new Date(dateStr)
    const year = dateObj.getFullYear();
    const month = dateObj.getMonth() + 1;
    const date = dateObj.getDate();

    return `${date}-${month}-${year}`
}

export const addZeroToDate = (year, month, date) => {
    month = month > 9 ? month.toString() : `0${month}`
    date = date > 9 ? date.toString() : `0${date}`
    return { year, month, date }
}