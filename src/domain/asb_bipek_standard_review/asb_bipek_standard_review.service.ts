import { AsbBipekStandardReview } from './asb_bipek_standard_review.entity';
import { CreateAsbBipekStandardReviewDto } from '../../application/asb_bipek_standard_review/dto/create_asb_bipek_standard_review.dto';
import { UpdateAsbBipekStandardReviewDto } from '../../application/asb_bipek_standard_review/dto/update_asb_bipek_standard_review.dto';

export abstract class AsbBipekStandardReviewService {
    abstract create(dto: CreateAsbBipekStandardReviewDto): Promise<AsbBipekStandardReview>;
    abstract update(dto: UpdateAsbBipekStandardReviewDto): Promise<AsbBipekStandardReview>;
    abstract delete(id: number): Promise<void>;
    abstract getById(id: number): Promise<AsbBipekStandardReview>;
}
