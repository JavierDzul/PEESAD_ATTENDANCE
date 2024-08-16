import axios from 'axios';

const api = axios.create({
    baseURL: import.meta.env.VITE_API_URL 
})
const apiAuth = axios.create({
    baseURL: import.meta.env.VITE_API_URL_AUTH 
})


export const axiosWithoutToken = async( endpoint: string, data?: any, method = 'GET' ) => {
 

    if ( method === 'GET' ) {
        try {        
            const resp = await api({
                method,
                url: endpoint
            })
           
            if(resp.data['status'] == true){
                return  resp.data;            
            }
            else{
                throw Error(resp.data['message']);
            }
            

        } catch (error: any) {
            console.log(error)
            throw error;
        }

    } else {

        try {
            const resp = await api({
                method,
                url: endpoint,
                headers: {
                    'Content-type': 'application/json'
                },
                data
            });
            if(resp.data['status'] == true){
                return  resp.data;
            }
            else{
                console.log(resp)
                throw Error(resp.data['message'])
            }
        } catch (error: any) {
            throw error;
        }

       
    }

}



export const axiosWithToken = async( endpoint: string, data?: any, method = 'GET' ) => {
    
    const accessToken = localStorage.getItem('token') || '';


    if ( method === 'GET' ) {

        try {        
            const resp = await api({
                method,
                url: endpoint,
                headers: {
                    Authorization: `Bearer ${accessToken}`
                },
            })
            return resp.data;

        } catch (error: any) {
            return error.response.data
        }

    } else {

        if(data !== null){
            
            try {
                console.log("method")
                console.log(method)

                console.log("url")
                console.log(endpoint)

                const resp = await api({
                    
                    method,
                    url: endpoint,
                    headers: {
                        'Content-type': 'application/json',
                        Authorization: `Bearer ${accessToken}`
                    },
                    data
                });
        
            return await resp.data;
            } catch (error: any) {
                return error.response.data
            }
        

        }
        else{

            try {
                console.log("method")
                console.log(method)

                console.log("url")
                console.log(endpoint)

                const resp = await api({
                    
                    method,
                    url: endpoint,
                    headers: {
                        'Content-type': 'application/json',
                        Authorization: `Bearer ${accessToken}`
                    },
                    //data
                });
        
            return await resp.data;
            } catch (error: any) {
                return error.response.data
            }
        

       
        }

       
    }

}




export const axiosWithTokenAccess = async( endpoint: string, data?: any, method = 'GET' ) => {
    
    const accessToken = localStorage.getItem('token') || '';

    try {
        const resp = await apiAuth({
            method,
            url: endpoint,
            headers: {
                'Content-type': 'application/json',
                Authorization: `Bearer ${accessToken}`
            },
            data
        });
        return resp.data;
    } catch (error: any) {
        return error.response.data;
    }
};