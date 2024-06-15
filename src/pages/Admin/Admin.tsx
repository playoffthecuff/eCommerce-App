/* eslint-disable react/no-array-index-key */
import { useEffect, useState } from 'react';
import { MinusCircleOutlined, PlusOutlined, RedoOutlined, ZoomInOutlined, ZoomOutOutlined } from '@ant-design/icons';
import {
  Form,
  Image,
  Radio,
  Select,
  Upload,
  message,
  Input,
  Space,
  Button,
  Rate,
  Switch,
  InputNumber,
  Spin,
} from 'antd';
import type { GetProp, RadioChangeEvent, UploadFile, UploadProps } from 'antd';
import { observer } from 'mobx-react-lite';
import axios from 'axios';
import { toJS } from 'mobx';
import productStore from '../../store/product-store';
import { BootState } from '../../types/boot-state';
import userStore from '../../store/user-store';
import NoWayResult from '../../components/NoWayResult/NoWayResult';

type FileType = Parameters<GetProp<UploadProps, 'beforeUpload'>>[0];

// eslint-disable-next-line @typescript-eslint/no-explicit-any
const normFile = (e: any) => {
  if (Array.isArray(e)) {
    return e;
  }
  return e?.fileList;
};

const getBase64 = (file: FileType): Promise<string> =>
  new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onload = () => resolve(reader.result as string);
    reader.onerror = (error) => reject(error);
  });

const getFileFromBase64 = (base64: string, filename: string) => {
  const byteString = atob(base64);
  const arrayBuffer = new ArrayBuffer(byteString.length);
  const intArray = new Uint8Array(arrayBuffer);

  for (let i = 0; i < byteString.length; i += 1) {
    intArray[i] = byteString.charCodeAt(i);
  }

  const blob = new Blob([intArray], { type: 'image/png' });
  return new File([blob], filename, { type: 'image/png' });
};

