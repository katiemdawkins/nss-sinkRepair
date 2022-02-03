import { getRequests } from "./dataAccess.js"

const convertRequestToListElement = (requestObj) => {
    let html = `<li>${requestObj.description}</li>`

    return html
}

export const Requests = () => {
    const requests = getRequests()

    let html = `
        <ul>
            ${
                requests.map(convertRequestToListElement).join("")
            }
        </ul>
    `

    return html
}





