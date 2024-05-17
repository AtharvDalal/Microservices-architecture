import axios from 'axios';
import prisma from '../config/db.config.js';

class PostController {
    static async index(req, res) {
        try {
            const posts = await prisma.post.findMany({});

            if (!Array.isArray(posts) || posts.length === 0) {
                return res.status(404).json({ msg: "No posts found" });
            }

            let postWithUsers = await Promise.all(
                posts.map(async (post) => {
                    try {
                        const userResponse = await axios.get(`${process.env.AUTH_MICRO_URL}/api/getuser/${post.user_id}`);
                        return {
                            ...post,
                            ...userResponse.data,
                        };
                    } catch (error) {
                        // If the request fails, log the error and attach the error message to the post object
                        console.error(`Error fetching user for post ID ${post.id}:`, error.message);
                        return {
                            ...post,
                            user_error: `Failed to fetch user data: ${error.message}`,
                        };
                    }
                })
            );

            return res.json({ postWithUsers });

        } catch (error) {
            console.error('Error in index method:', error.message);
            return res.status(500).json({ msg: "Something went wrong" });
        }
    }

    static async store(req, res) {
        try {
            const authUser = req.user;
            const { title, content } = req.body;

            const post = await prisma.post.create({
                data: {
                    user_id: authUser.id,
                    title,
                    content,
                },
            });

            return res.status(201).json({ post });

        } catch (error) {
            console.error('Error in store method:', error.message);
            return res.status(500).json({ msg: "Error in Store API" });
        }
    }
}

export default PostController;
