import Link from "next/link";
import { usePathname } from "next/navigation";

export default function LandingPageNavbar() {
	const pathname = usePathname();

	return (
		<div className="relative h-full w-full flex justify-between items-center xl:px-0 lg:px-0 px-4 border-b border-gray-100">
			<div className="relative flex">
				<div className="relative font-bold text-xl font-sans">FP</div>
			</div>
			<div className="relative flex items-center gap-8">
				<div className="relative h-auto w-auto flex gap-8 text-sm font-sans text-gray-700">
					{/* Home Menu Item */}
					<Link href="/shop" className="relative group">
						<div
							className={`relative cursor-pointer ${
								pathname === "/shop"
									? "text-black font-bold"
									: "text-gray-700 group-hover:text-gray-700"
							}`}
						>
							Shop
						</div>
						<div
							className={`absolute -bottom-1 ${
								pathname === "/shop" ? "w-1/2" : "w-0 group-hover:w-1/2"
							} duration-300 h-[2px] rounded-full bg-gray-600`}
						></div>
					</Link>

					{/* About Us Menu Item */}
					<Link href="/about-figpic" className="relative group">
						<div
							className={`relative cursor-pointer ${
								pathname === "/about-figpic"
									? "text-black font-bold"
									: "text-gray-700 group-hover:text-gray-700"
							}`}
						>
							About us
						</div>
						<div
							className={`absolute -bottom-1 ${
								pathname === "/about-figpic" ? "w-1/2" : "w-0 group-hover:w-1/2"
							} duration-300 h-[2px] rounded-full bg-gray-600`}
						></div>
					</Link>

					{/* Blog Menu Item */}
					<Link href="/blog" className="relative group">
						<div
							className={`relative cursor-pointer ${
								pathname === "/blog"
									? "text-black font-bold"
									: "text-gray-700 group-hover:text-gray-700"
							}`}
						>
							Blog
						</div>
						<div
							className={`absolute -bottom-1 ${
								pathname === "/blog" ? "w-1/2" : "w-0 group-hover:w-1/2"
							} duration-300 h-[2px] rounded-full bg-gray-600`}
						></div>
					</Link>
				</div>
			</div>
		</div>
	);
}
