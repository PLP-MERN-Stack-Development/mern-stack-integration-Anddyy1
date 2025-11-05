import mongoose from "mongoose";
import dotenv from "dotenv";

import User from "./models/User.js";
import Category from "./models/Category.js";
import Post from "./models/Post.js";

dotenv.config();

// Connect to MongoDB
mongoose
  .connect(process.env.MONGO_URI, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => console.log("✅ MongoDB Connected for Seeding"))
  .catch((err) => console.error("❌ MongoDB Connection Error:", err));

const seedData = async () => {
  try {
    // Clear existing data
    await User.deleteMany({});
    await Category.deleteMany({});
    await Post.deleteMany({});

    // ---------------- USERS ----------------
    const users = await User.insertMany([
      {
        name: "Alice Johnson",
        email: "alice@example.com",
        password: "password123", // In production, hash passwords
      },
      {
        name: "Bob Smith",
        email: "bob@example.com",
        password: "password123",
      },
    ]);

    console.log("✅ Users seeded");

    // ---------------- CATEGORIES ----------------
    const categories = await Category.insertMany([
      { name: "Web Development", description: "Posts about web development" },
      { name: "MERN Stack", description: "Posts about MongoDB, Express, React, Node.js" },
    ]);

    console.log("✅ Categories seeded");

    // ---------------- POSTS ----------------
    const posts = await Post.insertMany([
      {
        title: "Mastering the MERN Stack: A Complete Guide",
        slug: "mastering-the-mern-stack-a-complete-guide",
        content: `The MERN stack is one of the most popular full-stack JavaScript frameworks used for modern web development. It consists of MongoDB, Express.js, React.js, and Node.js, allowing developers to use JavaScript for both client and server-side code.

### MongoDB
MongoDB is a NoSQL database that stores data in JSON-like documents. Its flexible schema allows developers to iterate quickly without worrying about complex migrations.

### Express.js
Express.js is a lightweight framework for building Node.js applications. It simplifies routing, middleware management, and API development, acting as the backbone of server-side operations.

### React.js
React is a powerful frontend library that enables developers to build interactive, component-based user interfaces. It supports a virtual DOM, efficient state management, and reusable components, making frontend development scalable and maintainable.

### Node.js
Node.js provides a JavaScript runtime environment on the server. Its event-driven, non-blocking I/O model makes it perfect for building scalable network applications.

### Putting It All Together
By combining MongoDB, Express, React, and Node.js, developers can create robust, full-stack web applications. From database management to server logic and interactive UIs, the MERN stack provides an end-to-end JavaScript solution.`,
        author: users[0]._id,
        category: categories[1]._id,
        image: "/uploads/mern-stack-guide.png",
      },
      {
        title: "Introduction to Web Development",
        slug: "introduction-to-web-development",
        content: `Web development has evolved significantly over the past decade. Modern web applications require responsive designs, efficient backend APIs, and interactive frontends. By learning technologies like HTML5, CSS3, JavaScript, and frontend frameworks such as React, developers can create powerful applications that scale.`,
        author: users[1]._id,
        category: categories[0]._id,
        image: "/uploads/web-dev.png",
      },
      {
        title: "Advanced React Patterns",
        slug: "advanced-react-patterns",
        content: `React is a versatile library for building user interfaces. To create scalable applications, developers often use advanced patterns such as custom hooks, context API, higher-order components, and render props. Understanding these patterns ensures maintainable and performant React applications.`,
        author: users[0]._id,
        category: categories[0]._id,
        image: "/uploads/advanced-react.png",
      },
    ]);

    console.log("✅ Posts seeded");
    process.exit();
  } catch (error) {
    console.error("❌ Seeding error:", error);
    process.exit(1);
  }
};

seedData();
