"use client";
import { ShoppingCart, User } from "lucide-react/dist/cjs/lucide-react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect } from "react";

export default function ShopNavbar({
	categories,
	shopCurrentCategory,
	setShopCurrentCategory,
}) {
	const pathName = usePathname();

	useEffect(() => {
		console.log(pathName);
	}, []);

	return (
		<div className="relative w-full h-16 flex items-center px-8 border-b border-gray-100">
			<div className="relative h-full w-full flex justify-between items-center flex-wrap">
				<div className="relative flex gap-5 items-center">
					<Link href="/" className="relative flex items-center justify-center">
						<div className="relative text-sm font-bold font-sans">FP</div>
					</Link>
					<div className="relative h-3 w-[1px] bg-black"></div>
					<Link href="/shop" className="relative flex gap-3 items-center">
						<div className="relative h-auto text-xs font-bold capitalize">
							{"shop"}
						</div>
					</Link>
				</div>
				<div className="relative h-auto w-auto">
					<div className="relative h-auto w-auto flex gap-6 items-center">
						{pathName != "/cart" && (
							<Link href="/account/activity" className="relative">
								<ShoppingCart size={20} />
							</Link>
						)}
						<Link
							href="/account/profile"
							className="relative h-10 w-10 flex items-center justify-center bg-gray-200 rounded-full"
						>
							<User size={20} />
						</Link>
					</div>
				</div>
			</div>
		</div>
	);
}
