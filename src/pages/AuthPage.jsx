import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Separator } from '@/components/ui/separator';
import { Eye, EyeOff, Mail, Phone, User, Lock } from 'lucide-react';

export default function AuthPage() {
  const [showPassword, setShowPassword] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [formData, setFormData] = useState({
    email: '',
    phone: '',
    firstName: '',
    lastName: '',
    password: '',
    confirmPassword: ''
  });

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSocialAuth = async (provider) => {
    setIsLoading(true);
    // Placeholder for social authentication
    console.log(`Signing in with ${provider}`);
    setTimeout(() => {
      setIsLoading(false);
      // Redirect to member dashboard after successful auth
      window.location.href = '/MemberDashboard';
    }, 1000);
  };

  const handleEmailSignup = async (e) => {
    e.preventDefault();
    setIsLoading(true);
    // Placeholder for email signup
    console.log('Email signup:', formData);
    setTimeout(() => {
      setIsLoading(false);
      window.location.href = '/MemberDashboard';
    }, 1000);
  };

  const handleEmailSignin = async (e) => {
    e.preventDefault();
    setIsLoading(true);
    // Placeholder for email signin
    console.log('Email signin:', { email: formData.email, password: formData.password });
    setTimeout(() => {
      setIsLoading(false);
      window.location.href = '/MemberDashboard';
    }, 1000);
  };

  const handlePhoneSignup = async (e) => {
    e.preventDefault();
    setIsLoading(true);
    // Placeholder for phone signup
    console.log('Phone signup:', formData);
    setTimeout(() => {
      setIsLoading(false);
      window.location.href = '/MemberDashboard';
    }, 1000);
  };

  return (
    <div className="min-h-screen bg-black flex items-center justify-center p-4 pt-24">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        className="w-full max-w-md"
      >
        <Card className="bg-gray-900/50 border-white/20 backdrop-blur-md">
          <CardHeader className="text-center space-y-4">
            <motion.div
              initial={{ scale: 0.8 }}
              animate={{ scale: 1 }}
              transition={{ delay: 0.2, type: "spring", stiffness: 200 }}
            >
              <img 
                src="data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iMTAwIiBoZWlnaHQ9IjQwIiB2aWV3Qm94PSIwIDAgMTAwIDQwIiBmaWxsPSJub25lIiB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciPgo8dGV4dCB4PSI1MCIgeT0iMjUiIGZvbnQtZmFtaWx5PSJBcmlhbCwgc2Fucy1zZXJpZiIgZm9udC1zaXplPSIxOCIgZm9udC13ZWlnaHQ9ImJvbGQiIGZpbGw9IndoaXRlIiB0ZXh0LWFuY2hvcj0ibWlkZGxlIj5TSUxWQVI8L3RleHQ+Cjwvc3ZnPgo=" 
                alt="SILVAR" 
                className="h-12 mx-auto mb-4"
              />
            </motion.div>
            <CardTitle className="text-2xl font-light text-white tracking-wider">
              JOIN SILVAR
            </CardTitle>
            <CardDescription className="text-white/70">
              Access the world's most exclusive luxury fleet
            </CardDescription>
          </CardHeader>

          <CardContent className="space-y-6">
            {/* Social Authentication */}
            <div className="space-y-3">
              <Button
                onClick={() => handleSocialAuth('apple')}
                disabled={isLoading}
                className="w-full bg-black text-white hover:bg-gray-800 border border-white/20 h-12 font-light tracking-wider"
                variant="outline"
              >
                <svg className="w-5 h-5 mr-3" viewBox="0 0 24 24" fill="currentColor">
                  <path d="M18.71 19.5c-.83 1.24-1.71 2.45-3.05 2.47-1.34.03-1.77-.79-3.29-.79-1.53 0-2 .77-3.27.82-1.31.05-2.3-1.32-3.14-2.53C4.25 17 2.94 12.45 4.7 9.39c.87-1.52 2.43-2.48 4.12-2.51 1.28-.02 2.5.87 3.29.87.78 0 2.26-1.07 3.81-.91.65.03 2.47.26 3.64 1.98-.09.06-2.17 1.28-2.15 3.81.03 3.02 2.65 4.03 2.68 4.04-.03.07-.42 1.44-1.38 2.83M13 3.5c.73-.83 1.94-1.46 2.94-1.5.13 1.17-.34 2.35-1.04 3.19-.69.85-1.83 1.51-2.95 1.42-.15-1.15.41-2.35 1.05-3.11z"/>
                </svg>
                Continue with Apple
              </Button>

              <Button
                onClick={() => handleSocialAuth('google')}
                disabled={isLoading}
                className="w-full bg-white text-black hover:bg-gray-100 h-12 font-light tracking-wider"
              >
                <svg className="w-5 h-5 mr-3" viewBox="0 0 24 24">
                  <path fill="#4285F4" d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"/>
                  <path fill="#34A853" d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"/>
                  <path fill="#FBBC05" d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"/>
                  <path fill="#EA4335" d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"/>
                </svg>
                Continue with Google
              </Button>
            </div>

            <div className="relative">
              <div className="absolute inset-0 flex items-center">
                <Separator className="w-full border-white/20" />
              </div>
              <div className="relative flex justify-center text-xs uppercase">
                <span className="bg-gray-900 px-2 text-white/60">Or continue with</span>
              </div>
            </div>

            {/* Email/Phone Authentication Tabs */}
            <Tabs defaultValue="email" className="w-full">
              <TabsList className="grid w-full grid-cols-2 bg-gray-800/50 border-white/20">
                <TabsTrigger value="email" className="text-white data-[state=active]:bg-white/20">Email</TabsTrigger>
                <TabsTrigger value="phone" className="text-white data-[state=active]:bg-white/20">Phone</TabsTrigger>
              </TabsList>

              <TabsContent value="email" className="space-y-4 mt-6">
                <Tabs defaultValue="signup" className="w-full">
                  <TabsList className="grid w-full grid-cols-2 bg-gray-800/30 border-white/10 mb-4">
                    <TabsTrigger value="signup" className="text-white data-[state=active]:bg-white/10">Sign Up</TabsTrigger>
                    <TabsTrigger value="signin" className="text-white data-[state=active]:bg-white/10">Sign In</TabsTrigger>
                  </TabsList>

                  <TabsContent value="signup">
                    <form onSubmit={handleEmailSignup} className="space-y-4">
                      <div className="grid grid-cols-2 gap-4">
                        <div className="space-y-2">
                          <Label htmlFor="firstName" className="text-white/80">First Name</Label>
                          <div className="relative">
                            <User className="absolute left-3 top-3 h-4 w-4 text-white/40" />
                            <Input
                              id="firstName"
                              name="firstName"
                              type="text"
                              value={formData.firstName}
                              onChange={handleInputChange}
                              className="pl-10 bg-gray-800/50 border-white/20 text-white placeholder-white/40"
                              placeholder="John"
                              required
                            />
                          </div>
                        </div>
                        <div className="space-y-2">
                          <Label htmlFor="lastName" className="text-white/80">Last Name</Label>
                          <div className="relative">
                            <User className="absolute left-3 top-3 h-4 w-4 text-white/40" />
                            <Input
                              id="lastName"
                              name="lastName"
                              type="text"
                              value={formData.lastName}
                              onChange={handleInputChange}
                              className="pl-10 bg-gray-800/50 border-white/20 text-white placeholder-white/40"
                              placeholder="Doe"
                              required
                            />
                          </div>
                        </div>
                      </div>

                      <div className="space-y-2">
                        <Label htmlFor="email" className="text-white/80">Email</Label>
                        <div className="relative">
                          <Mail className="absolute left-3 top-3 h-4 w-4 text-white/40" />
                          <Input
                            id="email"
                            name="email"
                            type="email"
                            value={formData.email}
                            onChange={handleInputChange}
                            className="pl-10 bg-gray-800/50 border-white/20 text-white placeholder-white/40"
                            placeholder="john@example.com"
                            required
                          />
                        </div>
                      </div>

                      <div className="space-y-2">
                        <Label htmlFor="password" className="text-white/80">Password</Label>
                        <div className="relative">
                          <Lock className="absolute left-3 top-3 h-4 w-4 text-white/40" />
                          <Input
                            id="password"
                            name="password"
                            type={showPassword ? "text" : "password"}
                            value={formData.password}
                            onChange={handleInputChange}
                            className="pl-10 pr-10 bg-gray-800/50 border-white/20 text-white placeholder-white/40"
                            placeholder="••••••••"
                            required
                          />
                          <button
                            type="button"
                            onClick={() => setShowPassword(!showPassword)}
                            className="absolute right-3 top-3 text-white/40 hover:text-white/60"
                          >
                            {showPassword ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
                          </button>
                        </div>
                      </div>

                      <div className="space-y-2">
                        <Label htmlFor="confirmPassword" className="text-white/80">Confirm Password</Label>
                        <div className="relative">
                          <Lock className="absolute left-3 top-3 h-4 w-4 text-white/40" />
                          <Input
                            id="confirmPassword"
                            name="confirmPassword"
                            type={showPassword ? "text" : "password"}
                            value={formData.confirmPassword}
                            onChange={handleInputChange}
                            className="pl-10 bg-gray-800/50 border-white/20 text-white placeholder-white/40"
                            placeholder="••••••••"
                            required
                          />
                        </div>
                      </div>

                      <Button
                        type="submit"
                        disabled={isLoading}
                        className="w-full bg-white text-black hover:bg-white/90 h-12 font-light tracking-wider"
                      >
                        {isLoading ? 'Creating Account...' : 'Create Account'}
                      </Button>
                    </form>
                  </TabsContent>

                  <TabsContent value="signin">
                    <form onSubmit={handleEmailSignin} className="space-y-4">
                      <div className="space-y-2">
                        <Label htmlFor="signin-email" className="text-white/80">Email</Label>
                        <div className="relative">
                          <Mail className="absolute left-3 top-3 h-4 w-4 text-white/40" />
                          <Input
                            id="signin-email"
                            name="email"
                            type="email"
                            value={formData.email}
                            onChange={handleInputChange}
                            className="pl-10 bg-gray-800/50 border-white/20 text-white placeholder-white/40"
                            placeholder="john@example.com"
                            required
                          />
                        </div>
                      </div>

                      <div className="space-y-2">
                        <Label htmlFor="signin-password" className="text-white/80">Password</Label>
                        <div className="relative">
                          <Lock className="absolute left-3 top-3 h-4 w-4 text-white/40" />
                          <Input
                            id="signin-password"
                            name="password"
                            type={showPassword ? "text" : "password"}
                            value={formData.password}
                            onChange={handleInputChange}
                            className="pl-10 pr-10 bg-gray-800/50 border-white/20 text-white placeholder-white/40"
                            placeholder="••••••••"
                            required
                          />
                          <button
                            type="button"
                            onClick={() => setShowPassword(!showPassword)}
                            className="absolute right-3 top-3 text-white/40 hover:text-white/60"
                          >
                            {showPassword ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
                          </button>
                        </div>
                      </div>

                      <Button
                        type="submit"
                        disabled={isLoading}
                        className="w-full bg-white text-black hover:bg-white/90 h-12 font-light tracking-wider"
                      >
                        {isLoading ? 'Signing In...' : 'Sign In'}
                      </Button>
                    </form>
                  </TabsContent>
                </Tabs>
              </TabsContent>

              <TabsContent value="phone" className="space-y-4 mt-6">
                <form onSubmit={handlePhoneSignup} className="space-y-4">
                  <div className="space-y-2">
                    <Label htmlFor="phone" className="text-white/80">Phone Number</Label>
                    <div className="relative">
                      <Phone className="absolute left-3 top-3 h-4 w-4 text-white/40" />
                      <Input
                        id="phone"
                        name="phone"
                        type="tel"
                        value={formData.phone}
                        onChange={handleInputChange}
                        className="pl-10 bg-gray-800/50 border-white/20 text-white placeholder-white/40"
                        placeholder="+1 (555) 123-4567"
                        required
                      />
                    </div>
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="phone-firstName" className="text-white/80">First Name</Label>
                    <div className="relative">
                      <User className="absolute left-3 top-3 h-4 w-4 text-white/40" />
                      <Input
                        id="phone-firstName"
                        name="firstName"
                        type="text"
                        value={formData.firstName}
                        onChange={handleInputChange}
                        className="pl-10 bg-gray-800/50 border-white/20 text-white placeholder-white/40"
                        placeholder="John"
                        required
                      />
                    </div>
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="phone-lastName" className="text-white/80">Last Name</Label>
                    <div className="relative">
                      <User className="absolute left-3 top-3 h-4 w-4 text-white/40" />
                      <Input
                        id="phone-lastName"
                        name="lastName"
                        type="text"
                        value={formData.lastName}
                        onChange={handleInputChange}
                        className="pl-10 bg-gray-800/50 border-white/20 text-white placeholder-white/40"
                        placeholder="Doe"
                        required
                      />
                    </div>
                  </div>

                  <Button
                    type="submit"
                    disabled={isLoading}
                    className="w-full bg-white text-black hover:bg-white/90 h-12 font-light tracking-wider"
                  >
                    {isLoading ? 'Creating Account...' : 'Create Account with Phone'}
                  </Button>
                </form>
              </TabsContent>
            </Tabs>

            <div className="text-center text-sm text-white/60">
              By continuing, you agree to our{' '}
              <a href="/Terms" className="underline hover:text-white">
                Terms of Service
              </a>{' '}
              and{' '}
              <a href="/PrivacyPolicy" className="underline hover:text-white">
                Privacy Policy
              </a>
            </div>
          </CardContent>
        </Card>
      </motion.div>
    </div>
  );
}
