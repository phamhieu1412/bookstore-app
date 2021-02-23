// import Reactotron from 'reactotron-react-native';
// import { log } from '@app/Omni';
import { toCamelCase, toPascalCase } from '../ultils/CaseConverter';
import AppConfig from '../common/AppConfig.json';
import Constants from '../common/Constants';

const UBOFOOD_DOMAIN = 'https://ubofood.com';
class APIWorker {
  constructor() {
    this.baseUrl = AppConfig.api.url || UBOFOOD_DOMAIN;
  }
  init = ({ baseUrl, token }) => {
    this.baseUrl = baseUrl || this.baseUrl;
    this.authzToken = token != null ? `Bearer ${token}` : '';
  };

  setToken(token) {
    if (token) this.authzToken = `Bearer ${token}`;
  }

  setBaseUrl(url) {
    if (url) this.baseUrl = url;
  }

  clearToken() {
    this.authzToken = '';
  }

  // API
  //Api user && login && register 
  loginBookstore = async (payload) => {
    const res = await this.post('/api/v1/auth/login', {
      params: payload,
    });

    return res.error ? res : res.data;
  };
  getUserProfile = async () => {
    if (this.authzToken) {
      const res = await this.get('/api/v1/user/profile');

      return res;
    }

    return undefined;
  };
  setUserProfile = async (userId, payload) => {
    if (this.authzToken) {
      const res = await this.put(`/api/v1/user/${userId}`, { params: payload });

      return res;
    }

    return undefined;
  };
  updateAddressUser = async (userId, payload) => {
    if (this.authzToken) {
      const res = await fetch(`https://bookstore-api-v1.herokuapp.com/api/v1/user/${userId}`, {
        method: 'PUT',
        body: JSON.stringify(payload),
        headers: {
          Authorization: this.authzToken,
          Accept: 'application/json',
          'Content-Type': 'application/json',
        }
      }).then(res => {
        if (res.status >= 200 && res.status <= 299) {
          return res.json();
        } else if (res.status >= 300) {
          res.error = {
            status: res.status,
            code: res.code,
            detail: res.detail,
          };
          res.data = {};

          return res;
        }

        return false;
      })
      .then(res => {
        if (!res) {
          return { data: {} };
        } else if (res.error) {
          return res;
        }

        return {
          ...res,
          data: toCamelCase(res),
        };
      })
      .catch(() => {
        const res = {
          error: {
            status: 0,
            code: 'UNKNOWN',
            detail: 'Probably lost connection',
          },
          data: {},
        };

        return res;
      })

      return res;
    }
    return undefined;
  };
  registerBookstore = async (payload) => {
    const res = await this.post('/api/v1/user/register', {
      payload,
      // params: payload,
    });

    return res;
  };
  updateDefaultShippingAddress = async address => {
    // if (this.authzToken) {
    //   const res = await this.put('/supplier/v1/client/customers/me/shipping/address', {
    //     params: {
    //       DefaultShippingAddress: address,
    //     },
    //   });

    //   return res.data.data;
    // }

    return undefined;
  };
  getAddressShip = () => {
    return this.get('/api/v1/addresses');
  };
  addAddressShip = payload => {
    return this.post('/api/v1/addresses/', {
      params: payload,
    }).then(res => res.data);
  };
  updateAddressShip = (addressId, payload) => {
    // return this.put(`/supplier/v1/address/${addressId}`, {
    //   params: payload,
    // }).then(res => res.data);
  };
  setDefaultAddress = (addressId) => {
    return this.post(`/api/v1/addresses/${addressId}/set_default`).then(res => res.data);
  }
  getProvinces = () => {
    return this.get('/api/v1/address/').then(res => res);
  };
  getDistricts = (provinceId) => {
    return this.get(`/api/v1/address/province/${provinceId}`).then(res => res);
  };
  getWards = (districtId) => {
    return this.get(`/api/v1/address/district/${districtId}`).then(res => res);
  };

