import { PassportStrategy } from '@nestjs/passport';
import { Strategy, VerifyCallback } from 'passport-google-oauth20';
import { Injectable } from '@nestjs/common';
import { baseURL, PROVIDER_OAUTH_CALLBACK_URL } from './url';
import { sign } from 'jsonwebtoken';
import { AuthService } from './auth.service';
export class GoogleStrategy extends PassportStrategy(Strategy, 'google') {
  constructor(private authService: AuthService) {
    super({
      clientID: process.env.GOOGLE_OAUTH_CLIENT_ID,
      clientSecret: process.env.GOOGLE_OAUTH_SECRET_KEY,
      callbackURL: `${baseURL}${PROVIDER_OAUTH_CALLBACK_URL.GOOGLE}`,
      scope: ['email', 'profile'],
    });
  }

  // make sure to add this or else you won't get the refresh token
  // This function is called before responding redirect response(google login window)
  authorizationParams(): { [key: string]: string } {
    return {
      access_type: 'offline',
      prompt: 'consent',
    };
  }
  // validate function is middleware
  async validate(
    accessToken: string,
    refreshToken: string,
    profile: any,
    done: VerifyCallback,
  ): Promise<any> {
    const { name, emails } = profile;

    const user = {
      email: emails[0].value,
      firstName: name.givenName,
      lastName: name.familyName,
      accessToken,
      refreshToken,
    };

    done(null, user);
  }
}
