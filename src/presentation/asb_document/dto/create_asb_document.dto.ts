import { IsEnum } from 'class-validator';
import { DocumentSpec } from '../../../domain/asb_document/document_spec.enum';

export class CreateAsbDocumentDto {
    @IsEnum(DocumentSpec)
    spec: DocumentSpec;

    // File is handled via @UploadedFile() decorator in controller
}
