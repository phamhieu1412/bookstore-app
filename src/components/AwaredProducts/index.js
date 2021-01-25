import React from 'react';
import { View, FlatList, Text } from 'react-native';
import { connect } from 'react-redux';

import { checkPromotionGiftProducts } from '../../ultils/Product';
import Button from '../Button/Button';
import Checkbox from '../Checkbox/index';
import ProductSwiperItem from '../ProductSwiperItem';

class AwaredProducts extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      selectedProductCode: props.selectedCode || '',
      donotDisplayAgain: false,
    };
  }

  updateSelected = () => {
    const { updateCart, setDonotDisplayAgain } = this.props;
    const { selectedProductCode, donotDisplayAgain } = this.state;
    if (selectedProductCode) {
      updateCart({
        SelectedGiftProductCode: selectedProductCode,
        ShowGiftProducts: false,
      });
      if (donotDisplayAgain) {
        setDonotDisplayAgain();
      }
    }
  };

  onSelectProduct = selectedCode => {
    const { showAction, updateCart } = this.props;
    if (showAction) {
      this.setState({ selectedProductCode: selectedCode });
    } else {
      updateCart({
        SelectedGiftProductCode: selectedCode,
      });
    }
  };

  onToggleDonotDisplayAgain = () => {
    const donotDisplayAgain = !this.state.donotDisplayAgain;
    this.setState({ donotDisplayAgain });
    this.props.onToggleNotDisplayPromotionModalAgain();
  };

  render() {
    const { productCodes, viewedProducts, title, selectedCode, showAction } = this.props;
    const { selectedProductCode, donotDisplayAgain } = this.state;
    if (!productCodes.length) {
      return <View />;
    }
    const products = [];
    productCodes.forEach(code => {
      if (viewedProducts[code]) {
        products.push(viewedProducts[code]);
      }
    });
    if (!products.length) {
      return <View />;
    }
    const selectedGiftProductCode = showAction ? selectedProductCode : selectedCode;
    return (
      <View style={styles.flatlist}>
        {title && <Text style={styles.title}>{title}</Text>}
        <FlatList
          keyExtractor={(item, index) => `awarded_${index}`}
          overScrollMode="never"
          showsHorizontalScrollIndicator={false}
          horizontal
          data={products}
          renderItem={({ item }) => (
            <ProductSwiperItem
              showSelect
              selected={selectedGiftProductCode === item.code}
              product={item}
              onViewProduct={() => this.onSelectProduct(item.code)}
              disableMeta
            />
          )}
        />
        {showAction && (
          <View style={styles.actions}>
            <View style={styles.checkboxWrapper}>
              <Checkbox
                status={donotDisplayAgain}
                onPress={this.onToggleDonotDisplayAgain}></Checkbox>
              <Text style={styles.descText}>Không hiển thị lại</Text>
            </View>
            <Button
              style={styles.button}
              disabled={!selectedProductCode}
              textStyle={styles.buttonText}
              onPress={this.updateSelected}
              text={'Chọn'}
            />
          </View>
        )}
      </View>
    );
  }
}


const mapStateToProps = ({  }) => ({
});

const mergeProps = (stateProps, dispatchProps, ownProps) => {
  const { dispatch } = dispatchProps;

  return {
    ...ownProps,
    ...stateProps,
  };
};

export default connect(
  mapStateToProps,
  undefined,
  mergeProps
)(AwaredProducts);
