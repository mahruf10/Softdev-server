// async controller e error hole central error handler e jabe (bar bar try/catch lagbe na)
const catchAsync = fn => (req, res, next) => {
  Promise.resolve(fn(req, res, next)).catch(next)
}

module.exports = catchAsync
