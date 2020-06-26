import React from 'react';
import ReactTable from 'react-table-6'
import 'react-table-6/react-table.css'

class InventoryHome extends React.Component{
render() {
  const data = [{
    product: 'Potato',
    cycle: 26,
    safety: 20
  },
  {
    product: 'Tomato',
    cycle: 26,
    safety: 20
  }
]
 
  const columns = [{
    Header: 'Product',
    accessor: 'product' // String-based value accessors!
  },
  {
    Header: 'Cycle Stock',
    accessor: 'cycle' // String-based value accessors!
  },
  {
    Header: 'Safety Stock',
    accessor: 'safety' // String-based value accessors!
    } 
    ]
 
  return( 
    <div className="App">
    <h1>Predicted Stock for 10 weeks</h1>
  <ReactTable
    data={data}
    columns={columns}
  />
  </div>)
}
}
export default InventoryHome

