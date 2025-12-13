import { JalanSpesifikasiDesainKaku } from "../../../domain/jalan_spesifikasi_desain_kaku/jalan_spesifikasi_desain_kaku.entity";

export class JalanSpesifikasiDesainKakuPaginationResultDto {
    data!: JalanSpesifikasiDesainKaku[];
    total!: number;
    page!: number;
    limit!: number;
    totalPages!: number;
}
