import Link from 'next/link';
import fs from 'fs';
import path from 'path';
import styles from './Blog.module.css';

const Blog = ({ posts }) => {
  return (
    <div className={styles.container}>
      <h1>Blog</h1>
      <div className={styles.posts}>
        {posts.map(post => (
          <div key={post.id} className={styles.post}>
            <h2>{post.title}</h2>
            <p><strong>Author:</strong> {post.author}</p>
            <p><strong>Date:</strong> {post.date}</p>
            <p><strong>ID:</strong> {post.id}</p>
            <Link href={`/blog/${post.slug}`} legacyBehavior>
              <a className={styles.readMore}>Read More</a>
            </Link>
          </div>
        ))}
      </div>
    </div>
  );
};

export async function getStaticProps() {
  const filePath = path.join(process.cwd(), 'data', 'data.json');
  const jsonData = fs.readFileSync(filePath);
  const posts = JSON.parse(jsonData);

  return { props: { posts } };
}

export default Blog;
