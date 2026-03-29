import type { SizesAvailable, Size } from "../types";
import { convertToType } from "./index.tsx";

interface ProductVariant {
	title: string;
	selectedOptions: {
		name: string;
		value: string;
	}[];
	inventoryQuantity: number;
}

interface ProductData {
	variants: {
		edges: {
			node: ProductVariant;
		}[];
	};
}

export const parseMerchEdges = (productData: ProductData): SizesAvailable => {
	const sizesStock = {} as SizesAvailable;
	productData.variants.edges.forEach((variant) => {
		const sizeOption = variant.node.selectedOptions.find(
			(option) => option.name === "Size",
		);

		if (sizeOption) {
			const sizeIndex = convertToType<Size>(sizeOption.value);
			sizesStock[sizeIndex] =
				sizesStock[sizeIndex] !== undefined
					? sizesStock[sizeIndex] + variant.node.inventoryQuantity
					: variant.node.inventoryQuantity;
		}
	});

	return sizesStock;
};
