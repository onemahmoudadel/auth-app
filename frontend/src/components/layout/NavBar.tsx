import {Link} from "react-router-dom"
import { CircleUser, Menu, Package2, Search } from "lucide-react"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet"
import { Input } from "../ui/input"
import { Button } from "../ui/button"
import { useAuth, useLogout } from "@/features/auth"
import { toast } from "sonner"

export const NavBar = () => {
  const { isLoading,data:user } = useAuth()
  const {logout} = useLogout()

  const isLogin = !isLoading && !user
  const onLogout = () => {
    logout({},{
      onSuccess: () =>{
        toast.success('You are successfully logout')
      },
      onError:(e)=>{
        toast.error(e.message)
      }
    })
  }
  return (
      <header className="sticky top-0 flex h-16 items-center gap-4 border-b bg-background px-4 md:px-6">
        <nav className="hidden flex-col gap-6 text-lg font-medium md:flex md:flex-row md:items-center md:gap-5 md:text-sm lg:gap-6">
          <Link
            to="/"
            className="flex items-center gap-2 text-lg font-semibold md:text-base"
          >
            <Package2 className="h-6 w-6" />
            <span className="sr-only">Acme Inc</span>
          </Link>
          <Link
            to="/"
            className="text-muted-foreground transition-colors hover:text-foreground"
          >
            Hone
          </Link>
          <Link
            to="/settings"
            className="text-muted-foreground transition-colors hover:text-foreground"
          >
            Settings
          </Link>
        </nav>
        <Sheet>
          <SheetTrigger asChild>
            <Button
              variant="outline"
              size="icon"
              className="shrink-0 md:hidden"
            >
              <Menu className="h-5 w-5" />
              <span className="sr-only">Toggle navigation menu</span>
            </Button>
          </SheetTrigger>
          <SheetContent  side="left">
            <nav className="grid gap-6 text-lg font-medium">
            <Link
                to="/"
                className="flex items-center gap-2 text-lg font-semibold"
              >
                <Package2 className="h-6 w-6" />
                <span className="sr-only">Acme Inc</span>
              </Link>
              <Link
                to="/"
                className="flex items-center gap-2 text-lg font-semibold"
              >
                Home
              </Link>
              <Link
                to="/settings"
                className="flex items-center gap-2 text-lg font-semibold"
              >
                Settings
              </Link>
                     
            </nav>
          </SheetContent>
        </Sheet>
        <div className="flex w-full items-center gap-4 md:ml-auto md:gap-4 lg:gap-6">
          <form className="ml-auto flex-1 sm:flex-initial">
            <div className="relative">
              <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
              <Input
                type="search"
                placeholder="Search products..."
                className="pl-8 sm:w-[300px] md:w-[200px] lg:w-[300px]"
              />
            </div>
          </form>
          {isLogin ?

           <div className="flex gap-2">
            <Button variant="outline" ><Link to="/signup">Sign Up</Link></Button> 
            <Button ><Link to="/login">Login</Link></Button> 
           </div>
           : 
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button variant="secondary" size="icon" className="rounded-full">
                  <CircleUser className="h-5 w-5" />
                  <span className="sr-only">Toggle user menu</span>
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="end">
                <DropdownMenuLabel>My Account</DropdownMenuLabel>
                <DropdownMenuSeparator />
                <DropdownMenuItem asChild>
                  <Link to='/settings'>Settings</Link>
                </DropdownMenuItem>
                <DropdownMenuItem>Support</DropdownMenuItem>
                <DropdownMenuSeparator />
                <DropdownMenuItem onClick={onLogout}>Logout</DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          }
        </div>
      </header>
  )
}
