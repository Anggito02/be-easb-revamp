import { Express } from 'express';
import { AsbDocument } from './asb_document.entity';
import { DocumentSpec } from './document_spec.enum';
import { CreateAsbDocumentDto } from '../../presentation/asb_document/dto/create_asb_document.dto';
import { UpdateAsbDocumentDto } from '../../presentation/asb_document/dto/update_asb_document.dto';
import { GetAsbDocumentListFilterDto } from '../../presentation/asb_document/dto/get_asb_document_list_filter.dto';
import { GetAsbDocumentByAsbDto } from '../../presentation/asb_document/dto/get_asb_document_by_asb.dto';
import { KertasKerjaDto } from 'src/presentation/asb_document/dto/kertas_kerja.dto';
import { SuratPermohonanDto } from 'src/presentation/asb_document/dto/surat_permohonan,dto';

export abstract class AsbDocumentService {
    abstract create(
        dto: CreateAsbDocumentDto,
        file: Express.Multer.File,
    ): Promise<AsbDocument>;
    abstract update(
        id: number,
        dto: UpdateAsbDocumentDto,
        file?: Express.Multer.File,
    ): Promise<AsbDocument>;
    abstract delete(id: number): Promise<void>;
    abstract findById(id: number): Promise<AsbDocument>;
    abstract findAll(
        page: number,
        amount: number,
        filters?: GetAsbDocumentListFilterDto,
    ): Promise<{ data: AsbDocument[]; total: number }>;
    abstract findBySpec(spec: DocumentSpec): Promise<AsbDocument[]>;
    abstract getByAsb(dto: GetAsbDocumentByAsbDto): Promise<{ data: AsbDocument[], total: number, page: number, amount: number, totalPages: number }>;
    abstract deleteByAsbId(idAsb: number): Promise<void>;
    abstract generateAsbKertasKerja(dto: KertasKerjaDto): Promise<boolean>;
    abstract generateSuratPermohonan(dto: SuratPermohonanDto): Promise<boolean>;
    abstract downloadAllByAsbAsZip(idAsb: number): Promise<{ buffer: Buffer, filename: string }>;
    abstract downloadByAsbAndSpec(idAsb: number, spec: DocumentSpec): Promise<{ buffer: Buffer, filename: string }>;
}
