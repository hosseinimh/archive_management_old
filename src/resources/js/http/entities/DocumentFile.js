import { BASE_URL } from "../../constants";
import Entity from "./Entity";

export class DocumentFile extends Entity {
    constructor() {
        super();
    }

    async getAll(documentId) {
        return await this.handlePost(
            `${BASE_URL}/u/document_files/${documentId}`
        );
    }

    async get(id) {
        return await this.handlePost(`${BASE_URL}/u/document_files/show/${id}`);
    }

    async store(documentId, file, description) {
        return await this.handlePostFile(`${BASE_URL}/a/document_files/store`, {
            document_id: documentId,
            file,
            description,
        });
    }

    async update(id, description) {
        return await this.handlePostFile(
            `${BASE_URL}/a/document_files/update/${id}`,
            {
                description,
            }
        );
    }
}
