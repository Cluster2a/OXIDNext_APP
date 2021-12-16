export type Maybe<T> = T | null;
export type InputMaybe<T> = Maybe<T>;
export type Exact<T extends { [key: string]: unknown }> = { [K in keyof T]: T[K] };
export type MakeOptional<T, K extends keyof T> = Omit<T, K> & { [SubKey in K]?: Maybe<T[SubKey]> };
export type MakeMaybe<T, K extends keyof T> = Omit<T, K> & { [SubKey in K]: Maybe<T[SubKey]> };
/** All built-in and custom scalars, mapped to their actual values */
export type Scalars = {
	ID: string;
	String: string;
	Boolean: boolean;
	Int: number;
	Float: number;
	/** The `DateTime` scalar type represents time data, represented as an ISO-8601 encoded UTC date string. */
	DateTime: any;
};

export type Action = {
	__typename?: 'Action';
	/**
	 *
	 *
	 */
	active: Scalars['Boolean'];
	/**
	 *
	 *
	 */
	id: Scalars['ID'];
	/**
	 *
	 *
	 */
	products: Array<Product>;
	/**
	 *
	 *
	 */
	title: Scalars['String'];
};

export type ActionFilterList = {
	actionId?: InputMaybe<StringFilterInput>;
};

export type Attribute = {
	__typename?: 'Attribute';
	/**
	 *
	 *
	 */
	title: Scalars['String'];
};

export type AttributeFilterList = {
	title?: InputMaybe<StringFilterInput>;
};

export type Banner = {
	__typename?: 'Banner';
	/**
	 *
	 *
	 */
	active: Scalars['Boolean'];
	/**
	 *
	 *
	 */
	id: Scalars['ID'];
	/**
	 *
	 *
	 */
	link: Scalars['String'];
	/**
	 *
	 *
	 */
	picture: Scalars['String'];
	/**
	 *
	 *
	 */
	product?: Maybe<Product>;
	/**
	 *
	 *
	 */
	sorting: Scalars['Int'];
	/**
	 *
	 *
	 */
	title: Scalars['String'];
};

export type BannerActiveArgs = {
	now?: InputMaybe<Scalars['DateTime']>;
};

export type Basket = {
	__typename?: 'Basket';
	/**
	 *
	 *
	 */
	cost: BasketCost;
	/**
	 *
	 *
	 */
	creationDate?: Maybe<Scalars['DateTime']>;
	/**
	 *
	 *
	 */
	deliveryAddress?: Maybe<DeliveryAddress>;
	/**
	 * Returns selected delivery method for current basket.
	 *
	 */
	deliveryMethod?: Maybe<DeliveryMethodInterface>;
	/**
	 *
	 *
	 */
	formattedNetPrice: Scalars['String'];
	/**
	 *
	 *
	 */
	id: Scalars['ID'];
	/**
	 *
	 *
	 */
	items: Array<BasketItem>;
	/**
	 *
	 *
	 */
	lastUpdateDate?: Maybe<Scalars['DateTime']>;
	/**
	 *
	 *
	 */
	owner: BasketOwner;
	/**
	 * Returns selected payment for current basket.
	 *
	 */
	payment?: Maybe<PaymentInterface>;
	/**
	 *
	 *
	 */
	public: Scalars['Boolean'];
	/**
	 *
	 *
	 */
	title: Scalars['String'];
	/**
	 *
	 *
	 */
	vouchers: Array<Voucher>;
};

export type BasketItemsArgs = {
	pagination?: InputMaybe<PaginationFilterInput>;
};

export type BasketCost = {
	__typename?: 'BasketCost';
	/**
	 *
	 *
	 */
	currency: Currency;
	/**
	 *
	 *
	 */
	delivery: Price;
	/**
	 *
	 *
	 */
	discount: Scalars['Float'];
	/**
	 *
	 *
	 */
	payment: Price;
	/**
	 *
	 *
	 */
	productGross: BasketProductBruttoSum;
	/**
	 *
	 *
	 */
	productNet: Price;
	/**
	 *
	 *
	 */
	total: Scalars['Float'];
	/**
	 *
	 *
	 */
	voucher: Scalars['Float'];
};

export type BasketDeliveryMethod = DeliveryMethodInterface & {
	__typename?: 'BasketDeliveryMethod';
	/**
	 *
	 *
	 */
	cost: Price;
	/**
	 *
	 *
	 */
	id: Scalars['ID'];
	/**
	 *
	 *
	 */
	paymentTypes: Array<BasketPayment>;
	/**
	 *
	 *
	 */
	position: Scalars['Int'];
	/**
	 *
	 *
	 */
	title: Scalars['String'];
};

export type BasketInput = {
	public?: InputMaybe<Scalars['Boolean']>;
	title: Scalars['String'];
};

export type BasketItem = {
	__typename?: 'BasketItem';
	/**
	 *
	 *
	 */
	amount: Scalars['Int'];
	/**
	 *
	 *
	 */
	formattedNetPrice: Scalars['String'];
	/**
	 *
	 *
	 */
	id: Scalars['ID'];
	/**
	 *
	 *
	 */
	lastUpdateDate?: Maybe<Scalars['DateTime']>;
	/**
	 *
	 *
	 */
	product?: Maybe<Product>;
};

export type BasketOwner = {
	__typename?: 'BasketOwner';
	/**
	 *
	 *
	 */
	firstName: Scalars['String'];
	/**
	 *
	 *
	 */
	lastName: Scalars['String'];
};

export type BasketPayment = PaymentInterface & {
	__typename?: 'BasketPayment';
	/**
	 *
	 *
	 */
	active: Scalars['Boolean'];
	/**
	 *
	 *
	 */
	cost: Price;
	/**
	 *
	 *
	 */
	description: Scalars['String'];
	/**
	 *
	 *
	 */
	id: Scalars['ID'];
	/**
	 *
	 *
	 */
	title: Scalars['String'];
	/**
	 *
	 *
	 */
	updated?: Maybe<Scalars['DateTime']>;
};

export type BasketProductBruttoSum = {
	__typename?: 'BasketProductBruttoSum';
	/**
	 *
	 *
	 */
	sum: Scalars['Float'];
	/**
	 *
	 *
	 */
	vats: Array<BasketProductVats>;
};

export type BasketProductVats = {
	__typename?: 'BasketProductVats';
	/**
	 *
	 *
	 */
	vatPrice: Scalars['Float'];
	/**
	 *
	 *
	 */
	vatRate: Scalars['Float'];
};

export type BreadCrumbs = {
	__typename?: 'BreadCrumbs';
	/**
	 *
	 *
	 */
	link: Scalars['String'];
	/**
	 *
	 *
	 */
	title: Scalars['String'];
};

