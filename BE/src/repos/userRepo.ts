import { Service, Inject } from 'typedi';

import { Document, Model } from 'mongoose';
import { IUserPersistence } from '@/persistence/dataschema/IUserPersistence';

import IUserRepo from "@/repos/IRepos/IUserRepo";
import { User } from "../domain/user/user";
import { UserId } from "../domain/user/userId";
import { UserEmail } from "../domain/user/userEmail";
import { UserMapper } from "../mappers/UserMapper";

@Service()
export default class UserRepo implements IUserRepo {
  private models: any;

  constructor(
    @Inject('userSchema') private userSchema : Model<IUserPersistence & Document>,
    @Inject('logger') private logger
  ) { }

  private createBaseQuery (): any {
    return {
      where: {},
    }
  }

  public async exists (userId: UserId | string): Promise<boolean> {

    const idX = userId instanceof UserId ? (<UserId>userId).id.toValue() : userId;

    const query = { domainId: idX};
    const userDocument = await this.userSchema.findOne( query );

    return !!userDocument === true;
  }

  public async save (user: User): Promise<User> {
    const query = { domainId: user.id.toString() };

    const userDocument = await this.userSchema.findOne( query );

    try {
      if (userDocument === null ) {
        const rawUser: any = UserMapper.toPersistence(user);

        const userCreated = await this.userSchema.create(rawUser);

        return UserMapper.toDomain(userCreated);
      } else {
        userDocument.firstName = user.firstName;
        userDocument.lastName = user.lastName;
        await userDocument.save();

        return user;
      }
    } catch (err) {
      throw err;
    }
  }

  public async findByEmail (email: UserEmail | string): Promise<User> {
    const query = { email: email.toString() };
    const userRecord = await this.userSchema.findOne( query );

    if( userRecord != null) {
      return UserMapper.toDomain(userRecord);
    }
    else
      return null;
  }

  public async findById (userId: UserId | string): Promise<User> {

    const idX = userId instanceof UserId ? (<UserId>userId).id.toValue() : userId;

    const query = { domainId: idX };
    const userRecord = await this.userSchema.findOne( query );

    if( userRecord != null) {
      return UserMapper.toDomain(userRecord);
    }
    else
      return null;
  }
}
