import IntlPolyfill from 'intl';
import './libs/vi-VN';
import Constants from '../common/Constants';
import Images from '../common/Images';

export const convertCartItemToProduct = cartItemProduct => {
  const product = {
    name: cartItemProduct.productName,
    code: cartItemProduct.productCode,
    slug: cartItemProduct.productSlug,
    supplier: {
      name: cartItemProduct.supplierName,
      slug: cartItemProduct.supplierSlug,
    },
    mobiImage: cartItemProduct.mobiImage,
    webImage: cartItemProduct.webImage,
    price: {
      listedPrice: cartItemProduct.price,
      price: cartItemProduct.sellingPrice,
      unit: cartItemProduct.productUnit,
    },
    type: cartItemProduct.productType || cartItemProduct.type,
  };

  return product;
};

export const checkGiftProduct = product => {
  return (
    product &&
    product.tags &&
    product.tags.length &&
    product.tags.find(item => item.name === 'Gift')
  );
};

export const checkPromotionGiftProducts = cart => {
  return (
    cart &&
    cart.promotion &&
    cart.promotion.promotionId &&
    cart.promotion.value &&
    cart.promotion.value.giftProducts &&
    cart.promotion.value.giftProducts.length
  );
};

export const getProductImage = uri => {
  if (typeof uri !== 'string' || !uri) {
    // return Images.defaultProduct.uri;
  }

  return uri;
};

export const getProductImageSource = uri => {
  if (typeof uri !== 'string' || !uri) {
    // return Images.defaultProduct;
  }

  return { uri };
};

export const getProductPrice = product => {
  let priceObj;
  const productPrice = product.price;

  if (!product || !productPrice) {
    priceObj = { newPrice: -1 };
  } else if (productPrice) {
    priceObj = {
      newPrice: productPrice,
      oldPrice: productPrice.listedPrice ? Math.floor(productPrice.listedPrice / 100) * 100 : 0,
    };
  } else {
    return { newPrice: 0 };
  }

  priceObj.onSale = priceObj.newPrice && priceObj.oldPrice && priceObj.oldPrice > priceObj.newPrice;
  return priceObj;
};

export const getProductCartPrice = product => {
  if (product.price.price) {
    return getProductPrice(product);
  }
  return getProductPrice({
    price: {
      price: product.sellingPrice,
      listedPrice: product.price,
    },
  });
};

export const currencyFormatter = price => {
  if (typeof price === 'string') {
    return price;
  } else if (!price && price !== 0) {
    return '';
  }

  return new IntlPolyfill.NumberFormat(
    'vi-VN',
    {
      // maximumSignificantDigits: 3,
      minimumFractionDigits: 0,
      maximumFractionDigits: 0,
    }
    // noSymbol
    //   ? {
    //       style: 'currency',
    //       currency: 'VND',
    //     }
    //   : { maximumSignificantDigits: 3 }
  ).format(price);
};

export const getPricePerMeasurementUnit = product => {
  let pricePerMeasurementUnit = '';
  const productPrice = product.price;
  if (productPrice && productPrice.standardUnitPrice && productPrice.standardUnitName) {
    pricePerMeasurementUnit = productPrice.standardUnitPrice;
    return `${currencyFormatter(pricePerMeasurementUnit)}${Constants.VND}/${
      productPrice.standardUnitName
    }`;
  }

  return '';
};

export const flattenCategories = list => {
  // max Level = 3
  const flattenList = [];
  list.forEach(cat => {
    const temp1 = Object.assign({}, cat, { level: 1, parent: '' });
    delete temp1.children;
    flattenList.push(temp1);
    if (cat.children && cat.children.length) {
      cat.children.forEach(sub1Cat => {
        const temp2 = Object.assign({}, sub1Cat, { level: 2, parent: cat.slug });
        delete temp2.children;
        flattenList.push(temp2);
        if (sub1Cat.children && sub1Cat.children.length) {
          sub1Cat.children.forEach(sub2Cat => {
            const temp3 = Object.assign({}, sub2Cat, { level: 3, parent: sub1Cat.slug });
            delete temp3.children;
            flattenList.push(temp3);
          });
        }
      });
    }
  });

  return flattenList;
};