export type Category = {
	__typename?: 'Category';
	/**
	 *
	 *
	 */
	active: Scalars['Boolean'];
	/**
	 *
	 *
	 */
	children: Array<Category>;
	/**
	 * If the external link is specified it will be opened instead of category content
	 *
	 */
	externalLink: Scalars['String'];
	/**
	 * Hidden categories are not visible in lists and menu,
	 * but can be accessed by direct link
	 *
	 */
	hidden: Scalars['Boolean'];
	/**
	 *
	 *
	 */
	icon?: Maybe<Scalars['String']>;
	/**
	 *
	 *
	 */
	id: Scalars['ID'];
	/**
	 *
	 *
	 */
	longDescription: Scalars['String'];
	/**
	 *
	 *
	 */
	parent?: Maybe<Category>;
	/**
	 * Defines the order in which categories are displayed:
	 * The category with the lowest number is displayed at the top,
	 * and the category with the highest number at the bottom
	 *
	 */
	position: Scalars['Int'];
	/**
	 *
	 *
	 */
	previewImage: Scalars['String'];
	/**
	 * If specified, all products, with price higher than specified,
	 * will be shown in this category
	 *
	 */
	priceFrom: Scalars['Float'];
	/**
	 * If specified, all products, with price lower than specified,
	 * will be shown in this category
	 *
	 */
	priceTo: Scalars['Float'];
	/**
	 *
	 *
	 */
	products: Array<Product>;
	/**
	 *
	 *
	 */
	promotionIcon?: Maybe<Scalars['String']>;
	/**
	 *
	 *
	 */
	root?: Maybe<Category>;
	/**
	 *
	 *
	 */
	seo: Seo;
	/**
	 *
	 *
	 */
	shortDescription: Scalars['String'];
	/**
	 *
	 *
	 */
	shortLink: Scalars['String'];
	/**
	 *
	 *
	 */
	showSuffix: Scalars['Boolean'];
	/**
	 * Skip all negative discounts for products in this category
	 * (Discounts, Vouchers, Delivery ...)
	 *
	 */
	skipDiscount: Scalars['Boolean'];
	/**
	 *
	 *
	 */
	template: Scalars['String'];
	/**
	 *
	 *
	 */
	thumbnail?: Maybe<Scalars['String']>;
	/**
	 *
	 *
	 */
	timestamp?: Maybe<Scalars['DateTime']>;
	/**
	 *
	 *
	 */
	title: Scalars['String'];
	/**
	 *
	 *
	 */
	vat?: Maybe<Scalars['Float']>;
};

export type CategoryActiveArgs = {
	now?: InputMaybe<Scalars['DateTime']>;
};

export type CategoryProductsArgs = {
	pagination?: InputMaybe<PaginationFilterInput>;
	sort?: InputMaybe<ProductSorting>;
};

export type CategoryFilterList = {
	parentId?: InputMaybe<StringFilterInput>;
	title?: InputMaybe<StringFilterInput>;
};

export type CategoryIdFilterInput = {
	equals: Scalars['ID'];
};

export type CategorySorting = {
	position?: InputMaybe<Scalars['String']>;
	title?: InputMaybe<Scalars['String']>;
};

export type CategorySubTree = {
	__typename?: 'CategorySubTree';
	/**
	 *
	 *
	 */
	id: Scalars['String'];
	/**
	 *
	 *
	 */
	link: Scalars['String'];
	/**
	 *
	 *
	 */
	title: Scalars['String'];
};

export type CategoryTree = {
	__typename?: 'CategoryTree';
	/**
	 *
	 *
	 */
	id: Scalars['String'];
	/**
	 *
	 *
	 */
	link: Scalars['String'];
	/**
	 *
	 *
	 */
	subCategories: Array<CategorySubTree>;
	/**
	 *
	 *
	 */
	title: Scalars['String'];
};

export type Common = {
	__typename?: 'Common';
	/**
	 *
	 *
	 */
	article?: Maybe<Product>;
	/**
	 *
	 *
	 */
	bredcrumbs: Array<BreadCrumbs>;
	/**
	 *
	 *
	 */
	category?: Maybe<Category>;
	/**
	 *
	 *
	 */
	id: Scalars['String'];
	/**
	 *
	 *
	 */
	lang: Scalars['Int'];
	/**
	 *
	 *
	 */
	type: Scalars['String'];
};

export type ContactRequestInput = {
	email?: InputMaybe<Scalars['String']>;
	firstName?: InputMaybe<Scalars['String']>;
	lastName?: InputMaybe<Scalars['String']>;
	message?: InputMaybe<Scalars['String']>;
	salutation?: InputMaybe<Scalars['String']>;
	subject?: InputMaybe<Scalars['String']>;
};

export type Content = {
	__typename?: 'Content';
	/**
	 *
	 *
	 */
	active: Scalars['Boolean'];
	/**
	 *
	 *
	 */
	category?: Maybe<Category>;
	/**
	 * Returns rendered HTML string that might contain script and style tags
	 *
	 */
	content: Scalars['String'];
	/**
	 *
	 *
	 */
	folder: Scalars['String'];
	/**
	 *
	 *
	 */
	id: Scalars['ID'];
	/**
	 * Return not rendered, raw content
	 *
	 */
	rawContent: Scalars['String'];
	/**
	 *
	 *
	 */
	seo: Seo;
	/**
	 *
	 *
	 */
	title: Scalars['String'];
	/**
	 *
	 *
	 */
	version: Scalars['String'];
};

export type ContentFilterList = {
	folder?: InputMaybe<StringFilterInput>;
};

export type Country = {
	__typename?: 'Country';
	/**
	 *
	 *
	 */
	active: Scalars['Boolean'];
	/**
	 *
	 *
	 */
	creationDate?: Maybe<Scalars['DateTime']>;
	/**
	 *
	 *
	 */
	description: Scalars['String'];
	/**
	 *
	 *
	 */
	id: Scalars['ID'];
	/**
	 *
	 *
	 */
	isoAlpha2: Scalars['String'];
	/**
	 *
	 *
	 */
	isoAlpha3: Scalars['String'];
	/**
	 *
	 *
	 */
	isoNumeric: Scalars['String'];
	/**
	 *
	 *
	 */
	position: Scalars['Int'];
	/**
	 *
	 *
	 */
	shortDescription: Scalars['String'];
	/**
	 *
	 *
	 */
	states: Array<State>;
	/**
	 *
	 *
	 */
	title: Scalars['String'];
};

export type CountryStatesArgs = {
	sort?: InputMaybe<StateSorting>;
};

export type CountryFilterList = {
	title?: InputMaybe<StringFilterInput>;
};

export type CountrySorting = {
	position?: InputMaybe<Scalars['String']>;
	title?: InputMaybe<Scalars['String']>;
};

export type Currency = {
	__typename?: 'Currency';
	/**
	 *
	 *
	 */
	id: Scalars['Int'];
	/**
	 *
	 *
	 */
	name: Scalars['String'];
	/**
	 *
	 *
	 */
	rate: Scalars['Float'];
	/**
	 *
	 *
	 */
	sign: Scalars['String'];
};

export type Customer = {
	__typename?: 'Customer';
	/**
	 *
	 *
	 */
	basket: Basket;
	/**
	 *
	 *
	 */
	baskets: Array<Basket>;
	/**
	 *
	 *
	 */
	birthdate?: Maybe<Scalars['DateTime']>;
	/**
	 *
	 *
	 */
	created?: Maybe<Scalars['DateTime']>;
	/**
	 *
	 *
	 */
	customerNumber: Scalars['String'];
	/**
	 *
	 *
	 */
	deliveryAddresses: Array<DeliveryAddress>;
	/**
	 *
	 *
	 */
	email: Scalars['String'];
	/**
	 *
	 *
	 */
	files: Array<OrderFile>;
	/**
	 *
	 *
	 */
	firstName: Scalars['String'];
	/**
	 *
	 *
	 */
	id: Scalars['ID'];
	/**
	 *
	 *
	 */
	invoiceAddress: InvoiceAddress;
	/**
	 *
	 *
	 */
	lastName: Scalars['String'];
	/**
	 *
	 *
	 */
	newsletterStatus?: Maybe<NewsletterStatus>;
	/**
	 *
	 *
	 */
	orders: Array<Order>;
	/**
	 *
	 *
	 */
	points: Scalars['Int'];
	/**
	 *
	 *
	 */
	registered?: Maybe<Scalars['DateTime']>;
	/**
	 *
	 *
	 */
	reviews: Array<Review>;
	/**
	 *
	 *
	 */
	updated?: Maybe<Scalars['DateTime']>;
};

