import { IsOptional, IsEnum, IsString } from 'class-validator';
import { DocumentSpec } from '../../../domain/asb_document/document_spec.enum';

export class GetAsbDocumentListFilterDto {
    @IsOptional()
    @IsEnum(DocumentSpec)
    spec?: DocumentSpec;

    @IsOptional()
    @IsString()
    filename?: string;
}
