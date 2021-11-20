const WxRouteEvents = ['switchTab', 'reLaunch', 'redirectTo', 'navigateBack', 'routeFail'];
// 重写wx原型的以下这几个方法

// 这边需要注意一个小细节，如果是小程序后退的话是走到navigateBack回调，这是需要自己手动计算当前的url
export function getNavigateBackTargetUrl(delta) {
  if (!variableTypeDetection.isFunction(getCurrentPages)) {
    return '';
  }

  const pages = getCurrentPages(); // 在App里调用该方法，页面还没生成，长度为0
  if(!pages.length) {
    return 'App';
  }

  delta = delta || 1;
  const toPage = pages[pages.length - delta];
  return setUrlQuery(toPage.route, toPage.options);
}