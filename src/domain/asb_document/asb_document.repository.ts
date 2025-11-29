import { AsbDocument } from './asb_document.entity';
import { DocumentSpec } from './document_spec.enum';
import { CreateAsbDocumentDto } from '../../presentation/asb_document/dto/create_asb_document.dto';
import { UpdateAsbDocumentDto } from '../../presentation/asb_document/dto/update_asb_document.dto';
import { GetAsbDocumentListFilterDto } from '../../presentation/asb_document/dto/get_asb_document_list_filter.dto';

export abstract class AsbDocumentRepository {
    abstract create(
        dto: CreateAsbDocumentDto,
        filename: string,
    ): Promise<AsbDocument>;
    abstract update(
        id: number,
        dto: UpdateAsbDocumentDto,
        filename?: string,
    ): Promise<AsbDocument>;
    abstract delete(id: number): Promise<void>;
    abstract findById(id: number): Promise<AsbDocument | null>;
    abstract findAll(
        page: number,
        amount: number,
        filters?: GetAsbDocumentListFilterDto,
    ): Promise<[AsbDocument[], number]>;
    abstract findBySpec(spec: DocumentSpec): Promise<AsbDocument[]>;
    abstract findByAsb(idAsb: number, page: number, amount: number): Promise<[AsbDocument[], number]>;
}