  // API category
  getCategoriesBookstore = async () => {
    const res = await this.get('/api/v1/category');

    return res;
  };
  searchCategoriesById = async (categoryId) => {
    const res = await this.get(`/api/v1/category/${categoryId}`);

    return res;
  };

  // Api product
  getBookDetail = async productId => {
    const res = await this.get(`/api/v1/products/${productId}`);

    return res;
  };
  getAllBooks = async (page) => {
    const res = await this.get('/api/v1/products', {params: { page }});

    return res;
  };
  getBooksByCategory = async (payload) => {
    const res = await this.get('/api/v1/products', {params: { payload }});

    return res;
  };
  searchBooks = async (keyword) => {
    const res = await this.get('/api/v1/products', {
      params: keyword
    });

    return res;
  };
  searchBooksByPrice = async (keyword) => {
    const res = await this.get('/api/v1/products', {
      params: keyword
    });

    return res;
  };
  getBooksBestSeller = async (page) => {
    const res = await this.get('/api/v1/products/best-seller', {params: { page }});

    return res;
  };

  getPublisherById = async (id) => {
    const res = await this.get(`/api/v1/publishers/${id}`);

    return res;
  };

  getAuthorById = async (id) => {
    const res = await this.get(`/api/v1/authors/${id}`);

    return res;
  };

  // API cart
  getCart = async () => {
    if (this.authzToken) {
      const res = await this.get('/api/v1/cart/get');
      return res;
    }

    return false;
  };
  deleteBookInCart = async (id) => {
    const res = await this.delete(`/api/v1/cart/${id}`);

    return res;
  };
  updateQuantity = async (id, payload) => {
    const res = await this.put(`/api/v1/cart/${id}`, {
      params: payload,
    });

    return res;
  };
  addToCart = async (payload) => {
    const res = await this.post('/api/v1/cart/add_to_cart', {
      // payload,
      params: payload
    });

    return res;
  };

  getMyOrders = async () => {
    if (this.authzToken) {
      const res = await this.get('/api/v1/orders');

      return res;
    }

    return undefined;
  };
  getOrderDetail = async orderNumber => {
    if (this.authzToken) {
      const res = await this.get(`/api/v1/orders/${orderNumber}`);

      return res;
    }

    return undefined;
  };
  createNewOrder = async (payload) => {
    if (this.authzToken) {
      const res = await fetch('https://bookstore-api-v1.herokuapp.com/api/v1/orders', {
          method: 'POST',
          body: JSON.stringify(payload),
          headers: {
            Authorization: this.authzToken,
            Accept: 'application/json',
            'Content-Type': 'application/json',
          }
        }).then(res => {
          if (res.status >= 200 && res.status <= 299) {
            return res.json();
          } else if (res.status >= 300) {
            res.error = {
              status: res.status,
              code: res.code,
              detail: res.detail,
            };
            res.data = {};

            return res;
          }

          return false;
        })
        .then(res => {
          if (!res) {
            return { data: {} };
          } else if (res.error) {
            return res;
          }

          return {
            ...res,
            data: toCamelCase(res),
          };
        })
        .catch(() => {
          const res = {
            error: {
              status: 0,
              code: 'UNKNOWN',
              detail: 'Probably lost connection',
            },
            data: {},
          };

          return res;
        })

      return res;
    }
    return undefined;
  }

  getCouponDetail = async id => {
    if (this.authzToken) {
      const res = await this.get(`/api/v1/coupons/get/${id}`);

      return res;
    }

    return undefined;
  };

