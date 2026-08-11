export type BlogPostMeta = {
  slug: string;
  title: string;
  subtitle: string;
  category: string;
  displayDate: string;
  readingTime: string;
};

export const blogPosts: BlogPostMeta[] = [
  {
    slug: "from-review-to-fix-how-fast-lumerial-moves",
    title: "From Review to Fix: How Fast Lumerial Actually Moves",
    subtitle:
      "Most of the delay between a complaint and a fix is relaying and reproducing, not coding. Connecting a repo is what lets Lumerial skip straight to a grounded diagnosis.",
    category: "Engineering",
    displayDate: "August 11, 2026",
    readingTime: "5 min read",
  },
  {
    slug: "your-users-already-told-you-whats-broken",
    title: "Your Users Already Told You What's Broken",
    subtitle:
      "App Store and Google Play reviews are the highest-signal, lowest-cost user research most teams already own — and stop reading past the star rating.",
    category: "Product",
    displayDate: "August 11, 2026",
    readingTime: "6 min read",
  },
];

export function getBlogPost(slug: string): BlogPostMeta | undefined {
  return blogPosts.find((post) => post.slug === slug);
}
