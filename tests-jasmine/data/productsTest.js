import { Product, Clothing, Appliance } from "../../data/products.js";

describe('test suite: Product class', () => {
    let productDetails;
    let product;

    beforeEach(() => {
        productDetails = {
            id: "e43638ce-6aa0-4b85-b27f-e1d07eb678c6",
            image: "images/products/athletic-cotton-socks-6-pairs.jpg",
            name: "Black and Gray Athletic Cotton Socks - 6 Pairs",
            rating: {
                stars: 4.5,
                count: 87
            },
            priceCents: 1090
        };

        product = new Product(productDetails);
    });

    it('has correct properties', () => {
        expect(product.id).toEqual(productDetails.id);
        expect(product.image).toEqual(productDetails.image);
        expect(product.name).toEqual(productDetails.name);
        expect(product.rating).toEqual(productDetails.rating);
        expect(product.priceCents).toEqual(productDetails.priceCents);
    });

    it('gets star rating url', () => {
        expect(product.getStarsUrl()).toEqual('images/ratings/rating-45.png');
    });

    it('gets formatted price string', () => {
        expect(product.getPrice()).toEqual('£10.90');
    });

    it('does not display extra info html', () => {
        expect(product.extraInfoHTML()).toEqual('');
    })

});

describe('test suite: Clothing class', () => {
    let productDetails;
    let clothing;

    beforeEach(() => {
        productDetails = {
            id: "83d4ca15-0f35-48f5-b7a3-1ea210004f2e",
            image: "images/products/adults-plain-cotton-tshirt-2-pack-teal.jpg",
            name: "Adults Plain Cotton T-Shirt - 2 Pack",
            rating: {
                stars: 4.5,
                count: 56
            },
            priceCents: 799,
            type: "clothing",
            sizeChartLink: "images/clothing-size-chart.png"
        }
        clothing = new Clothing(productDetails);
    });

    it('has correct properties', () => {
        expect(clothing.id).toEqual(productDetails.id);
        expect(clothing.image).toEqual(productDetails.image);
        expect(clothing.sizeChartLink).toEqual(productDetails.sizeChartLink);
    });

    it('gets star rating url', () => {
        expect(clothing.getStarsUrl()).toEqual('images/ratings/rating-45.png');
    });

    it('gets formatted price string', () => {
        expect(clothing.getPrice()).toEqual('£7.99');
    });

    it('display extra info html', () => {
        expect(clothing.extraInfoHTML())
            .toContain('<a href="images/clothing-size-chart.png" target=_blank>');
    })

});

describe('test suite: Appliance class', () => {
    let productDetails;
    let appliance;

    beforeEach(() => {
        productDetails = {
            id: "54e0eccd-8f36-462b-b68a-8182611d9add",
            image: "images/products/black-2-slot-toaster.jpg",
            name: "2 Slot Toaster - Black",
            rating: {
                stars: 5,
                count: 2197
            },
            priceCents: 1899,
            type: "appliance",
            instructionsLink: "images/appliance-instructions.png",
            warrantyLink: "images/appliance-warranty.png"
        }
        appliance = new Appliance(productDetails);
    });

    it('has correct properties', () => {
        expect(appliance.id).toEqual(productDetails.id);
        expect(appliance.image).toEqual(productDetails.image);
        expect(appliance.instructionsLink).toEqual(productDetails.instructionsLink);
        expect(appliance.warrantyLink).toEqual(productDetails.warrantyLink);
    });

    it('gets star rating url', () => {
        expect(appliance.getStarsUrl()).toEqual('images/ratings/rating-50.png');
    });

    it('gets formatted price string', () => {
        expect(appliance.getPrice()).toEqual('£18.99');
    });

    it('display extra info html', () => {
        expect(appliance.extraInfoHTML())
            .toContain('<a href="images/appliance-instructions.png" target=_blank>');
        expect(appliance.extraInfoHTML())
            .toContain('<a href="images/appliance-warranty.png" target=_blank>');
    })

});   