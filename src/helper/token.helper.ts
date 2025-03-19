import * as jwt from 'jsonwebtoken';
import { ConfigService } from '@nestjs/config';
interface VerifyTokenResult {
  valid: boolean;
  expired: boolean;
  decoded: object | null;
  error?: string;
}

export class JwtHelper {
  constructor(private readonly configService: ConfigService) {}

  generateAccessToken(payload: object): string {
    try {
      const secret = this.configService.get<string>('JWT_SECRET')!;
      const expiresIn = this.configService.get<string>('JWT_EXPIRES_IN') || '24h';

      if (!secret) {
        const error = 'JWT_SECRET is not defined';
        console.error('[JwtHelper][generateAccessToken] Error:', error);
        throw new Error(error);
      }

      // Log the exact secret to verify it matches (REMOVE THIS IN PRODUCTION)
      console.log('[DEBUG][JwtHelper][generateAccessToken] Secret:', secret);
      
      const token = jwt.sign(payload, secret, { expiresIn });
      console.log('[JwtHelper][generateAccessToken] Access token generated successfully', {
        expiresIn,
        tokenPrefix: token.substring(0, 10) + '...',
      });
      
      return token;
    } catch (error: any) {
      console.error('[JwtHelper][generateAccessToken] Failed to generate token:', {
        error: error.message,
        stack: process.env.NODE_ENV !== 'production' ? error.stack : undefined,
      });
      throw error;
    }
  }

  generateRefreshToken(payload: object): string {
    try {
      const secret = this.configService.get<string>('JWT_REFRESH_SECRET')!;
      const expiresIn = this.configService.get<string>('JWT_REFRESH_EXPIRES_IN') || '7d';

      if (!secret) {
        const error = 'JWT_REFRESH_SECRET is not defined';
        console.error('[JwtHelper][generateRefreshToken] Error:', error);
        throw new Error(error);
      }

      const token = jwt.sign(payload, secret, { expiresIn });
      console.log('[JwtHelper][generateRefreshToken] Refresh token generated successfully', {
        expiresIn,
        tokenPrefix: token.substring(0, 10) + '...',
      });
      
      return token;
    } catch (error: any) {
      console.error('[JwtHelper][generateRefreshToken] Failed to generate token:', {
        error: error.message,
        stack: process.env.NODE_ENV !== 'production' ? error.stack : undefined,
      });
      throw error;
    }
  }

  verifyToken(token: string, isRefreshToken: boolean = false): VerifyTokenResult {
    const tokenType = isRefreshToken ? 'refresh' : 'access';
    const result: VerifyTokenResult = {
      valid: false,
      expired: false,
      decoded: null,
    };

    try {
      // Get the appropriate secret key based on token type
      const secretKey = isRefreshToken
        ? this.configService.get<string>('JWT_REFRESH_SECRET')
        : this.configService.get<string>('JWT_SECRET');

      // Check if the secret key is defined
      if (!secretKey) {
        const error = `JWT ${tokenType} secret is not defined`;
        console.error(`[JwtHelper][verifyToken] ${error}`);
        result.error = error;
        return result;
      }

      // Log the exact secret to verify it matches (REMOVE THIS IN PRODUCTION)
      console.log(`[DEBUG][JwtHelper][verifyToken] Secret:`, secretKey);

      // Remove 'Bearer ' prefix if present
      const tokenToVerify = token.startsWith('Bearer ') ? token.slice(7).trim() : token;

      if (!tokenToVerify) {
        const error = 'Token is empty or invalid';
        console.error(`[JwtHelper][verifyToken] ${error}`, { tokenType });
        result.error = error;
        return result;
      }

      // For debugging - log the token we're verifying (REMOVE IN PRODUCTION)
      console.log(`[DEBUG][JwtHelper][verifyToken] Token to verify:`, tokenToVerify);

      // Verify the token with hardcoded secret to test
      try {
        // Try both direct verification and the JWT.verify approach
        const decoded = jwt.verify(tokenToVerify, secretKey);
        
        console.log(`[JwtHelper][verifyToken] ${tokenType} token verified successfully`, {
          subject: (decoded as any)?.sub || 'unknown',
        });

        // Update the result object
        result.valid = true;
        result.decoded = decoded as object;
      } catch (e: any) {
        // Try a hardcoded verification with the exact JWT_SECRET from .env
        // This is TEMPORARY for debugging only
        try {
          const hardcodedSecret = '5a1b2c3d4e5f6g7h8i9j0k1l2m3n4o5p6q7r8s9t0u1v2w3x4y5z6a7b8c9d0e';
          const hardDecoded = jwt.verify(tokenToVerify, hardcodedSecret);
          console.log(`[DEBUG] Token verified with hardcoded secret!`, hardDecoded);
          // If this works, update result
          result.valid = true;
          result.decoded = hardDecoded as object;
          return result;
        } catch (hardError) {
          console.log(`[DEBUG] Hardcoded verification also failed:`, hardError.message);
        }

        // Handle specific error types
        if (e.name === 'TokenExpiredError') {
          result.expired = true;
          console.warn(`[JwtHelper][verifyToken] ${tokenType} token expired:`, {
            expiredAt: new Date(e.expiredAt).toISOString(),
            error: e.message,
          });
        } else {
          console.error(`[JwtHelper][verifyToken] Invalid ${tokenType} token:`, {
            errorType: e.name,
            error: e.message,
            tokenPrefix: tokenToVerify.substring(0, 10) + '...',
          });
        }

        result.error = e.message;
      }
    } catch (error: any) {
      // Catch any other unexpected errors
      console.error(`[JwtHelper][verifyToken] Unexpected error verifying ${tokenType} token:`, {
        error: error.message,
        stack: process.env.NODE_ENV !== 'production' ? error.stack : undefined,
      });

      result.error = error.message;
    }

    return result;
  }
}
