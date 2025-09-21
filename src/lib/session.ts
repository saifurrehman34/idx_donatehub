import type { IronSessionOptions } from 'iron-session'

export type SessionData = {
  userId?: string
  isLoggedIn: boolean
}

export const sessionOptions: IronSessionOptions = {
  password: process.env.SECRET_COOKIE_PASSWORD as string,
  cookieName: 'donatelight-session',
  cookieOptions: {
    secure: process.env.NODE_ENV === 'production',
  },
}
