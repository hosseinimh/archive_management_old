import { BASE_URL, PAGE_ITEMS } from "../../constants";
import Entity from "./Entity";

export class Document extends Entity {
    constructor() {
        super();
    }

    async getPaginate(_pn = 1, _pi = PAGE_ITEMS) {
        return await this.handlePost(`${BASE_URL}/u/documents`, {
            _pn,
            _pi,
        });
    }

    async get(id) {
        return await this.handlePost(`${BASE_URL}/u/documents/show/${id}`);
    }

    async getAddProps(year) {
        return await this.handlePost(`${BASE_URL}/a/documents/add_props`, {
            year,
        });
    }

    async store(documentNo, paymentNo, paymentDate, owner, description) {
        return await this.handlePost(`${BASE_URL}/a/documents/store`, {
            document_no: documentNo,
            payment_no: paymentNo,
            payment_date: paymentDate,
            owner,
            description,
        });
    }

    async update(id, documentNo, paymentNo, paymentDate, owner, description) {
        return await this.handlePost(`${BASE_URL}/a/documents/update/${id}`, {
            document_no: documentNo,
            payment_no: paymentNo,
            payment_date: paymentDate,
            owner,
            description,
        });
    }
}
