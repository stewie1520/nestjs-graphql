import { Field, ObjectType } from "@nestjs/graphql";

@ObjectType("VerifyOtpOutDto")
export class VerifyOtpOutDto {
  @Field()
  accessToken: string;

  @Field()
  refreshToken: string;
}
