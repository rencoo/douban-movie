export function replaceNetwork() {
  const requestMethods = ['request', 'downloadFile', 'uploadFile'];
  requestMethods.forEach((requestMethod) => {
    const originRequest = wx[requestMethod];
    Object.defineProperty(wx, requestMethod, {
      writable: true,
      enumerable: true,
      configurable: true,
      value: function (...args) {
        const options = args[0];
        const { url, method } = options;
        const successHandler = () => {};
        const failHandler = () => {};
        const actOptions = {
          ...options,
          success: successHandler,
          fail: failHandler
        };

        return originRequest.call(this, actOptions);
      }
    });
  });
}
