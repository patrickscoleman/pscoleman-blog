import postsList from "@/data/postsList.json";
import Image from "next/image";
import Link from "next/link";
import {
  Card,
  CardContent,
  CardDescription,
  CardTitle,
} from "@/components/ui/card";
import { DateFormatted } from "@/components/dateFormatted";

export default function Blog() {
  return (
    <div>
      <h1 className="mb-8">Blog Posts</h1>
      <div className="flex flex-wrap justify-center gap-4 mx-auto">
        {postsList.map((post: any) => (
          <Link
            key={post.id}
            href={`/blog/${post.id}`}
            className="w-full md:w-auto no-underline"
            passHref
          >
            <Card className="mb-4 cursor-pointer group hover:bg-gray-100 dark:hover:bg-gray-800 transition-all max-w-[350px] h-full flex flex-col">
              <CardContent className="flex flex-col h-full justify-between">
                <div className="flex flex-col flex-grow justify-center py-2">
                  <Image
                    className="max-w-[300px] mx-auto"
                    src={post.previewImage}
                    alt={`Preview of ${post.title}`}
                    width={300}
                    height={300}
                    layout="responsive"
                  />
                </div>
                <div>
                  <CardTitle className="font-sans group-hover:text-blue-500 dark:group-hover:text-blue-400 transition-all">
                    {post.title}
                  </CardTitle>
                  <div className="mt-2 font-normal">
                    <DateFormatted
                      className="mt-2 muted italic"
                      dateString={post.date}
                    />
                    <CardDescription className="font-semibold">
                      {post.description}
                    </CardDescription>
                  </div>
                </div>
              </CardContent>
            </Card>
          </Link>
        ))}
      </div>
    </div>
  );
}