import { doc, getDoc, collection, getDocs } from "firebase/firestore";
import { db } from "./firebase";

// Your existing single-post fetcher
export async function getPostBySlug(slug: string) {
  const docRef = doc(db, "posts", slug);
  const docSnap = await getDoc(docRef);

  if (docSnap.exists()) {
    return docSnap.data();
  } else {
    return null;
  }
}

// NEW: Fetch all posts for the homepage
export async function getAllPosts() {
  const querySnapshot = await getDocs(collection(db, "posts"));
  const posts: any[] = [];
  
  querySnapshot.forEach((doc) => {
    // Push the document ID (slug) and the rest of the data into our array
    posts.push({ slug: doc.id, ...doc.data() });
  });
  
  return posts;
}