  changePassword  = async (id, payload) => {
    if (this.authzToken) {
      const res = await fetch(`https://bookstore-api-v1.herokuapp.com/api/v1/user/${id}`, {
          method: 'PATCH',
          body: JSON.stringify(payload),
          headers: {
            Authorization: this.authzToken,
            Accept: 'application/json',
            'Content-Type': 'application/json',
          }
        }).then(res => {
          if (res.status >= 200 && res.status <= 299) {
            return res.json();
          } else if (res.status >= 300) {
            res.error = {
              status: res.status,
              code: res.code,
              detail: res.detail,
            };
            res.data = {};

            return res;
          }

          return false;
        })
        .then(res => {
          if (!res) {
            return { data: {} };
          } else if (res.error) {
            return res;
          }

          return {
            ...res,
            data: toCamelCase(res),
          };
        })
        .catch(() => {
          const res = {
            error: {
              status: 0,
              code: 'UNKNOWN',
              detail: 'Probably lost connection',
            },
            data: {},
          };

          return res;
        })

      return res;
    }
    return undefined;
  };

  //////////////////////////////////////////
  getHomeBanner = async posCode => {
    const res = await this.get(`/supplier/v1/banners${posCode ? `?PosCode=${posCode}` : ''}`);

    return res.error ? res : res.data.banners;
  };

  getAllProducts = async (page = 1, pageSize = Constants.pagingLimit) => {
    const res = await this.get('/product/v1/products/home', {
      params: {
        // certificate,
        pageSize,
        page,
      },
    });

    return res.error ? res : res.data.data;
  };

  getPOSBasedPromotion = async (location = null) => {
    if (location && location.latitude && location.longitude) {
      const params = { Lat: location.latitude, Lng: location.longitude };
      // const res = await this.get('/supplier/v1/client/poses/promotion_products', { params });
      const res = await this._request('GET', '/supplier/v1/client/poses/promotion_products', {
        headers: {
          'Cache-Control': 'no-cache, no-store, must-revalidate',
        },
        params,
      })
        .then(res => {
          const productSlugs = res.data.productSlugs;
          if (productSlugs) {
            if (productSlugs.length) {
              return this._request(
                'GET',
                `/product/v1/products/slugs?slugs=${productSlugs.join('&slugs=')}`
              );
            } else {
              return { data: { data: [] } };
            }
          }

          return undefined;
        })
        .catch(() => Promise.resolve()); // eslint-disable-line handle-callback-err

      return res && res.data ? res.data.data : undefined;
    }

    return undefined;
  };

  getPredefinedCollection = async (collection = '', page = 1, pageSize = Constants.pagingLimit) => {
    // ['new', 'most-purchased', 'hot-deal']
    const params = { page, pageSize };
    const coll = collection ? collection : 'hot-deal'; // default hot deal
    params[coll] = true;
    // if (pageSize) params.pageSize = pageSize;

    const res = await this.get('/product/v1/products', { params });
    return res.data.data;
  };

  getProductsBySlugs = async productSlugs => {
    const res = await this.get(`/product/v1/products/slugs?slugs=${productSlugs.join('&slugs=')}`);
    return res.data.data;
  };

  getHorizontalCategories = async () => {
    const res = await this.get('/homepage/v1/horizontal-categories');
    return res.data.categories;
  };

  // Top categories
  getTopCategories = async () => {
    const res = await this.get('/product/v1/categories/top');
    return res.data.data;
  };

  getCategories = async ({ level, parent, from, product, selected } = {}) => {
    const res = await this.get('/product/v1/categories', {
      params: {
        level,
        parent,
        from,
        product,
        selected,
      },
    });
    return res.error ? res : res.data.data;
  };

  productsByCategorySlug = async (categorySlug, page, pageSize, filter) => {
    const params = Object.assign(
      {
        categorySlug,
        pageSize,
        page,
      },
      filter
    );
    return this.searchProducts(params);
  };

  productsByCategoryCode = async (categoryCode, page, pageSize, filter) => {
    const params = Object.assign(
      {
        categoryCode,
        pageSize,
        page,
      },
      filter
    );
    return this.searchProducts(params);
  };

