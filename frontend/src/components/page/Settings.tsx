import {Link, Navigate} from "react-router-dom"
import { useAuth } from "@/features/auth"

export function Settings() {
  const { isLoading,data } = useAuth()
  if (!isLoading && !data?.userId) {
    return <Navigate replace to="/login" />
  }

  return (
      <main className="flex min-h-[calc(100vh_-_theme(spacing.16))] flex-1 flex-col gap-4 bg-muted/40 p-4 md:gap-8 md:p-10">
        <div className="mx-auto grid w-full max-w-6xl gap-2">
          <h1 className="text-3xl font-semibold">Settings</h1>
        </div>
        <div className="mx-auto grid w-full max-w-6xl items-start gap-6 md:grid-cols-[180px_1fr] lg:grid-cols-[250px_1fr]">
          <nav
            className="grid gap-4 text-sm text-muted-foreground" x-chunk="dashboard-04-chunk-0"
          >
            <Link to="#" className="font-semibold text-primary">
              General
            </Link>
            <Link to="#">Security</Link>
            <Link to="#">Integrations</Link>
            <Link to="#">Support</Link>
            <Link to="#">Organizations</Link>
            <Link to="#">Advanced</Link>
          </nav>
          <div className="grid gap-6">
          <h3 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-bold tracking-tight">
              Settings Page.
            </h3>
            <p className="text-xs sm:text-sm lg:text-base xl:text-xl text-muted-foreground">
              User Session : {JSON.stringify(data, null, 2)}
            </p>
          </div>
        </div>
      </main>
  )
}
