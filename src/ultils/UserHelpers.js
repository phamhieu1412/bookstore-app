import moment from 'moment';
import Languages from '../common/Languages';
import Images from '../common/Images';

export const getName = user => {
  if (user != null) {
    if (typeof user.name !== 'undefined' && user.name != null) {
      return user.name;
    }
  }

  return Languages.Guest;
};

export const getAvatar = user => {
  if (user) {
    if (user.avatar) {
      return {
        uri: user.avatar,
      };
    }
    return Images.defaultAvatar;
  }

  return Images.defaultAvatar;
};

export const shouldDisabledReferralCode = (user, orders) => {
  const checkingReferralTime = moment().subtract(7, 'days');
  const userCreatedAt = user && user.createdAt ? moment(user.createdAt) : false;
  if (!userCreatedAt || userCreatedAt.isBefore(checkingReferralTime)) {
    return true;
  }

  if (orders && orders.length) {
    const completedOrder = orders.find(order => {
      return order.state === 'completed';
    });

    return !!completedOrder;
  }

  return false;
};
