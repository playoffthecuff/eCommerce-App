import { useEffect, useRef, useState } from 'react';
import { PlusOutlined } from '@ant-design/icons';
import { Form, Image, Radio, Select, Statistic, Upload, message } from 'antd';
import type { GetProp, RadioChangeEvent, UploadFile, UploadProps } from 'antd';
import { observer } from 'mobx-react-lite';
import axios from 'axios';
import productStore from '../../store/product-store';
import { BootState } from '../../types/boot-state';

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

        // const response = await fetch(`${import.meta.env.VITE_API_URL}/upload/${typeImgRef.current}`, {
        //   method: 'POST',
        //   headers: {
        //     'Content-Type': 'application/json',
        //   },
        //   body: JSON.stringify({ fileContent: base64, fileName: file.name }),
        // });

        // if (!response.ok) {
        //   throw new Error('Upload failed');
        // }

        if (resp.status !== 200) {
          throw new Error('Upload failed');
        }

        const res = resp.statusText;
        // const result = await response.text();
        console.log(res);
        message.success(`${file.name} file uploaded successfully`);
      } catch (error) {
        const e = error as Error;
        const msg = e.message;
        message.error(`${file.name} file upload failed: ${msg}`);
      }
    };
    return false;
  };

  const [previewThumbOpen, setPreviewOpen] = useState(false);
  const [previewThumbImage, setPreviewImage] = useState('');
  const [fileList, setFileList] = useState<UploadFile[]>([]);
  const [typeImgRadioValue, setTypeImgRadioValue] = useState(1);
  const onTypeImgRadioChange = (e: RadioChangeEvent) => {
    setTypeImgRadioValue(e.target.value);
    typeImgRef.current = e.target.value === 1 ? 'thumb' : 'gallery';
  };

  useEffect(() => {
    async function fetchData() {
      await productStore.loadShortInfo();
    }
    fetchData();
  }, []);

  const handlePreview = async (file: UploadFile) => {
    if (!file.url && !file.preview) {
      // eslint-disable-next-line no-param-reassign
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

  const [color, setColor] = useState('');

  return (
    <Form labelCol={{ span: 4 }} wrapperCol={{ span: 14 }} layout="horizontal" style={{ maxWidth: 600 }}>
      <Form.Item label="Color">
        <Statistic value={color} />
      </Form.Item>
      <Form.Item label="Product Name">
        <Select
          showSearch
          placeholder="Choose product..."
          onChange={(title) => {
            const entry = productStore.titlesAndColors.find((item) => item.title === title);
            if (entry) {
              setColor(entry.color);
              productStore.loadProduct(entry.vendorCode.toString());
            }
          }}
        >
          {productStore.titlesAndColors.length > 0 &&
            productStore.titlesAndColors.map((p) => {
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
          accept="image/png, image/webp, image/svg+xml"
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
    </Form>
  );
}

const observableAdminPage = observer(AdminPage);
export default observableAdminPage;
