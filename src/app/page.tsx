import { Button } from "@/components/ui/button";

export default function Home() {
  return (
    <div className="flex h-screen w-full flex-col items-center justify-center gap-8 bg-background p-8">
      <div className="text-center space-y-2">
        <h1 className="text-4xl font-bold tracking-tight">Better Button Registry</h1>
        <p className="text-muted-foreground">
          A registry that is basically better shadcn. Starting with a better button.
        </p>
      </div>
      
      <div className="flex flex-wrap items-center justify-center gap-4">
        <Button>Default Button</Button>
        <Button variant="secondary">Secondary</Button>
        <Button variant="destructive">Destructive</Button>
        <Button variant="outline">Outline</Button>
        <Button variant="ghost">Ghost</Button>
        <Button variant="link">Link</Button>
      </div>

      <div className="flex flex-wrap items-center justify-center gap-4">
        <Button size="lg">Large Button</Button>
        <Button size="sm">Small</Button>
        <Button size="icon" className="w-10 h-10">B</Button>
      </div>

      <div className="mt-8 text-center text-sm text-muted-foreground">
        Click the buttons to see the scale animation (1 to 0.97).
      </div>
    </div>
  );
}
