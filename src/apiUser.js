import axios from 'axios';
const url = 'http://localhost:5000/api/post';

export default class API {
    // Muestra las entradas
    static async getAllPost(){
        const res = await axios.get(url);
        return res.data;
    }
    // Muestra la entrada por su ID
    static async getPostByID(id){
        const res = await axios.get(`${url}/${id}`);
        return res.data;
    }
    // Inserta una entrada 
    static async addPost(post){
        const res = await axios.post(url, post);
        return res.data;
    }
    // Actualiza la entrada
    static async updatePost(id, post){
        const res = await axios.patch(`${url}/${id}`, post);
        return res.data;
    }
    // Elimina la entrada
    static async deletePost(id){
        const res = await axios.delete(`${url}/${id}`);
        return res.data;
    }
}