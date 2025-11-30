import { AsbDocument } from '../../../domain/asb_document/asb_document.entity';

export class AsbDocumentPaginationResultDto {
    data: AsbDocument[];
    total: number;
    page: number;
    amount: number;
    totalPages: number;
}
