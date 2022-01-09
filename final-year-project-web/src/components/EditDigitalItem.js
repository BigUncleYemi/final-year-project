import { Form, Button, Modal, Input, Upload, notification } from 'antd';
import { UploadOutlined, MailOutlined } from '@ant-design/icons';
import { useState } from 'react';
import { storage } from '../services/Firebase';
import { processImageToCloudinary } from '../utils/helper';

export default function EditDigitalItem(props) {
  const {
    openModal,
    setOpenModal,
    onSubmit,
    initialValues,
    loading,
  } = props;
  const [form] = Form.useForm();
  const [progress, setProgress] = useState();
  const [uploading, setUploading] = useState(false);
  const [url, setUrl] = useState(initialValues.image[0].url);

  const onFormSubmit = () => {
    form.validateFields().then(values => {
      onSubmit({
        ...initialValues,
        ...values,
        image: url,
      });
      form.resetFields();
    }).catch(info => {
      console.log('Validate Failed:', info);
    });
  };

  const normFile = async (info) => {
    setUploading(true);
    let fileList = [...info.fileList];
    if (fileList.length === 0) return;
    fileList = fileList.slice(-1);
    await fileList.map(async (file) => {
      const media = file;
      const filename = media.name;
      const filesize = media.size / 1024 / 1024;
      const lastDot = filename.lastIndexOf('.');
      const ext = filename.slice(lastDot + 1);
      if (filesize > 20) {
        notification.error({ message: 'Maximum image size should be 20MB' });
        file.status = 'error';
        setUploading(false);
      } else if (
        ext !== 'VRX'
        && ext !== 'vrx'
        && ext !== 'Vrx'
      ) {
        notification.error({
          message: 'File extension should only be jpg, jpeg, or png',
        });
        file.status = 'error';
        setUploading(false);
      } else {
        const result = await processImageToCloudinary(
          file,
          () => {
            setUploading(false);
            file.status = 'error';
          },
          setProgress,
          process.env.REACT_APP_CLOUDINARY_CLOUD_NAME,
          process.env.REACT_APP_CLOUDINARY_CLOUD_PRESET
        )
        if (result) {
          file.url = result;
          setUrl(result);
          file.status = 'done';
          setUploading(false);
        }
      }
    });
  };

  const handleStatusChange = (info) => {
    let fileList = [...info.fileList];
    fileList = fileList.slice(-5);
    fileList.forEach(function (file,) {
      file.status = file?.originFileObj?.status;
    });
  };

  return (
    <Modal
      visible={openModal}
      onCancel={() => {
        form.resetFields();
        setOpenModal(false);
      }}
      footer={null}
    >
      <Form
        name="edit-restaurant-form"
        onFinish={onFormSubmit}
        form={form}
        initialValues={initialValues}
        layout="vertical"
      >
        <Form.Item
          label="Name"
          name="name"
          hasFeedback
          rules={[{ required: true, message: 'Please input name!' }]}
        >
          <Input />
        </Form.Item>
        <Form.Item
          name="image"
          label="Digital Item"
          valuePropName="fileList"
          getValueFromEvent={() => {}}
          extra="Please upload a Digital Item with .vsx file extension for now, Thank you 😉."
        >
          <Upload
            maxCount={1}
            listType="picture"
            beforeUpload={(_, o) => normFile({ fileList: o })}
            valuePropName="fileList"
            onChange={(e) => handleStatusChange(e)}
          >
            <Button icon={<UploadOutlined />}>
              {uploading ? `Uploading... ${progress}%` : 'Click to upload'}
            </Button>
          </Upload>
        </Form.Item>

        <Form.Item>
          <Button type="ghost" htmlType="submit" loading={loading}>
            Submit
          </Button>
        </Form.Item>
      </Form>
    </Modal>
  )
}
