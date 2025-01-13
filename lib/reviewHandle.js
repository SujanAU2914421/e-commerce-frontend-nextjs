import axios from "@/config/axios";

// Fetch all comments for a specific product
export const fetchAllComments = async (productId, setComments) => {
	try {
		const response = await axios.get(`comments/${productId}`);
		setComments(response.data);
	} catch (error) {
		console.error("Failed to fetch comments:", error);
	}
};

// Add a new comment to a product
export const addComment = async (productId, commentText, rating, setComments) => {
	try {
		// Send a POST request to add the comment
		await axios.post(`comments`, {
			product_id: productId,
			comment: commentText,
			rating: rating, // Assuming you want to include rating in the backend
		});

		// Fetch the updated comments after adding the new one
		fetchAllComments(productId, setComments);
	} catch (error) {
		console.error("Failed to add comment:", error);
	}
};

// Remove a comment from a product
export const removeComment = async (productId, commentId, setComments) => {
	try {
		await axios.delete(`comments/${commentId}`);
		fetchAllComments(productId, setComments); // Refresh comments after removal
	} catch (error) {
		console.error("Failed to remove comment:", error);
	}
};

// Update an existing comment for a product
export const updateComment = async (productId, commentId, updatedText, setComments) => {
	try {
		await axios.put(`comments/${commentId}`, { text: updatedText });
		fetchAllComments(productId, setComments); // Refresh comments after update
	} catch (error) {
		console.error("Failed to update comment:", error);
	}
};
