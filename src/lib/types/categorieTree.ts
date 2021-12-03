interface SubCategory {
	title: string;
	id: string;
	link: string;
}

export interface CategorieTree {
	title: string;
	id: string;
	link: string;
	subCategories: SubCategory[];
}
