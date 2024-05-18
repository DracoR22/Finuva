import { Hono } from 'hono'
import { handle } from 'hono/vercel'
import { z } from 'zod'
import { zValidator } from '@hono/zod-validator'
import { clerkMiddleware } from '@hono/clerk-auth'

export const runtime = 'edge';

const app = new Hono().basePath('/api')

app.get('/hello', clerkMiddleware(), (c) => {
  return c.json({
    message: 'Hello Next.js!',
  })
})

export const GET = handle(app)
export const POST = handle(app)