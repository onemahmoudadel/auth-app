export function HomePage() {
  return (
    <div className="flex flex-col">
      <main className="flex flex-1 flex-col gap-4 p-2 lg:gap-6 lg:p-4">
        <div className="flex items-center">
          <h1 className="text-lg font-semibold md:text-2xl">Home Page</h1>
        </div>
        <div
          className="flex flex-1 items-center justify-center rounded-lg border border-dashed shadow-sm" x-chunk="dashboard-02-chunk-1"
        >
          <div className="flex flex-col items-center gap-1 text-center my-20">
            <h3 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-bold tracking-tight">
              Welcome to Auth App
            </h3>
            <p className="text-xs sm:text-sm lg:text-base xl:text-xl text-muted-foreground">
            A simple project for Basic authentication.
            </p>
          </div>
        </div>
      </main>
    </div>
  )
}
