import { serve } from '@hono/node-server'
import { Hono } from 'hono'
import { logger } from 'hono/logger'
import { csrf } from 'hono/csrf'
import { prettyJSON } from 'hono/pretty-json'

import { Variables } from './type'
import { authRoute } from './routes/auth'
import { authMiddleware } from './auth/middleware'




const app = new Hono<{Variables :Variables }>()


app.use(logger())
app.use(csrf())
app.use(prettyJSON()) 
app.use('*',authMiddleware)


app.basePath('/api').get('/', (c) => {
  const user = c.get('user')
  if(user) return c.json({user})
  return c.json({Hello: 'Hono!'})
})
.route('/auth', authRoute)
const port = 3000
console.log(`Server is running on http://localhost:${port}`)

serve({
  fetch: app.fetch,
  port
})
