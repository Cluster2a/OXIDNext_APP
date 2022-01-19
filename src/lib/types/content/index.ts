export interface Index {
	header: Header;
	sections: Section[];
}

export interface Header {
	topic: string;
	text: string;
}

export interface Section {
	header: string;
	image: string;
	text: string;
	description: string;
}
