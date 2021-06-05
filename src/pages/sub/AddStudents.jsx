import { h, Fragment } from "preact";
import { useState } from "preact/hooks";
import { useHistory } from "react-router-dom";
import { PageHeader, Button, Select, Modal } from "antd";
import { Form, Input, Space } from 'antd';
import { MinusCircleOutlined, PlusOutlined, CheckOutlined } from '@ant-design/icons';

export default function Students() {
  const history = useHistory();
  const [students, setStudents] = useState();
  const [showConfirm, setShowConfirm] = useState(false);
  const [confirmed, setConfirmed] = useState(false);

  const onFinish = values => {
    setStudents(values);
    showModal();
  };

  const showModal = () => {
    setShowConfirm(true);
  };

  const handleConfirm = () => {
    setShowConfirm(false);
    setConfirmed(true);
  };

  const handleReject = () => {
    setStudents();
    setShowConfirm(false);
  };

  return (
    <div className="site-page-header-ghost-wrapper">
      <PageHeader
        ghost={false}
        onBack={() => history.goBack()}
        title="Add Student(s)"
        subTitle="Remember to finalize & upload!"
        style={{ marginBottom: "1rem" }}
        extra={[
          <Button key="1" type="primary">
            Upload
          </Button>,
        ]}
      />
      <Form name="dynamic_addStudent_form" onFinish={onFinish} autoComplete="off">
      <Form.List name="users">
        {(fields, { add, remove }) => (
          <Fragment>
            {fields.map(({ key, name, fieldKey, ...restField }) => (
              <Space key={key} style={{ display: 'flex', marginBottom: "0" }} align="baseline">
                <Form.Item
                  {...restField}
                  name={[name, 'first']}
                  fieldKey={[fieldKey, 'first']}
                  rules={[{ required: true, message: 'Missing first name!' }]}
                >
                  <Input placeholder="First Name" />
                </Form.Item>
                <Form.Item
                  {...restField}
                  name={[name, 'last']}
                  fieldKey={[fieldKey, 'last']}
                  rules={[{ required: true, message: 'Missing last name' }]}
                >
                  <Input placeholder="Last Name" />
                </Form.Item>
                <Form.Item
                  {...restField}
                  name={[fieldKey, 'grade']}
                  fieldKey={[fieldKey, 'grade']}
                  rules={[{ required: true, message: 'Missing grade' }]}
                >
                  <Select placeholder="Grade">
                    {([8,9,10,11,12]).map(item => (
                      <Select.Option key={item} value={item}>
                        {item}
                      </Select.Option>
                    ))}
                  </Select>
                </Form.Item>
                <Form.Item
                  {...restField}
                  name={[name, 'username']}
                  fieldKey={[fieldKey, 'username']}
                  rules={[{ required: true, message: 'Missing username' }]}
                >
                  <Input placeholder="Username/StudentID" />
                </Form.Item>
                <Form.Item
                  {...restField}
                  name={[name, 'email']}
                  fieldKey={[fieldKey, 'email']}
                  rules={[{ required: true, message: 'Missing email' }]}
                >
                  <Input placeholder="Email" />
                </Form.Item>
                <Form.Item
                  {...restField}
                  name={[name, 'password']}
                  fieldKey={[fieldKey, 'password']}
                  rules={[{ required: true, message: 'Missing password' }]}
                >
                  <Input placeholder="Password" />
                </Form.Item>
                <MinusCircleOutlined onClick={() => remove(name)} />
              </Space>
            ))}
            <Form.Item>
              <Button type="dashed" onClick={() => {add();setConfirmed(false);setStudents();}} block icon={<PlusOutlined />}>
                New Student
              </Button>
            </Form.Item>
          </Fragment>
        )}
      </Form.List>
      <Form.Item>
        <Button type="primary" htmlType="submit" icon={confirmed ? <CheckOutlined /> : false}>
          Finalize
        </Button>
      </Form.Item>
    </Form>
    <Modal title="Confirm formated data" visible={showConfirm} onOk={handleConfirm} onCancel={handleReject}>
      <div><pre>{students && JSON.stringify(students,null, 2)}</pre></div>
    </Modal>
    </div>
  );
}
