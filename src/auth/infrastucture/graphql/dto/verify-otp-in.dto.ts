import { Field, InputType } from "@nestjs/graphql";

@InputType()
export class VerifyOtpInDto {
  @Field(() => String)
  phoneNumber: string;

  @Field(() => String)
  otp: string;

  @Field(() => String)
  token: string;
}
