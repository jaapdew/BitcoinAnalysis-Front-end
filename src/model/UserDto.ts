import { PredictionDto } from './PredictionDto';

export class UserDto {
    id;
    userName: string;
    passWord: string;
    predictions: PredictionDto[];
}