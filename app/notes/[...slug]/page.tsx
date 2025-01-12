import { posts } from "#site/content";
import { MDXContent } from "@/components/notes-ui/mdx-components";
import { notFound } from "next/navigation";
import "@/styles/mdx.css";
import { Metadata } from "next";
import { siteConfig } from "@/config/site";
import { Tag } from "@/components/tag";
import ScrollProgress from "@/components/notes-ui/ScrollProcess";
import LeftComponent from "@/components/notes-ui/LeftComponent";

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
    notFound();
  }

  const slug = post.slug.replace(/^notes\//, "");
  const unitMatch = slug.match(/unit-(\d+)/i);
  const currentUnit = unitMatch ? parseInt(unitMatch[1], 10) : 1;

  return (
    <>
      <ScrollProgress />
      <div className="flex w-full">
        <div className="relative flex-[1]">
          <LeftComponent/>
        </div>
        <article className="py-6 prose dark:prose-invert max-w-3xl ">
          <h1 className="mb-2">{post.title}</h1>
          <div className="flex gap-2 mb-2">
            {post.tags?.map((tag) => (
              <Tag tag={tag} key={tag} />
            ))}
          </div>
          {post.description && (
            <p className="text-xl mt-0 text-muted-foreground">
              {post.description}
            </p>
          )}
          <hr className="my-4" />
          <MDXContent
            code={post.body}
            currentUnit={currentUnit}
            totalUnits={5}
            slug={slug}
            />
        </article>
        <div className="flex-[1]">anme</div>

          </div>
    </>
  );
}