export type CustomerBasketArgs = {
	title: Scalars['String'];
};

export type CustomerOrdersArgs = {
	pagination?: InputMaybe<PaginationFilterInput>;
};

export type CustomerInput = {
	birthdate?: InputMaybe<Scalars['DateTime']>;
	email: Scalars['String'];
	password: Scalars['String'];
};

export type DeliveryAddress = {
	__typename?: 'DeliveryAddress';
	/**
	 *
	 *
	 */
	additionalInfo: Scalars['String'];
	/**
	 *
	 *
	 */
	city: Scalars['String'];
	/**
	 *
	 *
	 */
	company: Scalars['String'];
	/**
	 *
	 *
	 */
	country: Country;
	/**
	 *
	 *
	 */
	fax: Scalars['String'];
	/**
	 *
	 *
	 */
	firstName: Scalars['String'];
	/**
	 *
	 *
	 */
	id: Scalars['ID'];
	/**
	 *
	 *
	 */
	lastName: Scalars['String'];
	/**
	 *
	 *
	 */
	phone: Scalars['String'];
	/**
	 *
	 *
	 */
	salutation: Scalars['String'];
	/**
	 *
	 *
	 */
	state?: Maybe<State>;
	/**
	 *
	 *
	 */
	street: Scalars['String'];
	/**
	 *
	 *
	 */
	streetNumber: Scalars['String'];
	/**
	 *
	 *
	 */
	updated?: Maybe<Scalars['DateTime']>;
	/**
	 *
	 *
	 */
	zipCode: Scalars['String'];
};

export type DeliveryMethod = DeliveryMethodInterface & {
	__typename?: 'DeliveryMethod';
	/**
	 *
	 *
	 */
	id: Scalars['ID'];
	/**
	 *
	 *
	 */
	paymentTypes: Array<BasketPayment>;
	/**
	 *
	 *
	 */
	position: Scalars['Int'];
	/**
	 *
	 *
	 */
	title: Scalars['String'];
};

export type DeliveryMethodInterface = {
	/**
	 *
	 *
	 */
	id: Scalars['ID'];
	/**
	 *
	 *
	 */
	paymentTypes: Array<BasketPayment>;
	/**
	 *
	 *
	 */
	position: Scalars['Int'];
	/**
	 *
	 *
	 */
	title: Scalars['String'];
};

export type DeliveryProvider = {
	__typename?: 'DeliveryProvider';
	/**
	 *
	 *
	 */
	active: Scalars['Boolean'];
	/**
	 *
	 *
	 */
	id: Scalars['ID'];
	/**
	 *
	 *
	 */
	title: Scalars['String'];
};

export type File = {
	__typename?: 'File';
	/**
	 *
	 *
	 */
	filename: Scalars['String'];
	/**
	 *
	 *
	 */
	id: Scalars['ID'];
	/**
	 *
	 *
	 */
	onlyPaidDownload: Scalars['Boolean'];
	/**
	 *
	 *
	 */
	product: Product;
};

export type IdFilterInput = {
	equals: Scalars['ID'];
};

export type Inquirer = {
	__typename?: 'Inquirer';
	/**
	 *
	 *
	 */
	firstName: Scalars['String'];
};

export type InvoiceAddress = {
	__typename?: 'InvoiceAddress';
	/**
	 *
	 *
	 */
	additionalInfo: Scalars['String'];
	/**
	 *
	 *
	 */
	city: Scalars['String'];
	/**
	 *
	 *
	 */
	company: Scalars['String'];
	/**
	 *
	 *
	 */
	country: Country;
	/**
	 *
	 *
	 */
	created?: Maybe<Scalars['DateTime']>;
	/**
	 *
	 *
	 */
	fax: Scalars['String'];
	/**
	 *
	 *
	 */
	firstName: Scalars['String'];
	/**
	 *
	 *
	 */
	lastName: Scalars['String'];
	/**
	 *
	 *
	 */
	mobile: Scalars['String'];
	/**
	 *
	 *
	 */
	phone: Scalars['String'];
	/**
	 *
	 *
	 */
	salutation: Scalars['String'];
	/**
	 *
	 *
	 */
	state?: Maybe<State>;
	/**
	 *
	 *
	 */
	street: Scalars['String'];
	/**
	 *
	 *
	 */
	streetNumber: Scalars['String'];
	/**
	 *
	 *
	 */
	updated?: Maybe<Scalars['DateTime']>;
	/**
	 *
	 *
	 */
	vatID: Scalars['String'];
	/**
	 *
	 *
	 */
	zipCode: Scalars['String'];
};

export type Language = {
	__typename?: 'Language';
	/**
	 *
	 *
	 */
	code: Scalars['String'];
	/**
	 *
	 *
	 */
	id: Scalars['ID'];
	/**
	 *
	 *
	 */
	language: Scalars['String'];
};

export type Link = {
	__typename?: 'Link';
	/**
	 *
	 *
	 */
	active: Scalars['Boolean'];
	/**
	 *
	 *
	 */
	creationDate?: Maybe<Scalars['DateTime']>;
	/**
	 *
	 *
	 */
	description: Scalars['String'];
	/**
	 *
	 *
	 */
	id: Scalars['ID'];
	/**
	 *
	 *
	 */
	timestamp?: Maybe<Scalars['DateTime']>;
	/**
	 *
	 *
	 */
	url: Scalars['String'];
};

export type LinkFilterList = {
	description?: InputMaybe<StringFilterInput>;
};

export type Manufacturer = {
	__typename?: 'Manufacturer';
	/**
	 *
	 *
	 */
	active: Scalars['Boolean'];
	/**
	 *
	 *
	 */
	icon?: Maybe<Scalars['String']>;
	/**
	 *
	 *
	 */
	id: Scalars['ID'];
	/**
	 *
	 *
	 */
	products: Array<Product>;
	/**
	 *
	 *
	 */
	seo: Seo;
	/**
	 *
	 *
	 */
	shortdesc: Scalars['String'];
	/**
	 *
	 *
	 */
	timestamp?: Maybe<Scalars['DateTime']>;
	/**
	 *
	 *
	 */
	title: Scalars['String'];
};

export type ManufacturerProductsArgs = {
	pagination?: InputMaybe<PaginationFilterInput>;
	sort?: InputMaybe<ProductSorting>;
};

export type ManufacturerFilterList = {
	title?: InputMaybe<StringFilterInput>;
};

export type ManufacturerSorting = {
	title?: InputMaybe<Scalars['String']>;
};

