"use client";

import {Button} from "@/components/ui/button";
import {Card, CardContent, CardDescription, CardHeader, CardTitle} from "@/components/ui/card";
import {Input} from "@/components/ui/input";
import {Label} from "@/components/ui/label";
import {Select, SelectContent, SelectItem, SelectTrigger, SelectValue} from "@/components/ui/select";
import Link from "next/link";
import {useState} from "react";
import {useRouter} from "next/navigation";
import {createUserWithEmailAndPassword} from "firebase/auth";
import {auth} from "@/lib/firebase"; // Import the auth instance from your Firebase config
import {useToast} from "@/hooks/use-toast";

export default function RegisterPage() {
  const router = useRouter();
  const [step, setStep] = useState(1);
  const [fullName, setFullName] = useState('');
  const [email, setEmail] = useState('');
  const [businessName, setBusinessName] = useState('');
  const [serviceType, setServiceType] = useState('');
  const [location, setLocation] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [passwordVisible, setPasswordVisible] = useState(false);
  const [confirmPasswordVisible, setConfirmPasswordVisible] = useState(false);
  const [error, setError] = useState('');
  const {toast} = useToast();

  const handleNext = () => {
    if (!fullName || !email || !businessName || !serviceType) {
      setError('Please fill in all fields.');
      toast({
        title: "Missing Information",
        description: "Please fill in all fields.",
        variant: "destructive",
      });
      return;
    }
    setStep(2);
  };

  const handleRegister = async () => {
    if (!location || !password || !confirmPassword) {
      setError('Please fill in all fields.');
      toast({
        title: "Missing Information",
        description: "Please fill in all fields.",
        variant: "destructive",
      });
      return;
    }

    if (password !== confirmPassword) {
      setError('Passwords do not match.');
      toast({
        title: "Password Mismatch",
        description: "Passwords do not match.",
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

      // Create user with Firebase Authentication
      await createUserWithEmailAndPassword(auth, email, password);

      toast({
        title: "Registration successful!",
        description: "You have successfully registered.",
      });

      // Redirect to the login page after successful registration
      router.push('/login');
    } catch (err: any) {
      // Handle registration errors
      console.error("Registration failed:", err.message);
      setError(getErrorMessage(err.code));

      toast({
        title: "Registration failed",
        description: getErrorMessage(err.code),
        variant: "destructive",
      });
    }
  };

  const getErrorMessage = (errorCode: string) => {
    switch (errorCode) {
      case 'auth/email-already-in-use':
        return 'Email is already in use. Please use a different email.';
      case 'auth/weak-password':
        return 'Password should be at least 6 characters.';
      case 'auth/invalid-email':
        return 'Please enter a valid email address.';
      default:
        return 'An unexpected error occurred. Please try again.';
    }
  };

  return (
    <div className="grid h-screen place-items-center bg-background">
      <Card className="w-96">
        <CardHeader className="space-y-1">
          <CardTitle className="text-2xl text-center">Register</CardTitle>
          <CardDescription className="text-center">
            Create a new account
          </CardDescription>
        </CardHeader>
        <CardContent className="grid gap-4">
          {error && <p className="text-red-500">{error}</p>}
          {step === 1 && (
            <>
              <div className="grid gap-2">
                <Label htmlFor="fullName">Full Name</Label>
                <Input
                  type="text"
                  id="fullName"
                  placeholder="Enter full name"
                  value={fullName}
                  onChange={(e) => setFullName(e.target.value)}
                />
              </div>
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
                <Label htmlFor="businessName">Business Name</Label>
                <Input
                  type="text"
                  id="businessName"
                  placeholder="Enter business name"
                  value={businessName}
                  onChange={(e) => setBusinessName(e.target.value)}
                />
              </div>
              <div className="grid gap-2">
                <Label htmlFor="serviceType">Service Type</Label>
                <Select onValueChange={(value) => setServiceType(value)}>
                  <SelectTrigger id="serviceType">
                    <SelectValue placeholder="Select a service type"/>
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="Plumbing">Plumbing</SelectItem>
                    <SelectItem value="Carpentry">Carpentry</SelectItem>
                    <SelectItem value="Electrical Work">Electrical Work</SelectItem>
                    <SelectItem value="Housekeeping">Housekeeping</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              <Button onClick={handleNext}>Next</Button>
            </>
          )}
          {step === 2 && (
            <>
              <div className="grid gap-2">
                <Label htmlFor="location">Location</Label>
                <Input
                  type="text"
                  id="location"
                  placeholder="Enter location"
                  value={location}
                  onChange={(e) => setLocation(e.target.value)}
                />
              </div>
              <div className="grid gap-2">
                <Label htmlFor="password">Password</Label>
                <div className="relative">
                  <Input
                    type={passwordVisible ? "text" : "password"}
                    id="password"
                    placeholder="Enter password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                  />
                </div>
              </div>
              <div className="grid gap-2">
                <Label htmlFor="confirmPassword">Confirm Password</Label>
                <div className="relative">
                  <Input
                    type={confirmPasswordVisible ? "text" : "password"}
                    id="confirmPassword"
                    placeholder="Confirm password"
                    value={confirmPassword}
                    onChange={(e) => setConfirmPassword(e.target.value)}
                  />
                </div>
              </div>
              <Button onClick={handleRegister}>Register</Button>
            </>
          )}
        </CardContent>
        <div className="p-4 text-center">
          <Link href="/login" className="text-sm text-muted-foreground hover:text-foreground">
            Already have an account? Log In
          </Link>
        </div>
      </Card>
    </div>
  );
}
