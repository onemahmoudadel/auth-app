import { Session } from "lucia"
import { User } from "lucia"

export type Variables = {
  user: User | null,
  session: Session | null,
}
