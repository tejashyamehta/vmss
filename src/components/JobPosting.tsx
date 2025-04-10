"use client";

import {Button} from "@/components/ui/button";
import {Card, CardContent, CardDescription, CardHeader, CardTitle} from "@/components/ui/card";
import {Input} from "@/components/ui/input";
import {Label} from "@/components/ui/label";
import {Textarea} from "@/components/ui/textarea";
import {Calendar} from "@/components/ui/calendar";
import {Popover, PopoverContent, PopoverTrigger} from "@/components/ui/popover";
import {cn} from "@/lib/utils";
import {CalendarIcon} from "lucide-react";
import {useState} from "react";
import {format} from "date-fns";
import {Select, SelectContent, SelectItem, SelectTrigger, SelectValue} from "@/components/ui/select";

export function JobPosting() {
  const [date, setDate] = useState<Date>();
  return (
    <div>
      <h2 className="text-lg font-semibold mb-2">Post a New Job Request</h2>

      <div className="grid gap-4">
        <div>
          <Label htmlFor="serviceType">Service Type</Label>
          <Select>
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

        <div>
          <Label htmlFor="description">Description (optional)</Label>
          <Textarea id="description" placeholder="Detailed description of the job"/>
        </div>

        <div>
          <Label>Preferred Date</Label>
          <Popover>
            <PopoverTrigger asChild>
              <Button
                variant={"outline"}
                className={cn(
                  "w-[240px] justify-start text-left font-normal",
                  !date && "text-muted-foreground"
                )}
              >
                <CalendarIcon className="mr-2 h-4 w-4"/>
                {date ? format(date, "PPP") : <span>Pick a date</span>}
              </Button>
            </PopoverTrigger>
            <PopoverContent className="w-auto p-0" align="start">
              <Calendar
                mode="single"
                selected={date}
                onSelect={setDate}
                disabled={(date) =>
                  date < new Date()
                }
                initialFocus
              />
            </PopoverContent>
          </Popover>
        </div>

        <div>
          <Label htmlFor="location">Location</Label>
          <Input id="location" placeholder="Enter location"/>
        </div>

        <Button>Submit Job Request</Button>
      </div>
    </div>
  );
}
