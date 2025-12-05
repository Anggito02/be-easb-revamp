import { IsEnum, IsInt, IsString } from 'class-validator';
import { DocumentSpec } from '../../../domain/asb_document/document_spec.enum';

export class CreateAsbDocumentDto {
    @IsInt()
    idAsb: number;

    @IsEnum(DocumentSpec)
    spec: DocumentSpec;
}
