import { useState } from 'react';
import { PlusOutlined } from '@ant-design/icons';
import { Button, Form, Image, InputNumber, Upload } from 'antd';
import type { GetProp, UploadFile, UploadProps } from 'antd';
import axios from 'axios';

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

export default function AdminPage() {
  const [previewOpen, setPreviewOpen] = useState(false);
  const [previewImage, setPreviewImage] = useState('');
  const [fileList, setFileList] = useState<UploadFile[]>([]);
  const [uploadUrl, setUploadUrl] = useState(`${import.meta.env.VITE_API_URL}/products/123/images/`);

  const fetchData = async () => {
    try {
      // const response = await axios.get(`${import.meta.env.VITE_API_URL}/products?vc=671296`);
      const filter = {
        category: 'bikes',
        minPrice: 100,
        maxPrice: 2000,
        weight: 275,
        minBase: 1000,
        maxBase: 1100,
        frameSize: 450,
      };
      const response = await axios.post(`${import.meta.env.VITE_API_URL}/products/`, filter);
      console.log(response);
    } catch (error) {
      console.log(error);
    }
  };

  const handlePreview = async (file: UploadFile) => {
    if (!file.url && !file.preview) {
      // eslint-disable-next-line no-param-reassign
      file.preview = await getBase64(file.originFileObj as FileType);
    }

    setPreviewImage(file.url || (file.preview as string));
    setPreviewOpen(true);
  };

  const handleChange: UploadProps['onChange'] = ({ fileList: newFileList }) => setFileList(newFileList);

  const uploadButton = (
    <button style={{ border: 0, background: 'none' }} type="button">
      <PlusOutlined />
      <div style={{ marginTop: 8 }}>Upload</div>
    </button>
  );
  return (
    <Form labelCol={{ span: 4 }} wrapperCol={{ span: 14 }} layout="horizontal" style={{ maxWidth: 600 }}>
      <Form.Item label="Vendor code">
        <InputNumber
          onChange={() => {
            setUploadUrl(`${import.meta.env.VITE_API_URL}/products/123/images/`);
          }}
        />
      </Form.Item>
      <Form.Item label="Upload" valuePropName="fileList" getValueFromEvent={normFile}>
        <Upload
          accept="image/png, image/webp"
          action={uploadUrl}
          listType="picture-card"
          fileList={fileList}
          onPreview={handlePreview}
          onChange={handleChange}
          maxCount={1}
        >
          {fileList.length >= 8 ? null : uploadButton}
        </Upload>
        {previewImage && (
          <Image
            wrapperStyle={{ display: 'none' }}
            preview={{
              visible: previewOpen,
              onVisibleChange: (visible) => setPreviewOpen(visible),
              afterOpenChange: (visible) => !visible && setPreviewImage(''),
            }}
            src={previewImage}
          />
        )}
      </Form.Item>
      <Form.Item label="Button">
        <Button htmlType="submit" onClick={fetchData}>
          Submit
        </Button>
      </Form.Item>
    </Form>
  );
}
