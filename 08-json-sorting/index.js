import fetch from "node-fetch";

const endpoints = [
    'https://jsonbase.com/sls-team/json-793',
    'https://jsonbase.com/sls-team/json-955',
    'https://jsonbase.com/sls-team/json-231',
    'https://jsonbase.com/sls-team/json-931',
    'https://jsonbase.com/sls-team/json-93',
    'https://jsonbase.com/sls-team/json-342',
    'https://jsonbase.com/sls-team/json-770',
    'https://jsonbase.com/sls-team/json-491',
    'https://jsonbase.com/sls-team/json-281',
    'https://jsonbase.com/sls-team/json-718',
    'https://jsonbase.com/sls-team/json-310',
    'https://jsonbase.com/sls-team/json-806',
    'https://jsonbase.com/sls-team/json-469',
    'https://jsonbase.com/sls-team/json-258',
    'https://jsonbase.com/sls-team/json-516',
    'https://jsonbase.com/sls-team/json-79',
    'https://jsonbase.com/sls-team/json-706',
    'https://jsonbase.com/sls-team/json-521',
    'https://jsonbase.com/sls-team/json-350',
    'https://jsonbase.com/sls-team/json-64'
];

const makeApiCall = async (url) => {
    let retries = 0;
    while (retries < 3) {
        try {
            const res = await fetch(url);
            if (!res.ok) {
                throw new Error("Oops, something went wrong");
            }
            const data = await res.json();
            if (data.isDone !== undefined) {
                console.log(`[Success] ${url}: isDone - ${data.isDone}`);
                return data.isDone;
            } else {
            throw new Error(`${url}: Response has not isDone key`);
            }
        } catch (error) {
            retries++;
            if (retries === 3) {
                console.log(`[Fail] ${url}: The endpoint is unavailable`);
                return undefined;
            }
        }
    }
}

const fetchData = async () => {
    const results = await Promise.all(endpoints.map(makeApiCall));
    const filteredTrue = results.filter(result => result === true);
    const filteredFalse = results.filter(result => result === false);

    console.log(`Number of true occurrences: ${filteredTrue.length}`);
    console.log(`Number of false occurrences: ${filteredFalse.length}`);
};

fetchData();
