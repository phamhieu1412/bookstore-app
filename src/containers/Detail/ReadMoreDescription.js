import React from 'react';
import { Text, View } from 'react-native';
import PropTypes from 'prop-types';

import { UboIcon } from '../../Omni';
import Color from '../../common/Color';
import Languages from '../../common/Languages';

class ViewMoreText extends React.Component {
  trimmedTextHeight = null;
  fullTextHeight = null;
  shouldShowMore = false;

  state = {
    isFulltextShown: false,
  };

  hideFullText = () => {
    this.setState({
      isFulltextShown: false,
    });
    // }
  };

  showFullText = () => {
    this.setState({
      isFulltextShown: true,
    });
  };

  renderViewMore = () => (
    <View style={{ flex: 1, alignItems: 'center', marginTop: -10, paddingTop: 0 }}>
      <Text
        style={[this.props.textStyle, { textAlign: 'center', width: 120 }]}
        onPress={this.showFullText}>
        {`${Languages.seeLess}  `}
        <UboIcon name="chevron-up" color={Color.primary} style={{ marginLeft: 5 }} size={12} />
      </Text>
    </View>
  );

  renderViewLess = () => (
    <View style={{ flex: 1, alignItems: 'center' }}>
      <Text
        style={[this.props.textStyle, { textAlign: 'center', width: 120 }]}
        onPress={this.hideFullText}>
        {`${Languages.seeMore}  `}
        <UboIcon name="chevron-down" color={Color.primary} style={{ marginLeft: 5 }} size={12} />
      </Text>
    </View>
  );

  renderFooter = () => {
    const { isFulltextShown } = this.state;

    if (!isFulltextShown) {
      return (this.props.renderViewMore || this.renderViewMore)();
    }

    return (this.props.renderViewLess || this.renderViewLess)();
    // return null;
  };

  renderFullText = () => {
    return <View>{this.props.children}</View>;
  };

  render() {
    const { textStyle, shortText, children } = this.props;
    return (
      <View>
        {this.state.isFulltextShown ? (
          this.renderFullText()
        ) : (
          <View>
            <Text style={textStyle}>{shortText || ''}</Text>
          </View>
        )}
        {children ? this.renderFooter() : null}
      </View>
    );
  }
}

ViewMoreText.propTypes = {
  renderViewMore: PropTypes.func,
  numberOfLines: PropTypes.number,
  textStyle: PropTypes.oneOfType([PropTypes.object, PropTypes.array]),
};

ViewMoreText.defaultProps = {
  renderViewMore: null,
  textStyle: {},
};

export default ViewMoreText;
