import { Context, Next } from "hono";
import { lucia } from "./Lucia";
import { getCookie } from "hono/cookie";


export async function authMiddleware(c:Context,next:Next) {
  const sessionId = getCookie(c,lucia.sessionCookieName) ?? null 
  if(!sessionId) {
    c.set('user',null)
    c.set('session',null)
    return next()
  }

  const result = await lucia.validateSession(sessionId);

  if (result.session && result.session.fresh) {
    c.header('Set-Cookie',lucia.createSessionCookie(result.session.id).serialize(),{
      append:true
    })
  }
  if (!result.session) {
    c.header('Set-Cookie',lucia.createBlankSessionCookie().serialize(),{
      append:true
    })
  }
  c.set('user',result.session)
  c.set('session',result.user)
  return next()
}