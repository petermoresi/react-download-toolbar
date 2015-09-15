(function (global, factory) {
  if (typeof define === 'function' && define.amd) {
    define(['exports', 'module', 'react'], factory);
  } else if (typeof exports !== 'undefined' && typeof module !== 'undefined') {
    factory(exports, module, require('react'));
  } else {
    var mod = {
      exports: {}
    };
    factory(mod.exports, mod, global.React);
    global.DownloadToolbar = mod.exports;
  }
})(this, function (exports, module, _react) {
  'use strict';

  function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { 'default': obj }; }

  var _React = _interopRequireDefault(_react);

  var DownloadToolbar = undefined;

  module.exports = DownloadToolbar = _React['default'].createClass({
    displayName: 'DownloadToolbar',

    handleDownloadClick: function handleDownloadClick(event) {
      var fileType = event.target.innerText,
          text = '';

      text = this.props['export'](fileType);

      var blob = new Blob([text], {
        type: 'text/csv;charset=utf8;'
      });

      // create hidden link
      var element = document.createElement('a');
      document.body.appendChild(element);
      element.setAttribute('href', window.URL.createObjectURL(blob));
      element.setAttribute('download', this.props.filename + '.' + fileType);
      element.style.display = '';

      element.click();

      document.body.removeChild(element);
      event.stopPropagation();
    },

    render: function render() {
      var _this = this;

      return _React['default'].createElement(
        'span',
        null,
        this.props.prefix,
        this.props.formats.map(function (d) {
          return _React['default'].createElement(
            'a',
            { style: { margin: '5px 5px 0px 0px', textDecoration: 'underline', color: 'blue', cursor: 'pointer' },
              download: _this.props.filename + '.' + d.format,
              onClick: _this.handleDownloadClick },
            d.label || d.format
          );
        })
      );
    }
  });

  DownloadToolbar.PropTypes = {
    prefix: _React['default'].PropTypes.string,
    filename: _React['default'].PropTypes.string,
    'export': _React['default'].PropTypes['function']
  };

  DownloadToolbar.DefaultProps = {
    prefix: 'Download: ',
    filename: 'file',
    'export': function _export() {}
  };
});
