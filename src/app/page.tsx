import fs from 'fs'
import path from 'path'
import matter from 'gray-matter'
import Link from 'next/link'


type PostMeta = {
  slug: string
  title: string
  excerpt: string
  date: string
}

export default function Home() {
  const posts: PostMeta[] = getPosts()

  return (
    <div className="max-w-4xl mx-auto p-6">
      <h1 className="text-4xl font-bold mb-8">Latest Posts</h1>
      <div className="space-y-6">
        {posts.length === 0 && <p className="text-gray-600">No posts found.</p>}
        {posts.map((post) => (
          <article key={post.slug} className="border-b pb-6">
            <Link href={`/posts/${post.slug}`}>
              <h2 className="text-2xl font-semibold hover:text-blue-600 mb-2">
                {post.title}
              </h2>
            </Link>
            <p className="text-gray-600">{post.excerpt}</p>
            <div className="mt-2 text-sm text-gray-500">
              {new Date(post.date).toLocaleDateString()}
            </div>
          </article>
        ))}
      </div>
    </div>
  )
}

function getPosts(): PostMeta[] {
  const postsDirectory = path.join(process.cwd(), 'posts')
  if (!fs.existsSync(postsDirectory)) {
    return []
  }
  const fileNames = fs.readdirSync(postsDirectory)
  const posts = fileNames
    .filter((fileName) => fileName.endsWith('.mdx'))
    .map (fileName =>{
      const fullPath = path.join(postsDirectory, fileName)
      const fileContents = fs.readFileSync(fullPath,'utf8')
      const {data} = matter(fileContents)
      
      return {
        slug: fileName.replace(/\.mdx$/, ''),
        title: data.title,
        date: data.date || new Date().toISOString(),
        excerpt: data.excerpt,
      }
    }).filter(Boolean) as PostMeta[]
  return posts.sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime())
}
