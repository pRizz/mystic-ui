import { Iphone } from "@/ui/iphone";

const previewImage =
	"https://placehold.co/390x844/png?text=Mystic+UI&font=montserrat";

export default function IphoneImageDemo() {
	return (
		<div class="relative w-64">
			<Iphone src={previewImage} />
		</div>
	);
}
