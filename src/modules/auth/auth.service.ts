import { Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { InjectRepository } from '@nestjs/typeorm';
import { SSOResponse } from 'src/dtos/sso-response.dto';
import { User } from 'src/entities/user.entity';
import { UserRoleEnum } from 'src/enums/userRole-enum';
import { Repository } from 'typeorm';

@Injectable()
export class AuthService {
  constructor(
    @InjectRepository(User) private userRepository: Repository<User>,
    private jwtService: JwtService,
  ) {}

  async authenticate(tokenID: string) {
    const secretKey = process.env.SSO_SECRET_KEY;
    const clientID = process.env.SSO_CLIENT_ID;
    try {
      const accesstokenRes = await fetch(
        `http://localhost:5000/api/auth/access-token?clientId=${clientID}`,
        {
          method: 'POST',
          body: JSON.stringify({
            tokenID,
            clientSecret: secretKey,
          }),
          headers: {
            'Content-Type': 'application/json',
          },
        },
      );

      const data = (await accesstokenRes.json()) as SSOResponse<any>;
      if (data.error) {
        throw new Error('');
      }

      const token = data.body['token'];
      const userRes = await fetch(
        `http://localhost:5000/api/auth/get-me?clientId=${clientID}&clientSecret=${secretKey}`,
        {
          method: 'GET',
          headers: {
            'Content-Type': 'application/json',
            Authorization: `Bearer ${token}`,
          },
        },
      );

      const user = (await userRes.json()) as SSOResponse<any>;

      let myUser = await this.userRepository.findOne({
        where: {
          ssoID: user.body.id,
        },
        relations: {
          profile: true,
        },
      });

      console.log(myUser);

      if (!myUser) {
        myUser = this.userRepository.create({
          role: UserRoleEnum.USER,
          ssoID: user.body.id,
          profile: {
            firstName: user.body.firstName,
            lastName: user.body.lastName,
          },
        });
      }
      myUser = await this.userRepository.save(myUser);

      const payload = {
        sub: myUser.id,
        ssoID: myUser.ssoID,
        firstName: myUser.profile.firstName,
        lastName: myUser.profile.lastName,
      };

      return { accessToken: await this.jwtService.signAsync(payload) };
    } catch (error) {
      console.log(error);
      if (error instanceof Error) {
        throw new Error(error.message);
      }
    }
  }
}