export type Mutation = {
	__typename?: 'Mutation';
	/**
	 *
	 *
	 */
	basketAddItem: Basket;
	/**
	 *
	 *
	 */
	basketAddVoucher: Basket;
	/**
	 *
	 *
	 */
	basketCreate: Basket;
	/**
	 *
	 *
	 */
	basketRemoveItem: Basket;
	/**
	 *
	 *
	 */
	basketRemoveVoucher: Basket;
	/**
	 *
	 *
	 */
	contactRequest: Scalars['Boolean'];
	/**
	 *
	 *
	 */
	customerRegister: Customer;
	/**
	 *
	 *
	 */
	newsletterOptIn: NewsletterStatus;
	/**
	 * NewsletterStatusSubscribeInput input fields are optional in case of token.
	 * - If token exists without NewsletterStatusSubscribeInput, token email will be subscribed.
	 *   If token user is already subscribed, status will not be changed and no optin mail is sent.
	 * - If token and NewsletterStatusSubscribeInput exists, input email will be subscribed.
	 *   If input email user is already subscribed, status will be changed to 2 and
	 *   optin mail is sent depending on shop config parameter blOrderOptInEmail.
	 * - If only NewsletterStatusSubscribeInput exists, input email will be subscribed.
	 *   If input email user is already subscribed, status will be changed to 2 and
	 *   optin mail is sent depending on shop config parameter blOrderOptInEmail.
	 *
	 * If user account for email and shop exists, input fields are overruled by existing user data.
	 * If user account for email and shop does not exist, new user will be created (no password, mininal data)
	 */
	newsletterSubscribe: NewsletterStatus;
	/**
	 * NewsletterStatusUnsubscribeInput email field is optional.
	 * In case of missing input email but available token, newsletter will be unsubscribed for token email.
	 * Input email is preferred over token email.
	 */
	newsletterUnsubscribe: Scalars['Boolean'];
	/**
	 *
	 *
	 */
	placeOrder: Order;
};

export type MutationBasketAddItemArgs = {
	amount: Scalars['Float'];
	basketId: Scalars['ID'];
	productId: Scalars['ID'];
};

export type MutationBasketAddVoucherArgs = {
	basketId: Scalars['ID'];
	voucherNumber: Scalars['String'];
};

export type MutationBasketCreateArgs = {
	basket: BasketInput;
};

export type MutationBasketRemoveItemArgs = {
	amount: Scalars['Float'];
	basketId: Scalars['ID'];
	basketItemId: Scalars['ID'];
};

export type MutationBasketRemoveVoucherArgs = {
	basketId: Scalars['ID'];
	voucherId: Scalars['ID'];
};

export type MutationContactRequestArgs = {
	request?: InputMaybe<ContactRequestInput>;
};

export type MutationCustomerRegisterArgs = {
	customer: CustomerInput;
};

export type MutationNewsletterOptInArgs = {
	newsletterStatus: NewsletterStatusInput;
};

export type MutationNewsletterSubscribeArgs = {
	newsletterStatus?: InputMaybe<NewsletterStatusSubscribeInput>;
};

export type MutationNewsletterUnsubscribeArgs = {
	newsletterStatus?: InputMaybe<NewsletterStatusUnsubscribeInput>;
};

export type MutationPlaceOrderArgs = {
	basketId: Scalars['ID'];
	confirmTermsAndConditions?: InputMaybe<Scalars['Boolean']>;
};

export type NaLanguage = {
	__typename?: 'NaLanguage';
	/**
	 *
	 *
	 */
	abbr: Scalars['String'];
	/**
	 *
	 *
	 */
	id: Scalars['Int'];
	/**
	 *
	 *
	 */
	name: Scalars['String'];
	/**
	 *
	 *
	 */
	selected: Scalars['Boolean'];
	/**
	 *
	 *
	 */
	url?: Maybe<Scalars['String']>;
};

export type NewsletterStatus = {
	__typename?: 'NewsletterStatus';
	/**
	 *
	 *
	 */
	email: Scalars['String'];
	/**
	 *
	 *
	 */
	failedEmailCount: Scalars['Int'];
	/**
	 *
	 *
	 */
	firstName: Scalars['String'];
	/**
	 *
	 *
	 */
	lastName: Scalars['String'];
	/**
	 *
	 *
	 */
	salutation: Scalars['String'];
	/**
	 *
	 *
	 */
	status: Scalars['String'];
	/**
	 *
	 *
	 */
	subscribed?: Maybe<Scalars['DateTime']>;
	/**
	 *
	 *
	 */
	unsubscribed?: Maybe<Scalars['DateTime']>;
	/**
	 *
	 *
	 */
	updated?: Maybe<Scalars['DateTime']>;
};

export type NewsletterStatusInput = {
	confirmCode: Scalars['String'];
	email: Scalars['String'];
};

export type NewsletterStatusSubscribe = {
	__typename?: 'NewsletterStatusSubscribe';
	/**
	 *
	 *
	 */
	email: Scalars['String'];
	/**
	 *
	 *
	 */
	firstName: Scalars['String'];
	/**
	 *
	 *
	 */
	lastName: Scalars['String'];
	/**
	 *
	 *
	 */
	salutation: Scalars['String'];
};

export type NewsletterStatusSubscribeInput = {
	email?: InputMaybe<Scalars['String']>;
	firstName?: InputMaybe<Scalars['String']>;
	lastName?: InputMaybe<Scalars['String']>;
	salutation?: InputMaybe<Scalars['String']>;
};

export type NewsletterStatusUnsubscribe = {
	__typename?: 'NewsletterStatusUnsubscribe';
	/**
	 *
	 *
	 */
	email: Scalars['String'];
};

export type NewsletterStatusUnsubscribeInput = {
	email: Scalars['String'];
};

export type Order = {
	__typename?: 'Order';
	/**
	 *
	 *
	 */
	cancelled: Scalars['Boolean'];
	/**
	 *
	 *
	 */
	cost: OrderCost;
	/**
	 *
	 *
	 */
	delivery: OrderDelivery;
	/**
	 *
	 *
	 */
	deliveryAddress?: Maybe<OrderDeliveryAddress>;
	/**
	 *
	 *
	 */
	files: Array<OrderFile>;
	/**
	 *
	 *
	 */
	id: Scalars['ID'];
	/**
	 *
	 *
	 */
	invoiceAddress: OrderInvoiceAddress;
	/**
	 *
	 *
	 */
	invoiceNumber: Scalars['Int'];
	/**
	 *
	 *
	 */
	invoiced?: Maybe<Scalars['DateTime']>;
	/**
	 *
	 *
	 */
	items: Array<OrderItem>;
	/**
	 *
	 *
	 */
	orderNumber: Scalars['Int'];
	/**
	 *
	 *
	 */
	ordered?: Maybe<Scalars['DateTime']>;
	/**
	 *
	 *
	 */
	paid?: Maybe<Scalars['DateTime']>;
	/**
	 *
	 *
	 */
	payment?: Maybe<OrderPayment>;
	/**
	 *
	 *
	 */
	remark: Scalars['String'];
	/**
	 *
	 *
	 */
	updated?: Maybe<Scalars['DateTime']>;
	/**
	 *
	 *
	 */
	vouchers: Array<Voucher>;
};

