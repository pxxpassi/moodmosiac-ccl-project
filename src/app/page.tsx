"use client";

import { useState, useEffect } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Calendar } from "@/components/ui/calendar";
import { Heatmap } from "@/components/Heatmap";
import { cn } from "@/lib/utils";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import { CalendarIcon } from "lucide-react";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";

const MockedEntries = [
  { date: "2024-01-05", count: 5 },
  { date: "2024-01-12", count: 3 },
  { date: "2024-01-20", count: 8 },
  { date: "2024-02-01", count: 2 },
  { date: "2024-02-15", count: 6 },
  { date: "2024-03-10", count: 4 },
  { date: "2024-03-25", count: 7 },
  { date: "2024-04-02", count: 9 },
  { date: "2024-04-18", count: 3 },
  { date: "2024-05-05", count: 5 },
  { date: "2024-05-22", count: 1 },
  { date: "2024-06-10", count: 8 },
  { date: "2024-06-28", count: 2 },
  { date: "2024-07-04", count: 6 },
  { date: "2024-07-19", count: 4 },
  { date: "2024-08-01", count: 7 },
  { date: "2024-08-16", count: 9 },
  { date: "2024-09-08", count: 3 },
  { date: "2024-09-24", count: 5 },
  { date: "2024-10-02", count: 1 },
  { date: "2024-10-17", count: 8 },
  { date: "2024-11-09", count: 2 },
  { date: "2024-11-25", count: 6 },
  { date: "2024-12-03", count: 4 },
  { date: "2024-12-20", count: 7 },
];

export default function Home() {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [moodColor, setMoodColor] = useState("#E6E6FA"); // Default to soft lavender
  const [reflection, setReflection] = useState("");
  const [selectedImage, setSelectedImage] = useState<File | null>(null);
  const [date, setDate] = useState<Date | undefined>(new Date());
    const [user, setUser] = useState({
        name: "User",
        imageUrl: "https://picsum.photos/50/50", // Placeholder image
    });

  useEffect(() => {
    // Check for authentication status here (e.g., JWT token in localStorage)
    const token = localStorage.getItem("token");
    if (token) {
      setIsAuthenticated(true);
    } else {
      setIsAuthenticated(false);
    }
  }, []);

  const handleLogin = () => {
    // Implement login logic here (e.g., call backend API)
    localStorage.setItem("token", "mocked_token");
    setIsAuthenticated(true);
  };

  const handleLogout = () => {
    // Implement logout logic here
    localStorage.removeItem("token");
    setIsAuthenticated(false);
  };

  const handleColorChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setMoodColor(event.target.value);
  };

  const handleReflectionChange = (event: React.ChangeEvent<HTMLTextAreaElement>) => {
    setReflection(event.target.value);
  };

  const handleImageUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    setSelectedImage(file);
  };

  const handleSaveEntry = () => {
    // Implement save entry logic here (e.g., call backend API)
    console.log("Saving entry:", {
      date,
      moodColor,
      reflection,
      selectedImage,
    });
  };

  return (
    <div className="flex flex-col min-h-screen bg-secondary text-foreground">
      <header className="bg-primary p-6 flex justify-between items-center shadow-md">
        <h1 className="text-2xl font-semibold">MoodMosiac</h1>
        <div className="flex items-center space-x-4">
            <Avatar>
                <AvatarImage src={user.imageUrl} alt={user.name} />
                <AvatarFallback>{user.name.charAt(0)}</AvatarFallback>
            </Avatar>
          {isAuthenticated ? (
            <Button variant="outline" size="sm" onClick={handleLogout}>Logout</Button>
          ) : (
            <Button variant="outline" size="sm" onClick={handleLogin}>Login</Button>
          )}
        </div>
      </header>

      <main className="container mx-auto p-6 flex-1">
        {isAuthenticated ? (
          <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
            {/* Mood Entry Card */}
            <Card>
              <CardHeader>
                <CardTitle>How was your day?</CardTitle>
              </CardHeader>
              <CardContent className="grid gap-4">
                <div className="flex items-center space-x-2">
                  <Label htmlFor="moodColor">Mood Color:</Label>
                  <input
                    type="color"
                    id="moodColor"
                    value={moodColor}
                    onChange={handleColorChange}
                    className="h-8 w-16" // Adjust the size of the color input
                  />
                </div>
                <div className="grid gap-2">
                  <Label htmlFor="reflection">Reflection:</Label>
                  <Textarea
                    id="reflection"
                    placeholder="Write your thoughts about today..."
                    value={reflection}
                    onChange={handleReflectionChange}
                    className="resize-none" // Prevent resizing
                  />
                </div>
                <div>
                  <Label htmlFor="imageUpload">Upload Image:</Label>
                  <Input
                    type="file"
                    id="imageUpload"
                    accept="image/*"
                    onChange={handleImageUpload}
                  />
                </div>

                <Popover>
                  <PopoverTrigger asChild>
                    <Button
                      variant={"outline"}
                      className={cn(
                        "w-[300px] justify-start text-left font-normal",
                        !date && "text-muted-foreground"
                      )}
                    >
                      <CalendarIcon className="mr-2 h-4 w-4" />
                      {date ? date?.toLocaleDateString() : <span>Pick a date</span>}
                    </Button>
                  </PopoverTrigger>
                  <PopoverContent className="w-auto p-0" align="start">
                    <Calendar
                      mode="single"
                      selected={date}
                      onSelect={setDate}
                      className="rounded-md border"
                    />
                  </PopoverContent>
                </Popover>
                <Button onClick={handleSaveEntry} className="w-full">Save Entry</Button>
              </CardContent>
            </Card>

            {/* Heatmap Visualization Card */}
            <Card className="col-span-2">
              <CardHeader>
                <CardTitle>Mood Heatmap</CardTitle>
              </CardHeader>
              <CardContent>
                <Heatmap entries={MockedEntries} />
              </CardContent>
            </Card>

            {/* Monthly Collage Card (Bonus Feature) */}
            <Card>
              <CardHeader>
                <CardTitle>Monthly Collage (Bonus)</CardTitle>
              </CardHeader>
              <CardContent>
                {/* Implement collage generator here */}
                <p>Collage will be displayed here</p>
              </CardContent>
            </Card>
          </div>
        ) : (
          <Card>
            <CardHeader>
              <CardTitle>Login Required</CardTitle>
            </CardHeader>
            <CardContent>
              <p>Please log in to access the dashboard.</p>
              <Button onClick={handleLogin}>Login</Button>
            </CardContent>
          </Card>
        )}
      </main>

      <footer className="bg-primary p-4 text-center mt-6">
        <p>&copy; {new Date().getFullYear()} MoodMosiac. All rights reserved.</p>
      </footer>
    </div>
  );
}
