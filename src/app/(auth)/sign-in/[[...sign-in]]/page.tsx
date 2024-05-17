import { ClerkLoaded, ClerkLoading, SignIn } from "@clerk/nextjs";
import { Loader2Icon } from "lucide-react"

export default function Page() {
  return (
    <div className="min-h-screen grid grid-cols-1 lg:grid-cols-2">
      <div className="h-full lg:flex flex-col items-center justify-center px-4">
        <div className="text-center space-y-4 pt-16">
           <h1 className="font-bold text-3xl -">
            Welcome Back!
           </h1>
           <p className="text-base text-muted-foreground">
            Log in or Create account to get back to your dashboard!
           </p>
        </div>
        <div className="flex items-center justify-center mt-8">
          <ClerkLoaded>
            <SignIn path="/sign-in" />
          </ClerkLoaded>
          <ClerkLoading>
            <Loader2Icon className="animate-spin text-muted-foreground"/>
          </ClerkLoading>
        </div>
      </div>
      <div className="h-full bg-primary hidden lg:flex items-center justify-center">
         <img src="/finuva.png" height={130} width={130} alt="logo"/>
      </div>
    </div>
  )
}