import axios from "axios";

class BookService{
    baseUrl ="http://localhost:8080/address-book"

    getAll() {
        return axios.get(`${this.baseUrl}/get-all`);
      }
}

export default new BookService();