  productsBySupplierCode = async (supplierCode, page, pageSize, filter) => {
    const params = Object.assign(
      {
        supplierCode,
        pageSize,
        page,
      },
      filter
    );
    return this.searchProducts(params);
    // const res = await this.get(`/product/v1/search`, {
    //   params,
    // });
    // return res.data.products;
  };

  productsByTags = async tags => {
    const res = await this.get(`/product/v1/products/products-by-tags?tags=${tags.join('&tags=')}`);
    return res.error ? res : res.data.products;
  };

  getSuggestions = async q => {
    const res = await this.get('/product/v1/products/suggestions', { params: { q } });
    return res.data.data;
  };

  getProductDetail = async productSlug => {
    const res = await this.get(`/product/v1/products/${productSlug}`);

    return res.error ? res : res.data.data;
  };

  // replace productsByName
  searchProducts = async ({
    // certificate,
    pageSize = Constants.pagingLimit,
    page = 1,
    price = {},
    categorySlug,
    categoryCode,
    promotions,
    q,
    // region,
    sort = 1,
    supplierSlug,
    supplierCode,
    tag = 1,
  } = {}) => {
    const res = await this.get('/product/v1/products/search', {
      params: {
        // certificate,
        pageSize,
        page,
        'price-from': price.from,
        'price-to': price.to,
        categorySlug,
        categoryCode,
        promotions,
        q,
        // region,
        sort,
        supplierSlug,
        supplierCode,
        tag,
      },
    });

    return res.error ? res : res.data.products;
  };

  login = async (code, DeviceToken) => {
    const res = await this.post('/supplier/v1/client/customers/login', {
      params: { AccessToken: code, DeviceToken },
    });

    return res.error ? res : res.data.data;
  };

  requestOTP = async phoneNumber => {
    const res = await this.post('/supplier/v1/client/customers/otp', {
      params: { PhoneNumber: phoneNumber },
    });

    return res.error ? res : res.data;
  };

  loginOTP = async (phoneNumber, otp) => {
    const res = await this.post('/supplier/v1/client/customers/loginwithotp', {
      params: { PhoneNumber: phoneNumber, OtpCode: otp },
    });

    return res.error ? res : res.data.data;
  };

  // getUserProfile = async () => {
  //   if (this.authzToken) {
  //     const res = await this.get('/supplier/v1/client/customers/me');

  //     return res.error ? res : res.data.data;
  //   }

  //   return undefined;
  // };

  // setUserProfile = async profile => {
  //   if (this.authzToken) {
  //     const res = await this.put('/supplier/v1/client/customers/me', { params: profile });

  //     return res.data.data;
  //   }

  //   return undefined;
  // };

  updateDefaultShippingAddress = async address => {
    if (this.authzToken) {
      const res = await this.put('/supplier/v1/client/customers/me/shipping/address', {
        params: {
          DefaultShippingAddress: address,
        },
      });

      return res.data.data;
    }

    return undefined;
  };

  getUserPopups = async PosCode => {
    if (this.authzToken && PosCode) {
      const res = await this.get('/supplier/v1/popups', {
        params: { PosCode },
      });

      return res.error ? res : res.data;
    }

    return undefined;
  };

  getWishList = async () => {
    if (this.authzToken) {
      const res = await this._request('GET', '/supplier/v1/client/customers/me/favorite', {
        headers: {
          'Cache-Control': 'no-cache, no-store, must-revalidate',
        },
      })
        .then(res => {
          const productSlugs = res.data.data;
          if (productSlugs) {
            if (productSlugs.length) {
              return this._request(
                'GET',
                `/product/v1/products/slugs?slugs=${productSlugs.join('&slugs=')}`
              );
            } else {
              return { data: { data: [] } };
            }
          }

          return undefined;
        })
        .catch(() => Promise.resolve()); // eslint-disable-line handle-callback-err

      return res && res.data ? res.data.data : undefined;
    }

    return undefined;
  };

