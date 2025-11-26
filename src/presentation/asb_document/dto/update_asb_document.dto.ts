import { IsNumber, IsEnum, IsOptional } from 'class-validator';
import { DocumentSpec } from '../../../domain/asb_document/document_spec.enum';

export class UpdateAsbDocumentDto {
    @IsNumber()
    id: number;

    @IsOptional()
    @IsEnum(DocumentSpec)
    spec?: DocumentSpec;

    // File is optional for update, handled via @UploadedFile() decorator
}
