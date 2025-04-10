"use client";

import {
  NavigationMenu,
  NavigationMenuContent,
  NavigationMenuItem,
  NavigationMenuLink,
  NavigationMenuList,
  NavigationMenuTrigger,
  navigationMenuTriggerStyle,
} from "@/components/ui/navigation-menu";
import {Sidebar, SidebarContent, SidebarFooter, SidebarGroup, SidebarGroupLabel, SidebarHeader, SidebarMenu, SidebarMenuButton, SidebarMenuItem, SidebarProvider, SidebarTrigger} from "@/components/ui/sidebar";
import {Button} from "@/components/ui/button";
import {Card, CardContent, CardDescription, CardHeader, CardTitle} from "@/components/ui/card";
import {useEffect, useState} from "react";
import {Bookings} from "@/components/Bookings";
import {JobPosting} from "@/components/JobPosting";
import {Quotes} from "@/components/Quotes";
import {useRouter} from "next/navigation";
import * as React from "react";
import {cn} from "@/lib/utils";
import {LogIn, LogOut} from "lucide-react";
import {auth} from "@/lib/firebase";
import {onAuthStateChanged, signOut} from "firebase/auth";

const ListItem = React.forwardRef<
  React.ElementRef<"a">,
  React.ComponentPropsWithoutRef<"a">
>(({className, title, children, ...props}, ref) => {
  return (
    <li>
      <NavigationMenuLink asChild>
        <a
          ref={ref}
          className={cn(
            "block select-none space-y-1 rounded-md p-3 leading-none no-underline outline-none transition-colors hover:bg-accent hover:text-accent-foreground focus:bg-accent focus:text-accent-foreground",
            className
          )}
          {...props}
        >
          <div className="text-sm font-medium leading-none">{title}</div>
          <p className="line-clamp-2 text-sm leading-snug text-muted-foreground">
            {children}
          </p>
        </a>
      </NavigationMenuLink>
    </li>
  );
});

ListItem.displayName = "ListItem";

const navigationItems = [
  {
    title: 'Home',
    content: 'This is the home page.',
    isAvailable: true,
  },
  {
    title: 'Bookings',
    content: 'Manage confirmed and completed jobs.',
    isAvailable: true,
  },
  {
    title: 'Quotes',
    content: 'View submitted and received quotes.',
    isAvailable: true,
  },
  {
    title: 'Logout',
    content: 'End the session and return to login.',
    isAvailable: true,
  },
];

export function Home() {
  const [activeTab, setActiveTab] = useState('Home');
  const router = useRouter();
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      if (user) {
        setIsAuthenticated(true);
      } else {
        setIsAuthenticated(false);
        router.push('/login');
      }
    });

    return () => unsubscribe(); // Cleanup subscription on unmount
  }, [router]);

  const handleLogout = async () => {
    try {
      await signOut(auth);
      router.push('/login'); // Redirect to login page after logout
    } catch (error) {
      console.error("Logout failed:", error);
      // Optionally display an error message to the user
    }
  };


  if (!isAuthenticated) {
    return null; // Or a loading spinner
  }

  return (
    <SidebarProvider>
      <div className="flex h-screen">
        <Sidebar collapsible="icon">
          <SidebarHeader className="font-bold">ServiceConnect</SidebarHeader>
          <SidebarContent>
            <SidebarGroup>
              <SidebarGroupLabel>Navigation</SidebarGroupLabel>
              <SidebarMenu>
                {navigationItems.map((item, index) => (
                  <SidebarMenuItem key={index}>
                    <SidebarMenuButton onClick={() => setActiveTab(item.title)}>
                      {item.title}
                    </SidebarMenuButton>
                  </SidebarMenuItem>
                ))}
              </SidebarMenu>
            </SidebarGroup>
          </SidebarContent>
          <SidebarFooter>
            <Button variant="ghost" onClick={handleLogout}>
              <LogOut className="mr-2 h-4 w-4"/>
              Log out
            </Button>
          </SidebarFooter>
        </Sidebar>

        <main className="flex-1 p-4">
          {activeTab === 'Home' && (
            <Card>
              <CardHeader>
                <CardTitle>Welcome to ServiceConnect!</CardTitle>
                <CardDescription>
                  Here you can post new jobs and view quotes from service providers.
                </CardDescription>
              </CardHeader>
              <CardContent>
                <JobPosting />
                {/* Add other relevant components or information here */}
              </CardContent>
            </Card>
          )}
          {activeTab === 'Bookings' && (
            <Card>
              <CardHeader>
                <CardTitle>Your Bookings</CardTitle>
                <CardDescription>
                  List of confirmed and completed jobs.
                </CardDescription>
              </CardHeader>
              <CardContent>
                <Bookings />
              </CardContent>
            </Card>
          )}
          {activeTab === 'Quotes' && (
            <Card>
              <CardHeader>
                <CardTitle>Your Quotes</CardTitle>
                <CardDescription>
                  List of quotes sent or received.
                </CardDescription>
              </CardHeader>
              <CardContent>
                <Quotes />
              </CardContent>
            </Card>
          )}
        </main>
      </div>
    </SidebarProvider>
  );
}
