import { JalanMutuBeton } from "../../../domain/jalan_mutu_beton/jalan_mutu_beton.entity";

export class JalanRuangLingkupPerkerasanLenturPaginationResultDto {
    data!: JalanMutuBeton[];
    total!: number;
    page!: number;
    limit!: number;
    totalPages!: number;
}
