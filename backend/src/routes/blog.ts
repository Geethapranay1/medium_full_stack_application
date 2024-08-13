import { Hono } from "hono"
import { PrismaClient } from '@prisma/client/edge'
import { withAccelerate } from '@prisma/extension-accelerate'
import { decode, jwt, sign, verify } from 'hono/jwt'
import { createBlog, updateBlog } from "@geethapranay/medium-common"
export const blogRouter = new Hono<{
    Bindings: {
        DATABASE_URL: string
        JWT_SECRET: string
    },
    Variables :{
        userId: string
    }
}>()


blogRouter.use("/*", async (c, next) => {
    const header = c.req.header("authorization") || "";
    const token = header.split(" ")[1];
    const response = await verify(token, c.env.JWT_SECRET);
    if (!response.id) {
        c.status(403);
        return c.json({error: "unauthorized"}) 
    }
    c.set("jwtPayload", response.id);
    await next()
})

blogRouter.post("/create", async (c) => {
  const prisma = new PrismaClient({
    datasourceUrl: c.env.DATABASE_URL
  }).$extends(withAccelerate())
  const userId = await c.get("jwtPayload");
  if (!userId) {
    return c.json({
      error: "please sign in or sign up before writing a blog"
    })
  }
  const blog = await c.req.json();
  const { success } = createBlog.safeParse(blog);
    if (!success) {
      c.status(411);
      return c.json({
        msg: "inputs are not correct"
      })
    }
  try {
    const post = await prisma.post.create({
        data: {
          title: blog.title,
          content: blog.content,
          authorId: userId
          
        }
      })
    return c.json({
        id: post.id,
        msg: "blog created successfully"
    })
  }catch (e) {
    return c.json({
        msg: "something went wrong"
    })
  }
  
  

})

blogRouter.put("/edit", async (c) => {
    const body = await c.req.json();
    const { success } = updateBlog.safeParse(body);
    if (!success) {
      c.status(411);
      return c.json({
        msg: "inputs are not correct"
      })
    }
    const userId = c.get("jwtPayload")
    const prisma = new PrismaClient({
        datasourceUrl: c.env.DATABASE_URL
    }).$extends(withAccelerate())

    const blog = await prisma.post.update({
        where: {
            id: body.id
        },
        data: {
            title: body.title,
            content: body.content,
            authorId: userId
        }
    })
    return c.json({
        msg: "blog post updated"
    })
})

blogRouter.get("/bulk", async (c) => {
    const prisma = new PrismaClient({
        datasourceUrl: c.env.DATABASE_URL
    }).$extends(withAccelerate())
    

    const blogs = await prisma.post.findMany({
      select: {
        content: true,
        title: true,
        id: true,
        author: {
          select: {
          name: true
          }
        }
      }
    }) 
    return c.json({
        blogs
    })
})

blogRouter.get("/:id" ,async (c) => {
    const id = c.req.param("id");
    const prisma = new PrismaClient({
        datasourceUrl: c.env.DATABASE_URL
    }).$extends(withAccelerate())

    try {
        const blog = await prisma.post.findFirst({
            where: {
                id: id
            },
            select: {
              id: true,
              title: true,
              content: true,
              author: {
                select: {
                  name:true
                }
              }
            }
        })
        return c.json({
            blog
        })
    }catch (e) {
        c.status(411) 
        return c.json({
            error: "something went wrong"
        })
    }
})

