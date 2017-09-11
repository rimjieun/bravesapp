import React, {PropTypes} from 'react';
import VendorLocationListRow from './VendorLocationListRow';

const VendorLocationList = ({vendors}) => {
  return (
    <table className="table">
      <thead>
      <tr>
        <th>Vendor</th>
        <th>Locations</th>
      </tr>
      </thead>
      <tbody>
        {vendors.map(vendor =>
          <VendorLocationListRow key={vendor.id} vendor={vendor}/>
        )}
      </tbody>
    </table>
  );
};

VendorLocationList.propTypes = {
  vendors: PropTypes.array.isRequired
};

export default VendorLocationList;
