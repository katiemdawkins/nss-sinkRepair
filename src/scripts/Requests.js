import { getRequests } from "./dataAccess.js"
import { deleteRequest } from "./dataAccess.js"
import { getPlumbers } from "./dataAccess.js"
import { saveCompletion } from "./dataAccess.js"

const convertRequestToListElement = (requestObj) => {
    let html = `<li>
        ${requestObj.description}
        ${selectPlumber(requestObj)}
        <button class="request__delete"
            id="request--${requestObj.id}">
            Delete
        </button>
    </li>`

    return html
}


const selectPlumber = (request) =>{
    const plumbers = getPlumbers()

    let html = `
        <select class="plumbers" id="plumbers">
            <option value="">Choose</option>
            ${
                plumbers.map(
                    plumber => {
                    return `<option value="${request.id}--${plumber.id}">${plumber.name}</option>`
            }
        ).join("")
        }
        </select>`

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

const mainContainer = document.querySelector("#container")

////////////////////////////////////////EVENT LISTENER FOR DELETE///////////////////////
mainContainer.addEventListener("click", click => {
    if (click.target.id.startsWith("request--")) {
        const [,requestObjId] = click.target.id.split("--")
        deleteRequest(parseInt(requestObjId))
    }
})





////////////////////////////////////////EVENT LISTENER - Create Completion Object///////////////////////
mainContainer.addEventListener(
    "change",
    (event) => {
        if (event.target.id === "plumbers") {
            const [requestId, plumberId] = event.target.value.split("--")
            const date = Date.now()
          
            const completion = { 
                requestId: parseInt(requestId),
                plumberId: parseInt(plumberId),
                date_created: date
            }

            saveCompletion(completion)
            /*
                Invoke the function that performs the POST request
                to the `completions` resource for your API. Send the
                completion object as a parameter.
             */

        }
    }
)

//add event listener for "requestCompleted"
// document.addEventListener(
//     "requestCompleted",
//     (changeEvent)=> {
//         const targetHTML = document.querySelector("")
//         targetHTML.innerHTML = //invoke function
//     }
// )



