import { useEffect, useRef, useState } from 'react';
import { PlusOutlined, RedoOutlined } from '@ant-design/icons';
import { Form, Image, Radio, Select, Statistic, Upload, message, Input, Space, Button } from 'antd';
import type { GetProp, RadioChangeEvent, UploadFile, UploadProps } from 'antd';
import { observer } from 'mobx-react-lite';
import axios from 'axios';
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

function AdminPage() {
  const typeImgRef = useRef('thumb');

  const uploadImg = (file: File) => {
    const reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onload = async () => {
      const result = reader.result as string;
      const base64 = result.split(',')[1];
      try {
        const resp = await axios.post(`${import.meta.env.VITE_API_URL}/products/${typeImgRef.current}`, {
          id: productStore.product?._id,
          fileContent: base64,
        });
        if (resp.status !== 200) {
          throw new Error('Upload failed');
        }
        message.success(`${file.name} file uploaded successfully`);
      } catch (error) {
        const e = error as Error;
        const msg = e.message;
        message.error(`${file.name} file upload failed: ${msg}`);
      }
    };
    return false;
  };

  useEffect(() => {
    async function fetchData() {
      await productStore.loadShortInfo();
    }
    fetchData();
  }, []);

  const [previewThumbOpen, setPreviewOpen] = useState(false);
  const [previewThumbImage, setPreviewImage] = useState('');
  const [fileList, setFileList] = useState<UploadFile[]>([]);
  const [typeImgRadioValue, setTypeImgRadioValue] = useState(1);
  const [color, setColor] = useState('');
  const [desc, setDesc] = useState('');
  const [shortDesc, setShortDesc] = useState('');
  const [form] = Form.useForm();

  useEffect(() => {
    if (productStore.product) {
      setDesc(productStore.product.description || '');
      setShortDesc(productStore.product.shortDescription || '');
    }
  }, [productStore.product]);

  const handleDescriptionChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    form.setFieldsValue({ description: e.target.value });
    setDesc(e.target.value);
  };

  const handleShortDescriptionChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    form.setFieldsValue({ shortDescription: e.target.value });
    setShortDesc(e.target.value);
  };

  const updateDescription = async () => {
    try {
      const resp = await axios.post(`${import.meta.env.VITE_API_URL}/products/description`, {
        id: productStore.product?._id,
        description: form.getFieldValue('description'),
      });
      if (resp.status !== 200) {
        throw new Error('Upload failed');
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
      console.log(productStore.product?._id, form.getFieldValue('shortDescription'));
      const resp = await axios.post(`${import.meta.env.VITE_API_URL}/products/short-description`, {
        id: productStore.product?._id,
        shortDescription: form.getFieldValue('shortDescription'),
      });
      if (resp.status !== 200) {
        throw new Error('Upload failed');
      }
      message.success(`short description updated successfully`);
    } catch (error) {
      const e = error as Error;
      const msg = e.message;
      message.error(`short description update failed: ${msg}`);
    }
  };

  const onTypeImgRadioChange = (e: RadioChangeEvent) => {
    setTypeImgRadioValue(e.target.value);
    typeImgRef.current = e.target.value === 1 ? 'thumb' : 'gallery';
  };

  const handlePreview = async (file: UploadFile) => {
    if (!file.url && !file.preview) {
      file.preview = await getBase64(file.originFileObj as FileType);
    }

    setPreviewImage(file.url || (file.preview as string));
    setPreviewOpen(true);
  };

  const handleChange: UploadProps['onChange'] = ({ fileList: newFileList }) => setFileList(newFileList);

  const uploadThumbsButton = (
    <button
      style={{ border: 0, background: 'none' }}
      type="button"
      disabled={productStore.bootState !== BootState.Success}
    >
      <PlusOutlined />
      <div style={{ marginTop: 8 }}>UPLOAD</div>
    </button>
  );

  switch (userStore.user?.isRoot) {
    case true:
      return (
        <Form
          initialValues={{
            description: productStore.product?.description,
          }}
          form={form}
          labelCol={{ span: 6 }}
          wrapperCol={{ span: 14 }}
          layout="horizontal"
          style={{ maxWidth: 600 }}
        >
          <Form.Item label="Color">
            <Statistic value={color} />
          </Form.Item>
          <Form.Item label="Product Name">
            <Select
              showSearch
              placeholder="Choose product..."
              onChange={(title) => {
                const entry = productStore.shortInfo.find((item) => item.title === title);
                if (entry) {
                  setColor(entry.color);
                  productStore.loadProduct(entry.vendorCode.toString());
                }
              }}
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
          </Form.Item>
          <Form.Item label="Img Type">
            <Radio.Group onChange={onTypeImgRadioChange} value={typeImgRadioValue}>
              <Radio value={1}>Thumbs</Radio>
              <Radio value={2}>Gallery</Radio>
            </Radio.Group>
          </Form.Item>
          <Form.Item label="Upload" valuePropName="fileList" getValueFromEvent={normFile}>
            <Upload
              accept="image/png"
              beforeUpload={uploadImg}
              listType="picture-card"
              fileList={fileList}
              onPreview={handlePreview}
              onChange={handleChange}
              maxCount={4}
            >
              {fileList.length >= 4 ? null : uploadThumbsButton}
            </Upload>
            {previewThumbImage && (
              <Image
                wrapperStyle={{ display: 'none' }}
                preview={{
                  visible: previewThumbOpen,
                  onVisibleChange: (visible) => setPreviewOpen(visible),
                  afterOpenChange: (visible) => !visible && setPreviewImage(''),
                }}
                src={previewThumbImage}
              />
            )}
          </Form.Item>
          <Form.Item label="Short Description">
            <Space.Compact style={{ width: '100%' }}>
              <Input.TextArea
                name="shortDescription"
                style={{ height: '5rem' }}
                value={shortDesc}
                onChange={handleShortDescriptionChange}
              />
              <Button
                type="primary"
                icon={<RedoOutlined />}
                onClick={updateShortDescription}
                disabled={productStore.bootState !== BootState.Success}
              />
            </Space.Compact>
          </Form.Item>
          <Form.Item label="Description">
            <Space.Compact style={{ width: '100%' }}>
              <Input.TextArea
                name="description"
                style={{ height: '7rem' }}
                value={desc}
                onChange={handleDescriptionChange}
              />
              <Button
                type="primary"
                icon={<RedoOutlined />}
                onClick={updateDescription}
                disabled={productStore.bootState !== BootState.Success}
              />
            </Space.Compact>
          </Form.Item>
        </Form>
      );
    default:
      return <NoWayResult />;
  }
}

const observableAdminPage = observer(AdminPage);
export default observableAdminPage;
