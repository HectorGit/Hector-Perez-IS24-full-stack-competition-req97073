
function ProductTableV1(props) {

    let products = props.products

    return (
        <div>
            <table style={{border:"2px black solid"}}>
                <thead>
                <tr>
                <th>
                    Product Number
                </th>
                <th>
                    Product Name
                </th>
                <th>
                    Scrum Master
                </th>
                <th>
                    Product Owner
                </th>
                <th>
                    Developer Names
                </th>
                <th>
                    Start Date
                </th>
                <th>
                    Methodology
                </th>
                </tr>
                </thead>
                <tbody>
                {
                    products && products.map((product) => {
                    /* Find a way to map the developers */
                    return(
                        <tr>
                        <td>
                            {product.productId}
                        </td>
                        <td>
                            {product.productName}
                        </td>
                        <td>
                            {product.scrumMasterName}
                        </td>
                        <td>
                            {product.productOwnerName}
                        </td>
                        <td>
                            <ul style={{listTypeStyle:"none"}}>
                            {product.Developers.map((developer_name) => {
                            return(
                                <li>
                                {developer_name}
                                </li>
                            )
                            })}
                            </ul>
                        </td>
                        <td>
                            {product.startDate}
                        </td>
                        <td>
                            {product.methodology}
                        </td>
                        </tr>
                    )

                    }
                    )
                }

                </tbody>
            </table>
        </div>
    );
}

export default ProductTableV1;
