
// eslint-disable-next-line no-unused-vars
module.exports = (options = {}) => {
  return async context => {
    if (context.params.poster_info) {
      context.data.poster_path = context.params.poster_info.filename;
    }
    if (context.params.video_info) {
      context.data.file_path = context.params.video_info.filename;
    }
    return context;
  };
};
