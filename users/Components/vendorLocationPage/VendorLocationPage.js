import React, {PropTypes} from 'react';
import {browserHistory} from 'react-router';
import VendorLocationList from './VendorLocationList';

class VendorLocationPage extends React.Component {
  constructor(props, context) {
    super(props, context);

    this.redirectToOrderPage = this.redirectToOrderPage.bind(this);
  }

  redirectToOrderPage() {
    browserHistory.push('/OrderPage');
  }

  render() {
    return (
      <div>
        <VendorLocationList vendors={this.props.vendors}/>
      </div>
    );
  }
}

VendorLocationPage.propTypes = {
  vendors: PropTypes.array.isRequired
};

function mapStateToProps(state, ownProps) {
  return {
    vendors: state.vendors
  };
}


export default VendorLocationPage;