function AdminPage() {
  const fetchShortInfo = async () => {
    await productStore.loadShortInfo();
  };

  useEffect(() => {
    fetchShortInfo();
  }, []);

  const [mode, setMode] = useState(false);
  const [productTitle, setProductTitle] = useState('');
  const [productNewTitle, setNewProductTitle] = useState('');
  const [vendorCode, setVendorCode] = useState(0);
  const [price, setPrice] = useState(1);
  const [previewThumbOpen, setPreviewOpen] = useState(false);
  const [vendorCodeButtonState, setVendorCodeButtonState] = useState(false);
  const [submitButtonState, setSubmitButtonState] = useState(false);
  const [previewThumbImage, setPreviewThumbImage] = useState('');
  const [fileList, setFileList] = useState<UploadFile[]>([]);
  const [categoryRadioValue, setCategoryRadioValue] = useState('bikes');
  const [typeImgRadioValue, setTypeImgRadioValue] = useState('thumb');
  const [color, setColor] = useState('');
  const [rating, setRating] = useState(0);
  const [desc, setDesc] = useState('');
  const [shortDesc, setShortDesc] = useState('');
  const [overview, setOverview] = useState<string[]>([]);
  const [form] = Form.useForm();

  useEffect(() => {
    if (productStore.product) {
      setRating(productStore.product.rating || 0);
      setDesc(productStore.product.description || '');
      setShortDesc(productStore.product.shortDescription || '');
      setCategoryRadioValue(productStore.product.category);
      setOverview(productStore.product.overview);
      setVendorCode(productStore.product.vendorCode);
      setPrice(productStore.product.price);
      form.setFieldsValue({
        vendorCode: productStore.product.vendorCode,
        price: productStore.product.price,
        rating: productStore.product.rating,
        category: productStore.product.category,
      });
    }
  }, [productStore.product]);

  const uniqueVendorCodeValidator = {
    validator: () => {
      if (productStore.shortInfo.every((product) => vendorCode !== product.vendorCode)) {
        return Promise.resolve();
      }
      return Promise.reject(`The value is the same or not unique`);
    },
  };

  const handleChangeMode = (value: boolean) => {
    setMode(value);
  };

  const handleProductChange = (title: string) => {
    const entry = productStore.shortInfo.find((item) => item.title === title);
    setTypeImgRadioValue('thumb');
    if (entry) {
      setColor(entry.color);
      productStore.loadProduct(entry.vendorCode.toString()).then(() => {
        if (productStore.product?.thumbs) {
          const newFileList = toJS(productStore.product?.thumbs).map((base64, index) => {
            const file = getFileFromBase64(base64, `${index}.png`);
            return {
              uid: `${index}`,
              name: file.name,
              status: 'done',
              url: `data:image/png;base64,${base64}`,
              originFileObj: file,
            };
          }) as UploadFile[];
          setFileList(newFileList);
        }
      });
      setNewProductTitle(title);
      setProductTitle(title);
    }
  };

  const handleProductTitleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    form.setFieldsValue({ productNewTitle: e.target.value });
    setNewProductTitle(e.target.value);
  };

  const handleDescriptionChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    form.setFieldsValue({ description: e.target.value });
    setDesc(e.target.value);
  };

  const handleOverviewChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    const newState = overview.slice();
    const index = Number(e.target.dataset.index);
    newState[index] = e.target.value;
    setOverview(newState);
    const overviewName = `overview${index}`;
    form.setFieldsValue({ [overviewName]: e.target.value });
  };

  const handleShortDescriptionChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    form.setFieldsValue({ shortDescription: e.target.value });
    setShortDesc(e.target.value);
  };

  const handleColorChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    form.setFieldsValue({ color: e.target.value });
    setColor(e.target.value);
  };

  const validate = () => {
    form
      .validateFields()
      .then(() => {
        setSubmitButtonState(true);
        setVendorCodeButtonState(true);
      })
      .catch(() => setVendorCodeButtonState(false));
  };

  const handleVendorCodeChange = (value: number | null) => {
    form.setFieldsValue({ vendorCode: value });
    setVendorCode(value || 0);
    validate();
  };

  const handlePriceChange = (value: number | null) => {
    form.setFieldsValue({ price: value });
    setPrice(value || 1);
    validate();
  };

  const updateProductTitle = async () => {
    const isCurrentProductValid = productStore.product?.title === productTitle;
    const newTitle = form.getFieldValue('productNewTitle');
    try {
      const resp = await axios.patch(
        `${import.meta.env.VITE_API_URL}/products/title`,
        {
          id: productStore.product?._id,
          title: newTitle,
        },
        { withCredentials: true }
      );
      if (resp.status !== 200) {
        throw new Error('Update failed');
      }
      message.success(`product title updated successfully`);
      setProductTitle(newTitle);
      if (isCurrentProductValid) {
        productStore.bootState = BootState.Success;
      }
    } catch (error) {
      const e = error as Error;
      const msg = e.message;
      message.error(`product title failed: ${msg}`);
    }
  };

  const updateColor = async () => {
    try {
      const resp = await axios.patch(
        `${import.meta.env.VITE_API_URL}/products/color`,
        {
          id: productStore.product?._id,
          color: form.getFieldValue('color'),
        },
        { withCredentials: true }
      );
      if (resp.status !== 200) {
        throw new Error('Update failed');
      }
      message.success(`color updated successfully`);
    } catch (error) {
      const e = error as Error;
      const msg = e.message;
      message.error(`color update failed: ${msg}`);
    }
  };

  const updateVendorCode = async () => {
    try {
      const resp = await axios.patch(
        `${import.meta.env.VITE_API_URL}/products/vc`,
        {
          id: productStore.product?._id,
          vendorCode: form.getFieldValue('vendorCode'),
        },
        { withCredentials: true }
      );
      if (resp.status !== 200) {
        throw new Error('Update failed');
      }
      message.success(`vendor code updated successfully`);
    } catch (error) {
      const e = error as Error;
      const msg = e.message;
      message.error(`vendor code update failed: ${msg}`);
    }
  };

  const updatePrice = async () => {
    try {
      const resp = await axios.patch(
        `${import.meta.env.VITE_API_URL}/products/price`,
        {
          id: productStore.product?._id,
          price: form.getFieldValue('price'),
        },
        { withCredentials: true }
      );
      if (resp.status !== 200) {
        throw new Error('Update failed');
      }
      message.success(`price updated successfully`);
    } catch (error) {
      const e = error as Error;
      const msg = e.message;
      message.error(`price code update failed: ${msg}`);
    }
  };

  const uploadImg = (file: File) => {
    const reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onload = async () => {
      const result = reader.result as string;
      const base64 = result.split(',')[1];
      try {
        const resp = await axios.post(
          `${import.meta.env.VITE_API_URL}/products/${typeImgRadioValue}`,
          {
            id: productStore.product?._id,
            fileContent: base64,
          },
          { withCredentials: true }
        );
        if (resp.status !== 200) {
          throw new Error('Upload failed');
        }
        message.success(`${file.name} file uploaded successfully`);
        if (typeImgRadioValue === 'gallery') {
          productStore.addImage(base64);
        } else {
          productStore.addThumb(base64);
        }
      } catch (error) {
        const e = error as Error;
        const msg = e.message;
        message.error(`${file.name} file upload failed: ${msg}`);
      }
    };
    return false;
  };

  const updateDescription = async () => {
    try {
      const resp = await axios.patch(
        `${import.meta.env.VITE_API_URL}/products/description`,
        {
          id: productStore.product?._id,
          description: form.getFieldValue('description'),
        },
        { withCredentials: true }
      );
      if (resp.status !== 200) {
        throw new Error('Update failed');
      }
      message.success(`description updated successfully`);
    } catch (error) {
      const e = error as Error;
      const msg = e.message;
      message.error(`description update failed: ${msg}`);
    }
  };

  const updateShortDescription = async () => {
    try {
      const resp = await axios.patch(
        `${import.meta.env.VITE_API_URL}/products/short-description`,
        {
          id: productStore.product?._id,
          shortDescription: form.getFieldValue('shortDescription'),
        },
        { withCredentials: true }
      );
      if (resp.status !== 200) {
        throw new Error('Update failed');
      }
      message.success(`short description updated successfully`);
    } catch (error) {
      const e = error as Error;
      const msg = e.message;
      message.error(`short description update failed: ${msg}`);
    }
  };

  const updateRating = async (value: number) => {
    setRating(value);
    form.setFieldsValue({ rating: value });
    if (!mode) {
      try {
        const resp = await axios.patch(
          `${import.meta.env.VITE_API_URL}/products/rating`,
          {
            id: productStore.product?._id,
            rating: value,
          },
          { withCredentials: true }
        );
        if (resp.status !== 200) {
          throw new Error('Update failed');
        }
        message.success(`rating updated successfully`);
      } catch (error) {
        const e = error as Error;
        const msg = e.message;
        message.error(`rating update failed: ${msg}`);
      }
    }
  };

  const updateCategory = async (e: RadioChangeEvent) => {
    const category = e.target.value;
    setCategoryRadioValue(category);
    if (!mode) {
      try {
        const resp = await axios.patch(
          `${import.meta.env.VITE_API_URL}/products/category`,
          {
            id: productStore.product?._id,
            category,
          },
          { withCredentials: true }
        );
        if (resp.status !== 200) {
          throw new Error('Update failed');
        }
        message.success(`category updated successfully`);
      } catch (error) {
        const err = error as Error;
        const msg = err.message;
        message.error(`category update failed: ${msg}`);
      }
    }
  };

  const updateOverview = async (index: number) => {
    try {
      const resp = await axios.patch(
        `${import.meta.env.VITE_API_URL}/products/overview`,
        {
          id: productStore.product?._id,
          index,
          overview: form.getFieldValue(`overview${index}`),
        },
        { withCredentials: true }
      );
      if (resp.status !== 200) {
        throw new Error('Update failed');
      }
      message.success(`overview ${index} updated successfully`);
    } catch (error) {
      const e = error as Error;
      const msg = e.message;
      message.error(`overview update failed: ${msg}`);
    }
  };

  const createNewProduct = async () => {
    const newProduct = form.getFieldsValue();
    for (const key in newProduct) {
      // eslint-disable-next-line no-prototype-builtins
      if (newProduct.hasOwnProperty(key) && newProduct[key] === undefined) {
        newProduct[key] = '';
      }
    }
    try {
      const resp = await axios.post(`${import.meta.env.VITE_API_URL}/products/create`, newProduct, {
        withCredentials: true,
      });
      if (resp.status !== 200) {
        throw new Error('create failed');
      }
      await productStore.loadShortInfo();
      message.success(`product created successfully`);
    } catch (error) {
      const e = error as Error;
      const msg = e.message;
      message.error(`product create failed: ${msg}`);
    }
  };

  const removeImg = async (index: number) => {
    if (typeImgRadioValue === 'gallery') {
      productStore.removeImage(index);
    } else {
      productStore.removeThumb(index);
    }
    try {
      const resp = await axios.delete(
        `${import.meta.env.VITE_API_URL}/products/${productStore.product?._id}/${typeImgRadioValue}/${index}`,
        { withCredentials: true }
      );
      if (resp.status !== 200) {
        throw new Error('Delete failed');
      }
      message.success(`image ${index} deleted successfully`);
    } catch (error) {
      const e = error as Error;
      const msg = e.message;
      message.error(`image delete failed: ${msg}`);
    }
  };

  const onTypeImgRadioChange = (e: RadioChangeEvent) => {
    setTypeImgRadioValue(e.target.value);
    if (e.target.value === 'thumb') {
      if (productStore.product?.thumbs) {
        const newFileList = toJS(productStore.product?.thumbs).map((base64, index) => {
          const file = getFileFromBase64(base64, `${index}.png`);
          return {
            uid: `${index}`,
            name: file.name,
            status: 'done',
            url: `data:image/png;base64,${base64}`,
            originFileObj: file,
          };
        }) as UploadFile[];
        setFileList(newFileList);
      }
    } else if (productStore.product?.gallery) {
      const newFileList = toJS(productStore.product?.gallery).map((base64, index) => {
        const file = getFileFromBase64(base64, `${index}.png`);
        return {
          uid: `${index}`,
          name: file.name,
          status: 'done',
          url: `data:image/png;base64,${base64}`,
          originFileObj: file,
        };
      }) as UploadFile[];
      setFileList(newFileList);
    }
  };

  const handlePreview = async (file: UploadFile) => {
    if (!file.url && !file.preview) {
      file.preview = await getBase64(file.originFileObj as FileType);
    }

    setPreviewThumbImage(file.url || (file.preview as string));
    setPreviewOpen(true);
  };

  const handleUploadChange: UploadProps['onChange'] = ({ fileList: newFileList }) => {
    const removedFileIndex = fileList.findIndex((file) => file.status === 'removed');
    if (removedFileIndex !== -1) removeImg(+removedFileIndex);
    setFileList(newFileList);
  };

  const uploadThumbsButton = (
    <button style={{ border: 0, background: 'none' }} type="button" disabled={!productStore.product || mode}>
      <PlusOutlined />
      <div style={{ marginTop: 8 }}>UPLOAD</div>
    </button>
  );

  switch (userStore.user?.isRoot) {
    case true:
      return (
        <Spin spinning={productStore.bootState === BootState.InProgress}>
          <Form
            form={form}
            labelCol={{ span: 12 }}
            wrapperCol={{ span: 14 }}
            layout="horizontal"
            style={{ maxWidth: 728, margin: '2rem auto', padding: '1rem' }}
          >
            <Form.Item label="Select Mode">
              <Switch onChange={handleChangeMode} checked={mode} checkedChildren="Create" unCheckedChildren="Edit" />
            </Form.Item>
            <Form.Item label="Product Title (existing / updated or created)" name="title">
              <Space.Compact style={{ width: '100%' }}>
                <Select
                  value={productTitle}
                  showSearch
                  placeholder="Select product..."
                  onChange={handleProductChange}
                  disabled={mode}
                >
                  {productStore.shortInfo.length > 0 &&
                    productStore.shortInfo.map((p) => {
                      return (
                        <Select.Option key={p._id} value={p.title}>
                          {p.title}
                        </Select.Option>
                      );
                    })}
                </Select>
                <Input name="productNewTitle" value={productNewTitle} onChange={handleProductTitleChange} />
                <Button
                  type="primary"
                  icon={<RedoOutlined />}
                  onClick={() => updateProductTitle().then(() => fetchShortInfo())}
                  disabled={!productStore.product || mode}
                />
              </Space.Compact>
            </Form.Item>
            <Form.Item label="Category" name="category">
              <Radio.Group
                onChange={updateCategory}
                value={categoryRadioValue}
                disabled={mode ? false : !productStore.product}
              >
                <Radio value="bikes">Bikes</Radio>
                <Radio value="accessory">Accessories</Radio>
              </Radio.Group>
            </Form.Item>
            <Form.Item
              label="Vendor Code"
              name="vendorCode"
              rules={[{ required: true, message: 'required value' }, uniqueVendorCodeValidator]}
            >
              <Space.Compact style={{ width: '100%' }}>
                <InputNumber value={vendorCode} onChange={handleVendorCodeChange} min={0} />
                <Button
                  type="primary"
                  icon={<RedoOutlined />}
                  onClick={updateVendorCode}
                  disabled={!vendorCodeButtonState || mode}
                />
              </Space.Compact>
            </Form.Item>
            <Form.Item label="Price" name="price" rules={[{ required: true, message: 'required value' }]}>
              <Space.Compact style={{ width: '100%' }}>
                <InputNumber name="price" value={price} onChange={handlePriceChange} min={1} step={0.01} />
                <Button
                  type="primary"
                  icon={<RedoOutlined />}
                  onClick={updatePrice}
                  disabled={!productStore.product || mode}
                />
              </Space.Compact>
            </Form.Item>
            <Form.Item label="Color" name="color">
              <Space.Compact style={{ width: '100%' }}>
                <Input value={color} onChange={handleColorChange} />
                <Button
                  type="primary"
                  icon={<RedoOutlined />}
                  onClick={updateColor}
                  disabled={!productStore.product || mode}
                />
              </Space.Compact>
            </Form.Item>
            {!mode && (
              <Form.Item label="Img Type">
                <Radio.Group onChange={onTypeImgRadioChange} value={typeImgRadioValue}>
                  <Radio value="thumb">Thumbs</Radio>
                  <Radio value="gallery">Gallery</Radio>
                </Radio.Group>
              </Form.Item>
            )}
            {!mode && (
              <Form.Item label="Upload" valuePropName="fileList" getValueFromEvent={normFile}>
                <Upload
                  accept="image/png"
                  beforeUpload={uploadImg}
                  listType="picture-card"
                  fileList={fileList}
                  onPreview={handlePreview}
                  onChange={handleUploadChange}
                  maxCount={8}
                >
                  {fileList.length >= 8 ? null : uploadThumbsButton}
                </Upload>
                {previewThumbImage && (
                  <Image
                    wrapperStyle={{ display: 'none' }}
                    preview={{
                      visible: previewThumbOpen,
                      onVisibleChange: (visible) => setPreviewOpen(visible),
                      afterOpenChange: (visible) => !visible && setPreviewThumbImage(''),
                      // eslint-disable-next-line react/no-unstable-nested-components
                      toolbarRender: (_, { transform: { scale }, actions: { onZoomOut, onZoomIn } }) => (
                        <Space size={12}>
                          <ZoomOutOutlined
                            disabled={scale === 1}
                            onClick={onZoomOut}
                            style={{ fontSize: '2rem', marginRight: '1rem' }}
                          />
                          <ZoomInOutlined disabled={scale === 50} onClick={onZoomIn} style={{ fontSize: '2rem' }} />
                        </Space>
                      ),
                    }}
                    src={previewThumbImage}
                  />
                )}
              </Form.Item>
            )}
            <Form.Item label="Rating" name="rating">
              <Space.Compact style={{ width: '100%' }}>
                <Rate allowHalf value={rating} onChange={updateRating} disabled={!productStore.product && !mode} />
              </Space.Compact>
            </Form.Item>
            <Form.Item label="Short Description" name="shortDescription">
              <Space.Compact style={{ width: '100%' }}>
                <Input.TextArea
                  autoSize={{ minRows: 2, maxRows: 4.3 }}
                  value={shortDesc}
                  onChange={handleShortDescriptionChange}
                />
                <Button
                  type="primary"
                  icon={<RedoOutlined />}
                  onClick={updateShortDescription}
                  disabled={!productStore.product || mode}
                />
              </Space.Compact>
            </Form.Item>
            <Form.Item label="Description" name="description">
              <Space.Compact style={{ width: '100%' }}>
                <Input.TextArea
                  autoSize={{ minRows: 2, maxRows: 8.3 }}
                  value={desc}
                  onChange={handleDescriptionChange}
                />
                <Button
                  type="primary"
                  icon={<RedoOutlined />}
                  onClick={updateDescription}
                  disabled={!productStore.product || mode}
                />
              </Space.Compact>
            </Form.Item>
            <Form.Item label="Overview" style={{ marginTop: '3rem' }}>
              {productStore.product?.overview && !mode ? (
                productStore.product.overview.map((_, index) => {
                  return (
                    <Space.Compact key={index} style={{ width: '100%', marginTop: '1rem' }}>
                      <Input.TextArea
                        name={`overview${index}`}
                        autoSize={{ minRows: 1, maxRows: 4.3 }}
                        value={overview[index]}
                        onChange={handleOverviewChange}
                        data-index={index}
                      />
                      <Button
                        type="primary"
                        icon={<RedoOutlined />}
                        onClick={() => updateOverview(index)}
                        disabled={!productStore.product}
                      />
                    </Space.Compact>
                  );
                })
              ) : (
                <Form.List name="overview">
                  {(fields, { add, remove }, { errors }) => (
                    <>
                      {fields.map((field) => (
                        <Form.Item required={false} key={field.key}>
                          <Form.Item {...field} validateTrigger={['onChange', 'onBlur']} noStyle>
                            <Input placeholder="overview..." style={{ width: '90%', marginRight: '0.675rem' }} />
                          </Form.Item>
                          {fields.length > 1 ? (
                            <MinusCircleOutlined className="dynamic-delete-button" onClick={() => remove(field.name)} />
                          ) : null}
                        </Form.Item>
                      ))}
                      <Form.Item>
                        <Button type="dashed" onClick={() => add()} icon={<PlusOutlined />}>
                          Add Overview
                        </Button>
                        <Form.ErrorList errors={errors} />
                      </Form.Item>
                    </>
                  )}
                </Form.List>
              )}
            </Form.Item>
            {mode && (
              <Form.Item label="Submit">
                <Button
                  type="primary"
                  disabled={!submitButtonState}
                  onClick={() => createNewProduct().then(() => fetchShortInfo())}
                >
                  SUBMIT
                </Button>
              </Form.Item>
            )}
          </Form>
        </Spin>
      );
    default:
      return <NoWayResult />;
  }
}

const observableAdminPage = observer(AdminPage);
export default observableAdminPage;
