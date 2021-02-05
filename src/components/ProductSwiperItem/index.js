import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';
import { Text, TouchableOpacity, Image, View } from 'react-native';

import { Icon } from '../../Omni';
import { getProductImageSource, getPricePerMeasurementUnit } from '../../ultils/Product';
import styles from './styles';
import WishListIcon from '../WishListIcon/index';
import ProductMeta from '../ProductMeta/index';
import ProductNewTag from '../ProductNewTag/index';
import ProductPrice from '../ProductPrice';
import Styles from '../../common/Styles';
import Color from '../../common/Color';

class ProductSwiperItem extends PureComponent {
  static propTypes = {
    product: PropTypes.object,
    onViewProduct: PropTypes.func,
  };

  render() {
    const { product, onViewProduct, showSelect, selected, disableMeta } = this.props;

    const imageSource = getProductImageSource(product.images && product.images.length > 0 && product.images[0]); // @TODO: change back to mobiImage
    const onSale = product && product.price;

    return (
      <TouchableOpacity
        activeOpacity={0.9}
        style={[Styles.Common.itemColumn, { width: 140 }]}
        onPress={onViewProduct}>
        <View style={[Styles.Common.itemColumnImageWrapper, { marginBottom: 0 }]}>
          <Image
            source={imageSource}
            style={[
              Styles.Common.itemColumnImage,
              styles.twoAndHalfCol,
              onSale && !showSelect
                ? {
                  borderWidth: 1,
                  borderColor: Color.product.Discount,
                  borderRadius: 7,
                }
                : {},
            ]}
          />
          {showSelect && (
            <Icon
              name={selected ? 'checkbox-marked-circle' : 'checkbox-blank-circle-outline'}
              style={styles.checkedIcon}
            />
          )}
          {!disableMeta ? (
            <>
              {/* <WishListIcon product={product} style={{ left: 10 }} /> */}
              <ProductNewTag
                product={product}
                style={{ width: 21, height: 21 }}
                textStyle={{ fontSize: 8 }}
              />
              {onSale ? (
                <ProductMeta
                  product={product}
                  style={{ minWidth: 21, padding: 2 }}
                  textStyle={{ fontSize: 9 }}
                />
              ) : null}
            </>
          ) : null}
        </View>
        <View style={Styles.Common.itemBriefInfo}>
          <Text style={[styles.itemInfo]}>{getPricePerMeasurementUnit(product)}</Text>
          <Text style={[styles.itemTitle]}>{product.title}</Text>
          {/* {product.price && product.price.unit ? (
            <Text style={[styles.itemInfo]}>{product.price.unit}</Text>
          ) : null} */}
          <ProductPrice product={product} />
        </View>
      </TouchableOpacity>
    );
  }
}

export default ProductSwiperItem;
