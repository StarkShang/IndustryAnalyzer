import { CreateConceptInput } from "@/models";
import { Concept } from "../models/concept";
import { DbManager } from "./manager";

export class ConceptManager extends DbManager {
    public async create(concept: CreateConceptInput): Promise<Concept> {
        return await Concept.create(concept);
    }
}
