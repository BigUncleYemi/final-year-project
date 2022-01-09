import { Form, Col, Grid, Button, Modal, Input, Upload, notification } from 'antd';
import { UploadOutlined, MailOutlined } from '@ant-design/icons';
import { useState } from 'react';
import Nav from '../../components/Nav';
import Footer from '../../components/Footer';
import DigitalItemCard from '../../components/DigitalItemCard';
import requireOwnerAuth from '../../Hoc/requireOwnerAuth';
import FirebaseService from '../../services/FirebaseService';
import * as actionTypes from '../../redux/constants';
import { useGetOwnerDigitalItems } from '../../Hooks/useGetOwnerDigitalItems';
import { generateUUID, processImageToCloudinary } from '../../utils/helper';
import '../../asset/scss/Home.scss';

function OwnerDashboard(props) {
  const [update, setUpdate] = useState("");
  const { documents, loader } = useGetOwnerDigitalItems(update);
  const [progress, setProgress] = useState();
  const [uploading, setUploading] = useState(false);
  const [loading, setloading] = useState(false);
  const [url, setUrl] = useState("https://via.placeholder.com/300");
  const [form] = Form.useForm();
  const [openAddDigitalItemModal, setOpenAddDigitalItemModal] = useState(false);
  const onSubmit = () => {
    form.validateFields().then(values => {
      setloading(true);
      const id = generateUUID();
      values.image = url;
      values.id = id;
      values.ownerId = localStorage.getItem(actionTypes.AUTH_TOKEN_ID);
      FirebaseService.postNewDigitalItemRequest(id, values)
        .then(() => {
          setloading(false);
          notification.success({
            message: "Digital Item Added Successfully!"
          })
          form.resetFields();
          setOpenAddDigitalItemModal(false);
          setUpdate(id);
        }).catch(err => {
          setloading(false);
          notification.success({
            message: "An error occured, please try again!"
          })
          console.log(err);
        })
    }).catch(info => {
      setloading(false);
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
          message: 'File extension should only be vsx',
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
    <div className="Home">
    <Nav />
    <Modal
      visible={openAddDigitalItemModal}
      onCancel={() => setOpenAddDigitalItemModal(false)}
      footer={null}
    >
      <Form
        name="add-restaurant-form"
        onFinish={onSubmit}
        form={form}
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
          required
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
   <div className="Home-Container container">
      <div style={{ display: "flex", justifyContent: "space-between", width: "100%" }}>
        <h2 style={{ padding: "0px 15px"}}>My Digital Items</h2>
         <Button onClick={() => setOpenAddDigitalItemModal(true)}>
          Add Digital Item
        </Button> 
      </div>
      <Col xs={24} sm={24} md={24} lg={24} xl={24} style={{ paddingTop: 0 }} className="Home-Container-list">
        <div style={{ padding: "0px 10px 15px"}} className="Home-Container-list_filtered-list">
          {documents &&
            documents.length > 0 ? (
              documents.map((item, i) => (
                <DigitalItemCard key={i} data={item} history={props.history} setUpdate={setUpdate} />
              ))
            ) : (
              <div className="Home-Container-list_filtered-list-empty">
                <h2>{loader ? "Loading...." : "No Digital Item yet. Please add your first Digital Item today."}</h2>
              </div>
            )
          }
        </div>
      </Col>
    </div>
    <Footer />
    </div>
  );
}

export default requireOwnerAuth(OwnerDashboard);
