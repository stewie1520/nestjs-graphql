import { Field, InputType } from "@nestjs/graphql";
import { IsPhoneNumber } from "class-validator";

@InputType()
export class RequestSignInDto {
  @Field()
  @IsPhoneNumber("US")
  phoneNumber: string;
}
