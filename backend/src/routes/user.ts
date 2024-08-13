import { Hono } from "hono"
import { PrismaClient } from '@prisma/client/edge'
import { withAccelerate } from '@prisma/extension-accelerate'
import { decode, jwt, sign, verify } from 'hono/jwt'
import { signupInput,signinInput } from "@geethapranay/medium-common"

export const userRouter = new Hono<{
    Bindings: {
        DATABASE_URL: string
        JWT_SECRET: string
    }
}>();

userRouter.post("/signup", async (c) => {
    const prisma = new PrismaClient({
      datasourceUrl: c.env.DATABASE_URL,
    }).$extends(withAccelerate())
    const body = await c.req.json();
    const { success } = signupInput.safeParse(body);
    if (!success) {
      c.status(411);
      return c.json({
        msg: "inputs are not correct"
      })
    }
    const check = await prisma.user.findUnique({
      where: {
        email: body.email
      }
    })
    if (check) {
      return c.json({error: "user already exists"})
    }
    const user = await prisma.user.create({
      data : {
        name: body.name,
        email: body.email,
        password: body.password
      }
    
    })
  
    const token = await sign({id: user.id}, c.env.JWT_SECRET);
    return c.json({
      jwt: token
    })
  })
userRouter.post("signin", async (c) => {
    const prisma = new PrismaClient({
    datasourceUrl: c.env.DATABASE_URL
    }).$extends(withAccelerate())
    const body = await c.req.json();
    const { success } = signinInput.safeParse(body);
    if (!success) {
      c.status(403);
      return c.json({
        error: "inputs are not correct"
      })
    }
    const user = await prisma.user.findUnique({
    where: {
        email: body.email,
    }
    })
    
    if (!user) {
    c.status(403);
    return c.json({error: "please signup before signin"})
    }
    if (body.password !== user?.password) {
      c.status(403);
      return c.json({
          error: "incorrect credentials"
      })
    }
    const token = await sign({id: user.id}, c.env.JWT_SECRET)
    return c.json({
    jwt: token
    })
})