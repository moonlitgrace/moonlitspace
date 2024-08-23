import Markdown from '@/components/Markdown';
import { Badge } from '@/components/ui/badge';
import { db } from '@/db';
import { posts, PostSelect } from '@/db/schema';
import { formatDate } from '@/lib/utils';
import { eq } from 'drizzle-orm';
import removeMarkdown from 'markdown-to-text';
import { Metadata } from 'next';

export async function generateMetadata({
  params,
}: {
  params: { slug: string };
}): Promise<Metadata> {
  const { title, content } = (
    await db
      .select({ title: posts.title, content: posts.content })
      .from(posts)
      .where(eq(posts.slug, params.slug))
  )[0];
  const description = removeMarkdown(content).slice(0, 100) + '...';

  return {
    title,
    description,
  };
}

export default async function Page({ params }: { params: { slug: string } }) {
  const postData: PostSelect = (
    await db.select().from(posts).where(eq(posts.slug, params.slug))
  )[0];

  return (
    <>
      <div className="flex w-full flex-col items-center gap-5">
        <h4 className="text-xs font-bold uppercase text-muted-foreground">
          {formatDate(postData.createdAt)}
        </h4>
        <h1 className="text-center text-4xl md:text-5xl font-bold leading-snug">{postData.title}</h1>
        <Badge className="capitalize">{postData.tag}</Badge>
      </div>
      <Markdown markdown={postData.content} />
    </>
  );
}
