import { Field, ObjectType } from "@nestjs/graphql";

@ObjectType("SignInToken")
export class SignInTokenDto {
  @Field()
  token: string;

  @Field()
  expiredAt: Date;

  @Field()
  phoneNumber: string;
}
