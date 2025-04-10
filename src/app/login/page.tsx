"use client";

import {Button} from "@/components/ui/button";
import {Card, CardContent, CardDescription, CardHeader, CardTitle} from "@/components/ui/card";
import {Input} from "@/components/ui/input";
import {Label} from "@/components/ui/label";
import Link from "next/link";
import {useRouter} from "next/navigation";
import {useState} from "react";
import {signInWithEmailAndPassword} from "firebase/auth";
import {auth} from "@/lib/firebase"; // Import the auth instance from your Firebase config
import {useToast} from "@/hooks/use-toast";

export default function LoginPage() {
  const router = useRouter();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const {toast} = useToast();

  const handleLogin = async () => {
    // Basic validation
    if (!email || !password) {
      setError('Please enter email and password.');
      toast({
        title: "Login Failed",
        description: "Please enter email and password.",
        variant: "destructive",
      });
      return;
    }

    try {
      if (!auth) {
        console.error("Firebase Authentication is not initialized.");
        setError('Firebase Authentication is not initialized. Please check your environment variables.');
        toast({
          title: "Firebase Initialization Error",
          description: "Firebase Authentication is not initialized. Please check your environment variables.",
          variant: "destructive",
        });
        return;
      }

      // Sign in with Firebase Authentication
      await signInWithEmailAndPassword(auth, email, password);

      // Redirect to the home page after successful login
      router.push('/');
    } catch (err: any) {
      // Handle login errors
      console.error("Login failed:", err.message);
      setError(getErrorMessage(err.code));
      toast({
        title: "Login Failed",
        description: getErrorMessage(err.code),
        variant: "destructive",
      });
    }
  };

  const getErrorMessage = (errorCode: string) => {
    switch (errorCode) {
      case 'auth/wrong-password':
        return 'Invalid email or password.';
      case 'auth/user-not-found':
        return 'User not found. Please register.';
      case 'auth/invalid-credential':
        return 'Invalid login credentials. Please double-check your email and password.';
      default:
        return 'An unexpected error occurred. Please try again.';
    }
  };

  return (
    <div className="grid h-screen place-items-center bg-background">
      <Card className="w-96">
        <CardHeader className="space-y-1">
          <CardTitle className="text-2xl text-center">Login</CardTitle>
          <CardDescription className="text-center">
            Enter your email and password to access your account
          </CardDescription>
        </CardHeader>
        <CardContent className="grid gap-4">
          {error && <p className="text-red-500">{error}</p>}
          <div className="grid gap-2">
            <Label htmlFor="email">Email</Label>
            <Input
              type="email"
              id="email"
              placeholder="Enter email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
          </div>
          <div className="grid gap-2">
            <Label htmlFor="password">Password</Label>
            <Input
              type="password"
              id="password"
              placeholder="Enter password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
          </div>
          <Button onClick={handleLogin}>Log In</Button>
        </CardContent>
        <div className="p-4 text-center">
          <Link href="/register" className="text-sm text-muted-foreground hover:text-foreground">
            Don't have an account? Register
          </Link>
        </div>
      </Card>
    </div>
  );
}
