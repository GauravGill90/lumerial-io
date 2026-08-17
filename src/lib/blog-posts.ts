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
    slug: "duckduckgo-real-reviews-case-study",
    title: "We Pointed Lumerial at DuckDuckGo's Real Reviews. Here's What We Found.",
    subtitle:
      "2,180 real Google Play and App Store reviews, clustered into six themes, checked line-by-line against DuckDuckGo's own open-source Android and iOS repositories — four confirmed in code, two we couldn't.",
    category: "Case Study",
    displayDate: "August 17, 2026",
    readingTime: "9 min read",
  },
  {
    slug: "from-signal-to-revenue-catching-issues-before-the-backlog",
    title: "From Signal to Revenue: Catching Issues Before They Hit the Backlog",
    subtitle:
      "Reviews and support signals are a leading indicator, not background noise. Catching a theme while it's still small is the difference between a quick fix and a backlog item everyone already resents.",
    category: "Product",
    displayDate: "August 12, 2026",
    readingTime: "4 min read",
  },
  {
    slug: "the-cost-of-a-bug-nobody-filed-a-ticket-for",
    title: "The Cost of a Bug Nobody Filed a Ticket For",
    subtitle:
      "Ticket-driven backlogs only see the bugs someone bothered to escalate. Review-driven ranking catches the ones costing you users in silence.",
    category: "Product",
    displayDate: "August 12, 2026",
    readingTime: "4 min read",
  },
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
