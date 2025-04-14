import Image from "next/legacy/image"
import { FaLinkedin, FaGithub } from 'react-icons/fa'

export default function About() {
  return (
    <div className="max-w-5xl mx-auto px-6 py-12">
      {/* Header */}
      <div className="mb-10 text-center">
        <h1 className="text-4xl font-bold mb-4">About BetterCallStats</h1>
        <p className="text-lg text-gray-700">
        This blog is my little corner of the internet where I geek out about everything I love or happen to understand.
        </p>
      </div>

      {/* What We Cover */}
      <div className="mb-12">
        <h2 className="text-2xl font-semibold mb-4">What We Cover</h2>
        <ul className="grid grid-cols-1 sm:grid-cols-2 gap-2 list-disc list-inside text-gray-800">
          <li>Statistical Analysis</li>
          <li>Inferential Techniques</li>
          <li>Machine Learning Applications</li>
          <li>Programming with Python and R</li>
          <li>Textbook Recommendations</li>
        </ul>
      </div>

      {/* About Me Section */}
      <div className="mb-12 flex flex-col lg:flex-row items-center gap-6">
        <div className="relative w-40 h-56 shrink-0 rounded-xl overflow-hidden border border-gray-300 shadow-md">
          <Image
            src="/dp.png"
            alt="Profile Picture"
            layout="fill"
            className="object-cover"
            sizes="(max-width: 640px) 100vw, (max-width: 768px) 50vw, 33vw"
            priority
            quality={100}
            objectFit="cover"
          />
        </div>
        <div className="text-gray-700 text-lg">
          <h2 className="text-2xl font-semibold mb-2">About Me</h2>
          <p>
            Hola amigos! I'm an engineer with a love for stats and a knack for storytelling.
            I believe that data is not just numbers; it's a narrative waiting to be told..
          </p>
        </div>
      </div>

      {/* Contact & Profiles */}
      <div className="mb-4">
        <h2 className="text-2xl font-semibold mb-2">Contact & Profiles</h2>
        <div className="flex items-center gap-4">
          <a
            href="https://www.linkedin.com/in/madhusudan-chunletia-83a623210"
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center gap-2 text-blue-600 hover:underline"
          >
            <FaLinkedin className="text-xl" />
            LinkedIn
          </a>
          <a
            href="https://github.com/aragornchunletia"
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center gap-2 text-gray-800 hover:underline"
          >
            <FaGithub className="text-xl" />
            GitHub
          </a>
        </div>
      </div>
    </div>
  )
}
