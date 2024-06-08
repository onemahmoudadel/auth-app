import { Hono } from "hono";
import { Variables } from "../type";
import { zValidator } from '@hono/zod-validator'
import { logInSchema, signUpSchema } from "../schemas/auth";
import { PrismaClient } from "@prisma/client";
import { hash } from "@node-rs/argon2";
import { verify } from "@node-rs/argon2";
import { lucia } from "../auth/Lucia";
import { generateIdFromEntropySize } from "lucia";

const db = new PrismaClient();

export const authRoute = new Hono<{Variables :Variables }>()

.post('login',zValidator('json',logInSchema), async (c) => {
  const data = c.req.valid('json')
  const existingUser = await db.user.findUnique({where:{
    email:data.email
  }})
  if (!existingUser) {
    return c.json({message:null, error: "Incorrect username or password"},400)
  }
  const validPassword = await verify(existingUser.HashPassword, data.password, {
		memoryCost: 19456,
		timeCost: 2,
		outputLen: 32,
		parallelism: 1
	});
  if (!validPassword) {
    return c.json({message:null, error: "Incorrect username or password"})
  }

  const session = await lucia.createSession(existingUser.id, {});
	const sessionCookie = lucia.createSessionCookie(session.id);
  c.header('Set-Cookie',sessionCookie.serialize(),{
    append:true
  })
  return c.json({message:"You are successfully logged in",error: null})
})

.post('signup',zValidator('json',signUpSchema), async (c) => {
  const data = c.req.valid('json')

  const existingUser = await db.user.findUnique({where:{
    email:data.email
  }})
  if (existingUser){
    return c.json({message:null,error: "User already exists"})
    }
  const passwordHash = await hash(data.password, {
		// recommended minimum parameters
		memoryCost: 19456,
		timeCost: 2,
		outputLen: 32,
		parallelism: 1
	});
  const userId = generateIdFromEntropySize(10); // 16 characters long
  const newUser = await db.user.create({data:{
    id: userId,
    HashPassword:passwordHash,
    firstName:data.firstName,
    lastName:data.lastName,
    email:data.email,
  }})
  const session = await lucia.createSession(newUser.id, {});
  const sessionCookie = lucia.createSessionCookie(session.id);
  c.header('Set-Cookie',sessionCookie.serialize(),{
    append:true
  })
  return c.json({message:"Thanks for signing up. Your account has been created.", error:null})
})

.post('logout',async (c) => {
  const session = c.get('session')
  if(!session){
    return c.json({message:null, error:"Unauthorized"},401)
  }
  await lucia.invalidateSession(session.id)
  const sessionCookie = lucia.createBlankSessionCookie();
  c.header('Set-Cookie',sessionCookie.serialize(),{
    append:true
  })
  return c.json({message:"You are successfully logout", error:null})
})
.get('/validate',(c) => {
  const user = c.get('user')
  if(!user) {
    c.json({user:null},401)
  }
  return c.json({user})
})
