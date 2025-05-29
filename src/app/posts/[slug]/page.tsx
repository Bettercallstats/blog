import fs from 'fs';
import path from 'path';
import matter from 'gray-matter';

import { MDXRemote } from 'next-mdx-remote/rsc';
import remarkMath from 'remark-math';
import rehypeKatex from 'rehype-katex';
import rehypePrism from 'rehype-prism-plus';


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
  return <div className="mx-auto prose prose-sm text-gray-500 text-sm mb-8">Post not found</div>;
}

const fileContents = fs.readFileSync(fullPath, 'utf8');
const { content, data } = matter(fileContents);

  return (
    <article className="max-w-3xl mx-auto prose ">
      <h1>{data.title}</h1>
      {data.date && (
        <div className="mx-auto prose prose-sm sm:prose-base md:prose-lg max-w-3xl text-gray-600 dark:text-gray-300 text-sm sm:text-base mb-8 leading-relaxed prose-headings:font-semibold prose-a:text-blue-600 hover:prose-a:text-blue-800 prose-img:rounded-lg first:mt-0">
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
