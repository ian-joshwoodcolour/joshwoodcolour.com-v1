type CartItem = {
    discounts: Array<string>,
    discounted_price: number,
    gift_card: boolean,
    grams: number,
    handle: string,
    image: string,
    key: string,
    line_price: number,
    original_price: number,
    original_line_price: number,
    price: number,
    product_description: string,
    product_id: number,
    product_title: string,
    product_type: string,
    properties: string,
    quantity: number,
    requires_shipping: boolean,
    sku: string,
    title: string,
    total_discount: number,
    url: string,
    variant_id: number,
    variant_options: Array<string>,
    variant_title: string,
    vendor: string
};

type Cart = {
    attributes: Object,
    items: Array<CartItem>,
    item_count: number,
    note: null,
    original_total_price: number,
    requires_shipping: number,
    token: string,
    total_discount: number,
    total_price: number,
    total_weight: number
};
