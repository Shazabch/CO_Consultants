import type React from "react"
import { useState } from "react"
import { Link, useNavigate } from "react-router-dom"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Alert, AlertDescription } from "@/components/ui/alert"
import { Checkbox } from "@/components/ui/checkbox"
import { Eye, EyeOff, Mail, Lock, User, ArrowRight, Check } from "lucide-react"
import { authService } from "@/services/Auth-service"
import { useToast } from "@/hooks/use-toast"

export default function RegisterPage() {
  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    email: "",
    password: "",
    confirmPassword: "",
  })
  const [showPassword, setShowPassword] = useState(false)
  const [showConfirmPassword, setShowConfirmPassword] = useState(false)
  const [acceptTerms, setAcceptTerms] = useState(false)
  const [isLoading, setIsLoading] = useState(false)
  const [error, setError] = useState("")
  const [success, setSuccess] = useState(false)
  const { toast } = useToast()   

  const handleInputChange = (field: string, value: string) => {
    setFormData((prev) => ({ ...prev, [field]: value }))
  }

  const validateForm = () => {
    if (!formData.firstName || !formData.lastName || !formData.email || !formData.password) {
      return "Please fill in all fields"
    }
    if (formData.password.length < 8) {
      return "Password must be at least 8 characters long"
    }
    if (formData.password !== formData.confirmPassword) {
      return "Passwords do not match"
    }
    if (!acceptTerms) {
      return "Please accept the terms and conditions"
    }
    return null
  }

 const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setError("")

    const validationError = validateForm()
    if (validationError) {
      toast({
        title: "Registration Error",
        description: validationError,
        variant: "destructive",   // 🔴 red error style
      })
      return
    }

    setIsLoading(true)

  try {
  const response = await authService.register({
    name: `${formData.firstName} ${formData.lastName}`.trim(), 
    email: formData.email,
    password: formData.password,
  })

  if (response.success) {
    setSuccess(true)
    toast({
      title: "Account Created 🎉",
      description: "Redirecting to login page...",
    })

    setTimeout(() => {
      window.location.href = "/filemanager"
    }, 2000)
  } else {
    toast({
      title: "Registration Failed",
      description: response.message || "Something went wrong",
      variant: "destructive",
    })
  }
} catch (error) {
  toast({
    title: "Unexpected Error",
    description: "Please try again later",
    variant: "destructive",
  })
}
 finally {
      setIsLoading(false)
    }
  }

  if (success) {
    return (
      <div className="min-h-screen bg-background flex items-center justify-center p-4">
        <div className="w-full max-w-md animate-slide-in-up">
          <Card className="border-border bg-card shadow-2xl text-center">
            <CardContent className="pt-6">
              <div className="inline-flex items-center justify-center w-16 h-16 bg-panel rounded-full mb-4">
                <Check className="h-8 w-8 text-panel-foreground" />
              </div>
              <h2 className="text-2xl font-bold text-card-foreground mb-2">Account Created!</h2>
              <p className="text-muted-foreground mb-4">
                Welcome to CloudVault! Your account has been successfully created.
              </p>
              <p className="text-sm text-muted-foreground">Redirecting to login page...</p>
            </CardContent>
          </Card>
        </div>
      </div>
    )
  }

 return (
  <div className="h-screen bg-background flex items-center justify-center p-4 overflow-hidden">
    <div className="w-full max-w-md">
      {/* CloudVault Logo */}
      <div className="text-center mb-4">
        <div className="inline-flex items-center justify-center w-14 h-14 bg-panel rounded-full mb-2">
          <span className="text-xl font-bold text-panel-foreground">C</span>
        </div>
        <h1 className="text-2xl font-bold text-foreground">Co Consultants</h1>
        <p className="text-muted-foreground text-sm">Join our secure platform</p>
      </div>

      <Card className="border-border bg-card shadow-2xl">
        <CardHeader className="space-y-1 pb-2">
          <CardTitle className="text-xl font-bold text-center text-card-foreground">
            Create Account
          </CardTitle>
          <CardDescription className="text-center text-muted-foreground text-sm">
            Get started with CloudVault today
          </CardDescription>
        </CardHeader>

        <form onSubmit={handleSubmit}>
          <CardContent className="space-y-3">
            {error && (
              <Alert className="border-destructive bg-destructive/10">
                <AlertDescription className="text-destructive">{error}</AlertDescription>
              </Alert>
            )}

            {/* First + Last Name */}
            <div className="grid grid-cols-2 gap-3">
              <div className="space-y-1">
                <Label htmlFor="firstName" className="text-sm text-card-foreground">
                  First Name
                </Label>
                <div className="relative">
                  <User className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
                  <Input
                    id="firstName"
                    type="text"
                    placeholder="John"
                    value={formData.firstName}
                    onChange={(e) => handleInputChange("firstName", e.target.value)}
                    className="pl-10"
                    required
                  />
                </div>
              </div>

              <div className="space-y-1">
                <Label htmlFor="lastName" className="text-sm text-card-foreground">
                  Last Name
                </Label>
                <Input
                  id="lastName"
                  type="text"
                  placeholder="Doe"
                  value={formData.lastName}
                  onChange={(e) => handleInputChange("lastName", e.target.value)}
                  required
                />
              </div>
            </div>

            {/* Email */}
            <div className="space-y-1">
              <Label htmlFor="email" className="text-sm text-card-foreground">
                Email
              </Label>
              <div className="relative">
                <Mail className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
                <Input
                  id="email"
                  type="email"
                  placeholder="john@example.com"
                  value={formData.email}
                  onChange={(e) => handleInputChange("email", e.target.value)}
                  className="pl-10"
                  required
                />
              </div>
            </div>

            {/* Password */}
            <div className="grid grid-cols-2 gap-4">
  {/* Password */}
  <div className="space-y-2">
    <Label htmlFor="password" className="text-card-foreground">
      Password
    </Label>
    <div className="relative">
      <Lock className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
      <Input
        id="password"
        type={showPassword ? "text" : "password"}
        placeholder="Create a strong password"
        value={formData.password}
        onChange={(e) => handleInputChange("password", e.target.value)}
        className="pl-10 pr-10 bg-input border-border text-foreground placeholder:text-muted-foreground focus:ring-panel focus:border-panel transition-all duration-200"
        required
      />
      <button
        type="button"
        onClick={() => setShowPassword(!showPassword)}
        className="absolute right-3 top-3 text-muted-foreground hover:text-foreground transition-colors"
      >
        {showPassword ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
      </button>
    </div>
  </div>

  {/* Confirm Password */}
  <div className="space-y-2">
    <Label htmlFor="confirmPassword" className="text-card-foreground">
      Confirm Password
    </Label>
    <div className="relative">
      <Lock className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
      <Input
        id="confirmPassword"
        type={showConfirmPassword ? "text" : "password"}
        placeholder="Confirm your password"
        value={formData.confirmPassword}
        onChange={(e) => handleInputChange("confirmPassword", e.target.value)}
        className="pl-10 pr-10 bg-input border-border text-foreground placeholder:text-muted-foreground focus:ring-panel focus:border-panel transition-all duration-200"
        required
      />
      <button
        type="button"
        onClick={() => setShowConfirmPassword(!showConfirmPassword)}
        className="absolute right-3 top-3 text-muted-foreground hover:text-foreground transition-colors"
      >
        {showConfirmPassword ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
      </button>
    </div>
  </div>
</div>


            {/* Terms */}
            <div className="flex items-center space-x-2">
              <Checkbox
                id="terms"
                checked={acceptTerms}
                onCheckedChange={checked => setAcceptTerms(checked === true)}
                className="border-border data-[state=checked]:bg-panel data-[state=checked]:border-panel"
              />
              <Label htmlFor="terms" className="text-xs text-card-foreground">
                I agree to the{" "}
                <Link to="/terms" className="text-panel hover:text-panel/80">
                  Terms
                </Link>{" "}
                and{" "}
                <Link to="/privacy" className="text-panel hover:text-panel/80">
                  Privacy
                </Link>
              </Label>
            </div>
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
                  <span>Creating...</span>
                </div>
              ) : (
                <div className="flex items-center space-x-2">
                  <span>Create Account</span>
                  <ArrowRight className="h-4 w-4" />
                </div>
              )}
            </Button>

            <div className="text-center text-xs text-muted-foreground">
              Already have an account?{" "}
              <Link to="/login" className="text-panel hover:text-panel/80 font-semibold">
                Sign in
              </Link>
            </div>
          </CardFooter>
        </form>
      </Card>
    </div>
  </div>
)

}
