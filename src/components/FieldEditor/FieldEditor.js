import React from 'react';
import TextField from 'material-ui/TextField';
import classNames from 'classnames';

import './FieldEditor.scss';

class FieldEditor extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      isEdit: false
    };
  }

  edit() {
    this.setState({ isEdit: true });
  }

  change(event) {
    if (event.keyCode === 13 || event.type === 'blur') {
      this.props.onChange(event.target.value.trim());
      this.setState({ isEdit: false });
    }
  }

  focus(input) {
    if(input) input.focus();
  }

  render() {
    return (
      <div className="field-wrapper">
        {
          this.state.isEdit ?
            <TextField className="field-input"
              id="text-field-default"
              fullWidth={true}
              defaultValue={this.props.value}
              ref={input=> this.focus(input)}
              onBlur={e => this.change(e)}
              onKeyUp={e => this.change(e)}>
            </TextField> :
            <div className="field-view"
              onClick={() => this.edit()}>
                {this.props.value}
            </div>
        }
      </div>
    );
  }
}

FieldEditor.propTypes = {
  value: React.PropTypes.string,
  onChange: React.PropTypes.func.isRequired
}

export default FieldEditor;