  addWishListItem = async productSlug => {
    if (this.authzToken) {
      const res = await this.post(`/supplier/v1/client/customers/me/favorite`, {
        params: { Slug: productSlug },
      });

      return res;
    }

    return undefined;
  };

  removeWishListItem = async productSlug => {
    if (this.authzToken) {
      const res = await this.delete(`/supplier/v1/client/customers/me/favorite/${productSlug}`);

      return res;
    }

    return undefined;
  };

  getPOS = async location => {
    const params = this._addLocationToParams(
      {
        Page: 1,
        PageSize: 100,
      },
      location
    );
    const res = await this.get('/supplier/v1/client/poses/', { params });

    return res.data.data;
  };

  // getCart = async (cartToken, location) => {
  //   if (this.authzToken) {
  //     let params = cartToken ? { token: cartToken } : {};
  //     params = this._addLocationToParams(params, location);
  //     const res = await this.get('/supplier/v1/orders/cart', {
  //       params,
  //     });
  //     return res.error ? res : res.data;
  //   }

  //   return false;
  // };

  createCartFromItems = async (items, cartToken, location) => {
    if (this.authzToken && items && items.length) {
      let params = { Items: toPascalCase(items) };
      if (cartToken) {
        params.Token = cartToken;
      }
      params = this._addLocationToParams(params, location);
      const res = await this.post('/supplier/v1/orders/cart', {
        params,
      });
      return res.error ? res : res.data;
    }

    return false;
  };

  updateCartItem = async (cartToken, item, location) => {
    if (this.authzToken) {
      let params = {
        ProductCode: item.productCode,
        Token: cartToken,
        Quantity: item.quantity,
      };
      params = this._addLocationToParams(params, location);
      const res = await this.put('/supplier/v1/orders/cart/items', { params });

      return res.error ? res : res.data;
    }

    return undefined;
  };

  // updateCartItemPromise = (cartToken, item) => {
  //   if (this.authzToken) {
  //     const params = {
  //       ProductCode: item.productCode,
  //       Token: cartToken,
  //       Quantity: item.quantity,
  //     };

  //     return this._request('PUT', '/supplier/v1/orders/cart/items', { params }).then(
  //       res => res.data
  //     );
  //   }

  //   return Promise.reject(); // eslint-disable-line
  // };

  removeCartItem = async (cartToken, item, location) => {
    if (this.authzToken) {
      let params = {
        ProductCode: item.productCode,
        Token: cartToken,
      };
      params = this._addLocationToParams(params, location);
      const res = await this.delete('/supplier/v1/orders/cart/items', { params });

      return res.data;
    }

    return undefined;
  };

  updateCart = async (params, location) => {
    if (this.authzToken) {
      // let params = toPascalCase(payload);
      params = this._addLocationToParams(params, location);
      const res = await this.put('/supplier/v1/orders/cart', { params });

      return res.data;
    }

    return undefined;
  };

  updateCartNote = async (payload, location) => {
    if (this.authzToken) {
      let params = payload;
      params = this._addLocationToParams(params, location);
      const res = await this.post('/supplier/v1/orders/cart/note', { params });
      return res.data;
    }

    return undefined;
  };

  checkout = async (payload, location) => {
    if (this.authzToken) {
      let params = toPascalCase(payload);
      params = this._addLocationToParams(params, location);
      const res = await this.post('/supplier/v1/orders/checkout', { params });
      return res.data;
    }

    return undefined;
  };

  getWallet = async () => {
    if (this.authzToken) {
      const res = await this.get('/supplier/v1/client/customers/me/wallet');

      return res.data.data;
    }

    return undefined;
  };

  getPromotionCodes = async cartToken => {
    if (this.authzToken) {
      const res = await this.get(`/supplier/v1/client/promotions/?CartToken=${cartToken}`);

      return res.data.data;
    }

    return undefined;
  };

