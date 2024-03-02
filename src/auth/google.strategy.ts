import { PassportStrategy } from '@nestjs/passport';
import { Strategy, VerifyCallback } from 'passport-google-oauth20';
import { Injectable } from '@nestjs/common';
import { ClientURL, PROVIDER_OAUTH_CALLBACK_URL } from './url';
import { sign } from 'jsonwebtoken';

export class GoogleStrategy extends PassportStrategy(Strategy, 'google') {
  constructor() {
    const callbackURL = `${ClientURL}${PROVIDER_OAUTH_CALLBACK_URL.GOOGLE}`;
    super({
      clientID: process.env.GOOGLE_OAUTH_CLIENT_ID,
      clientSecret: process.env.GOOGLE_OAUTH_SECRET_KEY,
      callbackURL: callbackURL,
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
    const payload = {
      email: user.email,
      name: user.firstName + user.lastName,
      accessToken,
      refreshToken,
    };
    const jwt = sign(payload, process.env.JWT_KEY, { expiresIn: '6h' });
    done(null, user);
  }
}
