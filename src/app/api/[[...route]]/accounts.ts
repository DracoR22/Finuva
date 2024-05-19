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

export default app