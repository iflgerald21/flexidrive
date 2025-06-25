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
        excerpt: "Discover breathtaking views and unforgettable experiences. We've curated a list of the top 5 road trip destinations you can visit with your FlexiDrive rental. This is a longer excerpt to see how it looks on a featured post.",
        image: "https://placehold.co/1200x600.png",
        hint: "road trip landscape",
        slug: "#"
    },
    {
        title: "Choosing the Right Rental Car for Your Needs",
        date: "June 18, 2024",
        excerpt: "Sedan, SUV, or hatchback? This guide will help you choose the perfect vehicle from our fleet for your next journey.",
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
    },
    {
        title: "Essential Car Maintenance Tips Before a Long Drive",
        date: "June 5, 2024",
        excerpt: "Ensure a safe and smooth journey with our checklist of essential car maintenance tips to perform before embarking on a long road trip.",
        image: "https://placehold.co/800x600.png",
        hint: "car engine maintenance",
        slug: "#"
    },
    {
        title: "How to Save Money on Your Next Car Rental",
        date: "May 28, 2024",
        excerpt: "Renting a car doesn't have to break the bank. Follow these simple tips and tricks to get the best deal on your next FlexiDrive rental.",
        image: "https://placehold.co/800x600.png",
        hint: "piggy bank money",
        slug: "#"
    },
    {
        title: "Exploring Hidden Gems: A Weekend Getaway Guide",
        date: "May 20, 2024",
        excerpt: "Escape the city and discover a hidden paradise just a drive away. Our weekend getaway guide will take you to stunning, lesser-known spots.",
        image: "https://placehold.co/800x600.png",
        hint: "beach sunset",
        slug: "#"
    }
];

const BlogPostCard = ({ post, featured = false }: { post: (typeof blogPosts)[0], featured?: boolean }) => {
    if (featured) {
        return (
            <Card className="overflow-hidden shadow-lg hover:shadow-primary/20 transition-shadow duration-300 md:grid md:grid-cols-2 md:gap-0">
                <div className="relative h-64 md:h-full w-full">
                    <Link href={post.slug}>
                        <Image
                            src={post.image}
                            alt={post.title}
                            data-ai-hint={post.hint}
                            fill
                            className="object-cover"
                        />
                    </Link>
                </div>
                <div className="flex flex-col p-6">
                    <CardHeader className="p-0">
                        <p className="text-sm text-muted-foreground mb-2">{post.date}</p>
                        <CardTitle className="text-3xl font-headline hover:text-primary transition-colors">
                            <Link href={post.slug}>
                                {post.title}
                            </Link>
                        </CardTitle>
                    </CardHeader>
                    <CardContent className="flex-grow p-0 mt-4">
                        <p className="text-muted-foreground">{post.excerpt}</p>
                    </CardContent>
                    <CardFooter className="p-0 mt-4">
                        <Button asChild variant="link" className="p-0 h-auto text-primary">
                            <Link href={post.slug}>
                                Read More &rarr;
                            </Link>
                        </Button>
                    </CardFooter>
                </div>
            </Card>
        )
    }

    return (
        <Card className="overflow-hidden shadow-lg hover:shadow-primary/20 transition-shadow duration-300 flex flex-col">
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
    );
};

export default function BlogsPage() {
    const featuredPost = blogPosts[0];
    const otherPosts = blogPosts.slice(1);

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

                        {featuredPost && (
                            <div className="mb-12">
                                <h2 className="text-2xl font-bold font-headline mb-6">Featured Post</h2>
                                <BlogPostCard post={featuredPost} featured={true} />
                            </div>
                        )}
                        
                        {otherPosts.length > 0 && (
                            <>
                                <h2 className="text-2xl font-bold font-headline mb-6">More Posts</h2>
                                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                                    {otherPosts.map((post) => (
                                        <BlogPostCard key={post.title} post={post} />
                                    ))}
                                </div>
                            </>
                        )}
                    </div>
                </section>
            </main>
            <Footer />
        </div>
    );
}
