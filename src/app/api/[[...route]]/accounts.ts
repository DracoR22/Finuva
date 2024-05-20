import { db } from "@/db/drizzle";
import { accounts, insertAccountSchema } from "@/db/schema";
import { clerkMiddleware, getAuth } from "@hono/clerk-auth";
import { and, eq, inArray } from "drizzle-orm";
import { Hono } from "hono";
import { zValidator } from "@hono/zod-validator"
import { createId } from "@paralleldrive/cuid2"
import { z } from "zod";

const app = new Hono()
//------------------------------------------------------------------//GET USER'S ACCOUNTS//-------------------------------------------------------------//
.get('/', clerkMiddleware(), async (c) => {
    const auth = getAuth(c)

    if (!auth?.userId) {
         return c.json({ error: 'Unauthorized' }, 401)
    }

    const data = await db.select({ id: accounts.id, name: accounts.name }).from(accounts)
    .where((eq(accounts.userId, auth.userId)))

    return c.json({ data })
})
//----------------------------------------------------------------//GET USER ACCOUNT BY ID//------------------------------------------------------------//
.get('/:id', clerkMiddleware(), zValidator('param', z.object({ id: z.string().optional() })), async (c) => {
  const auth = getAuth(c)
  const { id } = c.req.valid('param')

  if (!id) {
    return c.json({ error: 'Missing id' }, 400)
  }

  if (!auth?.userId) {
    return c.json({ error: 'Unauthorized' }, 401)
  }

  const [data] = await db.select({ id: accounts.id, name: accounts.name }).from(accounts).where(
    and(
      eq(accounts.userId, auth.userId),
      eq(accounts.id, id)
    )
  )

  if (!data) {
    return c.json({ error: 'Not found' }, 404)
  }

  return c.json({ data })
})
//------------------------------------------------------------------//CREATE A NEW ACCOUNT//----------------------------------------------------------//
.post('/', clerkMiddleware(), zValidator('json', insertAccountSchema.pick({ name: true })), async (c) => {
    const auth = getAuth(c)

    // Get the values of the request
    const values = c.req.valid('json')

    if (!auth?.userId) {
        return c.json({ error: 'Unauthorized' }, 401)
    }

    const [data] = await db.insert(accounts).values({
        id: createId(),
        userId: auth.userId,
        ...values
    }).returning()

    return c.json({ data })
})
//------------------------------------------------------------------//BULK DELETE ACCOUNTS//----------------------------------------------------------//
.post('/bulk-delete', clerkMiddleware(), zValidator('json', z.object({ ids: z.array(z.string()) })), async (c) => {
  const auth = getAuth(c)
  const values = c.req.valid('json')

  if (!auth?.userId) {
    return c.json({ error: 'Unauthorized' }, 401)
  }

  // Bulk Delete
  const data = await db.delete(accounts).where(
    and(
        eq(accounts.userId, auth.userId),
        inArray(accounts.id, values.ids)
    )
  ).returning({
    id: accounts.id
  })

  return c.json({ data })
})
.patch('/:id', clerkMiddleware(), zValidator('param', z.object({ id: z.string().optional() })), zValidator('json', insertAccountSchema.pick({ name: true })), async (c) => {
  const auth = getAuth(c)
  const { id } = c.req.valid('param')
  const values = c.req.valid('json')

  if (!id) {
    return c.json({ error: 'Missing id' }, 400)
  }

  if (!auth?.userId) {
    return c.json({ error: 'Unauthorized' }, 401)
  }

  const [data] = await db.update(accounts).set(values).where(
    and(
      eq(accounts.userId, auth.userId),
      eq(accounts.id, id)
    )
  ).returning()

  if (!data) {
    return c.json({ error: 'Account not found' }, 404)
  }

  return c.json({ data })
})

export default app