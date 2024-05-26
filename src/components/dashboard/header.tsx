import { ClerkLoaded, ClerkLoading, UserButton } from "@clerk/nextjs"
import HeaderLogo from "./header-logo"
import Navigation from "./navigation"
import { ModeToggle } from "../global/theme-toggle"
import { Button } from "../ui/button"
import { Loader2Icon } from "lucide-react"
import WelcomeMsg from "./welcome-msg"
import { Filters } from "./filters"

const Header = () => {
  return (
    <header className="bg-gradient-to-b from-primary/30 to-primary/95 px-4 py-8 lg:px-14 pb-36">
       <div className="max-w-screen-2xl mx-auto">
           <div className="w-full flex items-center justify-between mb-14">
              <div className="flex items-center lg:gap-x-16">
                 <HeaderLogo/>
                 <Navigation/>
              </div>
              <div className="flex items-center gap-x-4">
              <div>
              <ModeToggle />
              </div>
                <ClerkLoaded>
                  <UserButton afterSignOutUrl="/"/>
                </ClerkLoaded>
                <ClerkLoading>
                  <Loader2Icon className="size-7 animate-spin text-slate"/>
                </ClerkLoading>
              </div>
           </div>
           <WelcomeMsg/>
           <Filters/>
       </div>
    </header>
  )
}

export default Header
