import fs from 'fs';
import path from 'path';
import Head from 'next/head';
import { useRouter } from 'next/router';

const Post = ({ post }) => {
  const router = useRouter();
  if (!router.isFallback && !post) {
    return <div>Post not found</div>;
  }

  return (
    <div>
      <Head>
        <title>{post.title}</title>
        <meta name="description" content={post.description} />
      </Head>
      <h1>{post.title}</h1>
      <p><strong>Author:</strong> {post.author}</p>
      <p><strong>Date:</strong> {post.date}</p>
      <p><strong>Description:</strong> {post.description}</p>
    </div>
  );
};

export async function getStaticPaths() {
  const filePath = path.join(process.cwd(), 'data', 'data.json');
  const jsonData = fs.readFileSync(filePath);
  const posts = JSON.parse(jsonData);

  const paths = posts.map(post => ({
    params: { slug: post.slug },
  }));

  return { paths, fallback: false };
}

export async function getStaticProps({ params }) {
  const filePath = path.join(process.cwd(), 'data', 'data.json');
  const jsonData = fs.readFileSync(filePath);
  const posts = JSON.parse(jsonData);

  const post = posts.find(post => post.slug === params.slug);

  return { props: { post } };
}

export default Post;
