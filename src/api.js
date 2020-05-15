import axios from "axios";

export const callApi = (data) =>{
    const url = data.url;
    const method = data.method;
    const payload = data.data;
    const secret = data.secret;

    return new Promise((resolve, reject) => {
        axios.defaults.headers.common['Content-Type'] = `application/json`;
        axios.defaults.headers.common['Authorization'] = secret;
        axios
            .request({
                url: url,
                method: method,
                data: payload
            })

            // taking action on response
            .then(response => {
                resolve(response);
            })

            //  handling error
            .catch((error) => {
                reject(error);
            });
    });
};
