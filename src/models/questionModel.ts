import{Option} from './option'
export class QuestionModel{
  question:string;
  options:Option[];
  answer:number;
  index:number;
  userAnswer?:number;
}