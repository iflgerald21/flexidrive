import Header from "@/components/header";
import Footer from "@/components/footer";
import { Card, CardContent, CardHeader, CardTitle, CardFooter } from "@/components/ui/card";
import Image from "next/image";
import Link from "next/link";
import { Button } from "@/components/ui/button";

export const metadata = {
  title: "Blogs | FlexiDrive Rentals",
  description: "Read the latest news and articles from FlexiDrive Rentals.",
};

const blogPosts = [
    {
        title: "Top 5 Road Trip Destinations in the Philippines",
        date: "June 25, 2024",
        excerpt: "Discover breathtaking views and unforgettable experiences. We've curated a list of the top 5 road trip destinations you can visit with your FlexiDrive rental.",
        image: "https://placehold.co/800x600.png",
        hint: "road trip landscape",
        slug: "#"
    },
    {
        title: "Choosing the Right Rental Car for Your Needs",
        date: "June 18, 2024",
        excerpt: "Sedan, SUV, or hatchback? This guide will help you choose the perfect vehicle from our fleet for your next journey, ensuring comfort, space, and efficiency.",
        image: "https://placehold.co/800x600.png",
        hint: "car keys",
        slug: "#"
    },
    {
        title: "A Guide to Renting a Car for Foreigners",
        date: "June 10, 2024",
        excerpt: "Renting a car in a new country can be daunting. Our guide for foreigners covers everything from required documents to local driving etiquette.",
        image: "https://placehold.co/800x600.png",
        hint: "map passport",
        slug: "#"
    }
];

export default function BlogsPage() {
  return (
    <div className="flex flex-col min-h-dvh bg-background text-foreground">
      <Header />
      <main className="flex-grow">
        <section className="py-12 md:py-24">
            <div className="container mx-auto px-4">
                <h1 className="text-4xl md:text-5xl font-bold font-headline text-center mb-4">
                    FlexiDrive Blog
                </h1>
                <p className="text-lg text-muted-foreground text-center mb-12 max-w-2xl mx-auto">
                    Stay updated with the latest car rental tips, travel guides, and company news.
                </p>
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                    {blogPosts.map((post) => (
                        <Card key={post.title} className="overflow-hidden shadow-lg hover:shadow-primary/20 transition-shadow duration-300 flex flex-col">
                            <Link href={post.slug}>
                                <div className="relative h-64 w-full">
                                    <Image
                                        src={post.image}
                                        alt={post.title}
                                        data-ai-hint={post.hint}
                                        fill
                                        className="object-cover"
                                    />
                                </div>
                            </Link>
                            <CardHeader>
                                <CardTitle className="text-2xl font-headline hover:text-primary transition-colors">
                                    <Link href={post.slug}>
                                        {post.title}
                                    </Link>
                                </CardTitle>
                                <p className="text-sm text-muted-foreground">{post.date}</p>
                            </CardHeader>
                            <CardContent className="flex-grow">
                                <p className="text-muted-foreground">{post.excerpt}</p>
                            </CardContent>
                            <CardFooter>
                                <Button asChild variant="link" className="p-0 h-auto text-primary">
                                    <Link href={post.slug}>
                                        Read More &rarr;
                                    </Link>
                                </Button>
                            </CardFooter>
                        </Card>
                    ))}
                </div>
            </div>
        </section>
      </main>
      <Footer />
    </div>
  );
}
