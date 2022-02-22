const applicationState = {
    requests: [],
    plumbers:[],
    completions:[]
}

const API = "http://localhost:8088"

///////////////////////////////////////fetch and gets requests, plumbers, completions///////////////////////////////

export const fetchRequests = () => {
    return fetch(`${API}/requests`)
        .then(response => response.json())
        .then(
            (serviceRequests) => {
                // Store the external state in application state
                applicationState.requests = serviceRequests
            }
        )
}

export const getRequests = () => {
    return applicationState.requests.map(request => ({...request}))
}

export const fetchPlumbers = () => {
    return fetch (`${API}/plumbers`)
    .then(response => response.json())
    .then(
        (plumbersArray)=>{
            applicationState.plumbers = plumbersArray
        }
    )
}

export const getPlumbers = () => {
    return applicationState.plumbers.map(plumber => ({...plumber}))
}


export const fetchCompletions = () => {
    return fetch(`${API}/completions`)
    .then(response => response.json())
    .then(
        (completetionsArray) =>{
            applicationState.completions=completetionsArray
        }
    )
}

export const getCompletions = () =>{
    return applicationState.completions.map(completion =>({...completion}))
}


////////////////////////////////////// sends/POSTS //////////////////////
const mainContainer = document.querySelector("#container")

export const sendRequest = (userServiceRequest) => {
    const fetchOptions = {
        method: "POST",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify(userServiceRequest)
    }


    return fetch(`${API}/requests`, fetchOptions)
        .then(response => response.json())
        .then(() => {
            mainContainer.dispatchEvent(new CustomEvent("stateChanged"))
        })
}


////////////////////////////////////// DELETE //////////////////////
export const deleteRequest = (id) => {
    return fetch(`${API}/requests/${id}`, { method: "DELETE" })
        .then(
            () => {
                mainContainer.dispatchEvent(new CustomEvent("stateChanged"))
            }
        )
}

////////////////////////////////////// Save //////////////////////

//using post method to create something new - transient state plumber checkt completion
//converting to permenant state and storing in database.json
export const saveCompletion = (completedRequestObj) => {
    const fetchOptions ={
        method: "POST",
        headers: {
            "Content-Type": "application.json"
        },
        body: JSON.stringify(completedRequestObj)
    }
    return fetch (`${API}/completions`, fetchOptions)
    .then(response => response.json())
    .then(()=>{
        mainContainer.dispatchEvent(new CustomEvent("requestCompleted"))
    })
}


