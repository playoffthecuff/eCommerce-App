import { useEffect } from 'react';
import { List } from 'antd';

import { productsStore } from '../../store/productStore';
import ProductCard from '../ProductCard/ProductCard';

export default function ProductList() {
  // const productsList = () => {

  // };

  useEffect(() => {
    // productsStore;
  }, []);

  return (
    <List
      itemLayout="vertical"
      size="large"
      pagination={{
        onChange: (page) => {
          console.log(page);
        },
        pageSize: 3,
      }}
      dataSource={productsStore.products}
      renderItem={(product) => (
        <List.Item key={product._id} actions={[<ProductCard />]}>
          {/* <List.Item.Meta
            avatar={<Avatar src={item.avatar} />}
            title={<a href={item.href}>{item.title}</a>}
            description={item.description}
          /> */}
          {product.name}
        </List.Item>
      )}
    />
  );
}
