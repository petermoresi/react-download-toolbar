import React from 'react';

let DownloadToolbar;

export default DownloadToolbar = React.createClass({

  handleDownloadClick: function(event) {
    var fileType = event.target.innerText,
    text = '';

    text = this.props.export(fileType)

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

  render: function() {
    return (
      <span>
        { this.props.prefix }
        { this.props.formats.map( (d) =>
          <a style={{ margin: '5px 5px 0px 0px', textDecoration: 'underline', color: 'blue', cursor: 'pointer' }}
            download={ this.props.filename + '.' + d.format }
            onClick={ this.handleDownloadClick }>{d.label || d.format}</a> ) }
      </span>
    );
  }
})


DownloadToolbar.PropTypes = {
  prefix: React.PropTypes.string,
  filename: React.PropTypes.string,
  export: React.PropTypes.function,
}

DownloadToolbar.DefaultProps = {
  prefix: 'Download: ',
  filename: 'file',
  export: () => {}
}
