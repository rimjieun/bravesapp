import React, {PropTypes} from 'react';

const VendorLocationListRow = ({vendor}) => {
  return (
        <tr>
          <td>{vendor.name}</td>
          <td>{vendor.location}</td>
        </tr>
  );
};
VendorLocationListRow.propTypes = {
  vendor: PropTypes.object.isRequired
};

export default VendorLocationListRow;
