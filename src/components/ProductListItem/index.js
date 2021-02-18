import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';
import { Text, TouchableOpacity, View, Image } from 'react-native';

import { getProductImageSource, getPricePerMeasurementUnit, checkGiftProduct } from '../../ultils/Product';
import css from './styles';
import WishListIcon from '../WishListIcon';
import ProductPrice from '../ProductPrice';
import ProductTitle from '../ProductTitle';
import ProductMeta from '../ProductMeta';
import ProductGiftTag from '../ProductGiftTag';
import ProductFreshTag from '../ProductFreshTag';
import ProductNewTag from '../ProductNewTag';
import Styles from '../../common/Styles';
import Color from '../../common/Color';

class ProductListItem extends PureComponent {
  static propTypes = {
    product: PropTypes.object,
    onViewProduct: PropTypes.func,
  };

  render() {
    const { product, onViewProduct, itemWidth } = this.props;

    const imageSource = getProductImageSource(product.images && product.images.length && product.images[0]); // @TODO: change back to mobiImage
    const isGiftProduct = checkGiftProduct(product);
    const onSale = product && product.price && product.price.discountText;

    return (
      <TouchableOpacity
        activeOpacity={0.9}
        style={[Styles.Common.itemColumn, itemWidth && { width: itemWidth }]}
        onPress={onViewProduct}>
        <View style={[Styles.Common.itemColumnImageWrapper]}>
          <Image
            source={imageSource}
            style={[
              Styles.Common.itemColumnImage,
              onSale && {
                borderWidth: 1,
                borderColor: Color.product.Discount,
                borderRadius: 7,
              },
            ]}
          />
          <ProductFreshTag product={product} />
          <ProductNewTag product={product} />
          {isGiftProduct ? <ProductGiftTag /> : onSale ? <ProductMeta product={product} /> : null}
        </View>
        <View style={Styles.Common.itemBriefInfo}>
          <Text style={[css.itemInfo]}>{product.category && product.category.name}</Text>
          <ProductTitle product={product} numberOfLines={2} style={css.itemTitle} />
          {/* {product.quantity ? (
            <Text style={[css.itemInfo]}>{product.quantity}</Text>
          ) : null} */}
          <ProductPrice product={product} />
          {/* <WishListIcon product={product} /> */}
        </View>
      </TouchableOpacity>
    );
  }
}

export default ProductListItem;
