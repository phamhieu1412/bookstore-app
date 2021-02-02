import React from 'react';
import PropTypes from 'prop-types';
import { Image } from 'react-native';

const ImageCache = ({ style, defaultSource, source }) => {
  return <Image style={style} defaultSource={defaultSource} source={source} />;
};

ImageCache.propTypes = {
  style: PropTypes.any,
  source: PropTypes.any,
};

export default ImageCache;
