"use client";

import * as React from "react";
import {motion} from "framer-motion";
import {CornerUpRight} from "lucide-react";

import {cn} from "@/lib/utils";

const NavigationMenu = React.forwardRef<
  React.ElementRef<"div">,
  React.ComponentPropsWithoutRef<"div">
>(({className, children, ...props}, ref) => (
  <div className={cn("group relative flex flex-1 items-center justify-center", className)} {...props} ref={ref}>
    {children}
  </div>
));
NavigationMenu.displayName = "NavigationMenu";

const NavigationMenuList = React.forwardRef<
  React.ElementRef<"ul">,
  React.ComponentPropsWithoutRef<"ul">
>(({className, children, ...props}, ref) => (
  <ul
    className={cn(
      "peer relative z-50 m-0 flex list-none flex-col gap-3 rounded-lg bg-popover p-4 text-popover-foreground shadow-md",
      "group-[[data-orientation=horizontal]]:flex-row group-[[data-orientation=horizontal]]:gap-0 group-[[data-orientation=horizontal]]:shadow-none",
      "group-[[data-orientation=vertical]]:absolute group-[[data-orientation=vertical]]:top-full group-[[data-orientation=vertical]]:left-0",
      "group-[[data-expanded=false]]:hidden",
      className
    )}
    {...props}
    ref={ref}
  >
    {children}
  </ul>
));
NavigationMenuList.displayName = "NavigationMenuList";

const NavigationMenuItem = React.forwardRef<
  React.ElementRef<"li">,
  React.ComponentPropsWithoutRef<"li">
>(({className, children, ...props}, ref) => (
  <li className={cn("", className)} {...props} ref={ref}>
    {children}
  </li>
));
NavigationMenuItem.displayName = "NavigationMenuItem";

const NavigationMenuContent = React.forwardRef<
  React.ElementRef<"div">,
  React.ComponentPropsWithoutRef<"div">
>(({className, children, ...props}, ref) => (
  <motion.div
    className={cn(
      "relative mt-1.5 flex w-[var(--navigation-menu-viewport-width)] flex-col overflow-hidden rounded-md border bg-popover p-4 text-popover-foreground shadow-lg data-[motion=from-end]:pl-52 data-[motion=from-start]:pr-52",
      className
    )}
    {...props}
    ref={ref}
    variants={{
      static: {opacity: 1, rotateX: 0, rotateY: 0, scale: 1, x: 0, y: 0},
      in: {opacity: 1, rotateX: 0, rotateY: 0, scale: 1, x: 0, y: 0, transition: {duration: 0.2, ease: [0.17, 0.67, 0.83, 0.67]}},
      out: {
        opacity: 0,
        rotateX: -10,
        rotateY: 0,
        scale: 0.95,
        x: 0,
        y: -10,
        transition: {duration: 0.2, ease: [0.17, 0.67, 0.83, 0.67]},
        transitionEnd: {
          x: 0,
          y: 0,
        },
      },
    }}
  />
));
NavigationMenuContent.displayName = "NavigationMenuContent";

const NavigationMenuTrigger = React.forwardRef<
  React.ElementRef<"button">,
  React.ComponentPropsWithoutRef<"button">
>(({className, children, ...props}, ref) => (
  <button
    className={cn(
      "group inline-flex h-10 w-max items-center justify-center rounded-md bg-transparent px-4 py-2 text-sm font-medium transition-colors hover:bg-accent hover:text-accent-foreground focus:bg-accent focus:text-accent-foreground focus:outline-none disabled:pointer-events-none disabled:opacity-50 data-[active]:bg-accent/50 data-[state=open]:bg-accent/50",
      className
    )}
    {...props}
    ref={ref}
  >
    {children}
    <CornerUpRight className="relative top-[1px] ml-1 inline-block h-3.5 w-3.5 transition-transform duration-500 group-data-[state=open]:rotate-90"/>
  </button>
));
NavigationMenuTrigger.displayName = "NavigationMenuTrigger";

const NavigationMenuLink = React.forwardRef<
  React.ElementRef<"a">,
  React.ComponentPropsWithoutRef<"a">
>(({className, ...props}, ref) => (
  <a
    className={cn(
      "block select-none space-y-1 rounded-md p-3 leading-none no-underline outline-none transition-colors hover:bg-accent hover:text-accent-foreground focus:bg-accent focus:text-accent-foreground",
      className
    )}
    {...props}
    ref={ref}
  />
));
NavigationMenuLink.displayName = "NavigationMenuLink";

const navigationMenuTriggerStyle = () => {
  return cn(
    "group inline-flex h-10 w-max items-center justify-center rounded-md bg-transparent px-4 py-2 text-sm font-medium transition-colors hover:bg-accent hover:text-accent-foreground focus:bg-accent focus:text-accent-foreground focus:outline-none disabled:pointer-events-none disabled:opacity-50 data-[active]:bg-accent/50 data-[state=open]:bg-accent/50"
  );
};

export {
  NavigationMenu,
  NavigationMenuList,
  NavigationMenuItem,
  NavigationMenuContent,
  NavigationMenuTrigger,
  NavigationMenuLink,
  navigationMenuTriggerStyle,
};