export type OrderCost = {
	__typename?: 'OrderCost';
	/**
	 *
	 *
	 */
	currency: Currency;
	/**
	 *
	 *
	 */
	delivery: Price;
	/**
	 *
	 *
	 */
	discount: Scalars['Float'];
	/**
	 *
	 *
	 */
	payment: Price;
	/**
	 *
	 *
	 */
	productGross: OrderProductBruttoSum;
	/**
	 *
	 *
	 */
	productNet: Price;
	/**
	 *
	 *
	 */
	total: Scalars['Float'];
	/**
	 *
	 *
	 */
	voucher: Scalars['Float'];
};

export type OrderDelivery = {
	__typename?: 'OrderDelivery';
	/**
	 *
	 *
	 */
	dispatched?: Maybe<Scalars['DateTime']>;
	/**
	 *
	 *
	 */
	provider: DeliveryProvider;
	/**
	 *
	 *
	 */
	trackingNumber: Scalars['String'];
	/**
	 *
	 *
	 */
	trackingURL: Scalars['String'];
};

export type OrderDeliveryAddress = {
	__typename?: 'OrderDeliveryAddress';
	/**
	 *
	 *
	 */
	additionalInfo: Scalars['String'];
	/**
	 *
	 *
	 */
	city: Scalars['String'];
	/**
	 *
	 *
	 */
	company: Scalars['String'];
	/**
	 *
	 *
	 */
	country: Country;
	/**
	 *
	 *
	 */
	fax: Scalars['String'];
	/**
	 *
	 *
	 */
	firstName: Scalars['String'];
	/**
	 *
	 *
	 */
	lastName: Scalars['String'];
	/**
	 *
	 *
	 */
	phone: Scalars['String'];
	/**
	 *
	 *
	 */
	salutation: Scalars['String'];
	/**
	 *
	 *
	 */
	state?: Maybe<State>;
	/**
	 *
	 *
	 */
	street: Scalars['String'];
	/**
	 *
	 *
	 */
	streetNumber: Scalars['String'];
	/**
	 *
	 *
	 */
	zipCode: Scalars['String'];
};

export type OrderFile = {
	__typename?: 'OrderFile';
	/**
	 *
	 *
	 */
	downloadCount: Scalars['Int'];
	/**
	 *
	 *
	 */
	file?: Maybe<File>;
	/**
	 *
	 *
	 */
	filename: Scalars['String'];
	/**
	 *
	 *
	 */
	firstDownload?: Maybe<Scalars['DateTime']>;
	/**
	 *
	 *
	 */
	id: Scalars['ID'];
	/**
	 *
	 *
	 */
	latestDownload?: Maybe<Scalars['DateTime']>;
	/**
	 *
	 *
	 */
	maxDownloadCount: Scalars['Int'];
	/**
	 *
	 *
	 */
	url: Scalars['String'];
	/**
	 *
	 *
	 */
	valid: Scalars['Boolean'];
	/**
	 *
	 *
	 */
	validUntil?: Maybe<Scalars['DateTime']>;
};

export type OrderInvoiceAddress = {
	__typename?: 'OrderInvoiceAddress';
	/**
	 *
	 *
	 */
	additionalInfo: Scalars['String'];
	/**
	 *
	 *
	 */
	city: Scalars['String'];
	/**
	 *
	 *
	 */
	company: Scalars['String'];
	/**
	 *
	 *
	 */
	country: Country;
	/**
	 *
	 *
	 */
	email: Scalars['String'];
	/**
	 *
	 *
	 */
	fax: Scalars['String'];
	/**
	 *
	 *
	 */
	firstName: Scalars['String'];
	/**
	 *
	 *
	 */
	lastName: Scalars['String'];
	/**
	 *
	 *
	 */
	phone: Scalars['String'];
	/**
	 *
	 *
	 */
	salutation: Scalars['String'];
	/**
	 *
	 *
	 */
	state?: Maybe<State>;
	/**
	 *
	 *
	 */
	street: Scalars['String'];
	/**
	 *
	 *
	 */
	streetNumber: Scalars['String'];
	/**
	 *
	 *
	 */
	vatID: Scalars['String'];
	/**
	 *
	 *
	 */
	zipCode: Scalars['String'];
};

export type OrderItem = {
	__typename?: 'OrderItem';
	/**
	 *
	 *
	 */
	amount: Scalars['Float'];
	/**
	 *
	 *
	 */
	bundle: Scalars['Boolean'];
	/**
	 *
	 *
	 */
	cancelled: Scalars['Boolean'];
	/**
	 *
	 *
	 */
	dimensions: ProductDimensions;
	/**
	 *
	 *
	 */
	id: Scalars['ID'];
	/**
	 *
	 *
	 */
	insert: Scalars['DateTime'];
	/**
	 *
	 *
	 */
	itemPrice: Price;
	/**
	 *
	 *
	 */
	price: Price;
	/**
	 *
	 *
	 */
	product?: Maybe<Product>;
	/**
	 *
	 *
	 */
	shortDescription: Scalars['String'];
	/**
	 *
	 *
	 */
	sku: Scalars['String'];
	/**
	 *
	 *
	 */
	timestamp: Scalars['DateTime'];
	/**
	 *
	 *
	 */
	title: Scalars['String'];
};

export type OrderPayment = {
	__typename?: 'OrderPayment';
	/**
	 *
	 *
	 */
	id: Scalars['ID'];
	/**
	 *
	 *
	 */
	payment?: Maybe<PaymentInterface>;
	/**
	 *
	 *
	 */
	updated?: Maybe<Scalars['DateTime']>;
	/**
	 *
	 *
	 */
	values: Array<OrderPaymentValue>;
};

export type OrderPaymentValue = {
	__typename?: 'OrderPaymentValue';
	/**
	 *
	 *
	 */
	key: Scalars['String'];
	/**
	 *
	 *
	 */
	value: Scalars['String'];
};

export type OrderProductBruttoSum = {
	__typename?: 'OrderProductBruttoSum';
	/**
	 *
	 *
	 */
	sum: Scalars['Float'];
	/**
	 *
	 *
	 */
	vats: Array<OrderProductVats>;
};

export type OrderProductVats = {
	__typename?: 'OrderProductVats';
	/**
	 *
	 *
	 */
	vatPrice: Scalars['Float'];
	/**
	 *
	 *
	 */
	vatRate: Scalars['Float'];
};

export type PaginationFilterInput = {
	limit?: InputMaybe<Scalars['Int']>;
	offset?: InputMaybe<Scalars['Int']>;
};

export type Payment = PaymentInterface & {
	__typename?: 'Payment';
	/**
	 *
	 *
	 */
	active: Scalars['Boolean'];
	/**
	 *
	 *
	 */
	description: Scalars['String'];
	/**
	 *
	 *
	 */
	id: Scalars['ID'];
	/**
	 *
	 *
	 */
	title: Scalars['String'];
	/**
	 *
	 *
	 */
	updated?: Maybe<Scalars['DateTime']>;
};

export type PaymentInterface = {
	/**
	 *
	 *
	 */
	active: Scalars['Boolean'];
	/**
	 *
	 *
	 */
	description: Scalars['String'];
	/**
	 *
	 *
	 */
	id: Scalars['ID'];
	/**
	 *
	 *
	 */
	title: Scalars['String'];
	/**
	 *
	 *
	 */
	updated?: Maybe<Scalars['DateTime']>;
};

