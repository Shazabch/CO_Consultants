import type React from "react"
import { useState } from "react"
import { Link, useNavigate } from "react-router-dom"
import { useRouter } from "next/navigation"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Alert, AlertDescription } from "@/components/ui/alert"
import { Eye, EyeOff, Mail, Lock, ArrowRight } from "lucide-react"
import { authService } from "@/services/Auth-service"

export default function LoginPage() {
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")
  const [showPassword, setShowPassword] = useState(false)
  const [isLoading, setIsLoading] = useState(false)
  const [error, setError] = useState("")
  const navigate = useNavigate() 

const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsLoading(true)
    setError("")

    try {
      const response = await authService.login({ email, password })

      if (response.success) {
        navigate("/filemanager")  
      } else {
        setError(response.message || "Login failed")
      }
    } catch (error) {
      setError("An unexpected error occurred")
    } finally {
      setIsLoading(false)
    }
  }

  return (
  <div className="h-screen bg-background flex items-center justify-center p-4 overflow-hidden">
    <div className="w-full max-w-md">
      {/* CloudVault Logo */}
      <div className="text-center mb-4">
        <div className="inline-flex items-center justify-center w-16 h-16 bg-panel rounded-full mb-2">
          <span className="text-2xl font-bold text-panel-foreground">C</span>
        </div>
        <h1 className="text-2xl font-bold text-foreground">Co Consultants</h1>
        <p className="text-muted-foreground text-sm">Secure file management platform</p>
      </div>

      <Card className="border-border bg-card shadow-2xl">
        <CardHeader className="space-y-1">
          <CardTitle className="text-xl font-bold text-center text-card-foreground">Welcome Back</CardTitle>
          <CardDescription className="text-center text-muted-foreground text-sm">
            Sign in to your CloudVault account
          </CardDescription>
        </CardHeader>

        <form onSubmit={handleSubmit}>
          <CardContent className="space-y-3">
            {error && (
              <Alert className="border-destructive bg-destructive/10">
                <AlertDescription className="text-destructive">{error}</AlertDescription>
              </Alert>
            )}

            {/* Email */}
            <div className="space-y-1">
              <Label htmlFor="email" className="text-card-foreground">
                Email
              </Label>
              <div className="relative">
                <Mail className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
                <Input
                  id="email"
                  type="email"
                  placeholder="Enter your email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="pl-10 bg-input border-border text-foreground placeholder:text-muted-foreground focus:ring-panel focus:border-panel"
                  required
                />
              </div>
            </div>

            {/* Password */}
            <div className="space-y-1">
              <Label htmlFor="password" className="text-card-foreground">
                Password
              </Label>
              <div className="relative">
                <Lock className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
                <Input
                  id="password"
                  type={showPassword ? "text" : "password"}
                  placeholder="Enter your password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className="pl-10 pr-10 bg-input border-border text-foreground placeholder:text-muted-foreground focus:ring-panel focus:border-panel"
                  required
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-3 top-3 text-muted-foreground hover:text-foreground"
                >
                  {showPassword ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
                </button>
              </div>
            </div>

            {/* <div className="flex items-center justify-between">
              <Link to="/forgot-password" className="text-xs text-panel hover:text-panel/80">
                Forgot password?
              </Link>
            </div> */}
          </CardContent>

          <CardFooter className="flex flex-col space-y-3">
            <Button
              type="submit"
              className="w-full bg-panel hover:bg-panel/90 text-panel-foreground font-semibold py-2 px-4 rounded-lg"
              disabled={isLoading}
            >
              {isLoading ? (
                <div className="flex items-center space-x-2">
                  <div className="w-4 h-4 border-2 border-panel-foreground border-t-transparent rounded-full animate-spin" />
                  <span>Signing in...</span>
                </div>
              ) : (
                <div className="flex items-center space-x-2">
                  <span>Sign In</span>
                  <ArrowRight className="h-4 w-4" />
                </div>
              )}
            </Button>

            <div className="text-center text-xs text-muted-foreground">
              {"Don't have an account? "}
              <Link to="/register" className="text-panel hover:text-panel/80 font-semibold">
                Sign up
              </Link>
            </div>
          </CardFooter>
        </form>
      </Card>
    </div>
  </div>
)

}
