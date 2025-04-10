"use client";

import {Button} from "@/components/ui/button";
import {Card, CardContent, CardDescription, CardHeader, CardTitle} from "@/components/ui/card";

export function Quotes() {
  return (
    <div>
      <h2>Service Quotes</h2>
      <p>This section will display a list of service quotes.</p>
      {/* Add actual quote data display here */}
      <ul>
        <li>
          Service Title: Window Cleaning
          <br/>
          Scheduled Date: Dec 5, 2024
          <br/>
          Quoted Price: $50
          <br/>
          <Button>Accept</Button>
          <Button variant="destructive">Decline</Button>
        </li>
      </ul>
    </div>
  );
}