export type Price = {
	__typename?: 'Price';
	/**
	 *
	 *
	 */
	currency: Currency;
	/**
	 *
	 *
	 */
	nettoPriceMode: Scalars['Boolean'];
	/**
	 *
	 *
	 */
	price: Scalars['Float'];
	/**
	 *
	 *
	 */
	vat: Scalars['Float'];
	/**
	 *
	 *
	 */
	vatValue: Scalars['Float'];
};

export type Product = {
	__typename?: 'Product';
	/**
	 *
	 *
	 */
	accessories: Array<Product>;
	/**
	 *
	 *
	 */
	active: Scalars['Boolean'];
	/**
	 *
	 *
	 */
	attributes: Array<ProductAttribute>;
	/**
	 *
	 *
	 */
	bundleProduct?: Maybe<Product>;
	/**
	 *
	 *
	 */
	categories: Array<Category>;
	/**
	 *
	 *
	 */
	crossSelling: Array<Product>;
	/**
	 *
	 *
	 */
	deliveryTime: ProductDeliveryTime;
	/**
	 *
	 *
	 */
	dimensions: ProductDimensions;
	/**
	 *
	 *
	 */
	ean: Scalars['String'];
	/**
	 *
	 *
	 */
	formattedPrice: Scalars['String'];
	/**
	 *
	 *
	 */
	freeShipping: Scalars['Boolean'];
	/**
	 *
	 *
	 */
	id: Scalars['ID'];
	/**
	 *
	 *
	 */
	imageGallery: ProductImageGallery;
	/**
	 *
	 *
	 */
	insert?: Maybe<Scalars['DateTime']>;
	/**
	 *
	 *
	 */
	isBuyable: Scalars['Boolean'];
	/**
	 *
	 *
	 */
	listPrice?: Maybe<Price>;
	/**
	 *
	 *
	 */
	longDescription: Scalars['String'];
	/**
	 *
	 *
	 */
	manufacturer?: Maybe<Manufacturer>;
	/**
	 *
	 *
	 */
	manufacturerEan: Scalars['String'];
	/**
	 *
	 *
	 */
	mpn: Scalars['String'];
	/**
	 *
	 *
	 */
	price: Price;
	/**
	 *
	 *
	 */
	rating: ProductRating;
	/**
	 *
	 *
	 */
	ratingAverage: Scalars['Float'];
	/**
	 *
	 *
	 */
	reviews: Array<Review>;
	/**
	 *
	 *
	 */
	scalePrices: Array<ProductScalePrice>;
	/**
	 *
	 *
	 */
	selectionLists: Array<SelectionList>;
	/**
	 *
	 *
	 */
	seo: Seo;
	/**
	 *
	 *
	 */
	shortDescription: Scalars['String'];
	/**
	 *
	 *
	 */
	shortLink: Scalars['String'];
	/**
	 *
	 *
	 */
	sku?: Maybe<Scalars['String']>;
	/**
	 *
	 *
	 */
	stock: ProductStock;
	/**
	 *
	 *
	 */
	timestamp?: Maybe<Scalars['DateTime']>;
	/**
	 *
	 *
	 */
	title: Scalars['String'];
	/**
	 *
	 *
	 */
	unit?: Maybe<ProductUnit>;
	/**
	 *
	 *
	 */
	varMinPrice: Scalars['Float'];
	/**
	 *
	 *
	 */
	varSelection: Scalars['String'];
	/**
	 *
	 *
	 */
	variantLabels: Array<Scalars['String']>;
	/**
	 *
	 *
	 */
	variantSelection: VariantSelection;
	/**
	 *
	 *
	 */
	variantValues: Array<Scalars['String']>;
	/**
	 *
	 *
	 */
	variants: Array<Product>;
	/**
	 *
	 *
	 */
	vat: Scalars['Float'];
	/**
	 *
	 *
	 */
	vendor?: Maybe<Vendor>;
	/**
	 *
	 *
	 */
	wishedPriceEnabled: Scalars['Boolean'];
};

export type ProductCategoriesArgs = {
	onlyMainCategory?: InputMaybe<Scalars['Boolean']>;
};

export type ProductVariantSelectionArgs = {
	selectedVariants?: InputMaybe<Array<SelectedVariants>>;
};

export type ProductAttribute = {
	__typename?: 'ProductAttribute';
	/**
	 *
	 *
	 */
	attribute: Attribute;
	/**
	 *
	 *
	 */
	value: Scalars['String'];
};

export type ProductDeliveryTime = {
	__typename?: 'ProductDeliveryTime';
	/**
	 * Value can be one of:
	 * - DAY
	 * - WEEK
	 * - MONTH
	 *
	 */
	deliveryTimeUnit: Scalars['String'];
	/**
	 *
	 *
	 */
	maxDeliveryTime: Scalars['Int'];
	/**
	 *
	 *
	 */
	minDeliveryTime: Scalars['Int'];
};

export type ProductDimensions = {
	__typename?: 'ProductDimensions';
	/**
	 *
	 *
	 */
	height: Scalars['Float'];
	/**
	 *
	 *
	 */
	length: Scalars['Float'];
	/**
	 *
	 *
	 */
	weight: Scalars['Float'];
	/**
	 *
	 *
	 */
	width: Scalars['Float'];
};

export type ProductFilterList = {
	category?: InputMaybe<CategoryIdFilterInput>;
	manufacturer?: InputMaybe<IdFilterInput>;
	title?: InputMaybe<StringFilterInput>;
	vendor?: InputMaybe<IdFilterInput>;
};

export type ProductImage = {
	__typename?: 'ProductImage';
	/**
	 *
	 *
	 */
	icon: Scalars['String'];
	/**
	 *
	 *
	 */
	image: Scalars['String'];
	/**
	 *
	 *
	 */
	zoom: Scalars['String'];
};

export type ProductImageGallery = {
	__typename?: 'ProductImageGallery';
	/**
	 *
	 *
	 */
	icon: Scalars['String'];
	/**
	 *
	 *
	 */
	images: Array<ProductImage>;
	/**
	 *
	 *
	 */
	thumb: Scalars['String'];
};

export type ProductRating = {
	__typename?: 'ProductRating';
	/**
	 *
	 *
	 */
	count: Scalars['Int'];
	/**
	 *
	 *
	 */
	rating: Scalars['Float'];
};

export type ProductScalePrice = {
	__typename?: 'ProductScalePrice';
	/**
	 *
	 *
	 */
	absolutePrice?: Maybe<Scalars['Float']>;
	/**
	 * Whether the scale price is
	 * - a new absolute price (you can query that in the `absolutePrice` field)
	 * - or a percentage discount (you can query that in the `discount` field)
	 *
	 */
	absoluteScalePrice: Scalars['Boolean'];
	/**
	 *
	 *
	 */
	amountFrom: Scalars['Int'];
	/**
	 *
	 *
	 */
	amountTo: Scalars['Int'];
	/**
	 *
	 *
	 */
	discount?: Maybe<Scalars['Float']>;
};

export type ProductSorting = {
	minPriceVariant?: InputMaybe<Scalars['String']>;
	position?: InputMaybe<Scalars['String']>;
	price?: InputMaybe<Scalars['String']>;
	productNumber?: InputMaybe<Scalars['String']>;
	rating?: InputMaybe<Scalars['String']>;
	stock?: InputMaybe<Scalars['String']>;
	title?: InputMaybe<Scalars['String']>;
};

