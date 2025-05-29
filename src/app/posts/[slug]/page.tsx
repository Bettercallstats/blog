import fs from 'fs';
import path from 'path';
import matter from 'gray-matter';

import { MDXRemote } from 'next-mdx-remote/rsc';
import remarkMath from 'remark-math';
import rehypeKatex from 'rehype-katex';
import rehypePrism from 'rehype-prism-plus';

import 'katex/dist/katex.min.css';
import PythonRunner from '@/components/PythonRunner';
import AutoHeightEmbed from '@/components/AutoHeightEmbed';



const components = {
  PythonRunner,
  AutoHeightEmbed,
};


export async function generateStaticParams() {
  const postsDirectory = path.join(process.cwd(), 'posts');

  if (!fs.existsSync(postsDirectory)) return [];

  const fileNames = fs.readdirSync(postsDirectory)
  return fileNames.map((fileName) =>({
    slug: fileName.replace(/\.mdx$/, ''),
  })) ;
 
}

export default async function Post({ params }: { params: { slug: string } }) {

const { slug } = params;
const fullPath = path.join(process.cwd(), 'posts', `${slug}.mdx`);

if (!fs.existsSync(fullPath)) {
  return <div className="max-w-3xl mx-auto prose prose-neutral dark:prose-invert prose-sm sm:prose-base leading-relaxed">Post not found</div>;
}

const fileContents = fs.readFileSync(fullPath, 'utf8');
const { content, data } = matter(fileContents);

  return (
    <article className="max-w-3xl mx-auto prose prose-neutral dark:prose-invert prose-sm sm:prose-base leading-relaxed">
      <h1>{data.title}</h1>
      {data.date && (
        <div className="text-gray-500 text-sm mb-8">
          {new Date(data.date).toLocaleDateString()}
        </div>
      )}
      <MDXRemote
        source={content}
        components={components}
        options={{
          mdxOptions: {
            remarkPlugins: [remarkMath],
            rehypePlugins: [[rehypeKatex as any], [rehypePrism as any]],
          },
        }}
      />
    </article>
  );
}
