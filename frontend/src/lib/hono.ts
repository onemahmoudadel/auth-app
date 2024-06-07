import { AppType } from '../../../src/index'
import { hc } from 'hono/client'

const client = hc<AppType>('')

export const api = client.v1.api