  getTimeFrame = async () => {
    if (this.authzToken) {
      const res = await this.get('/supplier/v1/timewindow/client/');

      return res.data.data;
    }

    return undefined;
  };

  getMyOrders = async payload => {
    if (this.authzToken) {
      const params = payload;
      const res = await this.get('/supplier/v1/orders', {
        params,
      });

      return res.data;
    }

    return undefined;
  };

  getOrderDetail = async orderNumber => {
    if (this.authzToken) {
      const res = await this.get(`/supplier/v1/orders/${orderNumber}`);

      return res.error ? res : res.data;
    }

    return undefined;
  };

  cancelOrderItem = async (orderNumber, productCode) => {
    if (this.authzToken) {
      const res = await this.put(`/supplier/v1/orders/${orderNumber}/${productCode}/cancel`);

      return res.data;
    }

    return undefined;
  };

  getReviewOrders = async orderNumber => {
    if (this.authzToken) {
      const res = await this.get(`/v1/order-review/review-orders/${orderNumber}`);

      return res.data;
    }

    return undefined;
  };

  postReviewOrders = async reviewInfo => {
    if (this.authzToken) {
      const res = await this.post('/v1/order-review/review-orders', {
        params: reviewInfo
      });

      return res.data;
    }

    return undefined;
  };

  getMyMessages = async payload => {
    if (this.authzToken) {
      const params = payload;
      const res = await this.get('/supplier/v1/notifications/me/', {
        params,
      });

      return res.data;
    }

    return undefined;
  };

  getSingleMessage = async notiId => {
    if (this.authzToken) {
      const res = await this.get(`/supplier/v1/notifications/me/${notiId}`);

      return res.data;
    }

    return undefined;
  };

  setMessageRead = async (notiId, payload) => {
    if (this.authzToken) {
      const params = payload;
      const res = await this.put(`/supplier/v1/notifications/me/${notiId}`, { params });

      return res.data;
    }

    return undefined;
  };

  registerFirebaseDevice = registrationKey => {
    if (this.authzToken) {
      return this.post('/supplier/v1/client/customers/firebase/register_device', {
        params: { Token: registrationKey },
      }).then(res => res.data);
    }

    return Promise.resolve(undefined);
  };

  removeFirebaseDevice = (registrationKey, userToken) => {
    return this.post('/supplier/v1/client/customers/firebase/remove_device', {
      params: { Token: registrationKey },
      headers: { Authorization: `Bearer ${userToken}` },
    })
      .then(res => res.data)
      .catch(() => {});
  };

  findReferrer = (ip, deviceKey) => {
    if (this.authzToken && ip && deviceKey) {
      return this.get('/referral/v1/findMobileReferrer', {
        params: { ip, deviceKey: deviceKey.toLowerCase() },
      }).then(res => res.data);
    }

    return undefined;
  };

  setReferralAppInstalled = referralId => {
    if (this.authzToken && referralId) {
      return this.post('/referral/v1/appInstalled', {
        params: { id: referralId },
      }).then(res => res.data);
    }

    return undefined;
  };

  setReferralUserRegistered = (referralId, referredCustomer) => {
    if (this.authzToken && referralId && referredCustomer) {
      return this.post('/referral/v1/userRegistered', {
        params: { id: referralId, referredCustomer },
      }).then(res => res.data);
    }

    return undefined;
  };

  getAppConfig = () => {
    return this.get('/supplier/v1/configurations/client-config').then(res => res.data);
  };

  getAddressList = () => {
    return this.get('/supplier/v1/address/all').then(res => res.data);
  };

  addAddress = payload => {
    return this.post('/supplier/v1/address/', {
      params: payload,
    }).then(res => res.data);
  };

  updateAddress = (addressId, payload) => {
    return this.put(`/supplier/v1/address/${addressId}`, {
      params: payload,
    }).then(res => res.data);
  };

  getCities = areaCode => {
    return this.get(`/area/${areaCode}/provinces`).then(res => res.data);
  };

