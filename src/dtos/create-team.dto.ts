import { IsNotEmpty, Length } from 'class-validator';
// import { TeamTypeEnum } from 'src/enums/teamType-enum';

export class CreateTeamDTO {
  @IsNotEmpty()
  @Length(3, 20)
  title: string;

  @IsNotEmpty()
  @Length(3)
  description: string;

  // @IsEnum(TeamTypeEnum)
  // @IsOptional()
  // type?: TeamTypeEnum;
}
