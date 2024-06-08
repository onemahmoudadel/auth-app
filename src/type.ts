import { Session } from "lucia"
// import { User } from "lucia"
export type User = {
  userId: String,
  Id: String,
}
export type Variables = {
  user: User | null,
  session: Session | null,
}