export type ProductStock = {
	__typename?: 'ProductStock';
	/**
	 *
	 *
	 */
	restockDate?: Maybe<Scalars['DateTime']>;
	/**
	 *
	 *
	 */
	stock: Scalars['Float'];
	/**
	 * Value can be one of:
	 *  0 -> (green) deliverable
	 *  1 -> (orange) deliverable, but only a few left
	 * -1 -> (red) not stock
	 *
	 */
	stockStatus: Scalars['Int'];
};

export type ProductUnit = {
	__typename?: 'ProductUnit';
	/**
	 *
	 *
	 */
	name: Scalars['String'];
	/**
	 *
	 *
	 */
	price: Price;
};

export type Promotion = {
	__typename?: 'Promotion';
	/**
	 *
	 *
	 */
	active: Scalars['Boolean'];
	/**
	 *
	 *
	 */
	id: Scalars['ID'];
	/**
	 *
	 *
	 */
	text: Scalars['String'];
	/**
	 *
	 *
	 */
	title: Scalars['String'];
};

export type PublicBasket = {
	__typename?: 'PublicBasket';
	/**
	 *
	 *
	 */
	creationDate?: Maybe<Scalars['DateTime']>;
	/**
	 *
	 *
	 */
	id: Scalars['ID'];
	/**
	 *
	 *
	 */
	items: Array<BasketItem>;
	/**
	 *
	 *
	 */
	lastUpdateDate?: Maybe<Scalars['DateTime']>;
	/**
	 *
	 *
	 */
	owner: BasketOwner;
	/**
	 *
	 *
	 */
	title: Scalars['String'];
};

export type PublicBasketItemsArgs = {
	pagination?: InputMaybe<PaginationFilterInput>;
};

export type Query = {
	__typename?: 'Query';
	/**
	 *
	 *
	 */
	action: Action;
	/**
	 *
	 *
	 */
	actions: Array<Action>;
	/**
	 *
	 *
	 */
	attribute: Attribute;
	/**
	 *
	 *
	 */
	attributes: Array<Attribute>;
	/**
	 *
	 *
	 */
	banner: Banner;
	/**
	 *
	 *
	 */
	banners: Array<Banner>;
	/**
	 * Returns information for any basket the customer owns.
	 *
	 */
	basket: Basket;
	/**
	 * Argument `owner` will be matched exactly against lastname and / or email
	 * Query for public baskets by owner.
	 *
	 */
	baskets: Array<PublicBasket>;
	/**
	 * Returns the category tree to second level.
	 *
	 */
	categorieTree: Array<CategoryTree>;
	/**
	 *
	 *
	 */
	categories: Array<Category>;
	/**
	 *
	 *
	 */
	category: Category;
	/**
	 *
	 *
	 */
	content: Content;
	/**
	 *
	 *
	 */
	contents: Array<Content>;
	/**
	 *
	 *
	 */
	countries: Array<Country>;
	/**
	 *
	 *
	 */
	country: Country;
	/**
	 *
	 *
	 */
	currencies: Array<Currency>;
	/**
	 * If `name` is ommited, gives you the currently active currency
	 *
	 */
	currency: Currency;
	/**
	 * Returns a list of languages.
	 *
	 */
	languages: Array<NaLanguage>;
	/**
	 *
	 *
	 */
	link: Link;
	/**
	 *
	 *
	 */
	links: Array<Link>;
	/**
	 *
	 *
	 */
	manufacturer: Manufacturer;
	/**
	 *
	 *
	 */
	manufacturers: Array<Manufacturer>;
	/**
	 * Returns the object of a seo url.
	 *
	 */
	objectBySeoUrl: Common;
	/**
	 *
	 *
	 */
	product: Product;
	/**
	 *
	 *
	 */
	products: Array<Product>;
	/**
	 *
	 *
	 */
	promotion: Promotion;
	/**
	 *
	 *
	 */
	promotions: Array<Promotion>;
	/**
	 * Returns information for any basket marked as public.
	 *
	 */
	publicBasket: PublicBasket;
	/**
	 *
	 *
	 */
	review: Review;
	/**
	 * retrieve a JWT for authentication of further requests
	 *
	 */
	token: Scalars['String'];
	/**
	 *
	 *
	 */
	translation: Translation;
	/**
	 *
	 *
	 */
	translations: Array<Translation>;
	/**
	 *
	 *
	 */
	variants: VariantSelection;
	/**
	 *
	 *
	 */
	vendor: Vendor;
	/**
	 *
	 *
	 */
	vendors: Array<Vendor>;
	/**
	 *
	 *
	 */
	wishedPrice: WishedPrice;
	/**
	 *
	 *
	 */
	wishedPrices: Array<WishedPrice>;
};

export type QueryActionArgs = {
	actionId: Scalars['ID'];
};

export type QueryActionsArgs = {
	filter?: InputMaybe<ActionFilterList>;
};

export type QueryAttributeArgs = {
	attributeId: Scalars['ID'];
};

export type QueryAttributesArgs = {
	filter?: InputMaybe<AttributeFilterList>;
};

export type QueryBannerArgs = {
	bannerId: Scalars['ID'];
};

export type QueryBasketArgs = {
	basketId: Scalars['ID'];
};

export type QueryBasketsArgs = {
	owner: Scalars['String'];
};

export type QueryCategorieTreeArgs = {
	langId: Scalars['Int'];
};

export type QueryCategoriesArgs = {
	filter?: InputMaybe<CategoryFilterList>;
	sort?: InputMaybe<CategorySorting>;
};

export type QueryCategoryArgs = {
	categoryId: Scalars['ID'];
};

export type QueryContentArgs = {
	contentId: Scalars['ID'];
};

export type QueryContentsArgs = {
	filter?: InputMaybe<ContentFilterList>;
};

export type QueryCountriesArgs = {
	filter?: InputMaybe<CountryFilterList>;
	sort?: InputMaybe<CountrySorting>;
};

export type QueryCountryArgs = {
	countryId: Scalars['ID'];
};

export type QueryCurrencyArgs = {
	name?: InputMaybe<Scalars['String']>;
};

export type QueryLanguagesArgs = {
	langId: Scalars['Int'];
	url: Scalars['String'];
};

export type QueryLinkArgs = {
	linkId: Scalars['ID'];
};

export type QueryLinksArgs = {
	filter?: InputMaybe<LinkFilterList>;
};

export type QueryManufacturerArgs = {
	manufacturerId: Scalars['ID'];
};

export type QueryManufacturersArgs = {
	filter?: InputMaybe<ManufacturerFilterList>;
	sort?: InputMaybe<ManufacturerSorting>;
};

export type QueryObjectBySeoUrlArgs = {
	url: Scalars['String'];
};

export type QueryProductArgs = {
	productId: Scalars['ID'];
};

export type QueryProductsArgs = {
	filter?: InputMaybe<ProductFilterList>;
	pagination?: InputMaybe<PaginationFilterInput>;
	sort?: InputMaybe<ProductSorting>;
};

export type QueryPromotionArgs = {
	promotionId: Scalars['ID'];
};

export type QueryPublicBasketArgs = {
	basketId: Scalars['ID'];
};

export type QueryReviewArgs = {
	reviewId: Scalars['ID'];
};