  getDistricts = (areaCode, cityCode) => {
    return this.get(`/area/${areaCode}/provinces/${cityCode}/districts`).then(res => res.data);
  };

  getWards = (areaCode, cityCode, districtCode) => {
    return this.get(`/area/${areaCode}/provinces/${cityCode}/districts/${districtCode}/wards`).then(
      res => res.data
    );
  };

  get = async function(endpoint, data) {
    return await this._request('GET', endpoint, data);
  };

  post = async function(endpoint, data) {
    return await this._request('POST', endpoint, data);
  };

  put = async function(endpoint, data) {
    return await this._request('PUT', endpoint, data);
  };

  patch = async function(endpoint, data) {
    return await this._request('PATCH', endpoint, data);
  };

  delete = async function(endpoint, data) {
    return await this._request('DELETE', endpoint, data);
  };

  _getUrl = function(endpoint) {
    if (endpoint.startsWith('http')) return endpoint;
    return endpoint.startsWith('/') ? `${this.baseUrl}${endpoint}` : `${this.baseUrl}/${endpoint}`;
  };

  _join = function(obj, separator) {
    const arr = [];
    Object.keys(obj).forEach(key => {
      const val = obj[key];
      if (val) {
        arr.push(`${key}=${val}`);
      }
    });

    return arr.join(separator);
  };

  _request = function(method, endpoint, newData) {
    const url = this._getUrl(endpoint);
    // const data = newData.params ? toPascalCase(newData.params) : false;
    const data = newData && newData.params ? newData.params : false;
    const headers = newData && newData.headers ? newData.headers : false;
    const defaultHeaders = {
      Authorization: this.authzToken,
      Accept: 'application/json',
      'Content-Type': 'application/json',
    };
    const params = {
      url,
      method,
      headers: headers ? Object.assign(defaultHeaders, headers) : defaultHeaders,
      // encoding: this.encoding,
      // timeout: this.timeout,
    };

    if (method === 'GET') {
      params.headers['Cache-Control'] = 'no-cache';
      if (data) {
        params.url = `${params.url}?${this._join(data, '&')}`;
      }
    } else if (method === 'POST' || method === 'PUT' || method === 'PATCH' || method === 'DELETE') {
      if (data) {
        // log(JSON.stringify(data));
        params.body = JSON.stringify(data);
      }
      //   params.headers = {
      //     Accept: "application/json",
      //     "Content-Type": "application/json",
      //   };
      //   params.body = JSON.stringify(data);
    }

    // log(`Fetch ${params.url}`);
    return (
      fetch(params.url, params)
        .then(res => {
          if (res.status >= 200 && res.status <= 299) {
            return res.json();
            // } else if (res.status === 401) {
            //   res.error = {
            //     status: res.status,
            //     code: res.code,
            //     detail: res.detail,
            //   };
            //   res.data = {};

            //   return res;
          } else if (res.status >= 300) {
            res.error = {
              status: res.status,
              code: res.code,
              detail: res.detail,
            };
            res.data = {};

            return res;
          }

          return false;
        })
        .then(res => {
          if (!res) {
            return { data: {} };
          } else if (res.error) {
            return res;
          }

          return {
            ...res,
            data: toCamelCase(res),
          };
        })
        // .then(res => ({
        //   ...res,
        //   data: toCamelCase(res),
        // }))
        .catch(() => {
          const res = {
            error: {
              status: 0,
              code: 'UNKNOWN',
              detail: 'Probably lost connection',
            },
            data: {},
          };

          return res;
        })
    );
  };

  _addLocationToParams = function(params, location) {
    if (location && location.latitude && location.longitude) {
      params.Lat = location.latitude;
      params.Lng = location.longitude;
    }

    return params;
  };
}

const apiWorker = new APIWorker();
const apiWorkerDev = new APIWorker();
export { apiWorker as default, apiWorkerDev };
