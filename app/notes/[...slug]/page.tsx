import { posts } from "#site/content";
import { MDXContent } from "@/components/notes-ui/mdx-components";
import "@/styles/mdx.css";
import { Metadata } from "next";
import { siteConfig } from "@/config/site";
import { Tag } from "@/components/tag";
import ScrollProgress from "@/components/notes-ui/ScrollProcess";
import DynamicArticle from "@/components/notes-ui/DynamicArticle";

interface PostPageProps {
  params: {
    slug: string[];
  };
}

async function getPostFromParams(params: PostPageProps["params"]) {
  const slug = params?.slug?.join("/");

  const post =
    posts.find((post) => post.slugAsParams === slug) ||
    posts.find((post) => post.slugAsParams === `${slug}/index`);

  return post;
}

export async function generateMetadata({
  params,
}: PostPageProps): Promise<Metadata> {
  const post = await getPostFromParams(params);

  if (!post) {
    return {};
  }

  const ogSearchParams = new URLSearchParams();
  ogSearchParams.set("title", post.title);

  return {
    title: post.title,
    description: post.description,
    authors: { name: siteConfig.author },
    openGraph: {
      title: post.title,
      description: post.description,
      type: "article",
      url: post.slug,
      images: [
        {
          url: `/api/og?${ogSearchParams.toString()}`,
          width: 1200,
          height: 630,
          alt: post.title,
        },
      ],
    },
    twitter: {
      card: "summary_large_image",
      title: post.title,
      description: post.description,
      images: [`/api/og?${ogSearchParams.toString()}`],
    },
  };
}

export async function generateStaticParams(): Promise<
  PostPageProps["params"][]
> {
  return posts.map((post) => ({
    slug: post.slugAsParams.split("/"),
  }));
}

export default async function PostPage({ params }: PostPageProps) {
  const post = await getPostFromParams(params);

  if (!post || (!post.published && !post.excludeFromMain)) {
    return <h1>Post not found</h1>;
  }

  const slug = post.slug.replace(/^notes\//, "");
  const unitMatch = slug.match(/unit-(\d+)/i);
  const currentUnit = unitMatch ? parseInt(unitMatch[1], 10) : 1;

  return (
    <>
      <ScrollProgress />
      <div className="container max-w-5xl mx-auto py-4">
        <DynamicArticle
          title={post.title}
          description={post.description}
          tags={post.tags}
          body={post.body}
          slug={slug}
          currentUnit={currentUnit}
          totalUnits={5}
        />
      </div>
    </>
  );
}
