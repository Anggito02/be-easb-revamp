import { AsbBipekNonStdReview } from './asb_bipek_non_std_review.entity';
import { CreateAsbBipekNonStdReviewDto } from '../../application/asb_bipek_non_std_review/dto/create_asb_bipek_non_std_review.dto';
import { UpdateAsbBipekNonStdReviewDto } from '../../application/asb_bipek_non_std_review/dto/update_asb_bipek_non_std_review.dto';

export abstract class AsbBipekNonStdReviewRepository {
    abstract create(
        dto: CreateAsbBipekNonStdReviewDto,
    ): Promise<AsbBipekNonStdReview>;
    abstract update(
        dto: UpdateAsbBipekNonStdReviewDto,
    ): Promise<AsbBipekNonStdReview>;
    abstract delete(id: number): Promise<void>;
    abstract findById(id: number): Promise<AsbBipekNonStdReview | null>;
    abstract findByAsb(idAsb: number, page: number, amount: number): Promise<[AsbBipekNonStdReview[], number]>;
}
