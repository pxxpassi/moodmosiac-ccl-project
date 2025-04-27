"use client";

import React, {useState, useEffect} from 'react';
import {Card, CardContent, CardDescription, CardHeader, CardTitle} from "@/components/ui/card";
import {Avatar, AvatarFallback, AvatarImage} from "@/components/ui/avatar";
import {Slider} from "@/components/ui/slider";
import {Button} from "@/components/ui/button";
import {Textarea} from "@/components/ui/textarea";
import {toast} from "@/hooks/use-toast";
import {useToast} from "@/hooks/use-toast";
import {Label} from "@/components/ui/label";

import {useForm} from "react-hook-form";
import {z} from "zod";
import {zodResolver} from "@hookform/resolvers/zod";
import {Form, FormControl, FormDescription, FormField, FormItem, FormLabel} from "@/components/ui/form";
import {cn} from "@/lib/utils";
import {useRouter} from 'next/navigation';
import {Calendar} from "@/components/ui/calendar";
import {Popover, PopoverContent, PopoverTrigger} from "@/components/ui/popover";
import {CalendarIcon} from "lucide-react";
import {format} from "date-fns";
import {Heatmap} from "@/components/Heatmap";

// Define a schema for the form values
const formSchema = z.object({
  reflection: z.string(),
});

const coffeeColors = [
  {name: 'Espresso', hex: '#462e05'},
  {name: 'Coffee', hex: '#6f4e37'},
  {name: 'Latte', hex: '#a38259'},
  {name: 'Cappuccino', hex: '#c69c6e'},
  {name: 'Macchiato', hex: '#e3d5b2'},
];

export default function Home() {
  const {toast} = useToast();
  const [moodColor, setMoodColor] = useState<string>('#6f4e37');
  const [selectedImage, setSelectedImage] = useState<string | null>(null);
  const [date, setDate] = useState<Date | undefined>(new Date());
  const router = useRouter();

  // Initialize react-hook-form
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      reflection: '',
    },
  });

  const onSubmit = async (values: z.infer<typeof formSchema>) => {
    try {
      const formData = {
        userId: 'abc123', // Replace with logged-in user ID
        entryDate: format(date || new Date(), 'yyyy-MM-dd'), // Format date correctly
        moodColor,
        reflection: values.reflection,
        imageUrl: selectedImage || '', // Later you can upload and replace this with real S3 URL
      };
  
      const response = await fetch('http://13.201.38.3/api/entries/add', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
      });
  
      if (!response.ok) {
        throw new Error('Failed to save entry.');
      }
  
      toast({
        title: 'Entry saved successfully!',
      });
      form.reset();
      setSelectedImage(null);
    } catch (error) {
      toast({
        variant: 'destructive',
        title: 'Something went wrong.',
        description: (error as any).message,
      });
    } finally {
      router.refresh();
    }
  };
  
  

  // Placeholder data for heatmap
  const heatmapEntries = [
    {date: '2024-01-15', count: 1},
    {date: '2024-02-20', count: 2},
    {date: '2024-03-10', count: 3},
    {date: '2024-04-05', count: 4},
    {date: '2024-05-25', count: 5},
    {date: '2024-06-12', count: 6},
    {date: '2024-07-01', count: 7},
    {date: '2024-08-18', count: 8},
    {date: '2024-09-08', count: 9},
    {date: '2024-10-27', count: 10},
    {date: '2024-11-03', count: 11},
    {date: '2024-12-30', count: 12},
  ];

  const handleImageUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setSelectedImage(reader.result as string);
      };
      reader.readAsDataURL(file);
    }
  };

  return (
    <div className="flex flex-col min-h-screen antialiased">
      <div className="container mx-auto flex-1 p-4">
        <div className="grid gap-4 grid-cols-1">
          {/* How was your day Card */}
          <Card className="col-span-1">
            <CardHeader>
              <CardTitle className="text-2xl">How was your day?</CardTitle>
              <CardDescription>Select a color, write a reflection, and upload an image to record your mood.</CardDescription>
            </CardHeader>
            <CardContent className="grid gap-4">
              {/* Date selection */}
              <div className="grid gap-2">
                <Label htmlFor="date">Date</Label>
                <Popover>
                  <PopoverTrigger asChild>
                    <Button
                      variant={'outline'}
                      className={cn(
                        'w-[240px] justify-start text-left font-normal',
                        !date && 'text-muted-foreground'
                      )}
                    >
                      <CalendarIcon className="mr-2 h-4 w-4"/>
                      {date ? format(date, 'PPP') : <span>Pick a date</span>}
                    </Button>
                  </PopoverTrigger>
                  <PopoverContent className="w-auto p-0" align="start">
                    <Calendar
                      mode="single"
                      selected={date}
                      onSelect={setDate}
                      initialFocus
                    />
                  </PopoverContent>
                </Popover>
              </div>
              {/* Mood Color Selection */}
              <div className="grid gap-2">
                <Label>Mood</Label>
                <div className="flex items-center space-x-2">
                  {coffeeColors.map((color) => (
                    <button
                      key={color.name}
                      onClick={() => setMoodColor(color.hex)}
                      className="h-8 w-8 rounded-full focus:outline-none"
                      style={{
                        backgroundColor: color.hex,
                        border: moodColor === color.hex ? '2px solid teal' : 'none',
                      }}
                    />
                  ))}
                </div>
              </div>

              {/* Reflection Text Area */}
              <Form {...form}>
                <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
                  <FormField
                    control={form.control}
                    name="reflection"
                    render={({field}) => (
                      <FormItem>
                        <FormLabel>Reflection</FormLabel>
                        <FormControl>
                          <Textarea placeholder="Write your reflection here." {...field} />
                        </FormControl>
                        <FormDescription>Share your thoughts about the day.</FormDescription>
                      </FormItem>
                    )}
                  />

                  {/* Image Upload */}
                  <div className="grid gap-2">
                    <Label htmlFor="image">Image Upload</Label>
                    <input
                      type="file"
                      id="image"
                      className="hidden"
                      onChange={handleImageUpload}
                    />
                    <Button asChild variant="outline">
                      <label htmlFor="image">
                        Upload Image
                      </label>
                    </Button>
                    {selectedImage && (
                      <div className="relative w-32 h-32">
                        <img
                          src={selectedImage}
                          alt="Uploaded"
                          className="rounded-md object-cover w-full h-full"
                        />
                      </div>
                    )}
                  </div>

                  <Button type="submit" style={{backgroundColor: '#6f4e37', color: 'white'}} className="font-semibold hover:bg-teal-700">
                    Save Entry
                  </Button>
                </form>
              </Form>
            </CardContent>
          </Card>

          {/* Heatmap Visualization Card */}
          <Card className="col-span-1">
            <CardHeader>
              <CardTitle>Yearly Mood Heatmap</CardTitle>
              <CardDescription>A visual overview of your mood trends.</CardDescription>
            </CardHeader>
            <CardContent>
              <Heatmap entries={heatmapEntries}/>
            </CardContent>
          </Card>

          {/* Monthly Collage Card  */}
          <Card>
            <CardHeader>
              <CardTitle>Monthly Collage</CardTitle>
            </CardHeader>
            <CardContent>
              {/* Implement collage generator here */}
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
}
