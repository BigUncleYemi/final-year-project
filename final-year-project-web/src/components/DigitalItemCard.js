import { Col, Button, Space, Input, Rate, Divider, Skeleton, notification, DatePicker, Result, Popover } from 'antd';
import React, { useState } from 'react';
import { EditOutlined, DeleteOutlined } from '@ant-design/icons';
import EditDigitalItem from './EditDigitalItem';
import FirebaseService from '../services/FirebaseService';
import { generateUUID } from '../utils/helper';
import '../asset/scss/Home.scss';

export default function DigitalItemCard(props) {
  const [openEditDigitalItemModal, setOpenEditDigitalItemModal] = useState(false);
  const [loading, setloading] = useState(false);
  const [deleteBtn, setDeleteBtn] = useState("");
  const { 
    data =  {
      image: "",
      name: "",
      address: "",
      email: "",
      phoneNumber: "",
      rating: "",
      reviews: "",
      id: "",
    },
    setUpdate
  } = props;

  const onSumitEditDigitalItem = (values) => {
    setloading(true);
    const id = generateUUID();
    notification.warning({
      message: "Loading....",
      key: "updateRes"
    })
    FirebaseService.updateADigitalItemRequest(values.id, values)
      .then(() => {
        // FirebaseService.AdminEditDigitalItemNameOnReviewRequest(values.id, {
        //   restaurantName: values.name,
        // })
        //   .then(() => {
            setloading(false);
            setOpenEditDigitalItemModal(false);
            notification.success({
              message: "Digital Item Edited Successfully!",
              key: "updateRes"
            });
            setUpdate(id);
          // })
          // .catch(err => {
          //   setloading(false);
          //   notification.success({
          //     message: "An error occured, please try again!",
          //     key: "updateRes"
          //   })
          //   console.log(err);
          // })
      })
      .catch(err => {
        setloading(false);
        notification.success({
          message: "An error occured, please try again!",
          key: "updateRes"
        })
        console.log(err);
      })
  }

  const handleDeleteDigitalItem = (values) => {
    const id = generateUUID();
    notification.warning({
      message: "Loading....",
      key: "del"
    })
    FirebaseService.adminDeleteDigitalItemRequest(values.id)
      .then(() => {
        // FirebaseService.AdminDeleteAllDigitalItemReviewsRequest(values.id)
        //   .then(() => {
        //     props.history.push("/admin")
            notification.success({
              message: "Digital Item Deleted Successfully!",
              key: "del"
            })
            setUpdate(id);
          // })
          // .catch(err => {
          //   notification.success({
          //     message: "An error occured, please try again!",
          //     key: "del"
          //   })
          //   console.log(err);
          // })
      })
      .catch(err => {
        notification.success({
          message: "An error occured, please try again!",
          key: "del"
        })
        console.log(err);
      })
  }

  return (
    <Col
      xs={24}
      sm={24}
      md={12}
      lg={8}
      xl={8}
    >
      {openEditDigitalItemModal && (
        <EditDigitalItem
          openModal={openEditDigitalItemModal}
          setOpenModal={setOpenEditDigitalItemModal}
          initialValues={{
            ...openEditDigitalItemModal,
            image: [
              {
                uid: 0,
                name: openEditDigitalItemModal.name,
                status: 'done',
                url: openEditDigitalItemModal.image,
                thumbUrl: openEditDigitalItemModal.image,
              },
            ]
          }}
          loading={loading}
          onSubmit={onSumitEditDigitalItem}
        />
      )}
      <div className="restaurant-card">
        <div
          className="restaurant-card_img"
          style={{ backgroundImage: `url(${data.image})` }}
        >
          <i className="fas fa-file"></i>
        </div>
        <div>
          <div className="restaurant-card-body">
            <h3>{data.name}</h3>
            <Space size="middle">
              <Button type="ghost" onClick={() => setOpenEditDigitalItemModal(data)} icon={<EditOutlined />} />
              <Popover
                content={
                  <div>
                    Are you sure you want to delete this Digital Item?
                    <br />
                    <button
                      style={{padding: "5px 10px", color: "white", backgroundColor: "red", border: "none"}}
                      onClick={() => {
                        handleDeleteDigitalItem(data)
                        setDeleteBtn("")
                      }}
                    >
                      Yes
                    </button>
                  </div>
                }
                trigger="click"
                visible={deleteBtn === data.id}
                onVisibleChange={() => setDeleteBtn(deleteBtn !== data.id ? data.id : null)}
              >
                <Button type="default" icon={<DeleteOutlined />} />
              </Popover>
            </Space>
          </div>
        </div>
      </div>
    </Col>
  )
}
