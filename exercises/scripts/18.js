const baseURL = 'https://supersimplebackend.dev';

// 18a
const xhr = new XMLHttpRequest();
xhr.addEventListener('load', () => {
    console.log(xhr.response);
});
xhr.open('GET', `${baseURL}/greeting`);
xhr.send();

// 18b 
const promise = fetch(`${baseURL}/greeting`)
    .then((response) => {
        return response.text()
    })
    .then((text) => {
        console.log(text);
    })

// 18c 
async function getGreeting() {
    try {
        const response = await fetch(`${baseURL}/greeting`);
        const text = await response.text();
        console.log(text);
    } catch (error) {
        console.log(error)
    }
}
getGreeting();

// 18d
async function postGreeting() {
    try {
        const request = await fetch(`${baseURL}/greeting`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                name: 'General Kenobi'
            })
        });
        const name = await request.text();
        console.log(name);
    } catch (error) {
        console.log(error);
    }
}
postGreeting();

// 18ef 
async function getAmazon() {
    try {
        const response = await fetch(`https://amazon.com`);
        const text = await response.text();
        console.log(text);
    } catch (error) {
        console.log('CORS error: Your request was blocked by the backend')
    }
}
//getAmazon();

//18g
async function postGreetingError() {
    try {
        const request = await fetch(`${baseURL}/greeting`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
        });

        if (request.status >= 400) {
            throw request;
        }

        const name = await request.text();
        console.log(name);
    } catch (error) {
        if (error.status === 400) {
            await error.json();
        } else {
            console.log('Network error. Please try again later');
        }

    }
}
postGreetingError();