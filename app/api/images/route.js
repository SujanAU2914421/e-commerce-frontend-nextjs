import fs from "fs";
import path from "path";

export async function GET() {
	const directoryPath = path.join(process.cwd(), "public", "assets", "photos"); // Path to the photos directory

	// Read all files in the directory
	try {
		const files = await fs.promises.readdir(directoryPath);

		// Filter only image files (you can adjust this if you have other types of files)
		const imageFiles = files.filter((file) =>
			/\.(jpg|jpeg|png|gif|webp)$/i.test(file)
		);

		// Map files to image paths
		const imagePaths = imageFiles.map((file) => `/assets/photos/${file}`);

		// Return the image paths as a JSON response
		return new Response(JSON.stringify(imagePaths), {
			status: 200,
			headers: {
				"Content-Type": "application/json",
			},
		});
	} catch (err) {
		return new Response("Failed to read directory", { status: 500 });
	}
}
