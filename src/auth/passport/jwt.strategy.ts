import { PassportStrategy } from '@nestjs/passport';
import { ExtractJwt, Strategy } from 'passport-jwt';
import { Injectable, UnauthorizedException } from '@nestjs/common';
import { AuthService } from '../auth.service';

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy) {
  constructor(private readonly authService: AuthService) {
    super(
      {
        jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
        secretOrKey: 'secretKey',
        passReqToCallback: true
      },
    );
  }

  async validate(req: Request, payload, done: Function) {
    const user = await this.authService.validateUser(payload.email);
    if (!user) {
      return done(new UnauthorizedException(), false);
    }else{
      payload.id = user._id
      payload.name = user.name
      return done(null, payload);
    }
    
  }
}