export type QueryTokenArgs = {
	password?: InputMaybe<Scalars['String']>;
	username?: InputMaybe<Scalars['String']>;
};

export type QueryTranslationArgs = {
	key: Scalars['String'];
};

export type QueryVariantsArgs = {
	productId: Scalars['ID'];
	selectedVariants?: InputMaybe<Array<SelectedVariants>>;
};

export type QueryVendorArgs = {
	vendorId: Scalars['ID'];
};

export type QueryVendorsArgs = {
	filter?: InputMaybe<VendorFilterList>;
	sort?: InputMaybe<VendorSorting>;
};

export type QueryWishedPriceArgs = {
	wishedPriceId: Scalars['ID'];
};

export type Review = {
	__typename?: 'Review';
	/**
	 *
	 *
	 */
	active: Scalars['Boolean'];
	/**
	 *
	 *
	 */
	createAt?: Maybe<Scalars['DateTime']>;
	/**
	 *
	 *
	 */
	id: Scalars['ID'];
	/**
	 *
	 *
	 */
	language: Language;
	/**
	 *
	 *
	 */
	product?: Maybe<Product>;
	/**
	 *
	 *
	 */
	rating: Scalars['Int'];
	/**
	 *
	 *
	 */
	reviewer?: Maybe<Reviewer>;
	/**
	 *
	 *
	 */
	text: Scalars['String'];
};

export type Reviewer = {
	__typename?: 'Reviewer';
	/**
	 *
	 *
	 */
	firstName: Scalars['String'];
};

export type SelectedVariants = {
	variant: Scalars['String'];
};

export type Selection = {
	__typename?: 'Selection';
	/**
	 *
	 *
	 */
	value: Scalars['String'];
};

export type SelectionList = {
	__typename?: 'SelectionList';
	/**
	 *
	 *
	 */
	fields: Array<Selection>;
	/**
	 *
	 *
	 */
	title: Scalars['String'];
};

export type Seo = {
	__typename?: 'Seo';
	/**
	 *
	 *
	 */
	description: Scalars['String'];
	/**
	 *
	 *
	 */
	keywords: Scalars['String'];
	/**
	 *
	 *
	 */
	url?: Maybe<Scalars['String']>;
};

export type State = {
	__typename?: 'State';
	/**
	 *
	 *
	 */
	creationDate?: Maybe<Scalars['DateTime']>;
	/**
	 *
	 *
	 */
	id: Scalars['ID'];
	/**
	 *
	 *
	 */
	isoAlpha2: Scalars['String'];
	/**
	 *
	 *
	 */
	title: Scalars['String'];
};

export type StateSorting = {
	title?: InputMaybe<Scalars['String']>;
};

export type StringFilterInput = {
	beginsWith?: InputMaybe<Scalars['String']>;
	contains?: InputMaybe<Scalars['String']>;
	equals?: InputMaybe<Scalars['String']>;
};

export type Subscriber = {
	__typename?: 'Subscriber';
	/**
	 *
	 *
	 */
	userName: Scalars['String'];
};

export type Translation = {
	__typename?: 'Translation';
	/**
	 *
	 *
	 */
	key: Scalars['String'];
	/**
	 *
	 *
	 */
	value: Scalars['String'];
};

export type User = {
	__typename?: 'User';
	/**
	 *
	 *
	 */
	email: Scalars['String'];
	/**
	 *
	 *
	 */
	id: Scalars['ID'];
};

export type VariantList = {
	__typename?: 'VariantList';
	/**
	 *
	 *
	 */
	active: Scalars['Boolean'];
	/**
	 *
	 *
	 */
	disabled: Scalars['Boolean'];
	/**
	 *
	 *
	 */
	name: Scalars['String'];
	/**
	 *
	 *
	 */
	value: Scalars['String'];
};

export type VariantSelection = {
	__typename?: 'VariantSelection';
	/**
	 *
	 *
	 */
	selectedVariant?: Maybe<Scalars['String']>;
	/**
	 *
	 *
	 */
	variants: Array<Variants>;
};

export type Variants = {
	__typename?: 'Variants';
	/**
	 *
	 *
	 */
	activeSelection?: Maybe<VariantList>;
	/**
	 *
	 *
	 */
	label: Scalars['String'];
	/**
	 *
	 *
	 */
	list: Array<VariantList>;
};

export type Vendor = {
	__typename?: 'Vendor';
	/**
	 *
	 *
	 */
	active: Scalars['Boolean'];
	/**
	 *
	 *
	 */
	icon?: Maybe<Scalars['String']>;
	/**
	 *
	 *
	 */
	id: Scalars['ID'];
	/**
	 *
	 *
	 */
	products: Array<Product>;
	/**
	 *
	 *
	 */
	seo: Seo;
	/**
	 *
	 *
	 */
	shortdesc: Scalars['String'];
	/**
	 *
	 *
	 */
	timestamp?: Maybe<Scalars['DateTime']>;
	/**
	 *
	 *
	 */
	title: Scalars['String'];
};

export type VendorProductsArgs = {
	pagination?: InputMaybe<PaginationFilterInput>;
	sort?: InputMaybe<ProductSorting>;
};

export type VendorFilterList = {
	title?: InputMaybe<StringFilterInput>;
};

export type VendorSorting = {
	title?: InputMaybe<Scalars['String']>;
};

export type Voucher = {
	__typename?: 'Voucher';
	/**
	 *
	 *
	 */
	discount?: Maybe<Scalars['Float']>;
	/**
	 *
	 *
	 */
	id: Scalars['ID'];
	/**
	 *
	 *
	 */
	number: Scalars['String'];
	/**
	 *
	 *
	 */
	redeemedAt?: Maybe<Scalars['DateTime']>;
	/**
	 *
	 *
	 */
	reserved?: Maybe<Scalars['DateTime']>;
	/**
	 *
	 *
	 */
	series: VoucherSeries;
	/**
	 *
	 *
	 */
	voucher: Scalars['String'];
};

export type VoucherSeries = {
	__typename?: 'VoucherSeries';
	/**
	 *
	 *
	 */
	description: Scalars['String'];
	/**
	 *
	 *
	 */
	discount: Scalars['Float'];
	/**
	 *
	 *
	 */
	discountType: Scalars['String'];
	/**
	 *
	 *
	 */
	id: Scalars['ID'];
	/**
	 *
	 *
	 */
	title: Scalars['String'];
	/**
	 *
	 *
	 */
	validFrom?: Maybe<Scalars['DateTime']>;
	/**
	 *
	 *
	 */
	validTo?: Maybe<Scalars['DateTime']>;
};

export type WishedPrice = {
	__typename?: 'WishedPrice';
	/**
	 *
	 *
	 */
	creationDate?: Maybe<Scalars['DateTime']>;
	/**
	 *
	 *
	 */
	currency: Currency;
	/**
	 *
	 *
	 */
	email: Scalars['String'];
	/**
	 *
	 *
	 */
	id: Scalars['ID'];
	/**
	 *
	 *
	 */
	inquirer?: Maybe<Inquirer>;
	/**
	 * This field gives us information about the last sent notification email.
	 * When it is null it states that no notification email was sent.
	 */
	notificationDate?: Maybe<Scalars['DateTime']>;
	/**
	 *
	 *
	 */
	price: Price;
	/**
	 *
	 *
	 */
	product: Product;
};
